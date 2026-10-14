import { articleOverrides, providerOverrides } from './admin-overrides.js';
import { NEW_ARTICLES } from './editorial/articles-2026.js';

const sourceDate = '2026-10-13';

const copy = (zh, en) => ({ zh, en });

const BASE_PROVIDERS = [
  {
    "id": "cloudflare",
    "name": "Cloudflare",
    "mark": "CF",
    "tone": "orange",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.cloudflare.com/products/cdn/",
    "logo": "assets/logos/cloudflare.svg",
    "sourceLabel": {
      "zh": "Cloudflare CDN 官方产品页",
      "en": "Cloudflare CDN official product page"
    },
    "tagline": {
      "zh": "反向代理、缓存与安全平台",
      "en": "Reverse proxy, caching, and security"
    },
    "intro": {
      "zh": "Cloudflare CDN 以 DNS 切换接入的反向代理模式为主，覆盖静态资产、匿名 API 响应与动态内容优化，并提供缓存规则、分层缓存和快速清缓存等控制。",
      "en": "Cloudflare CDN uses a reverse-proxy model configured through DNS, covering static assets, anonymous API responses, and dynamic-content optimization with cache rules, tiered caching, and purge controls."
    },
    "bestFor": {
      "zh": "网站、API、SaaS 与希望快速接入安全能力的团队",
      "en": "Websites, APIs, SaaS, and teams wanting fast security integration"
    },
    "highlights": [
      {
        "zh": "通过反向代理统一接入内容交付与安全能力",
        "en": "Unifies delivery and security through a reverse proxy"
      },
      {
        "zh": "支持静态加速、API 响应缓存与动态内容优化",
        "en": "Supports static acceleration, API response caching, and dynamic optimization"
      },
      {
        "zh": "缓存规则、分层缓存、Cache Reserve 等产品能力",
        "en": "Offers cache rules, tiered caching, and Cache Reserve capabilities"
      }
    ],
    "watchouts": {
      "zh": "实际缓存命中、回源与费用取决于规则、套餐、区域和源站响应头；不要用首页访问速度替代业务文件实测。",
      "en": "Cache hits, origin fetches, and cost depend on rules, plan, region, and origin headers; do not substitute a homepage visit for a workload test."
    },
    "compare": {
      "delivery": {
        "zh": "全球内容交付",
        "en": "Global content delivery"
      },
      "security": {
        "zh": "安全产品集成度高",
        "en": "Deep security integration"
      },
      "edge": {
        "zh": "规则与边缘能力丰富",
        "en": "Rich rules and edge controls"
      },
      "origin": {
        "zh": "反向代理接入",
        "en": "Reverse-proxy onboarding"
      },
      "fit": {
        "zh": "通用 Web / API",
        "en": "General web / API"
      }
    },
    "logoDark": false
  },
  {
    "id": "yewsafe",
    "name": "YewSafe",
    "mark": "YS",
    "tone": "purple",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.yewsafe.com/",
    "logo": "assets/logos/yewsafe.svg",
    "logoDark": true,
    "sourceLabel": {
      "zh": "YewSafe 官方产品资料",
      "en": "YewSafe official product information"
    },
    "tagline": {
      "zh": "企业 CDN、Anycast 与 DDoS 防护",
      "en": "Enterprise CDN, Anycast, and DDoS protection"
    },
    "intro": {
      "zh": "YewSafe 官网介绍 SCDN 静态内容交付、Anycast CDN、DDoS 缓解、应用防护与 Edge AI 产品，并面向游戏、金融、直播和 AI 场景提供方案。",
      "en": "YewSafe presents SCDN static delivery, Anycast CDN, DDoS mitigation, application protection, and Edge AI products, with solutions for gaming, finance, streaming, and AI workloads."
    },
    "bestFor": {
      "zh": "需要同时评估内容交付与业务防护的企业项目",
      "en": "Enterprise projects evaluating delivery and workload protection together"
    },
    "highlights": [
      {
        "zh": "SCDN、Anycast CDN 与 DDoS 缓解产品线",
        "en": "SCDN, Anycast CDN, and DDoS mitigation products"
      },
      {
        "zh": "提供应用防护与 Edge AI 相关产品介绍",
        "en": "Product information covers application protection and Edge AI"
      },
      {
        "zh": "官网设有技术文档、网络地图、博客与测速入口",
        "en": "Official resources include documentation, network maps, a blog, and speed tests"
      }
    ],
    "watchouts": {
      "zh": "节点规模、无限防护与客户数量等宣传属于厂商自述，本站未独立验证。应确认实际交付区域、限额、SLA、攻击流量计费和退出机制。",
      "en": "Network size, unlimited protection, and customer counts are vendor claims that we have not independently verified. Confirm served regions, limits, SLA, attack-traffic billing, and exit procedures."
    },
    "compare": {
      "delivery": {
        "zh": "静态交付 / Anycast 加速",
        "en": "Static delivery / Anycast acceleration"
      },
      "security": {
        "zh": "DDoS 缓解 / 应用防护",
        "en": "DDoS mitigation / app protection"
      },
      "edge": {
        "zh": "官网介绍 Edge AI 产品",
        "en": "Edge AI products described on official site"
      },
      "origin": {
        "zh": "接入与回源细节需按项目确认",
        "en": "Confirm onboarding and origin behavior per project"
      },
      "fit": {
        "zh": "企业加速与防护项目",
        "en": "Enterprise delivery and protection"
      }
    }
  },
  {
    "id": "akamai",
    "name": "Akamai",
    "mark": "AK",
    "tone": "blue",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.akamai.com/content-delivery-network",
    "logo": "assets/logos/akamai.svg",
    "sourceLabel": {
      "zh": "Akamai 官方内容交付资料",
      "en": "Akamai official content delivery information"
    },
    "tagline": {
      "zh": "企业级内容、应用与媒体交付",
      "en": "Enterprise content, app, and media delivery"
    },
    "intro": {
      "zh": "Akamai 面向大型企业的内容交付、应用性能和媒体分发场景，配置体系强调缓存规则、回源控制、流量治理与企业运营。",
      "en": "Akamai serves enterprise content delivery, application performance, and media distribution workloads with detailed controls for caching, origins, traffic governance, and operations."
    },
    "bestFor": {
      "zh": "大型网站、媒体平台、跨区域企业应用",
      "en": "Large sites, media platforms, and multi-region enterprise apps"
    },
    "highlights": [
      {
        "zh": "覆盖 Web、应用、下载与媒体内容交付",
        "en": "Covers web, application, download, and media delivery"
      },
      {
        "zh": "规则化配置适合复杂回源与缓存策略",
        "en": "Rule-based configuration suits complex cache and origin policies"
      },
      {
        "zh": "面向企业级迁移、治理与运营流程",
        "en": "Designed for enterprise migration, governance, and operations"
      }
    ],
    "watchouts": {
      "zh": "配置与采购复杂度通常高于面向开发者的自助型服务；评估时应把运营成本和合同条款纳入。",
      "en": "Configuration and procurement can be more involved than developer-first services; include operations and contract terms in evaluation."
    },
    "compare": {
      "delivery": {
        "zh": "企业级全球交付",
        "en": "Enterprise global delivery"
      },
      "security": {
        "zh": "可与安全产品组合",
        "en": "Composable security portfolio"
      },
      "edge": {
        "zh": "规则与应用治理",
        "en": "Rules and app governance"
      },
      "origin": {
        "zh": "复杂回源可细化",
        "en": "Fine-grained origin control"
      },
      "fit": {
        "zh": "大型企业 / 媒体",
        "en": "Enterprise / media"
      }
    },
    "logoDark": false
  },
  {
    "id": "fastly",
    "name": "Fastly",
    "mark": "F",
    "tone": "red",
    "categories": [
      "programmable",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.fastly.com/products/cdn",
    "logo": "assets/logos/fastly.svg",
    "sourceLabel": {
      "zh": "Fastly CDN 官方产品页",
      "en": "Fastly CDN official product page"
    },
    "tagline": {
      "zh": "可编程边缘与实时可观测",
      "en": "Programmable edge with real-time visibility"
    },
    "intro": {
      "zh": "Fastly 的官方 CDN 产品强调可编程控制、实时可观测、快速清缓存与内置安全，适合希望把发布、路由和内容策略放到边缘处理的工程团队。",
      "en": "Fastly emphasizes programmable control, real-time visibility, fast purging, and built-in security for engineering teams that want delivery, routing, and content policy at the edge."
    },
    "bestFor": {
      "zh": "动态站点、API、发布频繁的工程团队",
      "en": "Dynamic sites, APIs, and fast-moving engineering teams"
    },
    "highlights": [
      {
        "zh": "边缘逻辑与程序化控制",
        "en": "Edge logic and programmatic control"
      },
      {
        "zh": "实时日志、指标和可观测性",
        "en": "Real-time logs, metrics, and visibility"
      },
      {
        "zh": "缓存控制与快速清缓存工作流",
        "en": "Cache controls and fast purge workflows"
      }
    ],
    "watchouts": {
      "zh": "可编程能力带来更高的工程自由度，也需要更成熟的发布、缓存失效和回滚流程。",
      "en": "Programmability brings control but also requires mature release, cache invalidation, and rollback practices."
    },
    "compare": {
      "delivery": {
        "zh": "动态内容友好",
        "en": "Dynamic-content friendly"
      },
      "security": {
        "zh": "内置安全，可组合增强",
        "en": "Built-in, extensible security"
      },
      "edge": {
        "zh": "强可编程边缘",
        "en": "Strong programmable edge"
      },
      "origin": {
        "zh": "按策略编排",
        "en": "Policy-driven orchestration"
      },
      "fit": {
        "zh": "工程团队 / API",
        "en": "Engineering teams / APIs"
      }
    },
    "logoDark": false
  },
  {
    "id": "cdn5",
    "name": "CDN5",
    "mark": "C5",
    "tone": "green",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.cdn5.com/",
    "logo": "assets/logos/cdn5.png",
    "sourceLabel": {
      "zh": "CDN5 官方产品页",
      "en": "CDN5 official product page"
    },
    "tagline": {
      "zh": "高防加速与业务防护导向",
      "en": "Security-first acceleration"
    },
    "intro": {
      "zh": "CDN5 官网将高防 CDN、DDoS / CC 防护、WAF 与游戏 SDK 盾放在核心产品位置，适合把安全防护和内容加速一起评估的业务。",
      "en": "CDN5 positions high-defense CDN, DDoS / CC protection, WAF, and a game SDK shield as core products for teams evaluating security and delivery together."
    },
    "bestFor": {
      "zh": "游戏、媒体、API 与需要高防接入的项目",
      "en": "Games, media, APIs, and security-sensitive projects"
    },
    "highlights": [
      {
        "zh": "高防 CDN、Web 防火墙与高防 IP 产品线",
        "en": "High-defense CDN, WAF, and high-defense IP products"
      },
      {
        "zh": "官网套餐列出 DDoS、CC、WebSocket 与全球地区等能力项",
        "en": "Official plans list DDoS, CC, WebSocket, and global-region capability fields"
      },
      {
        "zh": "提供中文、English、日本語入口",
        "en": "Provides Chinese, English, and Japanese entry points"
      }
    ],
    "watchouts": {
      "zh": "官网产品页中的防护容量与套餐能力属于厂商自述；上线前应确认清洗策略、SLA、回源线路和合规范围。",
      "en": "Protection capacities and plan features are vendor claims; confirm mitigation design, SLA, origin routes, and compliance before launch."
    },
    "compare": {
      "delivery": {
        "zh": "高防加速",
        "en": "Defense-led delivery"
      },
      "security": {
        "zh": "DDoS / CC / WAF / 游戏防护",
        "en": "DDoS / CC / WAF / game protection"
      },
      "edge": {
        "zh": "以防护接入为主",
        "en": "Protection-led edge"
      },
      "origin": {
        "zh": "需按业务确认回源线路",
        "en": "Confirm origin routes per workload"
      },
      "fit": {
        "zh": "高防业务优先",
        "en": "Security-sensitive workloads"
      }
    },
    "logoDark": false
  },
  {
    "id": "cloudfront",
    "name": "Amazon CloudFront",
    "mark": "AWS",
    "tone": "purple",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-13",
    "officialUrl": "https://www.aws.amazon.com/cloudfront/",
    "logo": "assets/logos/cloudfront.svg",
    "sourceLabel": {
      "zh": "Amazon CloudFront 官方产品页",
      "en": "Amazon CloudFront official product page"
    },
    "tagline": {
      "zh": "AWS 原生的内容交付与边缘计算",
      "en": "AWS-native delivery and edge compute"
    },
    "intro": {
      "zh": "CloudFront 与 S3、ALB、Lambda@Edge 等 AWS 服务衔接紧密，官方产品页覆盖低延迟交付、压缩、边缘计算和安全控制。",
      "en": "CloudFront connects closely with S3, ALB, Lambda@Edge, and other AWS services, covering low-latency delivery, compression, edge compute, and security controls."
    },
    "bestFor": {
      "zh": "已经运行在 AWS 上的团队",
      "en": "Teams already operating on AWS"
    },
    "highlights": [
      {
        "zh": "与 AWS 源站、身份和观测体系集成",
        "en": "Integrates with AWS origins, identity, and observability"
      },
      {
        "zh": "支持边缘计算与内容压缩",
        "en": "Supports edge compute and content compression"
      },
      {
        "zh": "可与 AWS Shield、WAF 等安全能力组合",
        "en": "Works with AWS Shield, WAF, and related controls"
      }
    ],
    "watchouts": {
      "zh": "成本由请求、流量、区域、源站和附加服务共同决定；建议用真实账单模型估算，而不是只看单价。",
      "en": "Cost depends on requests, traffic, regions, origins, and add-ons; model a real bill instead of comparing headline unit prices."
    },
    "compare": {
      "delivery": {
        "zh": "全球低延迟交付",
        "en": "Global low-latency delivery"
      },
      "security": {
        "zh": "AWS 安全组合",
        "en": "AWS security portfolio"
      },
      "edge": {
        "zh": "Lambda@Edge / Functions",
        "en": "Lambda@Edge / Functions"
      },
      "origin": {
        "zh": "AWS 源站集成强",
        "en": "Strong AWS origin integration"
      },
      "fit": {
        "zh": "AWS 生态项目",
        "en": "AWS ecosystem workloads"
      }
    },
    "logoDark": false
  },
  {
    "id": "google-cloud-cdn",
    "name": "Google Cloud CDN",
    "mark": "G",
    "tone": "yellow",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-13",
    "officialUrl": "https://www.cloud.google.com/cdn",
    "logo": "assets/logos/google-cloud-cdn.png",
    "sourceLabel": {
      "zh": "Google Cloud CDN 官方产品页",
      "en": "Google Cloud CDN official product page"
    },
    "tagline": {
      "zh": "Google 全球边缘网络与精细缓存控制",
      "en": "Google edge network with fine-grained cache control"
    },
    "intro": {
      "zh": "Google Cloud CDN 依托 Google 全球边缘网络，支持来自任意 HTTP 源站的内容，并提供缓存键、TTL、Cloud Armor、日志与指标等控制。",
      "en": "Google Cloud CDN uses Google’s global edge network, supports any HTTP-capable origin, and provides controls for cache keys, TTLs, Cloud Armor, logs, and metrics."
    },
    "bestFor": {
      "zh": "Google Cloud、跨云或自有源站项目",
      "en": "Google Cloud, multi-cloud, or custom-origin workloads"
    },
    "highlights": [
      {
        "zh": "支持 Compute Engine、Cloud Storage、GKE 及外部 HTTP 源站",
        "en": "Supports Compute Engine, Cloud Storage, GKE, and external HTTP origins"
      },
      {
        "zh": "缓存键、TTL 与路由的细粒度控制",
        "en": "Fine-grained cache-key, TTL, and routing controls"
      },
      {
        "zh": "可与 Cloud Armor、Cloud Logging、Monitoring 结合",
        "en": "Integrates with Cloud Armor, Cloud Logging, and Monitoring"
      }
    ],
    "watchouts": {
      "zh": "Cloud CDN 需要结合负载均衡、源站和 Google Cloud 计费模型理解；Media CDN 是另一类媒体交付产品。",
      "en": "Cloud CDN must be evaluated with load balancing, origins, and Google Cloud billing; Media CDN is a separate media-delivery product."
    },
    "compare": {
      "delivery": {
        "zh": "Google 全球边缘",
        "en": "Google global edge"
      },
      "security": {
        "zh": "Cloud Armor 集成",
        "en": "Cloud Armor integration"
      },
      "edge": {
        "zh": "缓存与路由控制",
        "en": "Cache and routing controls"
      },
      "origin": {
        "zh": "HTTP 源站兼容",
        "en": "HTTP-origin compatible"
      },
      "fit": {
        "zh": "GCP / 跨云",
        "en": "GCP / multi-cloud"
      }
    },
    "logoDark": false
  },
  {
    "id": "azure-front-door",
    "name": "Azure Front Door",
    "mark": "AF",
    "tone": "cyan",
    "categories": [
      "cloud",
      "security",
      "delivery"
    ],
    "verified": "2026-10-13",
    "officialUrl": "https://www.microsoft.com/azure",
    "logo": "assets/logos/azure-front-door.svg",
    "sourceLabel": {
      "zh": "Microsoft Azure 官网入口",
      "en": "Microsoft Azure official entry point"
    },
    "tagline": {
      "zh": "Azure 原生的全球应用入口",
      "en": "Azure-native global application entry point"
    },
    "intro": {
      "zh": "Azure Front Door 将全球内容交付、动态与静态内容加速、WAF、机器人防护和 DDoS 防护放在同一套 Azure 边缘入口中。",
      "en": "Azure Front Door combines global delivery, dynamic and static acceleration, WAF, bot protection, and DDoS protection in an Azure edge entry point."
    },
    "bestFor": {
      "zh": "Azure 应用、混合源站与全球 API",
      "en": "Azure apps, hybrid origins, and global APIs"
    },
    "highlights": [
      {
        "zh": "支持云端或本地源站",
        "en": "Supports cloud or on-premises origins"
      },
      {
        "zh": "动态与静态内容统一加速",
        "en": "Unifies dynamic and static acceleration"
      },
      {
        "zh": "WAF、机器人防护、DDoS 与 Private Link 选项",
        "en": "Offers WAF, bot, DDoS, and Private Link options"
      }
    ],
    "watchouts": {
      "zh": "最终能力和价格取决于 Front Door SKU、区域与安全附加项；需要结合 Azure 架构一起评估。",
      "en": "Final capabilities and cost depend on the Front Door SKU, region, and security add-ons; evaluate it with the Azure architecture."
    },
    "compare": {
      "delivery": {
        "zh": "动态 / 静态一体",
        "en": "Unified dynamic / static"
      },
      "security": {
        "zh": "WAF / Bot / DDoS",
        "en": "WAF / bot / DDoS"
      },
      "edge": {
        "zh": "Azure 边缘入口",
        "en": "Azure edge entry point"
      },
      "origin": {
        "zh": "云端或本地源站",
        "en": "Cloud or on-prem origins"
      },
      "fit": {
        "zh": "Azure / 混合云",
        "en": "Azure / hybrid cloud"
      }
    },
    "logoDark": false
  },
  {
    "id": "alibaba-cloud-cdn",
    "name": "Alibaba Cloud CDN",
    "mark": "阿里",
    "tone": "orange",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-13",
    "officialUrl": "https://www.alibabacloud.com/product/cdn",
    "logo": "assets/logos/alibaba-cloud-cdn.svg",
    "sourceLabel": {
      "zh": "Alibaba Cloud CDN 官方产品页",
      "en": "Alibaba Cloud CDN official product page"
    },
    "tagline": {
      "zh": "面向中国与全球业务的云 CDN",
      "en": "Cloud CDN for China and global workloads"
    },
    "intro": {
      "zh": "Alibaba Cloud CDN 提供静态内容、下载与视频等内容加速，并与阿里云源站、日志、监控和安全产品形成云上组合。",
      "en": "Alibaba Cloud CDN offers acceleration for static content, downloads, video, and related workloads, with Alibaba Cloud origin, logging, monitoring, and security integrations."
    },
    "bestFor": {
      "zh": "中国内地、亚太与阿里云生态项目",
      "en": "Mainland China, APAC, and Alibaba Cloud workloads"
    },
    "highlights": [
      {
        "zh": "覆盖网站、下载、点播等常见内容加速场景",
        "en": "Covers web, download, on-demand, and common delivery scenarios"
      },
      {
        "zh": "支持分层缓存、回源与访问控制等策略",
        "en": "Supports tiered cache, origin, and access-control policies"
      },
      {
        "zh": "便于与阿里云存储、日志与安全产品组合",
        "en": "Pairs with Alibaba Cloud storage, logs, and security"
      }
    ],
    "watchouts": {
      "zh": "中国内地接入、备案、域名与合规要求可能影响可用方案；请以目标地区的官方文档和销售确认结果为准。",
      "en": "Mainland China onboarding, filing, domain, and compliance requirements can affect the design; confirm with regional documentation and sales."
    },
    "compare": {
      "delivery": {
        "zh": "中国与亚太友好",
        "en": "China and APAC friendly"
      },
      "security": {
        "zh": "云安全产品组合",
        "en": "Cloud security portfolio"
      },
      "edge": {
        "zh": "规则 / 分层缓存",
        "en": "Rules / tiered caching"
      },
      "origin": {
        "zh": "阿里云源站集成",
        "en": "Alibaba Cloud origin integration"
      },
      "fit": {
        "zh": "中国业务 / 阿里云",
        "en": "China workloads / Alibaba Cloud"
      }
    },
    "logoDark": false
  },
  {
    "id": "tencent-edgeone",
    "name": "Tencent Cloud EdgeOne",
    "mark": "EO",
    "tone": "red",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-13",
    "officialUrl": "https://www.tencentcloud.com/products/teo",
    "logo": "assets/logos/tencent-edgeone.svg",
    "sourceLabel": {
      "zh": "Tencent Cloud EdgeOne 官方产品页",
      "en": "Tencent Cloud EdgeOne official product page"
    },
    "tagline": {
      "zh": "全球 CDN、边缘安全与函数能力",
      "en": "Global CDN, edge security, and functions"
    },
    "intro": {
      "zh": "EdgeOne 官方定位是 CDN、安全与边缘服务的一体化产品，覆盖 DDoS、Web 应用、Bot 防护、访问控制与边缘函数等能力。",
      "en": "EdgeOne positions itself as an integrated CDN, security, and edge-services product covering DDoS, web applications, bots, access control, and edge functions."
    },
    "bestFor": {
      "zh": "游戏、SaaS、跨境站点与腾讯云生态",
      "en": "Games, SaaS, cross-border sites, and Tencent Cloud workloads"
    },
    "highlights": [
      {
        "zh": "DDoS、Web、Bot 与爬虫防护",
        "en": "DDoS, web, bot, and crawler protection"
      },
      {
        "zh": "可配置自定义访问控制与边缘函数",
        "en": "Custom access control and edge functions"
      },
      {
        "zh": "面向游戏和高并发业务提供专项方案",
        "en": "Provides dedicated patterns for games and high-concurrency workloads"
      }
    ],
    "watchouts": {
      "zh": "产品能力、线路和计费会随区域与套餐变化；跨境业务应单独验证访问质量和合规边界。",
      "en": "Capabilities, routes, and pricing vary by region and plan; validate access quality and compliance separately for cross-border traffic."
    },
    "compare": {
      "delivery": {
        "zh": "全球智能加速",
        "en": "Global smart acceleration"
      },
      "security": {
        "zh": "DDoS / Web / Bot",
        "en": "DDoS / web / bot"
      },
      "edge": {
        "zh": "边缘函数与规则",
        "en": "Edge functions and rules"
      },
      "origin": {
        "zh": "按区域组合",
        "en": "Regional composition"
      },
      "fit": {
        "zh": "游戏 / 跨境 / 腾讯云",
        "en": "Games / cross-border / Tencent Cloud"
      }
    },
    "logoDark": false
  },
  {
    "id": "bunny",
    "name": "Bunny.net",
    "mark": "B",
    "tone": "blue",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-13",
    "officialUrl": "https://www.bunny.net/cdn/",
    "logo": "assets/logos/bunny.svg",
    "sourceLabel": {
      "zh": "Bunny.net CDN 官方产品页",
      "en": "Bunny.net CDN official product page"
    },
    "tagline": {
      "zh": "面向开发者的轻量内容交付",
      "en": "Developer-friendly content delivery"
    },
    "intro": {
      "zh": "Bunny.net 以易用的 CDN、存储和视频产品组合面向开发者，适合希望快速上线静态资源、下载或媒体分发的项目。",
      "en": "Bunny.net combines CDN, storage, and video products for developers who want to ship static assets, downloads, or media delivery quickly."
    },
    "bestFor": {
      "zh": "独立开发者、静态站点与中小型媒体项目",
      "en": "Indie developers, static sites, and smaller media projects"
    },
    "highlights": [
      {
        "zh": "CDN、存储与视频能力可组合",
        "en": "Composable CDN, storage, and video products"
      },
      {
        "zh": "强调简洁控制台与开发者体验",
        "en": "Focuses on a simple console and developer experience"
      },
      {
        "zh": "适合从小规模资源分发起步",
        "en": "Suitable for starting with smaller-scale delivery"
      }
    ],
    "watchouts": {
      "zh": "不同地区的线路、功能和账单表现需要用目标用户与真实文件验证；不要只按宣传节点数量决策。",
      "en": "Validate routes, features, and billing for your target users and files; do not decide from advertised node counts alone."
    },
    "compare": {
      "delivery": {
        "zh": "轻量内容交付",
        "en": "Lightweight delivery"
      },
      "security": {
        "zh": "基础安全能力",
        "en": "Baseline security"
      },
      "edge": {
        "zh": "偏易用与配置",
        "en": "Ease-first controls"
      },
      "origin": {
        "zh": "CDN / 存储组合",
        "en": "CDN / storage pairing"
      },
      "fit": {
        "zh": "开发者 / 中小项目",
        "en": "Developers / smaller projects"
      }
    },
    "logoDark": false
  },
  {
    "id": "cdn77",
    "name": "CDN77",
    "mark": "77",
    "tone": "green",
    "categories": [
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.cdn77.com/",
    "logo": "assets/logos/cdn77.png",
    "sourceLabel": {
      "zh": "CDN77 官方产品资料",
      "en": "CDN77 official product information"
    },
    "tagline": {
      "zh": "视频与大规模内容交付",
      "en": "Video and large-scale content delivery"
    },
    "intro": {
      "zh": "CDN77 提供内容交付服务，官方产品资料重点介绍直播、点播及高流量媒体分发，也列出安全服务。适合把视频交付与技术支持一起评估的团队。",
      "en": "CDN77 provides content delivery with an emphasis on live video, on-demand media, and high-volume delivery, alongside security services."
    },
    "bestFor": {
      "zh": "视频平台、下载与大流量媒体",
      "en": "Video platforms, downloads, and high-volume media"
    },
    "highlights": [
      {
        "zh": "视频与大规模内容交付",
        "en": "Video and large-scale content delivery"
      },
      {
        "zh": "视频平台、下载与大流量媒体",
        "en": "Video platforms, downloads, and high-volume media"
      }
    ],
    "watchouts": {
      "zh": "确认视频协议、流量承诺、日志和技术支持的交付范围。",
      "en": "Confirm video protocols, traffic commitments, logs, and support scope."
    },
    "compare": {
      "delivery": {
        "zh": "视频与大规模内容交付",
        "en": "Video and large-scale content delivery"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "视频平台、下载与大流量媒体",
        "en": "Video platforms, downloads, and high-volume media"
      }
    },
    "seo": {
      "title": {
        "zh": "CDN77 CDN 介绍与选型：视频与大规模内容交付",
        "en": "CDN77 CDN profile: Video and large-scale content delivery"
      },
      "description": {
        "zh": "CDN77 提供内容交付服务，官方产品资料重点介绍直播、点播及高流量媒体分发，也列出安全服务。适合把视频交付与技术支持一起评估的团队。",
        "en": "CDN77 provides content delivery with an emphasis on live video, on-demand media, and high-volume delivery, alongside security services."
      },
      "analysis": {
        "zh": "CDN77 提供内容交付服务，官方产品资料重点介绍直播、点播及高流量媒体分发，也列出安全服务。适合把视频交付与技术支持一起评估的团队。确认视频协议、流量承诺、日志和技术支持的交付范围。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "CDN77 provides content delivery with an emphasis on live video, on-demand media, and high-volume delivery, alongside security services. Confirm video protocols, traffic commitments, logs, and support scope. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认视频协议、流量承诺、日志和技术支持的交付范围。",
          "en": "Confirm video protocols, traffic commitments, logs, and support scope."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "gcore",
    "name": "Gcore",
    "mark": "GC",
    "tone": "blue",
    "categories": [
      "delivery",
      "security",
      "programmable",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://gcore.com/cdn",
    "logo": "assets/logos/gcore.png",
    "sourceLabel": {
      "zh": "Gcore 官方产品资料",
      "en": "Gcore official product information"
    },
    "tagline": {
      "zh": "CDN、边缘开发与云服务组合",
      "en": "CDN, edge development, and cloud services"
    },
    "intro": {
      "zh": "Gcore 官网将 CDN、动态加速、流媒体及 FastEdge 放在边缘产品体系中，并提供安全和云服务。不同产品的套餐与交付范围需要分别确认。",
      "en": "Gcore offers CDN, dynamic acceleration, streaming, and FastEdge within its edge portfolio, alongside security and cloud services."
    },
    "bestFor": {
      "zh": "同时评估分发、边缘逻辑与云服务的项目",
      "en": "Projects evaluating delivery, edge logic, and cloud services"
    },
    "highlights": [
      {
        "zh": "CDN、边缘开发与云服务组合",
        "en": "CDN, edge development, and cloud services"
      },
      {
        "zh": "同时评估分发、边缘逻辑与云服务的项目",
        "en": "Projects evaluating delivery, edge logic, and cloud services"
      }
    ],
    "watchouts": {
      "zh": "分别核对 CDN、边缘运行时和安全产品的区域及费用。",
      "en": "Check regions and charges separately for CDN, edge runtime, and security products."
    },
    "compare": {
      "delivery": {
        "zh": "CDN、边缘开发与云服务组合",
        "en": "CDN, edge development, and cloud services"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "官网列示边缘开发或函数能力",
        "en": "Edge development or functions listed"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "同时评估分发、边缘逻辑与云服务的项目",
        "en": "Projects evaluating delivery, edge logic, and cloud services"
      }
    },
    "seo": {
      "title": {
        "zh": "Gcore CDN 介绍与选型：CDN、边缘开发与云服务组合",
        "en": "Gcore CDN profile: CDN, edge development, and cloud services"
      },
      "description": {
        "zh": "Gcore 官网将 CDN、动态加速、流媒体及 FastEdge 放在边缘产品体系中，并提供安全和云服务。不同产品的套餐与交付范围需要分别确认。",
        "en": "Gcore offers CDN, dynamic acceleration, streaming, and FastEdge within its edge portfolio, alongside security and cloud services."
      },
      "analysis": {
        "zh": "Gcore 官网将 CDN、动态加速、流媒体及 FastEdge 放在边缘产品体系中，并提供安全和云服务。不同产品的套餐与交付范围需要分别确认。分别核对 CDN、边缘运行时和安全产品的区域及费用。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Gcore offers CDN, dynamic acceleration, streaming, and FastEdge within its edge portfolio, alongside security and cloud services. Check regions and charges separately for CDN, edge runtime, and security products. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "分别核对 CDN、边缘运行时和安全产品的区域及费用。",
          "en": "Check regions and charges separately for CDN, edge runtime, and security products."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "cachefly",
    "name": "CacheFly",
    "mark": "CF",
    "tone": "purple",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.cachefly.com/",
    "logo": "assets/logos/cachefly.png",
    "sourceLabel": {
      "zh": "CacheFly 官方产品资料",
      "en": "CacheFly official product information"
    },
    "tagline": {
      "zh": "媒体、游戏与专用 CDN 交付",
      "en": "Media, games, and dedicated CDN delivery"
    },
    "intro": {
      "zh": "CacheFly 官方定位侧重直播、游戏发布和媒体分发，并列出源站屏蔽、日志流和专用 CDN 等服务。适合对交付控制和技术协作有明确需求的项目。",
      "en": "CacheFly emphasizes streaming, game launches, and media delivery, with origin shielding, log streaming, and private CDN services."
    },
    "bestFor": {
      "zh": "媒体平台、游戏发行与专用分发",
      "en": "Media platforms, game distribution, and dedicated delivery"
    },
    "highlights": [
      {
        "zh": "媒体、游戏与专用 CDN 交付",
        "en": "Media, games, and dedicated CDN delivery"
      },
      {
        "zh": "媒体平台、游戏发行与专用分发",
        "en": "Media platforms, game distribution, and dedicated delivery"
      }
    ],
    "watchouts": {
      "zh": "按项目确认共享与专用服务、峰值交付及回源保护。",
      "en": "Confirm shared versus dedicated service, peak delivery, and origin shielding."
    },
    "compare": {
      "delivery": {
        "zh": "媒体、游戏与专用 CDN 交付",
        "en": "Media, games, and dedicated CDN delivery"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "媒体平台、游戏发行与专用分发",
        "en": "Media platforms, game distribution, and dedicated delivery"
      }
    },
    "seo": {
      "title": {
        "zh": "CacheFly CDN 介绍与选型：媒体、游戏与专用 CDN 交付",
        "en": "CacheFly CDN profile: Media, games, and dedicated CDN delivery"
      },
      "description": {
        "zh": "CacheFly 官方定位侧重直播、游戏发布和媒体分发，并列出源站屏蔽、日志流和专用 CDN 等服务。适合对交付控制和技术协作有明确需求的项目。",
        "en": "CacheFly emphasizes streaming, game launches, and media delivery, with origin shielding, log streaming, and private CDN services."
      },
      "analysis": {
        "zh": "CacheFly 官方定位侧重直播、游戏发布和媒体分发，并列出源站屏蔽、日志流和专用 CDN 等服务。适合对交付控制和技术协作有明确需求的项目。按项目确认共享与专用服务、峰值交付及回源保护。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "CacheFly emphasizes streaming, game launches, and media delivery, with origin shielding, log streaming, and private CDN services. Confirm shared versus dedicated service, peak delivery, and origin shielding. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "按项目确认共享与专用服务、峰值交付及回源保护。",
          "en": "Confirm shared versus dedicated service, peak delivery, and origin shielding."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "imperva",
    "name": "Imperva Secure CDN",
    "mark": "IM",
    "tone": "cyan",
    "categories": [
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.imperva.com/products/content-delivery-network-cdn/",
    "logo": "assets/logos/imperva.png",
    "sourceLabel": {
      "zh": "Imperva Secure CDN 官方产品资料",
      "en": "Imperva Secure CDN official product information"
    },
    "tagline": {
      "zh": "与应用防护结合的安全 CDN",
      "en": "Secure CDN integrated with application protection"
    },
    "intro": {
      "zh": "Imperva 的 Secure CDN 官方资料将缓存、负载均衡和内容交付与 Web 应用及 API 防护结合。评估应同时覆盖访问性能、规则兼容与合法请求的处理。",
      "en": "Imperva Secure CDN combines caching and load balancing with web application and API protection. Evaluate delivery and legitimate-request handling together."
    },
    "bestFor": {
      "zh": "需要统一评估应用安全和网站交付的企业",
      "en": "Enterprises evaluating application security and web delivery together"
    },
    "highlights": [
      {
        "zh": "与应用防护结合的安全 CDN",
        "en": "Secure CDN integrated with application protection"
      },
      {
        "zh": "需要统一评估应用安全和网站交付的企业",
        "en": "Enterprises evaluating application security and web delivery together"
      }
    ],
    "watchouts": {
      "zh": "确认 WAAP 功能、误拦截处理和日志是否在所选服务内。",
      "en": "Confirm included WAAP features, false-positive handling, and logs."
    },
    "compare": {
      "delivery": {
        "zh": "与应用防护结合的安全 CDN",
        "en": "Secure CDN integrated with application protection"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "需要统一评估应用安全和网站交付的企业",
        "en": "Enterprises evaluating application security and web delivery together"
      }
    },
    "seo": {
      "title": {
        "zh": "Imperva Secure CDN CDN 介绍与选型：与应用防护结合的安全 CDN",
        "en": "Imperva Secure CDN CDN profile: Secure CDN integrated with application protection"
      },
      "description": {
        "zh": "Imperva 的 Secure CDN 官方资料将缓存、负载均衡和内容交付与 Web 应用及 API 防护结合。评估应同时覆盖访问性能、规则兼容与合法请求的处理。",
        "en": "Imperva Secure CDN combines caching and load balancing with web application and API protection. Evaluate delivery and legitimate-request handling together."
      },
      "analysis": {
        "zh": "Imperva 的 Secure CDN 官方资料将缓存、负载均衡和内容交付与 Web 应用及 API 防护结合。评估应同时覆盖访问性能、规则兼容与合法请求的处理。确认 WAAP 功能、误拦截处理和日志是否在所选服务内。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Imperva Secure CDN combines caching and load balancing with web application and API protection. Evaluate delivery and legitimate-request handling together. Confirm included WAAP features, false-positive handling, and logs. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认 WAAP 功能、误拦截处理和日志是否在所选服务内。",
          "en": "Confirm included WAAP features, false-positive handling, and logs."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "edgenext",
    "name": "EdgeNext",
    "mark": "EN",
    "tone": "orange",
    "categories": [
      "delivery",
      "security",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.edgenext.com/",
    "logo": "assets/logos/edgenext.png",
    "sourceLabel": {
      "zh": "EdgeNext 官方产品资料",
      "en": "EdgeNext official product information"
    },
    "tagline": {
      "zh": "全球内容交付与边缘基础设施",
      "en": "Global delivery and edge infrastructure"
    },
    "intro": {
      "zh": "EdgeNext 官网介绍全球 CDN、动态与静态加速、直播以及云安全和计算服务。可按业务区域与源站架构分别验证这些产品的组合方式。",
      "en": "EdgeNext describes global CDN, static and dynamic acceleration, live streaming, cloud security, and compute services."
    },
    "bestFor": {
      "zh": "跨地区网站、媒体及边缘基础设施项目",
      "en": "Cross-region web, media, and edge infrastructure projects"
    },
    "highlights": [
      {
        "zh": "全球内容交付与边缘基础设施",
        "en": "Global delivery and edge infrastructure"
      },
      {
        "zh": "跨地区网站、媒体及边缘基础设施项目",
        "en": "Cross-region web, media, and edge infrastructure projects"
      }
    ],
    "watchouts": {
      "zh": "确认所需区域、动态回源路径和产品之间的计费边界。",
      "en": "Confirm required regions, dynamic origin paths, and product billing boundaries."
    },
    "compare": {
      "delivery": {
        "zh": "全球内容交付与边缘基础设施",
        "en": "Global delivery and edge infrastructure"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "跨地区网站、媒体及边缘基础设施项目",
        "en": "Cross-region web, media, and edge infrastructure projects"
      }
    },
    "seo": {
      "title": {
        "zh": "EdgeNext CDN 介绍与选型：全球内容交付与边缘基础设施",
        "en": "EdgeNext CDN profile: Global delivery and edge infrastructure"
      },
      "description": {
        "zh": "EdgeNext 官网介绍全球 CDN、动态与静态加速、直播以及云安全和计算服务。可按业务区域与源站架构分别验证这些产品的组合方式。",
        "en": "EdgeNext describes global CDN, static and dynamic acceleration, live streaming, cloud security, and compute services."
      },
      "analysis": {
        "zh": "EdgeNext 官网介绍全球 CDN、动态与静态加速、直播以及云安全和计算服务。可按业务区域与源站架构分别验证这些产品的组合方式。确认所需区域、动态回源路径和产品之间的计费边界。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "EdgeNext describes global CDN, static and dynamic acceleration, live streaming, cloud security, and compute services. Confirm required regions, dynamic origin paths, and product billing boundaries. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认所需区域、动态回源路径和产品之间的计费边界。",
          "en": "Confirm required regions, dynamic origin paths, and product billing boundaries."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "keycdn",
    "name": "KeyCDN",
    "mark": "KC",
    "tone": "green",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.keycdn.com/",
    "logo": "assets/logos/keycdn.svg",
    "sourceLabel": {
      "zh": "KeyCDN 官方产品资料",
      "en": "KeyCDN official product information"
    },
    "tagline": {
      "zh": "静态资源与图片交付",
      "en": "Static assets and image delivery"
    },
    "intro": {
      "zh": "KeyCDN 官方资料介绍 CDN Zone 管理、缓存刷新、图片处理和 API。适合从静态资源交付出发、希望通过控制台或接口管理缓存的开发团队。",
      "en": "KeyCDN documents CDN zones, cache purges, image processing, and API management for developer-led content delivery."
    },
    "bestFor": {
      "zh": "静态网站、图片资源与开发者项目",
      "en": "Static sites, image assets, and developer projects"
    },
    "highlights": [
      {
        "zh": "静态资源与图片交付",
        "en": "Static assets and image delivery"
      },
      {
        "zh": "静态网站、图片资源与开发者项目",
        "en": "Static sites, image assets, and developer projects"
      }
    ],
    "watchouts": {
      "zh": "确认图片处理、地区流量和日志的费用及可用范围。",
      "en": "Confirm image-processing, regional transfer, and logging costs and availability."
    },
    "compare": {
      "delivery": {
        "zh": "静态资源与图片交付",
        "en": "Static assets and image delivery"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "静态网站、图片资源与开发者项目",
        "en": "Static sites, image assets, and developer projects"
      }
    },
    "seo": {
      "title": {
        "zh": "KeyCDN CDN 介绍与选型：静态资源与图片交付",
        "en": "KeyCDN CDN profile: Static assets and image delivery"
      },
      "description": {
        "zh": "KeyCDN 官方资料介绍 CDN Zone 管理、缓存刷新、图片处理和 API。适合从静态资源交付出发、希望通过控制台或接口管理缓存的开发团队。",
        "en": "KeyCDN documents CDN zones, cache purges, image processing, and API management for developer-led content delivery."
      },
      "analysis": {
        "zh": "KeyCDN 官方资料介绍 CDN Zone 管理、缓存刷新、图片处理和 API。适合从静态资源交付出发、希望通过控制台或接口管理缓存的开发团队。确认图片处理、地区流量和日志的费用及可用范围。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "KeyCDN documents CDN zones, cache purges, image processing, and API management for developer-led content delivery. Confirm image-processing, regional transfer, and logging costs and availability. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认图片处理、地区流量和日志的费用及可用范围。",
          "en": "Confirm image-processing, regional transfer, and logging costs and availability."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "huawei-cloud",
    "name": "Huawei Cloud CDN",
    "mark": "HW",
    "tone": "blue",
    "categories": [
      "delivery",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.huaweicloud.com/intl/en-us/product/cdn.html",
    "logo": "assets/logos/huawei-cloud.png",
    "sourceLabel": {
      "zh": "Huawei Cloud CDN 官方产品资料",
      "en": "Huawei Cloud CDN official product information"
    },
    "tagline": {
      "zh": "网站、下载与音视频加速",
      "en": "Website, download, and media acceleration"
    },
    "intro": {
      "zh": "华为云 CDN 产品页列出网站、文件下载、点播和全站加速场景，并介绍缓存与回源相关控制。区域条件和云产品组合应按具体业务确认。",
      "en": "Huawei Cloud CDN describes website, file-download, on-demand, and whole-site acceleration with caching and origin controls."
    },
    "bestFor": {
      "zh": "华为云源站、文件下载与区域内容交付",
      "en": "Huawei Cloud origins, downloads, and regional delivery"
    },
    "highlights": [
      {
        "zh": "网站、下载与音视频加速",
        "en": "Website, download, and media acceleration"
      },
      {
        "zh": "华为云源站、文件下载与区域内容交付",
        "en": "Huawei Cloud origins, downloads, and regional delivery"
      }
    ],
    "watchouts": {
      "zh": "确认加速区域、域名要求、缓存更新和回源费用。",
      "en": "Confirm acceleration regions, domain requirements, cache updates, and origin costs."
    },
    "compare": {
      "delivery": {
        "zh": "网站、下载与音视频加速",
        "en": "Website, download, and media acceleration"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "华为云源站、文件下载与区域内容交付",
        "en": "Huawei Cloud origins, downloads, and regional delivery"
      }
    },
    "seo": {
      "title": {
        "zh": "Huawei Cloud CDN CDN 介绍与选型：网站、下载与音视频加速",
        "en": "Huawei Cloud CDN CDN profile: Website, download, and media acceleration"
      },
      "description": {
        "zh": "华为云 CDN 产品页列出网站、文件下载、点播和全站加速场景，并介绍缓存与回源相关控制。区域条件和云产品组合应按具体业务确认。",
        "en": "Huawei Cloud CDN describes website, file-download, on-demand, and whole-site acceleration with caching and origin controls."
      },
      "analysis": {
        "zh": "华为云 CDN 产品页列出网站、文件下载、点播和全站加速场景，并介绍缓存与回源相关控制。区域条件和云产品组合应按具体业务确认。确认加速区域、域名要求、缓存更新和回源费用。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Huawei Cloud CDN describes website, file-download, on-demand, and whole-site acceleration with caching and origin controls. Confirm acceleration regions, domain requirements, cache updates, and origin costs. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认加速区域、域名要求、缓存更新和回源费用。",
          "en": "Confirm acceleration regions, domain requirements, cache updates, and origin costs."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "byteplus",
    "name": "BytePlus CDN",
    "mark": "BP",
    "tone": "purple",
    "categories": [
      "delivery",
      "security",
      "programmable",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.byteplus.com/en/product/cdn",
    "logo": "assets/logos/byteplus.png",
    "sourceLabel": {
      "zh": "BytePlus CDN 官方产品资料",
      "en": "BytePlus CDN official product information"
    },
    "tagline": {
      "zh": "全球分发、动态加速与边缘能力",
      "en": "Global delivery, dynamic acceleration, and edge capabilities"
    },
    "intro": {
      "zh": "BytePlus CDN 官方页面介绍分布式内容缓存、动态加速、安全能力和边缘函数。实际使用时应区分基础分发与额外产品，并验证目标市场体验。",
      "en": "BytePlus CDN presents distributed caching, dynamic acceleration, security, and edge functions. Validate the actual products and target markets required."
    },
    "bestFor": {
      "zh": "全球应用、媒体及动态内容交付",
      "en": "Global applications, media, and dynamic delivery"
    },
    "highlights": [
      {
        "zh": "全球分发、动态加速与边缘能力",
        "en": "Global delivery, dynamic acceleration, and edge capabilities"
      },
      {
        "zh": "全球应用、媒体及动态内容交付",
        "en": "Global applications, media, and dynamic delivery"
      }
    ],
    "watchouts": {
      "zh": "按服务区域核对边缘函数、安全服务与日志权限。",
      "en": "Verify edge functions, security services, and logging access by region."
    },
    "compare": {
      "delivery": {
        "zh": "全球分发、动态加速与边缘能力",
        "en": "Global delivery, dynamic acceleration, and edge capabilities"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "官网列示边缘开发或函数能力",
        "en": "Edge development or functions listed"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "全球应用、媒体及动态内容交付",
        "en": "Global applications, media, and dynamic delivery"
      }
    },
    "seo": {
      "title": {
        "zh": "BytePlus CDN CDN 介绍与选型：全球分发、动态加速与边缘能力",
        "en": "BytePlus CDN CDN profile: Global delivery, dynamic acceleration, and edge capabilities"
      },
      "description": {
        "zh": "BytePlus CDN 官方页面介绍分布式内容缓存、动态加速、安全能力和边缘函数。实际使用时应区分基础分发与额外产品，并验证目标市场体验。",
        "en": "BytePlus CDN presents distributed caching, dynamic acceleration, security, and edge functions. Validate the actual products and target markets required."
      },
      "analysis": {
        "zh": "BytePlus CDN 官方页面介绍分布式内容缓存、动态加速、安全能力和边缘函数。实际使用时应区分基础分发与额外产品，并验证目标市场体验。按服务区域核对边缘函数、安全服务与日志权限。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "BytePlus CDN presents distributed caching, dynamic acceleration, security, and edge functions. Validate the actual products and target markets required. Verify edge functions, security services, and logging access by region. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "按服务区域核对边缘函数、安全服务与日志权限。",
          "en": "Verify edge functions, security services, and logging access by region."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "baidu-cloud",
    "name": "Baidu AI Cloud CDN",
    "mark": "BD",
    "tone": "cyan",
    "categories": [
      "delivery",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://cloud.baidu.com/product/cdn.html",
    "logo": "assets/logos/baidu-cloud.png",
    "sourceLabel": {
      "zh": "Baidu AI Cloud CDN 官方产品资料",
      "en": "Baidu AI Cloud CDN official product information"
    },
    "tagline": {
      "zh": "缓存、预热与云上内容分发",
      "en": "Caching, prefetching, and cloud content delivery"
    },
    "intro": {
      "zh": "百度智能云 CDN 官方页面介绍资源缓存、刷新预热、访问控制和统计分析，也列出主备源站与回源配置。适合需要与云上源站一同评估的交付项目。",
      "en": "Baidu AI Cloud CDN describes cache management, purge and prefetch, access controls, analytics, and primary/backup origin configuration."
    },
    "bestFor": {
      "zh": "中文网站、下载与百度云生态",
      "en": "Chinese-language sites, downloads, and Baidu Cloud workloads"
    },
    "highlights": [
      {
        "zh": "缓存、预热与云上内容分发",
        "en": "Caching, prefetching, and cloud content delivery"
      },
      {
        "zh": "中文网站、下载与百度云生态",
        "en": "Chinese-language sites, downloads, and Baidu Cloud workloads"
      }
    ],
    "watchouts": {
      "zh": "确认地区适用条件、资源包范围和源站切换行为。",
      "en": "Confirm regional eligibility, package coverage, and origin failover behavior."
    },
    "compare": {
      "delivery": {
        "zh": "缓存、预热与云上内容分发",
        "en": "Caching, prefetching, and cloud content delivery"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "中文网站、下载与百度云生态",
        "en": "Chinese-language sites, downloads, and Baidu Cloud workloads"
      }
    },
    "seo": {
      "title": {
        "zh": "Baidu AI Cloud CDN CDN 介绍与选型：缓存、预热与云上内容分发",
        "en": "Baidu AI Cloud CDN CDN profile: Caching, prefetching, and cloud content delivery"
      },
      "description": {
        "zh": "百度智能云 CDN 官方页面介绍资源缓存、刷新预热、访问控制和统计分析，也列出主备源站与回源配置。适合需要与云上源站一同评估的交付项目。",
        "en": "Baidu AI Cloud CDN describes cache management, purge and prefetch, access controls, analytics, and primary/backup origin configuration."
      },
      "analysis": {
        "zh": "百度智能云 CDN 官方页面介绍资源缓存、刷新预热、访问控制和统计分析，也列出主备源站与回源配置。适合需要与云上源站一同评估的交付项目。确认地区适用条件、资源包范围和源站切换行为。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Baidu AI Cloud CDN describes cache management, purge and prefetch, access controls, analytics, and primary/backup origin configuration. Confirm regional eligibility, package coverage, and origin failover behavior. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认地区适用条件、资源包范围和源站切换行为。",
          "en": "Confirm regional eligibility, package coverage, and origin failover behavior."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "upyun",
    "name": "UPYUN 又拍云",
    "mark": "UP",
    "tone": "orange",
    "categories": [
      "delivery",
      "security",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.upyun.com/products/cdn",
    "logo": "assets/logos/upyun.png",
    "sourceLabel": {
      "zh": "UPYUN 又拍云 官方产品资料",
      "en": "UPYUN 又拍云 official product information"
    },
    "tagline": {
      "zh": "云分发、图片处理与访问防护",
      "en": "Cloud delivery, image processing, and access protection"
    },
    "intro": {
      "zh": "又拍云 CDN 官方资料覆盖网站、点播、下载和移动应用，并介绍缓存管理、图片处理、访问控制与安全服务。海外加速需按对应服务配置确认。",
      "en": "UPYUN documents website, video, download, and mobile delivery with cache management, image processing, and security services."
    },
    "bestFor": {
      "zh": "图片密集型网站与中文内容项目",
      "en": "Image-heavy sites and Chinese-language content"
    },
    "highlights": [
      {
        "zh": "云分发、图片处理与访问防护",
        "en": "Cloud delivery, image processing, and access protection"
      },
      {
        "zh": "图片密集型网站与中文内容项目",
        "en": "Image-heavy sites and Chinese-language content"
      }
    ],
    "watchouts": {
      "zh": "分别核对海外加速、图片处理与安全服务的套餐边界。",
      "en": "Check plan boundaries for overseas delivery, image processing, and security."
    },
    "compare": {
      "delivery": {
        "zh": "云分发、图片处理与访问防护",
        "en": "Cloud delivery, image processing, and access protection"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "图片密集型网站与中文内容项目",
        "en": "Image-heavy sites and Chinese-language content"
      }
    },
    "seo": {
      "title": {
        "zh": "UPYUN 又拍云 CDN 介绍与选型：云分发、图片处理与访问防护",
        "en": "UPYUN 又拍云 CDN profile: Cloud delivery, image processing, and access protection"
      },
      "description": {
        "zh": "又拍云 CDN 官方资料覆盖网站、点播、下载和移动应用，并介绍缓存管理、图片处理、访问控制与安全服务。海外加速需按对应服务配置确认。",
        "en": "UPYUN documents website, video, download, and mobile delivery with cache management, image processing, and security services."
      },
      "analysis": {
        "zh": "又拍云 CDN 官方资料覆盖网站、点播、下载和移动应用，并介绍缓存管理、图片处理、访问控制与安全服务。海外加速需按对应服务配置确认。分别核对海外加速、图片处理与安全服务的套餐边界。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "UPYUN documents website, video, download, and mobile delivery with cache management, image processing, and security services. Check plan boundaries for overseas delivery, image processing, and security. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "分别核对海外加速、图片处理与安全服务的套餐边界。",
          "en": "Check plan boundaries for overseas delivery, image processing, and security."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "kingsoft-cloud",
    "name": "Kingsoft Cloud CDN",
    "mark": "KS",
    "tone": "green",
    "categories": [
      "delivery",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.ksyun.com/nv/product/CDN.html",
    "logo": "assets/logos/kingsoft-cloud.png",
    "sourceLabel": {
      "zh": "Kingsoft Cloud CDN 官方产品资料",
      "en": "Kingsoft Cloud CDN official product information"
    },
    "tagline": {
      "zh": "静态文件、下载与直播分发",
      "en": "Static files, downloads, and live distribution"
    },
    "intro": {
      "zh": "金山云 CDN 页面分别介绍静态加速和直播加速，列出内容管理、日志、统计与调度能力。视频、下载和图片业务应依据对应产品单独验证。",
      "en": "Kingsoft Cloud describes static and live CDN delivery with content management, logs, analytics, and scheduling capabilities."
    },
    "bestFor": {
      "zh": "音视频、游戏下载与云上内容分发",
      "en": "Media, game downloads, and cloud content distribution"
    },
    "highlights": [
      {
        "zh": "静态文件、下载与直播分发",
        "en": "Static files, downloads, and live distribution"
      },
      {
        "zh": "音视频、游戏下载与云上内容分发",
        "en": "Media, game downloads, and cloud content distribution"
      }
    ],
    "watchouts": {
      "zh": "确认直播与静态服务的协议、费用和日志差异。",
      "en": "Confirm protocol, billing, and logging differences between live and static services."
    },
    "compare": {
      "delivery": {
        "zh": "静态文件、下载与直播分发",
        "en": "Static files, downloads, and live distribution"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "音视频、游戏下载与云上内容分发",
        "en": "Media, game downloads, and cloud content distribution"
      }
    },
    "seo": {
      "title": {
        "zh": "Kingsoft Cloud CDN CDN 介绍与选型：静态文件、下载与直播分发",
        "en": "Kingsoft Cloud CDN CDN profile: Static files, downloads, and live distribution"
      },
      "description": {
        "zh": "金山云 CDN 页面分别介绍静态加速和直播加速，列出内容管理、日志、统计与调度能力。视频、下载和图片业务应依据对应产品单独验证。",
        "en": "Kingsoft Cloud describes static and live CDN delivery with content management, logs, analytics, and scheduling capabilities."
      },
      "analysis": {
        "zh": "金山云 CDN 页面分别介绍静态加速和直播加速，列出内容管理、日志、统计与调度能力。视频、下载和图片业务应依据对应产品单独验证。确认直播与静态服务的协议、费用和日志差异。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Kingsoft Cloud describes static and live CDN delivery with content management, logs, analytics, and scheduling capabilities. Confirm protocol, billing, and logging differences between live and static services. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认直播与静态服务的协议、费用和日志差异。",
          "en": "Confirm protocol, billing, and logging differences between live and static services."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "medianova",
    "name": "Medianova",
    "mark": "MN",
    "tone": "blue",
    "categories": [
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.medianova.com/",
    "logo": "assets/logos/medianova.svg",
    "sourceLabel": {
      "zh": "Medianova 官方产品资料",
      "en": "Medianova official product information"
    },
    "tagline": {
      "zh": "内容分发、流媒体与网站安全",
      "en": "Content delivery, streaming, and web security"
    },
    "intro": {
      "zh": "Medianova 官方资料介绍静态、动态及大文件交付，强调欧洲、中东和非洲方向的网络，并提供媒体和应用安全服务。覆盖与性能需要按真实用户位置验证。",
      "en": "Medianova describes static, dynamic, and large-file delivery with an EMEA-oriented network, media services, and application security."
    },
    "bestFor": {
      "zh": "欧洲、中东和非洲方向的网站与媒体",
      "en": "Web and media workloads serving EMEA audiences"
    },
    "highlights": [
      {
        "zh": "内容分发、流媒体与网站安全",
        "en": "Content delivery, streaming, and web security"
      },
      {
        "zh": "欧洲、中东和非洲方向的网站与媒体",
        "en": "Web and media workloads serving EMEA audiences"
      }
    ],
    "watchouts": {
      "zh": "核对目标运营商、动态加速、日志与安全服务的适用范围。",
      "en": "Validate target networks, dynamic acceleration, logs, and security scope."
    },
    "compare": {
      "delivery": {
        "zh": "内容分发、流媒体与网站安全",
        "en": "Content delivery, streaming, and web security"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "欧洲、中东和非洲方向的网站与媒体",
        "en": "Web and media workloads serving EMEA audiences"
      }
    },
    "seo": {
      "title": {
        "zh": "Medianova CDN 介绍与选型：内容分发、流媒体与网站安全",
        "en": "Medianova CDN profile: Content delivery, streaming, and web security"
      },
      "description": {
        "zh": "Medianova 官方资料介绍静态、动态及大文件交付，强调欧洲、中东和非洲方向的网络，并提供媒体和应用安全服务。覆盖与性能需要按真实用户位置验证。",
        "en": "Medianova describes static, dynamic, and large-file delivery with an EMEA-oriented network, media services, and application security."
      },
      "analysis": {
        "zh": "Medianova 官方资料介绍静态、动态及大文件交付，强调欧洲、中东和非洲方向的网络，并提供媒体和应用安全服务。覆盖与性能需要按真实用户位置验证。核对目标运营商、动态加速、日志与安全服务的适用范围。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Medianova describes static, dynamic, and large-file delivery with an EMEA-oriented network, media services, and application security. Validate target networks, dynamic acceleration, logs, and security scope. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "核对目标运营商、动态加速、日志与安全服务的适用范围。",
          "en": "Validate target networks, dynamic acceleration, logs, and security scope."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "blazingcdn",
    "name": "BlazingCDN",
    "mark": "BL",
    "tone": "purple",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://blazingcdn.com/",
    "logo": "assets/logos/blazingcdn.png",
    "sourceLabel": {
      "zh": "BlazingCDN 官方产品资料",
      "en": "BlazingCDN official product information"
    },
    "tagline": {
      "zh": "视频、软件与大文件交付",
      "en": "Video, software, and large-file delivery"
    },
    "intro": {
      "zh": "BlazingCDN 官网将视频、软件和媒体分发作为主要使用方向，并介绍其交付网络。适合把下载完成情况和实际流量模型放在一起评估的项目。",
      "en": "BlazingCDN positions its network around video, software, and media delivery. Evaluate complete downloads and the workload's real traffic model."
    },
    "bestFor": {
      "zh": "软件分发、下载与视频资源",
      "en": "Software distribution, downloads, and video assets"
    },
    "highlights": [
      {
        "zh": "视频、软件与大文件交付",
        "en": "Video, software, and large-file delivery"
      },
      {
        "zh": "软件分发、下载与视频资源",
        "en": "Software distribution, downloads, and video assets"
      }
    ],
    "watchouts": {
      "zh": "确认地区流量、对象大小、缓存保留和技术支持条件。",
      "en": "Confirm regional transfer, object sizes, cache retention, and support conditions."
    },
    "compare": {
      "delivery": {
        "zh": "视频、软件与大文件交付",
        "en": "Video, software, and large-file delivery"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "软件分发、下载与视频资源",
        "en": "Software distribution, downloads, and video assets"
      }
    },
    "seo": {
      "title": {
        "zh": "BlazingCDN CDN 介绍与选型：视频、软件与大文件交付",
        "en": "BlazingCDN CDN profile: Video, software, and large-file delivery"
      },
      "description": {
        "zh": "BlazingCDN 官网将视频、软件和媒体分发作为主要使用方向，并介绍其交付网络。适合把下载完成情况和实际流量模型放在一起评估的项目。",
        "en": "BlazingCDN positions its network around video, software, and media delivery. Evaluate complete downloads and the workload's real traffic model."
      },
      "analysis": {
        "zh": "BlazingCDN 官网将视频、软件和媒体分发作为主要使用方向，并介绍其交付网络。适合把下载完成情况和实际流量模型放在一起评估的项目。确认地区流量、对象大小、缓存保留和技术支持条件。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "BlazingCDN positions its network around video, software, and media delivery. Evaluate complete downloads and the workload's real traffic model. Confirm regional transfer, object sizes, cache retention, and support conditions. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认地区流量、对象大小、缓存保留和技术支持条件。",
          "en": "Confirm regional transfer, object sizes, cache retention, and support conditions."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "cdnsun",
    "name": "CDNsun",
    "mark": "CS",
    "tone": "cyan",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://cdnsun.com/",
    "logo": "assets/logos/cdnsun.png",
    "sourceLabel": {
      "zh": "CDNsun 官方产品资料",
      "en": "CDNsun official product information"
    },
    "tagline": {
      "zh": "网站与媒体内容分发",
      "en": "Website and media content distribution"
    },
    "intro": {
      "zh": "CDNsun 官网提供内容分发服务与试用入口。可作为网站和媒体交付的候选，使用自己的资源核对节点区域、缓存更新、HTTPS 与费用。",
      "en": "CDNsun offers content delivery and a trial entry point. Validate regional delivery, cache updates, HTTPS, and costs using your own resources."
    },
    "bestFor": {
      "zh": "网站静态资源与媒体分发",
      "en": "Website assets and media delivery"
    },
    "highlights": [
      {
        "zh": "网站与媒体内容分发",
        "en": "Website and media content distribution"
      },
      {
        "zh": "网站静态资源与媒体分发",
        "en": "Website assets and media delivery"
      }
    ],
    "watchouts": {
      "zh": "试用前核对所需区域、功能、流量承诺和日志。",
      "en": "Check required regions, features, traffic commitments, and logs before trialing."
    },
    "compare": {
      "delivery": {
        "zh": "网站与媒体内容分发",
        "en": "Website and media content distribution"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "网站静态资源与媒体分发",
        "en": "Website assets and media delivery"
      }
    },
    "seo": {
      "title": {
        "zh": "CDNsun CDN 介绍与选型：网站与媒体内容分发",
        "en": "CDNsun CDN profile: Website and media content distribution"
      },
      "description": {
        "zh": "CDNsun 官网提供内容分发服务与试用入口。可作为网站和媒体交付的候选，使用自己的资源核对节点区域、缓存更新、HTTPS 与费用。",
        "en": "CDNsun offers content delivery and a trial entry point. Validate regional delivery, cache updates, HTTPS, and costs using your own resources."
      },
      "analysis": {
        "zh": "CDNsun 官网提供内容分发服务与试用入口。可作为网站和媒体交付的候选，使用自己的资源核对节点区域、缓存更新、HTTPS 与费用。试用前核对所需区域、功能、流量承诺和日志。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "CDNsun offers content delivery and a trial entry point. Validate regional delivery, cache updates, HTTPS, and costs using your own resources. Check required regions, features, traffic commitments, and logs before trialing. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "试用前核对所需区域、功能、流量承诺和日志。",
          "en": "Check required regions, features, traffic commitments, and logs before trialing."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "belugacdn",
    "name": "BelugaCDN",
    "mark": "BE",
    "tone": "orange",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.belugacdn.com/",
    "logo": "assets/logos/belugacdn.png",
    "sourceLabel": {
      "zh": "BelugaCDN 官方产品资料",
      "en": "BelugaCDN official product information"
    },
    "tagline": {
      "zh": "按使用量评估的内容交付",
      "en": "Usage-oriented content delivery"
    },
    "intro": {
      "zh": "BelugaCDN 官方页面介绍内容分发、缓存刷新、分析和 API，以及自定义域名和内容访问控制。其宣传中的价格或性能比较不作为本站独立结论。",
      "en": "BelugaCDN describes delivery, cache purges, analytics, APIs, and custom-domain access controls. Vendor price or performance comparisons are not independent findings here."
    },
    "bestFor": {
      "zh": "静态资源与按用量核算的交付项目",
      "en": "Static assets and usage-based delivery projects"
    },
    "highlights": [
      {
        "zh": "按使用量评估的内容交付",
        "en": "Usage-oriented content delivery"
      },
      {
        "zh": "静态资源与按用量核算的交付项目",
        "en": "Static assets and usage-based delivery projects"
      }
    ],
    "watchouts": {
      "zh": "确认当前计费、区域可用性、缓存更新和服务支持。",
      "en": "Confirm current billing, regional availability, invalidation, and support."
    },
    "compare": {
      "delivery": {
        "zh": "按使用量评估的内容交付",
        "en": "Usage-oriented content delivery"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "静态资源与按用量核算的交付项目",
        "en": "Static assets and usage-based delivery projects"
      }
    },
    "seo": {
      "title": {
        "zh": "BelugaCDN CDN 介绍与选型：按使用量评估的内容交付",
        "en": "BelugaCDN CDN profile: Usage-oriented content delivery"
      },
      "description": {
        "zh": "BelugaCDN 官方页面介绍内容分发、缓存刷新、分析和 API，以及自定义域名和内容访问控制。其宣传中的价格或性能比较不作为本站独立结论。",
        "en": "BelugaCDN describes delivery, cache purges, analytics, APIs, and custom-domain access controls. Vendor price or performance comparisons are not independent findings here."
      },
      "analysis": {
        "zh": "BelugaCDN 官方页面介绍内容分发、缓存刷新、分析和 API，以及自定义域名和内容访问控制。其宣传中的价格或性能比较不作为本站独立结论。确认当前计费、区域可用性、缓存更新和服务支持。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "BelugaCDN describes delivery, cache purges, analytics, APIs, and custom-domain access controls. Vendor price or performance comparisons are not independent findings here. Confirm current billing, regional availability, invalidation, and support. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认当前计费、区域可用性、缓存更新和服务支持。",
          "en": "Confirm current billing, regional availability, invalidation, and support."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": true
  },
  {
    "id": "sucuri",
    "name": "Sucuri CDN",
    "mark": "SU",
    "tone": "green",
    "categories": [
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://sucuri.net/website-performance/",
    "logo": "assets/logos/sucuri.png",
    "sourceLabel": {
      "zh": "Sucuri CDN 官方产品资料",
      "en": "Sucuri CDN official product information"
    },
    "tagline": {
      "zh": "与网站安全结合的 CDN",
      "en": "CDN integrated with website security"
    },
    "intro": {
      "zh": "Sucuri 的网站性能资料将 CDN 与网站防火墙和安全服务组合呈现。适合希望将网站防护与缓存交付一并评估的团队，需确认动态页面兼容。",
      "en": "Sucuri presents CDN performance alongside website firewall and security services. Verify caching and dynamic-page compatibility for the intended site."
    },
    "bestFor": {
      "zh": "网站与 CMS 的交付及安全需求",
      "en": "Website and CMS delivery and security"
    },
    "highlights": [
      {
        "zh": "与网站安全结合的 CDN",
        "en": "CDN integrated with website security"
      },
      {
        "zh": "网站与 CMS 的交付及安全需求",
        "en": "Website and CMS delivery and security"
      }
    ],
    "watchouts": {
      "zh": "确认缓存规则、业务误拦截、日志与套餐服务范围。",
      "en": "Confirm cache rules, false positives, logs, and included services."
    },
    "compare": {
      "delivery": {
        "zh": "与网站安全结合的 CDN",
        "en": "CDN integrated with website security"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "网站与 CMS 的交付及安全需求",
        "en": "Website and CMS delivery and security"
      }
    },
    "seo": {
      "title": {
        "zh": "Sucuri CDN CDN 介绍与选型：与网站安全结合的 CDN",
        "en": "Sucuri CDN CDN profile: CDN integrated with website security"
      },
      "description": {
        "zh": "Sucuri 的网站性能资料将 CDN 与网站防火墙和安全服务组合呈现。适合希望将网站防护与缓存交付一并评估的团队，需确认动态页面兼容。",
        "en": "Sucuri presents CDN performance alongside website firewall and security services. Verify caching and dynamic-page compatibility for the intended site."
      },
      "analysis": {
        "zh": "Sucuri 的网站性能资料将 CDN 与网站防火墙和安全服务组合呈现。适合希望将网站防护与缓存交付一并评估的团队，需确认动态页面兼容。确认缓存规则、业务误拦截、日志与套餐服务范围。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Sucuri presents CDN performance alongside website firewall and security services. Verify caching and dynamic-page compatibility for the intended site. Confirm cache rules, false positives, logs, and included services. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认缓存规则、业务误拦截、日志与套餐服务范围。",
          "en": "Confirm cache rules, false positives, logs, and included services."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": true
  },
  {
    "id": "jqcdn",
    "name": "JQCDN / JetQuest CDN",
    "mark": "JQ",
    "tone": "blue",
    "categories": [
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.jqcdn.com/",
    "logo": "assets/logos/jqcdn.png",
    "sourceLabel": {
      "zh": "JQCDN / JetQuest CDN 官方产品资料",
      "en": "JQCDN / JetQuest CDN official product information"
    },
    "tagline": {
      "zh": "香港线路与安全加速接入",
      "en": "Hong Kong routing and secure delivery"
    },
    "intro": {
      "zh": "JQCDN 官网面向中文开发者介绍免备案接入、香港线路和安全加速产品。接入条件、业务适用范围和访问表现应分别确认，不将营销描述当作实测数据。",
      "en": "JQCDN targets Chinese-speaking developers with offshore onboarding, Hong Kong routing, and security services. Confirm eligibility and measured delivery separately."
    },
    "bestFor": {
      "zh": "评估境外接入和中文支持的项目",
      "en": "Projects evaluating offshore onboarding and Chinese-language support"
    },
    "highlights": [
      {
        "zh": "香港线路与安全加速接入",
        "en": "Hong Kong routing and secure delivery"
      },
      {
        "zh": "评估境外接入和中文支持的项目",
        "en": "Projects evaluating offshore onboarding and Chinese-language support"
      }
    ],
    "watchouts": {
      "zh": "确认业务类型、服务区域、防护条款和协议兼容。",
      "en": "Confirm workload eligibility, regions, protection terms, and protocol compatibility."
    },
    "compare": {
      "delivery": {
        "zh": "香港线路与安全加速接入",
        "en": "Hong Kong routing and secure delivery"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "评估境外接入和中文支持的项目",
        "en": "Projects evaluating offshore onboarding and Chinese-language support"
      }
    },
    "seo": {
      "title": {
        "zh": "JQCDN / JetQuest CDN CDN 介绍与选型：香港线路与安全加速接入",
        "en": "JQCDN / JetQuest CDN CDN profile: Hong Kong routing and secure delivery"
      },
      "description": {
        "zh": "JQCDN 官网面向中文开发者介绍免备案接入、香港线路和安全加速产品。接入条件、业务适用范围和访问表现应分别确认，不将营销描述当作实测数据。",
        "en": "JQCDN targets Chinese-speaking developers with offshore onboarding, Hong Kong routing, and security services. Confirm eligibility and measured delivery separately."
      },
      "analysis": {
        "zh": "JQCDN 官网面向中文开发者介绍免备案接入、香港线路和安全加速产品。接入条件、业务适用范围和访问表现应分别确认，不将营销描述当作实测数据。确认业务类型、服务区域、防护条款和协议兼容。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "JQCDN targets Chinese-speaking developers with offshore onboarding, Hong Kong routing, and security services. Confirm eligibility and measured delivery separately. Confirm workload eligibility, regions, protection terms, and protocol compatibility. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认业务类型、服务区域、防护条款和协议兼容。",
          "en": "Confirm workload eligibility, regions, protection terms, and protocol compatibility."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "naver-cloud",
    "name": "NAVER Cloud Global Edge",
    "mark": "NV",
    "tone": "purple",
    "categories": [
      "delivery",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.ncloud.com/product/networking/globalEdge",
    "logo": "assets/logos/naver-cloud.png",
    "sourceLabel": {
      "zh": "NAVER Cloud Global Edge 官方产品资料",
      "en": "NAVER Cloud Global Edge official product information"
    },
    "tagline": {
      "zh": "NAVER 云上的全球内容交付",
      "en": "Global delivery within NAVER Cloud"
    },
    "intro": {
      "zh": "NAVER Cloud Global Edge 官方页面将其定位为全球 CDN 服务，并介绍内容交付、指标和管理 API。适合需要结合 NAVER Cloud 业务和目标区域验证的项目。",
      "en": "NAVER Cloud Global Edge is documented as a global CDN service with delivery, metrics, and management APIs."
    },
    "bestFor": {
      "zh": "NAVER Cloud 项目与跨地区内容交付",
      "en": "NAVER Cloud workloads and cross-region delivery"
    },
    "highlights": [
      {
        "zh": "NAVER 云上的全球内容交付",
        "en": "Global delivery within NAVER Cloud"
      },
      {
        "zh": "NAVER Cloud 项目与跨地区内容交付",
        "en": "NAVER Cloud workloads and cross-region delivery"
      }
    ],
    "watchouts": {
      "zh": "核对地区价格、缓存策略、接口权限及具体源站支持。",
      "en": "Check regional pricing, cache policies, API access, and supported origins."
    },
    "compare": {
      "delivery": {
        "zh": "NAVER 云上的全球内容交付",
        "en": "Global delivery within NAVER Cloud"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "NAVER Cloud 项目与跨地区内容交付",
        "en": "NAVER Cloud workloads and cross-region delivery"
      }
    },
    "seo": {
      "title": {
        "zh": "NAVER Cloud Global Edge CDN 介绍与选型：NAVER 云上的全球内容交付",
        "en": "NAVER Cloud Global Edge CDN profile: Global delivery within NAVER Cloud"
      },
      "description": {
        "zh": "NAVER Cloud Global Edge 官方页面将其定位为全球 CDN 服务，并介绍内容交付、指标和管理 API。适合需要结合 NAVER Cloud 业务和目标区域验证的项目。",
        "en": "NAVER Cloud Global Edge is documented as a global CDN service with delivery, metrics, and management APIs."
      },
      "analysis": {
        "zh": "NAVER Cloud Global Edge 官方页面将其定位为全球 CDN 服务，并介绍内容交付、指标和管理 API。适合需要结合 NAVER Cloud 业务和目标区域验证的项目。核对地区价格、缓存策略、接口权限及具体源站支持。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "NAVER Cloud Global Edge is documented as a global CDN service with delivery, metrics, and management APIs. Check regional pricing, cache policies, API access, and supported origins. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "核对地区价格、缓存策略、接口权限及具体源站支持。",
          "en": "Check regional pricing, cache policies, API access, and supported origins."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "scaleway",
    "name": "Scaleway Edge Services",
    "mark": "SC",
    "tone": "cyan",
    "categories": [
      "delivery",
      "security",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.scaleway.com/en/edge-services/",
    "logo": "assets/logos/scaleway.svg",
    "sourceLabel": {
      "zh": "Scaleway Edge Services 官方产品资料",
      "en": "Scaleway Edge Services official product information"
    },
    "tagline": {
      "zh": "HTTP 缓存、WAF 与云资源入口",
      "en": "HTTP caching, WAF, and cloud resource delivery"
    },
    "intro": {
      "zh": "Scaleway Edge Services 官方资料介绍缓存、WAF、SSL 证书和自定义域名，并展示与对象存储网站及媒体资源的使用方式。它属于云平台集成式边缘服务。",
      "en": "Scaleway Edge Services combines caching, WAF, certificates, and custom domains for HTTP resources, including object-storage websites and media."
    },
    "bestFor": {
      "zh": "Scaleway 云资源与对象存储网站",
      "en": "Scaleway resources and object-storage websites"
    },
    "highlights": [
      {
        "zh": "HTTP 缓存、WAF 与云资源入口",
        "en": "HTTP caching, WAF, and cloud resource delivery"
      },
      {
        "zh": "Scaleway 云资源与对象存储网站",
        "en": "Scaleway resources and object-storage websites"
      }
    ],
    "watchouts": {
      "zh": "确认支持的源站、缓存范围及 WAF 和证书功能边界。",
      "en": "Confirm supported origins, cache scope, WAF, and certificate capabilities."
    },
    "compare": {
      "delivery": {
        "zh": "HTTP 缓存、WAF 与云资源入口",
        "en": "HTTP caching, WAF, and cloud resource delivery"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "缓存与管理能力按产品确认",
        "en": "Confirm caching and management capabilities"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "Scaleway 云资源与对象存储网站",
        "en": "Scaleway resources and object-storage websites"
      }
    },
    "seo": {
      "title": {
        "zh": "Scaleway Edge Services CDN 介绍与选型：HTTP 缓存、WAF 与云资源入口",
        "en": "Scaleway Edge Services CDN profile: HTTP caching, WAF, and cloud resource delivery"
      },
      "description": {
        "zh": "Scaleway Edge Services 官方资料介绍缓存、WAF、SSL 证书和自定义域名，并展示与对象存储网站及媒体资源的使用方式。它属于云平台集成式边缘服务。",
        "en": "Scaleway Edge Services combines caching, WAF, certificates, and custom domains for HTTP resources, including object-storage websites and media."
      },
      "analysis": {
        "zh": "Scaleway Edge Services 官方资料介绍缓存、WAF、SSL 证书和自定义域名，并展示与对象存储网站及媒体资源的使用方式。它属于云平台集成式边缘服务。确认支持的源站、缓存范围及 WAF 和证书功能边界。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Scaleway Edge Services combines caching, WAF, certificates, and custom domains for HTTP resources, including object-storage websites and media. Confirm supported origins, cache scope, WAF, and certificate capabilities. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认支持的源站、缓存范围及 WAF 和证书功能边界。",
          "en": "Confirm supported origins, cache scope, WAF, and certificate capabilities."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": true
  },
  {
    "id": "vercel",
    "name": "Vercel CDN",
    "mark": "VC",
    "tone": "orange",
    "categories": [
      "delivery",
      "programmable",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://vercel.com/docs/cdn",
    "logo": "assets/logos/vercel.png",
    "sourceLabel": {
      "zh": "Vercel CDN 官方产品资料",
      "en": "Vercel CDN official product information"
    },
    "tagline": {
      "zh": "应用部署平台内建的内容交付",
      "en": "Application-platform integrated content delivery"
    },
    "intro": {
      "zh": "Vercel 官方文档介绍与应用部署集成的 CDN。它应作为应用平台内建交付能力评估，而不是默认等同于任意源站都可直接接入的传统 CDN 套餐。",
      "en": "Vercel documents a CDN integrated with its application platform. Evaluate its deployment model rather than assuming it is equivalent to a standalone CDN plan."
    },
    "bestFor": {
      "zh": "部署在 Vercel 的网站和 Web 应用",
      "en": "Sites and applications deployed on Vercel"
    },
    "highlights": [
      {
        "zh": "应用部署平台内建的内容交付",
        "en": "Application-platform integrated content delivery"
      },
      {
        "zh": "部署在 Vercel 的网站和 Web 应用",
        "en": "Sites and applications deployed on Vercel"
      }
    ],
    "watchouts": {
      "zh": "确认框架缓存、动态请求、部署限制及平台费用。",
      "en": "Confirm framework caching, dynamic requests, deployment constraints, and platform charges."
    },
    "compare": {
      "delivery": {
        "zh": "应用部署平台内建的内容交付",
        "en": "Application-platform integrated content delivery"
      },
      "security": {
        "zh": "安全能力按实际方案确认",
        "en": "Confirm security in the actual service"
      },
      "edge": {
        "zh": "官网列示边缘开发或函数能力",
        "en": "Edge development or functions listed"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "部署在 Vercel 的网站和 Web 应用",
        "en": "Sites and applications deployed on Vercel"
      }
    },
    "seo": {
      "title": {
        "zh": "Vercel CDN CDN 介绍与选型：应用部署平台内建的内容交付",
        "en": "Vercel CDN CDN profile: Application-platform integrated content delivery"
      },
      "description": {
        "zh": "Vercel 官方文档介绍与应用部署集成的 CDN。它应作为应用平台内建交付能力评估，而不是默认等同于任意源站都可直接接入的传统 CDN 套餐。",
        "en": "Vercel documents a CDN integrated with its application platform. Evaluate its deployment model rather than assuming it is equivalent to a standalone CDN plan."
      },
      "analysis": {
        "zh": "Vercel 官方文档介绍与应用部署集成的 CDN。它应作为应用平台内建交付能力评估，而不是默认等同于任意源站都可直接接入的传统 CDN 套餐。确认框架缓存、动态请求、部署限制及平台费用。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Vercel documents a CDN integrated with its application platform. Evaluate its deployment model rather than assuming it is equivalent to a standalone CDN plan. Confirm framework caching, dynamic requests, deployment constraints, and platform charges. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认框架缓存、动态请求、部署限制及平台费用。",
          "en": "Confirm framework caching, dynamic requests, deployment constraints, and platform charges."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "netlify",
    "name": "Netlify Edge Network",
    "mark": "NT",
    "tone": "green",
    "categories": [
      "delivery",
      "security",
      "programmable",
      "cloud"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.netlify.com/platform/",
    "logo": "assets/logos/netlify.svg",
    "sourceLabel": {
      "zh": "Netlify Edge Network 官方产品资料",
      "en": "Netlify Edge Network official product information"
    },
    "tagline": {
      "zh": "Web 部署、缓存与边缘网络",
      "en": "Web deployments, caching, and edge networking"
    },
    "intro": {
      "zh": "Netlify 官方平台资料介绍全球边缘交付、缓存控制、图片 CDN 和部署能力，并列出安全及函数服务。这里将其标为应用平台集成式交付产品。",
      "en": "Netlify describes global edge delivery, cache controls, image CDN, deployments, security, and functions as part of its application platform."
    },
    "bestFor": {
      "zh": "Netlify 网站、预览部署与 Web 应用",
      "en": "Netlify sites, preview deployments, and web applications"
    },
    "highlights": [
      {
        "zh": "Web 部署、缓存与边缘网络",
        "en": "Web deployments, caching, and edge networking"
      },
      {
        "zh": "Netlify 网站、预览部署与 Web 应用",
        "en": "Netlify sites, preview deployments, and web applications"
      }
    ],
    "watchouts": {
      "zh": "确认应用部署模式、函数和缓存的限制以及流量费用。",
      "en": "Confirm deployment requirements, function and cache limits, and transfer charges."
    },
    "compare": {
      "delivery": {
        "zh": "Web 部署、缓存与边缘网络",
        "en": "Web deployments, caching, and edge networking"
      },
      "security": {
        "zh": "官网列示安全服务，按套餐确认",
        "en": "Security services listed; confirm the plan"
      },
      "edge": {
        "zh": "官网列示边缘开发或函数能力",
        "en": "Edge development or functions listed"
      },
      "origin": {
        "zh": "源站接入方式需按项目确认",
        "en": "Confirm origin onboarding per project"
      },
      "fit": {
        "zh": "Netlify 网站、预览部署与 Web 应用",
        "en": "Netlify sites, preview deployments, and web applications"
      }
    },
    "seo": {
      "title": {
        "zh": "Netlify Edge Network CDN 介绍与选型：Web 部署、缓存与边缘网络",
        "en": "Netlify Edge Network CDN profile: Web deployments, caching, and edge networking"
      },
      "description": {
        "zh": "Netlify 官方平台资料介绍全球边缘交付、缓存控制、图片 CDN 和部署能力，并列出安全及函数服务。这里将其标为应用平台集成式交付产品。",
        "en": "Netlify describes global edge delivery, cache controls, image CDN, deployments, security, and functions as part of its application platform."
      },
      "analysis": {
        "zh": "Netlify 官方平台资料介绍全球边缘交付、缓存控制、图片 CDN 和部署能力，并列出安全及函数服务。这里将其标为应用平台集成式交付产品。确认应用部署模式、函数和缓存的限制以及流量费用。应使用相同文件、真实访问地区和一致缓存条件验证交付效果。",
        "en": "Netlify describes global edge delivery, cache controls, image CDN, deployments, security, and functions as part of its application platform. Confirm deployment requirements, function and cache limits, and transfer charges. Validate delivery with matching files, real user locations, and consistent cache conditions."
      },
      "questions": [
        {
          "zh": "确认应用部署模式、函数和缓存的限制以及流量费用。",
          "en": "Confirm deployment requirements, function and cache limits, and transfer charges."
        },
        {
          "zh": "如何验证缓存更新、异常响应和费用口径？",
          "en": "How will cache updates, error responses, and billing be verified?"
        }
      ]
    },
    "logoDark": false
  },
  {
    "id": "cdn07",
    "name": "CDN07",
    "mark": "CDN0",
    "tone": "blue",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://cdn07.com/",
    "sourceLabel": {
      "zh": "CDN07 官方产品与技术资料",
      "en": "CDN07 official product and technical materials"
    },
    "tagline": {
      "zh": "高防 CDN 与亚太业务加速",
      "en": "Security-focused CDN for Asia-Pacific"
    },
    "intro": {
      "zh": "官网提供高防 CDN、APP 防护与游戏 SDK 方案，支持网站内容交付和应用流量防护；本目录不把官网防御容量宣传当作独立测量结果。",
      "en": "Offers security-focused CDN, application protection and game SDK services. Published protection claims are vendor statements, not independent measurements."
    },
    "bestFor": {
      "zh": "亚太网站、游戏与需要中文支持的应用团队",
      "en": "Asia-Pacific websites, gaming and Chinese-speaking application teams"
    },
    "highlights": [
      {
        "zh": "高防 CDN 与亚太业务加速",
        "en": "Security-focused CDN for Asia-Pacific"
      },
      {
        "zh": "官网提供高防 CDN、APP 防护与游戏 SDK 方案，支持网站内容交付和应用流量防护；本目录不把官网防御容量宣传当作独立测量结果。",
        "en": "Offers security-focused CDN, application protection and game SDK services. Published protection claims are vendor statements, not independent measurements."
      }
    ],
    "watchouts": {
      "zh": "确认套餐内的域名数、WebSocket 支持、防护触发条件和攻击期间计费。",
      "en": "Confirm domain limits, WebSocket support, mitigation conditions and attack-time billing."
    },
    "compare": {
      "delivery": {
        "zh": "高防 CDN 与亚太业务加速",
        "en": "Security-focused CDN for Asia-Pacific"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "亚太网站、游戏与需要中文支持的应用团队",
        "en": "Asia-Pacific websites, gaming and Chinese-speaking application teams"
      }
    },
    "seo": {
      "title": {
        "zh": "CDN07 CDN 介绍与选型：高防 CDN 与亚太业务加速",
        "en": "CDN07 CDN profile: Security-focused CDN for Asia-Pacific"
      },
      "description": {
        "zh": "官网提供高防 CDN、APP 防护与游戏 SDK 方案，支持网站内容交付和应用流量防护；本目录不把官网防御容量宣传当作独立测量结果。",
        "en": "Offers security-focused CDN, application protection and game SDK services. Published protection claims are vendor statements, not independent measurements."
      },
      "analysis": {
        "zh": "官网提供高防 CDN、APP 防护与游戏 SDK 方案，支持网站内容交付和应用流量防护；本目录不把官网防御容量宣传当作独立测量结果。 确认套餐内的域名数、WebSocket 支持、防护触发条件和攻击期间计费。",
        "en": "Offers security-focused CDN, application protection and game SDK services. Published protection claims are vendor statements, not independent measurements. Confirm domain limits, WebSocket support, mitigation conditions and attack-time billing."
      },
      "questions": [
        {
          "zh": "确认套餐内的域名数、WebSocket 支持、防护触发条件和攻击期间计费。",
          "en": "Confirm domain limits, WebSocket support, mitigation conditions and attack-time billing."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/cdn07.png",
    "logoDark": true
  },
  {
    "id": "stonecdn",
    "name": "StoneCDN",
    "mark": "Ston",
    "tone": "green",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.stonecdn.com/",
    "sourceLabel": {
      "zh": "StoneCDN 官方产品与技术资料",
      "en": "StoneCDN official product and technical materials"
    },
    "tagline": {
      "zh": "游戏盾 SDK 与应用安全交付",
      "en": "Game SDK protection and application delivery"
    },
    "intro": {
      "zh": "StoneCDN 官网将其定位为 YewSafe 旗下品牌，重点是 Windows、Android、iOS 游戏盾 SDK、加密调度与流量防护。选型时应区分 SDK 接入和普通网站 CDN 接入。",
      "en": "StoneCDN identifies itself as a YewSafe brand, focused on Windows, Android and iOS protection SDKs, encrypted routing and application traffic protection. SDK integration differs from standard website CDN onboarding."
    },
    "bestFor": {
      "zh": "需要客户端集成的游戏、移动应用与实时服务",
      "en": "Games, mobile applications and real-time services with client integration"
    },
    "highlights": [
      {
        "zh": "游戏盾 SDK 与应用安全交付",
        "en": "Game SDK protection and application delivery"
      },
      {
        "zh": "StoneCDN 官网将其定位为 YewSafe 旗下品牌，重点是 Windows、Android、iOS 游戏盾 SDK、加密调度与流量防护。选型时应区分 SDK 接入和普通网站 CDN 接入。",
        "en": "StoneCDN identifies itself as a YewSafe brand, focused on Windows, Android and iOS protection SDKs, encrypted routing and application traffic protection. SDK integration differs from standard website CDN onboarding."
      }
    ],
    "watchouts": {
      "zh": "确认协议兼容、SDK 更新方式、客户端故障回退和实际支持地区。",
      "en": "Confirm protocol compatibility, SDK updates, client failover and supported regions."
    },
    "compare": {
      "delivery": {
        "zh": "游戏盾 SDK 与应用安全交付",
        "en": "Game SDK protection and application delivery"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "需要客户端集成的游戏、移动应用与实时服务",
        "en": "Games, mobile applications and real-time services with client integration"
      }
    },
    "seo": {
      "title": {
        "zh": "StoneCDN CDN 介绍与选型：游戏盾 SDK 与应用安全交付",
        "en": "StoneCDN CDN profile: Game SDK protection and application delivery"
      },
      "description": {
        "zh": "StoneCDN 官网将其定位为 YewSafe 旗下品牌，重点是 Windows、Android、iOS 游戏盾 SDK、加密调度与流量防护。选型时应区分 SDK 接入和普通网站 CDN 接入。",
        "en": "StoneCDN identifies itself as a YewSafe brand, focused on Windows, Android and iOS protection SDKs, encrypted routing and application traffic protection. SDK integration differs from standard website CDN onboarding."
      },
      "analysis": {
        "zh": "StoneCDN 官网将其定位为 YewSafe 旗下品牌，重点是 Windows、Android、iOS 游戏盾 SDK、加密调度与流量防护。选型时应区分 SDK 接入和普通网站 CDN 接入。 确认协议兼容、SDK 更新方式、客户端故障回退和实际支持地区。",
        "en": "StoneCDN identifies itself as a YewSafe brand, focused on Windows, Android and iOS protection SDKs, encrypted routing and application traffic protection. SDK integration differs from standard website CDN onboarding. Confirm protocol compatibility, SDK updates, client failover and supported regions."
      },
      "questions": [
        {
          "zh": "确认协议兼容、SDK 更新方式、客户端故障回退和实际支持地区。",
          "en": "Confirm protocol compatibility, SDK updates, client failover and supported regions."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/stonecdn.png",
    "logoDark": false
  },
  {
    "id": "cdnetworks",
    "name": "CDNetworks",
    "mark": "CDNe",
    "tone": "purple",
    "categories": [
      "delivery",
      "programmable",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.cdnetworks.com/",
    "sourceUrl": "https://docs.cdnetworks.com/en/cdn/docs/intro",
    "sourceLabel": {
      "zh": "CDNetworks 官方产品与技术资料",
      "en": "CDNetworks official product and technical materials"
    },
    "tagline": {
      "zh": "CDN Pro 与可配置内容交付",
      "en": "CDN Pro and configurable content delivery"
    },
    "intro": {
      "zh": "CDNetworks 的 CDN Pro 文档介绍了通过配置、测试和发布流程交付 Web 资源的方式，并提供 API、缓存控制和源站相关设置，适合把 CDN 纳入开发发布流程。",
      "en": "CDNetworks documents CDN Pro configuration, testing and deployment workflows, with APIs, caching controls and origin settings for delivery integrated into software releases."
    },
    "bestFor": {
      "zh": "需要细粒度配置、API 管理和多地区交付的团队",
      "en": "Teams needing granular configuration, API management and regional delivery"
    },
    "highlights": [
      {
        "zh": "CDN Pro 与可配置内容交付",
        "en": "CDN Pro and configurable content delivery"
      },
      {
        "zh": "CDNetworks 的 CDN Pro 文档介绍了通过配置、测试和发布流程交付 Web 资源的方式，并提供 API、缓存控制和源站相关设置，适合把 CDN 纳入开发发布流程。",
        "en": "CDNetworks documents CDN Pro configuration, testing and deployment workflows, with APIs, caching controls and origin settings for delivery integrated into software releases."
      }
    ],
    "watchouts": {
      "zh": "核对配置发布与回滚流程、源站鉴权、日志导出及地区价格。",
      "en": "Check configuration rollout and rollback, origin authentication, log export and regional pricing."
    },
    "compare": {
      "delivery": {
        "zh": "CDN Pro 与可配置内容交付",
        "en": "CDN Pro and configurable content delivery"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "需要细粒度配置、API 管理和多地区交付的团队",
        "en": "Teams needing granular configuration, API management and regional delivery"
      }
    },
    "seo": {
      "title": {
        "zh": "CDNetworks CDN 介绍与选型：CDN Pro 与可配置内容交付",
        "en": "CDNetworks CDN profile: CDN Pro and configurable content delivery"
      },
      "description": {
        "zh": "CDNetworks 的 CDN Pro 文档介绍了通过配置、测试和发布流程交付 Web 资源的方式，并提供 API、缓存控制和源站相关设置，适合把 CDN 纳入开发发布流程。",
        "en": "CDNetworks documents CDN Pro configuration, testing and deployment workflows, with APIs, caching controls and origin settings for delivery integrated into software releases."
      },
      "analysis": {
        "zh": "CDNetworks 的 CDN Pro 文档介绍了通过配置、测试和发布流程交付 Web 资源的方式，并提供 API、缓存控制和源站相关设置，适合把 CDN 纳入开发发布流程。 核对配置发布与回滚流程、源站鉴权、日志导出及地区价格。",
        "en": "CDNetworks documents CDN Pro configuration, testing and deployment workflows, with APIs, caching controls and origin settings for delivery integrated into software releases. Check configuration rollout and rollback, origin authentication, log export and regional pricing."
      },
      "questions": [
        {
          "zh": "核对配置发布与回滚流程、源站鉴权、日志导出及地区价格。",
          "en": "Check configuration rollout and rollback, origin authentication, log export and regional pricing."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/cdnetworks.svg",
    "logoDark": false
  },
  {
    "id": "qiniu",
    "name": "七牛云 Qiniu",
    "mark": "七牛云 ",
    "tone": "orange",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.qiniu.com/",
    "sourceUrl": "https://developer.qiniu.com/fusion",
    "sourceLabel": {
      "zh": "七牛云 Qiniu 官方产品与技术资料",
      "en": "七牛云 Qiniu official product and technical materials"
    },
    "tagline": {
      "zh": "融合 CDN 与对象存储协同",
      "en": "CDN integrated with object storage"
    },
    "intro": {
      "zh": "七牛云 CDN 文档覆盖域名接入、回源与缓存配置、HTTPS、访问控制、刷新预取和日志分析。适合已有 Kodo 存储或媒体处理流程的团队统一管理内容分发。",
      "en": "Qiniu CDN documentation covers domain onboarding, origins, caching, HTTPS, access controls, purge, prefetch and logs. It fits teams already using Kodo storage or media processing."
    },
    "bestFor": {
      "zh": "中文业务、音视频平台及 Kodo 存储用户",
      "en": "Chinese-language services, media platforms and Kodo users"
    },
    "highlights": [
      {
        "zh": "融合 CDN 与对象存储协同",
        "en": "CDN integrated with object storage"
      },
      {
        "zh": "七牛云 CDN 文档覆盖域名接入、回源与缓存配置、HTTPS、访问控制、刷新预取和日志分析。适合已有 Kodo 存储或媒体处理流程的团队统一管理内容分发。",
        "en": "Qiniu CDN documentation covers domain onboarding, origins, caching, HTTPS, access controls, purge, prefetch and logs. It fits teams already using Kodo storage or media processing."
      }
    ],
    "watchouts": {
      "zh": "区分存储流量与 CDN 流量，核对区域要求、回源费用和刷新配额。",
      "en": "Separate storage and CDN traffic charges; verify regional requirements, origin costs and purge quotas."
    },
    "compare": {
      "delivery": {
        "zh": "融合 CDN 与对象存储协同",
        "en": "CDN integrated with object storage"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "中文业务、音视频平台及 Kodo 存储用户",
        "en": "Chinese-language services, media platforms and Kodo users"
      }
    },
    "seo": {
      "title": {
        "zh": "七牛云 Qiniu CDN 介绍与选型：融合 CDN 与对象存储协同",
        "en": "七牛云 Qiniu CDN profile: CDN integrated with object storage"
      },
      "description": {
        "zh": "七牛云 CDN 文档覆盖域名接入、回源与缓存配置、HTTPS、访问控制、刷新预取和日志分析。适合已有 Kodo 存储或媒体处理流程的团队统一管理内容分发。",
        "en": "Qiniu CDN documentation covers domain onboarding, origins, caching, HTTPS, access controls, purge, prefetch and logs. It fits teams already using Kodo storage or media processing."
      },
      "analysis": {
        "zh": "七牛云 CDN 文档覆盖域名接入、回源与缓存配置、HTTPS、访问控制、刷新预取和日志分析。适合已有 Kodo 存储或媒体处理流程的团队统一管理内容分发。 区分存储流量与 CDN 流量，核对区域要求、回源费用和刷新配额。",
        "en": "Qiniu CDN documentation covers domain onboarding, origins, caching, HTTPS, access controls, purge, prefetch and logs. It fits teams already using Kodo storage or media processing. Separate storage and CDN traffic charges; verify regional requirements, origin costs and purge quotas."
      },
      "questions": [
        {
          "zh": "区分存储流量与 CDN 流量，核对区域要求、回源费用和刷新配额。",
          "en": "Separate storage and CDN traffic charges; verify regional requirements, origin costs and purge quotas."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/qiniu.jpg",
    "logoDark": false
  },
  {
    "id": "azion",
    "name": "Azion",
    "mark": "Azio",
    "tone": "cyan",
    "categories": [
      "programmable",
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.azion.com/en/",
    "sourceLabel": {
      "zh": "Azion 官方产品与技术资料",
      "en": "Azion official product and technical materials"
    },
    "tagline": {
      "zh": "面向开发者的边缘应用平台",
      "en": "Edge application platform for developers"
    },
    "intro": {
      "zh": "Azion 将应用部署、内容交付和应用安全放在同一平台，适合需要在边缘处理请求、配置缓存并保护 Web 服务的开发团队。",
      "en": "Azion combines application deployment, content delivery and application security for teams that process requests and manage caching at the edge."
    },
    "bestFor": {
      "zh": "可编程 Web 应用、API 与边缘部署项目",
      "en": "Programmable web applications, APIs and edge deployments"
    },
    "highlights": [
      {
        "zh": "面向开发者的边缘应用平台",
        "en": "Edge application platform for developers"
      },
      {
        "zh": "Azion 将应用部署、内容交付和应用安全放在同一平台，适合需要在边缘处理请求、配置缓存并保护 Web 服务的开发团队。",
        "en": "Azion combines application deployment, content delivery and application security for teams that process requests and manage caching at the edge."
      }
    ],
    "watchouts": {
      "zh": "先验证运行时限制、配置版本、调试方式及目标地区的回源路径。",
      "en": "Validate runtime limits, configuration versioning, debugging and origin paths in target regions."
    },
    "compare": {
      "delivery": {
        "zh": "面向开发者的边缘应用平台",
        "en": "Edge application platform for developers"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "可编程 Web 应用、API 与边缘部署项目",
        "en": "Programmable web applications, APIs and edge deployments"
      }
    },
    "seo": {
      "title": {
        "zh": "Azion CDN 介绍与选型：面向开发者的边缘应用平台",
        "en": "Azion CDN profile: Edge application platform for developers"
      },
      "description": {
        "zh": "Azion 将应用部署、内容交付和应用安全放在同一平台，适合需要在边缘处理请求、配置缓存并保护 Web 服务的开发团队。",
        "en": "Azion combines application deployment, content delivery and application security for teams that process requests and manage caching at the edge."
      },
      "analysis": {
        "zh": "Azion 将应用部署、内容交付和应用安全放在同一平台，适合需要在边缘处理请求、配置缓存并保护 Web 服务的开发团队。 先验证运行时限制、配置版本、调试方式及目标地区的回源路径。",
        "en": "Azion combines application deployment, content delivery and application security for teams that process requests and manage caching at the edge. Validate runtime limits, configuration versioning, debugging and origin paths in target regions."
      },
      "questions": [
        {
          "zh": "先验证运行时限制、配置版本、调试方式及目标地区的回源路径。",
          "en": "Validate runtime limits, configuration versioning, debugging and origin paths in target regions."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/azion.svg",
    "logoDark": false
  },
  {
    "id": "ovhcloud",
    "name": "OVHcloud",
    "mark": "OVHc",
    "tone": "blue",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.ovhcloud.com/en/web-hosting/options/cdn/",
    "sourceLabel": {
      "zh": "OVHcloud 官方产品与技术资料",
      "en": "OVHcloud official product and technical materials"
    },
    "tagline": {
      "zh": "Web Hosting 集成式 CDN",
      "en": "CDN integrated with Web Hosting"
    },
    "intro": {
      "zh": "OVHcloud 的 Shared CDN 是 Web Hosting 的加速选项，提供不同等级的缓存及优化功能。它适合站点托管用户，不能直接等同于可接入任意源站的通用 CDN 套餐。",
      "en": "OVHcloud Shared CDN is an option for its Web Hosting plans, with different caching and optimization tiers. It is a hosting integration rather than a blanket promise of arbitrary-origin support."
    },
    "bestFor": {
      "zh": "使用 OVHcloud Web Hosting 的网站",
      "en": "Websites hosted on OVHcloud Web Hosting"
    },
    "highlights": [
      {
        "zh": "Web Hosting 集成式 CDN",
        "en": "CDN integrated with Web Hosting"
      },
      {
        "zh": "OVHcloud 的 Shared CDN 是 Web Hosting 的加速选项，提供不同等级的缓存及优化功能。它适合站点托管用户，不能直接等同于可接入任意源站的通用 CDN 套餐。",
        "en": "OVHcloud Shared CDN is an option for its Web Hosting plans, with different caching and optimization tiers. It is a hosting integration rather than a blanket promise of arbitrary-origin support."
      }
    ],
    "watchouts": {
      "zh": "确认托管套餐兼容性、缓存规则权限及选购等级包含的安全功能。",
      "en": "Confirm hosting-plan compatibility, cache-rule controls and security features in the selected tier."
    },
    "compare": {
      "delivery": {
        "zh": "Web Hosting 集成式 CDN",
        "en": "CDN integrated with Web Hosting"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "配合自有云产品接入",
        "en": "Integrated with its cloud product"
      },
      "fit": {
        "zh": "使用 OVHcloud Web Hosting 的网站",
        "en": "Websites hosted on OVHcloud Web Hosting"
      }
    },
    "seo": {
      "title": {
        "zh": "OVHcloud CDN 介绍与选型：Web Hosting 集成式 CDN",
        "en": "OVHcloud CDN profile: CDN integrated with Web Hosting"
      },
      "description": {
        "zh": "OVHcloud 的 Shared CDN 是 Web Hosting 的加速选项，提供不同等级的缓存及优化功能。它适合站点托管用户，不能直接等同于可接入任意源站的通用 CDN 套餐。",
        "en": "OVHcloud Shared CDN is an option for its Web Hosting plans, with different caching and optimization tiers. It is a hosting integration rather than a blanket promise of arbitrary-origin support."
      },
      "analysis": {
        "zh": "OVHcloud 的 Shared CDN 是 Web Hosting 的加速选项，提供不同等级的缓存及优化功能。它适合站点托管用户，不能直接等同于可接入任意源站的通用 CDN 套餐。 确认托管套餐兼容性、缓存规则权限及选购等级包含的安全功能。",
        "en": "OVHcloud Shared CDN is an option for its Web Hosting plans, with different caching and optimization tiers. It is a hosting integration rather than a blanket promise of arbitrary-origin support. Confirm hosting-plan compatibility, cache-rule controls and security features in the selected tier."
      },
      "questions": [
        {
          "zh": "确认托管套餐兼容性、缓存规则权限及选购等级包含的安全功能。",
          "en": "Confirm hosting-plan compatibility, cache-rule controls and security features in the selected tier."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/ovhcloud.svg",
    "logoDark": false
  },
  {
    "id": "tata",
    "name": "Tata Communications",
    "mark": "Tata",
    "tone": "green",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.tatacommunications.com/media-entertainment",
    "sourceLabel": {
      "zh": "Tata Communications 官方产品与技术资料",
      "en": "Tata Communications official product and technical materials"
    },
    "tagline": {
      "zh": "面向媒体的内容与视频分发",
      "en": "Media-focused content and video delivery"
    },
    "intro": {
      "zh": "Tata Communications 的媒体服务组合涵盖视频 CDN、直播与点播交付，以及专业媒体传输。适合需要把内容制作、传输和终端分发衔接起来的媒体业务。",
      "en": "Tata Communications offers video CDN, live and on-demand delivery alongside professional media transport, connecting content workflows to audience delivery."
    },
    "bestFor": {
      "zh": "广播机构、OTT 平台和大型直播项目",
      "en": "Broadcasters, OTT platforms and major live events"
    },
    "highlights": [
      {
        "zh": "面向媒体的内容与视频分发",
        "en": "Media-focused content and video delivery"
      },
      {
        "zh": "Tata Communications 的媒体服务组合涵盖视频 CDN、直播与点播交付，以及专业媒体传输。适合需要把内容制作、传输和终端分发衔接起来的媒体业务。",
        "en": "Tata Communications offers video CDN, live and on-demand delivery alongside professional media transport, connecting content workflows to audience delivery."
      }
    ],
    "watchouts": {
      "zh": "把贡献传输与终端 CDN 分开核价，并验证播放器兼容、直播链路和保障范围。",
      "en": "Price contribution transport separately from audience CDN delivery; verify player compatibility, live workflows and service coverage."
    },
    "compare": {
      "delivery": {
        "zh": "面向媒体的内容与视频分发",
        "en": "Media-focused content and video delivery"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "广播机构、OTT 平台和大型直播项目",
        "en": "Broadcasters, OTT platforms and major live events"
      }
    },
    "seo": {
      "title": {
        "zh": "Tata Communications CDN 介绍与选型：面向媒体的内容与视频分发",
        "en": "Tata Communications CDN profile: Media-focused content and video delivery"
      },
      "description": {
        "zh": "Tata Communications 的媒体服务组合涵盖视频 CDN、直播与点播交付，以及专业媒体传输。适合需要把内容制作、传输和终端分发衔接起来的媒体业务。",
        "en": "Tata Communications offers video CDN, live and on-demand delivery alongside professional media transport, connecting content workflows to audience delivery."
      },
      "analysis": {
        "zh": "Tata Communications 的媒体服务组合涵盖视频 CDN、直播与点播交付，以及专业媒体传输。适合需要把内容制作、传输和终端分发衔接起来的媒体业务。 把贡献传输与终端 CDN 分开核价，并验证播放器兼容、直播链路和保障范围。",
        "en": "Tata Communications offers video CDN, live and on-demand delivery alongside professional media transport, connecting content workflows to audience delivery. Price contribution transport separately from audience CDN delivery; verify player compatibility, live workflows and service coverage."
      },
      "questions": [
        {
          "zh": "把贡献传输与终端 CDN 分开核价，并验证播放器兼容、直播链路和保障范围。",
          "en": "Price contribution transport separately from audience CDN delivery; verify player compatibility, live workflows and service coverage."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/tata.svg",
    "logoDark": true
  },
  {
    "id": "selectel",
    "name": "Selectel",
    "mark": "Sele",
    "tone": "purple",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://selectel.ru/services/additional/cdn/",
    "sourceLabel": {
      "zh": "Selectel 官方产品与技术资料",
      "en": "Selectel official product and technical materials"
    },
    "tagline": {
      "zh": "云平台 CDN 与静态资源分发",
      "en": "Cloud CDN for static asset delivery"
    },
    "intro": {
      "zh": "Selectel 的 CDN 产品面向网站、游戏更新和静态内容分发，官方资料列出 HTTPS、CORS、压缩、源站屏蔽和日志等控制项，可与云端工作负载结合。",
      "en": "Selectel CDN targets websites, game updates and static delivery, listing HTTPS, CORS, compression, origin shielding and logs for cloud workloads."
    },
    "bestFor": {
      "zh": "关注俄罗斯及周边访问地区的云端业务",
      "en": "Cloud workloads serving Russia and nearby markets"
    },
    "highlights": [
      {
        "zh": "云平台 CDN 与静态资源分发",
        "en": "Cloud CDN for static asset delivery"
      },
      {
        "zh": "Selectel 的 CDN 产品面向网站、游戏更新和静态内容分发，官方资料列出 HTTPS、CORS、压缩、源站屏蔽和日志等控制项，可与云端工作负载结合。",
        "en": "Selectel CDN targets websites, game updates and static delivery, listing HTTPS, CORS, compression, origin shielding and logs for cloud workloads."
      }
    ],
    "watchouts": {
      "zh": "用目标用户网络实测节点覆盖，并核对开通地区、支付和合同适用范围。",
      "en": "Test coverage from target user networks and confirm onboarding regions, payments and contractual availability."
    },
    "compare": {
      "delivery": {
        "zh": "云平台 CDN 与静态资源分发",
        "en": "Cloud CDN for static asset delivery"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "关注俄罗斯及周边访问地区的云端业务",
        "en": "Cloud workloads serving Russia and nearby markets"
      }
    },
    "seo": {
      "title": {
        "zh": "Selectel CDN 介绍与选型：云平台 CDN 与静态资源分发",
        "en": "Selectel CDN profile: Cloud CDN for static asset delivery"
      },
      "description": {
        "zh": "Selectel 的 CDN 产品面向网站、游戏更新和静态内容分发，官方资料列出 HTTPS、CORS、压缩、源站屏蔽和日志等控制项，可与云端工作负载结合。",
        "en": "Selectel CDN targets websites, game updates and static delivery, listing HTTPS, CORS, compression, origin shielding and logs for cloud workloads."
      },
      "analysis": {
        "zh": "Selectel 的 CDN 产品面向网站、游戏更新和静态内容分发，官方资料列出 HTTPS、CORS、压缩、源站屏蔽和日志等控制项，可与云端工作负载结合。 用目标用户网络实测节点覆盖，并核对开通地区、支付和合同适用范围。",
        "en": "Selectel CDN targets websites, game updates and static delivery, listing HTTPS, CORS, compression, origin shielding and logs for cloud workloads. Test coverage from target user networks and confirm onboarding regions, payments and contractual availability."
      },
      "questions": [
        {
          "zh": "用目标用户网络实测节点覆盖，并核对开通地区、支付和合同适用范围。",
          "en": "Test coverage from target user networks and confirm onboarding regions, payments and contractual availability."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/selectel.svg",
    "logoDark": false
  },
  {
    "id": "cdnvideo",
    "name": "CDNvideo",
    "mark": "CDNv",
    "tone": "orange",
    "categories": [
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.cdnvideo.com/",
    "sourceLabel": {
      "zh": "CDNvideo 官方产品与技术资料",
      "en": "CDNvideo official product and technical materials"
    },
    "tagline": {
      "zh": "直播、点播与区域内容交付",
      "en": "Live, on-demand and regional delivery"
    },
    "intro": {
      "zh": "CDNvideo 提供直播、视频点播、Web 加速和源站保护等服务，并按亚洲、俄罗斯及独联体等市场提供方案。直播与普通下载应使用不同测试负载评估。",
      "en": "CDNvideo offers live streaming, video on demand, web acceleration and origin protection, with regional solutions including Asia, Russia and CIS markets. Streaming and downloads need distinct tests."
    },
    "bestFor": {
      "zh": "视频平台、直播活动、游戏分发与区域网站",
      "en": "Video platforms, live events, game distribution and regional websites"
    },
    "highlights": [
      {
        "zh": "直播、点播与区域内容交付",
        "en": "Live, on-demand and regional delivery"
      },
      {
        "zh": "CDNvideo 提供直播、视频点播、Web 加速和源站保护等服务，并按亚洲、俄罗斯及独联体等市场提供方案。直播与普通下载应使用不同测试负载评估。",
        "en": "CDNvideo offers live streaming, video on demand, web acceleration and origin protection, with regional solutions including Asia, Russia and CIS markets. Streaming and downloads need distinct tests."
      }
    ],
    "watchouts": {
      "zh": "确认直播协议、区域覆盖、首帧表现、并发计划和支持响应。",
      "en": "Confirm streaming protocols, regional coverage, startup behavior, concurrency plans and support response."
    },
    "compare": {
      "delivery": {
        "zh": "直播、点播与区域内容交付",
        "en": "Live, on-demand and regional delivery"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "视频平台、直播活动、游戏分发与区域网站",
        "en": "Video platforms, live events, game distribution and regional websites"
      }
    },
    "seo": {
      "title": {
        "zh": "CDNvideo CDN 介绍与选型：直播、点播与区域内容交付",
        "en": "CDNvideo CDN profile: Live, on-demand and regional delivery"
      },
      "description": {
        "zh": "CDNvideo 提供直播、视频点播、Web 加速和源站保护等服务，并按亚洲、俄罗斯及独联体等市场提供方案。直播与普通下载应使用不同测试负载评估。",
        "en": "CDNvideo offers live streaming, video on demand, web acceleration and origin protection, with regional solutions including Asia, Russia and CIS markets. Streaming and downloads need distinct tests."
      },
      "analysis": {
        "zh": "CDNvideo 提供直播、视频点播、Web 加速和源站保护等服务，并按亚洲、俄罗斯及独联体等市场提供方案。直播与普通下载应使用不同测试负载评估。 确认直播协议、区域覆盖、首帧表现、并发计划和支持响应。",
        "en": "CDNvideo offers live streaming, video on demand, web acceleration and origin protection, with regional solutions including Asia, Russia and CIS markets. Streaming and downloads need distinct tests. Confirm streaming protocols, regional coverage, startup behavior, concurrency plans and support response."
      },
      "questions": [
        {
          "zh": "确认直播协议、区域覆盖、首帧表现、并发计划和支持响应。",
          "en": "Confirm streaming protocols, regional coverage, startup behavior, concurrency plans and support response."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/cdnvideo.svg",
    "logoDark": true
  },
  {
    "id": "5centscdn",
    "name": "5centsCDN",
    "mark": "5cen",
    "tone": "cyan",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.5centscdn.net/",
    "sourceLabel": {
      "zh": "5centsCDN 官方产品与技术资料",
      "en": "5centsCDN official product and technical materials"
    },
    "tagline": {
      "zh": "CDN、直播转码与多平台推流",
      "en": "CDN, live transcoding and multistreaming"
    },
    "intro": {
      "zh": "5centsCDN 把直播、点播、转码、多平台推流和内容交付放在同一产品组合中，也提供网站加速。适合希望减少视频业务集成环节的团队。",
      "en": "5centsCDN combines live streaming, VOD, transcoding, multistreaming and content delivery, with website acceleration in the same product portfolio."
    },
    "bestFor": {
      "zh": "直播团队、教育视频和中小型媒体服务",
      "en": "Live production, education video and smaller media services"
    },
    "highlights": [
      {
        "zh": "CDN、直播转码与多平台推流",
        "en": "CDN, live transcoding and multistreaming"
      },
      {
        "zh": "5centsCDN 把直播、点播、转码、多平台推流和内容交付放在同一产品组合中，也提供网站加速。适合希望减少视频业务集成环节的团队。",
        "en": "5centsCDN combines live streaming, VOD, transcoding, multistreaming and content delivery, with website acceleration in the same product portfolio."
      }
    ],
    "watchouts": {
      "zh": "把分发流量、转码、存储和推流目的地限制分别计入成本。",
      "en": "Budget separately for delivery, transcoding, storage and destination limits."
    },
    "compare": {
      "delivery": {
        "zh": "CDN、直播转码与多平台推流",
        "en": "CDN, live transcoding and multistreaming"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "直播团队、教育视频和中小型媒体服务",
        "en": "Live production, education video and smaller media services"
      }
    },
    "seo": {
      "title": {
        "zh": "5centsCDN CDN 介绍与选型：CDN、直播转码与多平台推流",
        "en": "5centsCDN CDN profile: CDN, live transcoding and multistreaming"
      },
      "description": {
        "zh": "5centsCDN 把直播、点播、转码、多平台推流和内容交付放在同一产品组合中，也提供网站加速。适合希望减少视频业务集成环节的团队。",
        "en": "5centsCDN combines live streaming, VOD, transcoding, multistreaming and content delivery, with website acceleration in the same product portfolio."
      },
      "analysis": {
        "zh": "5centsCDN 把直播、点播、转码、多平台推流和内容交付放在同一产品组合中，也提供网站加速。适合希望减少视频业务集成环节的团队。 把分发流量、转码、存储和推流目的地限制分别计入成本。",
        "en": "5centsCDN combines live streaming, VOD, transcoding, multistreaming and content delivery, with website acceleration in the same product portfolio. Budget separately for delivery, transcoding, storage and destination limits."
      },
      "questions": [
        {
          "zh": "把分发流量、转码、存储和推流目的地限制分别计入成本。",
          "en": "Budget separately for delivery, transcoding, storage and destination limits."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/5centscdn.svg",
    "logoDark": true
  },
  {
    "id": "quic-cloud",
    "name": "QUIC.cloud",
    "mark": "QUIC",
    "tone": "blue",
    "categories": [
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.quic.cloud/",
    "sourceLabel": {
      "zh": "QUIC.cloud 官方产品与技术资料",
      "en": "QUIC.cloud official product and technical materials"
    },
    "tagline": {
      "zh": "WordPress 整页缓存与优化",
      "en": "WordPress page caching and optimization"
    },
    "intro": {
      "zh": "QUIC.cloud 与 LiteSpeed Cache 配合，提供 WordPress 静态与动态页面缓存、智能清理及页面优化。它围绕 WordPress 工作流设计，不宜照搬到任意应用。",
      "en": "QUIC.cloud integrates with LiteSpeed Cache for WordPress static and dynamic page caching, intelligent purge and page optimization. It is designed around WordPress workflows."
    },
    "bestFor": {
      "zh": "WordPress 内容站、电商及 LiteSpeed Cache 用户",
      "en": "WordPress publications, stores and LiteSpeed Cache users"
    },
    "highlights": [
      {
        "zh": "WordPress 整页缓存与优化",
        "en": "WordPress page caching and optimization"
      },
      {
        "zh": "QUIC.cloud 与 LiteSpeed Cache 配合，提供 WordPress 静态与动态页面缓存、智能清理及页面优化。它围绕 WordPress 工作流设计，不宜照搬到任意应用。",
        "en": "QUIC.cloud integrates with LiteSpeed Cache for WordPress static and dynamic page caching, intelligent purge and page optimization. It is designed around WordPress workflows."
      }
    ],
    "watchouts": {
      "zh": "测试登录态、购物车与私有缓存隔离，并确认 DNS 接入方式和免费额度。",
      "en": "Test logged-in sessions, carts and private cache isolation; confirm DNS onboarding and free allowances."
    },
    "compare": {
      "delivery": {
        "zh": "WordPress 整页缓存与优化",
        "en": "WordPress page caching and optimization"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "WordPress 内容站、电商及 LiteSpeed Cache 用户",
        "en": "WordPress publications, stores and LiteSpeed Cache users"
      }
    },
    "seo": {
      "title": {
        "zh": "QUIC.cloud CDN 介绍与选型：WordPress 整页缓存与优化",
        "en": "QUIC.cloud CDN profile: WordPress page caching and optimization"
      },
      "description": {
        "zh": "QUIC.cloud 与 LiteSpeed Cache 配合，提供 WordPress 静态与动态页面缓存、智能清理及页面优化。它围绕 WordPress 工作流设计，不宜照搬到任意应用。",
        "en": "QUIC.cloud integrates with LiteSpeed Cache for WordPress static and dynamic page caching, intelligent purge and page optimization. It is designed around WordPress workflows."
      },
      "analysis": {
        "zh": "QUIC.cloud 与 LiteSpeed Cache 配合，提供 WordPress 静态与动态页面缓存、智能清理及页面优化。它围绕 WordPress 工作流设计，不宜照搬到任意应用。 测试登录态、购物车与私有缓存隔离，并确认 DNS 接入方式和免费额度。",
        "en": "QUIC.cloud integrates with LiteSpeed Cache for WordPress static and dynamic page caching, intelligent purge and page optimization. It is designed around WordPress workflows. Test logged-in sessions, carts and private cache isolation; confirm DNS onboarding and free allowances."
      },
      "questions": [
        {
          "zh": "测试登录态、购物车与私有缓存隔离，并确认 DNS 接入方式和免费额度。",
          "en": "Test logged-in sessions, carts and private cache isolation; confirm DNS onboarding and free allowances."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/quic-cloud.png",
    "logoDark": false
  },
  {
    "id": "cloudinary",
    "name": "Cloudinary",
    "mark": "Clou",
    "tone": "green",
    "categories": [
      "delivery",
      "programmable"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://cloudinary.com/",
    "sourceLabel": {
      "zh": "Cloudinary 官方产品与技术资料",
      "en": "Cloudinary official product and technical materials"
    },
    "tagline": {
      "zh": "图片视频处理与媒体 CDN",
      "en": "Image and video processing with media delivery"
    },
    "intro": {
      "zh": "Cloudinary 提供图片与视频的上传、管理、转换和优化交付。其媒体管线和多 CDN 方向适合素材量大、衍生格式多的产品，而非单纯替换所有网站流量。",
      "en": "Cloudinary provides upload, management, transformation and optimized delivery for images and video, including multi-CDN options for media-heavy products."
    },
    "bestFor": {
      "zh": "电商素材、用户上传图片及媒体工作流",
      "en": "Commerce imagery, user uploads and media workflows"
    },
    "highlights": [
      {
        "zh": "图片视频处理与媒体 CDN",
        "en": "Image and video processing with media delivery"
      },
      {
        "zh": "Cloudinary 提供图片与视频的上传、管理、转换和优化交付。其媒体管线和多 CDN 方向适合素材量大、衍生格式多的产品，而非单纯替换所有网站流量。",
        "en": "Cloudinary provides upload, management, transformation and optimized delivery for images and video, including multi-CDN options for media-heavy products."
      }
    ],
    "watchouts": {
      "zh": "关注转换额度、衍生资源存储、交付流量和原始素材迁移成本。",
      "en": "Review transformation allowances, derived storage, delivery usage and original-asset migration costs."
    },
    "compare": {
      "delivery": {
        "zh": "图片视频处理与媒体 CDN",
        "en": "Image and video processing with media delivery"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "电商素材、用户上传图片及媒体工作流",
        "en": "Commerce imagery, user uploads and media workflows"
      }
    },
    "seo": {
      "title": {
        "zh": "Cloudinary CDN 介绍与选型：图片视频处理与媒体 CDN",
        "en": "Cloudinary CDN profile: Image and video processing with media delivery"
      },
      "description": {
        "zh": "Cloudinary 提供图片与视频的上传、管理、转换和优化交付。其媒体管线和多 CDN 方向适合素材量大、衍生格式多的产品，而非单纯替换所有网站流量。",
        "en": "Cloudinary provides upload, management, transformation and optimized delivery for images and video, including multi-CDN options for media-heavy products."
      },
      "analysis": {
        "zh": "Cloudinary 提供图片与视频的上传、管理、转换和优化交付。其媒体管线和多 CDN 方向适合素材量大、衍生格式多的产品，而非单纯替换所有网站流量。 关注转换额度、衍生资源存储、交付流量和原始素材迁移成本。",
        "en": "Cloudinary provides upload, management, transformation and optimized delivery for images and video, including multi-CDN options for media-heavy products. Review transformation allowances, derived storage, delivery usage and original-asset migration costs."
      },
      "questions": [
        {
          "zh": "关注转换额度、衍生资源存储、交付流量和原始素材迁移成本。",
          "en": "Review transformation allowances, derived storage, delivery usage and original-asset migration costs."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/cloudinary.png",
    "logoDark": false
  },
  {
    "id": "imagekit",
    "name": "ImageKit",
    "mark": "Imag",
    "tone": "purple",
    "categories": [
      "delivery",
      "programmable"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://imagekit.io/",
    "sourceLabel": {
      "zh": "ImageKit 官方产品与技术资料",
      "en": "ImageKit official product and technical materials"
    },
    "tagline": {
      "zh": "现有存储上的媒体优化交付",
      "en": "Media optimization over existing storage"
    },
    "intro": {
      "zh": "ImageKit 提供图片处理、视频交付和素材管理，可连接自有 S3、Google Cloud Storage 或 Azure Blob 等源。适合保留现有存储、统一生成媒体变体的业务。",
      "en": "ImageKit combines image transformations, video delivery and asset management, connecting to existing storage such as S3, Google Cloud Storage and Azure Blob."
    },
    "bestFor": {
      "zh": "产品图片、多端素材与已有对象存储的团队",
      "en": "Product imagery, responsive media and teams with object storage"
    },
    "highlights": [
      {
        "zh": "现有存储上的媒体优化交付",
        "en": "Media optimization over existing storage"
      },
      {
        "zh": "ImageKit 提供图片处理、视频交付和素材管理，可连接自有 S3、Google Cloud Storage 或 Azure Blob 等源。适合保留现有存储、统一生成媒体变体的业务。",
        "en": "ImageKit combines image transformations, video delivery and asset management, connecting to existing storage such as S3, Google Cloud Storage and Azure Blob."
      }
    ],
    "watchouts": {
      "zh": "核对签名 URL、图片变体缓存、外部源接入及视频处理计费。",
      "en": "Check signed URLs, variant caching, external origins and video-processing charges."
    },
    "compare": {
      "delivery": {
        "zh": "现有存储上的媒体优化交付",
        "en": "Media optimization over existing storage"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "产品图片、多端素材与已有对象存储的团队",
        "en": "Product imagery, responsive media and teams with object storage"
      }
    },
    "seo": {
      "title": {
        "zh": "ImageKit CDN 介绍与选型：现有存储上的媒体优化交付",
        "en": "ImageKit CDN profile: Media optimization over existing storage"
      },
      "description": {
        "zh": "ImageKit 提供图片处理、视频交付和素材管理，可连接自有 S3、Google Cloud Storage 或 Azure Blob 等源。适合保留现有存储、统一生成媒体变体的业务。",
        "en": "ImageKit combines image transformations, video delivery and asset management, connecting to existing storage such as S3, Google Cloud Storage and Azure Blob."
      },
      "analysis": {
        "zh": "ImageKit 提供图片处理、视频交付和素材管理，可连接自有 S3、Google Cloud Storage 或 Azure Blob 等源。适合保留现有存储、统一生成媒体变体的业务。 核对签名 URL、图片变体缓存、外部源接入及视频处理计费。",
        "en": "ImageKit combines image transformations, video delivery and asset management, connecting to existing storage such as S3, Google Cloud Storage and Azure Blob. Check signed URLs, variant caching, external origins and video-processing charges."
      },
      "questions": [
        {
          "zh": "核对签名 URL、图片变体缓存、外部源接入及视频处理计费。",
          "en": "Check signed URLs, variant caching, external origins and video-processing charges."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/imagekit.svg",
    "logoDark": false
  },
  {
    "id": "imgix",
    "name": "Imgix",
    "mark": "Imgi",
    "tone": "orange",
    "categories": [
      "delivery",
      "programmable"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.imgix.com/",
    "sourceLabel": {
      "zh": "Imgix 官方产品与技术资料",
      "en": "Imgix official product and technical materials"
    },
    "tagline": {
      "zh": "图片变换 API 与全球交付",
      "en": "Image transformation API and global delivery"
    },
    "intro": {
      "zh": "Imgix 围绕图像数据源、变换 API 和内容交付构建产品，帮助应用按终端尺寸生成媒体版本，并提供视频优化相关功能。",
      "en": "Imgix centers on image sources, transformation APIs and content delivery to produce device-appropriate media variants, with video optimization capabilities."
    },
    "bestFor": {
      "zh": "图片密集型应用、电商和内容管理平台",
      "en": "Image-heavy applications, commerce and content platforms"
    },
    "highlights": [
      {
        "zh": "图片变换 API 与全球交付",
        "en": "Image transformation API and global delivery"
      },
      {
        "zh": "Imgix 围绕图像数据源、变换 API 和内容交付构建产品，帮助应用按终端尺寸生成媒体版本，并提供视频优化相关功能。",
        "en": "Imgix centers on image sources, transformation APIs and content delivery to produce device-appropriate media variants, with video optimization capabilities."
      }
    ],
    "watchouts": {
      "zh": "用真实大图评估格式质量、缓存命中、源站访问和变体成本。",
      "en": "Evaluate format quality, cache hits, origin access and variant costs with real source images."
    },
    "compare": {
      "delivery": {
        "zh": "图片变换 API 与全球交付",
        "en": "Image transformation API and global delivery"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "图片密集型应用、电商和内容管理平台",
        "en": "Image-heavy applications, commerce and content platforms"
      }
    },
    "seo": {
      "title": {
        "zh": "Imgix CDN 介绍与选型：图片变换 API 与全球交付",
        "en": "Imgix CDN profile: Image transformation API and global delivery"
      },
      "description": {
        "zh": "Imgix 围绕图像数据源、变换 API 和内容交付构建产品，帮助应用按终端尺寸生成媒体版本，并提供视频优化相关功能。",
        "en": "Imgix centers on image sources, transformation APIs and content delivery to produce device-appropriate media variants, with video optimization capabilities."
      },
      "analysis": {
        "zh": "Imgix 围绕图像数据源、变换 API 和内容交付构建产品，帮助应用按终端尺寸生成媒体版本，并提供视频优化相关功能。 用真实大图评估格式质量、缓存命中、源站访问和变体成本。",
        "en": "Imgix centers on image sources, transformation APIs and content delivery to produce device-appropriate media variants, with video optimization capabilities. Evaluate format quality, cache hits, origin access and variant costs with real source images."
      },
      "questions": [
        {
          "zh": "用真实大图评估格式质量、缓存命中、源站访问和变体成本。",
          "en": "Evaluate format quality, cache hits, origin access and variant costs with real source images."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/imgix.webp",
    "logoDark": false
  },
  {
    "id": "uploadcare",
    "name": "Uploadcare",
    "mark": "Uplo",
    "tone": "cyan",
    "categories": [
      "delivery",
      "programmable"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://uploadcare.com/",
    "sourceLabel": {
      "zh": "Uploadcare 官方产品与技术资料",
      "en": "Uploadcare official product and technical materials"
    },
    "tagline": {
      "zh": "文件上传、媒体处理与交付",
      "en": "File upload, media processing and delivery"
    },
    "intro": {
      "zh": "Uploadcare 提供上传组件、图片和视频 CDN、处理 API 与自适应交付，将用户文件从接收、处理到展示连接起来。",
      "en": "Uploadcare connects file ingestion to presentation with upload components, image and video CDN, processing APIs and adaptive delivery."
    },
    "bestFor": {
      "zh": "用户生成内容、商品素材和应用文件上传",
      "en": "User-generated content, product media and application uploads"
    },
    "highlights": [
      {
        "zh": "文件上传、媒体处理与交付",
        "en": "File upload, media processing and delivery"
      },
      {
        "zh": "Uploadcare 提供上传组件、图片和视频 CDN、处理 API 与自适应交付，将用户文件从接收、处理到展示连接起来。",
        "en": "Uploadcare connects file ingestion to presentation with upload components, image and video CDN, processing APIs and adaptive delivery."
      }
    ],
    "watchouts": {
      "zh": "核对上传大小、签名权限、文件删除传播及处理和分发的费用口径。",
      "en": "Check upload limits, signed access, deletion propagation and processing versus delivery charges."
    },
    "compare": {
      "delivery": {
        "zh": "文件上传、媒体处理与交付",
        "en": "File upload, media processing and delivery"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "用户生成内容、商品素材和应用文件上传",
        "en": "User-generated content, product media and application uploads"
      }
    },
    "seo": {
      "title": {
        "zh": "Uploadcare CDN 介绍与选型：文件上传、媒体处理与交付",
        "en": "Uploadcare CDN profile: File upload, media processing and delivery"
      },
      "description": {
        "zh": "Uploadcare 提供上传组件、图片和视频 CDN、处理 API 与自适应交付，将用户文件从接收、处理到展示连接起来。",
        "en": "Uploadcare connects file ingestion to presentation with upload components, image and video CDN, processing APIs and adaptive delivery."
      },
      "analysis": {
        "zh": "Uploadcare 提供上传组件、图片和视频 CDN、处理 API 与自适应交付，将用户文件从接收、处理到展示连接起来。 核对上传大小、签名权限、文件删除传播及处理和分发的费用口径。",
        "en": "Uploadcare connects file ingestion to presentation with upload components, image and video CDN, processing APIs and adaptive delivery. Check upload limits, signed access, deletion propagation and processing versus delivery charges."
      },
      "questions": [
        {
          "zh": "核对上传大小、签名权限、文件删除传播及处理和分发的费用口径。",
          "en": "Check upload limits, signed access, deletion propagation and processing versus delivery charges."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/uploadcare.svg",
    "logoDark": false
  },
  {
    "id": "gumlet",
    "name": "Gumlet",
    "mark": "Guml",
    "tone": "blue",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.gumlet.com/",
    "sourceLabel": {
      "zh": "Gumlet 官方产品与技术资料",
      "en": "Gumlet official product and technical materials"
    },
    "tagline": {
      "zh": "视频托管、处理与 CDN 分发",
      "en": "Video hosting, processing and CDN delivery"
    },
    "intro": {
      "zh": "Gumlet 以视频托管和流媒体交付为核心，提供播放器、分析和内容保护相关能力。应按视频平台评估编码、观看体验与交付成本。",
      "en": "Gumlet focuses on video hosting and streaming delivery with player, analytics and content-protection capabilities. Evaluate encoding, viewing experience and delivery costs together."
    },
    "bestFor": {
      "zh": "课程视频、营销视频和付费内容平台",
      "en": "Course video, marketing video and paid-content platforms"
    },
    "highlights": [
      {
        "zh": "视频托管、处理与 CDN 分发",
        "en": "Video hosting, processing and CDN delivery"
      },
      {
        "zh": "Gumlet 以视频托管和流媒体交付为核心，提供播放器、分析和内容保护相关能力。应按视频平台评估编码、观看体验与交付成本。",
        "en": "Gumlet focuses on video hosting and streaming delivery with player, analytics and content-protection capabilities. Evaluate encoding, viewing experience and delivery costs together."
      }
    ],
    "watchouts": {
      "zh": "验证播放器、字幕、访问控制和编码迁移，区分存储与播放费用。",
      "en": "Validate player behavior, subtitles, access controls and encoding migration; separate storage and playback costs."
    },
    "compare": {
      "delivery": {
        "zh": "视频托管、处理与 CDN 分发",
        "en": "Video hosting, processing and CDN delivery"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "课程视频、营销视频和付费内容平台",
        "en": "Course video, marketing video and paid-content platforms"
      }
    },
    "seo": {
      "title": {
        "zh": "Gumlet CDN 介绍与选型：视频托管、处理与 CDN 分发",
        "en": "Gumlet CDN profile: Video hosting, processing and CDN delivery"
      },
      "description": {
        "zh": "Gumlet 以视频托管和流媒体交付为核心，提供播放器、分析和内容保护相关能力。应按视频平台评估编码、观看体验与交付成本。",
        "en": "Gumlet focuses on video hosting and streaming delivery with player, analytics and content-protection capabilities. Evaluate encoding, viewing experience and delivery costs together."
      },
      "analysis": {
        "zh": "Gumlet 以视频托管和流媒体交付为核心，提供播放器、分析和内容保护相关能力。应按视频平台评估编码、观看体验与交付成本。 验证播放器、字幕、访问控制和编码迁移，区分存储与播放费用。",
        "en": "Gumlet focuses on video hosting and streaming delivery with player, analytics and content-protection capabilities. Evaluate encoding, viewing experience and delivery costs together. Validate player behavior, subtitles, access controls and encoding migration; separate storage and playback costs."
      },
      "questions": [
        {
          "zh": "验证播放器、字幕、访问控制和编码迁移，区分存储与播放费用。",
          "en": "Validate player behavior, subtitles, access controls and encoding migration; separate storage and playback costs."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/gumlet.svg",
    "logoDark": false
  },
  {
    "id": "digitalocean",
    "name": "DigitalOcean",
    "mark": "Digi",
    "tone": "green",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.digitalocean.com/products/spaces",
    "sourceLabel": {
      "zh": "DigitalOcean 官方产品与技术资料",
      "en": "DigitalOcean official product and technical materials"
    },
    "tagline": {
      "zh": "Spaces 对象存储内置 CDN",
      "en": "Built-in CDN for Spaces object storage"
    },
    "intro": {
      "zh": "DigitalOcean Spaces 是兼容 S3 的对象存储，带有内置 CDN 用于公开对象分发。它适合应用静态资源和媒体文件，并非任意动态源站的代理服务。",
      "en": "DigitalOcean Spaces is S3-compatible object storage with a built-in CDN for public objects. It suits assets and media rather than arbitrary dynamic-origin proxying."
    },
    "bestFor": {
      "zh": "使用 Spaces 的开发团队和静态资源分发",
      "en": "Development teams using Spaces and static asset delivery"
    },
    "highlights": [
      {
        "zh": "Spaces 对象存储内置 CDN",
        "en": "Built-in CDN for Spaces object storage"
      },
      {
        "zh": "DigitalOcean Spaces 是兼容 S3 的对象存储，带有内置 CDN 用于公开对象分发。它适合应用静态资源和媒体文件，并非任意动态源站的代理服务。",
        "en": "DigitalOcean Spaces is S3-compatible object storage with a built-in CDN for public objects. It suits assets and media rather than arbitrary dynamic-origin proxying."
      }
    ],
    "watchouts": {
      "zh": "确认公开对象权限、自定义域名证书、缓存失效及存储外流量费用。",
      "en": "Confirm public-object permissions, custom-domain certificates, invalidation and storage egress charges."
    },
    "compare": {
      "delivery": {
        "zh": "Spaces 对象存储内置 CDN",
        "en": "Built-in CDN for Spaces object storage"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "配合自有云产品接入",
        "en": "Integrated with its cloud product"
      },
      "fit": {
        "zh": "使用 Spaces 的开发团队和静态资源分发",
        "en": "Development teams using Spaces and static asset delivery"
      }
    },
    "seo": {
      "title": {
        "zh": "DigitalOcean CDN 介绍与选型：Spaces 对象存储内置 CDN",
        "en": "DigitalOcean CDN profile: Built-in CDN for Spaces object storage"
      },
      "description": {
        "zh": "DigitalOcean Spaces 是兼容 S3 的对象存储，带有内置 CDN 用于公开对象分发。它适合应用静态资源和媒体文件，并非任意动态源站的代理服务。",
        "en": "DigitalOcean Spaces is S3-compatible object storage with a built-in CDN for public objects. It suits assets and media rather than arbitrary dynamic-origin proxying."
      },
      "analysis": {
        "zh": "DigitalOcean Spaces 是兼容 S3 的对象存储，带有内置 CDN 用于公开对象分发。它适合应用静态资源和媒体文件，并非任意动态源站的代理服务。 确认公开对象权限、自定义域名证书、缓存失效及存储外流量费用。",
        "en": "DigitalOcean Spaces is S3-compatible object storage with a built-in CDN for public objects. It suits assets and media rather than arbitrary dynamic-origin proxying. Confirm public-object permissions, custom-domain certificates, invalidation and storage egress charges."
      },
      "questions": [
        {
          "zh": "确认公开对象权限、自定义域名证书、缓存失效及存储外流量费用。",
          "en": "Confirm public-object permissions, custom-domain certificates, invalidation and storage egress charges."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/digitalocean.svg",
    "logoDark": false
  },
  {
    "id": "ibm-cloud",
    "name": "IBM Cloud",
    "mark": "IBM ",
    "tone": "purple",
    "categories": [
      "cloud",
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.ibm.com/products/cloud-internet-services",
    "sourceLabel": {
      "zh": "IBM Cloud 官方产品与技术资料",
      "en": "IBM Cloud official product and technical materials"
    },
    "tagline": {
      "zh": "Cloud Internet Services 安全加速",
      "en": "Cloud Internet Services security and delivery"
    },
    "intro": {
      "zh": "IBM Cloud Internet Services 将 CDN、DNS 和应用安全能力组合在云服务中。对于已有 IBM Cloud 业务，选型重点是域名迁移、边缘策略和服务等级。",
      "en": "IBM Cloud Internet Services combines CDN, DNS and application security. Existing IBM Cloud users should assess domain migration, edge policies and service tiers."
    },
    "bestFor": {
      "zh": "IBM Cloud 企业业务、网站及互联网应用",
      "en": "IBM Cloud enterprise workloads, websites and internet applications"
    },
    "highlights": [
      {
        "zh": "Cloud Internet Services 安全加速",
        "en": "Cloud Internet Services security and delivery"
      },
      {
        "zh": "IBM Cloud Internet Services 将 CDN、DNS 和应用安全能力组合在云服务中。对于已有 IBM Cloud 业务，选型重点是域名迁移、边缘策略和服务等级。",
        "en": "IBM Cloud Internet Services combines CDN, DNS and application security. Existing IBM Cloud users should assess domain migration, edge policies and service tiers."
      }
    ],
    "watchouts": {
      "zh": "核对所选服务等级的规则能力、安全功能、日志及支持范围。",
      "en": "Check rule controls, security features, logs and support coverage in the chosen tier."
    },
    "compare": {
      "delivery": {
        "zh": "Cloud Internet Services 安全加速",
        "en": "Cloud Internet Services security and delivery"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "IBM Cloud 企业业务、网站及互联网应用",
        "en": "IBM Cloud enterprise workloads, websites and internet applications"
      }
    },
    "seo": {
      "title": {
        "zh": "IBM Cloud CDN 介绍与选型：Cloud Internet Services 安全加速",
        "en": "IBM Cloud CDN profile: Cloud Internet Services security and delivery"
      },
      "description": {
        "zh": "IBM Cloud Internet Services 将 CDN、DNS 和应用安全能力组合在云服务中。对于已有 IBM Cloud 业务，选型重点是域名迁移、边缘策略和服务等级。",
        "en": "IBM Cloud Internet Services combines CDN, DNS and application security. Existing IBM Cloud users should assess domain migration, edge policies and service tiers."
      },
      "analysis": {
        "zh": "IBM Cloud Internet Services 将 CDN、DNS 和应用安全能力组合在云服务中。对于已有 IBM Cloud 业务，选型重点是域名迁移、边缘策略和服务等级。 核对所选服务等级的规则能力、安全功能、日志及支持范围。",
        "en": "IBM Cloud Internet Services combines CDN, DNS and application security. Existing IBM Cloud users should assess domain migration, edge policies and service tiers. Check rule controls, security features, logs and support coverage in the chosen tier."
      },
      "questions": [
        {
          "zh": "核对所选服务等级的规则能力、安全功能、日志及支持范围。",
          "en": "Check rule controls, security features, logs and support coverage in the chosen tier."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/ibm-cloud.png",
    "logoDark": false
  },
  {
    "id": "bizflycloud",
    "name": "Bizfly Cloud",
    "mark": "Bizf",
    "tone": "orange",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://bizflycloud.vn/cdn",
    "sourceLabel": {
      "zh": "Bizfly Cloud 官方产品与技术资料",
      "en": "Bizfly Cloud official product and technical materials"
    },
    "tagline": {
      "zh": "越南市场内容分发服务",
      "en": "Content delivery focused on Vietnam"
    },
    "intro": {
      "zh": "Bizfly Cloud CDN 提供图片、CSS、JavaScript、视频和下载文件的交付，官网重点介绍越南访问场景及按数据传输计费的方式。",
      "en": "Bizfly Cloud CDN delivers images, CSS, JavaScript, video and downloads, with official materials focused on Vietnamese audiences and data-transfer billing."
    },
    "bestFor": {
      "zh": "越南网站、电商和当地内容平台",
      "en": "Vietnamese websites, commerce and local content platforms"
    },
    "highlights": [
      {
        "zh": "越南市场内容分发服务",
        "en": "Content delivery focused on Vietnam"
      },
      {
        "zh": "Bizfly Cloud CDN 提供图片、CSS、JavaScript、视频和下载文件的交付，官网重点介绍越南访问场景及按数据传输计费的方式。",
        "en": "Bizfly Cloud CDN delivers images, CSS, JavaScript, video and downloads, with official materials focused on Vietnamese audiences and data-transfer billing."
      }
    ],
    "watchouts": {
      "zh": "核对越南各运营商访问、跨境回源、HTTPS 和实际月度流量价格。",
      "en": "Check Vietnamese ISP coverage, cross-border origins, HTTPS and actual monthly transfer pricing."
    },
    "compare": {
      "delivery": {
        "zh": "越南市场内容分发服务",
        "en": "Content delivery focused on Vietnam"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "越南网站、电商和当地内容平台",
        "en": "Vietnamese websites, commerce and local content platforms"
      }
    },
    "seo": {
      "title": {
        "zh": "Bizfly Cloud CDN 介绍与选型：越南市场内容分发服务",
        "en": "Bizfly Cloud CDN profile: Content delivery focused on Vietnam"
      },
      "description": {
        "zh": "Bizfly Cloud CDN 提供图片、CSS、JavaScript、视频和下载文件的交付，官网重点介绍越南访问场景及按数据传输计费的方式。",
        "en": "Bizfly Cloud CDN delivers images, CSS, JavaScript, video and downloads, with official materials focused on Vietnamese audiences and data-transfer billing."
      },
      "analysis": {
        "zh": "Bizfly Cloud CDN 提供图片、CSS、JavaScript、视频和下载文件的交付，官网重点介绍越南访问场景及按数据传输计费的方式。 核对越南各运营商访问、跨境回源、HTTPS 和实际月度流量价格。",
        "en": "Bizfly Cloud CDN delivers images, CSS, JavaScript, video and downloads, with official materials focused on Vietnamese audiences and data-transfer billing. Check Vietnamese ISP coverage, cross-border origins, HTTPS and actual monthly transfer pricing."
      },
      "questions": [
        {
          "zh": "核对越南各运营商访问、跨境回源、HTTPS 和实际月度流量价格。",
          "en": "Check Vietnamese ISP coverage, cross-border origins, HTTPS and actual monthly transfer pricing."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/bizflycloud.png",
    "logoDark": false
  },
  {
    "id": "sirv",
    "name": "Sirv",
    "mark": "Sirv",
    "tone": "cyan",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://sirv.com/",
    "sourceLabel": {
      "zh": "Sirv 官方产品与技术资料",
      "en": "Sirv official product and technical materials"
    },
    "tagline": {
      "zh": "图片 CDN 与商品 360° 展示",
      "en": "Image CDN and 360-degree product views"
    },
    "intro": {
      "zh": "Sirv 提供图片管理、实时变换和图片 CDN，并结合商品 360° 展示工具。适合希望把商品展示体验与媒体交付统一管理的电商。",
      "en": "Sirv offers image management, real-time transformations and image CDN alongside 360-degree product viewers for commerce experiences."
    },
    "bestFor": {
      "zh": "商品目录、360° 展示与电商图片",
      "en": "Product catalogs, 360-degree views and commerce imagery"
    },
    "highlights": [
      {
        "zh": "图片 CDN 与商品 360° 展示",
        "en": "Image CDN and 360-degree product views"
      },
      {
        "zh": "Sirv 提供图片管理、实时变换和图片 CDN，并结合商品 360° 展示工具。适合希望把商品展示体验与媒体交付统一管理的电商。",
        "en": "Sirv offers image management, real-time transformations and image CDN alongside 360-degree product viewers for commerce experiences."
      }
    ],
    "watchouts": {
      "zh": "检查原始素材保留、变体缓存、查看器兼容和媒体库迁移。",
      "en": "Check original retention, variant caching, viewer compatibility and media-library migration."
    },
    "compare": {
      "delivery": {
        "zh": "图片 CDN 与商品 360° 展示",
        "en": "Image CDN and 360-degree product views"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "商品目录、360° 展示与电商图片",
        "en": "Product catalogs, 360-degree views and commerce imagery"
      }
    },
    "seo": {
      "title": {
        "zh": "Sirv CDN 介绍与选型：图片 CDN 与商品 360° 展示",
        "en": "Sirv CDN profile: Image CDN and 360-degree product views"
      },
      "description": {
        "zh": "Sirv 提供图片管理、实时变换和图片 CDN，并结合商品 360° 展示工具。适合希望把商品展示体验与媒体交付统一管理的电商。",
        "en": "Sirv offers image management, real-time transformations and image CDN alongside 360-degree product viewers for commerce experiences."
      },
      "analysis": {
        "zh": "Sirv 提供图片管理、实时变换和图片 CDN，并结合商品 360° 展示工具。适合希望把商品展示体验与媒体交付统一管理的电商。 检查原始素材保留、变体缓存、查看器兼容和媒体库迁移。",
        "en": "Sirv offers image management, real-time transformations and image CDN alongside 360-degree product viewers for commerce experiences. Check original retention, variant caching, viewer compatibility and media-library migration."
      },
      "questions": [
        {
          "zh": "检查原始素材保留、变体缓存、查看器兼容和媒体库迁移。",
          "en": "Check original retention, variant caching, viewer compatibility and media-library migration."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/sirv.png",
    "logoDark": false
  },
  {
    "id": "nhn-cloud",
    "name": "NHN Cloud",
    "mark": "NHN ",
    "tone": "blue",
    "categories": [
      "cloud",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.nhncloud.com/kr/service/content-delivery/cdn",
    "sourceLabel": {
      "zh": "NHN Cloud 官方产品与技术资料",
      "en": "NHN Cloud official product and technical materials"
    },
    "tagline": {
      "zh": "云平台 CDN 与媒体分发",
      "en": "Cloud-platform CDN and media delivery"
    },
    "intro": {
      "zh": "NHN Cloud 在内容交付产品线中提供 CDN，通过边缘网络分发网站与媒体内容，可结合其对象存储和 Image Manager 工作流使用。",
      "en": "NHN Cloud offers CDN in its content-delivery portfolio for web and media distribution, alongside object storage and Image Manager workflows."
    },
    "bestFor": {
      "zh": "韩国及亚洲业务、NHN Cloud 用户",
      "en": "Korean and Asian workloads and NHN Cloud users"
    },
    "highlights": [
      {
        "zh": "云平台 CDN 与媒体分发",
        "en": "Cloud-platform CDN and media delivery"
      },
      {
        "zh": "NHN Cloud 在内容交付产品线中提供 CDN，通过边缘网络分发网站与媒体内容，可结合其对象存储和 Image Manager 工作流使用。",
        "en": "NHN Cloud offers CDN in its content-delivery portfolio for web and media distribution, alongside object storage and Image Manager workflows."
      }
    ],
    "watchouts": {
      "zh": "确认目标服务区域、源站接入、访问控制及流量分区计费。",
      "en": "Confirm service regions, origin integration, access controls and regional traffic billing."
    },
    "compare": {
      "delivery": {
        "zh": "云平台 CDN 与媒体分发",
        "en": "Cloud-platform CDN and media delivery"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "韩国及亚洲业务、NHN Cloud 用户",
        "en": "Korean and Asian workloads and NHN Cloud users"
      }
    },
    "seo": {
      "title": {
        "zh": "NHN Cloud CDN 介绍与选型：云平台 CDN 与媒体分发",
        "en": "NHN Cloud CDN profile: Cloud-platform CDN and media delivery"
      },
      "description": {
        "zh": "NHN Cloud 在内容交付产品线中提供 CDN，通过边缘网络分发网站与媒体内容，可结合其对象存储和 Image Manager 工作流使用。",
        "en": "NHN Cloud offers CDN in its content-delivery portfolio for web and media distribution, alongside object storage and Image Manager workflows."
      },
      "analysis": {
        "zh": "NHN Cloud 在内容交付产品线中提供 CDN，通过边缘网络分发网站与媒体内容，可结合其对象存储和 Image Manager 工作流使用。 确认目标服务区域、源站接入、访问控制及流量分区计费。",
        "en": "NHN Cloud offers CDN in its content-delivery portfolio for web and media distribution, alongside object storage and Image Manager workflows. Confirm service regions, origin integration, access controls and regional traffic billing."
      },
      "questions": [
        {
          "zh": "确认目标服务区域、源站接入、访问控制及流量分区计费。",
          "en": "Confirm service regions, origin integration, access controls and regional traffic billing."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/nhn-cloud.svg",
    "logoDark": false
  },
  {
    "id": "qwilt",
    "name": "Qwilt",
    "mark": "Qwil",
    "tone": "green",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://qwilt.com/",
    "sourceLabel": {
      "zh": "Qwilt 官方产品与技术资料",
      "en": "Qwilt official product and technical materials"
    },
    "tagline": {
      "zh": "运营商边缘网络与 Open Caching",
      "en": "Operator-edge delivery and Open Caching"
    },
    "intro": {
      "zh": "Qwilt 通过与运营商协作的 Open Edge 网络提供内容交付，产品面向 OTT、软件分发和游戏等工作负载。采购与接入通常需要结合内容商的实际规模讨论。",
      "en": "Qwilt delivers content through an operator-partnered Open Edge network for OTT, software delivery and gaming workloads, with onboarding tailored to publisher scale."
    },
    "bestFor": {
      "zh": "OTT、游戏发行商与大型内容提供方",
      "en": "OTT, game publishers and large content owners"
    },
    "highlights": [
      {
        "zh": "运营商边缘网络与 Open Caching",
        "en": "Operator-edge delivery and Open Caching"
      },
      {
        "zh": "Qwilt 通过与运营商协作的 Open Edge 网络提供内容交付，产品面向 OTT、软件分发和游戏等工作负载。采购与接入通常需要结合内容商的实际规模讨论。",
        "en": "Qwilt delivers content through an operator-partnered Open Edge network for OTT, software delivery and gaming workloads, with onboarding tailored to publisher scale."
      }
    ],
    "watchouts": {
      "zh": "确认目标运营商覆盖、接入流程、日志可见性及多 CDN 调度方式。",
      "en": "Confirm operator reach, onboarding, log visibility and multi-CDN traffic steering."
    },
    "compare": {
      "delivery": {
        "zh": "运营商边缘网络与 Open Caching",
        "en": "Operator-edge delivery and Open Caching"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "OTT、游戏发行商与大型内容提供方",
        "en": "OTT, game publishers and large content owners"
      }
    },
    "seo": {
      "title": {
        "zh": "Qwilt CDN 介绍与选型：运营商边缘网络与 Open Caching",
        "en": "Qwilt CDN profile: Operator-edge delivery and Open Caching"
      },
      "description": {
        "zh": "Qwilt 通过与运营商协作的 Open Edge 网络提供内容交付，产品面向 OTT、软件分发和游戏等工作负载。采购与接入通常需要结合内容商的实际规模讨论。",
        "en": "Qwilt delivers content through an operator-partnered Open Edge network for OTT, software delivery and gaming workloads, with onboarding tailored to publisher scale."
      },
      "analysis": {
        "zh": "Qwilt 通过与运营商协作的 Open Edge 网络提供内容交付，产品面向 OTT、软件分发和游戏等工作负载。采购与接入通常需要结合内容商的实际规模讨论。 确认目标运营商覆盖、接入流程、日志可见性及多 CDN 调度方式。",
        "en": "Qwilt delivers content through an operator-partnered Open Edge network for OTT, software delivery and gaming workloads, with onboarding tailored to publisher scale. Confirm operator reach, onboarding, log visibility and multi-CDN traffic steering."
      },
      "questions": [
        {
          "zh": "确认目标运营商覆盖、接入流程、日志可见性及多 CDN 调度方式。",
          "en": "Confirm operator reach, onboarding, log visibility and multi-CDN traffic steering."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/qwilt.png",
    "logoDark": false
  },
  {
    "id": "rocketcdn",
    "name": "RocketCDN",
    "mark": "Rock",
    "tone": "purple",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://rocketcdn.me/",
    "sourceLabel": {
      "zh": "RocketCDN 官方产品与技术资料",
      "en": "RocketCDN official product and technical materials"
    },
    "tagline": {
      "zh": "面向 WordPress 的托管 CDN",
      "en": "Managed CDN for WordPress workflows"
    },
    "intro": {
      "zh": "RocketCDN 提供自动配置与 WordPress 插件接入，官网说明分发网络采用 Bunny.net。它是独立的服务品牌，选型应关注集成体验、支持与套餐条款。",
      "en": "RocketCDN provides automatic configuration and WordPress plugin integration, using Bunny.net for delivery according to its website. Assess its integration, support and service terms."
    },
    "bestFor": {
      "zh": "希望简化配置的 WordPress 与 CMS 站点",
      "en": "WordPress and CMS sites seeking simpler setup"
    },
    "highlights": [
      {
        "zh": "面向 WordPress 的托管 CDN",
        "en": "Managed CDN for WordPress workflows"
      },
      {
        "zh": "RocketCDN 提供自动配置与 WordPress 插件接入，官网说明分发网络采用 Bunny.net。它是独立的服务品牌，选型应关注集成体验、支持与套餐条款。",
        "en": "RocketCDN provides automatic configuration and WordPress plugin integration, using Bunny.net for delivery according to its website. Assess its integration, support and service terms."
      }
    ],
    "watchouts": {
      "zh": "核对静态资源改写、自定义 CDN 域名、套餐范围及与现有缓存插件的兼容。",
      "en": "Check asset URL rewriting, custom CDN domains, plan scope and compatibility with caching plugins."
    },
    "compare": {
      "delivery": {
        "zh": "面向 WordPress 的托管 CDN",
        "en": "Managed CDN for WordPress workflows"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "希望简化配置的 WordPress 与 CMS 站点",
        "en": "WordPress and CMS sites seeking simpler setup"
      }
    },
    "seo": {
      "title": {
        "zh": "RocketCDN CDN 介绍与选型：面向 WordPress 的托管 CDN",
        "en": "RocketCDN CDN profile: Managed CDN for WordPress workflows"
      },
      "description": {
        "zh": "RocketCDN 提供自动配置与 WordPress 插件接入，官网说明分发网络采用 Bunny.net。它是独立的服务品牌，选型应关注集成体验、支持与套餐条款。",
        "en": "RocketCDN provides automatic configuration and WordPress plugin integration, using Bunny.net for delivery according to its website. Assess its integration, support and service terms."
      },
      "analysis": {
        "zh": "RocketCDN 提供自动配置与 WordPress 插件接入，官网说明分发网络采用 Bunny.net。它是独立的服务品牌，选型应关注集成体验、支持与套餐条款。 核对静态资源改写、自定义 CDN 域名、套餐范围及与现有缓存插件的兼容。",
        "en": "RocketCDN provides automatic configuration and WordPress plugin integration, using Bunny.net for delivery according to its website. Assess its integration, support and service terms. Check asset URL rewriting, custom CDN domains, plan scope and compatibility with caching plugins."
      },
      "questions": [
        {
          "zh": "核对静态资源改写、自定义 CDN 域名、套餐范围及与现有缓存插件的兼容。",
          "en": "Check asset URL rewriting, custom CDN domains, plan scope and compatibility with caching plugins."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/rocketcdn.svg",
    "logoDark": true
  },
  {
    "id": "myra-security",
    "name": "Myra Security",
    "mark": "Myra",
    "tone": "orange",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.myrasecurity.com/en/saasp/application-security/high-performance-cdn/",
    "sourceLabel": {
      "zh": "Myra Security 官方产品与技术资料",
      "en": "Myra Security official product and technical materials"
    },
    "tagline": {
      "zh": "德国安全平台与高性能 CDN",
      "en": "German security platform with CDN"
    },
    "intro": {
      "zh": "Myra Security 提供 CDN、DDoS 防护和 Web 应用安全产品，官方 CDN 页面重点介绍缓存、可用性和数据处理要求。适合重视安全治理的企业网站。",
      "en": "Myra Security offers CDN, DDoS mitigation and web application security, with its CDN materials emphasizing caching, availability and data-processing requirements."
    },
    "bestFor": {
      "zh": "企业网站、电商与注重数据处理约束的业务",
      "en": "Enterprise websites, commerce and workloads with data-processing constraints"
    },
    "highlights": [
      {
        "zh": "德国安全平台与高性能 CDN",
        "en": "German security platform with CDN"
      },
      {
        "zh": "Myra Security 提供 CDN、DDoS 防护和 Web 应用安全产品，官方 CDN 页面重点介绍缓存、可用性和数据处理要求。适合重视安全治理的企业网站。",
        "en": "Myra Security offers CDN, DDoS mitigation and web application security, with its CDN materials emphasizing caching, availability and data-processing requirements."
      }
    ],
    "watchouts": {
      "zh": "核对缓存策略、安全误报处理、数据处理区域及合同中的服务保障。",
      "en": "Review cache policy, false-positive handling, processing regions and contractual service commitments."
    },
    "compare": {
      "delivery": {
        "zh": "德国安全平台与高性能 CDN",
        "en": "German security platform with CDN"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "企业网站、电商与注重数据处理约束的业务",
        "en": "Enterprise websites, commerce and workloads with data-processing constraints"
      }
    },
    "seo": {
      "title": {
        "zh": "Myra Security CDN 介绍与选型：德国安全平台与高性能 CDN",
        "en": "Myra Security CDN profile: German security platform with CDN"
      },
      "description": {
        "zh": "Myra Security 提供 CDN、DDoS 防护和 Web 应用安全产品，官方 CDN 页面重点介绍缓存、可用性和数据处理要求。适合重视安全治理的企业网站。",
        "en": "Myra Security offers CDN, DDoS mitigation and web application security, with its CDN materials emphasizing caching, availability and data-processing requirements."
      },
      "analysis": {
        "zh": "Myra Security 提供 CDN、DDoS 防护和 Web 应用安全产品，官方 CDN 页面重点介绍缓存、可用性和数据处理要求。适合重视安全治理的企业网站。 核对缓存策略、安全误报处理、数据处理区域及合同中的服务保障。",
        "en": "Myra Security offers CDN, DDoS mitigation and web application security, with its CDN materials emphasizing caching, availability and data-processing requirements. Review cache policy, false-positive handling, processing regions and contractual service commitments."
      },
      "questions": [
        {
          "zh": "核对缓存策略、安全误报处理、数据处理区域及合同中的服务保障。",
          "en": "Review cache policy, false-positive handling, processing regions and contractual service commitments."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/myra-security.svg",
    "logoDark": true
  },
  {
    "id": "ddos-guard",
    "name": "DDoS-Guard",
    "mark": "DDoS",
    "tone": "cyan",
    "categories": [
      "security",
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://ddos-guard.net/",
    "sourceLabel": {
      "zh": "DDoS-Guard 官方产品与技术资料",
      "en": "DDoS-Guard official product and technical materials"
    },
    "tagline": {
      "zh": "DDoS 防护附带 CDN 与 DNS",
      "en": "DDoS protection with CDN and DNS"
    },
    "intro": {
      "zh": "DDoS-Guard 官方将 CDN 与 DNS 列入具有 L7 防护的产品组合，涵盖网站代理防护及受保护的托管资源。适合把流量防护作为首要需求的项目。",
      "en": "DDoS-Guard lists CDN and DNS in its L7-protected products, covering website proxy protection and protected hosting resources. It targets protection-led workloads."
    },
    "bestFor": {
      "zh": "遭受应用层攻击的网站与受保护托管业务",
      "en": "Websites facing application-layer attacks and protected hosting workloads"
    },
    "highlights": [
      {
        "zh": "DDoS 防护附带 CDN 与 DNS",
        "en": "DDoS protection with CDN and DNS"
      },
      {
        "zh": "DDoS-Guard 官方将 CDN 与 DNS 列入具有 L7 防护的产品组合，涵盖网站代理防护及受保护的托管资源。适合把流量防护作为首要需求的项目。",
        "en": "DDoS-Guard lists CDN and DNS in its L7-protected products, covering website proxy protection and protected hosting resources. It targets protection-led workloads."
      }
    ],
    "watchouts": {
      "zh": "验证 HTTPS 回源、真实 IP 传递、正常流量误拦截和套餐适用地区。",
      "en": "Verify HTTPS origins, client-IP forwarding, false positives and service availability by region."
    },
    "compare": {
      "delivery": {
        "zh": "DDoS 防护附带 CDN 与 DNS",
        "en": "DDoS protection with CDN and DNS"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "遭受应用层攻击的网站与受保护托管业务",
        "en": "Websites facing application-layer attacks and protected hosting workloads"
      }
    },
    "seo": {
      "title": {
        "zh": "DDoS-Guard CDN 介绍与选型：DDoS 防护附带 CDN 与 DNS",
        "en": "DDoS-Guard CDN profile: DDoS protection with CDN and DNS"
      },
      "description": {
        "zh": "DDoS-Guard 官方将 CDN 与 DNS 列入具有 L7 防护的产品组合，涵盖网站代理防护及受保护的托管资源。适合把流量防护作为首要需求的项目。",
        "en": "DDoS-Guard lists CDN and DNS in its L7-protected products, covering website proxy protection and protected hosting resources. It targets protection-led workloads."
      },
      "analysis": {
        "zh": "DDoS-Guard 官方将 CDN 与 DNS 列入具有 L7 防护的产品组合，涵盖网站代理防护及受保护的托管资源。适合把流量防护作为首要需求的项目。 验证 HTTPS 回源、真实 IP 传递、正常流量误拦截和套餐适用地区。",
        "en": "DDoS-Guard lists CDN and DNS in its L7-protected products, covering website proxy protection and protected hosting resources. It targets protection-led workloads. Verify HTTPS origins, client-IP forwarding, false positives and service availability by region."
      },
      "questions": [
        {
          "zh": "验证 HTTPS 回源、真实 IP 传递、正常流量误拦截和套餐适用地区。",
          "en": "Verify HTTPS origins, client-IP forwarding, false positives and service availability by region."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/ddos-guard.svg",
    "logoDark": false
  },
  {
    "id": "baishancloud",
    "name": "白山云 Baishan Cloud",
    "mark": "白山云 ",
    "tone": "blue",
    "categories": [
      "delivery",
      "security"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.baishan.com/",
    "sourceLabel": {
      "zh": "白山云 Baishan Cloud 官方产品与技术资料",
      "en": "白山云 Baishan Cloud official product and technical materials"
    },
    "tagline": {
      "zh": "下载、全站与流媒体加速",
      "en": "Download, dynamic-site and streaming delivery"
    },
    "intro": {
      "zh": "白山云官网列出下载加速、全站加速、直播点播分发和 SCDN 安全加速等产品。其海外品牌与国内服务需要按具体合同和产品范围区分。",
      "en": "Baishan Cloud lists download acceleration, dynamic-site delivery, live and on-demand streaming, and SCDN security acceleration. Distinguish domestic services and overseas brands by contract."
    },
    "bestFor": {
      "zh": "中文互联网业务、下载分发与流媒体平台",
      "en": "Chinese internet workloads, download distribution and media platforms"
    },
    "highlights": [
      {
        "zh": "下载、全站与流媒体加速",
        "en": "Download, dynamic-site and streaming delivery"
      },
      {
        "zh": "白山云官网列出下载加速、全站加速、直播点播分发和 SCDN 安全加速等产品。其海外品牌与国内服务需要按具体合同和产品范围区分。",
        "en": "Baishan Cloud lists download acceleration, dynamic-site delivery, live and on-demand streaming, and SCDN security acceleration. Distinguish domestic services and overseas brands by contract."
      }
    ],
    "watchouts": {
      "zh": "明确实际签约主体、区域节点、日志能力和安全产品是否另计费用。",
      "en": "Clarify contracting entity, regions, logging and whether security products are charged separately."
    },
    "compare": {
      "delivery": {
        "zh": "下载、全站与流媒体加速",
        "en": "Download, dynamic-site and streaming delivery"
      },
      "security": {
        "zh": "提供安全产品，按方案确认",
        "en": "Security products available; confirm scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "中文互联网业务、下载分发与流媒体平台",
        "en": "Chinese internet workloads, download distribution and media platforms"
      }
    },
    "seo": {
      "title": {
        "zh": "白山云 Baishan Cloud CDN 介绍与选型：下载、全站与流媒体加速",
        "en": "白山云 Baishan Cloud CDN profile: Download, dynamic-site and streaming delivery"
      },
      "description": {
        "zh": "白山云官网列出下载加速、全站加速、直播点播分发和 SCDN 安全加速等产品。其海外品牌与国内服务需要按具体合同和产品范围区分。",
        "en": "Baishan Cloud lists download acceleration, dynamic-site delivery, live and on-demand streaming, and SCDN security acceleration. Distinguish domestic services and overseas brands by contract."
      },
      "analysis": {
        "zh": "白山云官网列出下载加速、全站加速、直播点播分发和 SCDN 安全加速等产品。其海外品牌与国内服务需要按具体合同和产品范围区分。 明确实际签约主体、区域节点、日志能力和安全产品是否另计费用。",
        "en": "Baishan Cloud lists download acceleration, dynamic-site delivery, live and on-demand streaming, and SCDN security acceleration. Distinguish domestic services and overseas brands by contract. Clarify contracting entity, regions, logging and whether security products are charged separately."
      },
      "questions": [
        {
          "zh": "明确实际签约主体、区域节点、日志能力和安全产品是否另计费用。",
          "en": "Clarify contracting entity, regions, logging and whether security products are charged separately."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/baishancloud.png",
    "logoDark": false
  },
  {
    "id": "advancedhosting",
    "name": "Advanced Hosting",
    "mark": "Adva",
    "tone": "green",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://advancedhosting.com/cdn-2026/",
    "sourceLabel": {
      "zh": "Advanced Hosting 官方产品与技术资料",
      "en": "Advanced Hosting official product and technical materials"
    },
    "tagline": {
      "zh": "视频与静态资源 CDN",
      "en": "CDN for video and static assets"
    },
    "intro": {
      "zh": "Advanced Hosting 的 CDN 产品组合包含视频分发和面向小文件的 Anycast CDN，并提供基础设施服务。适合把源站容量和边缘交付一起规划的业务。",
      "en": "Advanced Hosting offers video delivery and Anycast CDN for smaller assets alongside infrastructure services, supporting joint origin and delivery planning."
    },
    "bestFor": {
      "zh": "视频站点、游戏资源与静态文件交付",
      "en": "Video sites, game assets and static file delivery"
    },
    "highlights": [
      {
        "zh": "视频与静态资源 CDN",
        "en": "CDN for video and static assets"
      },
      {
        "zh": "Advanced Hosting 的 CDN 产品组合包含视频分发和面向小文件的 Anycast CDN，并提供基础设施服务。适合把源站容量和边缘交付一起规划的业务。",
        "en": "Advanced Hosting offers video delivery and Anycast CDN for smaller assets alongside infrastructure services, supporting joint origin and delivery planning."
      }
    ],
    "watchouts": {
      "zh": "按视频片段和小文件分别验证缓存、回源、并发及最低消费。",
      "en": "Test video segments and small files separately for cache behavior, origin load, concurrency and minimum commitments."
    },
    "compare": {
      "delivery": {
        "zh": "视频与静态资源 CDN",
        "en": "CDN for video and static assets"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "视频站点、游戏资源与静态文件交付",
        "en": "Video sites, game assets and static file delivery"
      }
    },
    "seo": {
      "title": {
        "zh": "Advanced Hosting CDN 介绍与选型：视频与静态资源 CDN",
        "en": "Advanced Hosting CDN profile: CDN for video and static assets"
      },
      "description": {
        "zh": "Advanced Hosting 的 CDN 产品组合包含视频分发和面向小文件的 Anycast CDN，并提供基础设施服务。适合把源站容量和边缘交付一起规划的业务。",
        "en": "Advanced Hosting offers video delivery and Anycast CDN for smaller assets alongside infrastructure services, supporting joint origin and delivery planning."
      },
      "analysis": {
        "zh": "Advanced Hosting 的 CDN 产品组合包含视频分发和面向小文件的 Anycast CDN，并提供基础设施服务。适合把源站容量和边缘交付一起规划的业务。 按视频片段和小文件分别验证缓存、回源、并发及最低消费。",
        "en": "Advanced Hosting offers video delivery and Anycast CDN for smaller assets alongside infrastructure services, supporting joint origin and delivery planning. Test video segments and small files separately for cache behavior, origin load, concurrency and minimum commitments."
      },
      "questions": [
        {
          "zh": "按视频片段和小文件分别验证缓存、回源、并发及最低消费。",
          "en": "Test video segments and small files separately for cache behavior, origin load, concurrency and minimum commitments."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/advancedhosting.svg",
    "logoDark": false
  },
  {
    "id": "cloudimage",
    "name": "Cloudimage",
    "mark": "Clou",
    "tone": "purple",
    "categories": [
      "delivery",
      "programmable"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.cloudimage.io/",
    "sourceLabel": {
      "zh": "Cloudimage 官方产品与技术资料",
      "en": "Cloudimage official product and technical materials"
    },
    "tagline": {
      "zh": "Scaleflex 图片优化与 CDN",
      "en": "Scaleflex image optimization and CDN"
    },
    "intro": {
      "zh": "Cloudimage 是 Scaleflex 的媒体优化产品，通过 URL 参数实时调整图片、压缩和生成格式，并通过 CDN 分发。它适合已有素材源站的图片密集型网站。",
      "en": "Cloudimage is a Scaleflex media optimization product with URL-based image resizing, compression, format generation and CDN delivery for existing asset origins."
    },
    "bestFor": {
      "zh": "电商图片、响应式网站与素材管理集成",
      "en": "Commerce imagery, responsive sites and asset-management integrations"
    },
    "highlights": [
      {
        "zh": "Scaleflex 图片优化与 CDN",
        "en": "Scaleflex image optimization and CDN"
      },
      {
        "zh": "Cloudimage 是 Scaleflex 的媒体优化产品，通过 URL 参数实时调整图片、压缩和生成格式，并通过 CDN 分发。它适合已有素材源站的图片密集型网站。",
        "en": "Cloudimage is a Scaleflex media optimization product with URL-based image resizing, compression, format generation and CDN delivery for existing asset origins."
      }
    ],
    "watchouts": {
      "zh": "核对源站保护、图片尺寸限制、URL 签名和处理额度。",
      "en": "Check origin protection, dimension limits, signed URLs and processing allowances."
    },
    "compare": {
      "delivery": {
        "zh": "Scaleflex 图片优化与 CDN",
        "en": "Scaleflex image optimization and CDN"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "电商图片、响应式网站与素材管理集成",
        "en": "Commerce imagery, responsive sites and asset-management integrations"
      }
    },
    "seo": {
      "title": {
        "zh": "Cloudimage CDN 介绍与选型：Scaleflex 图片优化与 CDN",
        "en": "Cloudimage CDN profile: Scaleflex image optimization and CDN"
      },
      "description": {
        "zh": "Cloudimage 是 Scaleflex 的媒体优化产品，通过 URL 参数实时调整图片、压缩和生成格式，并通过 CDN 分发。它适合已有素材源站的图片密集型网站。",
        "en": "Cloudimage is a Scaleflex media optimization product with URL-based image resizing, compression, format generation and CDN delivery for existing asset origins."
      },
      "analysis": {
        "zh": "Cloudimage 是 Scaleflex 的媒体优化产品，通过 URL 参数实时调整图片、压缩和生成格式，并通过 CDN 分发。它适合已有素材源站的图片密集型网站。 核对源站保护、图片尺寸限制、URL 签名和处理额度。",
        "en": "Cloudimage is a Scaleflex media optimization product with URL-based image resizing, compression, format generation and CDN delivery for existing asset origins. Check origin protection, dimension limits, signed URLs and processing allowances."
      },
      "questions": [
        {
          "zh": "核对源站保护、图片尺寸限制、URL 签名和处理额度。",
          "en": "Check origin protection, dimension limits, signed URLs and processing allowances."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/cloudimage.png",
    "logoDark": false
  },
  {
    "id": "optimole",
    "name": "Optimole",
    "mark": "Opti",
    "tone": "orange",
    "categories": [
      "delivery"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://optimole.com/",
    "sourceLabel": {
      "zh": "Optimole 官方产品与技术资料",
      "en": "Optimole official product and technical materials"
    },
    "tagline": {
      "zh": "WordPress 图片处理与 CDN",
      "en": "WordPress image processing and CDN"
    },
    "intro": {
      "zh": "Optimole 提供实时图片处理、自适应尺寸、格式优化和 CDN 交付，并提供 WordPress 集成及媒体管理。适合希望自动完成响应式图片处理的站点。",
      "en": "Optimole provides real-time image processing, adaptive sizing, format optimization and CDN delivery, with WordPress integration and media management."
    },
    "bestFor": {
      "zh": "WordPress 图片优化、内容站与在线商店",
      "en": "WordPress image optimization, publications and online stores"
    },
    "highlights": [
      {
        "zh": "WordPress 图片处理与 CDN",
        "en": "WordPress image processing and CDN"
      },
      {
        "zh": "Optimole 提供实时图片处理、自适应尺寸、格式优化和 CDN 交付，并提供 WordPress 集成及媒体管理。适合希望自动完成响应式图片处理的站点。",
        "en": "Optimole provides real-time image processing, adaptive sizing, format optimization and CDN delivery, with WordPress integration and media management."
      }
    ],
    "watchouts": {
      "zh": "检查主题兼容、原图回退、图片质量及访问量计费规则。",
      "en": "Check theme compatibility, original-image fallback, quality and visit-based billing rules."
    },
    "compare": {
      "delivery": {
        "zh": "WordPress 图片处理与 CDN",
        "en": "WordPress image processing and CDN"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "缓存及交付配置，按产品确认",
        "en": "Product-specific caching and delivery controls"
      },
      "origin": {
        "zh": "源站、域名或产品专属流程",
        "en": "Origin, domain or product-specific onboarding"
      },
      "fit": {
        "zh": "WordPress 图片优化、内容站与在线商店",
        "en": "WordPress image optimization, publications and online stores"
      }
    },
    "seo": {
      "title": {
        "zh": "Optimole CDN 介绍与选型：WordPress 图片处理与 CDN",
        "en": "Optimole CDN profile: WordPress image processing and CDN"
      },
      "description": {
        "zh": "Optimole 提供实时图片处理、自适应尺寸、格式优化和 CDN 交付，并提供 WordPress 集成及媒体管理。适合希望自动完成响应式图片处理的站点。",
        "en": "Optimole provides real-time image processing, adaptive sizing, format optimization and CDN delivery, with WordPress integration and media management."
      },
      "analysis": {
        "zh": "Optimole 提供实时图片处理、自适应尺寸、格式优化和 CDN 交付，并提供 WordPress 集成及媒体管理。适合希望自动完成响应式图片处理的站点。 检查主题兼容、原图回退、图片质量及访问量计费规则。",
        "en": "Optimole provides real-time image processing, adaptive sizing, format optimization and CDN delivery, with WordPress integration and media management. Check theme compatibility, original-image fallback, quality and visit-based billing rules."
      },
      "questions": [
        {
          "zh": "检查主题兼容、原图回退、图片质量及访问量计费规则。",
          "en": "Check theme compatibility, original-image fallback, quality and visit-based billing rules."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/optimole.svg",
    "logoDark": false
  },
  {
    "id": "mux",
    "name": "Mux",
    "mark": "Mux",
    "tone": "cyan",
    "categories": [
      "delivery",
      "programmable"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://www.mux.com/",
    "sourceLabel": {
      "zh": "Mux 官方产品与技术资料",
      "en": "Mux official product and technical materials"
    },
    "tagline": {
      "zh": "面向开发者的视频基础设施",
      "en": "Video infrastructure for developers"
    },
    "intro": {
      "zh": "Mux 提供视频上传、编码、流式播放及观看分析 API，让应用接入视频管线和播放交付。这里将其归为视频交付平台，而非通用网站代理 CDN。",
      "en": "Mux provides APIs for video ingestion, encoding, streaming and viewing analytics. This profile covers a video-delivery platform rather than a general website proxy CDN."
    },
    "bestFor": {
      "zh": "应用内视频、点播内容与开发者视频产品",
      "en": "In-app video, on-demand content and developer video products"
    },
    "highlights": [
      {
        "zh": "面向开发者的视频基础设施",
        "en": "Video infrastructure for developers"
      },
      {
        "zh": "Mux 提供视频上传、编码、流式播放及观看分析 API，让应用接入视频管线和播放交付。这里将其归为视频交付平台，而非通用网站代理 CDN。",
        "en": "Mux provides APIs for video ingestion, encoding, streaming and viewing analytics. This profile covers a video-delivery platform rather than a general website proxy CDN."
      }
    ],
    "watchouts": {
      "zh": "验证播放策略、签名访问、编码质量，以及存储和观看时长的计费。",
      "en": "Validate playback policies, signed access, encoding quality and storage versus viewing-minute billing."
    },
    "compare": {
      "delivery": {
        "zh": "面向开发者的视频基础设施",
        "en": "Video infrastructure for developers"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "应用内视频、点播内容与开发者视频产品",
        "en": "In-app video, on-demand content and developer video products"
      }
    },
    "seo": {
      "title": {
        "zh": "Mux CDN 介绍与选型：面向开发者的视频基础设施",
        "en": "Mux CDN profile: Video infrastructure for developers"
      },
      "description": {
        "zh": "Mux 提供视频上传、编码、流式播放及观看分析 API，让应用接入视频管线和播放交付。这里将其归为视频交付平台，而非通用网站代理 CDN。",
        "en": "Mux provides APIs for video ingestion, encoding, streaming and viewing analytics. This profile covers a video-delivery platform rather than a general website proxy CDN."
      },
      "analysis": {
        "zh": "Mux 提供视频上传、编码、流式播放及观看分析 API，让应用接入视频管线和播放交付。这里将其归为视频交付平台，而非通用网站代理 CDN。 验证播放策略、签名访问、编码质量，以及存储和观看时长的计费。",
        "en": "Mux provides APIs for video ingestion, encoding, streaming and viewing analytics. This profile covers a video-delivery platform rather than a general website proxy CDN. Validate playback policies, signed access, encoding quality and storage versus viewing-minute billing."
      },
      "questions": [
        {
          "zh": "验证播放策略、签名访问、编码质量，以及存储和观看时长的计费。",
          "en": "Validate playback policies, signed access, encoding quality and storage versus viewing-minute billing."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/mux.svg",
    "logoDark": false
  },
  {
    "id": "api-video",
    "name": "api.video",
    "mark": "api.",
    "tone": "blue",
    "categories": [
      "delivery",
      "programmable"
    ],
    "verified": "2026-10-14",
    "officialUrl": "https://api.video/",
    "sourceLabel": {
      "zh": "api.video 官方产品与技术资料",
      "en": "api.video official product and technical materials"
    },
    "tagline": {
      "zh": "OVHcloud 体系的视频 API 与分发",
      "en": "Video APIs and delivery within OVHcloud"
    },
    "intro": {
      "zh": "api.video 提供视频上传、管理、播放器和 CDN 分发能力，官网使用 OVHcloud 联合品牌。适合通过 API 将视频功能嵌入现有应用。",
      "en": "api.video provides video upload, management, playback and CDN delivery with OVHcloud co-branding on its official site, enabling API-based video integration."
    },
    "bestFor": {
      "zh": "应用视频、教育内容与嵌入式播放",
      "en": "Application video, educational content and embedded playback"
    },
    "highlights": [
      {
        "zh": "OVHcloud 体系的视频 API 与分发",
        "en": "Video APIs and delivery within OVHcloud"
      },
      {
        "zh": "api.video 提供视频上传、管理、播放器和 CDN 分发能力，官网使用 OVHcloud 联合品牌。适合通过 API 将视频功能嵌入现有应用。",
        "en": "api.video provides video upload, management, playback and CDN delivery with OVHcloud co-branding on its official site, enabling API-based video integration."
      }
    ],
    "watchouts": {
      "zh": "核对 API 限制、访问策略、视频导出，以及存储和交付费用。",
      "en": "Check API limits, access policies, video export and storage versus delivery charges."
    },
    "compare": {
      "delivery": {
        "zh": "OVHcloud 体系的视频 API 与分发",
        "en": "Video APIs and delivery within OVHcloud"
      },
      "security": {
        "zh": "媒体权限或防护能力需按方案确认",
        "en": "Confirm media access or security scope"
      },
      "edge": {
        "zh": "提供 API 或开发者集成",
        "en": "APIs or developer integrations"
      },
      "origin": {
        "zh": "API、资源地址或源站接入",
        "en": "API, asset URL or origin integration"
      },
      "fit": {
        "zh": "应用视频、教育内容与嵌入式播放",
        "en": "Application video, educational content and embedded playback"
      }
    },
    "seo": {
      "title": {
        "zh": "api.video CDN 介绍与选型：OVHcloud 体系的视频 API 与分发",
        "en": "api.video CDN profile: Video APIs and delivery within OVHcloud"
      },
      "description": {
        "zh": "api.video 提供视频上传、管理、播放器和 CDN 分发能力，官网使用 OVHcloud 联合品牌。适合通过 API 将视频功能嵌入现有应用。",
        "en": "api.video provides video upload, management, playback and CDN delivery with OVHcloud co-branding on its official site, enabling API-based video integration."
      },
      "analysis": {
        "zh": "api.video 提供视频上传、管理、播放器和 CDN 分发能力，官网使用 OVHcloud 联合品牌。适合通过 API 将视频功能嵌入现有应用。 核对 API 限制、访问策略、视频导出，以及存储和交付费用。",
        "en": "api.video provides video upload, management, playback and CDN delivery with OVHcloud co-branding on its official site, enabling API-based video integration. Check API limits, access policies, video export and storage versus delivery charges."
      },
      "questions": [
        {
          "zh": "核对 API 限制、访问策略、视频导出，以及存储和交付费用。",
          "en": "Check API limits, access policies, video export and storage versus delivery charges."
        },
        {
          "zh": "如何用真实业务资源验证缓存刷新、访问权限与月度费用？",
          "en": "How will real assets validate cache refresh, access controls and monthly costs?"
        }
      ]
    },
    "logo": "assets/logos/api-video.svg",
    "logoDark": false
  }
];

const BASE_ARTICLES = [
  {
    "id": "cdn-selection-framework",
    "status": "published",
    "date": "2026-10-13",
    "modified": "2026-10-14",
    "readTime": 10,
    "category": {
      "zh": "选型与采购",
      "en": "Selection and procurement"
    },
    "title": {
      "zh": "CDN 怎么选：从缓存、线路到防护，一份能用于采购验收的指南",
      "en": "How to choose a CDN: caching, routing, protection, and acceptance testing"
    },
    "excerpt": {
      "zh": "从用户地区、缓存策略、回源容量、防护需求到真实账单，逐项判断 CDN 是否适合你的业务。附试用记录、验收标准与故障回滚的检查方法。",
      "en": "Build a CDN shortlist around your audience and application. Compare cache behavior, origin capacity, security boundaries, operating costs, and a repeatable acceptance process."
    },
    "sections": [
      {
        "heading": {
          "zh": "先把网站的问题写清楚，再去看 CDN 套餐",
          "en": "Define the application problem before comparing plans"
        },
        "paragraphs": [
          {
            "zh": "网站打开慢，接一个 CDN 就能解决吗？答案取决于慢在哪里。图片和脚本跨越很远的网络距离，边缘缓存通常有用；接口在数据库里等了两秒，单纯换一条分发线路不会让查询消失。选型的第一步，是把页面拆成可以缓存的文件、必须回源的请求，以及不能出错的业务动作。三个清单写出来，候选范围往往已经缩小一半。",
            "en": "A CDN can help deliver static assets closer to users, but it cannot remove an expensive database query. Start by separating cacheable files, requests that must reach the origin, and business actions that must remain correct. A public article, a versioned image, and a signed-in user's saved items need different treatment."
          },
          {
            "zh": "不妨用一个假设的内容站说明：文章页公开，图片更新后换文件名，用户登录后才能查看收藏夹。图片适合长期缓存；文章页需要兼顾更新速度与回源压力；收藏夹必须区分用户。若把这三类请求统一套进“缓存所有内容”，短期测速可能很好看，后续却会遇到内容不更新，甚至错误复用用户数据。采购前先确定这些边界，比比较几十毫秒的差别更有价值。\n\n本文给出的不是厂商排行榜，而是一套可以写进试用记录和验收文档的方法。产品功能以官方说明为依据，计算示例只是演示，不代表本站已有客户实测。准备候选名单时，可以先浏览[CDN 厂商目录](providers/)，随后按下文的业务条件逐家排除。",
            "en": "Consider a hypothetical publishing site. Images can use versioned URLs, articles need an update policy, and saved items must remain isolated by user. Applying one cache-everything rule could make a speed test look good while serving stale or inappropriate content. This guide offers an evaluation method, not a performance ranking. Begin with the [provider directory](providers/) and eliminate candidates against specific requirements."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "CDN 的三个环节，决定了该向谁追问",
          "en": "Separate edge delivery, caching, and origin work"
        },
        "paragraphs": [
          {
            "zh": "把一次访问拆开看：用户连接边缘节点，节点根据规则寻找缓存，没有可用内容时再向源站请求。所谓“加速效果”，可能来自离用户更近的节点、减少重复回源，也可能来自连接和协议处理。不同问题对应不同证据：缓存问题看响应头与日志，线路问题看目标地区访问，源站问题看应用耗时。把它们揉成一个总分，反而不容易定位差距。",
            "en": "A request reaches an edge, is matched against cache rules, and may then be forwarded to an origin. Faster delivery can come from different parts of that path. Cache questions need headers and logs; routing questions need measurements from relevant networks; application questions need origin timings. One aggregate score hides these distinctions."
          },
          {
            "zh": "[CloudFront 缓存键文档](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html)说明，请求头、Cookie、查询参数可以参与缓存对象的识别。因此，同一个路径不一定代表同一份缓存。同样，一份资源在上海用户处命中，也不能据此推断新加坡节点已经存有该对象。判断产品是否适合，应该问“我的请求如何被处理”，而不是只问“你们有多少节点”。",
            "en": "The [CloudFront cache-key documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html) explains how headers, cookies, and query strings identify cached objects. The same path can represent different responses, and a hit at one edge does not establish a hit elsewhere. Ask how your actual requests are handled, rather than using advertised node counts as the deciding metric."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "用真实用户分布，替换笼统的全球覆盖",
          "en": "Measure where your users actually connect"
        },
        "paragraphs": [
          {
            "zh": "先从现有访问记录中整理用户所在地区、运营商、设备，以及主要访问时段。不必一开始就搭建复杂系统，过去一段时间的访问统计、客服反馈和业务订单也能帮助判断优先级。用户集中在两三个地区，就先验证这些地区；面向海外的下载站，则需要关注下载完成率、长连接稳定性和用户实际网络条件。",
            "en": "List important user regions, networks, devices, and busy periods from available analytics and support reports. Prioritize the markets that matter to the application. A coverage map cannot establish the route or experience for a particular mobile network during peak traffic. Record location and network alongside every result."
          },
          {
            "zh": "尤其要区分“有节点”和“用户会被调度到哪个节点”。营销页面中的覆盖地图，无法直接回答特定宽带、移动网络和晚间高峰的访问表现。试用时把地区和网络单独记在每一组结果旁，不要用一个全球平均值盖掉局部失败。某个核心市场连续超时，即使其他地区很快，也可能足以否决这个候选方案。\n\n如果两家结果接近，不急着宣布胜负。重复测试不同时间段，观察差异是否稳定，确认测试资源和缓存状态有没有变化。一次连接复用或一个节点刚好缓存命中，都可能让短时结果偏向某一方。测试方法见[浏览器 CDN 测速指南](article/browser-cdn-benchmark-method/)，其中会解释哪些数据能比较，哪些只是当前环境的表现。",
            "en": "A global average can conceal repeated failures in a core market. Repeat close results at different times and check whether object versions, caching, or reused connections changed. The [browser benchmark guide](article/browser-cdn-benchmark-method/) explains which comparisons are useful and why one short run cannot establish a durable winner."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "缓存策略先按内容分类，不按文件后缀想当然",
          "en": "Classify content before setting cache policies"
        },
        "paragraphs": [
          {
            "zh": "一个实用的起点是分成四组：版本化静态资源、经常更新的公开页面、匿名接口、带身份或交易状态的请求。第一组通常最容易获得收益；第二组要规定多久允许更新延迟；第三组需要逐个确认响应是否真的与用户无关；第四组应先按不共享缓存设计，再由业务负责人确认例外。不能因为接口返回 JSON，就自动认定它安全或不安全。",
            "en": "Start with versioned static assets, frequently updated public pages, anonymous APIs, and authenticated or transactional requests. Define acceptable staleness for each group. JSON alone says nothing about whether a response is safe to share. User-specific responses should not enter shared caches without explicit application review."
          },
          {
            "zh": "缓存规则也不是在每个平台上完全相同。[Cloudflare 默认缓存行为](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)列出了默认处理逻辑和例外；CloudFront 则允许通过缓存策略控制键的组成。试用时应拿着同一组业务请求检查实际结果，不能把一家控制台里的开关名称机械搬到另一家。对于带查询参数的图片处理接口，还要确认宽度、质量等会改变内容的参数被正确区分。\n\n另一个容易遗漏的问题是内容发布。给静态文件加内容指纹，与不断覆盖同一个文件名，是两种不同的更新方式。前者需要保留旧文件以兼容旧页面，后者需要处理浏览器与边缘缓存的失效。团队如果无法明确回答“发布后旧资源多久消失”，就应先补齐[缓存与 CORS 配置清单](article/cache-cors-basics/)，再扩大接入范围。",
            "en": "Read [Cloudflare's default cache behavior](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/) and the corresponding policy documentation for each alternative. Similar control-panel labels may produce different behavior. Verify meaningful image parameters, publishing workflows, and invalidation. The [cache and CORS guide](article/cache-cors-basics/) covers the configuration checks that should precede a wider rollout."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "源站能力决定缓存失效后还能不能扛住",
          "en": "Plan for the requests that still reach the origin"
        },
        "paragraphs": [
          {
            "zh": "高命中率是好事，但系统不能只在缓存健康时工作。新节点接入、批量清缓存、热点内容更新，都可能增加回源量。评估时记录源站的可用带宽、连接限制、应用处理速度，以及数据库最先出现瓶颈的位置。对于大文件，文件存储和回源链路的容量也应单独核算，不能只盯住边缘到用户这一段。",
            "en": "Cache invalidation, new edges, and content updates can increase origin demand. Record origin bandwidth, connection limits, application capacity, and likely database bottlenecks. In an illustrative workload of ten million daily requests with a ninety-percent edge hit ratio, one million requests may still require origin work. Their cost depends on what they do."
          },
          {
            "zh": "一个简单的演示：每天有一千万次请求，若九成由边缘直接返回，仍可能有一百万次请求需要源站处理。请求大小和计算成本不同，这一百万次请求未必轻松。相反，按字节计算的命中率又可能给出另一种印象，因为少数大文件足以改变流量占比。验收文档应同时注明请求口径和字节口径，避免双方拿不同指标交流。\n\n还要做故障演练：某个源站不可用时会怎样，证书验证失败能否报警，错误响应会不会被长时间缓存，回滚由谁执行。这里不需要模拟攻击，使用自己控制的测试路径就能验证不少问题。让值班人员实际操作一次恢复，比在报价单上看到“智能容灾”四个字更有说服力。",
            "en": "Request-based and byte-based hit ratios describe different things; name the denominator in every report. Also rehearse origin failure, certificate errors, and rollback using authorized test resources. A successful recovery performed by the actual operator is stronger evidence than a generic promise of intelligent failover."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "高防 CDN 要看业务存活，而不只是防护数字",
          "en": "Evaluate protection through business continuity"
        },
        "paragraphs": [
          {
            "zh": "有防护需求时，可以把[高防CDN](https://www.cdn5.com/)作为一条单独的候选路线。CDN5 官网介绍了 DDoS 防护、Web 应用防火墙和相关安全产品，但官网功能介绍与特定业务的实际承受能力不是同一份证据。采购时应要求解释防护范围、触发条件、超出套餐后的处理方式，以及攻击期间正常请求如何得到服务。",
            "en": "A [high-defense CDN](https://www.cdn5.com/) may belong on the shortlist when abuse disrupts the application. CDN5 describes DDoS protection and web security products, but vendor descriptions do not establish measured capacity for your workload. Ask about coverage, triggers, plan limits, normal-user handling, and recovery."
          },
          {
            "zh": "带宽型攻击、应用请求洪泛和业务逻辑滥用，对系统造成压力的位置不同。一个登录接口即使流量不大，也可能消耗数据库资源；一个公开下载地址则可能更多地消耗出口和连接。需要将带宽、请求速率、回源压力、误拦截和恢复时间分开评估。关于两类产品的具体比较，可继续阅读[CDN5 与 Cloudflare 的选型分析](article/cdn5-cloudflare-compare/)。\n\n同样不能把 Cloudflare 简化成只有加速的产品。其[DDoS 防护文档](https://developers.cloudflare.com/ddos-protection/)介绍了网络层和应用层的防护体系。真正要核对的是所选套餐、接入协议、规则权限与支持边界。网页能正常经过代理，并不自动说明游戏协议、非标准端口或所有接口都受同样保护。",
            "en": "Bandwidth floods and expensive application requests consume different resources. Compare false positives and origin pressure alongside capacity. Cloudflare also documents [network and application-layer DDoS protection](https://developers.cloudflare.com/ddos-protection/); it should not be treated as caching alone. The [protection comparison guide](article/cdn5-cloudflare-compare/) develops the questions needed to compare actual plans and protocols."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "免备案 CDN 的选择，需要把接入与访问质量分开",
          "en": "Treat offshore onboarding and delivery quality separately"
        },
        "paragraphs": [
          {
            "zh": "如果你的项目正在寻找境外接入方案，可以查看[免备案CDN](https://www.jqcdn.com/)的官方介绍。JQCDN 在官网强调香港线路和面向中文开发者的接入服务。这里应把它理解为厂商提供的产品方向，而不是对所有地区访问质量、所有业务类型或所有合规事项的一揽子保证。购买前仍需核对节点区域、域名条件、业务类型和合同要求。",
            "en": "For projects considering offshore delivery, JQCDN describes a [CDN onboarding option without mainland filing](https://www.jqcdn.com/) and emphasizes Hong Kong routing. Treat this as the vendor's stated product direction, not a guarantee for every region, workload, or compliance obligation. Confirm domain eligibility, served regions, business restrictions, and contractual requirements."
          },
          {
            "zh": "接入是否方便，与用户访问是否稳定，是两张不同的验收单。前者记录域名验证、证书、DNS 变更和支持响应；后者记录真实用户地区、忙时失败率、回源路径及异常恢复。不要用“免备案”代替线路测试，也不要将某次测试延迟理解成长期服务承诺。涉及地区要求时，应以实际服务区域的官方规则和服务商书面确认作为依据。",
            "en": "Maintain two acceptance records: onboarding covers validation, certificates, DNS changes, and support; delivery covers user networks, peak-time failures, origin paths, and recovery. Easy onboarding does not prove stable routing. One low-latency run does not establish a long-term service commitment. Obtain applicable regional requirements and project-specific confirmation separately."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "费用计算要把请求、流量和运维放在同一张表里",
          "en": "Put requests, traffic, and operations in one cost model"
        },
        "paragraphs": [
          {
            "zh": "报价比较最容易漏掉的不是一个小数点，而是计费对象。流量、请求、日志、图片处理、边缘计算、安全功能和源站出口，可能分别收费。还要问清峰值、超额、最低消费、包年退款与升级方式。尤其是高请求量的小文件业务，按流量估算出来的低价，可能与实际请求账单有明显差别。",
            "en": "Traffic, requests, logs, transformations, edge compute, security, and origin egress may have separate charges. Ask about overages, minimum commitments, upgrades, and termination. A small-file application can have modest transfer volume but substantial request costs, so traffic-only estimates may be misleading."
          },
          {
            "zh": "建议做日常、增长和异常三种情景，每种都写上流量与请求量的来源。没有历史数据的新项目，可以用明确标注的假设起步，再用试用日志修正。不要把假设写成预测结论。例如，把图片大小减少一半会影响流量支出，但不一定让请求费用同步减少；增加缓存命中率可能降低源站成本，却未必改变所有边缘请求收费。\n\n运维时间也算成本。若一个便宜方案需要每天手工处理误拦截、证书续期和缓存刷新，它并不一定比贵一些但更适配的方案经济。把每月重复工作的次数、负责人、可自动化程度写出来，采购讨论会更接近真实使用。合同之外的口头承诺则单独列为待确认事项，不混入已经获得的能力。",
            "en": "Build normal, growth, and incident scenarios from stated inputs. Label assumptions and replace them with trial logs as evidence becomes available. Reducing image size need not reduce request charges. Include recurring operator work: false-positive handling, certificate maintenance, and purges. Keep unconfirmed verbal promises separate from documented capabilities."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "一轮试用应该留下哪些能复查的记录",
          "en": "Make the trial reproducible"
        },
        "paragraphs": [
          {
            "zh": "先确定测试资源：一个版本固定的静态文件、一个允许公开的动态接口，以及一条接近真实用户的访问流程。为候选服务配置相同内容、证书策略和缓存条件，然后记录地区、网络、时间、对象大小、成功次数、响应耗时和完整读取耗时。测试文件必须由你授权使用，并控制次数，避免向第三方公共资源持续施压。",
            "en": "Use a fixed static object, a permitted public dynamic endpoint, and a representative user journey. Match content, certificate policies, and cache conditions across candidates. Record region, network, time, object size, successes, response time, and complete-body time. Use resources you are authorized to test and keep request volumes proportionate."
          },
          {
            "zh": "使用[CDN 实测工具](lab/)可以观察当前浏览器读取公开文件的表现，但它不会自动测出全球覆盖或防护上限。它也无法代替真实页面的登录、搜索、下单等流程。最好把工具结果与源站日志、CDN 命中状态和业务成功率放在一起看，结果不一致时先解释原因，不急着取一个更好看的数字。\n\n采购验收至少应留下这几项：关键地区访问条件，缓存命中与更新流程，动态业务正确性，故障回滚步骤，日志和权限管理，费用计算口径。每项写清通过标准、证据位置与负责人。有争议的指标安排复测，无证据的功能标为待确认。这样几个月后出现问题，团队仍能找到当初为何选择该方案。",
            "en": "The [browser benchmark tool](lab/) observes local public-file reads; it does not establish global coverage or protection capacity. Combine its output with origin logs, cache status, and business success rates. Acceptance records should name thresholds, evidence locations, and owners for delivery, updates, correctness, recovery, permissions, and billing."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "常见问题：便宜、快和安全，究竟先看哪个",
          "en": "Decide from the constraints that matter"
        },
        "paragraphs": [
          {
            "zh": "“小站是否一定需要昂贵的高防套餐？”不一定。先看业务停机的损失、已有风险、源站暴露情况，以及团队处理事件的能力。一个只发布静态内容的小站，与依靠实时接口完成订单的站点，防护和恢复需求可能完全不同。可以先完成域名、证书、缓存和源站限制这些基础工作，再根据风险与实际流量选择服务。",
            "en": "A small site does not automatically need an expensive protection plan. Evaluate downtime consequences, existing risks, exposed origins, and operational capability. The fastest file download is not automatically the best purchase either: update correctness, support, and predictable operation can decide between otherwise similar candidates."
          },
          {
            "zh": "“测速最快的就应该买？”也不一定。一次小文件下载不能说明登录会话、内容更新、售后响应和月末账单。快是重要证据，但必须与可用性、正确性和操作成本一起评估。若两家速度接近，能解释故障、提供所需日志并方便迁出的那一家，可能更适合长期使用。\n\n“接完 CDN 是否可以不管源站？”不能。源站仍然承担未命中请求和多数动态业务。应检查入口是否只允许合法回源、管理端口是否暴露、证书是否校验、备份能否恢复。最后留下可执行的退出方案：域名如何切回、规则如何导出、旧证书和权限何时撤销。选型走到这一步，才算从一份产品比较变成了真正能够交付的方案。",
            "en": "The origin still serves misses and dynamic work. Verify allowed ingress, management exposure, certificates, and recoverable backups. Finish with an exit plan covering DNS changes, configuration export, and removal of obsolete credentials. A useful decision explains why a service fits, what has been tested, and when the team should reconsider it."
          }
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html",
        "label": {
          "zh": "CloudFront 缓存键文档",
          "en": "CloudFront cache-key documentation"
        }
      },
      {
        "url": "https://developers.cloudflare.com/cache/concepts/default-cache-behavior/",
        "label": {
          "zh": "Cloudflare 默认缓存行为",
          "en": "Cloudflare's default cache behavior"
        }
      },
      {
        "url": "https://www.cdn5.com/",
        "label": {
          "zh": "高防CDN",
          "en": "high-defense CDN"
        }
      },
      {
        "url": "https://developers.cloudflare.com/ddos-protection/",
        "label": {
          "zh": "DDoS 防护文档",
          "en": "network and application-layer DDoS protection"
        }
      },
      {
        "url": "https://www.jqcdn.com/",
        "label": {
          "zh": "免备案CDN",
          "en": "CDN onboarding option without mainland filing"
        }
      }
    ]
  },
  {
    "id": "cdn5-cloudflare-compare",
    "status": "published",
    "date": "2026-10-13",
    "modified": "2026-10-14",
    "readTime": 11,
    "category": {
      "zh": "防护与接入",
      "en": "Protection and onboarding"
    },
    "title": {
      "zh": "高防 CDN 怎么选：CDN5、Cloudflare 与免备案接入的判断方法",
      "en": "Choosing a high-defense CDN: CDN5, Cloudflare, and offshore onboarding"
    },
    "excerpt": {
      "zh": "高防 CDN 不应只比较容量数字。结合 CDN5、Cloudflare 与 JQCDN 官方资料，拆解防护范围、误拦截、源站保护、线路和采购验收。",
      "en": "Compare protection coverage, application compatibility, origin exposure, false positives, support, and recovery without turning vendor claims into invented benchmark results."
    },
    "sections": [
      {
        "heading": {
          "zh": "先回答一个问题：你究竟要保护什么",
          "en": "Start with the business actions that must survive"
        },
        "paragraphs": [
          {
            "zh": "如果网站已经在遭受异常流量，最让人着急的往往不是产品名词，而是一个很具体的问题：页面还能不能打开，用户能不能登录，正常订单会不会被拦下来。选择高防 CDN，应该围绕这些业务动作展开。防护容量、请求阈值和线路说明都有用，但只有与业务连接起来，才能判断它们是否足够。",
            "en": "During an incident, the meaningful questions are whether users can load pages, sign in, and complete legitimate actions. List important paths, authentication requirements, cache eligibility, request cost, and acceptable interruption. A public article and a costly reporting endpoint put pressure on different resources."
          },
          {
            "zh": "以一个假设的会员网站为例：公开文章可以缓存，用户登录需要查数据库，后台导出报表会产生较重的计算。攻击公开文章与反复请求报表，带来的压力并不相同。前者可能由缓存吸收相当一部分，后者即使请求数量不多，也可能耗尽应用资源。因此，需求表应先列出重要路径、是否有登录态、是否允许缓存、每次请求的成本，以及能够接受的失败时间。\n\n本文比较的是选型思路和官方公开的产品方向，不把官网参数包装成独立测试结果。希望先了解完整采购流程，可以阅读[CDN 选型与验收指南](article/cdn-selection-framework/)。如果正在处理故障，应先保存日志、确认业务受影响范围，并联系现有服务商；一边故障排查一边仓促迁移，容易让原本的问题更加难以区分。",
            "en": "This guide compares evaluation methods and documented product directions, not independently measured defense capacity. The [general CDN selection guide](article/cdn-selection-framework/) covers procurement. During an active incident, preserve evidence and understand the affected workflow before combining troubleshooting with a rushed migration."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "带宽型攻击和应用层攻击，需要两份验收单",
          "en": "Use separate acceptance criteria for network and application attacks"
        },
        "paragraphs": [
          {
            "zh": "网络层面的大流量可能占满链路或消耗连接资源，应用层面的异常请求则可能打到登录、搜索或数据库。两者都可能让用户看到超时，但解决问题的环节并不相同。采购时只问“能防多少 G”，无法回答一个复杂查询接口会不会被拖垮；只问“能扛多少请求”，又可能忽略链路容量和连接状态。",
            "en": "High-volume network traffic can consume links and connection resources; expensive application requests can exhaust login, search, or database capacity. A bandwidth figure alone does not establish application resilience, and a request-rate figure alone does not describe every network constraint."
          },
          {
            "zh": "更合理的做法是让厂商分别说明防护对象、检测方式、触发后的处置和正常流量的处理。对于应用接口，要特别关心误拦截：规则触发后是限速、挑战、拦截还是其他行为，机器调用能否处理，登录后的用户有没有不同策略。验证码对能交互的网页和后台回调接口，实际影响完全不同。\n\n[Cloudflare DDoS 防护文档](https://developers.cloudflare.com/ddos-protection/)明确区分了网络层和应用层相关能力。读这类资料的价值，是建立可核对的问题清单，而不是得到某家永远优于另一家的结论。同一家产品的不同套餐、不同接入方式与不同协议，也可能对应不同的功能和操作权限。",
            "en": "Ask what is protected, what triggers mitigation, and how legitimate traffic is treated. Interactive challenges may suit a browser but break callbacks or automated clients. [Cloudflare's DDoS documentation](https://developers.cloudflare.com/ddos-protection/) distinguishes network and application protection. Compare the actual plan, protocol, configuration rights, and support boundary."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "CDN5 的公开资料，应怎样用于选型",
          "en": "Use CDN5's public information to form specific questions"
        },
        "paragraphs": [
          {
            "zh": "查看[高防CDN](https://www.cdn5.com/)官方介绍，可以看到 CDN5 将 DDoS 防护、Web 应用防火墙和其他安全产品放在主要产品位置。这能说明其公开强调的方向，也方便有防护需求的团队开始询价。本文不直接沿用页面上的容量、客户评价或效果百分比作为验证结论，因为这些信息缺少本站能够复现的测试条件。",
            "en": "CDN5 places [high-defense CDN](https://www.cdn5.com/), DDoS mitigation, and web application security prominently in its product information. That establishes its stated positioning. It does not make advertised capacity, testimonials, or improvement percentages independently verified results."
          },
          {
            "zh": "真正有用的问题可以更具体：购买的防护容量按什么范围计算，多个域名是否共享，达到阈值后是否限制服务，攻击流量如何计费，正常请求是否仍享有服务承诺。还应说明 WebSocket、需要的端口、回源方式和日志保留是否在套餐内。把回复整理进同一份报价附录，避免上线后才发现双方对“支持”的理解不同。\n\n如果厂商建议使用其他产品，例如面向某种协议的转发或 SDK 方案，先核对接入工作量。域名代理、网络转发和在客户端集成 SDK，不是相同的部署方式，也不具备相同的迁出成本。团队需要知道要改哪些代码、由谁维护、旧客户端如何兼容，以及停止使用后怎样撤销依赖。",
            "en": "Ask how capacity is allocated, whether domains share limits, what happens above a threshold, and how incident traffic is billed. Confirm WebSocket, required ports, origin behavior, and log retention. If another product or client SDK is proposed, document deployment changes, maintenance ownership, compatibility, and migration costs."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "Cloudflare 不能只被当成一个缓存开关",
          "en": "Evaluate Cloudflare as a delivery and security platform"
        },
        "paragraphs": [
          {
            "zh": "Cloudflare 的公开资料覆盖内容缓存和安全体系，不能因为它提供通用 CDN 服务，就推断它缺少防护能力。正确的比较方式，是先固定所需业务，再核对实际方案。某一份文档介绍平台具有某项功能，并不自动说明你当前购买的服务能够使用全部配置、日志和支持渠道。",
            "en": "Cloudflare's documentation covers both caching and security. Its general-purpose positioning does not imply an absence of protection. Equally, platform documentation does not mean every plan exposes identical controls, logs, or support. Fix the application requirements before comparing the offered configuration."
          },
          {
            "zh": "在内容交付方面，应阅读[默认缓存行为](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)，明确哪些响应会被缓存、哪些条件会改变结果。默认行为与团队手工增加的缓存规则需要一起审查。例如，给匿名页面设置边缘缓存，不能顺手把相同路径下的用户个性化响应也纳入同一策略。安全产品接入成功，并不会替你纠正不安全的缓存配置。\n\n试用时可以把[Cloudflare 厂商档案](providers/cloudflare/)作为导航入口，随后直接查看对应官方文档。重点验证规则是否能覆盖实际路径、客户端是否受到挑战影响、源站是否识别出真实访问者，以及需要的日志是否能够导出。如果这些细节无法满足业务，再比较其他候选，而不是仅凭品牌知名度决定。",
            "en": "Review [default cache behavior](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/) together with custom rules. Security onboarding does not repair unsafe caching of personalized responses. Use the [Cloudflare profile](providers/cloudflare/) to locate relevant material, then verify actual request handling, client compatibility, visibility, and exportable evidence."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "对比表里最值得保留的是“还没有确认”",
          "en": "Keep unknowns visible in the comparison"
        },
        "paragraphs": [
          {
            "zh": "一份可靠的对比表应允许出现“待确认”。比如，一家提供了明确的端口列表，另一家只回答“支持常见业务”，两者并不算同样通过。把未知项涂成绿色，最终只是把采购风险转移给运维人员。对关键功能，最好拿出测试路径、截图、日志或书面答复，而不是只保留聊天中一句概括。",
            "en": "A clear port list and an assurance that common workloads are supported are not equivalent evidence. Mark unconfirmed items rather than treating them as passes. Important capabilities deserve reproducible tests, logs, or written confirmation."
          },
          {
            "zh": "可以将验收分为交付、防护、支持和退出四类。交付看正常访问和缓存；防护看适用范围、处置方式和业务影响；支持看响应路径、故障升级和日志；退出看配置导出、域名切换和账单结清。每类都指定一个负责人，保证出现问题时有明确的处理入口，而不是多个团队互相等待。\n\n不必给这四类强行加权成一个百分制。对于依赖 WebSocket 的业务，协议不兼容就是否决项；对于必须保留审计记录的团队，日志拿不到同样可能直接淘汰。先筛选不能妥协的条件，剩余候选再比较速度、价格和操作体验，通常比一张看似精确的总分榜更实用。",
            "en": "Organize acceptance around delivery, protection, support, and exit. Assign owners and identify non-negotiable conditions. Protocol incompatibility or unavailable audit logs may disqualify an option regardless of its aggregate score. Compare cost and convenience only after the essential requirements are met."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "免备案接入要单独核对，不能代替线路和防护评估",
          "en": "Separate offshore eligibility from routing and protection"
        },
        "paragraphs": [
          {
            "zh": "[免备案CDN](https://www.jqcdn.com/)是另一个常见的产品检索方向。JQCDN 官网突出香港线路、中文开发者接入和安全相关功能。对于希望评估境外接入方案的团队，这些信息可以用来建立候选清单；但产品宣传不能替代具体域名、业务内容、服务区域与合同要求的确认。",
            "en": "JQCDN advertises [CDN onboarding without mainland filing](https://www.jqcdn.com/), Hong Kong routing, and services for Chinese-speaking developers. Use this to identify a candidate, then confirm the actual domain, business, regional, and contractual conditions."
          },
          {
            "zh": "试用时至少拆成三个问题：这个项目能否接入，目标用户访问是否稳定，出现异常流量时怎样处理。三者有关联，却不是同一个答案。“可以接入”不等于所有运营商都表现一致；“正常访问快”也不等于应用接口在异常流量下仍然健康。分别记录证据，才能避免用一个宣传词覆盖所有需求。\n\n还要观察回源路径。边缘节点离用户近，不代表源站离节点近；跨区域回源延迟可能主要体现在动态接口上。缓存命中的图片速度很好，而登录接口依旧慢，是完全可能出现的组合。这样的现象首先需要拆分缓存和回源，再判断是否换区域、调整应用或更换服务。",
            "en": "Eligibility, normal delivery, and incident behavior need separate evidence. Easy onboarding does not prove stable performance across networks. An edge close to the user can still be far from the origin, so cached images and dynamic sign-in requests may behave very differently. Investigate the path before changing providers."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "不收紧源站入口，防护链路可能被绕开",
          "en": "Close unintended paths to the origin"
        },
        "paragraphs": [
          {
            "zh": "接入代理后，源站仍然存在。历史解析、其他子域名、邮件服务或配置文件，都可能使原始地址继续被使用。评估防护方案时，应检查有哪些入口必须保留，哪些可以只允许合法回源。限制入口时先验证运维、监控、证书更新和必要集成，防止把正常管理也一起切断。",
            "en": "The origin continues to exist after proxy onboarding. Historical records, other hostnames, and related services may leave alternative paths available. Identify necessary ingress and restrict it appropriately while preserving monitoring, administration, certificate renewal, and integrations."
          },
          {
            "zh": "来自代理的访问者地址头也需要信任边界。应用应只在请求确实来自可信代理路径时使用相应头信息，不能无条件相信客户端自行提交的同名字段。否则，日志、限速和风控可能基于伪造地址工作。具体字段和可信地址维护方式应以接入平台文档为准，并跟随官方变更更新。\n\n加密回源同样值得独立验收。用户到边缘的 HTTPS 正常，并不能证明边缘到源站也做了正确验证。检查回源协议、证书有效性和主机名匹配，确认过期或配置错误会被发现。安全链路只有在每一段都被理解时才清楚，不能用浏览器的小锁图标替代整条链路的检查。",
            "en": "Trust forwarded visitor information only within the verified proxy boundary. Otherwise, client-supplied fields can undermine logs and rate controls. Also check origin encryption, certificate validation, and hostname matching. A working browser HTTPS connection does not independently verify the edge-to-origin segment."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "缓存和防护规则应一起排查误伤",
          "en": "Investigate cache rules and protection rules together"
        },
        "paragraphs": [
          {
            "zh": "假设登录请求被重定向到挑战页面，浏览器里的人可以继续操作，服务器之间的回调却可能失败。再假设错误页面被不恰当地缓存，规则已经调整，部分用户仍然拿到旧内容。这种情况下，业务恢复要同时查看防护日志、响应状态和缓存状态，单独关掉一个开关未必能解决。",
            "en": "An interactive challenge can work for a human while breaking a server callback. If an error page is then cached incorrectly, changing the protection rule may not immediately restore every user. Inspect security events, status, content type, and cache behavior together."
          },
          {
            "zh": "为关键接口准备小范围测试：匿名用户、登录用户、不同角色、合法机器调用分别走一次。检查返回内容和状态，而不只是看 HTTP 是否成功。一个返回 200 的 HTML 提示页，对于期待 JSON 的客户端仍然是失败。关于跨域和响应处理，可以参考[缓存、CORS 与上线验收](article/cache-cors-basics/)。\n\n对于不适合交互式挑战的接口，防护策略应与业务认证、访问频率和服务端校验配合。这里的目标不是简单地放行所有请求，而是确保保护措施能识别合法调用，并有明确的异常处置和撤回机制。上线前先在有限范围验证，记录误拦截处理人及恢复步骤。",
            "en": "Test anonymous users, signed-in users, different roles, and permitted machine callers. A 200 response containing an HTML challenge is still wrong for a JSON client. The [cache and CORS guide](article/cache-cors-basics/) covers related checks. Roll out narrowly with an explicit owner and rollback procedure."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "防护试用应验证恢复流程，不要自行对公共服务压测",
          "en": "Test recovery within an agreed scope"
        },
        "paragraphs": [
          {
            "zh": "下载一个小文件，可以验证当前网络的内容交付；它测不出服务商的防护容量。本站[浏览器实测工具](lab/)适合低频比较公开文件读取表现，不应被用来模拟攻击。需要验证防护时，应与服务商事先约定授权范围、对象、时间窗口、流量来源、停止条件和双方联系人。",
            "en": "A small-file download observes ordinary delivery; it cannot measure DDoS capacity. The [browser benchmark](lab/) is designed for low-volume public-file checks. Protection testing requires an agreed target, scope, timing, traffic source, stop condition, and responsible contacts."
          },
          {
            "zh": "对多数团队而言，先演练告警与恢复更容易获得实际收益。例如，在自己控制的测试域名上触发一条可撤销的规则，确认日志是否出现、值班人员能否找到规则、回滚后业务是否恢复。还可以验证 DNS 切换和源站故障流程，记录缓存与解析传播期间的实际现象。\n\n验收结果应包含失败样本。只保存“正常时很快”的截图，到了异常时没有参考。每次发现问题，留下时间、请求标识、路径、地区、规则变化和响应状态，再让厂商解释证据。能否把一次故障讲清楚，往往比售前展示多少功能图标更能反映后续协作成本。",
            "en": "A reversible rule on an authorized test domain can validate events, operator access, and recovery. Rehearse DNS and origin-failure procedures too. Preserve failures with timestamps, request identifiers, paths, regions, and rule changes. A provider's ability to explain an incident is valuable operational evidence."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "套餐费用与服务承诺，最好一起问",
          "en": "Compare pricing and service commitments together"
        },
        "paragraphs": [
          {
            "zh": "价格比较应使用同一业务模型：日常请求量、传输流量、域名数量、端口需求、日志量，以及预期支持方式。对于按包月展示的方案，要确认额度和超额处理；对于组合计费的方案，要确认安全、日志和其他附加能力的收费位置。不要把一个平台的基础套餐与另一个平台含更多服务的报价直接相减。",
            "en": "Use the same workload assumptions for requests, traffic, domains, ports, logs, and support. Confirm included allowances, overage handling, and separately charged features. Do not compare a basic plan with a broader service bundle as though they cover identical work."
          },
          {
            "zh": "服务承诺也要落到定义。怎样计算不可用时间，哪些情况被排除，怎样提交补偿，支持团队通过什么渠道接单，升级故障时由谁负责。补偿规则不等于业务损失保险，回复时间也不等于修复完成时间。把这些区别写清楚，能减少上线后对售前承诺的误解。\n\n本文没有固定引用套餐金额，是因为价格和配置会更新，且网页展示不一定覆盖项目实际需求。比较时应保存带日期的官方页面或正式报价，再按同一口径核算。技术方案已经不满足业务，便宜也不构成理由；多个方案都满足需求时，再讨论运维负担和总成本更合理。",
            "en": "Define unavailability, exclusions, compensation claims, support channels, and escalation ownership. Response time is not resolution time, and service credits do not replace business continuity planning. Save dated official quotes rather than relying on fixed prices repeated in an article."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "最后的选择，可以是一段明确的判断",
          "en": "Write a decision the team can act on"
        },
        "paragraphs": [
          {
            "zh": "如果你的主要问题是静态资源访问和回源成本，先验证缓存、线路与可观测性；如果主要问题是异常请求影响业务，优先核对保护范围、误拦截处置和恢复；如果接入区域是约束，先完成域名和区域条件确认。CDN5、Cloudflare 或 JQCDN 是否合适，都应在这些条件下判断。",
            "en": "For delivery problems, prioritize caching, routes, and observability. For disruptive request patterns, prioritize coverage, false-positive handling, and recovery. For regional constraints, establish eligibility first. CDN5, Cloudflare, or JQCDN can only be assessed against those concrete conditions."
          },
          {
            "zh": "“哪个防护一定更强？”公开页面不足以给出这样的结论。“免费服务能否承担生产业务？”需要看功能、容量、支持和风险接受程度，而不是只看价格标签。“接入后能否保证永不宕机？”任何真实系统都应准备故障处置，不应该把绝对承诺当成架构。\n\n一个可以交给团队执行的结论通常很朴素：为什么选择这个方案，哪些业务已经验证，哪些情况还需要支持，达到什么条件时扩容或迁移。把这四句话写清楚，再附上测试记录和报价依据，才算完成一次可复查的高防 CDN 选型。",
            "en": "Public pages cannot establish an unconditional winner. Free versus paid is not a complete risk model, and no architecture should rely on a promise of permanent availability. Record why the selected service fits, what was verified, which cases require support, and what would trigger expansion or migration."
          }
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "url": "https://developers.cloudflare.com/ddos-protection/",
        "label": {
          "zh": "Cloudflare DDoS 防护文档",
          "en": "Cloudflare's DDoS documentation"
        }
      },
      {
        "url": "https://www.cdn5.com/",
        "label": {
          "zh": "高防CDN",
          "en": "high-defense CDN"
        }
      },
      {
        "url": "https://developers.cloudflare.com/cache/concepts/default-cache-behavior/",
        "label": {
          "zh": "默认缓存行为",
          "en": "default cache behavior"
        }
      },
      {
        "url": "https://www.jqcdn.com/",
        "label": {
          "zh": "免备案CDN",
          "en": "CDN onboarding without mainland filing"
        }
      }
    ]
  },
  {
    "id": "browser-cdn-benchmark-method",
    "status": "published",
    "date": "2026-10-13",
    "modified": "2026-10-14",
    "readTime": 10,
    "category": {
      "zh": "测速与诊断",
      "en": "Measurement and diagnosis"
    },
    "title": {
      "zh": "CDN 测速怎么测才有用：响应时间、下载速度与失败率的正确读法",
      "en": "How to benchmark a CDN: response time, download rate, and failure evidence"
    },
    "excerpt": {
      "zh": "浏览器 CDN 测速究竟测到了什么？解释响应耗时、完整读取、解码字节、CORS 与缓存的影响，并给出保留失败样本的可复查测试流程。",
      "en": "Understand what a browser benchmark measures, how caching and compression affect results, and how to design a repeatable comparison without confusing throughput with bandwidth."
    },
    "sections": [
      {
        "heading": {
          "zh": "先说结果：浏览器测速有用，但它回答的是一个局部问题",
          "en": "A browser benchmark answers a local question"
        },
        "paragraphs": [
          {
            "zh": "打开测速页，看到某个节点用了二百多毫秒，另一个用了四百多毫秒，很容易就想排出名次。问题是，这两个数字可能同时受到文件、压缩、缓存、连接复用和本地网络影响。浏览器测速真正能够回答的是：在这个时间、这个设备和网络条件下，读取这份资源的表现如何。把条件写在结果旁，它才是一条可以复查的证据。",
            "en": "A result depends on the time, device, network, object, compression, cache state, and connection behavior. Record those conditions beside the number. A browser test can expose repeated failures or stable differences in a particular environment, but a few requests cannot establish global superiority or attack resilience."
          },
          {
            "zh": "这并不意味着浏览器数据没有价值。它可以帮助发现某个访问地明显超时、某份资源不支持跨域读取，或者同样内容经过不同交付路径时出现稳定差异。但它不能单凭几次请求证明全球性能，更不能把文件下载速度当作 DDoS 防护测试。测速前先写下要回答的问题，往往能省掉大量无意义的重复点击。\n\n本文按本站工具的实际实现解释指标，再给出可执行的对比流程。涉及 API 行为的依据来自 MDN 等官方技术资料；文中的数字例子用于说明计算方法，不是对任一服务商的测评。完整指标范围可与本站[测量说明](methodology/)一起阅读。",
            "en": "This guide follows the site's actual implementation. Numerical examples explain arithmetic rather than report provider performance. Read the [measurement notes](methodology/) for the scope of the tool, and decide which operational question the experiment should answer before running it."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "从发起请求到读完文件，中间至少有两个重要时间点",
          "en": "Distinguish response availability from body completion"
        },
        "paragraphs": [
          {
            "zh": "第一个时间点是收到响应头，第二个时间点是响应体全部读完。[MDN 的 Fetch 使用说明](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)解释，fetch 返回的 Promise 获得响应时，响应体不一定已经全部到达。若只记录请求发出到 Promise 完成的时间，你看到的就不是整个文件的下载时间。",
            "en": "The [Fetch documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) explains that a response can become available before its body has finished arriving. Timing only the promise therefore does not measure a complete download."
          },
          {
            "zh": "本站的响应耗时，从发起调用前计时，到拿到响应对象为止。它可能包含浏览器调度、连接建立或复用、网络往返、服务器处理等影响，并没有单独拆出每个阶段。因此，它适合在受控条件下比较等待响应的表现，不应直接命名为 Ping，也不能被解释成单纯的源站处理时间。\n\n完整请求耗时则持续到响应体读取完毕。假如响应很快开始，但文件传输缓慢，两项指标会拉开距离；假如等待很久后迅速返回小文件，则主要时间可能消耗在前一段。两项一起看，比单独挑出一个好看的指标更有助于判断下一步该检查连接、缓存还是源站。",
            "en": "This tool records elapsed time to the response object and elapsed time until the full body is read. The first can include scheduling, connections, network travel, and server work; it is not ICMP Ping or isolated origin processing. Comparing both timings helps identify whether waiting or subsequent transfer deserves investigation."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "“有效速率”不是你家宽带的测速结果",
          "en": "Effective rate is not line capacity"
        },
        "paragraphs": [
          {
            "zh": "本站有效速率的计算方式是：实际读取的响应体字节数乘以八，再除以完整请求耗时，换算成 Mbps。它包含等待响应的时间，因此一个很小的文件即使传输阶段很快，也可能得到不高的数字。反过来，压缩或缓存等因素又可能让结果与真实线路承载的数据量产生明显差别。",
            "en": "The tool multiplies bytes read by eight and divides by complete request time to report Mbps. Waiting time is included. An illustrative one-million-byte response completed in one second produces roughly eight Mbps under this definition. Compression can make decoded bytes differ from bytes transferred on the network."
          },
          {
            "zh": "用一个纯演示的例子：一百万字节在一秒内读完，按这个口径约为 8 Mbps。如果相同内容被压缩后只传输其中一部分，而页面读取的是解码后的响应体，计算出来的数值仍以读取字节数为基础。它描述的是该次任务的有效读取效率，不等于线路额定带宽，也不是账单上的传输字节数。\n\n[PerformanceResourceTiming 文档](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming)区分了传输大小、编码后的响应体大小和解码后的响应体大小。若需要解释压缩差异，应结合浏览器网络面板和适当的时序数据，而不是将这些字段混用。报告必须注明字节口径，否则同样写着 Mbps 的两张图也可能无法比较。",
            "en": "[PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) distinguishes transfer size, encoded body size, and decoded body size. Report the byte definition explicitly. Two charts labeled Mbps may be incomparable if their timing and size denominators differ. Neither automatically measures the subscriber's broadband capacity."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "CORS 失败为什么经常被误认为 CDN 故障",
          "en": "A CORS failure is not proof of a CDN outage"
        },
        "paragraphs": [
          {
            "zh": "浏览器跨域读取资源，会受到 CORS 规则限制。地址在新标签页里能打开，不代表另一个网站里的脚本就能读取它。服务器可能已经返回内容，浏览器却因为响应没有允许当前来源而阻止脚本访问；测速工具因此无法得到可用结果。这个失败首先表示该种读取方式没有完成，不直接证明服务商节点宕机。",
            "en": "A resource that opens directly may still be unreadable to another site's script. A server can return a response that the browser withholds under CORS. The failed read establishes that the test did not complete, not that a particular node is unavailable."
          },
          {
            "zh": "[MDN 的 CORS 说明](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)指出，出于安全考虑，脚本得到的错误信息通常不足以说明全部细节。应查看开发者工具中的网络和控制台信息，再对照响应头与服务端日志。域名解析、证书、超时和跨域配置，都可能需要不同的排查路径，不能仅凭一个统一错误提示下结论。\n\n本站请求不携带身份凭据，适合公开且允许读取的测试文件。不要拿登录接口、带私人令牌的链接或包含个人信息的文件当测试对象。需要调整跨域配置时，可以参照[缓存与 CORS 配置指南](article/cache-cors-basics/)，确认允许来源与资源敏感程度相匹配。",
            "en": "[MDN's CORS guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) explains the limited error detail available to scripts. Inspect browser diagnostics and server evidence. This tool omits credentials; use authorized public resources without private tokens or personal data. See the [configuration guide](article/cache-cors-basics/) before changing response permissions."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "CORS 与跨域性能时序，还是两回事",
          "en": "Cross-origin timing has its own permission boundary"
        },
        "paragraphs": [
          {
            "zh": "即使页面已经能读取响应，也不意味着所有细分网络时序都向页面开放。PerformanceResourceTiming 对跨域资源的一些字段有限制，官方文档说明可以通过 Timing-Allow-Origin 控制相关信息的开放。它与允许读取响应的 Access-Control-Allow-Origin 承担不同职责，不能互相替代。",
            "en": "Successful body access does not expose every network timing field. Resource Timing documents restrictions and Timing-Allow-Origin, which serves a different purpose from Access-Control-Allow-Origin. A readable response can still lack detailed DNS, connection, or TLS measurements."
          },
          {
            "zh": "因此，一个测试页能下载文件，却无法准确列出 DNS、连接或 TLS 的分段耗时，并不矛盾。若报告声称测得了某个阶段，应说明数据来自哪里，以及目标资源是否满足采集条件。缺失字段不要补成零延迟，也不要把浏览器隐藏的数据当作服务端没有发生该阶段的证据。\n\n对一般选型来说，先稳定比较完整读取和成功率，通常已经能发现明显问题。只有在需要定位细分阶段时，再增加时序采集和目标资源配置。不要为了让报告显得专业，填入工具没有实际采集的指标。可解释的少量数据，比字段很多却无法复查的报表更有用。",
            "en": "Do not replace unavailable fields with claims of zero latency or invent stages the tool did not collect. Start with reliable completion times and success counts, then add detailed instrumentation when needed. A smaller set of explainable measurements is more useful than an impressive but unsupported dashboard."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "同一个文件名，也可能不是同一个测试对象",
          "en": "Confirm that the objects really match"
        },
        "paragraphs": [
          {
            "zh": "公平比较需要固定内容版本、对象大小和返回类型。一个地址返回压缩脚本，另一个返回未压缩文件，还有一个地址实际跳到了 HTML 提示页，把三者放进速度榜显然不合适。即使路径都以同样的后缀结尾，也应检查实际响应，必要时校验文件内容或摘要。",
            "en": "Fix content version, size, type, and compression conditions. Similar filenames do not prove equivalent responses: one may be compressed, another redirected, and another an HTML error. Inspect the actual object and use a content check when appropriate."
          },
          {
            "zh": "本站默认示例使用公共库资源，目的是方便观察当前浏览器的读取行为。公共库分发与自有域名接入的 CDN 服务，并不是相同的采购对象。若要比较候选服务，应把自己有权使用的相同文件部署到各家测试域名，并配置一致的响应与缓存条件。不要用不同厂商官网首页充当同一性能样本。\n\n对象大小也应贴近任务。小文件更容易受到连接和等待时间影响，大文件能覆盖更多传输阶段，却会增加测试流量。本站限制单次读取大小并拒绝 HTML 响应，是为了控制资源使用和明显的错误对象。测试量应事先估算，移动网络下尤其要注意，不要用不断增加轮次代替合理设计。",
            "en": "Public library endpoints are convenient examples, not interchangeable substitutes for self-managed CDN deployments. For procurement, deploy authorized matching files behind each candidate. Choose sizes that represent the workload without imposing unnecessary transfer costs. Small objects emphasize waiting; larger objects reveal more of the transfer phase."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "冷缓存、热缓存和随机参数要分别理解",
          "en": "Separate cold cache, warm cache, and random queries"
        },
        "paragraphs": [
          {
            "zh": "本站会加入随机查询参数，并使用不读取浏览器 HTTP 缓存的请求选项，以减少部分本地缓存干扰。但这不等于保证每次都绕过 CDN 缓存。边缘如何处理查询参数，取决于实际缓存键规则；忽略参数的节点仍可能命中，把参数纳入键的节点则可能产生不同对象。",
            "en": "The tool adds a random query value and requests no browser HTTP-cache reuse to reduce some local interference. That does not guarantee a CDN miss. Whether query strings distinguish objects depends on the effective cache key, and existing connections may still be reused."
          },
          {
            "zh": "[CloudFront 缓存键文档](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html)可以帮助理解这个区别。判断冷热缓存，应该结合实际命中状态、源站日志与平台规则，而不是看到随机字符串就认定“绝对冷缓存”。同样，浏览器已经建立的连接可能继续复用，刷新页面不一定重现完全首次访问的条件。\n\n如果业务主要依赖长期缓存的静态资源，刻意让每次请求都回源，可能测偏了目标；如果业务是不可缓存的动态接口，只测热缓存又会过度乐观。最有用的报告会分别描述两种场景，并说明哪一种接近日常业务。测试目的决定条件，不应倒过来为更好的成绩挑条件。",
            "en": "The [CloudFront cache-key documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html) illustrates the distinction. Confirm hit state using actual platform behavior and logs. Forced misses can misrepresent a static workload, while warm-cache-only results can misrepresent dynamic requests. Let the business question determine the test conditions."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "失败率要保留，成功样本也别只取最快一次",
          "en": "Keep failures and avoid fastest-run selection"
        },
        "paragraphs": [
          {
            "zh": "假设甲完成十次请求其中九次成功，乙十次全部成功，只比较成功样本的最快值就会隐藏重要差异。应先写出尝试次数、成功次数、失败类型，再讨论成功请求的耗时分布。用户主动取消也应与网络失败区分，因为取消不代表服务没有能力完成该请求。",
            "en": "List attempts, successes, and failure types before comparing successful timings. User cancellation should be distinguished from network failure. A candidate with one very fast response and repeated failures should not win simply because the report selects its best run."
          },
          {
            "zh": "本站对成功样本计算中位数，并单独记录失败与取消。中位数比挑最快一次更不容易被偶然值主导，但它不能替代完整分布，更不是稳定性保证。样本只有三次时，一个漂亮的中位数所代表的信息很有限；需要看尾部延迟或百分位时，应采用足够样本和清楚的方法，不能凭几次请求写出可靠的 P99 结论。\n\n报告里保留异常样本，是为了让下一次排查有线索。某一轮显著变慢，可能是本地网络活动、源站响应、连接状态或缓存变化。记录时间与条件后再复测，比直接删除“离群值”更负责。只有在明确发现采集错误并说明处理规则时，才应调整样本集合。",
            "en": "This tool reports medians for successful samples and records failures and cancellations. A median is not a guarantee, and a few samples cannot support a reliable tail-percentile claim. Preserve unusual results with their context and investigate before excluding them. Document any justified data-cleaning rule."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "一套适合小团队的测速顺序",
          "en": "Use a practical, repeatable sequence"
        },
        "paragraphs": [
          {
            "zh": "先从真实业务目标出发，选两三个重要地区和主要网络，再选择能够代表请求特征的资源。每个候选使用相同版本、相同大小和相同类型的对象，记录证书、压缩、缓存规则与回源配置。在测试前确认内容能被正常读取，避免把配置故障混进线路比较。",
            "en": "Choose important regions and networks, prepare equivalent objects, and record certificates, compression, cache policy, and origin configuration. Confirm that every object is readable before comparing delivery. Run limited repetitions and save raw results."
          },
          {
            "zh": "随后做少量重复请求，保存原始结果；在不同时间段复测，并改变候选顺序，减少把时间变化误认为厂商差异的机会。如果测试期间设备在同步大文件、切换网络或运行其他任务，应标注这一条件。比较的是受控环境里的相对表现，不必把每一个波动都解释成网络架构结论。\n\n最后回到真实页面，验证用户关心的动作。图片加载、页面可读、登录成功和文件下载完成，各自关注的体验不同。测速结果不错，而实际页面仍很慢时，需要继续检查资源体积、阻塞脚本、第三方请求和应用服务，而不是一遍遍换节点。本文的[CDN 选型指南](article/cdn-selection-framework/)提供了把这些证据纳入采购的方法。",
            "en": "Repeat in other time windows, vary candidate order, and note local network changes or competing transfers. Then verify actual user journeys, since page readability and successful sign-in matter beyond file downloads. The [CDN selection guide](article/cdn-selection-framework/) shows how to include these findings in a purchasing decision."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "防护产品与免备案方案，测速应回答什么",
          "en": "Keep delivery measurements separate from product promises"
        },
        "paragraphs": [
          {
            "zh": "评估[高防CDN](https://www.cdn5.com/)时，浏览器测速可以观察正常请求的交付体验，但无法证明攻击下的容量和保护效果。后者要依据具体方案、授权测试和厂商证据。把平时速度与防护能力分开记录，有助于避免“下载很快，所以一定扛得住攻击”这样的推断。",
            "en": "When evaluating a [high-defense CDN](https://www.cdn5.com/), local downloads describe normal delivery, not attack capacity. That requires a defined plan, supporting evidence, and authorized validation. A fast file read is not proof that the application will remain healthy under abuse."
          },
          {
            "zh": "评估[免备案CDN](https://www.jqcdn.com/)时，测试重点仍然是目标用户、访问时段和回源条件。产品接入条件与线路质量是不同问题，应该分别确认。某个地区一次成功并不能代表所有网络长期稳定，某个时段表现较差也需要进一步确定是源站、边缘还是本地条件导致。\n\n不同平台的官方测速示例，也可能使用不同文件和测量方式。引用外部成绩时，应同时保留来源、时间与条件；无法获取这些信息，就不要将其混入自己的统一排名。对供应商资料的解释，可参阅[防护服务比较方法](article/cdn5-cloudflare-compare/)。",
            "en": "For [offshore CDN onboarding](https://www.jqcdn.com/), test relevant users, periods, and origin paths while confirming eligibility separately. External benchmark charts may use different objects and methods. Retain their sources and conditions rather than merging them into a misleading common ranking; see the [protection comparison](article/cdn5-cloudflare-compare/)."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "如何写出一份不会误导下一位读者的结果",
          "en": "Make the result useful to the next reader"
        },
        "paragraphs": [
          {
            "zh": "结果页至少写清六件事：测试何时发生、在哪里进行、网络是什么、请求哪份文件、采用什么缓存条件、样本如何统计。再附上失败数、原始数据和已知限制。如果想给出选择建议，应把建议约束在已验证的业务范围内，例如“这组条件下读取更稳定”，不要跳成“全球最快”。",
            "en": "A report should name when and where testing occurred, the network, object, cache conditions, and aggregation method. Add failures, raw observations, and limitations. Constrain recommendations to the environment that was actually verified."
          },
          {
            "zh": "“为什么上午与晚上结果不同？”先核对网络负载、对象状态、连接和源站，差异本身就是需要解释的观察。“为什么命令行可以而网页失败？”除了请求条件不同，还应检查浏览器跨域限制。“为什么速度超过了理解中的带宽？”先确认是否使用解码字节、是否有缓存以及时间统计口径。\n\n测速的价值，是帮助下一步做决定：调整缓存、改变资源、检查回源，或者淘汰无法满足关键地区需求的方案。当报告能让另一位同事按同样条件复测，并理解数字为何变化，数据才真正从一张成绩单变成了工程证据。",
            "en": "Morning and evening differences need context; command-line success with browser failure calls for checking request conditions and CORS; surprising throughput calls for examining bytes and timing. The goal is a decision about caching, resources, origins, or candidate suitability that another colleague can reproduce and challenge."
          }
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
        "label": {
          "zh": "MDN 的 Fetch 使用说明",
          "en": "Fetch documentation"
        }
      },
      {
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming",
        "label": {
          "zh": "PerformanceResourceTiming 文档",
          "en": "PerformanceResourceTiming"
        }
      },
      {
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
        "label": {
          "zh": "MDN 的 CORS 说明",
          "en": "MDN's CORS guide"
        }
      },
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html",
        "label": {
          "zh": "CloudFront 缓存键文档",
          "en": "CloudFront cache-key documentation"
        }
      },
      {
        "url": "https://www.cdn5.com/",
        "label": {
          "zh": "高防CDN",
          "en": "high-defense CDN"
        }
      },
      {
        "url": "https://www.jqcdn.com/",
        "label": {
          "zh": "免备案CDN",
          "en": "offshore CDN onboarding"
        }
      }
    ]
  },
  {
    "id": "cache-cors-basics",
    "status": "published",
    "date": "2026-10-13",
    "modified": "2026-10-14",
    "readTime": 11,
    "category": {
      "zh": "缓存与跨域",
      "en": "Caching and cross-origin requests"
    },
    "title": {
      "zh": "CDN 缓存与 CORS 配置：从响应头到上线验收，排查内容不更新和跨域失败",
      "en": "CDN caching and CORS: response headers, stale content, and release checks"
    },
    "excerpt": {
      "zh": "接入 CDN 后内容不更新、接口跨域失败或登录状态异常，应该先查什么？按缓存层、Cache-Control、缓存键、CORS 和 OPTIONS 拆解上线验收。",
      "en": "Troubleshoot stale content and cross-origin failures by separating browser caches, edge policies, cache keys, credentials, preflights, and application correctness."
    },
    "sections": [
      {
        "heading": {
          "zh": "页面能打开，为什么接口还是报错",
          "en": "Start with the actual response"
        },
        "paragraphs": [
          {
            "zh": "把资源接到 CDN 后，常见的麻烦不一定是速度，而是行为改变了：浏览器地址栏能打开文件，页面脚本却读不到；后台已经发布新内容，用户仍看到旧版本；匿名访问正常，登录后偶尔拿到不该出现的结果。这些现象分别涉及跨域权限、缓存更新和响应隔离，不能用“刷新一下 CDN”统一解决。",
            "en": "After CDN onboarding, a directly accessible file may become unreadable to a page script, published content may stay stale, or signed-in behavior may change. These involve different mechanisms. Inspect the request and response, locate the relevant cache layer, then check origin permissions and identity handling."
          },
          {
            "zh": "可以先记住一个排查顺序：确认实际请求和响应，识别是哪一层缓存，再检查跨域许可与业务身份。响应状态、Content-Type、Cache-Control、Age、Vary 和相关平台的命中信息，都比页面上的笼统报错更接近事实。不过，单个头字段也不能包办判断，仍需结合 CDN 规则、浏览器行为和源站日志。\n\n本文围绕一个假设的业务组合展开：公开文章页、带内容指纹的静态文件，以及登录后的接口。所有配置取舍都应回到资源特性。需要先确定接入服务的读者，可以从[CDN 选型指南](article/cdn-selection-framework/)开始；本文则关注接入以后怎样保证内容正确、更新可控和问题可复查。",
            "en": "Status, content type, Cache-Control, Age, Vary, and vendor-specific cache information help establish what happened, but no single header explains the whole path. This guide uses a hypothetical mix of public pages, versioned files, and private APIs. For purchasing decisions, start with the [CDN selection guide](article/cdn-selection-framework/)."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "先分清浏览器缓存、边缘缓存与源站",
          "en": "Separate browser, edge, and origin state"
        },
        "paragraphs": [
          {
            "zh": "浏览器缓存为本地访问保存内容，CDN 边缘缓存可能为多个访问者复用内容，源站则产生或保存原始响应。清除 CDN 缓存，只影响相应边缘层，通常不能让已经保存内容的浏览器立即忘掉文件。反过来，在自己的浏览器里清缓存，也不代表其他用户或边缘节点发生了同样的变化。",
            "en": "Browser caches serve local reuse; edge caches can share responses among visitors; origins generate or store the source content. Purging an edge does not necessarily invalidate an already cached browser copy. Clearing one browser does not change other visitors' state."
          },
          {
            "zh": "这一区别直接影响发布策略。若一个脚本文件长期缓存，又不断覆盖同一个 URL，用户可能在一段时间内继续得到旧内容。对于版本化资源，更稳妥的设计通常是内容变化就更换 URL，页面引用新版本，同时保留旧资源一段时间。这样旧页面仍能找到对应文件，而不必要求所有缓存同时刷新。\n\n公开页面和用户接口不能照搬这套长期缓存思路。文章改错可能允许短暂延迟，库存、交易状态和用户资料却有不同的正确性要求。上线前写清每类资源允许多久不更新，再决定 TTL、验证和失效策略；不能因为默认设置方便，就让所有内容共享一组参数。",
            "en": "Versioned asset URLs can make releases more predictable: publish a new URL when content changes and retain old files for older pages. Public pages and private APIs need different freshness requirements. Define acceptable staleness before choosing TTL and invalidation behavior."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "no-cache 与 no-store 不只是名字相近",
          "en": "Understand no-cache, no-store, and shared-cache controls"
        },
        "paragraphs": [
          {
            "zh": "[MDN 的 Cache-Control 文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)区分了多个响应指令。no-cache 的核心含义是复用前需要验证，并不等于完全不能存储；no-store 则要求缓存不要存储该次响应。把二者当成同义词，容易让排查朝错误方向走。还要区分请求指令和响应指令，不能看到请求写着某个值，就推断每一层已经按同样方式处理。",
            "en": "[MDN's Cache-Control reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control) distinguishes storage from reuse. No-cache requires validation before reuse; no-store directs caches not to store the response. Request directives and response directives must also be distinguished."
          },
          {
            "zh": "private 表达的是响应不应存入共享缓存，而不是一份身份验证机制。它不会代替登录校验，也不能阻止拿到响应的用户自行保存内容。public 则允许共享缓存存储符合条件的响应，不能因为想提高命中率就给个人化页面加上它。缓存许可和业务访问权限，是两件必须分别设计的事。\n\nmax-age 表示新鲜度时间，s-maxage 面向共享缓存，适用范围有所区别。即便源站已经给出合理指令，CDN 上的自定义规则仍可能改变行为。排查时应把源站响应和边缘实际返回进行对比，并核对规则优先级。标准文档说明指令语义，服务商文档说明平台具体怎样实现，两种证据缺一不可。",
            "en": "Private limits shared caching rather than providing authentication. Public must not be applied casually to personalized data. Max-age and s-maxage have different scopes. Compare origin headers with the actual edge response and effective rules, since custom platform settings can change default handling."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "缓存键写错，内容就可能被错误地复用",
          "en": "Derive the cache key from response variation"
        },
        "paragraphs": [
          {
            "zh": "缓存键可以理解为缓存系统识别一份响应的依据。路径相同，但语言、图片尺寸、查询参数或身份条件不同，响应可能不同；这些差异如果没有被正确识别，就有错误复用的风险。反过来，把每个随机参数都纳入键，又可能使原本相同的内容无法共享，造成大量重复对象与回源。",
            "en": "The same path can produce different languages, sizes, identities, or signed content. Failing to distinguish meaningful inputs risks serving the wrong object; including every irrelevant value fragments the cache. Start from which inputs genuinely change the response."
          },
          {
            "zh": "[CloudFront 缓存策略文档](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html)说明了请求头、Cookie 和查询参数如何参与缓存键。设计时可以从业务逻辑反推：哪些输入确实改变响应，哪些只是统计来源，哪些带有身份或签名信息。不能为了提高命中率就一概忽略查询参数，也不能为了“保险”把所有信息都加进去。\n\n用图片处理接口举例：宽度参数改变输出尺寸，通常需要区分；一个仅用于访问分析的参数可能不改变内容，但是否可以忽略仍需确认应用行为。带访问签名的请求还涉及授权和有效期，必须检查命中缓存时访问控制是否仍然成立。高命中率如果来自错误地绕开业务条件，就不是优化结果。",
            "en": "The [CloudFront cache-policy documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html) explains headers, cookies, and queries. Image dimensions may need separation; analytics parameters may not, depending on application behavior. Signed access requires verifying authorization on cache hits too. A high hit ratio is not a success when it bypasses business conditions."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "登录态、Cookie 和 Authorization 要先画边界",
          "en": "Draw the boundary around user-specific responses"
        },
        "paragraphs": [
          {
            "zh": "用户相关接口的默认原则应是谨慎处理共享缓存。个人资料、订单、余额和后台操作，不适合仅凭路径相同就复用响应。测试时需要至少两个不同身份的账号和一个匿名访问者，确认每次得到的是正确内容；仅用一个账号反复刷新，很容易漏掉隔离问题。",
            "en": "Profiles, orders, balances, and administration should not be shared merely because paths match. Test at least two identities and an anonymous visitor. One account repeatedly refreshing cannot reveal every isolation error."
          },
          {
            "zh": "响应带 Set-Cookie 时，平台的默认缓存处理也可能不同。[Cloudflare 默认缓存行为](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)列出了相关条件，但实际结果仍与配置有关。不要根据某个平台的默认设置，推断所有产品或自己新增的规则都能提供相同保护。规则变更需要重新跑业务用例。\n\nAuthorization 等请求信息同样不能仅靠名字判断。哪些请求转发到源站、哪些字段参与缓存键、命中缓存前是否执行权限判断，都应说清楚。对确实公开且与用户无关的响应，可以单独建立安全策略；对不确定的接口，先保持不共享缓存，再通过明确的业务审查逐步放开。",
            "en": "Set-Cookie and authorization handling depend on platform rules and configuration. Read [Cloudflare's default behavior](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/) where relevant, then verify the deployed policy. For uncertain endpoints, begin without shared caching and approve narrowly defined exceptions through application review."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "CORS 控制脚本读取，不负责保护你的业务接口",
          "en": "CORS governs browser reads, not application authorization"
        },
        "paragraphs": [
          {
            "zh": "[MDN 的 CORS 指南](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)解释了浏览器怎样根据响应中的许可决定是否将跨域响应交给脚本。这里的跨域由协议、主机名和端口共同决定。两个地址看起来属于同一个品牌，也可能是不同来源；而命令行客户端通常不会按浏览器的相同方式执行这项限制。",
            "en": "[MDN's CORS guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) describes how browsers expose cross-origin responses. Origins include scheme, host, and port. A direct browser navigation or command-line success does not establish that a different website's script can read the response."
          },
          {
            "zh": "因此，“浏览器报跨域错”不能直接解释成请求没有到服务器。某些请求可能已经发送并被处理，只是响应没有对脚本开放。身份认证、授权和防跨站请求伪造等机制仍需要独立设计。把允许来源写得很窄，不等于接口对所有其他调用者都无法访问。\n\n对于公开、无需凭据的静态资源，可以按产品用途选择允许范围；对于携带凭据的请求，需要明确允许的来源，并满足相应凭据配置。不要照抄一个通配符就以为覆盖了所有场景。实际使用是否带 Cookie、是否需要额外请求头、请求方法是什么，都应纳入测试。",
            "en": "Some requests may already have reached the server before the browser withholds access to the response. Authentication, authorization, and CSRF protection still need independent design. Choose permission scopes around whether a resource is public and whether credentials, custom headers, or particular methods are involved."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "带凭据的跨域请求，为什么不能随意用星号",
          "en": "Credentialed reads need explicit origin handling"
        },
        "paragraphs": [
          {
            "zh": "在带凭据的跨域读取场景中，Access-Control-Allow-Origin 不能使用通配符代替具体允许来源。服务器需要按可信名单判断请求来源，再返回符合规则的许可。同时，浏览器端的凭据模式、Cookie 自身的属性与其他安全限制也会影响结果。即使一处响应头正确，整条请求链仍可能没有满足条件。",
            "en": "Credentialed cross-origin access cannot use a wildcard allowed origin in place of a specific permitted origin. Client credential mode, cookie properties, and other browser rules also matter. One correct response field does not establish the entire request path."
          },
          {
            "zh": "不要把请求中的 Origin 原样反射回去，便宣称完成了安全配置。首先要判断它是否属于允许的来源，其次要考虑缺失或不匹配时怎样处理。对于包含个人数据的接口，跨域许可的变更应和访问权限一起审查，而不是由前端为了消除报错临时放开。\n\n更容易复查的做法是准备三组请求：允许来源、未允许来源和正常同源调用。验证响应头和页面行为是否符合预期，再观察边缘命中后是否仍然正确。仅看到一次成功，不能证明策略不会对其他来源错误放行，也不能证明缓存没有复用上一次的许可。",
            "en": "Do not reflect arbitrary Origin values as a shortcut. Validate against intended callers and test allowed, disallowed, and same-origin cases. Repeat after a cache hit to ensure a previously generated permission is not incorrectly reused for another origin. Sensitive response access deserves application-level review."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "动态返回允许来源时，要同时检查缓存变体",
          "en": "Match dynamic origin permissions to cache variants"
        },
        "paragraphs": [
          {
            "zh": "如果服务器依据 Origin 返回不同的 Access-Control-Allow-Origin，就需要考虑缓存如何区分这些响应。MDN 的 CORS 文档给出了 Vary: Origin 的相关说明。但把 Vary 写进响应并不意味着所有 CDN 配置都会自动按你想象的方式存储变体，仍应核对平台支持与实际缓存键。",
            "en": "When Access-Control-Allow-Origin varies by request origin, consider how those variants are cached. MDN documents Vary: Origin, but platform support and cache-key configuration must still be checked rather than assumed."
          },
          {
            "zh": "一个典型排查思路是：先从允许来源甲请求，再从允许来源乙请求，观察命中缓存后许可字段是否与来源匹配；随后测试未允许来源。如果响应体本身还随身份或其他条件改变，问题会更复杂，不应只靠 Origin 区分。跨域权限正确与内容隔离正确，需要分别验证。\n\n同样要检查响应错误时的头信息。成功响应带有跨域许可，错误响应没有，前端就可能只能看到笼统网络错误，无法读取业务错误码。团队应决定哪些错误响应可以公开，以及如何在边缘和源站一致地返回；不能为了调试方便把所有敏感错误内容暴露出来。",
            "en": "Request from two allowed origins and then a disallowed one, observing cached responses as well as misses. If content also depends on identity, origin variation alone cannot provide isolation. Decide which error responses may be exposed and return consistent, intentional permissions without leaking sensitive diagnostics."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "OPTIONS 预检不要和正文请求混成一个指标",
          "en": "Treat preflights as a separate request stage"
        },
        "paragraphs": [
          {
            "zh": "某些跨域请求会先进行 OPTIONS 预检，浏览器确认允许的方法和请求头后，再发送实际请求。是否需要预检取决于请求条件，而不是简单地由 GET 或 POST 两个字决定。预检失败时，实际请求可能根本没有按预期发送；这与已经返回正文但脚本无法读取，是不同的排查路径。",
            "en": "Some requests first use OPTIONS to check permitted methods and headers. The trigger depends on the full request conditions, not merely GET versus POST. A failed preflight and an unreadable response after a sent request are different failure paths."
          },
          {
            "zh": "检查网关和防护规则是否正确处理 OPTIONS，确认重定向、认证要求或统一拦截是否影响它。预检响应与实际响应各自需要什么许可，也要分别核对。对于返回缓存结果的边缘节点，仍然要确保相关许可与当前请求相符。不要只测试一个最简单的无凭据请求，就认为复杂业务已经覆盖。\n\n预检结果的缓存也有独立机制，不能与文件内容的 CDN TTL 混为一谈。浏览器行为和限制需要参照对应文档与实际环境。排查期间修改了配置而结果没有立刻变化时，应明确是哪一层状态仍在生效，再选择适当的验证方式，避免反复调整多个地方后失去因果关系。",
            "en": "Check gateway, authentication, redirect, and protection behavior for OPTIONS. Verify both preflight and actual-response permissions. Preflight caching is distinct from edge object TTL. When a change appears ineffective, identify the retained state before modifying several layers at once."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "清缓存以后还看到旧内容，按这条顺序检查",
          "en": "Trace stale content from deployment outward"
        },
        "paragraphs": [
          {
            "zh": "先确认部署是否真的更新：源站对应路径返回的是哪个版本，构建产物与页面引用是否匹配。随后检查边缘层是否命中、刷新任务是否针对正确域名和路径，以及查询参数或不同内容变体有没有漏掉。接着看浏览器是否仍在复用本地内容，最后检查页面中是否有应用级缓存或其他中间层。",
            "en": "First confirm that the origin serves the expected version and that page references match the deployed assets. Then inspect the relevant edge object, purge scope, query variants, and browser reuse. Application caches and intermediary layers can add further state."
          },
          {
            "zh": "不要一次性清空所有缓存作为默认操作。大范围失效可能增加回源压力，也会让现象暂时消失而原因仍然存在。能够定位到一个版本、路径或资源集合时，就先使用有范围的刷新，并观察源站负载。对于重要发布，提前安排回滚和旧资源保留，比出问题后临时寻找文件更稳妥。\n\n还要确认“旧内容”是否其实来自不同数据源。例如页面引用了旧接口地址，或者部分用户仍使用旧版客户端，单独刷新 CDN 不会修改它们的请求。版本标识、响应日志和发布时间可以帮助关联问题，不必依赖用户描述中的“好像还是昨天那版”。",
            "en": "Avoid whole-cache purges as the routine first response: they can increase origin pressure and hide the cause. Prefer scoped invalidation where possible, retain old release resources, and keep a rollback plan. Also check whether older clients or outdated API references are simply requesting different content."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "接入高防或境外线路，也不能省掉这份配置验收",
          "en": "Revalidate configuration when switching delivery products"
        },
        "paragraphs": [
          {
            "zh": "更换为[高防CDN](https://www.cdn5.com/)后，除了交付与缓存，还应关注规则是否影响接口、预检和合法机器调用。若某个错误响应实际是防护页面，需要结合事件日志定位，不能简单地补一个跨域头就算修好。防护产品的公开资料是功能说明，业务是否兼容仍然需要按真实流程验证。",
            "en": "After moving to a [high-defense CDN](https://www.cdn5.com/), check whether rules affect APIs, preflights, or legitimate machine callers. A protection page cannot be repaired merely by adding a cross-origin header; inspect the event and expected response first."
          },
          {
            "zh": "采用[免备案CDN](https://www.jqcdn.com/)等接入方案时，域名与线路条件也不会改变 HTTP 缓存和浏览器权限这些基本问题。目标地区、回源方式与缓存策略都要重新核对。不同服务商的控制台术语可能不同，迁移时应逐项映射行为，不要只按开关名称一一照搬。\n\n比较不同平台可以参考[CDN5、Cloudflare 与接入方案分析](article/cdn5-cloudflare-compare/)。其中最重要的思路同样适用于配置：保留待确认项，记录实际响应，不把某家官方介绍或一张控制台截图当作完整验收。",
            "en": "An [offshore CDN option](https://www.jqcdn.com/) does not change HTTP cache semantics or browser permission boundaries. Recheck regions, origin paths, and rule behavior during migration. The [service comparison guide](article/cdn5-cloudflare-compare/) explains why real responses and documented unknowns matter more than similarly named switches."
          }
        ],
        "bullets": []
      },
      {
        "heading": {
          "zh": "上线前最后一轮，应由业务请求来验收",
          "en": "Finish with business-level acceptance"
        },
        "paragraphs": [
          {
            "zh": "准备匿名、登录和不同权限身份，分别访问公开页面、静态文件和关键接口；让允许与未允许的跨域来源各执行一次；更新一份资源，确认新旧版本的处理符合计划；模拟一个可撤销的错误，观察状态、日志和恢复。测试都在自己有权操作的范围内进行，并记录具体请求与时间。",
            "en": "Exercise anonymous and authenticated users, different roles, allowed and disallowed origins, resource updates, and reversible error cases within an authorized environment. Preserve requests and timestamps. Verify monitoring for wrong content types, unusual status codes, cache changes, and origin demand."
          },
          {
            "zh": "随后验证监控是否能发现内容类型错误、异常状态、命中率变化和回源突增。监控图表不必很多，但需要让值班人员知道何时采取什么动作。对外发布前保存最终配置和回滚入口，避免测试时临时增加的许可或放行规则留在生产环境。\n\n如果还想用浏览器观察读取表现，可以使用[实测工具](lab/)并结合[测速指标解释](article/browser-cdn-benchmark-method/)。不过，速度只能在内容和权限都正确时讨论。一次正确的缓存命中，应同时满足对象正确、用户正确、许可正确和更新策略正确；少了任何一项，数字再快也不能算完成优化。",
            "en": "Save final configuration and rollback instructions, removing temporary allowances used during debugging. The [benchmark tool](lab/) and [measurement guide](article/browser-cdn-benchmark-method/) can then help inspect delivery. Speed becomes useful only after the object, user, permissions, and update behavior are correct."
          }
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control",
        "label": {
          "zh": "MDN 的 Cache-Control 文档",
          "en": "MDN's Cache-Control reference"
        }
      },
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html",
        "label": {
          "zh": "CloudFront 缓存策略文档",
          "en": "CloudFront cache-policy documentation"
        }
      },
      {
        "url": "https://developers.cloudflare.com/cache/concepts/default-cache-behavior/",
        "label": {
          "zh": "Cloudflare 默认缓存行为",
          "en": "Cloudflare's default behavior"
        }
      },
      {
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
        "label": {
          "zh": "MDN 的 CORS 指南",
          "en": "MDN's CORS guide"
        }
      },
      {
        "url": "https://www.cdn5.com/",
        "label": {
          "zh": "高防CDN",
          "en": "high-defense CDN"
        }
      },
      {
        "url": "https://www.jqcdn.com/",
        "label": {
          "zh": "免备案CDN",
          "en": "offshore CDN option"
        }
      }
    ]
  }
];

export const PROVIDERS = providerOverrides ?? BASE_PROVIDERS;
export const ARTICLES = articleOverrides ?? [...NEW_ARTICLES, ...BASE_ARTICLES];
export const providerCategories = ['security', 'cloud', 'programmable', 'delivery'];

