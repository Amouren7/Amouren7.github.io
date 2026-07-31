---
title: Firefly 虚拟人踩坑记
description: DeepSeek + Vue3 + FastAPI 的 AI 陪伴聊天项目，那些不试不知道的技术坑。
pubDate: 2026-07-20
category: ai
tags: [Firefly, Vue3, FastAPI, DeepSeek]
---

Firefly 是我的一个 AI 虚拟人陪伴聊天项目：**DeepSeek 驱动 + Vue3 前端 + FastAPI 后端**。项目本身不算大，但里面每一层都有值得记的坑。这篇只讲坑，不讲框架。

## 后端 FastAPI

### CORS 永远是第一个坑
本地开发前后端分开端口跑，第一次请求就被 CORS 拦了。FastAPI 用 `CORSMiddleware`，开发期 `allow_origins=["*"]`，但**上线必须收敛**，否则就是裸奔。

### 流式响应别用 `json.dumps`
对话要一个字一个字蹦出来才像"活人"。StreamingResponse 里如果先把完整 JSON 序列化再发，流式就名存实亡。正确姿势：`json.dumps` 一个 `data: {...}\n\n`，前端按 SSE 解析。

## 前端 Vue3

### 流式解析：fetch 比 axios 顺手
`fetch` 原生支持读取响应体流，配合 `ReadableStream` 逐段解析 SSE；axios 的 onDownloadProgress 在这里很别扭。虚拟人说话要"边生成边显示"，用 fetch + 手动拼 markdown 渲染。

### markdown 渲染 + 流式 = 闪烁噩梦
每来一个 token 就整段重渲 markdown，高亮会闪。解决方案：**打字机效果**——先用纯文本累积，停顿（比如 30ms/字）后再整段渲染，视觉稳定很多。

## 模型层

### 别让系统提示词泄露
虚拟人的人设在 system prompt 里，用户多轮对话容易"套话"套出来。做了两层：**输入敏感信息过滤** + 会话隔离。这个不重视，上线就是事故。

### 上下文管理
没做截断的会话，聊到 30 轮就爆 token、成本飞涨。实现了一个简单的窗口策略：保留最近的 12 条 + 一条压缩摘要。够用，且不复杂。

## 结尾

Firefly 让我把「AI 应用」从概念变成了能跑、能聊、能上线的东西。坑很多，但每一个坑都是简历上的一句话。下一步想把虚拟人接上记忆（长期记忆 + 向量），让它记得你上次聊到哪。
