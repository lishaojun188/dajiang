const PptxGenJS = require("pptxgenjs");
const pptx = new PptxGenJS();

// Set layout to 16x9 (10" x 5.625")
pptx.layout = 'LAYOUT_16x9';

// DJI Brand Colors - 大疆品牌配色
const DJI_COLORS = {
    RED: "E6230F",        // 大疆红/主色
    DARK_GRAY: "1A1A1A",  // 深灰/背景
    MEDIUM_GRAY: "2D2D2D", // 中灰
    LIGHT_GRAY: "4A4A4A",  // 浅灰
    WHITE: "FFFFFF",       // 白色
    ACCENT_ORANGE: "FF6B35", // 强调橙
    ACCENT_BLUE: "00A8E8",   // 科技蓝
    SUCCESS_GREEN: "00C851", // 成功绿
    WARNING_YELLOW: "FFBB33" // 警告黄
};

// Set presentation properties
pptx.author = "DJI HR";
pptx.company = "DJI";
pptx.title = "组织派兵布阵沙盘";
pptx.subject = "Organizational Deployment Sandbox";

// Define master slide with DJI theme
pptx.defineSlideMaster({
    title: "DJI_MASTER",
    background: { color: DJI_COLORS.DARK_GRAY },
    objects: [
        // DJI Logo placeholder area
        {
            rect: { x: 0.5, y: 0.3, w: 1.2, h: 0.4, fill: { color: DJI_COLORS.RED } }
        },
        // Footer line
        {
            line: {
                x: 0.5, y: 5.3, w: 9.0, h: 0,
                line: { color: DJI_COLORS.RED, width: 2 }
            }
        },
        // Page number placeholder
        {
            text: {
                text: "DJI INTERNAL",
                options: { x: 0.5, y: 5.4, w: 2, h: 0.2, fontSize: 9, color: DJI_COLORS.LIGHT_GRAY, fontFace: "Arial" }
            }
        }
    ]
});

// ============================================
// SLIDE 1: Title Slide
// ============================================
let slide1 = pptx.addSlide({ masterName: "DJI_MASTER" });

// Main title background accent
slide1.addShape(pptx.ShapeType.rect, {
    x: 0, y: 2.5, w: 10, h: 2.5,
    fill: { color: DJI_COLORS.RED, transparency: 15 }
});

// Main Title
slide1.addText("组织派兵布阵沙盘", {
    x: 0.5, y: 2.7, w: 9, h: 1,
    fontSize: 48, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial Black", align: "center"
});

// Subtitle
slide1.addText("Organizational Deployment Sandbox", {
    x: 0.5, y: 3.6, w: 9, h: 0.5,
    fontSize: 20, color: DJI_COLORS.WHITE,
    fontFace: "Arial", align: "center", italic: true
});

// Tagline
slide1.addText("可视化人才调配 · 实时能力模拟 · 数据驱动决策", {
    x: 0.5, y: 5.2, w: 9, h: 0.4,
    fontSize: 14, color: DJI_COLORS.ACCENT_ORANGE,
    fontFace: "Arial", align: "center"
});

// DJI Logo text representation
slide1.addText("DJI", {
    x: 0.5, y: 0.4, w: 1, h: 0.4,
    fontSize: 24, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial Black", align: "center"
});

// ============================================
// SLIDE 2: Product Positioning
// ============================================
let slide2 = pptx.addSlide({ masterName: "DJI_MASTER" });

// Title bar
slide2.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.MEDIUM_GRAY }
});

slide2.addText("产品定位 | Product Positioning", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

// Left side - Icon circle
slide2.addShape(pptx.ShapeType.ellipse, {
    x: 0.8, y: 2.5, w: 2.5, h: 2.5,
    fill: { color: DJI_COLORS.RED, transparency: 20 },
    line: { color: DJI_COLORS.RED, width: 3 }
});

slide2.addText("🎯", {
    x: 1.3, y: 3.2, w: 1.5, h: 0.8,
    fontSize: 48, align: "center"
});

// Right side - Content
slide2.addText("核心定位", {
    x: 4, y: 1.8, w: 5.5, h: 0.5,
    fontSize: 22, bold: true, color: DJI_COLORS.RED,
    fontFace: "Arial"
});

slide2.addText("一个可视化的组织人才调配沙盘系统，帮助管理者通过直观的组织视角进行人才布局决策，实时模拟和评估组织能力变化。", {
    x: 4, y: 2.4, w: 5.5, h: 1.5,
    fontSize: 14, color: DJI_COLORS.WHITE,
    fontFace: "Arial", lineSpacing: 24
});

slide2.addText("A visual organizational talent deployment sandbox system that helps managers make talent layout decisions through an intuitive organizational perspective, simulating and evaluating organizational capability changes in real-time.", {
    x: 4, y: 4.0, w: 5.5, h: 1.2,
    fontSize: 12, color: DJI_COLORS.LIGHT_GRAY,
    fontFace: "Arial", italic: true, lineSpacing: 20
});

// Key value props
const valueProps = [
    { icon: "👁️", text: "可视化", sub: "Visualization" },
    { icon: "⚡", text: "实时性", sub: "Real-time" },
    { icon: "📊", text: "数据驱动", sub: "Data-driven" }
];

valueProps.forEach((prop, i) => {
    let x = 4 + i * 1.8;
    slide2.addShape(pptx.ShapeType.rect, {
        x: x, y: 5.5, w: 1.6, h: 1.2,
        fill: { color: DJI_COLORS.MEDIUM_GRAY },
        line: { color: DJI_COLORS.RED, width: 1 }
    });
    slide2.addText(prop.icon, {
        x: x, y: 5.6, w: 1.6, h: 0.4,
        fontSize: 24, align: "center"
    });
    slide2.addText(prop.text, {
        x: x, y: 6.0, w: 1.6, h: 0.3,
        fontSize: 12, bold: true, color: DJI_COLORS.WHITE, align: "center"
    });
    slide2.addText(prop.sub, {
        x: x, y: 6.3, w: 1.6, h: 0.2,
        fontSize: 9, color: DJI_COLORS.LIGHT_GRAY, align: "center"
    });
});

// ============================================
// SLIDE 3: Core Functions Overview
// ============================================
let slide3 = pptx.addSlide({ masterName: "DJI_MASTER" });

// Title bar
slide3.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.MEDIUM_GRAY }
});

