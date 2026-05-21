# ai-native

`ai-native` 当前产品方向已经切换为一个交互式 3D 蝴蝶发现地球仪。

首版不做通用地图产品，也不继续旧的 agent coordination runtime 方向。第一里程碑先把产品、数据、授权和技术边界收敛成可评审 brief，再进入 Three.js 原型实现。

## 当前评审文档

- [3D 蝴蝶发现地球仪 brief](docs/butterfly-discovery-globe-brief.md)

## 第一里程碑

交付一个数据先行的 3D 地球原型：

- 地球上显示 10-20 个蝴蝶物种的首次发现或模式产地标记。
- 点击标记后展示图片、中文名/英文名/学名、发现地点、命名年份/命名者、简短说明和来源链接。
- 每条记录必须带 provenance：地点来源、坐标来源、图片授权来源。
- 图片只接受可再使用授权：CC0、Public Domain、CC BY、CC BY-SA，明确排除 NC/ND/未知授权。

## 非目标

- 不做完整百科数据库。
- 不做用户上传、收藏、账号或 CMS。
- 不用未经核验的“分布地”替代首次发现或模式产地。
- 不在 brief 阶段写 UI scaffold。
