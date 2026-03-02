#!/usr/bin/env python3
"""
AI News Todo Creator - AI新闻待办创建器
Processes daily AI news and creates intelligent todo tasks.
处理每日AI新闻并创建智能待办任务。
"""

import re
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any
from dataclasses import dataclass

@dataclass
class NewsItem:
    title: str
    content: str
    source: str
    date: str
    url: str
    relevance_score: float = 0.0

@dataclass
class TodoTask:
    title: str
    description: str
    category: str
    priority: str
    estimated_time: str
    source_news: str

class AINewsTodoCreator:
    def __init__(self):
        self.ai_keywords = [
            'claude', 'cursor', 'openai', 'openclaw', 'anthropic',
            'gpt', 'llm', 'agi', 'machine learning', 'deep learning',
            'neural network', 'generative ai', 'chatbot', 'copilot',
            'large language model', 'transformer', 'prompt engineering',
            'fine-tuning', 'embedding', 'vector database', 'ai model'
        ]

        self.business_keywords = [
            'revenue', 'funding', 'investment', 'ipo', 'acquisition',
            'startup', 'unicorn', 'valuation', 'profit', 'growth',
            'market share', 'competition', 'strategy', 'business model'
        ]

        self.tech_hardware_keywords = [
            'gpu', 'tpu', 'chip', 'semiconductor', 'nvidia', 'amd',
            'intel', 'apple silicon', 'quantum computer', 'edge computing',
            'data center', 'cloud infrastructure', 'server', 'hardware'
        ]

        self.ecommerce_keywords = [
            'e-commerce', 'cross-border', 'shopify', 'amazon', 'alibaba',
            'dropshipping', 'payment', 'logistics', 'supply chain',
            'customer service', 'personalization', 'recommendation'
        ]

        self.media_keywords = [
            'content creation', 'social media', 'tiktok', 'youtube',
            'instagram', 'influencer', 'marketing', 'advertising',
            'seo', 'content marketing', 'digital media', 'streaming'
        ]

    def analyze_news_relevance(self, news_items: List[NewsItem], user_interests: Dict[str, Any]) -> List[NewsItem]:
        """
        Analyze news relevance based on user interests.
        根据用户兴趣分析新闻相关性。
        """
        relevant_news = []

        for item in news_items:
            score = 0.0
            title_lower = item.title.lower()
            content_lower = item.content.lower()

            # Check AI technology keywords
            if any(keyword in title_lower or keyword in content_lower for keyword in self.ai_keywords):
                score += 3.0

            # Check specific interests
            if user_interests.get('focus_areas'):
                for focus in user_interests['focus_areas']:
                    if focus == 'business_impact' and any(k in title_lower + content_lower for k in self.business_keywords):
                        score += 2.0
                    elif focus == 'tech_hardware' and any(k in title_lower + content_lower for k in self.tech_hardware_keywords):
                        score += 2.0
                    elif focus == 'ecommerce' and any(k in title_lower + content_lower for k in self.ecommerce_keywords):
                        score += 2.0
                    elif focus == 'new_media' and any(k in title_lower + content_lower for k in self.media_keywords):
                        score += 2.0

            # Bonus for specific companies
            ai_companies = ['claude', 'anthropic', 'openai', 'cursor', 'openclaw']
            if any(company in title_lower or company in content_lower for company in ai_companies):
                score += 1.5

            # Content quality indicators
            if len(item.content) > 500:  # Substantial content
                score += 0.5
            if item.source in ['Hacker News', 'HuggingFace Papers', 'One Useful Thing']:
                score += 1.0

            item.relevance_score = score
            if score >= 3.0:  # Minimum relevance threshold
                relevant_news.append(item)

        return sorted(relevant_news, key=lambda x: x.relevance_score, reverse=True)

    def create_todo_tasks(self, news_items: List[NewsItem], user_preferences: Dict[str, Any]) -> List[TodoTask]:
        """
        Create todo tasks from relevant news items.
        从相关新闻项目创建待办任务。
        """
        tasks = []

        for item in news_items[:10]:  # Limit to top 10 relevant items
            # Generate tasks based on content analysis
            tasks.extend(self._generate_learning_tasks(item))
            tasks.extend(self._generate_testing_tasks(item))
            tasks.extend(self._generate_reflection_tasks(item))
            tasks.extend(self._generate_research_tasks(item))

        # Filter based on user preferences
        if user_preferences.get('task_types'):
            tasks = [t for t in tasks if t.category in user_preferences['task_types']]

        # Set priorities based on relevance
        for task in tasks:
            if item.relevance_score >= 8:
                task.priority = 'High'
            elif item.relevance_score >= 6:
                task.priority = 'Medium'
            else:
                task.priority = 'Low'

        return tasks[:20]  # Limit total tasks

    def _generate_learning_tasks(self, item: NewsItem) -> List[TodoTask]:
        """Generate learning-focused tasks."""
        tasks = []

        # Technology learning tasks
        if 'new model' in item.title.lower() or 'announces' in item.title.lower():
            tasks.append(TodoTask(
                title=f"Research {item.title.split('-')[0].strip()}",
                description=f"Learn about the new AI model/technology announced: {item.title}. Key aspects: capabilities, use cases, technical specifications.",
                category='learning',
                priority='Medium',
                estimated_time='2-3 hours',
                source_news=item.title
            ))

        # Framework/Library learning
        if any(frame in item.content.lower() for frame in ['framework', 'library', 'sdk', 'api']):
            tasks.append(TodoTask(
                title=f"Explore framework mentioned in: {item.title[:50]}...",
                description=f"Investigate the framework/library mentioned in this news. Document its purpose, key features, and potential applications.",
                category='learning',
                priority='Medium',
                estimated_time='1-2 hours',
                source_news=item.title
            ))

        return tasks

    def _generate_testing_tasks(self, item: NewsItem) -> List[TodoTask]:
        """Generate testing and experimentation tasks."""
        tasks = []

        # Tool testing
        if 'tool' in item.title.lower() or 'platform' in item.title.lower():
            tasks.append(TodoTask(
                title=f"Test: {item.title.split('-')[0].strip()}",
                description=f"Try out the new tool/platform mentioned. Create a simple test project to evaluate its capabilities and limitations.",
                category='testing',
                priority='High',
                estimated_time='3-4 hours',
                source_news=item.title
            ))

        # API/SDK testing
        if any(term in item.content.lower() for term in ['api', 'sdk', 'integration']):
            tasks.append(TodoTask(
                title=f"Test integration from: {item.title[:40]}...",
                description=f"Test the API/SDK integration mentioned. Write sample code to understand implementation complexity.",
                category='testing',
                priority='Medium',
                estimated_time='2-3 hours',
                source_news=item.title
            ))

        return tasks

    def _generate_reflection_tasks(self, item: NewsItem) -> List[TodoTask]:
        """Generate reflection and analysis tasks."""
        tasks = []

        # Business impact analysis
        if any(term in item.content.lower() for term in ['business', 'industry', 'market', 'economy']):
            tasks.append(TodoTask(
                title=f"Analyze business impact: {item.title[:50]}...",
                description=f"Write a brief analysis of how this development affects the AI industry and potential business opportunities it creates.",
                category='reflection',
                priority='High',
                estimated_time='1-2 hours',
                source_news=item.title
            ))

        # Ethical/societal implications
        if any(term in item.content.lower() for term in ['ethical', 'safety', 'regulation', 'policy']):
            tasks.append(TodoTask(
                title=f"Consider implications: {item.title[:40]}...",
                description=f"Reflect on the broader implications of this development. Consider ethics, safety, and regulatory aspects.",
                category='reflection',
                priority='Medium',
                estimated_time='45-60 mins',
                source_news=item.title
            ))

        return tasks

    def _generate_research_tasks(self, item: NewsItem) -> List[TodoTask]:
        """Generate research and investigation tasks."""
        tasks = []

        # Market research
        if 'funding' in item.content.lower() or 'investment' in item.content.lower():
            tasks.append(TodoTask(
                title=f"Research market: {item.title.split('-')[0].strip()}",
                description=f"Investigate the market context around this funding/investment. Analyze competitive landscape and market trends.",
                category='research',
                priority='Medium',
                estimated_time='2-3 hours',
                source_news=item.title
            ))

        # Technical research
        if any(term in item.content.lower() for term in ['research', 'study', 'paper', 'breakthrough']):
            tasks.append(TodoTask(
                title=f"Deep dive: {item.title[:50]}...",
                description=f"Research the technical details behind this development. Find and review any related papers or documentation.",
                category='research',
                priority='High',
                estimated_time='3-4 hours',
                source_news=item.title
            ))

        return tasks

    def format_todo_output(self, tasks: List[TodoTask]) -> str:
        """
        Format tasks into readable output.
        格式化任务为可读的输出。
        """
        if not tasks:
            return "No relevant AI news tasks identified today. Check back tomorrow!"

        output = []
        output.append("# AI News Todo Tasks - AI新闻待办任务")
        output.append(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        output.append("")

        # Group by category
        categories = {}
        for task in tasks:
            if task.category not in categories:
                categories[task.category] = []
            categories[task.category].append(task)

        for category, category_tasks in categories.items():
            output.append(f"## {category.title()} Tasks - {self._get_category_name_cn(category)}类任务")
            output.append("")

            for i, task in enumerate(category_tasks, 1):
                output.append(f"### {i}. {task.title}")
                output.append(f"**Priority:** {task.priority} | **Time:** {task.estimated_time}")
                output.append(f"**Description:** {task.description}")
                output.append(f"**Source:** {task.source_news}")
                output.append("")

        return "\n".join(output)

    def _get_category_name_cn(self, category: str) -> str:
        mapping = {
            'learning': '学习',
            'testing': '测试',
            'reflection': '反思',
            'research': '研究'
        }
        return mapping.get(category, category)

def main():
    """Example usage of the AI News Todo Creator."""
    creator = AINewsTodoCreator()

    # Example user configuration
    user_interests = {
        'focus_areas': ['business_impact', 'tech_hardware', 'ecommerce'],
        'task_types': ['learning', 'testing', 'reflection'],
        'companies': ['claude', 'openai', 'cursor']
    }

    # Demo news items (in real use, these would come from news sources)
    demo_news = [
        NewsItem(
            title="Claude 3.5 Sonnet: A New Era of AI Assistance",
            content="Anthropic has released Claude 3.5 Sonnet with significant improvements in coding, reasoning, and visual understanding. The model shows 2x speed improvement over Claude 3 Opus.",
            source="Anthropic Blog",
            date="2026-02-08",
            url="https://anthropic.com/claude-3-5-sonnet"
        ),
        NewsItem(
            title="OpenAI's New API Pricing Shakes Up the Market",
            content="OpenAI announced dramatic price reductions for their GPT models, with some API calls now 75% cheaper. This move is expected to accelerate AI adoption in enterprises.",
            source="TechCrunch",
            date="2026-02-08",
            url="https://techcrunch.com/openai-pricing"
        )
    ]

    # Process news and create tasks
    relevant_news = creator.analyze_news_relevance(demo_news, user_interests)
    tasks = creator.create_todo_tasks(relevant_news, user_interests)

    # Output formatted tasks
    print(creator.format_todo_output(tasks))

if __name__ == "__main__":
    main()