# User Configuration Reference
# 用户配置参考

This document provides examples and options for configuring the AI News Todo Creator skill.
本文档提供 AI 新闻待办创建器技能的配置示例和选项。

## Configuration Options
## 配置选项

### 1. Focus Areas
### 1. 关注领域

```json
{
  "focus_areas": [
    "business_impact",      // Business impact analysis - 商业影响分析
    "tech_hardware",        // Hardware/software innovations - 硬件/软件创新
    "ecommerce",            // E-commerce applications - 电商应用
    "new_media"             // New media applications - 新媒体应用
  ]
}
```

### 2. Task Types
### 2. 任务类型

```json
{
  "task_types": [
    "learning",     // Learning tasks - 学习任务
    "testing",      // Testing/experimentation - 测试/实验
    "reflection",   // Reflection/analysis - 反思/分析
    "research"      // Research/investigation - 研究/调查
  ]
}
```

### 3. Company/Technology Focus
### 3. 公司/技术关注

```json
{
  "companies": [
    "claude",
    "openai",
    "cursor",
    "openclaw",
    "anthropic"
  ]
}
```

## Example Configuration
## 配置示例

### Comprehensive Configuration
### 综合配置

```json
{
  "focus_areas": ["business_impact", "ecommerce", "tech_hardware"],
  "task_types": ["learning", "testing", "reflection"],
  "companies": ["claude", "openai", "cursor"],
  "priority_keywords": [
    "breakthrough",
    "revolutionary",
    "funding",
    "acquisition"
  ],
  "include_competitor_news": true,
  "minimum_relevance_score": 3.0
}
```

### Minimal Configuration
### 最小配置

```json
{
  "companies": ["claude", "openai"],
  "task_types": ["learning"]
}
```

## Usage Instructions
## 使用说明

When using the skill, provide your configuration in natural language:
使用技能时，用自然语言提供您的配置：

- "Focus on Claude and OpenAI developments"
  "关注 Claude 和 OpenAI 的发展"

- "I want learning and testing tasks about AI hardware"
  "我想要关于AI硬件的学习和测试任务"

- "Create todos about e-commerce AI applications"
  "创建关于电商AI应用的待办事项"

- "Priority on business impact news from Cursor and Anthropic"
  "优先处理来自Cursor和Anthropic的商业影响新闻"

## Advanced Options
## 高级选项

### Custom Keywords
### 自定义关键词

You can add specific keywords to track:
您可以添加特定关键词进行跟踪：

```json
{
  "custom_keywords": [
    "your-specific-interest",
    "industry-specific-term"
  ]
}
```

### Time Preferences
### 时间偏好

```json
{
  "time_preferences": {
    "max_task_time": "4 hours",      // Maximum time per task - 每个任务最长时间
    "preferred_time_range": "1-3 hours" // Preferred task duration - 偏好任务时长
  }
}
```

### Filtering Options
### 过滤选项

```json
{
  "filtering": {
    "exclude_keywords": ["rumor", "speculation"],
    "require_verified_sources": true,
    "minimum_content_length": 300
  }
}
```