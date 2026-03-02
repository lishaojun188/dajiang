---
name: ai-news-todo-creator
description: Create intelligent todo tasks based on daily AI technology news. Use when users want to track AI developments (Claude, Cursor, OpenAI, OpenClaw, etc.), AI business impacts, high-tech hardware/software, or AI applications in cross-border e-commerce and new media industries. Filters news validity and creates actionable tasks for learning, testing, or reflection.
argument-hint: "[可选: 日期] [可选: 关注领域]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Task, WebFetch, Read, Write, Shell(mkdir*), Shell(date*), Shell(ls*), TodoWrite
---

# AI News Todo Creator v2.0

> **核心目标**：从多平台新闻源中筛选有效 AI 资讯，生成可执行的学习/测试/反思任务
> **Core Goal**: Filter valid AI news from multi-platform sources and generate actionable learning/testing/reflection tasks

## 架构概览 | Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI News Todo Creator Pipeline                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐        │
│  │ 1. 采集   │ → │ 2. 筛选   │ → │ 3. 标签   │ → │ 4. 生成   │        │
│  │ Collect   │   │ Filter   │   │ Tagging  │   │ Generate │        │
│  │ 多平台抓取 │   │ 有效性验证 │   │ 多维打标  │   │ 创建任务  │        │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘        │
│       ↓               ↓               ↓               ↓            │
│  sources.json   validity_rules  tags-taxonomy   TodoWrite          │
│  sources-cn.json                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

## 配置文件 | Configuration Files

| 文件 | 用途 |
|------|------|
| `SKILL.md` | 技能定义、流程、规则 |
| `sources-cn.json` | 国内平台数据源配置 |
| `tags-taxonomy.json` | 标签分类体系（人员/产品/行业/公司） |
| 依赖 `daily-news-report/sources.json` | 国际平台数据源配置 |

---

## Phase 1: 数据源平台 | Data Source Platforms

### 1.1 国际平台 (International Sources)

#### 文章/博客类 | Articles & Blogs

| ID | 平台 | URL | 类型 | 关注重点 |
|----|------|-----|------|----------|
| `hn` | Hacker News | https://news.ycombinator.com | 技术社区 | AI/编程/创业热门话题 |
| `hf_papers` | HuggingFace Papers | https://huggingface.co/papers | 论文 | 最新 AI 研究论文 |
| `one_useful_thing` | One Useful Thing | https://www.oneusefulthing.org | 博客 | Ethan Mollick 的 AI 实用洞察 |
| `openai_blog` | OpenAI Blog | https://openai.com/blog | 官方博客 | GPT/DALL-E/Sora 更新 |
| `anthropic_blog` | Anthropic Blog/News | https://www.anthropic.com/news | 官方博客 | Claude 模型更新与研究 |
| `cursor_changelog` | Cursor Changelog | https://www.cursor.com/changelog | 更新日志 | Cursor IDE 功能更新 |
| `cursor_forum` | Cursor Forum | https://forum.cursor.com | 社区论坛 | Cursor 使用技巧与讨论 |
| `latent_space` | Latent Space | https://www.latent.space | Podcast/Blog | AI 工程深度讨论 |
| `techcrunch_ai` | TechCrunch AI | https://techcrunch.com/category/artificial-intelligence/ | 科技媒体 | AI 行业新闻与融资 |
| `the_verge_ai` | The Verge AI | https://www.theverge.com/ai-artificial-intelligence | 科技媒体 | AI 产品与消费者影响 |
| `ars_ai` | Ars Technica AI | https://arstechnica.com/ai/ | 科技媒体 | AI 技术深度报道 |
| `producthunt` | Product Hunt | https://www.producthunt.com | 产品发现 | 新 AI 产品/工具上线 |
| `github_trending` | GitHub Trending | https://github.com/trending | 代码仓库 | 热门开源 AI 项目 |
| `arxiv_cs_ai` | arXiv CS.AI | https://arxiv.org/list/cs.AI/recent | 预印论文 | 最新 AI 学术研究 |
| `mit_tech_ai` | MIT Tech Review AI | https://www.technologyreview.com/topic/artificial-intelligence/ | 学术媒体 | AI 前沿技术解读 |

#### 视频/播客类 | Video & Podcasts

