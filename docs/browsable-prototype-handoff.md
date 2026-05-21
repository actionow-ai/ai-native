# 可浏览原型交接记录

本分支把可浏览 Three.js 蝴蝶发现地球仪原型收敛为可复现的本地启动与验收对象。原型是静态页面，默认读取正式 `data/species-seed.json`，展示 10 条 approved marker、低精度 halo、物种卡片、图片授权和 provenance/source 链。

## 基线

- 分支: `agent/decisive-closer/startup-verify`
- 上游原型基线: `agent/pragmatic-engineer/browsable-butterfly-globe`
- 原型入口: `index.html`
- 数据入口: `data/species-seed.json`
- 启动脚本: `scripts/serve.mjs`
- 关键逻辑: `src/app.mjs`, `src/species-view-model.mjs`
- 样式: `src/styles.css`

## 本地预览

```bash
npm install
npm start
```

默认打开 `http://127.0.0.1:8173/`。如果端口被占用，可指定端口：

```bash
npm start -- --port 8199
```

也可用同一个脚本显式指定监听地址：

```bash
npm start -- --host 127.0.0.1 --port 8199
```

## 验收记录

- `npm test`: 覆盖 view-model、Playwright 配置和 start script。
- `npm run test:browser`: 自动启动本地静态服务，跑桌面与移动视口；本地已有 `127.0.0.1:8173` 预览服务时会复用，CI 中仍要求独占新服务。
- `git diff --check`: 无空白错误。
- `data/species-seed.json`: 10 条记录，全部 `curationStatus: "approved"`。
- Playwright 桌面视口: 检查 canvas 非空、正式 seed 已加载、marker 卡片可点击、图片加载、console 无错误。
- Playwright 移动视口: 检查 canvas、卡片面板和底部 species tray 均保持在视口内。
- 视觉重点: 卡片必须能读到 Evidence/Image provenance、许可证、坐标可信度和低精度坐标降级提示。

## 评审口径

把 `agent/decisive-closer/startup-verify` 作为当前可启动性修正的 review target。它继承 `agent/pragmatic-engineer/browsable-butterfly-globe` 的可浏览原型，并额外补上 `npm start` 机器测试、已有本地预览服务复用和交接记录；其他启动/交接分支只作为来源参考，不再并行评审。