slide3.addText("核心功能模块 | Core Functions", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

// 5 functions in grid layout
const functions = [
    { num: "01", title: "组织结构视图", sub: "Org Structure View", desc: "多维度组织架构可视化", color: DJI_COLORS.RED },
    { num: "02", title: "能力横向对比", sub: "Capability Comparison", desc: "雷达图/柱状图多维度对比", color: DJI_COLORS.ACCENT_ORANGE },
    { num: "03", title: "组织能力穿透", sub: "Capability Penetration", desc: "组织→团队→个人逐层下钻", color: DJI_COLORS.ACCENT_BLUE },
    { num: "04", title: "人才档案联动", sub: "Talent Profile", desc: "一键查看完整人才画像", color: DJI_COLORS.SUCCESS_GREEN },
    { num: "05", title: "实时调兵模拟", sub: "Real-time Simulation", desc: "拖拽调岗，实时计算变化", color: DJI_COLORS.WARNING_YELLOW }
];

functions.forEach((fn, i) => {
    let row = Math.floor(i / 3);
    let col = i % 3;
    let x = 0.5 + col * 3.1;
    let y = 1.6 + row * 2.8;

    // Card background
    slide3.addShape(pptx.ShapeType.rect, {
        x: x, y: y, w: 2.9, h: 2.5,
        fill: { color: DJI_COLORS.MEDIUM_GRAY },
        line: { color: fn.color, width: 2 }
    });

    // Number
    slide3.addText(fn.num, {
        x: x + 0.1, y: y + 0.1, w: 0.5, h: 0.4,
        fontSize: 14, bold: true, color: fn.color,
        fontFace: "Arial"
    });

    // Title
    slide3.addText(fn.title, {
        x: x + 0.1, y: y + 0.6, w: 2.7, h: 0.5,
        fontSize: 16, bold: true, color: DJI_COLORS.WHITE,
        fontFace: "Arial"
    });

    // Subtitle
    slide3.addText(fn.sub, {
        x: x + 0.1, y: y + 1.1, w: 2.7, h: 0.3,
        fontSize: 11, color: DJI_COLORS.LIGHT_GRAY,
        fontFace: "Arial", italic: true
    });

    // Description
    slide3.addText(fn.desc, {
        x: x + 0.1, y: y + 1.5, w: 2.7, h: 0.8,
        fontSize: 12, color: DJI_COLORS.WHITE,
        fontFace: "Arial", lineSpacing: 18
    });
});

// ============================================
// SLIDE 4: Function 1 - Org Structure View
// ============================================
let slide4 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide4.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.RED }
});

