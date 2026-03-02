---
name: bilibili-analyzer
description: Analyze Bilibili (B站) video content, including metadata extraction, content analysis, engagement metrics, and user insights. Use when users want to analyze video information from Bilibili URLs, extract video statistics, or understand trends from B站 content.
---

# Bilibili Video Analyzer

This skill provides comprehensive analysis of Bilibili (B站) video content, including metadata extraction, performance metrics, and content insights.

## Tools

### `analyze_video.py`
A Python script to fetch real-time data from Bilibili APIs.

**Location:** `scripts/analyze_video.py`

**Usage:**
```bash
python ".claude/skills/bilibili-analyzer/scripts/analyze_video.py" "https://www.bilibili.com/video/BV1xx411c7mD"
```

**Output:** JSON object containing:
- `basic_info`: Title, description, upload date, author info.
- `stats`: View count, danmaku, reply, favorite, coin, share, like.

## Capabilities

### 1. Video Metadata Extraction
- Extract video title, description, tags, and category
- Analyze upload date, video duration, and resolution
- Identify video owner (UP主) information and statistics
- Extract thumbnail and cover image information

### 2. Engagement Metrics Analysis
- View count (播放量) trends and analysis
- Like ratio (点赞率) and engagement rate
- Comments (评论) sentiment analysis
- Shares (分享) and coin donations (投币)
- Favorite (收藏) and follow (关注) conversions

### 3. Content Analysis
- OCR and subtitle extraction from videos (requires additional tools)
- Speech-to-text conversion for audio content (requires additional tools)
- Key frame extraction and analysis
- Topic and keyword extraction
- Content quality assessment

### 4. UP主 (Creator) Analysis
- Channel statistics and performance metrics
- Upload frequency and consistency
- Audience demographics insights
- Content category specialization
- Historical performance trends

## Usage Guidelines

1. **Fetch Data**: When provided with a Bilibili URL, first run the `analyze_video.py` script to get the raw data.
   ```bash
   python ".claude/skills/bilibili-analyzer/scripts/analyze_video.py" "<URL>"
   ```

2. **Analyze Metrics**: Use the JSON output to calculate engagement rates. Refer to `references/analysis_patterns.md` for benchmarks.
   - **Engagement Rate**: `(Likes + Coins + Favorites) / Views`
   - **Like Ratio**: `Likes / Views`

3. **Report**: Present the findings in a structured format (Markdown).
   - **Summary**: Key stats at a glance.
   - **Deep Dive**: Analysis of the metrics (e.g., "High coin-to-like ratio suggests high quality content").
   - **Recommendations**: If applicable (e.g., for content creators).

4. **Bilingual Output**: As per project rules, ensure the final report is in both English and Chinese if requested or required by context.

## Examples

- "Analyze this B站 video: https://www.bilibili.com/video/BV1xx411c7mD"
- "Extract the transcript and key topics from this Bilibili video"
- "Compare the engagement metrics of these two B站 videos"
- "Analyze the comment sentiment for this Bilibili upload"
- "Get statistics about this UP主's channel performance"

## Reference Files
- `references/analysis_patterns.md`: Benchmarks for views, likes, and growth.
- `references/api_endpoints.md`: Documentation of the Bilibili APIs used.