| ID | 平台 | URL | 类型 | 关注重点 |
|----|------|-----|------|----------|
| `yt_two_minute` | Two Minute Papers | YouTube | 视频 | AI 论文通俗解读 |
| `yt_fireship` | Fireship | YouTube | 视频 | 开发者工具/AI 快讯 |
| `yt_matt_wolfe` | Matt Wolfe | YouTube | 视频 | AI 工具每周汇总 |
| `yt_ai_explained` | AI Explained | YouTube | 视频 | AI 深度分析 |
| `yt_lex_fridman` | Lex Fridman Podcast | YouTube | 播客 | AI 大佬深度对话 |
| `yt_dwarkesh` | Dwarkesh Podcast | YouTube | 播客 | AI/科技深度访谈 |

#### 社交/讨论类 | Social & Discussion

| ID | 平台 | URL | 类型 | 关注重点 |
|----|------|-----|------|----------|
| `x_ai` | X (Twitter) AI 圈 | https://x.com | 社交媒体 | AI 从业者实时动态 |
| `reddit_ml` | r/MachineLearning | https://www.reddit.com/r/MachineLearning/ | 论坛 | ML 研究讨论 |
| `reddit_llm` | r/LocalLLaMA | https://www.reddit.com/r/LocalLLaMA/ | 论坛 | 本地大模型部署 |
| `reddit_cursor` | r/cursor | https://www.reddit.com/r/cursor/ | 论坛 | Cursor IDE 讨论 |

### 1.2 国内平台 (Domestic Chinese Sources)

#### 文章/资讯类 | Articles & News

| ID | 平台 | URL | 类型 | 关注重点 |
|----|------|-----|------|----------|
| `36kr_ai` | 36氪 AI 频道 | https://36kr.com/information/AI | 科技媒体 | AI 行业报道/融资/深度 |
| `jiqizhixin` | 机器之心 | https://www.jiqizhixin.com | AI 专业媒体 | AI 技术/论文/产品深度解读 |
| `leiphone_ai` | 雷锋网 AI 科技评论 | https://www.leiphone.com | AI 媒体 | AI 学术/产业报道 |
| `sspai` | 少数派 | https://sspai.com | 效率工具 | AI 工具评测/效率提升 |
| `geekpark` | 极客公园 | https://www.geekpark.net | 科技媒体 | AI 创业/产品/趋势 |
| `infoq_ai` | InfoQ AI 前线 | https://www.infoq.cn/topic/AI | 技术媒体 | AI 工程实践/架构 |
| `oschina_ai` | 开源中国 AI | https://www.oschina.net/news | 开发者社区 | AI 开源项目/工具 |
| `juejin_ai` | 掘金 AI 专栏 | https://juejin.cn/ai | 开发者社区 | AI 开发教程/实践 |
| `zhihu_ai` | 知乎 AI 话题 | https://www.zhihu.com/topic/19551275 | 知识社区 | AI 深度讨论/行业分析 |
| `huxiu_ai` | 虎嗅 AI | https://www.huxiu.com | 商业科技 | AI 商业应用/趋势 |
| `pingwest` | PingWest 品玩 | https://www.pingwest.com | 科技媒体 | 中美科技/AI 产品 |
| `aijishu` | AI 技术社区 | https://www.aijishu.com | AI 社区 | AI 技术讨论/教程 |

#### 视频/短视频类 | Video Platforms

| ID | 平台 | URL | 类型 | 关注重点 |
|----|------|-----|------|----------|
| `bilibili_ai` | B站 AI 频道 | https://www.bilibili.com | 视频平台 | AI 教程/评测/资讯 |
| `douyin_tech` | 抖音科技 | https://www.douyin.com | 短视频 | AI 工具演示/科技热点 |
| `xiaohongshu_ai` | 小红书 AI | https://www.xiaohongshu.com | 种草社区 | AI 工具推荐/使用体验 |
| `wx_channels` | 微信视频号 | WeChat | 短视频 | AI 大佬演讲/行业活动 |

#### 公众号/订阅类 | WeChat Official Accounts

| ID | 平台/账号 | 类型 | 关注重点 |
|----|-----------|------|----------|
| `wx_qbitai` | 量子位 | 公众号 | AI 行业新闻/技术解读 |
| `wx_xinzhiyuan` | 新智元 | 公众号 | AI 前沿资讯/深度报道 |
| `wx_jiqizhixin` | 机器之心 | 公众号 | AI 论文/技术/产品 |
| `wx_aiera` | AI Era | 公众号 | AI 产品评测/趋势 |
| `wx_chatgpt_guide` | ChatGPT 精选 | 公众号 | GPT 使用技巧/应用 |
| `wx_leiphoneai` | 雷锋网 AI | 公众号 | AI 学术/产业 |