slide4.addText("01 组织结构视图 | Organization Structure View", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 24, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

// Left content
slide4.addText("功能特性", {
    x: 0.5, y: 1.6, w: 4, h: 0.4,
    fontSize: 18, bold: true, color: DJI_COLORS.RED,
    fontFace: "Arial"
});

const features1 = [
    "• 组织架构图形式展示层级关系",
    "• 支持多维度视角（职能/项目/地域）",
    "• 组织节点可折叠/展开，支持钻取",
    "• 颜色编码显示能力状态"
];

slide4.addText(features1.join("\n"), {
    x: 0.5, y: 2.1, w: 4.5, h: 2,
    fontSize: 13, color: DJI_COLORS.WHITE,
    fontFace: "Arial", lineSpacing: 22
});

// Visual elements - org chart mockup
slide4.addShape(pptx.ShapeType.rect, {
    x: 5.5, y: 1.6, w: 4, h: 0.8,
    fill: { color: DJI_COLORS.RED },
    line: { color: DJI_COLORS.WHITE, width: 1 }
});
slide4.addText("CEO", {
    x: 5.5, y: 1.85, w: 4, h: 0.4,
    fontSize: 14, bold: true, color: DJI_COLORS.WHITE, align: "center"
});

// Lines
slide4.addShape(pptx.shapes.LINE, {
    x: 7.5, y: 2.4, w: 0, h: 0.5,
    line: { color: DJI_COLORS.WHITE, width: 2 }
});
slide4.addShape(pptx.shapes.LINE, {
    x: 6.0, y: 2.9, w: 3.0, h: 0,
    line: { color: DJI_COLORS.WHITE, width: 2 }
});

// Department nodes
const depts = ["研发部", "产品部", "运营部", "市场部"];
const colors = [DJI_COLORS.ACCENT_BLUE, DJI_COLORS.SUCCESS_GREEN, DJI_COLORS.WARNING_YELLOW, DJI_COLORS.ACCENT_ORANGE];

depts.forEach((dept, i) => {
    let x = 5.5 + i * 1.0;
    slide4.addShape(pptx.shapes.LINE, {
        x: x + 0.4, y: 2.9, w: 0, h: 0.4,
        line: { color: DJI_COLORS.WHITE, width: 2 }
    });
    slide4.addShape(pptx.shapes.RECTANGLE, {
        x: x, y: 3.3, w: 0.8, h: 0.6,
        fill: { color: colors[i] }
    });
    slide4.addText(dept, {
        x: x, y: 3.45, w: 0.8, h: 0.4,
        fontSize: 9, bold: true, color: DJI_COLORS.DARK_GRAY, align: "center"
    });
});

// Legend
slide4.addText("颜色编码说明", {
    x: 5.5, y: 4.5, w: 4, h: 0.3,
    fontSize: 12, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

const legendItems = [
    { color: DJI_COLORS.SUCCESS_GREEN, label: "能力富余" },
    { color: DJI_COLORS.WARNING_YELLOW, label: "能力平衡" },
    { color: DJI_COLORS.RED, label: "能力缺口" }
];

legendItems.forEach((item, i) => {
    slide4.addShape(pptx.ShapeType.rect, {
        x: 5.5 + i * 1.3, y: 4.9, w: 0.3, h: 0.3,
        fill: { color: item.color }
    });
    slide4.addText(item.label, {
        x: 5.9 + i * 1.3, y: 4.9, w: 0.8, h: 0.3,
        fontSize: 10, color: DJI_COLORS.WHITE
    });
});

// ============================================
// SLIDE 5: Function 2 - Capability Comparison
// ============================================
let slide5 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide5.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.ACCENT_ORANGE }
});

slide5.addText("02 能力横向对比 | Cross-Org Capability Comparison", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 24, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

// Left - Description
slide5.addText("对比维度", {
    x: 0.5, y: 1.6, w: 4, h: 0.4,
    fontSize: 18, bold: true, color: DJI_COLORS.ACCENT_ORANGE,
    fontFace: "Arial"
});

const dimensions = [
    { name: "技术能力", sub: "Technical", items: ["专业技术深度", "技术广度", "新技术掌握度"] },
    { name: "业务能力", sub: "Business", items: ["业务理解深度", "客户洞察能力", "商业敏感度"] },
    { name: "管理能力", sub: "Management", items: ["团队管理能力", "项目管理能力", "跨部门协作"] },
    { name: "创新能力", sub: "Innovation", items: ["创新思维", "问题解决能力", "变革驱动力"] }
];

dimensions.forEach((dim, i) => {
    let y = 2.1 + i * 1.2;
    slide5.addShape(pptx.ShapeType.rect, {
        x: 0.5, y: y, w: 0.15, h: 0.9,
        fill: { color: DJI_COLORS.ACCENT_ORANGE }
    });
    slide5.addText(dim.name, {
        x: 0.75, y: y, w: 2, h: 0.35,
        fontSize: 14, bold: true, color: DJI_COLORS.WHITE
    });
    slide5.addText(dim.sub, {
        x: 0.75, y: y + 0.3, w: 2, h: 0.25,
        fontSize: 10, color: DJI_COLORS.LIGHT_GRAY, italic: true
    });
    slide5.addText(dim.items.join(" · "), {
        x: 0.75, y: y + 0.55, w: 4, h: 0.3,
        fontSize: 9, color: DJI_COLORS.WHITE
    });
});

// Right - Radar chart mockup
slide5.addText("雷达图对比示例", {
    x: 5.5, y: 1.6, w: 4, h: 0.4,
    fontSize: 14, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

// Simple radar visualization using shapes
const centerX = 7.5;
const centerY = 4.0;
const radius = 1.5;

// Draw pentagon axes
for (let i = 0; i < 5; i++) {
    let angle = (i * 72 - 90) * Math.PI / 180;
    let x2 = centerX + radius * Math.cos(angle);
    let y2 = centerY + radius * Math.sin(angle);
    slide5.addShape(pptx.shapes.LINE, {
        x: centerX, y: centerY, w: x2 - centerX, h: y2 - centerY,
        line: { color: DJI_COLORS.LIGHT_GRAY, width: 1, dashType: "dash" }
    });
}

// Org A polygon (more filled)
slide5.addShape(pptx.ShapeType.pentagon, {
    x: centerX - radius * 0.8, y: centerY - radius * 0.8, w: radius * 1.6, h: radius * 1.6,
    fill: { color: DJI_COLORS.RED, transparency: 60 },
    line: { color: DJI_COLORS.RED, width: 2 }
});

// Org B polygon (less filled)
slide5.addShape(pptx.ShapeType.pentagon, {
    x: centerX - radius * 0.5, y: centerY - radius * 0.5, w: radius * 1.0, h: radius * 1.0,
    fill: { color: DJI_COLORS.ACCENT_BLUE, transparency: 60 },
    line: { color: DJI_COLORS.ACCENT_BLUE, width: 2 }
});

// Legend
slide5.addShape(pptx.ShapeType.rect, {
    x: 5.5, y: 5.8, w: 0.3, h: 0.2,
    fill: { color: DJI_COLORS.RED }
});
slide5.addText("研发部", {
    x: 5.9, y: 5.75, w: 1, h: 0.25,
    fontSize: 10, color: DJI_COLORS.WHITE
});

slide5.addShape(pptx.ShapeType.rect, {
    x: 7, y: 5.8, w: 0.3, h: 0.2,
    fill: { color: DJI_COLORS.ACCENT_BLUE }
});
slide5.addText("产品部", {
    x: 7.4, y: 5.75, w: 1, h: 0.25,
    fontSize: 10, color: DJI_COLORS.WHITE
});

// ============================================
// SLIDE 6: Function 3 - Capability Penetration
// ============================================
let slide6 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide6.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.ACCENT_BLUE }
});

