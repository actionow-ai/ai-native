# 3D 蝴蝶发现地球仪 Brief

## 产品定位

做一个可探索的 3D 地球：用户旋转地球，看到不同蝴蝶物种的“首次正式描述/命名地点”标记；点击标记后打开物种卡片，展示蝴蝶图片、中文名/科学名、地点、年份、命名者、来源和一段简洁说明。

这个产品的吸引力来自“美丽物种 + 地理发现史”，不是完整百科。首版宁可少而准，也不要把 GBIF occurrence 或随手找到的采集点包装成“首次发现地”。

## 目标用户与场景

- 自然史爱好者：想用地图方式浏览蝴蝶发现史。
- 博物馆/教育展示：需要一个短时间内可理解、可点击、视觉上有吸引力的互动展品。
- 数据策展者：需要看见每个地点声明背后的证据和授权状态。

## 核心交互

1. 用户进入后看到一个可旋转、缩放的 3D 地球，标记点按大洲或年代做轻量区分。
2. 悬停标记显示科学名和地点短标签；点击后打开侧边卡片。
3. 卡片展示授权图片、科学名、中文/英文常用名、命名者与年份、地点口径、来源链接和一段 50-80 字中文说明。
4. 卡片必须显式标出地点可信度：high / medium / low。低可信度数据可进策展后台或 debug 视图，但不要默认进入公开演示。

## 数据口径

“首次发现地”在产品文案里可以这样说，但数据字段里必须更精确：

- 首选：type locality，来自原始描述、分类目录或可靠分类学资料。
- 次选：original description locality，原始描述中的采集地或产地文字。
- 兜底：curated surrogate，只能在卡片里明确说明是策展替代点，不得伪装成确定的首次发现地。

不接受的来源：

- 单条 GBIF occurrence 当作首次发现地。
- Wikipedia/Wikidata 没有外部来源支撑的地点。
- 没有 license/creator/source page 的图片 URL。

## 数据风险验证记录

2026-05-21 快速验证过一个自动化假设：直接用 Wikidata 查询“蝴蝶类群 + 图片 + type locality(P5307)”没有返回可用 seed 结果；单查 `Danaus plexippus` 也能看到图片、分类、作者等字段，但没有结构化的 type locality。结论是 Wikidata 可以辅助补齐名称、图片和外部 ID，但首批“发现地点”仍应按原始描述、分类目录或人工策展来源逐条确认。

## 数据源策略

- GBIF Species API：用于校验 accepted taxon、usageKey、科属和作者年份。已用 `Danaus plexippus` 验证 `species/match` 可用。
- Wikimedia Commons API：用于找图片 URL、license、creator、source page；实际入库时只接受可展示和可署名的许可。
- Biodiversity Heritage Library、原始描述文献、Butterflies of America、LepIndex 或同等级分类资料：用于确认 type locality / 原始描述地点。
- 人工策展记录：每条 seed 数据必须保存 `sourceNotes`，说明为什么这个点可以在地图上展示。

## 首批候选池

候选池先追求“用户熟悉 + 地理分布有辨识度 + 图片容易授权”，但只有通过来源校验后才能进入首版地图：

- `Danaus plexippus`
- `Papilio machaon`
- `Vanessa cardui`
- `Vanessa atalanta`
- `Morpho menelaus`
- `Ornithoptera alexandrae`
- `Heliconius erato`
- `Battus philenor`
- `Gonepteryx rhamni`
- `Aglais io`
- `Iphiclides podalirius`
- `Parnassius apollo`

## 技术范围

- 前端：Vite + React，3D 使用 Three.js 生态；原型可优先评估 `globe.gl` 或 `@react-three/fiber`，避免手写地球投影和交互基础设施。
- 数据：首版使用静态 JSON，字段由 `data/species-seed.schema.json` 约束；后续再考虑 CMS 或数据库。
- 资产：图片只保存远程来源与署名元数据，不把第三方图片复制进仓库。
- 地图标记：经纬度来自策展字段，低精度地点必须配 `coordinatePrecisionKm`。

## 第一里程碑验收

数据 review target 冻结为 `origin/agent/unknown/butterfly-seed-starters-10`。这条分支已有 10 条 source-backed starter partial；冻结后的工作不是继续扩物种，而是人工复核、schema/source gate，并从通过项生成正式 `data/species-seed.json` 候选。

- `data/species-seed.json` 有 10 条物种记录，并能通过 JSON Schema 校验。
- 每条记录至少有一个地点来源 URL、一个图片来源 URL、license、creator/attribution、地点可信度和中文卡片说明。
- 公开原型只展示 `curationStatus = "approved"` 且 `confidence != "low"` 的记录。
- 3D 地球可旋转、缩放、点击标记并展示卡片；没有数据的地区不补假点，也不为视觉均衡伪造地点。
- 首屏有一条可讲述的发现史切片：默认镜头从全球概览落到 2-3 个对比地点，而不是随机点阵。
- marker 卡片至少展示授权图片、中文名、科学名、命名年份、地点口径、来源链接、图片许可证和坐标精度提示。
- `coordinatePrecisionKm` 很大的记录必须有视觉降级，例如更大的半透明范围圈、低精度标签或弱化 pin，不得显示成精确采集点。
- README 明确说明产品口径：展示的是 source-backed discovery/type-locality atlas，不是完整物种分布图。

## 非目标

- 不做完整蝴蝶百科。
- 不做实时 GBIF occurrence 地图。
- 不做用户上传和社区纠错。
- 不做移动端复杂手势优化。
- 不把未校验地点包装成“首次发现地”。

## 下一步

先基于冻结的 10 条 starter partial 生成 `data/species-seed.json` 候选并人工复核；另一个 agent 并行做最薄 3D 地球原型。数据未过 schema/source gate，或原型未满足上面的 Three.js 验收门槛前，不应该把 UI 演示当作完成。