#### 跨境电商/新媒体专项 | Cross-Border E-Commerce & New Media

| ID | 平台 | URL | 类型 | 关注重点 |
|----|------|-----|------|----------|
| `cifnews` | 雨果跨境 | https://www.cifnews.com | 跨境电商 | AI 在跨境电商中的应用 |
| `dsb` | 电商报 | https://www.dsb.cn | 电商媒体 | 电商 AI 工具/趋势 |
| `ebrun` | 亿邦动力 | https://www.ebrun.com | 电商媒体 | 电商行业 AI 变革 |
| `amz123` | AMZ123 | https://www.amz123.com | 亚马逊卖家 | AI 选品/运营/广告工具 |
| `sellersprite` | 卖家精灵 | https://www.sellersprite.com | 亚马逊工具 | AI 数据分析/选品 |
| `newrank` | 新榜 | https://www.newrank.cn | 新媒体数据 | AI 内容创作/新媒体趋势 |
| `topklout` | 克劳锐 | https://www.topklout.com | KOL 数据 | AI 网红营销/社交电商 |
| `socialmediatoday` | Social Media Today | https://www.socialmediatoday.com | 社媒营销 | AI 在社交媒体营销中的应用 |

---

## Phase 2: 新闻有效性筛选 | News Validity Filtering

### 2.1 纳入规则 (Include Rules)

新闻必须满足以下**至少一项**条件才被纳入：
A news item must meet **at least one** of the following criteria:

```yaml
include_rules:
  # AI 技术发展 | AI Technology Development
  - category: "ai_tech_development"
    description: "AI 模型/框架/算法的重大更新或突破"
    examples:
      - "Claude 4 发布/升级"
      - "GPT-5 新特性公告"
      - "开源大模型新突破 (LLaMA, Mistral, Qwen)"
      - "Cursor 新功能更新"
      - "OpenClaw 项目进展"
      - "新的训练方法/推理优化"
      - "多模态模型进展"
      - "Agent/RAG/Function Calling 新范式"

  # AI 应用与商业影响 | AI Application & Business Impact
  - category: "ai_business_impact"
    description: "AI 对商业模式、行业格局的实质性影响"
    examples:
      - "AI 替代/增强某职业的实际案例"
      - "企业 AI 转型成功/失败案例"
      - "AI 创业公司获得重大融资"
      - "大厂 AI 战略调整"
      - "AI 导致的行业重组"

  # 高科技软硬件 | High-Tech Software & Hardware
  - category: "high_tech_sw_hw"
    description: "与 AI 相关的软硬件创新"
    examples:
      - "AI 芯片/GPU 新品 (NVIDIA, AMD, Apple Silicon)"
      - "AI 推理硬件 (Groq, Cerebras)"
      - "AI 开发工具/IDE 更新"
      - "新的 AI 框架/库发布"
      - "边缘 AI/端侧部署方案"

  # 跨境电商 AI 应用 | Cross-Border E-Commerce AI
  - category: "cross_border_ecom"
    description: "AI 在跨境电商中的实际应用"
    examples:
      - "AI 选品/市场分析工具"
      - "AI 生成商品 listing/图片/视频"
      - "AI 客服/翻译解决方案"
      - "AI 广告投放优化"
      - "AI 供应链/物流优化"
      - "平台 AI 政策变更 (Amazon, TikTok Shop, Temu)"

  # 新媒体 AI 应用 | New Media AI Application
  - category: "new_media_ai"
    description: "AI 在新媒体/内容创作中的应用"
    examples:
      - "AI 视频生成/编辑 (Sora, Runway, Pika)"
      - "AI 图片生成/编辑 (Midjourney, SD, FLUX)"
      - "AI 文案/脚本生成"
      - "AI 直播/虚拟主播"
      - "AI 社交媒体运营工具"
      - "AI SEO/内容分发优化"
```

### 2.2 排除规则 (Exclude Rules)

以下内容**必须排除**：
The following content **must be excluded**:

