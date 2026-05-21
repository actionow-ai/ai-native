# 3D 蝴蝶发现地球仪 brief

## 产品定位

做一个偏博物馆感的互动发现地图：用户旋转 3D 地球，看到不同蝴蝶物种首次被发现或作为命名依据的地点；点击标记后，看到蝴蝶图片、名称、发现/模式产地、命名信息和一段短说明。

第一版的核心不是炫技地球，也不是堆很多物种，而是把“地点为什么可信、图片为什么能用”做成可检查的数据合同。只要 10-20 条记录能稳定讲清楚来源，原型就成立。

## 目标用户与场景

目标用户是对自然史、博物馆展览、地理发现故事感兴趣的普通用户。使用场景是 3-5 分钟的探索：打开页面、拖动地球、点开几个标记，理解一个物种名称背后对应的采集地点与历史记录。

次级用户是内容维护者或开发者。他们需要知道每个标记来自哪条来源、图片授权是否可复用、地点粒度是否足够精确。

## 核心交互

1. 进入页面直接看到可旋转 3D 地球和物种标记，不做营销落地页。
2. 标记按地点聚合；缩放或悬停时展开同一地区多个物种。
3. 点击标记打开物种卡片，卡片展示：
   - 中文名、英文名、学名、科属。
   - 命名者和命名年份。
   - 首次发现/模式产地标签、坐标、地点粒度。
   - 蝴蝶图片、作者、授权、原始文件链接。
   - 一段 60-100 字中文说明。
   - “来源”链接，至少包含地点来源和图片授权来源。
4. 卡片可以关闭，地球保持当前视角，方便继续探索。

## 数据口径

“首次被发现的地方”在首版中定义为生物学意义上的模式产地；也就是命名承载标本的采集、捕获或观察地点。ICZN Article 76 对 zoological type locality 的定义正好匹配这个口径。

如果某个物种只能找到普通分布地、旅游介绍地或范围地图，不能进入首批正式数据。若只有宽泛地点，例如 “Asia”，可以进入候选池，但不能作为首批地图标记，除非后续找到更精确来源。

## 数据合同

每条物种记录至少包含：

```json
{
  "id": "wikidata:Q115639943",
  "scientificName": "Voltinia necaxa",
  "commonNameZh": null,
  "commonNameEn": null,
  "family": null,
  "authority": {
    "name": null,
    "year": null,
    "sourceUrl": null
  },
  "typeLocality": {
    "label": "Zihuateutla Municipality",
    "countryOrRegion": "Mexico",
    "coordinates": [-97.83, 20.3],
    "granularity": "municipality",
    "sourceKind": "wikidata:P5304",
    "sourceUrl": "https://www.wikidata.org/wiki/Q115639943",
    "confidence": "structured"
  },
  "image": {
    "url": null,
    "thumbnailUrl": null,
    "creator": null,
    "license": null,
    "licenseUrl": null,
    "sourceUrl": null
  },
  "summaryZh": null,
  "provenance": [
    {
      "field": "typeLocality",
      "sourceUrl": "https://www.wikidata.org/wiki/Q115639943",
      "retrievedAt": "2026-05-21"
    }
  ]
}
```

`coordinates` 使用 GeoJSON 顺序：`[longitude, latitude]`。展示表格为了便于人工核对，使用“纬度, 经度”。

## 数据源策略

地点来源优先级：

1. 原始描述、修订论文、博物馆 type specimen 页面。
2. Wikispecies 的 type locality 条目。
3. Wikidata `type locality (biology)` 属性 `P5304`，前提是有可用坐标或可解析地名。
4. GBIF occurrence/type specimen 数据只能作为补充核验，不单独替代 type locality。

图片来源优先级：

1. Wikimedia Commons 文件页/API，读取作者、授权、文件 URL。
2. GBIF occurrence media，前提是 occurrence 或 media license 在允许列表中。
3. 博物馆开放图库，前提是授权允许复用和署名条件清楚。

授权允许列表：CC0、Public Domain、CC BY、CC BY-SA。排除 CC BY-NC、CC BY-ND、All rights reserved、未知授权。

## 首批候选池

下面是可作为第一轮数据核验的结构化候选，不等于最终上线清单。它们来自 Wikidata 中隶属于 Papilionoidea、rank 为 species、并带有 `P5304` type locality 的记录。下一步要逐条补命名者/年份、图片授权和中文说明。

