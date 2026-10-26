#!/usr/bin/env node
/**
 * 清理 GitHub Release 中「旧版本」附件（安装包），Release 本体 / tag / 更新日志全部保留。
 *
 * 只调用 GitHub REST API 的 DELETE /repos/{repo}/releases/assets/{id}，
 * 不删除 Release、不改正文、不碰本地任何文件。
 *
 * 用法：
 *   node scripts/prune-old-release-assets.mjs v1.3.2                     # 预演（默认）
 *   GITHUB_TOKEN=ghp_xxx node scripts/prune-old-release-assets.mjs v1.3.2 --force
 *   node scripts/prune-old-release-assets.mjs v1.3.2 --keep '*.dmg'      # 白名单
 *   node scripts/prune-old-release-assets.mjs <tag> --all                # 清空旧版本全部附件
 *
 * 需要 Node.js 18+（内置 fetch）。Token 需要 repo（Contents: Read and write）权限。
 */

const DEFAULT_PATTERNS = [
  '*.exe', '*.msi', '*.msix',
  '*.dmg', '*.pkg',
  '*.appimage', '*.app.tar.gz',
  '*.deb', '*.rpm',
  '*.zip', '*.7z',
  '*.tar.gz', '*.gz',
  '*.sig', '*.sha256', '*.sha512',
  'latest.json', 'SHA256SUMS.txt',
];

const HELP = `用法: node prune-old-release-assets.mjs <保留版本> [选项]

  -k, --keep-from <ver>     起始版本，>= 该版本的附件一律不动（也可用第一个位置参数）
      --repo <owner/name>   仓库，默认 mqflive/syncpan-release
      --token <token>       GitHub Token，默认取环境变量 GITHUB_TOKEN
      --api-base <url>      API 地址，默认 https://api.github.com
      --patterns <list>     要删除的附件通配符，逗号分隔
      --keep <list>         白名单通配符，逗号分隔（命中永不删除）
      --all                 忽略 --patterns，删除旧版本所有附件（白名单仍生效）
      --include-prerelease  同时处理 beta/rc 等预发布 Release（默认跳过）
  -f, --force               真正执行删除（不加则为预演）
  -h, --help                显示帮助

示例:
  node prune-old-release-assets.mjs v1.3.2
  GITHUB_TOKEN=ghp_xxx node prune-old-release-assets.mjs v1.3.2 --force
  node prune-old-release-assets.mjs v1.3.2 --patterns '*.exe,*.msi' --force
  node prune-old-release-assets.mjs v1.3.2 --keep '*.dmg' --all --force
`;

function fail(message) {
  console.error(`错误：${message}`);
  process.exit(1);
}

function parseList(value) {
  return String(value).split(',').map((s) => s.trim()).filter(Boolean);
}

function parseArgs(argv) {
  const opts = {
    keepFrom: '',
    repo: 'mqflive/syncpan-release',
    token: process.env.GITHUB_TOKEN || '',
    apiBase: 'https://api.github.com',
    patterns: DEFAULT_PATTERNS,
    keep: [],
    all: false,
    includePrerelease: false,
    force: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const value = () => {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith('-')) fail(`参数 ${arg} 缺少取值`);
      i += 1;
      return v;
    };

    switch (arg) {
      case '-k':
      case '--keep-from':
        opts.keepFrom = value();
        break;
      case '--repo':
        opts.repo = value();
        break;
      case '--token':
        opts.token = value();
        break;
      case '--api-base':
        opts.apiBase = value();
        break;
      case '--patterns':
        opts.patterns = parseList(value());
        break;
      case '--keep':
        opts.keep = parseList(value());
        break;
      case '--all':
        opts.all = true;
        break;
      case '--include-prerelease':
        opts.includePrerelease = true;
        break;
      case '-f':
      case '--force':
        opts.force = true;
        break;
      case '-h':
      case '--help':
        console.log(HELP);
        process.exit(0);
        break;
      default:
        if (arg.startsWith('-')) fail(`未知参数：${arg}（-h 查看帮助）`);
        if (opts.keepFrom) fail(`多余的位置参数：${arg}`);
        opts.keepFrom = arg;
    }
  }

  if (!opts.keepFrom) {
    console.log(HELP);
    fail('缺少保留版本号，例如 v1.3.2');
  }
  return opts;
}