slide6.addText("03 组织能力穿透 | Org Capability Penetration", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 24, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

// Penetration levels visualization
const levels = [
    { name: "组织层", sub: "Organization", y: 1.6, width: 8, color: DJI_COLORS.RED },
    { name: "团队/部门层", sub: "Team/Department", y: 2.8, width: 6.5, color: DJI_COLORS.ACCENT_ORANGE },
    { name: "小组层", sub: "Group", y: 4.0, width: 5, color: DJI_COLORS.WARNING_YELLOW },
    { name: "个人层", sub: "Individual", y: 5.2, width: 3.5, color: DJI_COLORS.SUCCESS_GREEN }
];

levels.forEach((level, i) => {
    let x = 5 - level.width / 2;

    // Level bar
    slide6.addShape(pptx.ShapeType.rect, {
        x: x, y: level.y, w: level.width, h: 0.9,
        fill: { color: level.color },
        line: { color: DJI_COLORS.WHITE, width: 1 }
    });

    // Level name
    slide6.addText(level.name, {
        x: x, y: level.y + 0.15, w: level.width, h: 0.4,
        fontSize: 16, bold: true, color: DJI_COLORS.WHITE, align: "center"
    });

    // Level subtitle
    slide6.addText(level.sub, {
        x: x, y: level.y + 0.5, w: level.width, h: 0.3,
        fontSize: 10, color: DJI_COLORS.DARK_GRAY, align: "center", italic: true
    });

    // Arrow down (except last)
    if (i < levels.length - 1) {
        slide6.addShape(pptx.ShapeType.rightArrow, {
            x: 4.7, y: level.y + 0.95, w: 0.6, h: 0.8,
            fill: { color: DJI_COLORS.WHITE },
            rotate: 90
        });
    }
});

// Right side - visualization types
slide6.addText("可视化形式", {
    x: 0.5, y: 1.6, w: 2, h: 0.3,
    fontSize: 12, bold: true, color: DJI_COLORS.WHITE
});

const vizTypes = [
    { name: "热力图", desc: "人才密度分布" },
    { name: "能力矩阵", desc: "九宫格分布" },
    { name: "人才地图", desc: "关键人才标注" }
];

vizTypes.forEach((viz, i) => {
    let y = 2.0 + i * 0.7;
    slide6.addShape(pptx.ShapeType.rect, {
        x: 0.5, y: y, w: 0.2, h: 0.5,
        fill: { color: DJI_COLORS.ACCENT_BLUE }
    });
    slide6.addText(viz.name, {
        x: 0.8, y: y, w: 1.5, h: 0.25,
        fontSize: 11, bold: true, color: DJI_COLORS.WHITE
    });
    slide6.addText(viz.desc, {
        x: 0.8, y: y + 0.25, w: 1.5, h: 0.2,
        fontSize: 9, color: DJI_COLORS.LIGHT_GRAY
    });
});

// ============================================
// SLIDE 7: Function 4 - Talent Profile
// ============================================
let slide7 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide7.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.SUCCESS_GREEN }
});

slide7.addText("04 人才档案联动 | Talent Profile Integration", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 24, bold: true, color: DJI_COLORS.DARK_GRAY,
    fontFace: "Arial"
});

// Profile card mockup
slide7.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.6, w: 4, h: 5,
    fill: { color: DJI_COLORS.MEDIUM_GRAY },
    line: { color: DJI_COLORS.SUCCESS_GREEN, width: 2 }
});

