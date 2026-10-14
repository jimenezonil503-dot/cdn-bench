# CDN Bench

一个无依赖的中英双语 CDN 测评与选型平台，包含厂商目录、能力对比、技术博客和浏览器实测工具。前台使用纯 HTML、CSS 和原生 JavaScript，可静态部署；管理员工作台需要运行 Node.js 服务。测量结果不上传，不含分析追踪。

## 本地预览

需要 Node.js 20 或更新版本。在项目目录运行：

```sh
node tools/build-pages.mjs
node tools/serve.mjs
```

打开 http://127.0.0.1:4317 。预览服务器只监听本机，仅提供网站资源。保持服务器运行即可访问；不建议直接双击 HTML，因为浏览器会限制本地模块。

## 功能

- 简体中文 / English 使用独立地址切换，厂商详情页可以切换到同一厂商的另一语言版本。
- 63 个 CDN 与媒体交付品牌/平台，涵盖独立 CDN、云平台、安全加速和图片视频交付；包含 CDN07 与 StoneCDN。
- 每家厂商都有真实 Logo、中文与 English 独立详情页、独立 SEO 标题与描述；详情页正文为静态 HTML，搜索引擎无需执行 JavaScript 也能读取。
- 厂商关键词搜索、分类筛选、选型档案、官方来源链接；选择 2–3 家进行产品能力并排对比。
- 独立菜单页面：`/providers/`、`/blog/`、`/lab/`、`/methodology/`，并提供对应的 `/en/` 英文版本。首页只呈现品牌介绍和精选文章，不嵌入完整目录或实测工具。
- 4 篇完整双语博客：选型清单、CDN5 与 Cloudflare 解读、浏览器测评方法、缓存与 CORS 基础。支持搜索和 `/article/<slug>/` 独立分享链接。
- `/admin/` 管理员工作台：商家新增、编辑、删除；博客章节与双语内容编辑；私有草稿、保存与发布分离。没有公开注册入口。
- jsDelivr、UNPKG、cdnjs、BootCDN；同一 Three.js 0.160.0 测试文件，约 1.27 MB 解码内容。
- 自定义公开 HTTPS 测试文件（需 CORS），最多 8 个节点，每个文件限制 12 MiB。
- 每节点 1 / 3 / 5 次请求，8 / 15 / 30 秒超时；依次测试、停止操作、响应耗时图表。
- CSV 报告包含每次请求的原始结果、错误和取消记录，采用 UTF-8 BOM 和公式注入防护；可下载或从报告预览复制。部分内置浏览器拦截文件下载时可使用 Chrome / Edge。
- 窄屏适配、键盘操作和减少动态效果支持。

## 测量边界

厂商目录与能力表依据公开产品资料整理，不是独立性能排行榜。适用场景属于编辑解读；价格、套餐、SLA、防护容量须向厂商确认。默认公共资源 CDN 节点不代表目录中的商业厂商。对商业厂商做实测，需要在候选服务中部署同一公开 HTTPS 文件并允许 CORS，再添加自定义节点；厂商官网不是合格测速文件。

响应耗时是从调用 GET 到 fetch 返回响应头的浏览器观察值，不是 ICMP Ping，也不是独立 DNS、TCP 或 TLS 时间。

有效速率为解码后的文件字节数 / 完整请求耗时，单位 Mbps。它包含请求等待，并受压缩、小文件及缓存影响，不是网络连接带宽，也不是计费流量。只计算成功请求的中位数；失败、取消和未测数据不填造数值。

请求使用 `cache: no-store`、随机查询参数、`credentials: omit` 和 `referrerPolicy: no-referrer`。这减少浏览器缓存和凭据发送，但不能保证绕过 CDN 缓存。CDN 仍会收到用户 IP 等正常请求信息。跨域 / 网络错误由浏览器统一呈现，无法可靠细分。

自定义节点与测试结果只留在当前页面内存，刷新、跳转详情或切换语言后清除。语言由当前网址决定，不写入本地存储。勿输入令牌、私密链接或无权测试的文件。文件上限按可读取的响应头和流字节检查，浏览器缓冲可能有少量超出。

