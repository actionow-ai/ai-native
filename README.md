# ai-native

`ai-native` 当前产品方向是一个交互式 3D 蝴蝶发现地球仪：在地球上标出不同蝴蝶物种首次被正式描述或命名时对应的地点，点击标记后展示图片、名称、地点、年份、来源和一段简短说明。

先不要直接做 UI。第一步是把数据口径定准，因为“首次被发现的地方”很容易被误写成随便一个观测点；首版应优先使用可追溯的 type locality、原始描述地点或同等强度的分类学来源。

## 当前 Brief

- 产品/数据/技术 brief: [`docs/butterfly-discovery-atlas-brief.md`](docs/butterfly-discovery-atlas-brief.md)
- 数据策展运行手册: [`docs/data-curation-runbook.md`](docs/data-curation-runbook.md)
- Seed 数据 JSON Schema: [`data/species-seed.schema.json`](data/species-seed.schema.json)
- 首批候选物种池: [`data/species-seed.candidates.json`](data/species-seed.candidates.json)
- 已核查 starter 记录: [`data/species-seed.partial.json`](data/species-seed.partial.json)
- 候选物种来源核查队列: [`data/species-source-review.queue.json`](data/species-source-review.queue.json)
- GBIF/Commons 图片预检: [`data/species-image.preflight.json`](data/species-image.preflight.json)
- Wikidata type locality 候选: [`data/type-locality-candidates.wikidata.json`](data/type-locality-candidates.wikidata.json)
- Seed readiness 矩阵: [`docs/seed-readiness-matrix.md`](docs/seed-readiness-matrix.md)
- 3D 原型验收门槛: [`docs/butterfly-globe-prototype-acceptance.md`](docs/butterfly-globe-prototype-acceptance.md)

## 第一里程碑

交付一个可评审的静态 3D 地球原型范围和一份 10-20 个物种的 seed 数据。每个物种至少要有：科学名、图片授权、地点坐标、地点口径、年份或命名信息、来源 URL、中文卡片文案和人工校验状态。

`preflight`、`candidates` 和 readiness 矩阵只用于加速策展，不是公开地图数据。`data/species-seed.partial.json` 只暂存已经过人工核查的 starter 记录；正式交付仍以至少 10 条记录的 `data/species-seed.json` 为准，并且每条记录必须通过 `data/species-seed.schema.json` 的 `approved` 门槛。

当前 10 条 starter partial 已达到原型前置水位；后续先按 [`docs/butterfly-globe-prototype-acceptance.md`](docs/butterfly-globe-prototype-acceptance.md) 冻结数据评审目标并做 Three.js 原型验收，不继续盲目扩充物种数量。