// Avatar placeholder
slide7.addShape(pptx.ShapeType.ellipse, {
    x: 2, y: 1.8, w: 1, h: 1,
    fill: { color: DJI_COLORS.LIGHT_GRAY }
});
slide7.addText("👤", {
    x: 2, y: 2, w: 1, h: 0.6,
    fontSize: 32, align: "center"
});

// Profile info
slide7.addText("张三", {
    x: 0.7, y: 2.9, w: 3.6, h: 0.4,
    fontSize: 18, bold: true, color: DJI_COLORS.WHITE, align: "center"
});
slide7.addText("高级产品经理 | P8", {
    x: 0.7, y: 3.3, w: 3.6, h: 0.3,
    fontSize: 11, color: DJI_COLORS.SUCCESS_GREEN, align: "center"
});

// Profile sections
const profileSections = [
    { title: "基础信息", items: ["工号: 10086", "司龄: 5年", "部门: 产品中心"] },
    { title: "能力画像", items: ["产品规划: 90", "数据分析: 85", "用户研究: 88"] },
    { title: "绩效发展", items: ["最近绩效: A", "潜力评级: 高", "继任准备度: 就绪"] }
];

profileSections.forEach((section, i) => {
    let y = 3.8 + i * 0.8;
    slide7.addText(section.title, {
        x: 0.7, y: y, w: 3.6, h: 0.25,
        fontSize: 10, bold: true, color: DJI_COLORS.SUCCESS_GREEN
    });
    slide7.addText(section.items.join(" · "), {
        x: 0.7, y: y + 0.25, w: 3.6, h: 0.4,
        fontSize: 9, color: DJI_COLORS.WHITE
    });
});

// Right side - features
slide7.addText("档案信息结构", {
    x: 5, y: 1.6, w: 4.5, h: 0.4,
    fontSize: 16, bold: true, color: DJI_COLORS.SUCCESS_GREEN,
    fontFace: "Arial"
});

const profileFeatures = [
    { icon: "📋", title: "基础信息", desc: "姓名、工号、职级、司龄、所属组织" },
    { icon: "📊", title: "能力画像", desc: "能力雷达图、专业技能标签、成长曲线" },
    { icon: "📈", title: "绩效发展", desc: "历史绩效、360评估、潜力评级、继任准备度" },
    { icon: "🎯", title: "职业信息", desc: "发展路径、培训记录、项目经历、流动意愿" }
];

profileFeatures.forEach((feat, i) => {
    let y = 2.1 + i * 1.1;

    slide7.addShape(pptx.ShapeType.rect, {
        x: 5, y: y, w: 0.5, h: 0.5,
        fill: { color: DJI_COLORS.MEDIUM_GRAY },
        line: { color: DJI_COLORS.SUCCESS_GREEN, width: 1 }
    });
    slide7.addText(feat.icon, {
        x: 5, y: y + 0.05, w: 0.5, h: 0.4,
        fontSize: 18, align: "center"
    });

    slide7.addText(feat.title, {
        x: 5.7, y: y, w: 3.5, h: 0.3,
        fontSize: 13, bold: true, color: DJI_COLORS.WHITE
    });
    slide7.addText(feat.desc, {
        x: 5.7, y: y + 0.3, w: 3.5, h: 0.5,
        fontSize: 10, color: DJI_COLORS.LIGHT_GRAY, lineSpacing: 16
    });
});

// ============================================
// SLIDE 8: Function 5 - Real-time Simulation
// ============================================
let slide8 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide8.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.WARNING_YELLOW }
});

slide8.addText("05 实时调兵模拟 | Real-time Talent Adjustment", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 24, bold: true, color: DJI_COLORS.DARK_GRAY,
    fontFace: "Arial"
});

// Sandbox operations
slide8.addText("沙盘操作", {
    x: 0.5, y: 1.6, w: 4.5, h: 0.4,
    fontSize: 16, bold: true, color: DJI_COLORS.WARNING_YELLOW,
    fontFace: "Arial"
});

const operations = [
    { icon: "✋", name: "拖拽调岗", desc: "Drag & Drop" },
    { icon: "☐", name: "批量选择", desc: "Batch Select" },
    { icon: "↶", name: "撤销/重做", desc: "Undo/Redo" },
    { icon: "💾", name: "方案保存", desc: "Save Plan" },
    { icon: "⚖️", name: "方案对比", desc: "Compare Plans" }
];

operations.forEach((op, i) => {
    let x = 0.5 + (i % 3) * 1.6;
    let y = 2.1 + Math.floor(i / 3) * 1.3;

    slide8.addShape(pptx.ShapeType.rect, {
        x: x, y: y, w: 1.4, h: 1.1,
        fill: { color: DJI_COLORS.MEDIUM_GRAY },
        line: { color: DJI_COLORS.WARNING_YELLOW, width: 1 }
    });
    slide8.addText(op.icon, {
        x: x, y: y + 0.1, w: 1.4, h: 0.4,
        fontSize: 24, align: "center"
    });
    slide8.addText(op.name, {
        x: x, y: y + 0.5, w: 1.4, h: 0.3,
        fontSize: 11, bold: true, color: DJI_COLORS.WHITE, align: "center"
    });
    slide8.addText(op.desc, {
        x: x, y: y + 0.8, w: 1.4, h: 0.2,
        fontSize: 8, color: DJI_COLORS.LIGHT_GRAY, align: "center", italic: true
    });
});

