# ai-native

`ai-native` 当前产品方向是一个交互式 3D 蝴蝶发现地球仪：在地球上标出不同蝴蝶物种首次被正式描述或命名时对应的地点，点击标记后展示图片、名称、地点、年份、来源和一段简短说明。

先不要直接做 UI。第一步是把数据口径定准，因为“首次被发现的地方”很容易被误写成随便一个观测点；首版应优先使用可追溯的 type locality、原始描述地点或同等强度的分类学来源。

## 当前 Brief

- 产品/数据/技术 brief: [`docs/butterfly-discovery-atlas-brief.md`](docs/butterfly-discovery-atlas-brief.md)
- 数据策展运行手册: [`docs/data-curation-runbook.md`](docs/data-curation-runbook.md)
- Seed 数据 JSON Schema: [`data/species-seed.schema.json`](data/species-seed.schema.json)
- 首版正式 seed 数据: [`data/species-seed.json`](data/species-seed.json)
- 首批候选物种池: [`data/species-seed.candidates.json`](data/species-seed.candidates.json)
- 已核查 starter 记录: [`data/species-seed.partial.json`](data/species-seed.partial.json)
- 候选物种来源核查队列: [`data/species-source-review.queue.json`](data/species-source-review.queue.json)
- GBIF/Commons 图片预检: [`data/species-image.preflight.json`](data/species-image.preflight.json)
- Wikidata type locality 候选: [`data/type-locality-candidates.wikidata.json`](data/type-locality-candidates.wikidata.json)
- Seed readiness 矩阵: [`docs/seed-readiness-matrix.md`](docs/seed-readiness-matrix.md)
- 3D 原型验收门槛: [`docs/butterfly-globe-prototype-acceptance.md`](docs/butterfly-globe-prototype-acceptance.md)

## 第一里程碑

交付一个可评审的静态 3D 地球原型范围和一份 10-20 个物种的 seed 数据。每个物种至少要有：科学名、图片授权、地点坐标、地点口径、年份或命名信息、来源 URL、中文卡片文案和人工校验状态。

`preflight`、`candidates` 和 readiness 矩阵只用于加速策展，不是公开地图数据。`data/species-seed.json` 是从 10 条已经过人工核查和 schema gate 的 starter 记录物化出的首版正式 seed；后续新增记录仍应先进入 `data/species-seed.partial.json`，再重新跑 gate 后同步正式 seed。

当前 10 条正式 seed 已达到原型前置水位；后续按 [`docs/butterfly-globe-prototype-acceptance.md`](docs/butterfly-globe-prototype-acceptance.md) 验证 Three.js 首屏故事线、marker 卡片、来源/许可证展示和低精度坐标视觉降级，不继续盲目扩充物种数量。

## 可浏览原型

当前分支增加了一个最薄静态 Three.js 原型：

- 入口: `index.html`
- 逻辑: `src/app.mjs`, `src/species-view-model.mjs`
- 样式: `src/styles.css`
- 数据: 默认读取 `data/species-seed.json`；保留 `data/species-seed.partial.json` fallback 仅用于未来 seed 物化前的本地评审，并在界面标明 starter review data。

本地预览：

```bash
npm install
npm start
```

然后打开 `http://localhost:8173/`。

`npm start` 只是固定启动同一个静态服务：`python3 -m http.server 8173 --bind 127.0.0.1`。如果已经装过依赖，也可以直接运行这条 Python 命令。

本地验证：

```bash
npm install
npm test
npm run test:browser
```

浏览器验证会自动启动本地静态服务，在桌面与移动视口各截一张图到 `test-results/butterfly-globe/`，并检查 canvas 非空、正式 seed 已加载、卡片可点击、低精度坐标降级可见。
