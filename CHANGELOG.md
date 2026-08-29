# 更新日志

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

🌐 官网：[syncpan.top](https://syncpan.top) · 使用文档：[syncpan.top/docs](https://syncpan.top/docs/quick-start) · 下载：[syncpan.top/download](https://syncpan.top/download/)

---

## [0.0.18] - 2026-06-28

### 新增
- **统一防风控策略面板**：设置页集中管理广告插入/清理、批量转存、链接转换、批量重命名、批量分享共 6 个功能模块的延迟模式 + 全局风控策略
- **批量操作独立延迟模式**：批量分享/批量重命名支持快速/适中/保守三档延迟，含连续失败自动退避
- **批量转存/链接转换自定义参数**：可独立调整单次间隔、小批次暂停、大批次暂停、智能降速上限
- **全局风控运行时配置**：支持动态调整批次大小、批次暂停、夜间时段、夜间倍率等参数，即时生效

---

## [0.0.17] - 2026-06-21

### 新增
- **广告插入功能**：批量将广告文件插入目标目录树，支持普通/极速模式、暂停/继续/取消
- **我的分享页面**：查看百度/夸克上创建的所有分享链接，支持批量获取、排序、导出 CSV、缓存
- **批量转存实战页面**：多链接批量转存，独立防风控
- **链接转换实战页面**：批量链接转换
- **广告清理功能**：批量扫描→确认→删除网盘中的广告文件
- **目录树生成**：递归生成网盘目录结构树（树形/列表双模式），支持导出到本地文件
- **批量分享/重命名实战页面**：完整的配置面板和结果预览
- **文本文件预览**：TXT 等文本文件悬停预览
- **搜索页转存并分享**：搜索结果一键转存并生成分享链接
- **分享解析快速模式**：跳过 cookie 预热，轻量场景提速
- **VIP 心跳在线状态**：侧边栏头像状态点联动
- **路由级懒加载**：所有页面按需分包，减少首屏加载体积

---

## [0.0.16] - 2026-06-09

### 新增
- **任务卡片虚拟滚动**：万级任务数据流畅不卡

---

## [0.0.15] - 2026-06-08

### 变更
- 内部分模块目录重构

---

## [0.0.14] - 2026-06-08

### 新增
- **内网穿透增强**：网页版支持分享链接解析、浏览子文件夹

### 修复
- 内网穿透删除文件参数不一致问题
- 更新后桌面快捷方式丢失

---

## [0.0.13] - 2026-06-08

### 新增
- **单实例防护**：防止多开，再次启动自动激活已有窗口
- **NSIS 安装器图标**：安装程序显示应用图标

---

## [0.0.12] - 2026-06-07

### 新增
- **单实例防护**：防止多开，从托盘恢复已有窗口
- **GitHub 下载代理**：解决国内网络访问 GitHub 慢的问题

---

## [0.0.11] - 2026-06-07

### 新增
- 转存日志增强
- 任务卡片 UI 优化：集数徽章、完结标识、悬停动画
- TMDB 双 API 自动切换

### 修复
- 转存日志不显示问题
- 百度分享链接解析错误
- 强制更新弹窗可关闭问题

---

## [0.0.10] - 2026-06-06

### 新增
- 更新弹窗优化：加宽、滚动限制、层级区分
- 自动化发版预检脚本

---

## [0.0.9] - 2026-06-06

### 新增
- **公告通知系统**：标题栏新增公告按钮，支持公告列表、详情弹窗、图片预览
- 右下角检查更新按钮

---

## [0.0.8] - 2026-06-05

### 新增
- 自动更新流程优化

---

## [0.0.7] - 2026-06-05

### 新增
- 搜索结果一键追更

---

## [0.0.6] - 2026-06-04

### 修复
- 启动时黑色命令行窗口问题
- 豆瓣榜单支持代理

---

## [0.0.5] - 2026-06-04

### 修复
- 修正部分配置生成逻辑
- 更新签名密钥

---

## [0.0.4] - 2026-06-04

### 修复
- 修正前端资源路径配置

---

## [0.0.3] - 2026-06-04

### 修复
- 修正 Tauri 路径配置
- 修复代码警告

---

## [0.0.2] - 2026-06-04

### 修复
- 修复前端编译错误

---

## [0.0.1] - 2026-06-04

### 新增
- **首个公开发布版本**
- 百度网盘和夸克网盘支持
- 自动追更、文件浏览、资源搜索、发现页
- 扫码登录、自动更新
- 多渠道通知推送

---

[0.0.18]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.18
[0.0.17]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.17
[0.0.16]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.16
[0.0.15]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.15
[0.0.14]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.14
[0.0.13]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.13
[0.0.12]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.12
[0.0.11]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.11
[0.0.10]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.10
[0.0.9]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.9
[0.0.8]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.8
[0.0.7]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.7
[0.0.6]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.6
[0.0.5]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.5
[0.0.4]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.4
[0.0.3]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.3
[0.0.2]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.2
[0.0.1]: https://github.com/mqflive/syncpan-release/releases/tag/v0.0.1
