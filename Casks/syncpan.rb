cask "syncpan" do
  version "2.0.0"
  sha256 "REPLACE_WITH_SHA256"

  desc "跨平台网盘同步工具"
  homepage "https://github.com/mqflive/syncpan-release"
  url "https://github.com/mqflive/syncpan-release/releases/download/v#{version}/SyncPan_#{version}_aarch64.dmg"
  name "SyncPan"
  auto_updates true

  depends_on macos: ">= :ventura"

  app "SyncPan.app"

  postflight do
    system_command "xattr", args: ["-cr", appdir/"SyncPan.app"]
  end

  caveats <<~EOS
    SyncPan 已安装完成！

    首次打开如提示"无法验证开发者"，请在终端执行：
      xattr -cr /Applications/SyncPan.app

    或在系统设置 > 隐私与安全性中点击"仍要打开"。
  EOS
end