// Real-time metrics
slide8.addText("实时计算指标", {
    x: 5.5, y: 1.6, w: 4, h: 0.4,
    fontSize: 16, bold: true, color: DJI_COLORS.WARNING_YELLOW,
    fontFace: "Arial"
});

const metrics = [
    { name: "组织能力总分", change: "+12%", color: DJI_COLORS.SUCCESS_GREEN },
    { name: "技术能力", change: "+8%", color: DJI_COLORS.SUCCESS_GREEN },
    { name: "业务能力", change: "+15%", color: DJI_COLORS.SUCCESS_GREEN },
    { name: "管理能力", change: "-3%", color: DJI_COLORS.RED },
    { name: "人才结构评分", change: "92/100", color: DJI_COLORS.ACCENT_BLUE }
];

metrics.forEach((metric, i) => {
    let y = 2.1 + i * 0.9;

    slide8.addShape(pptx.ShapeType.rect, {
        x: 5.5, y: y, w: 4, h: 0.75,
        fill: { color: DJI_COLORS.MEDIUM_GRAY }
    });
    slide8.addText(metric.name, {
        x: 5.7, y: y + 0.2, w: 2.5, h: 0.35,
        fontSize: 12, color: DJI_COLORS.WHITE
    });
    slide8.addText(metric.change, {
        x: 8.2, y: y + 0.15, w: 1, h: 0.45,
        fontSize: 16, bold: true, color: metric.color, align: "right"
    });
});

// Risk warning
slide8.addShape(pptx.ShapeType.rect, {
    x: 5.5, y: 6.0, w: 4, h: 0.8,
    fill: { color: DJI_COLORS.RED, transparency: 30 },
    line: { color: DJI_COLORS.RED, width: 2 }
});
slide8.addText("⚠️ 风险预警: 关键岗位空缺 - 产品经理", {
    x: 5.6, y: 6.25, w: 3.8, h: 0.4,
    fontSize: 11, bold: true, color: DJI_COLORS.WHITE
});

// ============================================
// SLIDE 9: User Scenarios
// ============================================
let slide9 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide9.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.MEDIUM_GRAY }
});

slide9.addText("用户场景 | User Scenarios", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

const scenarios = [
    {
        num: "01",
        title: "组织合并前的能力盘点",
        sub: "Pre-Merger Capability Assessment",
        desc: "两个部门即将合并，需要评估合并后的人员配置和能力互补性",
        steps: ["选中待合并组织", "横向对比能力差异", "穿透查看人员构成", "模拟调整方案", "评估能力影响"]
    },
    {
        num: "02",
        title: "新项目组建",
        sub: "New Project Team Formation",
        desc: "需要为新项目快速组建团队，从各组织抽调合适人才",
        steps: ["创建虚拟项目组织", "按能力标签搜索", "查看候选人位置", "模拟抽调影响", "优化抽调方案"]
    },
    {
        num: "03",
        title: "关键岗位继任规划",
        sub: "Succession Planning",
        desc: "识别关键岗位的潜在继任者，评估继任准备度",
        steps: ["标记关键岗位", "查看能力要求", "穿透查找匹配人才", "对比差距分析", "制定发展计划"]
    }
];

scenarios.forEach((scenario, i) => {
    let x = 0.5 + i * 3.2;

    // Card
    slide9.addShape(pptx.ShapeType.rect, {
        x: x, y: 1.5, w: 3, h: 5.2,
        fill: { color: DJI_COLORS.MEDIUM_GRAY },
        line: { color: DJI_COLORS.RED, width: 1 }
    });

    // Number badge
    slide9.addShape(pptx.ShapeType.ellipse, {
        x: x + 1.2, y: 1.7, w: 0.6, h: 0.6,
        fill: { color: DJI_COLORS.RED }
    });
    slide9.addText(scenario.num, {
        x: x + 1.2, y: 1.8, w: 0.6, h: 0.4,
        fontSize: 16, bold: true, color: DJI_COLORS.WHITE, align: "center"
    });

    // Title
    slide9.addText(scenario.title, {
        x: x + 0.1, y: 2.4, w: 2.8, h: 0.6,
        fontSize: 14, bold: true, color: DJI_COLORS.WHITE, align: "center"
    });

    // Subtitle
    slide9.addText(scenario.sub, {
        x: x + 0.1, y: 3.0, w: 2.8, h: 0.3,
        fontSize: 9, color: DJI_COLORS.LIGHT_GRAY, align: "center", italic: true
    });

    // Description
    slide9.addText(scenario.desc, {
        x: x + 0.15, y: 3.4, w: 2.7, h: 0.8,
        fontSize: 10, color: DJI_COLORS.WHITE, lineSpacing: 16
    });

    // Steps
    scenario.steps.forEach((step, j) => {
        slide9.addText(`${j + 1}. ${step}`, {
            x: x + 0.15, y: 4.3 + j * 0.45, w: 2.7, h: 0.4,
            fontSize: 9, color: DJI_COLORS.ACCENT_ORANGE
        });
    });
});

// ============================================
// SLIDE 10: System Architecture
// ============================================
let slide10 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide10.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.MEDIUM_GRAY }
});

