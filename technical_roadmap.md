# Project Anima: Technical Architecture & Roadmap

> **Status**: Living Document
> **Version**: 1.0
> **Date**: 2026-01-22

---

## 1. High-Level Architecture (The Stack)

Project Anima 采用 **Local-First (本地优先)** 架构，确保极致的性能与隐私安全。

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **App Shell** | **Tauri 2.0 (Rust)** | 内存占用 <50MB，原生系统调用能力强，安全性高。 |
| **Frontend** | **React 19 + TypeScript** | 生态成熟，组件化开发，方便实现 UI 逻辑。 |
| **Visual Engine** | **Pixi.js (WebGL)** | 高性能 2D 粒子渲染，实现“点阵生物”效果，比 DOM 动画快 100 倍。 |
| **State/DB** | **SQLite (via sqlx)** | 存储性格参数、对话历史、用户画像。单文件，易迁移。 |
| **Vector DB** | **Qdrant (Local Mode)** | 存储语义记忆，支持 RAG 检索。轻量级，可嵌入。 |
| **AI Brain** | **OpenAI API (MVP) / Llama.cpp (Pro)** | MVP 阶段用 API 快速验证；后期引入本地模型以保护隐私。 |
| **Styling** | **TailwindCSS** | 原子化 CSS，快速构建 UI。 |

---

## 2. Core Modules (核心模块设计)

### 2.1 The Ghost Shell (透明窗口系统)
*   **Goal**: 创建一个能“依附”在屏幕底部或窗口上的透明生物，且鼠标能穿透透明区域。
*   **Tech**:
    *   `NSWindow` (macOS) / `SetWindowLong` (Windows) 配置。
    *   **Click-through Logic**: 实时检测鼠标下的像素透明度。如果 `alpha < 0.1`，则将点击事件透传给系统 (Ignore Mouse Events)。

### 2.2 The Personality Engine (性格状态机)
*   **Data Model**:
    ```rust
    struct Personality {
        openness: f32,        // 0.0 - 1.0
        conscientiousness: f32,
        extraversion: f32,
        agreeableness: f32,
        neuroticism: f32,
        // 动态状态
        mood: String,         // "happy", "anxious", "glitched"
        energy: f32,          // 0.0 - 1.0 (体力值)
    }
    ```
*   **Logic**:
    *   **Event Loop**: 每分钟 tick 一次，根据 `energy` 和 `environment` 更新 `mood`。
    *   **Interaction**: 喂食/抚摸/忽视 -> 触发 `Trait Modification` 函数。

### 2.3 The Digital Metabolism (新陈代谢系统)
*   **Input**: 文件拖拽 (File Drop) / 剪贴板内容。
*   **Process**:
    1.  **Text Extraction**: 提取文本内容。
    2.  **Semantic Analysis**: 调用 LLM 分析情感 (Sentiment) 和主题 (Topic)。
    3.  **Digestion**: 更新性格参数，生成“排泄物” (Summary/Art)。

### 2.4 The Visual System (粒子渲染器)
*   **Concept**: Anima 没有固定贴图，由一团粒子组成。
*   **Parameters**:
    *   `Color`: 由 `mood` 决定 (红=怒, 蓝=静)。
    *   `Speed`: 由 `energy` 决定。
    *   `Shape`: 由 `personality` 决定 (尖锐=理智, 圆润=随和)。
*   **Tech**: Pixi.js Shader Filter。

---

## 3. Implementation Roadmap (开发路线图)

### Phase 1: The Shell (骨架) —— *Current Focus*
*   [ ] **Init**: 初始化 Tauri + React + TypeScript 项目。
*   [ ] **Window**: 实现 macOS 下的无边框、透明、置顶窗口。
*   [ ] **Tray**: 实现系统托盘菜单 (Quit/Settings)。
*   [ ] **Drag**: 实现窗口可拖拽移动。

### Phase 2: The Face (皮囊)
*   [ ] **Pixi Setup**: 集成 Pixi.js。
*   [ ] **Particle Demo**: 渲染一个基础的、会呼吸的粒子球。
*   [ ] **Reaction**: 鼠标悬停/点击时，粒子球产生物理反馈（弹开/变色）。

### Phase 3: The Brain (大脑)
*   [ ] **LLM Client**: 封装 OpenAI API 调用接口。
*   [ ] **Chat UI**: 点击宠物弹出一个极简对话气泡。
*   [ ] **Context**: 实现基础的 Prompt 注入 (You are a desktop pet...)。

### Phase 4: The Soul (灵魂 - 长期)
*   [ ] **DB Setup**: 集成 SQLite。
*   [ ] **Personality System**: 实现大五人格数值系统。
*   [ ] **Feeding**: 实现拖拽文件投喂逻辑。

---

## 4. Immediate Next Steps (立即执行)

根据 Roadmap，我们的当务之急是 **Phase 1: The Shell**。
我们将创建一个干净的 Tauri 项目，并攻克最难的“透明窗口”问题。

**Command to run**:
```bash
npm create tauri-app@latest
```
