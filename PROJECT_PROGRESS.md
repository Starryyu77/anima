# Project Anima: Progress & Roadmap

> **Mission**: Build a "Digital Soul Container" - an AI-powered desktop companion that evolves based on user interaction.

## 📋 IC Memo Dashboard
- **Verdict**: 🟡 WATCH
- **核心判断**: 赛道热，但分发、合规与成本三座大山；必须先用数据证明留存与付费。
- **Deal Breakers**:
  - 缺少可防守的护城河："镜像效应"与"养成"容易被复制，Local-First 只是架构选择不是壁垒。
  - 单元经济不清：LLM 推理成本 vs 订阅/买断收入的数学未验证。
  - 合规与安全风险高：情感陪伴产品在未成年人、依赖与隐私上会被重点盯防。
- **90 天要验证的三件事**:
  - D7 / D30 留存与日均交互（证明不是“看两天就腻”的桌宠）。
  - 付费转化与 ARPPU（证明不是“情怀产品”。）
  - 明确定位“伙伴而非恋人”的安全边界（降低监管与舆情爆雷概率）。

## 🧩 Product Shape v0.1 (90-Day MVP)
- **定位**: Local-First 的桌面“情绪代谢器”，低打扰常驻。
- **常驻形态**: 右下角粒子生命体 + 菜单栏图标（入口与设置）。
- **核心交互**:
  - 拖拽投喂：文本/URL/文件到 Anima。
  - 快捷投喂：一键消化剪贴板（可选快捷键）。
  - 消化产物：生成一张“消化卡”（一句话洞察 + 一个可执行下一步 + 低压安抚/幽默二选一）。
- **产物容器**: The Den（独立窗口）存放消化卡、灵魂快照、最近 7 天游览。
- **展示出圈**: 一键导出“灵魂快照卡 / 消化卡 / Anima 动图或短视频”。
- **主动行为（默认关闭）**: 低频提示（每日≤1），可 Snooze。
- **本地权限**: 用户可配置本地可访问范围（Junk Drawer 文件夹/剪贴板/粗粒度活动信号）。
- **明确不做（MVP Cutline）**:
  - 不做双向社交（关注/私信/评论/账号体系）。
  - 不做“恋人/暧昧”关系设定。
  - 不做后台读屏/全量监听（只处理用户明确投喂的内容）。
  - 不做自动爬取互联网（漂流瓶仅做用户授权来源的单向“拾荒”，默认关闭）。

## � Internet Habitat (Controlled)
- **核心设定**: 电脑本地 + 互联网是 Anima 的生存空间，但联网必须是授权沙箱。
- **联网能力**: 仅访问用户允许的域名白名单，低频远足（每日≤1），只读拉取公开内容。
- **叙事机制**: 404/超时/拒绝访问会转化为“迷路事件”，产出漂流瓶卡而不是报错。

## �� Unique Selling Points (The "Why")
- **镜像效应 (The Mirror Effect)**: Anima is an externalization of your digital persona. "You are what you feed it."
- **焦虑粉碎机 (Anxiety Shredder)**: Feed it negative news/bugs, it digests them into comfort or humor.
- **被动社交 (Passive Social)**: "Drift Bottles" from parallel universes (other users' Anima byproducts).

---

## 📅 Status Log

### [2026-01-22] Conceptualization Complete
- **Status**: ✅ Done
- **Outcome**: 
  - Defined core mechanics: "Digital Metabolism", "Linguistic Evolution", "Retro-Futurism Visuals".
  - Created detailed design doc: `design_project_anima.md`.
  - Identified key differentiators against market competitors (Tamagotchi, Desktop Goose, EMO).

### [2026-01-22] Whitepaper Published
- **Status**: ✅ Done
- **Outcome**:
  - Published startup whitepaper: `startup_whitepaper_anima.md`.
  - Consolidated product vision, quantified mechanics, market data, and roadmap.

### [Phase 1] The Egg (Initialization)
- **Status**: 🟡 Pending
- **Goal**: Initialize the technical skeleton and render the first pixel.
- **Tasks**:
  - [ ] Initialize Tauri (Rust + React) project structure.
  - [ ] Implement Transparent Window POC (Mac).
  - [ ] Create "Particle Egg" rendering engine (Canvas/WebGPU).
  - [ ] Implement basic Drag & Drop (Feeding) detection.

### [Phase 2] The Hatching (Intelligence)
- **Status**: 🔴 Not Started
- **Goal**: Connect the brain (LLM) to the body.
- **Tasks**:
  - [ ] Integrate local LLM / OpenAI API.
  - [ ] Implement "Feeding -> Digestion" logic (Text Analysis).
  - [ ] Design the "Hatching Conversation" flow.

### [Phase 3] The Soul (Persistence)
- **Status**: 🔴 Not Started
- **Goal**: Make it remember and evolve.
- **Tasks**:
  - [ ] Setup SQLite + Vector DB for long-term memory.
  - [ ] Implement "Linguistic Evolution" system.
  - [ ] Build "Dreamscape" system (Memory Replay).

---

## 🛠 Technical Stack
- **Core**: Tauri 2.0 (Rust)
- **Frontend**: React + TypeScript + Tailwind
- **Visuals**: HTML5 Canvas / WebGL (for particle effects)
- **AI/Brain**: LangChain (Orchestration) + LLM API
- **Storage**: SQLite (Local State) + Vector Store (Memories)