function parseVersion(tag) {
  if (!tag) return null;
  const raw = String(tag).trim().replace(/^[vV]/, '');
  const m = raw.match(/^(\d+(?:\.\d+)*)(?:-([0-9A-Za-z.-]+))?(?:\+.*)?$/);
  if (!m) return null;
  return {
    numbers: m[1].split('.').map(Number),
    pre: m[2] || '',
    raw,
  };
}

function compareVersion(a, b) {
  const len = Math.max(a.numbers.length, b.numbers.length);
  for (let i = 0; i < len; i += 1) {
    const x = i < a.numbers.length ? a.numbers[i] : 0;
    const y = i < b.numbers.length ? b.numbers[i] : 0;
    if (x !== y) return x < y ? -1 : 1;
  }

  // 语义化版本：1.0.0-beta < 1.0.0
  if (!a.pre && !b.pre) return 0;
  if (!a.pre) return 1;
  if (!b.pre) return -1;

  const xs = a.pre.split('.');
  const ys = b.pre.split('.');
  const n = Math.max(xs.length, ys.length);
  for (let i = 0; i < n; i += 1) {
    if (i >= xs.length) return -1;
    if (i >= ys.length) return 1;

    const xIsNum = /^\d+$/.test(xs[i]);
    const yIsNum = /^\d+$/.test(ys[i]);

    if (xIsNum && yIsNum) {
      const d = Number(xs[i]) - Number(ys[i]);
      if (d !== 0) return d < 0 ? -1 : 1;
    } else if (xIsNum !== yIsNum) {
      // 数字标识符优先级低于字母标识符
      return xIsNum ? -1 : 1;
    } else if (xs[i] !== ys[i]) {
      return xs[i] < ys[i] ? -1 : 1;
    }
  }
  return 0;
}

function wildcardToRegExp(pattern) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.');
  return new RegExp(`^${escaped}$`, 'i');
}

function formatSize(bytes) {
  const n = Number(bytes) || 0;
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(2)} GB`;
  if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(2)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(2)} KB`;
  return `${n} B`;
}