## 验证

```sh
node tools/build-pages.mjs
node --test tests/*.test.js
```

## SEO 与 GitHub Pages

构建会生成 `providers/<id>/index.html` 与 `en/providers/<id>/index.html` 共 126 个厂商详情页，以及中英文静态首页和 `robots.txt`。独立目录页包含所有详情页的普通链接，即使不执行 JavaScript 也可以读取目录与正文。每个详情页包含独立的 `<title>`、description、H1、Open Graph、Article JSON-LD、双语互链、官方来源和相关厂商内链，没有虚构评分或实测结果。

未设置生产网址时不会虚构 `canonical`、`hreflang` 绝对地址或 sitemap。部署时设置 `SITE_URL` 为实际站点根地址（GitHub 项目站点需包含项目路径），再构建即可生成中英文 canonical/hreflang、146 页 sitemap（初始内容；随发布内容变化） 与 robots 中的 sitemap 声明。未设置实际网址的再次构建会移除旧 sitemap。SEO 优化不承诺收录或搜索排名。

PowerShell 示例（必须替换为实际网址）：

```powershell
$env:SITE_URL = 'https://your-site.example/your-project'
node tools/build-pages.mjs
```

厂商官网链接使用官方 HTTPS 入口。AWS、Google Cloud、Bunny.net 等服务可能自行重定向到官方的非 www 域名；本站不能控制对方的跳转策略。Azure 使用 Microsoft 的 www 官网入口，跳转到 Azure 官网。Logo 是厂商或母品牌的官方标识，来源见 `assets/logos/README.md`。

GitHub Pages 使用 `.github/workflows/pages.yml` 自动部署。仓库 Settings → Pages 的 Source 选择 GitHub Actions；推送到 `main` 后先运行检查，再通过 `tools/export-pages.mjs` 生成 `_site` 并部署。`SITE_URL` 使用账号的 GitHub Pages 地址及仓库路径，自动生成 canonical、双语互链和 sitemap。

中英文桌面及手机页面均已移除“联系我们”入口、联系表单页面和文章纠错联系链接，不进行外站跳转。`/contact/` 与 `/en/contact/` 不再生成，也不出现在 sitemap 中。

Pages 部署包只包含公开页面、前端脚本和当前公开内容使用的图片，不包含后台界面、服务器代码、测试、未使用的广告素材或 `.admin/`。后台凭据、访客留言和私有草稿不得提交到 GitHub，`.gitignore` 已排除整个 `.admin/` 目录。公开仓库中的后台源码供后续服务器部署使用，GitHub Pages 不运行后台接口。

本地生成同一部署包（PowerShell）：

```powershell
$env:SITE_URL = 'https://jimenezonil503-dot.github.io/cdn-bench'
node tools/export-pages.mjs
```

## 内容维护

在 `content.js` 中维护 `PROVIDERS` 与 `ARTICLES`，在 `seo-content.js` 中维护各厂商独立的标题、描述、分析与选型问题。修改内容后重新运行构建。每条内容应包含中文和英文、资料日期以及官方来源，文章采用稳定的 `id` 作为分享链接。厂商数量自动从数据生成；不要填写未经实测的性能数字或评分。新增分类时同步更新筛选选项与双语词条。博客与每篇文章都有独立页面。后台保存草稿后，需要单独点击发布才能更新前台；设为私有草稿的文章不会进入公开页面和公开数据。暂不包含评论服务。

## 管理员工作台

首次创建管理员账号，在项目目录运行：

```sh
node tools/setup-admin.mjs
```

默认账号名为 `admin`，脚本会生成随机强密码，仅在创建时显示；没有通用默认密码。密码以加盐哈希保存在私有 `.admin/credentials.json` 中。账号创建后重新启动服务，打开 http://127.0.0.1:4317/admin/ 登录。现有凭据不会被安装脚本覆盖。不要公开上传 `.admin/` 或将它配置为静态资源目录。