slide10.addText("系统架构 | System Architecture", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

// Architecture layers
const layers = [
    { name: "前端展示层", sub: "Presentation", color: DJI_COLORS.ACCENT_BLUE, components: ["组织架构图", "能力对比图", "人才档案", "沙盘画布", "实时指标"] },
    { name: "业务逻辑层", sub: "Business Logic", color: DJI_COLORS.ACCENT_ORANGE, components: ["组织关系服务", "能力计算服务", "模拟推演引擎"] },
    { name: "数据访问层", sub: "Data Access", color: DJI_COLORS.SUCCESS_GREEN, components: ["组织数据", "人员数据", "能力数据"] }
];

layers.forEach((layer, i) => {
    let y = 1.5 + i * 1.9;

    // Layer background
    slide10.addShape(pptx.ShapeType.rect, {
        x: 0.5, y: y, w: 9, h: 1.6,
        fill: { color: DJI_COLORS.MEDIUM_GRAY },
        line: { color: layer.color, width: 2 }
    });

    // Layer label
    slide10.addShape(pptx.ShapeType.rect, {
        x: 0.5, y: y, w: 2, h: 1.6,
        fill: { color: layer.color }
    });
    slide10.addText(layer.name, {
        x: 0.5, y: y + 0.4, w: 2, h: 0.5,
        fontSize: 14, bold: true, color: DJI_COLORS.WHITE, align: "center"
    });
    slide10.addText(layer.sub, {
        x: 0.5, y: y + 0.9, w: 2, h: 0.4,
        fontSize: 10, color: DJI_COLORS.DARK_GRAY, align: "center", italic: true
    });

    // Components
    layer.components.forEach((comp, j) => {
        let cx = 2.8 + j * 1.4;
        slide10.addShape(pptx.ShapeType.rect, {
            x: cx, y: y + 0.3, w: 1.25, h: 1,
            fill: { color: DJI_COLORS.DARK_GRAY },
            line: { color: layer.color, width: 1 }
        });
        slide10.addText(comp, {
            x: cx, y: y + 0.55, w: 1.25, h: 0.5,
            fontSize: 9, color: DJI_COLORS.WHITE, align: "center"
        });
    });
});

// Connection arrows between layers
for (let i = 0; i < 2; i++) {
    let y = 3.4 + i * 1.9;
    slide10.addShape(pptx.ShapeType.rightArrow, {
        x: 4.7, y: y, w: 0.6, h: 0.3,
        fill: { color: DJI_COLORS.WHITE },
        rotate: 90
    });
}

// ============================================
// SLIDE 11: Data Requirements
// ============================================
let slide11 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide11.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.MEDIUM_GRAY }
});

slide11.addText("数据需求 | Data Requirements", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

const dataReqs = [
    {
        title: "组织数据",
        sub: "Organization Data",
        color: DJI_COLORS.RED,
        items: ["组织架构树（含历史版本）", "组织属性（类型、级别、状态）", "组织间关系（实线/虚线汇报）"]
    },
    {
        title: "人员数据",
        sub: "People Data",
        color: DJI_COLORS.ACCENT_BLUE,
        items: ["人员基本信息", "人员-组织映射关系", "汇报关系历史"]
    },
    {
        title: "能力数据",
        sub: "Capability Data",
        color: DJI_COLORS.SUCCESS_GREEN,
        items: ["岗位能力模型", "人员能力评估结果", "能力评估标准与权重"]
    }
];

dataReqs.forEach((req, i) => {
    let x = 0.5 + i * 3.2;

    // Card
    slide11.addShape(pptx.ShapeType.rect, {
        x: x, y: 1.6, w: 3, h: 4.5,
        fill: { color: DJI_COLORS.MEDIUM_GRAY },
        line: { color: req.color, width: 2 }
    });

    // Header
    slide11.addShape(pptx.ShapeType.rect, {
        x: x, y: 1.6, w: 3, h: 0.8,
        fill: { color: req.color }
    });
    slide11.addText(req.title, {
        x: x, y: 1.75, w: 3, h: 0.4,
        fontSize: 16, bold: true, color: DJI_COLORS.WHITE, align: "center"
    });
    slide11.addText(req.sub, {
        x: x, y: 2.1, w: 3, h: 0.3,
        fontSize: 10, color: DJI_COLORS.DARK_GRAY, align: "center", italic: true
    });

    // Items
    req.items.forEach((item, j) => {
        slide11.addText(`▸ ${item}`, {
            x: x + 0.15, y: 2.7 + j * 0.7, w: 2.7, h: 0.6,
            fontSize: 11, color: DJI_COLORS.WHITE, lineSpacing: 18
        });
    });
});

// ============================================
// SLIDE 12: Roadmap / TODO
// ============================================
let slide12 = pptx.addSlide({ masterName: "DJI_MASTER" });

slide12.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: DJI_COLORS.RED }
});

