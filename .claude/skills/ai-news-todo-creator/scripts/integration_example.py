#!/usr/bin/env python3
"""
Integration example showing how to use ai-news-todo-creator with daily-news-report
集成示例，展示如何将 ai-news-todo-creator 与 daily-news-report 结合使用
"""

import json
from datetime import datetime
from process_ai_news import AINewsTodoCreator, NewsItem

def example_integration():
    """
    Example of integrating with daily-news-report output
    与 daily-news-report 输出集成的示例
    """

    # Example: Read from daily-news-report output
    # This would normally come from the daily-news-report skill
    news_data = {
        "date": "2026-02-08",
        "articles": [
            {
                "title": "OpenAI Releases GPT-5 with Revolutionary Multimodal Capabilities",
                "content": "OpenAI announced GPT-5 today, featuring unprecedented multimodal understanding that processes text, images, video, and audio simultaneously. The model shows 40% improvement in reasoning tasks and can generate 4K videos from text descriptions.",
                "source": "OpenAI Blog",
                "url": "https://openai.com/gpt-5",
                "category": "AI Technology"
            },
            {
                "title": "Claude 4.0: Anthropic's Answer to Enterprise AI Demand",
                "content": "Anthropic unveils Claude 4.0, specifically designed for enterprise applications. Features include enhanced security, compliance tools, and industry-specific models for finance and healthcare. Early customers report 50% productivity gains.",
                "source": "Anthropic News",
                "url": "https://anthropic.com/claude-4-enterprise",
                "category": "Enterprise AI"
            },
            {
                "title": "AI Hardware Startup Raises $500M for Novel Chip Design",
                "content": "Cerebral Chips secures Series C funding for their revolutionary neuromorphic processor that mimics human brain architecture. The chip promises 100x energy efficiency for AI workloads compared to traditional GPUs.",
                "source": "TechCrunch",
                "url": "https://techcrunch.com/cerebral-chips-funding",
                "category": "AI Hardware"
            }
        ]
    }

    # Convert to NewsItem format
    news_items = []
    for article in news_data["articles"]:
        item = NewsItem(
            title=article["title"],
            content=article["content"],
            source=article["source"],
            date=news_data["date"],
            url=article["url"]
        )
        news_items.append(item)

    # User configuration
    user_config = {
        "focus_areas": ["business_impact", "tech_hardware"],
        "task_types": ["learning", "testing", "reflection", "research"],
        "companies": ["claude", "openai", "cursor"]
    }

    # Process news and create tasks
    creator = AINewsTodoCreator()
    relevant_news = creator.analyze_news_relevance(news_items, user_config)
    tasks = creator.create_todo_tasks(relevant_news, user_config)

    # Format and display results
    print("# AI News Todo Tasks for", news_data["date"])
    print("=" * 50)
    print(creator.format_todo_output(tasks))

    # Save tasks to file
    tasks_data = []
    for task in tasks:
        tasks_data.append({
            "title": task.title,
            "description": task.description,
            "category": task.category,
            "priority": task.priority,
            "estimated_time": task.estimated_time,
            "source_news": task.source_news,
            "created_date": datetime.now().strftime("%Y-%m-%d")
        })

    output_file = f"ai_todos_{news_data['date']}.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(tasks_data, f, ensure_ascii=False, indent=2)

    print(f"\nTasks saved to: {output_file}")
    return tasks

if __name__ == "__main__":
    example_integration()