- 商家资料和博客在后台保存后仍不会立即改变前台；点击“发布到前台”统一更新中英文首页、目录和详情页。
- “私有草稿”文章只保留在后台；只有“发布后公开”的文章进入公开页面。正文以纯文本渲染，不执行 HTML。
- 登录会话使用 HTTP-only、SameSite=Strict Cookie，并有跨站校验、CSRF 校验和错误登录限流；退出或服务重启会使相应会话失效。
- 中文必填；英文留空会沿用中文。并发编辑会提示版本冲突，不静默覆盖其他页面的保存。
- 定期备份私有内容文件。使用后台后，公开内容以发布的 `admin-overrides.js` 为准；不要同时直接改初始内容并期待覆盖已发布数据。

线上运行后台需要 Node.js 和可持久写入的目录；GitHub Pages 等纯静态托管只能部署前台，不能运行登录与发布接口。正式部署时须配置 HTTPS、`ADMIN_SECURE_COOKIE=true` 和可信 `ADMIN_ORIGIN`；反向代理应只转发允许的站点域名，并保护私有文件。可用 `ADMIN_USERNAME` / `ADMIN_PASSWORD` 环境变量在服务器端设置账号与新密码（至少 12 字符），更改后重启，不要把密码放进前端代码或公开文件。

## 首页设计维护

### 历史联系数据

前台“联系我们”功能已移除。现有后台“提交信息”继续用于查看历史留言，私有 `.admin/submissions.json` 与已保存设置保留；这些内容不进入 GitHub 或 Pages 部署包。公开 Pages 站点不提供登录、留言接收或内容发布接口。

### 全站广告管理

后台“广告管理”通过“中文广告 / 英文广告”切换分别配置顶部横幅、左侧悬浮和右侧悬浮三个广告位，覆盖对应语言的首页、栏目页、文章、厂商详情和联系页。两套广告的类型、素材、链接、图片说明、启停、高度和到期日期独立保存。中文路由只展示中文广告，`/en/` 路由只展示英文广告；未配置素材时使用该语言的合作占位，不跨语言套用素材。每个广告位支持合作占位、图片、HTML/JavaScript 代码三种形式。保存后点击“发布到前台”生效。旧版共享广告迁入中文配置，英文配置单独初始化。

图片支持 HTTPS 地址或上传 PNG、JPG、GIF、WebP（单张最大 5 MB），可配置 HTTPS 跳转链接与对应语言的替代文本。上传图片按内容哈希保存在 `assets/ads/`；通过本站 Node 服务访问时，只有被已发布且有效的广告使用的上传图片才会公开提供，其他草稿图片保持私有。备份时一并保留该目录和私有 `.admin/` 内容文件。

到期日期按 UTC+8 计算：选择某日即展示至该日结束，留空为长期展示。Node 服务每次请求会过滤到期广告，已打开页面也会自动移除到期素材。纯静态部署由浏览器时钟检查展示期限，需同时部署 `advertising.js` 和 `advertising.css`；纯静态托管不提供后台和私有图片访问控制。

顶部横幅保持与导航等宽，左右悬浮位宽 128 px，仅在视口至少 1600 px 时展示，留在正文两侧且支持关闭。窄屏不加载悬浮广告代码。代码广告与后台预览在独立沙箱框中执行，不开放主页面访问权；外部资源使用 HTTPS。需要主页面环境、第三方 Cookie 或特定域名校验的广告平台代码可能不兼容，应先用后台预览核对。

`tools/templates/site.html` 是公共页面框架；`tools/homepage.mjs` 生成双语首页；`homepage.css` 仅作用于首页。`tools/templates/sections.html` 保存各独立功能页模板。修改后重新构建，不要仅编辑生成的 `index.html`。地球和文章配图为 SVG 概念视觉，不展示实时节点或虚构性能统计。

## English

