# 工程规范

## 部署方式

**禁止使用 `netlify deploy --prod --dir .`**

本地 `data/` 目录的 JSON 文件（gallery.json、videos.json、journal.json）均为空数组，直接 CLI 部署会清空线上数据。

正确做法：用 GitHub API 推送代码文件（index.html、videos.html 等），Netlify 监听 GitHub 自动部署。

```bash
# 获取文件 SHA
curl -H "Authorization: token <PAT>" \
  https://api.github.com/repos/DTLA1215-Code/my-website/contents/<filepath>

# 推送更新
curl -X PUT -H "Authorization: token <PAT>" \
  https://api.github.com/repos/DTLA1215-Code/my-website/contents/<filepath> \
  -d '{"message":"...","content":"<base64>","sha":"<sha>","branch":"main"}'
```

## 体验要求

- Hero 板块背景视频必须和两行标语同时出现，不能让用户等待。
- 视频文件控制在 2 MB 以内（用 ffmpeg 压缩后再推）。
- 用户上传的视频（Qiniu 存储）建议压缩到 20 MB 以内，超大文件会导致播放等待时间过长。

## 技术栈

- 纯静态 HTML + Tailwind CDN + GSAP + Lenis
- 媒体存储：七牛云（Qiniu），域名 `tgxdilfkh.hd-bkt.clouddn.com`（仅支持 HTTP，HTTPS 未配置）
- 代理：Netlify `_redirects` 把 `/media/*` 代理到 Qiniu，用于覆盖 `Content-Disposition`
- 数据文件：`data/gallery.json`、`data/videos.json`、`data/journal.json`（通过 GitHub API 更新，不在本地维护）
- GitHub 仓库：`DTLA1215-Code/my-website`，连接 Netlify 自动部署
- 站点：`chenyao-daily.netlify.app`（Netlify site ID: `4fff35ee-bb55-4eed-a946-87814d6fad3b`）
