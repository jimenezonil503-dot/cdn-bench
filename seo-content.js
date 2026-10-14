const copy = (zh, en) => ({ zh, en });

export function getProviderSeo(provider) {
  return provider.seo ?? providerSeo[provider.id] ?? {
    title: copy(`${provider.name} CDN 介绍与选型指南`, `${provider.name} CDN profile and selection guide`),
    description: provider.intro,
    analysis: provider.watchouts,
    questions: [copy('服务区域、套餐限制、SLA 和费用如何确认？', 'How are service regions, plan limits, SLA, and pricing confirmed?'), copy('缓存、回源和安全能力是否满足真实业务？', 'Do caching, origin, and security capabilities fit the workload?')],
  };
}

export const providerSeo = {
  cdn5: {
    title: copy('CDN5 CDN 测评与选型：高防加速、DDoS 和 WAF 能力解析', 'CDN5 CDN Review: Security-First Delivery, DDoS and WAF'),
    description: copy('了解 CDN5 高防 CDN、DDoS/CC 防护与 WAF 的公开能力、适用业务、接入注意事项和独立实测边界。非性能排名。', 'Explore CDN5 high-defense CDN, DDoS/CC and WAF capabilities, ideal workloads, migration questions, and independent testing limits. No invented ranking.'),
    analysis: copy('CDN5 适合从防护需求切入候选清单。除静态文件加载体验，还应在合同和测试环境中分别核对攻击清洗策略、回源稳定性以及不同地区的实际访问结果。', 'CDN5 belongs on a shortlist when mitigation is a primary requirement. Validate attack handling, origin stability, and regional user experience independently of static-file delivery.'),
    questions: [copy('高防、WAF、WebSocket 分别在哪些套餐可用？', 'Which plans include mitigation, WAF, and WebSocket support?'), copy('如何验证清洗阈值、误拦截与回源切换？', 'How will you test mitigation thresholds, false positives, and origin failover?')],
  },
  yewsafe: {
    title: copy('YewSafe CDN 评测指南：SCDN、Anycast 与 DDoS 防护怎么选', 'YewSafe CDN Review: SCDN, Anycast and DDoS Protection'),
    description: copy('梳理 YewSafe 官网 SCDN、Anycast CDN、DDoS 防护和 Edge AI 产品定位，说明企业接入场景、官网声明与待验证事项。', 'Review YewSafe SCDN, Anycast CDN, DDoS mitigation, and Edge AI positioning, with enterprise use cases and claims to verify before purchase.'),
    analysis: copy('YewSafe 把内容交付与防护产品放在同一产品矩阵。若业务同时面对流量高峰和攻击风险，应分别验证业务文件分发、攻击期间可用性与源站保护，而不是把官网宣称的节点规模当作实测结论。', 'YewSafe groups delivery and protection in one portfolio. For bursty or attack-prone workloads, test file delivery, availability during mitigation, and origin shielding separately; do not treat published network-size claims as an independent result.'),
    questions: [copy('SCDN 与 Anycast CDN 的接入、缓存和计费如何区别？', 'How do SCDN and Anycast CDN differ in onboarding, caching, and billing?'), copy('防护阈值、可用区、SLA 和攻击流量条款能否书面确认？', 'Can protection thresholds, regions, SLA, and attack-traffic terms be confirmed in writing?')],
  },
  cloudflare: {
    title: copy('Cloudflare CDN 测评与选型：缓存、安全和反向代理接入', 'Cloudflare CDN Review: Caching, Security and Reverse Proxy'),
    description: copy('解析 Cloudflare CDN 的反向代理、缓存规则、分层缓存与安全集成，附适用场景、回源与费用注意事项。无虚构测速排名。', 'Understand Cloudflare CDN reverse proxy, cache rules, tiered caching, and security integration, with origin, cost, and workload considerations.'),
    analysis: copy('Cloudflare 通常以 DNS 与反向代理方式接入。评估时不要只看首页加载；应为静态内容、登录态与匿名 API 分别制定缓存策略，并记录命中率与回源行为。', 'Cloudflare commonly sits in front of a site as a DNS-managed reverse proxy. Evaluate static assets, authenticated traffic, and anonymous APIs separately, and inspect cache hits and origin requests.'),
    questions: [copy('哪些响应允许缓存，如何避免缓存登录态数据？', 'Which responses are cacheable without exposing authenticated data?'), copy('缓存规则、清缓存、日志与安全功能在哪个套餐中？', 'Which plan provides the required cache rules, purge, logs, and security features?')],
  },
  akamai: {
    title: copy('Akamai CDN 测评与选型：企业内容交付与复杂回源', 'Akamai CDN Review: Enterprise Delivery and Origin Controls'),
    description: copy('了解 Akamai 企业 CDN 的缓存、回源、媒体交付与规则配置方向，附大规模业务选型问题和待验证的实测边界。', 'Explore Akamai enterprise delivery, caching, media distribution, and origin controls with practical enterprise evaluation questions.'),
    analysis: copy('对多业务线和媒体分发团队，规则治理与日常运维通常比单个速度数字更重要。应按业务类型逐项验证配置发布、回滚、日志、跨区域回源以及合同保障。', 'For complex media and enterprise properties, rule governance and operations can matter more than one speed number. Test configuration releases, rollback, logging, regional origins, and contractual coverage.'),
    questions: [copy('复杂缓存规则如何审核、发布和回滚？', 'How are complex cache rules reviewed, deployed, and rolled back?'), copy('媒体流量、下载流量与应用流量分别如何计费？', 'How are media, download, and application workloads billed?')],
  },
  fastly: {
    title: copy('Fastly CDN 测评与选型：可编程边缘与实时可观测', 'Fastly CDN Review: Programmable Edge and Real-Time Visibility'),
    description: copy('分析 Fastly CDN 的边缘控制、快速清缓存与实时可观测能力，梳理 API、动态站点和频繁发布团队的选型问题。', 'Examine Fastly CDN programmable controls, fast purge, and real-time observability for APIs, dynamic sites, and frequent deployments.'),
    analysis: copy('Fastly 的优势方向是让工程团队更精细地控制边缘行为。候选验证应包含配置变更流程、缓存失效延迟、日志可用性与故障回退，而不只比较一次下载。', 'Fastly emphasizes fine-grained edge control. A realistic evaluation should include deployment workflows, purge behavior, log access, and rollback, not just a single file transfer.'),
    questions: [copy('缓存失效与发布回滚如何纳入现有 CI 流程？', 'How do purge and rollback integrate with the deployment pipeline?'), copy('哪些实时日志和边缘功能需要额外预算？', 'Which real-time logging or edge features add cost?')],
  },
  cloudfront: {
    title: copy('Amazon CloudFront 测评与选型：AWS CDN、S3 与边缘计算', 'Amazon CloudFront Review: AWS CDN, S3 and Edge Compute'),
    description: copy('了解 Amazon CloudFront 与 AWS 源站、缓存策略和边缘计算的组合，附安全、回源与成本评估要点。', 'Evaluate Amazon CloudFront integration with AWS origins, cache policies, edge compute, security, and total delivery cost.'),
    analysis: copy('如果源站已在 AWS，CloudFront 值得优先列入候选，但仍要把请求、回源、日志、边缘函数与跨区流量放进同一预算模型，并用真实文件验证缓存命中。', 'If the origin already runs on AWS, CloudFront is a natural candidate. Model requests, origin fetches, logs, edge compute, and cross-region transfer together and validate cache hits on real assets.'),
    questions: [copy('S3、ALB 或自有源站使用哪种访问控制方式？', 'How is access controlled for S3, ALB, or custom origins?'), copy('边缘计算、日志和失效请求是否计入总成本？', 'Are edge compute, logging, and invalidations included in total cost?')],
  },
  'azure-front-door': {
    title: copy('Azure Front Door 测评与选型：全球入口、加速与 WAF', 'Azure Front Door Review: Global Routing, CDN and WAF'),
    description: copy('解析 Azure Front Door 的全球入口、静态与动态交付、WAF 和源站接入，帮助 Azure 与混合云团队建立验证清单。', 'Review Azure Front Door global routing, static and dynamic delivery, WAF, and origin integration for Azure and hybrid-cloud teams.'),
    analysis: copy('Front Door 的评估重点是全球应用入口而非单一静态文件 CDN。混合源站项目应验证故障转移、私有源站连接、WAF 策略与地区计费。', 'Front Door is a global application entry point, not only a static-asset CDN. Hybrid-origin teams should test failover, private origin connectivity, WAF policies, and regional charges.'),
    questions: [copy('多源站健康检查和故障切换如何演练？', 'How will multi-origin health checks and failover be exercised?'), copy('WAF、机器人防护和私有源站分别需要哪些配置？', 'Which configurations are needed for WAF, bot protection, and private origins?')],
  },
  'google-cloud-cdn': {
    title: copy('Google Cloud CDN 测评与选型：缓存策略、源站与 Cloud Armor', 'Google Cloud CDN Review: Cache Policies, Origins and Cloud Armor'),
    description: copy('了解 Google Cloud CDN 的全球缓存、HTTP 源站、缓存键与 TTL 控制，梳理 Cloud Armor、安全和日志验证要点。', 'Understand Google Cloud CDN caching, HTTP origins, cache keys, TTL controls, Cloud Armor, security, and logging considerations.'),
    analysis: copy('Google Cloud CDN 可以作为 Google Cloud 或其他 HTTP 源站的候选。应先定义缓存键、TTL 和隐私边界，再比较不同地区访问、回源量与日志明细。', 'Google Cloud CDN can serve Google Cloud or other HTTP origins. Define cache keys, TTL, and privacy boundaries before comparing regional experience, origin traffic, and logging.'),
    questions: [copy('缓存键与 TTL 是否符合业务更新频率？', 'Do cache keys and TTLs match the update frequency?'), copy('外部 HTTP 源站、日志和 Cloud Armor 如何组合？', 'How are external HTTP origins, logs, and Cloud Armor combined?')],
  },
  'alibaba-cloud-cdn': {
    title: copy('阿里云 CDN 测评与选型：静态资源、视频及云生态', 'Alibaba Cloud CDN Review: Static Assets, Video and Cloud Integration'),
    description: copy('梳理 Alibaba Cloud CDN 的静态加速、下载与视频分发、源站和安全产品组合，附跨区域部署评估要点。', 'Explore Alibaba Cloud CDN static assets, downloads, video distribution, origin integration, and cross-region evaluation questions.'),
    analysis: copy('涉及中国内地与亚太业务时，应先厘清合规与具体服务区域，再分别评估静态、下载和视频流量。产品能力与最终报价应按地区和套餐确认。', 'For mainland China and Asia-Pacific workloads, clarify compliance and served regions first. Evaluate static assets, downloads, and video separately, then confirm plan and regional prices.'),
    questions: [copy('业务覆盖地区与合规要求如何匹配？', 'How do service regions align with compliance needs?'), copy('下载、视频与回源流量是否采用不同费用模型？', 'Are downloads, video, and origin traffic priced differently?')],
  },
  'tencent-edgeone': {
    title: copy('腾讯云 EdgeOne 测评与选型：CDN 加速与边缘安全', 'Tencent Cloud EdgeOne Review: CDN and Edge Security'),
    description: copy('了解腾讯云 EdgeOne 的 CDN、DDoS、WAF、Bot 防护与边缘函数定位，附游戏和跨境业务的实测建议。', 'Review Tencent Cloud EdgeOne CDN, DDoS, WAF, bot controls, and edge functions for gaming and cross-border workloads.'),
    analysis: copy('EdgeOne 将内容交付与边缘安全纳入统一入口。选择前应按地区、源站类型和攻击模型验证功能适配，同时分清产品资料与独立测速数据。', 'EdgeOne combines delivery and edge security. Validate regions, origin types, and threat models separately, and keep product descriptions distinct from independent measurements.'),
    questions: [copy('各地区的接入与回源策略是否满足业务要求？', 'Do regional onboarding and origin routes fit the workload?'), copy('DDoS、Bot、WAF 与边缘函数包含哪些套餐限制？', 'What plan limits apply to DDoS, bots, WAF, and edge functions?')],
  },
  bunny: {
    title: copy('Bunny.net CDN 测评与选型：开发者静态交付与媒体', 'Bunny.net CDN Review: Developer Delivery and Media'),
    description: copy('了解 Bunny.net CDN 的静态资源、存储和媒体分发定位，附开发者接入、缓存、区域与费用验证建议。', 'Review Bunny.net CDN for static files, storage, and media delivery with developer-friendly onboarding, caching, and cost checks.'),
    analysis: copy('Bunny.net 可作为中小型站点和静态资源项目的候选。评估时应把目标地区、缓存失效、存储产品与媒体传输分别核算，并用自己的文件测试。', 'Bunny.net is a candidate for smaller sites and static delivery. Evaluate served regions, purge behavior, storage, and media transfer separately using your own files.'),
    questions: [copy('目标地区的流量与存储费用如何计算？', 'How are traffic and storage costs calculated in target regions?'), copy('文件失效与回源策略是否适合发布频率？', 'Do purge and origin policies suit the release frequency?')],
  },
};
