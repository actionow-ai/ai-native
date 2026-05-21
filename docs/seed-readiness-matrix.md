# Seed Readiness Matrix

这份矩阵把四条并行工作接到同一个评审视图里，并区分两种状态：`data/species-seed.partial.json` 里保留 item-level `approved` starter，`data/species-seed.json` 则是从首批 10 条合格 starter 物化出的里程碑 seed。

- `origin/agent/product-visionary/butterfly-queue-review`：主线队列和已收紧的 `approved` schema。
- `origin/agent/unknown/butterfly-seed-preflight`：12 个候选物种的 GBIF accepted taxon 和 Commons 图片授权预检。
- `origin/agent/unknown/wikidata-type-locality-candidates`：12 个带 Wikidata P5304 结构化模式产地的候选。
- `origin/agent/unknown/butterfly-seed-starters-10`：10 条已经人工补齐来源、图片授权和粗粒度坐标的 starter partial。
- `agent/unknown/seed-materialization`：从冻结 partial 物化首版正式 `data/species-seed.json`。

关键结论：现在有 10 条 item-level `approved` starter 记录，并已生成首版 `data/species-seed.json`。主线 12 个常见/展示友好物种里，`Danaus plexippus`、`Heliconius erato`、`Papilio machaon`、`Morpho menelaus`、`Vanessa cardui`、`Gonepteryx rhamni`、`Iphiclides podalirius`、`Parnassius apollo`、`Ornithoptera alexandrae` 和 `Battus philenor` 已进入正式 seed；其余主线物种 `Vanessa atalanta` 和 `Aglais io` 仍缺 type locality 或原始描述地点来源。P5304 候选有地点线索，但大多仍缺 accepted taxon、图片授权、命名来源核对和坐标精度复核。

收口口径：把 `origin/agent/unknown/butterfly-seed-starters-10` 冻结为 starter review target，并把 `data/species-seed.json` 作为原型读取的正式 seed。冻结后不继续扩物种数量，下一步只允许做 schema/source gate、原型读取验证和 Three.js 验收样例。

后续补 seed 时建议按这个顺序做：

1. 先从 `data/species-source-review.queue.json` 选一个主线物种。
2. 复用 image preflight 里的 GBIF usageKey 和图片授权字段。
3. 只在找到 type locality / original-description locality 的可追溯来源后，才组装 item-level `curationStatus = approved` starter。
4. 对 `Ornithoptera alexandrae`、`Parnassius apollo` 这类敏感候选，即使历史地点成立，也优先公开低精度标记和保守文案。
5. 正式 `data/species-seed.json` 只从通过 schema/source gate 的 partial 物化；后续新增物种仍先进入 partial，再重新跑 gate。

机器可读矩阵见 [`data/seed-readiness.matrix.json`](../data/seed-readiness.matrix.json)。
