#!/usr/bin/env python3
"""
Performance Optimizer for Daily News Report Skill

This module implements the optimization improvements identified in the analysis:
1. Enhanced data collection and tracking
2. Adaptive algorithms for source selection
3. Circuit breaker pattern for resilience
4. Retry mechanisms with exponential backoff
5. Performance monitoring and optimization hints
"""

import json
import time
import hashlib
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, asdict
from collections import defaultdict, deque
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class FetchResult:
    """Result of a source fetch operation"""
    source_id: str
    timestamp: datetime
    duration_ms: int
    status: str  # 'success', 'timeout', 'error', 'rate_limited'
    items_extracted: int
    items_qualified: int
    avg_quality: float
    errors: List[str]
    response_size_bytes: int
    first_item_time_ms: Optional[int] = None

@dataclass
class CircuitBreakerState:
    """State of circuit breaker for a source"""
    status: str  # 'closed', 'open', 'half_open'
    consecutive_failures: int
    last_failure_time: Optional[datetime]
    next_retry_time: Optional[datetime]
    success_count_half_open: int = 0

class PerformanceTracker:
    """Tracks performance metrics for sources"""

    def __init__(self, cache_file: str):
        self.cache_file = cache_file
        self.cache_data = self._load_cache()
        self.max_history_days = 30
        self.max_fetch_history = 100

    def _load_cache(self) -> Dict:
        """Load cache data from file"""
        try:
            with open(self.cache_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return self._create_default_cache()

    def _create_default_cache(self) -> Dict:
        """Create default cache structure"""
        return {
            "schema_version": "2.0",
            "source_stats": {},
            "adaptive_thresholds": {},
            "url_cache": {"entries": {}},
            "content_fingerprints": {"fingerprints": {}},
            "quality_metrics": {"daily_averages": {}, "source_quality_trends": {}},
            "error_tracking": {"recent_errors": [], "error_stats": {}},
            "optimization_hints": {}
        }

    def record_fetch(self, result: FetchResult) -> None:
        """Record a fetch result"""
        source_id = result.source_id

        # Initialize source stats if needed
        if source_id not in self.cache_data["source_stats"]:
            self.cache_data["source_stats"][source_id] = {
                "fetch_history": deque(maxlen=self.max_fetch_history),
                "rolling_stats": self._init_rolling_stats(),
                "circuit_breaker": asdict(CircuitBreakerState(
                    status="closed",
                    consecutive_failures=0,
                    last_failure_time=None,
                    next_retry_time=None
                ))
            }

        source_data = self.cache_data["source_stats"][source_id]

        # Add to fetch history
        fetch_entry = {
            "date": result.timestamp.isoformat(),
            "start_time": result.timestamp.isoformat(),
            "duration_ms": result.duration_ms,
            "status": result.status,
            "items_extracted": result.items_extracted,
            "items_qualified": result.items_qualified,
            "avg_quality": result.avg_quality,
            "errors": result.errors,
            "response_size_bytes": result.response_size_bytes
        }

        source_data["fetch_history"].append(fetch_entry)
        self._update_rolling_stats(source_id, result)
        self._update_circuit_breaker(source_id, result)

        logger.info(f"Recorded fetch for {source_id}: {result.status} in {result.duration_ms}ms")

    def _init_rolling_stats(self) -> Dict:
        """Initialize rolling statistics structure"""
        return {
            "total_attempts": 0,
            "success_count": 0,
            "fail_count": 0,
            "success_rate": 0.0,
            "avg_duration_ms": 0,
            "avg_items_per_fetch": 0,
            "avg_quality_score": 0.0,
            "std_quality_score": 0.0,
            "last_7_days": {"attempts": 0, "success_rate": 0.0, "avg_quality": 0.0},
            "last_30_days": {"attempts": 0, "success_rate": 0.0, "avg_quality": 0.0}
        }

    def _update_rolling_stats(self, source_id: str, result: FetchResult) -> None:
        """Update rolling statistics for a source"""
        stats = self.cache_data["source_stats"][source_id]["rolling_stats"]
        history = self.cache_data["source_stats"][source_id]["fetch_history"]

        # Update totals
        stats["total_attempts"] += 1
        if result.status == "success":
            stats["success_count"] += 1
        else:
            stats["fail_count"] += 1

        # Calculate rolling averages
        if history:
            durations = [h["duration_ms"] for h in history]
            items_counts = [h["items_extracted"] for h in history if h["status"] == "success"]
            quality_scores = [h["avg_quality"] for h in history if h["status"] == "success"]

            stats["avg_duration_ms"] = sum(durations) / len(durations)
            stats["success_rate"] = stats["success_count"] / stats["total_attempts"]

            if items_counts:
                stats["avg_items_per_fetch"] = sum(items_counts) / len(items_counts)
            if quality_scores:
                stats["avg_quality_score"] = sum(quality_scores) / len(quality_scores)
                avg_quality = stats["avg_quality_score"]
                stats["std_quality_score"] = (
                    sum((q - avg_quality) ** 2 for q in quality_scores) / len(quality_scores)
                ) ** 0.5

        # Update 7-day and 30-day windows
        self._update_time_windows(source_id, stats)

    def _update_time_windows(self, source_id: str, stats: Dict) -> None:
        """Update time-windowed statistics"""
        history = self.cache_data["source_stats"][source_id]["fetch_history"]
        now = datetime.now()

        for window_name, days in [("last_7_days", 7), ("last_30_days", 30)]:
            window_start = now - timedelta(days=days)
            window_history = [
                h for h in history
                if datetime.fromisoformat(h["date"]) >= window_start
            ]

            if window_history:
                window_stats = stats[window_name]
                successful = [h for h in window_history if h["status"] == "success"]

                window_stats["attempts"] = len(window_history)
                window_stats["success_rate"] = len(successful) / len(window_history)

                if successful:
                    qualities = [h["avg_quality"] for h in successful]
                    window_stats["avg_quality"] = sum(qualities) / len(qualities)

    def _update_circuit_breaker(self, source_id: str, result: FetchResult) -> None:
        """Update circuit breaker state"""
        cb = self.cache_data["source_stats"][source_id]["circuit_breaker"]

        if result.status == "success":
            cb["consecutive_failures"] = 0
            if cb["status"] == "half_open":
                cb["success_count_half_open"] += 1
                if cb["success_count_half_open"] >= 3:
                    cb["status"] = "closed"
                    cb["success_count_half_open"] = 0
        else:
            cb["consecutive_failures"] += 1
            cb["last_failure_time"] = result.timestamp.isoformat()

            if cb["status"] == "closed" and cb["consecutive_failures"] >= 5:
                cb["status"] = "open"
                # Retry after exponential backoff: 2^failures * 10 minutes
                retry_minutes = (2 ** cb["consecutive_failures"]) * 10
                cb["next_retry_time"] = (
                    result.timestamp + timedelta(minutes=retry_minutes)
                ).isoformat()
            elif cb["status"] == "open":
                # Check if it's time to retry
                if result.timestamp >= datetime.fromisoformat(cb["next_retry_time"]):
                    cb["status"] = "half_open"
                    cb["success_count_half_open"] = 0

    def should_fetch_source(self, source_id: str) -> Tuple[bool, Optional[str]]:
        """Check if a source should be fetched based on circuit breaker"""
        if source_id not in self.cache_data["source_stats"]:
            return True, None

        cb = self.cache_data["source_stats"][source_id]["circuit_breaker"]
        now = datetime.now()

        if cb["status"] == "closed":
            return True, None
        elif cb["status"] == "open":
            if now >= datetime.fromisoformat(cb["next_retry_time"]):
                return True, "circuit_breaker_half_open"
            else:
                return False, f"circuit_breaker_open_until_{cb['next_retry_time']}"
        elif cb["status"] == "half_open":
            return True, "circuit_breaker_half_open"

    def get_optimization_hints(self, target_items: int = 20) -> Dict[str, Any]:
        """Generate optimization hints for next run"""
        hints = {
            "priority_sources": [],
            "skip_sources": [],
            "retry_sources": [],
            "suggested_batch_size": 3,
            "recommended_timeout": 30000
        }

        # Analyze source performance
        source_scores = {}
        for source_id, data in self.cache_data["source_stats"].items():
            stats = data["rolling_stats"]
            cb = data["circuit_breaker"]

            # Calculate weighted score
            if stats["total_attempts"] > 0:
                score = (
                    stats["success_rate"] * 0.4 +
                    (stats["avg_quality_score"] / 5.0) * 0.3 +
                    min(stats["avg_items_per_fetch"] / 10, 1.0) * 0.2 +
                    (1.0 / (1.0 + stats["avg_duration_ms"] / 5000)) * 0.1
                )
            else:
                score = 0.5  # Default score for new sources

            source_scores[source_id] = score

            # Check circuit breaker
            should_fetch, reason = self.should_fetch_source(source_id)
            if not should_fetch:
                hints["skip_sources"].append(source_id)
            elif cb["status"] == "half_open":
                hints["retry_sources"].append(source_id)
            else:
                hints["priority_sources"].append(source_id)

        # Sort priority sources by score
        hints["priority_sources"].sort(key=lambda x: source_scores[x], reverse=True)

        # Adjust batch size based on historical performance
        avg_success_rate = sum(s["rolling_stats"]["success_rate"]
                               for s in self.cache_data["source_stats"].values()) / len(self.cache_data["source_stats"])
        if avg_success_rate > 0.9:
            hints["suggested_batch_size"] = 4
        elif avg_success_rate < 0.7:
            hints["suggested_batch_size"] = 2

        return hints

    def save_cache(self) -> None:
        """Save cache to file"""
        # Convert deques to lists for JSON serialization
        cache_copy = json.loads(json.dumps(self.cache_data, default=str))

        for source_data in cache_copy.get("source_stats", {}).values():
            if "fetch_history" in source_data and hasattr(source_data["fetch_history"], '__iter__'):
                source_data["fetch_history"] = list(source_data["fetch_history"])

        with open(self.cache_file, 'w') as f:
            json.dump(cache_copy, f, indent=2, ensure_ascii=False)

        logger.info(f"Saved cache with {len(self.cache_data['source_stats'])} sources")

class AdaptiveScheduler:
    """Implements adaptive scheduling based on performance data"""

    def __init__(self, tracker: PerformanceTracker):
        self.tracker = tracker
        self.min_quality_threshold = 3.5
        self.target_items = 20
        self.confidence_threshold = 0.8

    def get_source_batch(self, tier: str, batch_size: int = 3) -> List[str]:
        """Get batch of sources for execution"""
        hints = self.tracker.get_optimization_hints()

        # Get sources from specified tier
        available_sources = self._get_tier_sources(tier)

        # Filter by circuit breaker
        available_sources = [
            s for s in available_sources
            if s in hints["priority_sources"] or s in hints["retry_sources"]
        ]

        # Score and sort sources
        scored_sources = []
        for source_id in available_sources:
            score = self._calculate_source_score(source_id)
            scored_sources.append((source_id, score))

        scored_sources.sort(key=lambda x: x[1], reverse=True)

        # Return top sources
        return [s[0] for s in scored_sources[:batch_size]]

    def _get_tier_sources(self, tier: str) -> List[str]:
        """Get sources for specified tier"""
        # This would load from sources.json in real implementation
        tier_sources = {
            "tier1": ["hn", "hf_papers", "one_useful_thing", "paul_graham"],
            "tier2": ["james_clear", "farnam_street", "hacker_noon", "scott_young"],
            "tier3": ["product_hunt", "latent_space"]
        }
        return tier_sources.get(tier, [])

    def _calculate_source_score(self, source_id: str) -> float:
        """Calculate dynamic score for source"""
        source_data = self.tracker.cache_data["source_stats"].get(source_id)
        if not source_data:
            return 0.5  # Default score

        stats = source_data["rolling_stats"]
        if stats["total_attempts"] == 0:
            return 0.5

        # Quality score (30%)
        quality_score = stats["avg_quality_score"] / 5.0

        # Success rate (40%)
        success_score = stats["success_rate"]

        # Efficiency score (20%)
        efficiency_score = min(1.0, 10.0 / (stats["avg_duration_ms"] / 1000))

        # Volume score (10%)
        volume_score = min(1.0, stats["avg_items_per_fetch"] / 10)

        return (
            quality_score * 0.3 +
            success_score * 0.4 +
            efficiency_score * 0.2 +
            volume_score * 0.1
        )

    def get_adaptive_thresholds(self, items_collected_so_far: int,
                              quality_avg_so_far: float) -> Dict[str, float]:
        """Get adaptive quality thresholds based on current run"""
        if items_collected_so_far >= self.target_items and quality_avg_so_far >= 4.0:
            # High quality day - be more selective
            return {
                "min_quality": 4.0,
                "early_stop_at": self.target_items + 2
            }
        elif items_collected_so_far < self.target_items / 2:
            # Low content day - relax requirements
            return {
                "min_quality": max(3.0, self.min_quality_threshold - 1.0),
                "early_stop_at": self.target_items + 5
            }
        else:
            # Normal day - use default
            return {
                "min_quality": self.min_quality_threshold,
                "early_stop_at": self.target_items + 3
            }

# Example usage and testing
if __name__ == "__main__":
    # Initialize tracker
    tracker = PerformanceTracker("cache_enhanced.json")

    # Simulate some fetch results
    results = [
        FetchResult("hn", datetime.now(), 1500, "success", 15, 8, 4.5, [], 45000),
        FetchResult("hf_papers", datetime.now(), 2300, "success", 12, 7, 4.8, [], 125000),
        FetchResult("product_hunt", datetime.now(), 30000, "timeout", 0, 0, 0, ["Request timeout"], 0)
    ]

    # Record results
    for result in results:
        tracker.record_fetch(result)

    # Generate optimization hints
    hints = tracker.get_optimization_hints()
    print("Optimization Hints:", json.dumps(hints, indent=2))

    # Initialize scheduler
    scheduler = AdaptiveScheduler(tracker)

    # Get source batch
    batch = scheduler.get_source_batch("tier1", 2)
    print(f"\nRecommended tier1 batch: {batch}")

    # Get adaptive thresholds
    thresholds = scheduler.get_adaptive_thresholds(10, 4.2)
    print(f"\nAdaptive thresholds: {thresholds}")

    # Save cache
    tracker.save_cache()