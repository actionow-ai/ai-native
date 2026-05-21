import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import {
  buildCardModel,
  formatPrecision,
  prepareSpeciesRecords,
  selectDemoPath,
} from "./species-view-model.mjs";

const globeRadius = 2.45;
const markerObjects = [];
const recordByObject = new WeakMap();

const els = {
  canvas: document.querySelector("#globe-canvas"),
  status: document.querySelector("#dataset-status"),
  speciesCount: document.querySelector("#species-count"),
  precisionCount: document.querySelector("#precision-count"),
  hoverLabel: document.querySelector("#hover-label"),
  tray: document.querySelector("#species-tray"),
  panel: document.querySelector("#specimen-panel"),
  closePanel: document.querySelector("#close-panel"),
};

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let hoveredMarker = null;
let selectedMarker = null;
let records = [];

window.addEventListener("error", (event) => showRuntimeError(event.error ?? event.message));
window.addEventListener("unhandledrejection", (event) => showRuntimeError(event.reason));
document.body.dataset.appStage = "listeners-ready";

try {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x08100f);
  scene.fog = new THREE.Fog(0x08100f, 6, 12);

  camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0.2, 1.35, 6.25);

  renderer = new THREE.WebGLRenderer({ canvas: els.canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.dataset.appStage = "renderer-ready";

  controls = new OrbitControls(camera, renderer.domElement);
  document.body.dataset.appStage = "controls-ready";
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3.2;
  controls.maxDistance = 8.2;
  controls.rotateSpeed = 0.36;

  buildScene();
  document.body.dataset.appStage = "scene-ready";
  loadDataset();
  animate();
} catch (error) {
  showRuntimeError(error);
}

els.closePanel.addEventListener("click", () => {
  selectedMarker = null;
  els.panel.classList.remove("is-open");
  syncMarkerState();
});

window.addEventListener("resize", () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.domElement.addEventListener("pointermove", (event) => {
  const hit = pickMarker(event);
  if (hit !== hoveredMarker) {
    hoveredMarker = hit;
    els.hoverLabel.textContent = hit?.userData.record.cardModel.title ?? "Global view";
    renderer.domElement.style.cursor = hit ? "pointer" : "grab";
  }
});

renderer.domElement.addEventListener("click", (event) => {
  const hit = pickMarker(event);
  if (hit) selectRecord(hit.userData.record);
});

async function loadDataset() {
  try {
    const dataset = await fetchDataset();
    records = prepareSpeciesRecords(dataset.raw);
    els.status.textContent = dataset.formal
      ? "Formal seed dataset · data/species-seed.json"
      : "Starter review data · data/species-seed.partial.json";
    els.status.classList.toggle("is-review", !dataset.formal);
    els.speciesCount.textContent = String(records.length);
    els.precisionCount.textContent = String(
      records.filter((record) => record.precision.style === "continental" || record.precision.style === "hemisphere").length,
    );
    addMarkers(records);
    renderTray(records);
    selectRecord(selectDemoPath(records)[0] ?? records[0]);
  } catch (error) {
    els.status.textContent = "Dataset unavailable";
    els.panel.innerHTML = `<div class="empty-label"><strong>Unable to load data</strong><span>${escapeHtml(
      error.message,
    )}</span></div>`;
  }
}

async function fetchDataset() {
  const formal = await fetchJson("data/species-seed.json");
  if (formal.ok) return { raw: formal.body, formal: true };

  const partial = await fetchJson("data/species-seed.partial.json");
  if (partial.ok) return { raw: partial.body, formal: false };

  throw new Error("Neither formal seed nor partial starter data could be read.");
}

async function fetchJson(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) return { ok: false, body: null };
    return { ok: true, body: await response.json() };
  } catch {
    return { ok: false, body: null };
  }
}

function buildScene() {
  const sun = new THREE.DirectionalLight(0xfff0c2, 3.2);
  sun.position.set(-3.4, 2.8, 4.6);
  scene.add(sun);
  scene.add(new THREE.HemisphereLight(0xb7f5ff, 0x11130c, 1.4));

  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(globeRadius, 96, 64),
    new THREE.MeshStandardMaterial({
      map: makeEarthTexture(),
      roughness: 0.88,
      metalness: 0.02,
    }),
  );
  globe.name = "discovery-globe";
  scene.add(globe);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(globeRadius * 1.012, 96, 64),
    new THREE.MeshBasicMaterial({
      color: 0x83d9d2,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    }),
  );
  scene.add(atmosphere);

  addGraticule();
}

function makeEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, "#0e4d5c");
  ocean.addColorStop(0.48, "#112d4b");
  ocean.addColorStop(1, "#061a24");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.34;
  ctx.strokeStyle = "#d8c983";
  ctx.lineWidth = 1;
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = latToY(lat, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  for (let lon = -150; lon <= 180; lon += 30) {
    const x = lonToX(lon, canvas.width);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#526b43";
  ctx.strokeStyle = "#c7bd7d";
  ctx.lineWidth = 4;
  [
    [
      [-168, 72], [-132, 70], [-108, 58], [-84, 50], [-61, 45], [-79, 30], [-97, 17],
      [-88, 9], [-77, -3], [-67, -15], [-62, -33], [-72, -54], [-83, -55], [-75, -18],
      [-92, 15], [-120, 29], [-141, 52],
    ],
    [
      [-18, 36], [8, 58], [42, 63], [76, 56], [116, 61], [151, 48], [139, 25],
      [104, 17], [79, 6], [43, 15], [31, -2], [20, -34], [5, -35], [-8, 5],
      [-17, 20],
    ],
    [[112, -11], [153, -25], [146, -41], [116, -36], [108, -24]],
    [[-75, 13], [-61, 10], [-52, -5], [-67, -8]],
    [[46, -13], [50, -25], [44, -25], [42, -16]],
  ].forEach((points) => drawLand(ctx, points, canvas));

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function drawLand(ctx, points, canvas) {
  ctx.beginPath();
  points.forEach(([lon, lat], index) => {
    const x = lonToX(lon, canvas.width);
    const y = latToY(lat, canvas.height);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function addGraticule() {
  const material = new THREE.LineBasicMaterial({ color: 0xb7d2bf, transparent: true, opacity: 0.16 });
  for (let lat = -60; lat <= 60; lat += 30) scene.add(makeLatitudeLine(lat, material));
  for (let lon = -150; lon <= 180; lon += 30) scene.add(makeLongitudeLine(lon, material));
}

function makeLatitudeLine(lat, material) {
  const points = [];
  for (let lon = -180; lon <= 180; lon += 4) points.push(latLonToVector(lat, lon, globeRadius * 1.004));
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
}

function makeLongitudeLine(lon, material) {
  const points = [];
  for (let lat = -88; lat <= 88; lat += 4) points.push(latLonToVector(lat, lon, globeRadius * 1.004));
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
}

function addMarkers(items) {
  const palette = {
    pin: 0xffd36e,
    regional: 0x4ed8c4,
    continental: 0xf46d43,
    hemisphere: 0xdad0a6,
  };

  for (const record of items) {
    const group = new THREE.Group();
    const normal = latLonToVector(record.discoveryPoint.latitude, record.discoveryPoint.longitude, 1).normalize();
    const position = normal.clone().multiplyScalar(globeRadius * 1.025);
    const color = palette[record.precision.style] ?? palette.regional;

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(record.precision.radius, 24, 16),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.42, roughness: 0.34 }),
    );
    marker.position.copy(position);
    marker.userData.record = record;
    markerObjects.push(marker);
    recordByObject.set(marker, record);
    group.add(marker);

    if (record.precision.style !== "pin") {
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(record.precision.halo * 0.62, record.precision.halo, 80),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: record.precision.style === "hemisphere" ? 0.2 : 0.28,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      halo.position.copy(normal.clone().multiplyScalar(globeRadius * 1.018));
      halo.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      halo.userData.record = record;
      markerObjects.push(halo);
      recordByObject.set(halo, record);
      group.add(halo);
    }

    scene.add(group);
  }
}

function renderTray(items) {
  const demoPath = new Set(selectDemoPath(items).map((record) => record.speciesId));
  els.tray.innerHTML = items
    .map((record) => {
      const card = record.cardModel;
      const demoClass = demoPath.has(record.speciesId) ? " is-demo" : "";
      return `<button class="species-pill${demoClass}" type="button" data-species-id="${escapeHtml(record.speciesId)}">
        <span>${escapeHtml(card.title)}</span>
        <small>${escapeHtml(record.precision.style)} · ${escapeHtml(formatPrecision(record.precision.coordinatePrecisionKm))}</small>
      </button>`;
    })
    .join("");

  for (const button of els.tray.querySelectorAll("button")) {
    button.addEventListener("click", () => {
      const record = records.find((item) => item.speciesId === button.dataset.speciesId);
      if (record) selectRecord(record);
    });
  }
}

function selectRecord(record) {
  if (!record) return;
  const card = buildCardModel(record);
  selectedMarker = markerObjects.find((object) => recordByObject.get(object)?.speciesId === record.speciesId) ?? null;
  els.hoverLabel.textContent = card.title;
  els.panel.classList.add("is-open");
  els.panel.innerHTML = renderCard(card);
  els.panel.querySelector("#close-panel")?.addEventListener("click", () => {
    selectedMarker = null;
    els.panel.classList.remove("is-open");
    syncMarkerState();
  });
  for (const button of els.tray.querySelectorAll("button")) {
    button.classList.toggle("is-selected", button.dataset.speciesId === record.speciesId);
  }
  focusOn(record);
  syncMarkerState();
}

function renderCard(card) {
  const sourceLinks = card.sourceUrls
    .map((url, index) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">source ${index + 1}</a>`)
    .join("");
  const image = card.imageUrl
    ? `<img src="${escapeHtml(card.imageUrl)}" alt="${escapeHtml(card.title)}" />`
    : `<div class="image-missing">Image pending</div>`;

  return `
    <div class="specimen-heading">
      <p>SPECIMEN LABEL</p>
      <button class="close-panel" id="close-panel" type="button" aria-label="Close specimen label">×</button>
    </div>
    <figure class="specimen-image">${image}</figure>
    <div class="specimen-title">
      <p>${escapeHtml(card.englishName)}</p>
      <h2>${escapeHtml(card.title)}</h2>
      <em>${escapeHtml(card.scientificName)} ${escapeHtml(card.authority)}</em>
    </div>
    <dl class="specimen-facts">
      <div><dt>Basis</dt><dd>${escapeHtml(card.locationBasis)}</dd></div>
      <div><dt>Locality</dt><dd>${escapeHtml(card.location)}</dd></div>
      <div><dt>Year</dt><dd>${escapeHtml(String(card.year ?? "unknown"))}</dd></div>
      <div><dt>Precision</dt><dd>${escapeHtml(card.precisionLabel)} · ${escapeHtml(formatPrecision(card.precisionKm))}</dd></div>
      <div><dt>Confidence</dt><dd>${escapeHtml(card.confidence)}</dd></div>
      <div><dt>Image</dt><dd>${escapeHtml(card.license)} · ${escapeHtml(card.creator)}</dd></div>
    </dl>
    <p class="summary">${escapeHtml(card.summary)}</p>
    <p class="location-caption">${escapeHtml(card.locationCaption)}</p>
    <ol class="provenance">${card.provenance.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
    <div class="source-row">
      ${sourceLinks}
      ${card.imageSourcePage ? `<a href="${escapeHtml(card.imageSourcePage)}" target="_blank" rel="noreferrer">image source</a>` : ""}
    </div>
    <p class="attribution">${escapeHtml(card.attribution ?? "")}</p>
  `;
}

function focusOn(record) {
  const target = latLonToVector(record.discoveryPoint.latitude, record.discoveryPoint.longitude, globeRadius);
  controls.target.copy(target.multiplyScalar(0.18));
}

function syncMarkerState() {
  for (const object of markerObjects) {
    const record = recordByObject.get(object);
    const active = record && selectedMarker && record.speciesId === recordByObject.get(selectedMarker)?.speciesId;
    object.scale.setScalar(active ? 1.42 : 1);
  }
}

function pickMarker(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(markerObjects, false)[0]?.object ?? null;
  return hit;
}

function animate() {
  controls.update();
  scene.rotation.y += selectedMarker ? 0.0007 : 0.0016;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function latLonToVector(lat, lon, radius) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function lonToX(lon, width) {
  return ((lon + 180) / 360) * width;
}

function latToY(lat, height) {
  return ((90 - lat) / 180) * height;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showRuntimeError(error) {
  const message = error instanceof Error ? error.message : String(error);
  els.status.textContent = `Runtime error: ${message}`;
  els.panel.innerHTML = `<div class="empty-label"><strong>Runtime error</strong><span>${escapeHtml(message)}</span></div>`;
}