```yaml
exclude_rules:
  - type: "spam_marketing"
    description: "纯营销软文/广告"
    signals:
      - "充值/优惠券/促销链接"
      - "过度吹捧无实质内容"
      - "标题党/震惊体"

  - type: "outdated"
    description: "过时信息"
    signals:
      - "超过 7 天的新闻"
      - "已被证伪的消息"
      - "重复报道的旧闻"

  - type: "too_academic"
    description: "过度学术化/远离实用"
    signals:
      - "纯理论推导无应用价值"
      - "极度细分领域的小改进"

  - type: "low_quality"
    description: "低质量内容"
    signals:
      - "AI 生成的洗稿内容"
      - "无原创观点的信息聚合"
      - "内容空洞的热点蹭流量文"

  - type: "irrelevant"
    description: "与关注领域无关"
    signals:
      - "娱乐/体育/政治新闻"
      - "与 AI/科技无关的内容"
      - "非目标行业的应用"
```

### 2.3 质量评分 (Quality Scoring)

```yaml
quality_dimensions:
  relevance:          # 与关注领域的相关度 (1-5)
    weight: 0.35
    5: "直接相关核心关注的产品/公司"
    3: "间接相关 AI 行业"
    1: "边缘关联"

  actionability:      # 可执行性——是否能产出行动 (1-5)
    weight: 0.25
    5: "可立即试用新工具/API"
    3: "可学习新概念/趋势"
    1: "仅做了解"

  timeliness:         # 时效性 (1-5)
    weight: 0.20
    5: "当日发布的重大消息"
    3: "本周内的重要更新"
    1: "数天前的一般信息"

  source_authority:   # 来源权威性 (1-5)
    weight: 0.20
    5: "官方博客/顶级论文/知名记者"
    3: "知名社区/有影响力的个人博客"
    1: "不知名来源"

  # 最终分数 = Σ(dimension_score × weight)
  # 纳入阈值: final_score >= 3.0
  inclusion_threshold: 3.0
```

---

## Phase 3: 标签分类体系 | Tag Taxonomy System

### 3.1 人员标签 (Person Tags)

```yaml
person_tags:
  # AI 研究/公司领袖
  ai_leaders:
    - name: "Sam Altman"
      affiliation: "OpenAI CEO"
      relevance: ["GPT", "AGI", "AI 商业化"]
    - name: "Dario Amodei"
      affiliation: "Anthropic CEO"
      relevance: ["Claude", "AI 安全", "宪法 AI"]
    - name: "Daniela Amodei"
      affiliation: "Anthropic President"
      relevance: ["Anthropic 运营", "AI 政策"]
    - name: "Jensen Huang"
      affiliation: "NVIDIA CEO"
      relevance: ["GPU", "AI 芯片", "CUDA"]
    - name: "Satya Nadella"
      affiliation: "Microsoft CEO"
      relevance: ["Copilot", "Azure AI", "OpenAI 合作"]
    - name: "Sundar Pichai"
      affiliation: "Google CEO"
      relevance: ["Gemini", "DeepMind", "Google AI"]
    - name: "Mark Zuckerberg"
      affiliation: "Meta CEO"
      relevance: ["LLaMA", "开源 AI", "Meta AI"]
    - name: "Elon Musk"
      affiliation: "xAI/Tesla CEO"
      relevance: ["Grok", "xAI", "AI 监管"]

  # AI 技术/研究专家
  ai_researchers:
    - name: "Andrej Karpathy"
      affiliation: "前 Tesla/OpenAI"
      relevance: ["LLM 教育", "AI 开发实践"]
    - name: "Yann LeCun"
      affiliation: "Meta AI 首席科学家"
      relevance: ["深度学习", "AI 路线辩论"]
    - name: "Ilya Sutskever"
      affiliation: "SSI 创始人"
      relevance: ["超级智能", "AI 安全"]
    - name: "Jim Fan"
      affiliation: "NVIDIA 高级研究科学家"
      relevance: ["具身智能", "通用 Agent"]
    - name: "Fei-Fei Li (李飞飞)"
      affiliation: "斯坦福/World Labs"
      relevance: ["计算机视觉", "空间智能"]

  # AI 开发者/意见领袖
  ai_developers_kol:
    - name: "Ethan Mollick"
      affiliation: "沃顿商学院教授"
      relevance: ["AI 教育", "AI 实用指南"]
    - name: "Simon Willison"
      affiliation: "Datasette 创始人"
      relevance: ["LLM 工具", "AI 工程实践"]
    - name: "Swyx (Shawn Wang)"
      affiliation: "Latent Space"
      relevance: ["AI 工程", "行业分析"]
    - name: "Harrison Chase"
      affiliation: "LangChain CEO"
      relevance: ["LangChain", "AI Agent"]

  # 国内 AI 人物
  ai_leaders_cn:
    - name: "李彦宏"
      affiliation: "百度 CEO"
      relevance: ["文心一言", "百度 AI"]
    - name: "张一鸣"
      affiliation: "字节跳动创始人"
      relevance: ["豆包", "字节 AI"]
    - name: "梁文锋"
      affiliation: "DeepSeek 创始人"
      relevance: ["DeepSeek", "开源大模型"]
    - name: "杨植麟"
      affiliation: "Moonshot AI/Kimi 创始人"
      relevance: ["Kimi", "长文本大模型"]
    - name: "王小川"
      affiliation: "百川智能 CEO"
      relevance: ["百川大模型"]
    - name: "朱啸虎"
      affiliation: "金沙江创投"
      relevance: ["AI 投资", "AI 创业"]
    - name: "李开复"
      affiliation: "零一万物/创新工场"
      relevance: ["Yi 大模型", "AI 创业"]
    - name: "林斌"
      affiliation: "小米联合创始人"
      relevance: ["小米 AI", "端侧 AI"]
```

