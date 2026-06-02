# SyncPan / 盘同步

跨平台网盘同步工具，支持百度网盘和夸克网盘。

## 下载安装

| 平台 | 架构 | 下载 |
|------|------|------|
| Windows | x86_64 | `.exe` (NSIS 安装包) / `.msi` |
| macOS | Apple Silicon (M1/M2/M3/M4) | `_aarch64.dmg` |
| macOS | Intel | `_x64.dmg` |
| Linux | x86_64 | `.AppImage` / `.deb` / `.rpm` |

> 前往 [Releases](https://github.com/mqflive/syncpan-release/releases/latest) 页面下载最新版本。

## 安装说明

### Windows

下载 `.exe` 安装包，双击运行即可。安装界面将自动跟随系统语言显示中文或英文。

### macOS

1. 下载对应架构的 `.dmg` 文件
2. 双击打开，将 SyncPan 拖入 Applications 文件夹
3. 首次打开如提示"无法验证开发者"，请在终端执行：
   ```bash
   xattr -cr /Applications/SyncPan.app
   ```

### Linux

**AppImage（推荐）：**
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

## Homebrew (macOS)

```bash
brew tap mqflive/syncpan https://github.com/mqflive/syncpan-release
brew install --cask syncpan
```

## 自动更新

SyncPan 支持应用内自动更新，有新版本时会自动提醒。

## 相关链接

- [更新日志](CHANGELOG.md)
- [问题反馈](https://github.com/mqflive/syncpan/issues)