async function main() {
  if (typeof fetch !== 'function') {
    fail(`当前 Node.js 版本过低（${process.version}），需要 18+ 才有内置 fetch`);
  }

  const opts = parseArgs(process.argv.slice(2));
  const target = parseVersion(opts.keepFrom);
  if (!target) fail(`无法解析版本号：${opts.keepFrom}（示例：v1.3.2）`);
  if (opts.force && !opts.token) {
    fail('真正删除需要 GitHub Token：设置环境变量 GITHUB_TOKEN，或使用 --token 传入');
  }

  const apiBase = opts.apiBase.replace(/\/+$/, '');
  const repoApi = `${apiBase}/repos/${opts.repo}`;
  const keepRegexps = opts.keep.map(wildcardToRegExp);
  const patterns = opts.patterns.map(wildcardToRegExp);

  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'syncpan-prune-release-assets',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

  async function api(url, method = 'GET') {
    let res;
    try {
      res = await fetch(url, { method, headers });
    } catch (err) {
      throw new Error(`网络请求失败：${url}\n${err.message}`);
    }

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      if (res.status === 401) throw new Error('Token 无效、已过期或权限不足（需要 repo / Contents 读写权限）');
      if (res.status === 404) throw new Error(`仓库或资源不存在：${url}（私有仓库需要 Token；也请确认版本号拼写）`);
      if (res.status === 403 && /rate limit/i.test(body)) {
        throw new Error('GitHub API 频率超限（未认证每小时 60 次）。请设置 GITHUB_TOKEN 后重试');
      }
      if (res.status === 403) throw new Error(`无权限（403），请检查 Token 权限：${body.slice(0, 200)}`);
      throw new Error(`GitHub API ${res.status}：${body.slice(0, 200)}`);
    }

    if (res.status === 204) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  console.log('');
  console.log(`仓库     : ${opts.repo}`);
  console.log(`保留版本 : >= ${target.raw}（该版本及更新版本的附件全部保留）`);
  console.log(`模式     : ${opts.force ? '执行删除' : '预演（加 --force 才会真正删除）'}`);
  console.log('备注     : 只删附件，Release 本体 / tag / 更新日志保持不变');
  console.log('');

  const releases = [];
  for (let page = 1; ; page += 1) {
    const batch = await api(`${repoApi}/releases?per_page=100&page=${page}`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    releases.push(...batch);
    if (batch.length < 100) break;
  }

  if (releases.length === 0) {
    console.log('没有任何 Release，结束。');
    return;
  }

  console.log(
    `共获取到 ${releases.length} 个 Release（最新 tag：${releases[0].tag_name}，最旧 tag：${releases[releases.length - 1].tag_name}）`,
  );
  console.log('');

  const targetFound = releases.some((rel) => {
    const key = parseVersion(rel.tag_name);
    return key && compareVersion(key, target) === 0;
  });
  if (!targetFound) {
    console.warn(`警告: 仓库中未找到与 ${target.raw} 完全对应的 Release，请确认版本号是否写错。`);
  }

  const plan = [];
  let skipped = 0;

  for (const rel of releases) {
    if (rel.draft) continue;
    if (rel.prerelease && !opts.includePrerelease) continue;

    const key = parseVersion(rel.tag_name);
    if (!key) {
      skipped += 1;
      continue;
    }
    if (compareVersion(key, target) >= 0) continue;

    const assets = Array.isArray(rel.assets) ? rel.assets : [];
    if (assets.length === 0) continue;

    const doomed = assets.filter((asset) => {
      if (keepRegexps.some((re) => re.test(asset.name))) return false;
      if (opts.all) return true;
      return patterns.some((re) => re.test(asset.name));
    });

    if (doomed.length > 0) plan.push({ tag: rel.tag_name, assets: doomed });
  }

  if (skipped > 0) {
    console.warn(`警告: 跳过 ${skipped} 个无法解析版本号的 Release（tag 不是 vX.Y.Z 形式）。`);
  }

  if (plan.length === 0) {
    console.log(`没有需要清理的附件：${target.raw} 之前的 Release 已是干净的。`);
    return;
  }

  let totalCount = 0;
  let totalBytes = 0;
  let deleted = 0;
  let failed = 0;

  for (const item of plan) {
    const sum = item.assets.reduce((acc, a) => acc + (Number(a.size) || 0), 0);
    totalCount += item.assets.length;
    totalBytes += sum;

    console.log(`[${item.tag}] 待删 ${item.assets.length} 个附件，共 ${formatSize(sum)}`);
    for (const asset of item.assets) {
      console.log(`    ${asset.name}  (${formatSize(asset.size)})`);
    }
    console.log('');

    if (!opts.force) continue;

    for (const asset of item.assets) {
      try {
        await api(`${repoApi}/releases/assets/${asset.id}`, 'DELETE');
        deleted += 1;
        console.log(`    ✓ 已删除 ${asset.name}`);
      } catch (err) {
        failed += 1;
        console.log(`    ✗ 删除失败 ${asset.name}：${err.message}`);
      }
    }
    console.log(`[${item.tag}] Release 与更新日志已保留`);
    console.log('');
  }

  console.log('-'.repeat(60));
  if (opts.force) {
    console.log(`完成：成功删除 ${deleted} 个附件，失败 ${failed} 个，释放 ${formatSize(totalBytes)}`);
    if (failed > 0) process.exitCode = 1;
  } else {
    console.log(`预演完成：涉及 ${plan.length} 个 Release、${totalCount} 个附件、共 ${formatSize(totalBytes)}`);
    console.log('确认无误后加 --force 执行删除：');
    console.log(`  node scripts/prune-old-release-assets.mjs ${opts.keepFrom} --force`);
  }
  console.log('-'.repeat(60));
}

main().catch((err) => fail(err.message));