### 3.2 产品标签 (Product Tags)

```yaml
product_tags:
  # LLM 模型
  llm_models:
    - "GPT-4o" / "GPT-4.5" / "GPT-5" / "o1" / "o3"    # OpenAI
    - "Claude 3.5" / "Claude 4" / "Claude Code"           # Anthropic
    - "Gemini 2.0" / "Gemini Ultra"                        # Google
    - "LLaMA 3" / "LLaMA 4"                               # Meta
    - "Grok"                                                # xAI
    - "Mistral" / "Mixtral"                                # Mistral AI
    - "DeepSeek-V3" / "DeepSeek-R1"                        # DeepSeek
    - "Qwen 2.5" / "Qwen-Max"                             # 阿里通义
    - "文心一言 4.0"                                        # 百度
    - "Kimi"                                                # Moonshot
    - "豆包"                                                # 字节
    - "GLM-4"                                              # 智谱 AI
    - "Phi-4"                                              # Microsoft

  # AI 开发工具
  ai_dev_tools:
    - "Cursor"                         # AI 代码编辑器
    - "GitHub Copilot"                 # AI 代码助手
    - "Windsurf (Codeium)"            # AI IDE
    - "Replit Agent"                   # AI 开发平台
    - "v0.dev"                         # AI UI 生成
    - "Bolt.new"                       # AI 全栈开发
    - "Claude Code"                    # Claude CLI 工具
    - "Devin"                          # AI 软件工程师
    - "OpenClaw"                       # 开源 AI 工具

  # AI 创作/媒体工具
  ai_creative_tools:
    - "Midjourney"                     # AI 图像生成
    - "DALL-E 3"                       # OpenAI 图像
    - "Stable Diffusion" / "SD3" / "SDXL"  # 开源图像
    - "FLUX"                           # Black Forest Labs
    - "Sora"                           # OpenAI 视频
    - "Runway Gen-3"                   # AI 视频
    - "Pika"                           # AI 视频
    - "Kling (可灵)"                   # 快手 AI 视频
    - "Vidu"                           # 生数科技视频
    - "ElevenLabs"                     # AI 语音
    - "Suno"                           # AI 音乐
    - "Udio"                           # AI 音乐
    - "NotebookLM"                     # Google AI 笔记
    - "Perplexity"                     # AI 搜索

  # AI 框架/平台
  ai_frameworks:
    - "LangChain" / "LangGraph"
    - "LlamaIndex"
    - "CrewAI"
    - "AutoGen"
    - "Dify"                           # 国内 AI 应用平台
    - "Coze (扣子)"                    # 字节 AI 平台
    - "Ollama"                         # 本地模型运行
    - "vLLM"                           # 推理框架
    - "Hugging Face Transformers"

  # AI 硬件
  ai_hardware:
    - "NVIDIA H100" / "H200" / "B100" / "B200" / "GB200"
    - "AMD MI300X" / "MI350"
    - "Apple M4" / "M4 Ultra"
    - "Groq LPU"
    - "Cerebras WSE-3"
    - "Google TPU v6"
    - "Intel Gaudi 3"

  # 跨境电商 AI 工具
  ecom_ai_tools:
    - "Amazon AI 功能 (Rufus, AI Listing)"
    - "TikTok Shop AI"
    - "Temu AI 选品"
    - "Shopify Magic / Sidekick"
    - "Jasper AI"                      # 营销文案
    - "Copy.ai"                        # 营销文案
    - "AdCreative.ai"                  # 广告创意
```