slide12.addText("实施路线图 | Roadmap", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial"
});

// Timeline
const phases = [
    { phase: "Phase 1", title: "基础架构", period: "Q1", items: ["组织架构图可视化", "基础数据接入", "用户权限体系"], color: DJI_COLORS.ACCENT_BLUE },
    { phase: "Phase 2", title: "核心功能", period: "Q2", items: ["能力横向对比", "能力穿透下钻", "人才档案联动"], color: DJI_COLORS.ACCENT_ORANGE },
    { phase: "Phase 3", title: "高级功能", period: "Q3", items: ["实时调兵模拟", "沙盘拖拽交互", "方案保存对比"], color: DJI_COLORS.SUCCESS_GREEN },
    { phase: "Phase 4", title: "优化迭代", period: "Q4", items: ["性能优化", "算法优化", "用户体验提升"], color: DJI_COLORS.WARNING_YELLOW }
];

phases.forEach((phase, i) => {
    let x = 0.5 + i * 2.4;

    // Phase card
    slide12.addShape(pptx.ShapeType.rect, {
        x: x, y: 1.6, w: 2.2, h: 4.8,
        fill: { color: DJI_COLORS.MEDIUM_GRAY },
        line: { color: phase.color, width: 2 }
    });

    // Phase badge
    slide12.addShape(pptx.ShapeType.rect, {
        x: x, y: 1.6, w: 2.2, h: 0.6,
        fill: { color: phase.color }
    });
    slide12.addText(phase.phase, {
        x: x, y: 1.7, w: 1.1, h: 0.4,
        fontSize: 12, bold: true, color: DJI_COLORS.WHITE
    });
    slide12.addText(phase.period, {
        x: x + 1.6, y: 1.7, w: 0.5, h: 0.4,
        fontSize: 14, bold: true, color: DJI_COLORS.DARK_GRAY, align: "right"
    });

    // Title
    slide12.addText(phase.title, {
        x: x + 0.1, y: 2.3, w: 2, h: 0.4,
        fontSize: 14, bold: true, color: DJI_COLORS.WHITE, align: "center"
    });

    // Items
    phase.items.forEach((item, j) => {
        slide12.addShape(pptx.ShapeType.rect, {
            x: x + 0.15, y: 2.9 + j * 0.9, w: 0.15, h: 0.6,
            fill: { color: phase.color }
        });
        slide12.addText(item, {
            x: x + 0.4, y: 3.0 + j * 0.9, w: 1.7, h: 0.5,
            fontSize: 11, color: DJI_COLORS.WHITE
        });
    });
});

// Arrows between phases
for (let i = 0; i < 3; i++) {
    slide12.addShape(pptx.ShapeType.rightArrow, {
        x: 2.7 + i * 2.4, y: 3.8, w: 0.4, h: 0.3,
        fill: { color: DJI_COLORS.LIGHT_GRAY }
    });
}

// ============================================
// SLIDE 13: Thank You / End
// ============================================
let slide13 = pptx.addSlide({ masterName: "DJI_MASTER" });

// Large background accent
slide13.addShape(pptx.ShapeType.rect, {
    x: 0, y: 2.5, w: 10, h: 2.5,
    fill: { color: DJI_COLORS.RED }
});

slide13.addText("谢谢", {
    x: 0.5, y: 2.9, w: 9, h: 1,
    fontSize: 60, bold: true, color: DJI_COLORS.WHITE,
    fontFace: "Arial Black", align: "center"
});

slide13.addText("Thank You", {
    x: 0.5, y: 4.0, w: 9, h: 0.6,
    fontSize: 28, color: DJI_COLORS.WHITE,
    fontFace: "Arial", align: "center", italic: true
});

// Contact info
slide13.addText("DJI HR · 人才发展部", {
    x: 0.5, y: 5.5, w: 9, h: 0.4,
    fontSize: 14, color: DJI_COLORS.LIGHT_GRAY, align: "center"
});

// DJI Logo
slide13.addShape(pptx.ShapeType.rect, {
    x: 4.3, y: 1.5, w: 1.4, h: 0.5,
    fill: { color: DJI_COLORS.RED }
});
slide13.addText("DJI", {
    x: 4.3, y: 1.55, w: 1.4, h: 0.4,
    fontSize: 24, bold: true, color: DJI_COLORS.WHITE, align: "center"
});

// Save the presentation
const outputPath = "组织派兵布阵沙盘_演示.pptx";
pptx.writeFile({ fileName: outputPath })
    .then(() => console.log(`Presentation saved to: ${outputPath}`))
    .catch(err => console.error("Error saving presentation:", err));
