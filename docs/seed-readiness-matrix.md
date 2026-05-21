# Seed Readiness Matrix

这份矩阵把四条并行工作接到同一个评审视图里，并区分两种状态：`data/species-seed.partial.json` 里已有 item-level `approved` starter，但还没有可作为里程碑交付的 `data/species-seed.json`。

- `origin/agent/product-visionary/butterfly-queue-review`：主线队列和已收紧的 `approved` schema。
- `origin/agent/unknown/butterfly-seed-preflight`：12 个候选物种的 GBIF accepted taxon 和 Commons 图片授权预检。
- `origin/agent/unknown/wikidata-type-locality-candidates`：12 个带 Wikidata P5304 结构化模式产地的候选。
- `agent/unknown/butterfly-starter-locality-next`：6 条已经人工补齐来源、图片授权和粗粒度坐标的 starter partial。

关键结论：现在有 6 条可继续保留在 partial 里的 starter 记录，但还没有完整 `data/species-seed.json`。主线 12 个常见/展示友好物种里，`Danaus plexippus`、`Heliconius erato`、`Papilio machaon`、`Morpho menelaus`、`Vanessa cardui` 和 `Gonepteryx rhamni` 已补到 starter 水位；其余主线物种仍缺 type locality 或原始描述地点来源。P5304 候选有地点线索，但缺 accepted taxon、图片授权、命名来源核对和坐标精度复核。

后续补 seed 时建议按这个顺序做：

1. 先从 `data/species-source-review.queue.json` 选一个主线物种。
2. 复用 image preflight 里的 GBIF usageKey 和图片授权字段。
3. 只在找到 type locality / original-description locality 的可追溯来源后，才组装 item-level `curationStatus = approved` starter。
4. 对 `Ornithoptera alexandrae`、`Parnassius apollo` 这类敏感候选，即使历史地点成立，也优先公开低精度标记和保守文案。
5. 等 partial 累计到 10 条并通过 schema gate 后，再生成正式 `data/species-seed.json`。

机器可读矩阵见 [`data/seed-readiness.matrix.json`](../data/seed-readiness.matrix.json)。