CDN Bench is a dependency-free bilingual CDN review and selection platform with 63 sourced provider-brand profiles, static bilingual SEO detail pages, two- or three-way capability comparison, four full-length articles, and a browser-local benchmark lab. Product information and editorial guidance are not independent performance rankings. Run `node tools/build-pages.mjs` and `node tools/serve.mjs`, then visit http://127.0.0.1:4317. Use the top-right language switch for English. Blog links use `/article/<slug>/`, with corresponding English URLs. The administrator-only `/admin/` workspace supports provider management and bilingual article editing, with private drafts and explicit publication. There is no public registration or comment service.

Measurements run in the browser directly against public CDN URLs. Response time is observed time to response headers, not ICMP Ping. Effective throughput uses decoded bytes over complete request duration, not wire bandwidth. Only successful requests contribute to medians. Network/CORS failures, timeouts, size limits and user cancellations remain explicit. Results are not uploaded; CDN operators still see normal request metadata, including the user's IP.

After preview approval, generate the static pages and publish the directory as a GitHub Pages project site. Set `SITE_URL` to the actual site root, including the repository path for project sites, to generate canonical/hreflang links and a 146-page sitemap for the initial content. Generated files need no runtime build or dependency installation. Search indexing or ranking is not guaranteed.

### 长文与正文引用（2026-10-14）

四篇中文正文按去除链接地址后的汉字统计均超过 3000 字，保留原文章网址并补充英文编辑版本。文章页输出正文链接、章节目录、相关文章、更新时间和 BlogPosting JSON-LD；设置真实 SITE_URL 后沿用 canonical/hreflang，并输出 BreadcrumbList，避免将本机地址当作生产地址。

后台正文支持 `[资料名称](https://官方资料地址)` 与 `[文章名称](article/文章标识/)`。站内链接按中英文路由和部署目录生成；不接受脚本链接或任意 HTML。正文的引用应与相应论述有关，更新文章时同步核对参考资料和最近实质更新日期。新正文仍由后台保存、发布流程管理。

运行 `node tools/build-pages.mjs` 和 `node --test tests/*.test.js` 可检查字数、指定链接、内部路径、结构化数据安全和后台发布流程。3000 字是本项目的内容要求，不作为搜索排名或生成式搜索引用的保证。

### 首页 CDN 榜单（2026-10-14）

首页收录 63 个服务品牌与平台，包括独立 CDN、云平台 CDN 和应用平台集成式交付产品。前五名按站点要求固定为 Cloudflare、YewSafe、Akamai、Fastly、CDN5；它是编辑排序，不能解释成速度、防护或可用性排名。后续条目按目录顺序显示。

榜单沿用厂商后台数据，默认显示 15 家，支持名称和场景搜索、产品方向筛选、展开全部。每家可进入双语独立详情页及官方资料。当前按页面预览需求展示耗时数值、速度条及颜色状态，页面不显示演示标注；数值为固定样例，不是测速结果。样例仅在榜单渲染层生成，不写入厂商事实、实测记录或结构化评分。所有条目均使用官方页面中的品牌标识或网站图标，保存在本地；精确来源与文件校验值见 assets/logos/sources.json。

产品方向来自官方资料，勾选表示目录已有该方向，未勾选不代表厂商不支持。Vercel、Netlify 和 Scaleway 的集成式产品在介绍中明确说明。核对日为 2026-10-14。生产构建的 sitemap 随目录动态生成；当前双语页面共 146 个。


### 扩展目录与官方图标（2026-10-14）

目录现有 63 个服务品牌与平台，新增 CDN07、StoneCDN、CDNetworks、七牛云、Azion、Tata Communications、OVHcloud、Qwilt 等。StoneCDN 属于 YewSafe，api.video 使用 OVHcloud 联合品牌，RocketCDN 使用 Bunny.net 网络；按服务品牌收录，不宣称 63 家独立网络运营主体。媒体平台的适用边界在各自简介中说明。

图标从官方网站导航、品牌资源或官方站点图标提取，未绘制替代字母 Logo。SVG 保留官方图形，ICO 只将最大尺寸帧解码为 PNG；白色标识配合深色背景。标识权利属于各品牌。目录搜索支持名称、关键词和完整域名；初始内容与管理员商家列表保持同源。
