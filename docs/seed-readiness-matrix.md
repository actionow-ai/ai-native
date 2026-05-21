# Seed Readiness Matrix

这份矩阵把四条并行工作接到同一个评审视图里，并区分“单条 starter 已过来源核查”和“10-20 条正式 seed 数据集已完成”：

- `origin/agent/product-visionary/butterfly-queue-review`：主线队列和已收紧的 `approved` schema。
- `origin/agent/unknown/butterfly-seed-preflight`：12 个候选物种的 GBIF accepted taxon 和 Commons 图片授权预检。
- `origin/agent/unknown/wikidata-type-locality-candidates`：12 个带 Wikidata P5304 结构化模式产地的候选。
- `origin/agent/unknown/butterfly-seed-starters`：2 条已人工核查来源和图片授权的 starter partial。

关键结论：`data/species-seed.partial.json` 里已有 `Danaus plexippus` 和 `Heliconius erato` 两条 row-level approved starter，但现在仍没有可以作为第一里程碑交付的 `data/species-seed.json`。原因是正式 seed 数据集至少需要 10 条记录；主线其余常见/展示友好物种还缺 type locality 或原始描述地点来源，P5304 候选则缺 accepted taxon、图片授权、命名来源核对和坐标精度复核。

后续补 seed 时建议按这个顺序做：

1. 先从 `data/species-source-review.queue.json` 选一个主线物种。
2. 复用 image preflight 里的 GBIF usageKey 和图片授权字段。
3. 复用 `data/species-seed.partial.json` 的字段口径扩充到至少 10 条后，再生成正式 `data/species-seed.json`。
4. 只在找到 type locality / original-description locality 的可追溯来源后，才组装 `curationStatus = approved`。
5. 对 `Ornithoptera alexandrae`、`Parnassius apollo` 这类敏感候选，即使历史地点成立，也优先公开低精度标记和保守文案。

机器可读矩阵见 [`data/seed-readiness.matrix.json`](../data/seed-readiness.matrix.json)。
