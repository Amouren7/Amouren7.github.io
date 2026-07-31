---
title: Firefly 虚拟人
num: "01"
cat: "<b>☲ 火</b> · AI Application"
summary: 基于 DeepSeek + Vue3 + FastAPI 的 AI 陪伴聊天虚拟人：流式打字机对话、多轮上下文管理、敏感信息过滤，能像朋友一样记住聊过的内容。
tech: [DeepSeek, Vue3, FastAPI, SSE 流式]
metrics:
  - value: "0.3s"
    label: 首字延迟
  - value: "30 轮"
    label: 上下文窗口
  - value: "2 层"
    label: 安全过滤
images:
  a: 对话界面
  b: 数据看板
  c: DeepSeek + Vue3 陪伴聊天
draft: false
---

## 项目简介

Firefly 是一个 **AI 陪伴聊天虚拟人**：给它一个人设，它就能以这个身份陪你聊天。核心是「让对话像人、记得住、安全」。

技术底座：**DeepSeek 驱动 + Vue3 前端 + FastAPI 后端**，全链路流式输出。

## 技术栈与架构

```
Vue3 前端（打字机式对话 + markdown 渲染）
        │  SSE 流式（text/event-stream）
FastAPI 后端（会话管理 / 上下文窗口 / 敏感信息过滤）
        │
DeepSeek API（流式生成，system prompt 注入人设）
```

- **流式打字机**：fetch 读取 ReadableStream，逐段解析 SSE，先累积再渲染，避免 markdown 闪烁
- **会话隔离**：每会话独立上下文，多用户互不干扰

## 核心能力

1. **流式对话**：字句逐字蹦出，像真实交流
2. **多轮记忆**：最近 30 轮对话窗口 + 摘要压缩，聊久了不丢失
3. **人设稳定**：system prompt 注入角色设定，长期对话不跑偏
4. **安全护栏**：两层敏感信息过滤，防止人设泄露与越权回答

## 技术难点与解法

| 难点 | 解法 |
|---|---|
| 流式 + 中文乱码 | StreamingResponse 设 `charset=utf-8`，前端 fetch 解析 SSE |
| markdown 逐字重渲闪烁 | 纯文本累积 → 停顿后整段渲染（打字机效果） |
| 上下文爆炸 | 最近 12 条 + 压缩摘要的窗口策略，控制 token 与成本 |
| 人设被套话 | 输入敏感信息过滤 + 会话级隔离 |

## 成果与数据

- 首字延迟 **0.3s**（DeepSeek 流式）
- 上下文窗口 **30 轮**不崩坏
- **2 层**安全过滤，未出现人设泄露事故

## 复盘与收获

这个项目让我把「AI 应用」从概念变成了**能跑、能聊、能上线**的东西。最大的收获不是框架，而是：**流式交互的体验细节**和**安全护栏的必要性**——AI 应用的好用与可靠，都是打磨出来的。

下一步计划：接入长期记忆（向量检索），让虚拟人记得你上次聊到哪。