### 3.3 行业标签 (Industry Tags)

```yaml
industry_tags:
  primary_industries:
    - id: "ai_core"
      name: "AI 核心技术"
      sub_tags:
        - "大语言模型 (LLM)"
        - "多模态 AI"
        - "AI Agent"
        - "AI 安全/对齐"
        - "强化学习 (RLHF/RLAIF)"
        - "推理优化"
        - "模型压缩/量化"
        - "RAG (检索增强生成)"
        - "微调 (Fine-tuning)"

    - id: "ai_application"
      name: "AI 应用"
      sub_tags:
        - "AI 编程/代码生成"
        - "AI 搜索"
        - "AI 教育"
        - "AI 医疗"
        - "AI 金融"
        - "AI 法律"
        - "AI 客服/对话"
        - "AI 自动驾驶"
        - "AI 机器人"

    - id: "cross_border_ecom"
      name: "跨境电商"
      sub_tags:
        - "亚马逊运营"
        - "TikTok Shop"
        - "Temu / SHEIN"
        - "独立站 (Shopify)"
        - "AI 选品"
        - "AI 广告投放"
        - "AI 客服翻译"
        - "供应链优化"

    - id: "new_media"
      name: "新媒体"
      sub_tags:
        - "短视频创作 (抖音/TikTok/YouTube)"
        - "直播电商"
        - "AI 内容创作"
        - "社交媒体运营"
        - "KOL/网红营销"
        - "SEO/SEM"
        - "内容分发"

    - id: "high_tech"
      name: "高科技"
      sub_tags:
        - "AI 芯片/GPU"
        - "云计算/AI 基础设施"
        - "边缘计算/端侧 AI"
        - "量子计算"
        - "AR/VR/空间计算"
        - "Web3/区块链 AI"
```

### 3.4 公司标签 (Company Tags)

