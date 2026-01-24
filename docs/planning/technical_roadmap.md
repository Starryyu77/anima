# Project Anima: Technical Architecture & Roadmap

> **Status**: Living Document
> **Version**: 1.0
> **Date**: 2026-01-22

---

## 1. High-Level Architecture (The Stack)

Project Anima 采用 **Local-First (本地优先)** 架构，确保极致的性能与隐私安全。详细架构设计请参考 [system_architecture.md](../system_architecture.md)。

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Perception** | **Tauri (Rust)** | 高效的系统级监听（窗口、空闲、剪贴板）。 |
| **Cognitive** | **OpenAI / Local LLM** | 负责语义理解、情感分析和决策生成。 |
| **Physiological** | **Rust / TypeScript** | 核心数值状态机，高性能且类型安全。 |
| **Presentation** | **Three.js + Cannon.js** | 实现 Soft Body (软体) 物理模拟和粒子特效。 |
| **Memory** | **Qdrant + SQLite** | 向量检索与关系存储，支持长期记忆。 |

---

## 2. Core Modules (核心模块设计)

### 2.1 The Ghost Shell (透明窗口与交互)
*   **Goal**: 创建一个能“依附”在屏幕底部或窗口上的透明生物，且鼠标能穿透透明区域。
*   **Tech**:
    *   `NSWindow` (macOS) / `SetWindowLong` (Windows) 配置。
    *   **Raycasting Click-through**: 使用 3D 射线检测判断点击的是模型还是背景。

### 2.2 The Bio-State Machine (生物状态机)
*   **Data Model**:
    ```rust
    struct BioState {
        // 显性指标
        intimacy: f32, mood: f32, energy: f32,
        // 隐性性格
        rationality: f32, sensibility: f32, chaos: f32
    }
    ```
*   **Logic**:
    *   **Game Loop**: 1Hz 心跳，处理自然衰减。
    *   **Genetic Shader Control**: 根据历史数据计算 Shader 参数 (Crack, Flow, Glow)。

### 2.3 The Context Awareness (环境感知)
*   **Input**: Active Window Title, System Idle Time, Typing Frequency.
*   **Process**: 将环境数据转化为 `ContextVector`，驱动 `Dynamic Props System`。

### 2.4 The Visual System (软体渲染器)
*   **Concept**: Anima 是一团果冻。
*   **Tech**:
    *   **Soft Body Simulation**: 模拟顶点位移，表现弹性。
    *   **Action Primitives**: 预设动作库 (Bounce, Melt, Shudder) 供 LLM 调用。

---

## 3. Implementation Roadmap (开发路线图)

### Stage 1: The Skeleton (骨架) —— *MVP Core*
*目标: 无论多丑，先让一个东西在桌面上动起来，并能响应鼠标。*

*   [ ] **Init**: 初始化 Tauri + React + TypeScript 项目。
*   [ ] **Window**: 实现 macOS 下的无边框、透明、置顶窗口。
*   [ ] **Physics**: 集成 Cannon.js，实现一个基础的软体球体 (Soft Body)。
*   [ ] **Interaction**: 实现窗口拖拽、鼠标点击反馈 (Raycasting)。

### Stage 2: The Senses (感官) —— *Interaction Loop*
*目标: 实现“投喂”功能，让它能“吃”东西并有反应。*

*   [ ] **Ingestion**: 实现文件拖拽、剪贴板读取接口。
*   [ ] **Cognition**: 接入 LLM API，实现简单的文本情感分析。
*   [ ] **Digestion UI**: 实现“消化卡”弹窗和咀嚼动画反馈。
*   [ ] **State**: 实现基础的“饥饿-进食”状态循环。

### Stage 3: The Soul (灵魂) —— *Long-term Retention*
*目标: 让它记住你，并产生永久性的改变。*

*   [ ] **Memory**: 集成 Qdrant 和 SQLite，实现长期记忆存储。
*   [ ] **Context**: 实现前台窗口监听，驱动道具系统 (Props)。
*   [ ] **Evolution**: 实现性格参数对外观（形状/颜色）的长期影响。
*   [ ] **Polaroid**: 实现 3D 截图与文案合成功能。
*   [ ] **Research**: 探索 RAG/Fine-tuning 在人格过滤器和符号生成中的应用。

---

## 4. Immediate Next Steps (立即执行)

根据 Roadmap，我们的当务之急是 **Stage 1: The Skeleton**。
我们将创建一个干净的 Tauri 项目，并攻克最难的“透明窗口”和“3D 点击穿透”问题。

**Command to run**:
```bash
npm create tauri-app@latest
```
