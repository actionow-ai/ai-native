# 3D 蝴蝶地球仪原型验收门槛

这份门槛用于 10 条 starter partial 到位后的收口。下一步不是继续扩物种数量，而是把数据冻结为 review target，并验证一个最薄 Three.js 原型能否讲清楚“蝴蝶发现史地图”的核心体验。

## 数据冻结口径

- Review target: `origin/agent/unknown/butterfly-seed-starters-10`
- Target commit: `f284fe3`
- 数据文件: `data/species-seed.partial.json`
- 当前水位: 10 条 item-level `approved` starter partial，0 条正式 `data/species-seed.json`
- 冻结规则: 在人工复核和正式 seed 生成前，不再向 starter partial 追加新物种。

允许的下一步数据工作只有两类：

1. 复核这 10 条 starter 的来源、授权、坐标精度和中文卡片文案。
2. 从复核通过的 starter 生成正式 `data/species-seed.json`，并用 `data/species-seed.schema.json` 校验。

生成正式 seed 候选时还必须断言：

1. `speciesId` 集合与冻结 partial 保持一致。
2. `coordinatePrecisionKm` 不能被升格成更精确的值，除非新增可追溯来源。
3. 地点来源、图片来源、license、creator/attribution 字段原样保留或只做有来源的补强。
4. 低可信或宽泛地点仍以降级展示进入原型，不得伪装成精确采集点。

## 原型必须证明什么

1. **首屏是一条故事线，不是随机点阵。** 默认镜头先给全球概览，再引导到 2-3 个对比地点：例如 `Ornithoptera alexandrae` 的新几内亚较高精度点、`Parnassius apollo` 的瑞典区域点、`Battus philenor` 的美洲超低精度点。
2. **marker 点击卡片字段完整。** 卡片至少展示图片、中文名、科学名、命名者/年份、地点标签、地点口径、可信度、坐标精度、来源链接、license、creator/attribution。
3. **低精度坐标必须视觉降级。** `coordinatePrecisionKm` 大于 1000 的记录不能显示成针尖式精确定位；应使用大半径光晕、区域圈或明确的低精度 marker 样式。
4. **来源和授权在界面中可见。** 每张卡片都要让评审者看到图片能否公开展示，以及地点声明来自哪个 source URL。
5. **地图可读性要过关。** 10 个点应能在桌面首屏中被区分；卡片图片比例不能撑破布局；marker hover/click 状态不能让地球交互失焦。
6. **不确定性不能被文案抹平。** 产品文案可以说“发现地球仪”，但卡片必须保留 `type locality` / `original description locality` / 粗粒度替代点的差异。

## Demo Path

验收时录一段 60-90 秒路径，供评审者直接复测：

1. 全球概览：看见 10 个 starter marker 的空间分布和低精度视觉样式。
2. 对比 2-3 个发现地点：至少包含一个较高精度点、一个区域级点和一个超低精度点。
3. 点击卡片：展示图片、命名信息、地点口径、证据链接、图片授权和坐标可信度。
4. 关闭卡片并旋转/缩放地球：确认交互没有被 marker 或侧边卡片破坏。

## 验收检查

- 原型只读取正式 `data/species-seed.json`；如果临时读取 partial，UI 必须标明这是 starter review 数据。
- `curationStatus != "approved"` 或 `confidence = "low"` 的记录不得进入公开视图。
- 对 10 条 starter 做一次全量卡片巡检，确认每条至少能打开图片、来源页和图片 source page。
- 记录一张桌面截图和一张窄屏截图，检查 marker、卡片、许可证文本和低精度视觉样式没有遮挡或溢出。
- 评审对象应是同时包含 brief、readiness matrix、数据冻结口径和本验收文档的同一分支；不要把 10 条 partial 直接改名成正式 seed 交付。