```yaml
company_tags:
  # 国际 AI 巨头
  international_ai_giants:
    - id: "openai"
      name: "OpenAI"
      products: ["GPT", "DALL-E", "Sora", "ChatGPT", "o1", "o3"]
      focus: ["AGI", "多模态", "AI 安全"]

    - id: "anthropic"
      name: "Anthropic"
      products: ["Claude", "Claude Code", "MCP"]
      focus: ["AI 安全", "宪法 AI", "长文本"]

    - id: "google_ai"
      name: "Google / DeepMind"
      products: ["Gemini", "Gemma", "NotebookLM", "AlphaFold"]
      focus: ["搜索 AI", "科学 AI", "多模态"]

    - id: "meta_ai"
      name: "Meta AI"
      products: ["LLaMA", "SAM", "ImageBind"]
      focus: ["开源 AI", "计算机视觉"]

    - id: "microsoft"
      name: "Microsoft"
      products: ["Copilot", "Azure AI", "Phi", "Bing AI"]
      focus: ["企业 AI", "开发者工具"]

    - id: "nvidia"
      name: "NVIDIA"
      products: ["H100", "B200", "CUDA", "NIM", "Omniverse"]
      focus: ["AI 芯片", "推理加速"]

    - id: "apple"
      name: "Apple"
      products: ["Apple Intelligence", "M4", "Siri AI"]
      focus: ["端侧 AI", "隐私 AI"]

    - id: "xai"
      name: "xAI"
      products: ["Grok"]
      focus: ["通用 AI", "实时信息"]

    - id: "cursor_inc"
      name: "Anysphere (Cursor)"
      products: ["Cursor"]
      focus: ["AI 编程", "代码编辑器"]

  # 国际 AI 独角兽/创企
  international_ai_startups:
    - { id: "mistral", name: "Mistral AI", products: ["Mistral", "Mixtral"], focus: ["开源欧洲 AI"] }
    - { id: "perplexity", name: "Perplexity AI", products: ["Perplexity"], focus: ["AI 搜索"] }
    - { id: "midjourney", name: "Midjourney", products: ["Midjourney"], focus: ["AI 图像"] }
    - { id: "runway", name: "Runway", products: ["Gen-3"], focus: ["AI 视频"] }
    - { id: "stability", name: "Stability AI", products: ["Stable Diffusion"], focus: ["开源图像"] }
    - { id: "cohere", name: "Cohere", products: ["Command R"], focus: ["企业 AI"] }
    - { id: "databricks", name: "Databricks", products: ["DBRX", "Mosaic"], focus: ["数据 AI"] }
    - { id: "cognition", name: "Cognition AI", products: ["Devin"], focus: ["AI 编程 Agent"] }

  # 国内 AI 公司
  chinese_ai_companies:
    - id: "deepseek"
      name: "深度求索 (DeepSeek)"
      products: ["DeepSeek-V3", "DeepSeek-R1", "DeepSeek Coder"]
      focus: ["开源大模型", "推理模型", "代码模型"]

    - id: "baidu"
      name: "百度"
      products: ["文心一言", "文心大模型", "飞桨"]
      focus: ["大模型", "自动驾驶", "搜索 AI"]

    - id: "alibaba_ai"
      name: "阿里巴巴 (通义)"
      products: ["通义千问 (Qwen)", "通义万相", "ModelScope"]
      focus: ["开源大模型", "电商 AI", "云 AI"]

    - id: "bytedance_ai"
      name: "字节跳动"
      products: ["豆包", "扣子 (Coze)", "即梦"]
      focus: ["AI 应用", "视频 AI", "AI 平台"]

    - id: "moonshot"
      name: "月之暗面 (Moonshot AI)"
      products: ["Kimi"]
      focus: ["长文本", "AI 搜索"]

    - id: "zhipu"
      name: "智谱 AI"
      products: ["GLM-4", "ChatGLM", "CogVideo"]
      focus: ["大模型", "AI Agent"]

    - id: "minimax"
      name: "MiniMax"
      products: ["海螺 AI", "星野"]
      focus: ["多模态", "AI 社交"]

    - id: "baichuan"
      name: "百川智能"
      products: ["百川大模型"]
      focus: ["企业 AI", "搜索增强"]

    - id: "01ai"
      name: "零一万物"
      products: ["Yi 大模型"]
      focus: ["开源大模型", "多模态"]

    - id: "kuaishou_ai"
      name: "快手 AI"
      products: ["可灵 (Kling)"]
      focus: ["AI 视频生成", "短视频 AI"]

    - id: "dify"
      name: "Dify"
      products: ["Dify 平台"]
      focus: ["开源 AI 平台", "AI 应用搭建"]

  # 跨境电商平台
  ecom_platforms:
    - { id: "amazon", name: "Amazon", products: ["Rufus", "AI Listing"], focus: ["电商 AI"] }
    - { id: "tiktok_shop", name: "TikTok Shop", products: ["Shop AI"], focus: ["社交电商"] }
    - { id: "shopify", name: "Shopify", products: ["Magic", "Sidekick"], focus: ["独立站 AI"] }
    - { id: "temu", name: "Temu (拼多多)", products: ["AI 推荐"], focus: ["低价电商 AI"] }
    - { id: "shein", name: "SHEIN", products: ["AI 设计", "柔性供应链"], focus: ["时尚 AI"] }
```

---

## Phase 4: 任务生成规则 | Task Generation Rules

### 4.1 任务类型映射 | Task Type Mapping

```yaml
task_type_mapping:
  # 新工具/API 发布 → 测试任务
  new_tool_release:
    trigger: "产品标签中的工具发布新版本"
    task_type: "testing"
    template: "🧪 试用 {product} 新功能：{feature}"
    time_estimate: "30min-1hr"
    priority: "high"

  # 模型更新 → 学习任务
  model_update:
    trigger: "LLM 模型发布或重大更新"
    task_type: "learning"
    template: "📚 学习 {model} 更新：{key_change}"
    time_estimate: "1-2hr"
    priority: "high"

  # 行业分析 → 反思任务
  industry_analysis:
    trigger: "行业趋势报道/市场变化"
    task_type: "reflection"
    template: "💭 反思 {industry} 中 AI 的影响：{topic}"
    time_estimate: "30min"
    priority: "medium"

  # 商业案例 → 研究任务
  business_case:
    trigger: "AI 商业应用案例/融资新闻"
    task_type: "research"
    template: "🔍 研究 {company} 的 AI 策略：{aspect}"
    time_estimate: "1hr"
    priority: "medium"

  # 跨境电商 AI → 实践任务
  ecom_ai_application:
    trigger: "跨境电商 AI 工具/功能上线"
    task_type: "practice"
    template: "🛒 实践 {tool} 在跨境电商中的应用：{use_case}"
    time_estimate: "1-2hr"
    priority: "high"

  # 新媒体 AI → 创作任务
  new_media_ai:
    trigger: "新媒体/内容创作 AI 工具更新"
    task_type: "creative"
    template: "🎨 创作实验：用 {tool} 进行 {creative_task}"
    time_estimate: "1hr"
    priority: "medium"
```

