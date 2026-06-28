# SyncPan — 多网盘资源自动同步转存工具

<p align="center">
  <strong>一站式管理你的百度网盘和夸克网盘，自动追更、批量操作、跨平台畅用</strong>
</p>

<p align="center">
  <a href="https://github.com/mqflive/syncpan-release/releases/latest"><img alt="下载最新版" src="https://img.shields.io/github/v/release/mqflive/syncpan-release?label=最新版本&color=0ea5e9" /></a>
  <a href="https://github.com/mqflive/syncpan-release/releases"><img alt="下载量" src="https://img.shields.io/github/downloads/mqflive/syncpan-release/total?label=总下载量&color=059669" /></a>
  <img alt="平台" src="https://img.shields.io/badge/平台-Windows%20%7C%20macOS%20%7C%20Linux-8b5cf6" />
</p>

---

## SyncPan 能做什么？

| 功能 | 说明 |
|------|------|
| 🔄 **自动追更** | 把你关注的分享链接设为任务，有新内容时自动转存到你的网盘，无需手动操作 |
| 📂 **文件浏览** | 在应用内直接浏览和整理网盘文件：重命名、删除、移动、复制、新建文件夹、预览图片和文本 |
| 🔍 **资源搜索** | 全网搜索网盘资源，关键词自动高亮，一键复制分享链接 |
| 🎬 **发现页** | 浏览豆瓣影视热榜、口碑榜、新片榜，发现感兴趣的资源 |
| 🗂️ **我的分享** | 查看自己在百度网盘和夸克网盘上创建的所有分享链接，支持导出 CSV |
| 📦 **批量转存** | 一次性将多条分享链接中的文件保存到你的网盘，支持暂停/继续/取消，含防风控保护 |
| 🔗 **链接转换** | 批量解析和转换分享链接，同平台不同账号之间互转 |
| ✏️ **批量重命名** | 按规则批量修改网盘中的文件/文件夹名称：正则替换、序号命名、添加前后缀、修改扩展名 |
| 📢 **批量分享** | 批量给文件创建分享链接，设置提取码和有效期 |
| 🧹 **广告清理** | 一键扫描并批量删除网盘中混入的广告文件 |
| 🌲 **目录树导出** | 将网盘目录结构生成树形图或列表，导出为文本文件保存到本地 |
| 📁 **广告插入** | 批量将广告文件插入到目标目录树中，支持极速模式 |
| 🔔 **多渠道通知** | 任务完成/失败时自动推送通知，支持 Bark、微信（Server酱/PushPlus）、钉钉、飞书、Telegram、企业微信、自定义 Webhook |
| 🌐 **内网穿透** | 在局域网内通过浏览器访问应用，手机/平板也能用 |
| 🔑 **多账号管理** | 同时管理多个网盘账号，支持扫码登录、拖拽排序、Cookie 有效性检测 |
| ⚡ **自动更新** | 应用内一键检查并下载新版本，无需手动重装 |

## 支持的网盘

| 平台 | 文件操作 | 分享解析 | 转存 | 扫码登录 | 每日签到 |
|------|:---:|:---:|:---:|:---:|:---:|
| 百度网盘 | ✅ | ✅ | ✅ | ✅ | — |
| 夸克网盘 | ✅ | ✅ | ✅ | ✅ | ✅ |

## 立即下载

> 前往 [**Releases 页面**](https://github.com/mqflive/syncpan-release/releases/latest) 下载最新版本。

| 平台 | 文件类型 | 说明 |
|------|---------|------|
| **Windows** | `.exe` / `.msi` | NSIS 安装包，双击安装即可，自动跟随系统语言 |
| **macOS** (Apple Silicon) | `_aarch64.dmg` | M1/M2/M3/M4 芯片机型 |
| **macOS** (Intel) | `_x64.dmg` | Intel 芯片机型 |
| **Linux** | `.AppImage` / `.deb` / `.rpm` | AppImage 推荐，无需安装直接运行 |

### Windows

1. 下载 `.exe` 安装包
2. 双击运行，按提示完成安装
3. 安装界面会自动跟随系统语言显示中文或英文

### macOS

1. 下载对应芯片架构的 `.dmg` 文件
2. 双击打开，将 **SyncPan** 拖入「应用程序」文件夹
3. 首次打开如提示"无法验证开发者"，请在终端执行：

   ```bash
   xattr -cr /Applications/SyncPan.app
   ```

   或在「系统设置 → 隐私与安全性」中点击「仍要打开」。

> 💡 也可以使用 Homebrew 安装：
> ```bash
> brew tap mqflive/syncpan https://github.com/mqflive/syncpan-release
> brew install --cask syncpan
> ```

### Linux

**AppImage（推荐，无需安装）：**

```bash
chmod +x SyncPan_*.AppImage
./SyncPan_*.AppImage
```

**Debian/Ubuntu：**

```bash
sudo dpkg -i syncpan_*_amd64.deb
```

**Fedora/RHEL：**

```bash
sudo rpm -i syncpan-*.x86_64.rpm
```

## 自动更新

SyncPan 内置自动更新功能。有新版本发布时，应用会自动检测并弹窗提醒，点击即可下载安装，无需手动去 Releases 页面下载。

## 加入用户群

欢迎加入 SyncPan 用户交流群，获取最新动态、反馈使用问题、与其他用户交流经验。

- **QQ 群**：945729782 → [一键加群](https://qm.qq.com/q/HIeAFUugQQ)

## 常见问题

### 为什么需要风控策略？

网盘平台对频繁操作有限制。SyncPan 内置智能风控策略，会在操作之间加入随机延迟、批次暂停、夜间降速等保护措施，防止账号被限。你可以在应用的「设置 → 防风控策略」中根据需求调整。

### 扫码登录后 Cookie 能保存多久？

登录信息加密保存在本地，不会上传到任何服务器。Cookie 有效性会定期检查，过期后需要重新登录。

### 支持跨平台同步吗？

SyncPan 是桌面应用，可在 Windows、macOS、Linux 上使用。通过内网穿透功能，局域网内的手机和平板浏览器也能访问。

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解每个版本的更新内容。

## 反馈与建议

遇到问题或有功能建议？欢迎到 [Issues](https://github.com/mqflive/syncpan-release/issues) 页面反馈。

---

<p align="center">
  Made with ❤️ by SyncPan Team
</p>
