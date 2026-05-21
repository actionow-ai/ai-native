# 蝴蝶发现地球仪数据策展运行手册

## 目标

把 `data/species-seed.candidates.json` 里的候选物种转成可公开展示的 `data/species-seed.json`。首版宁可只有 10 条可靠记录，也不要用自动接口拼出看似完整但不可追溯的“发现地点”。

## 单条记录通过门槛

一条记录只有同时满足这些条件，才可以把 `curationStatus` 设为 `approved`：

- `scientificName` 是 GBIF accepted taxon，或有同等级分类资料解释为什么使用该名称。
- `discoveryPoint.basis` 来自 type locality、原始描述地点或明确标注的策展替代点。
- `discoveryPoint.sourceUrls` 至少包含一个能支撑地点口径的来源，不把 GBIF occurrence、Wikipedia 或未引用来源的 Wikidata 声明当作地点证据。
- 经纬度来自策展判断；地点只能定位到国家/区域时，必须增大 `coordinatePrecisionKm`，并在 `sourceNotes` 说明降级原因。
- 图片必须有 source page、license、creator 和 attribution；只有图片 URL 没有授权页不通过。
- 中文卡片文案不能暗示现生种群精确位置，尤其是保护敏感物种。

## 推荐核查顺序

1. 用 GBIF Species API 核对 accepted taxon、usageKey、作者年份和分类层级。
2. 查原始描述、BHL、LepIndex、Butterflies of America 或同等级资料，寻找 type locality / locality 原文。
3. 把地点原文转成现代地点标签和粗粒度坐标，记录 `coordinatePrecisionKm`。
4. 用 Wikimedia Commons 或其他明确授权来源找图片，保留 license、creator、source page。
5. 写 50-80 字中文说明，只解释物种识别点和地点证据，不扩展成百科。
6. 用 `data/species-seed.schema.json` 校验 JSON，再人工审一遍 `sourceNotes` 是否足够让第三方复核。

## 分工队列

`data/species-source-review.queue.json` 是核查工作队列，不是公开 seed 数据。每个候选先补齐 `evidence.typeLocality` 和 `evidence.imageLicense`，再移动到 `data/species-seed.json`。

`data/species-seed.partial.json` 只存放已经通过人工来源核查的 starter 记录，用来给后续 10-20 条正式 seed 数据提供字段和证据样例。它不是第一里程碑的完整交付；正式公开数据仍应落在 `data/species-seed.json`，并满足 schema 的最小数量要求。

当前已知风险：快速查询显示 Wikidata 可以辅助名称、图片和外部 ID，但不能稳定给出蝴蝶物种的结构化 type locality。因此不要把“接口查不到地点”理解为无地点，也不要把接口能查到图片理解为授权已经可用。