| 学名 | 模式产地 | 坐标（纬度, 经度） | 来源 |
| --- | --- | --- | --- |
| Voltinia necaxa | Zihuateutla Municipality | 20.3, -97.83 | https://www.wikidata.org/wiki/Q115639943 |
| Euselasia misteriosa | San Jose del Palmar | 4.896944444, -76.234166666 | https://www.wikidata.org/wiki/Q115656978 |
| Cornuphallus onorbo | Suriname | 4.0, -56.0 | https://www.wikidata.org/wiki/Q115806363 |
| Cigaritis costalis | Kenya | 0.1, 38.0 | https://www.wikidata.org/wiki/Q116181927 |
| Cigaritis abri | Homa Bay County | -0.683333, 34.45 | https://www.wikidata.org/wiki/Q116181579 |
| Liptena arnauxi | Cameroon | 5.133333333, 12.65 | https://www.wikidata.org/wiki/Q115478109 |
| Liptena mariae | Cameroon | 5.133333333, 12.65 | https://www.wikidata.org/wiki/Q115478113 |
| Liptena perconfusa | Cameroon | 5.133333333, 12.65 | https://www.wikidata.org/wiki/Q115478117 |
| Liptena restricta | North Kivu | -0.55, 28.8 | https://www.wikidata.org/wiki/Q115478100 |
| Memphis elisa | La Concordia Municipality | 15.966666666, -92.716666666 | https://www.wikidata.org/wiki/Q115640548 |
| Chirgus bocchoris | Bolivia | -17.056869611, -64.991228611 | https://www.wikidata.org/wiki/Q115801710 |
| Burnsius titicaca | Titicaca | -15.825, -69.325 | https://www.wikidata.org/wiki/Q116060666 |

另有三个面向普通用户更熟悉的候选，用来提升首版吸引力，但需要更严格核验后才能上线：

| 学名 | 当前发现 | 风险 |
| --- | --- | --- |
| Danaus plexippus | Wikispecies 记录 type locality 为 Kendall, New York, USA | 需要补图片授权和命名说明。 |
| Papilio ulysses | Wikispecies 记录 type locality 为 Asia | 地点太宽泛，除非找到更精确来源，否则不进地图标记。 |
| Ornithoptera alexandrae | 专门类群资料记录 Mambare River headwaters 一带 | 物种保护属性强，图片和叙述要避免收藏/贸易暗示。 |

## 技术范围

首版实现建议：

- Vite + React + Three.js。
- 地球用 Three.js sphere + 公开地球贴图；标记用实例化点或轻量 sprite。
- 物种数据先放 `data/species.json`，schema 固定后再考虑 CMS。
- 坐标转换保持纯函数，方便测试。
- 卡片 UI 不依赖后端，图片直接读已授权源或本地缓存清单。

不建议第一版接入复杂 GIS、用户账号、全文搜索或服务端爬虫。数据核验可以用脚本或人工表格完成，原型只消费已核验 JSON。

## 验收标准

第一里程碑完成的条件：

1. 有 10 条以上物种记录通过数据合同校验。
2. 每条记录都有 type locality/source URL/坐标/source kind。
3. 每条记录都有可用图片，且授权落入允许列表。
4. 3D 地球在桌面和手机视口不空白、不遮挡卡片、标记可点击。
5. 点击任一标记都能打开来源完整的物种卡片。
6. README 明确当前方向和非目标，旧 trace/coordination runtime 文档不再作为产品目标。

## 参考来源

- ICZN Article 76, Type locality: https://code.iczn.org/types-in-the-species-group/article-76-type-locality/
- Wikidata `type locality (biology)` property `P5304`: https://www.wikidata.org/wiki/Property:P5304
- GBIF API reference: https://techdocs.gbif.org/en/openapi/
- GBIF licenses: https://www.gbif.org/terms/licences
- Wikimedia Commons machine-readable metadata: https://commons.wikimedia.org/wiki/Help:Machine-readable_data
- Wikispecies `Danaus plexippus`: https://species.wikimedia.org/wiki/Danaus_plexippus
- Wikispecies `Papilio ulysses`: https://species.wikimedia.org/wiki/Papilio_ulysses
- Ornithoptera alexandrae reference page: https://ornithoptera.org/ornithoptera-list/alexandrae