### 4.2 优先级判定 | Priority Determination

```yaml
priority_rules:
  critical:  # 必须当天处理
    conditions:
      - "核心关注产品的重大更新 (Claude, Cursor, OpenAI)"
      - "直接影响当前工作流的变化"
      - "限时优惠/Early Access"
    label: "🔴 Critical"

  high:      # 48 小时内处理
    conditions:
      - "重要 AI 产品更新"
      - "有实际测试价值的新工具"
      - "跨境电商平台 AI 政策变更"
    label: "🟠 High"

  medium:    # 本周内处理
    conditions:
      - "行业趋势分析"
      - "有启发性的商业案例"
      - "技术概念学习"
    label: "🟡 Medium"

  low:       # 有空再看
    conditions:
      - "一般性 AI 资讯"
      - "未来趋势预测"
      - "远期影响分析"
    label: "🟢 Low"
```

---

## Phase 5: 执行流程 | Execution Flow

### Step 1: 采集新闻

```yaml
flow:
  1_collect:
    action: "从 daily-news-report 获取今日新闻数据"
    fallback: "如无今日报告，实时抓取 Tier1 源"
    input: "NewsReport/YYYY-MM-DD-news-report.md"
```

### Step 2: 标签匹配

```yaml
  2_tag_matching:
    action: "对每条新闻进行多维标签匹配"
    dimensions:
      - person_tags    # 是否提及关注人物
      - product_tags   # 是否涉及关注产品
      - industry_tags  # 是否属于关注行业
      - company_tags   # 是否涉及关注公司
    scoring: "匹配维度越多，优先级越高"
```

### Step 3: 有效性筛选

```yaml
  3_validity_filter:
    action: "应用 include/exclude 规则"
    check_include: "至少匹配一个纳入规则"
    check_exclude: "不匹配任何排除规则"
    quality_check: "质量评分 >= 3.0"
```

### Step 4: 任务生成

```yaml
  4_task_generation:
    action: "根据类型映射生成任务"
    output: "TodoWrite 调用"
    format:
      content: "{emoji} {task_description}"
      metadata: "来源: {source} | 标签: {tags} | 优先级: {priority}"
    max_tasks: 10  # 每日最多生成 10 个任务
```

---

## 输出示例 | Output Example

```
Tasks generated from 2026-02-08 AI News:

🔴 Critical:
  🧪 试用 Claude 4.6 Opus 新推理模式 - 测试 extended thinking 在代码场景的表现
     来源: Anthropic Blog | 标签: #Claude #Anthropic #LLM | 预计: 1hr

🟠 High:
  📚 学习 Cursor 0.46 新增的 Agent 模式 - 了解 multi-file editing 工作流
     来源: Cursor Changelog | 标签: #Cursor #AI编程 | 预计: 30min

  🛒 实践 Amazon AI Listing 生成器 - 用 AI 优化 3 个 ASIN 的 listing
     来源: AMZ123 | 标签: #Amazon #跨境电商 #AI选品 | 预计: 1.5hr

🟡 Medium:
  💭 反思 DeepSeek-R1 开源对国内 AI 生态的影响
     来源: 36氪 | 标签: #DeepSeek #开源 #AI行业 | 预计: 30min

  🎨 创作实验：用可灵 AI 生成短视频素材测试
     来源: 机器之心 | 标签: #快手AI #视频生成 #新媒体 | 预计: 1hr
```

---

## 约束 | Constraints

1. **每日上限**：最多生成 10 个任务，避免信息过载
2. **可执行性优先**：优先生成能立即行动的任务（试用 > 学习 > 反思）
3. **去重**：不对已知信息重复生成任务
4. **双语输出**：任务描述中英双语
5. **依赖 daily-news-report**：优先复用已有新闻数据，减少重复抓取
6. **标签驱动**：所有筛选基于标签体系，确保一致性
