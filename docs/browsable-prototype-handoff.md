# 可浏览原型交接记录

本分支把本地 `agent/pragmatic-engineer/browsable-butterfly-globe@a5dba1b`
候选整理成可远端评审的交接分支。原型是静态 Three.js 页面，默认读取正式
`data/species-seed.json`，展示 10 条 approved marker、低精度 halo、物种卡片、
图片授权和 provenance/source 链。

## 基线

- 分支: `agent/blue-sky/browsable-butterfly-handoff`
- 原型入口: `index.html`
- 数据入口: `data/species-seed.json`
- 关键逻辑: `src/app.mjs`, `src/species-view-model.mjs`
- 样式: `src/styles.css`

## 本地预览

```bash
python3 -m http.server 8099
```

如果 `8099` 已被占用，可换一个端口，例如：

```bash
python3 -m http.server 8107
```

打开 `http://127.0.0.1:<port>/`。

## 验证记录

- `node --test test/species-view-model.test.mjs`: 4 passed.
- `git diff --check HEAD~2..HEAD && git diff --check`: passed.
- `data/species-seed.json`: 10 条记录，全部 `curationStatus: "approved"`。
- Playwright 桌面视口 `1440x960`: 读取正式 seed、渲染 10 个 species pill、卡片点击后显示 Evidence/Image provenance，无 console/page error。
- Playwright 移动视口 `390x844`: canvas、卡片面板和底部 species tray 均保持在视口内。
- 截图像素抽检: 桌面中心 globe crop 非空且有明显颜色变化，确认 3D 首屏不是空白画布。
