import assert from "node:assert/strict";
import test from "node:test";

import {
  buildCardModel,
  classifyPrecision,
  prepareSpeciesRecords,
  selectDemoPath,
} from "../src/species-view-model.mjs";

const approvedBase = {
  speciesId: "heliconius-erato",
  scientificName: "Heliconius erato",
  taxonAuthority: "(Linnaeus, 1758)",
  displayNames: { zh: "红邮差蝶", en: "Red postman" },
  discoveryPoint: {
    basis: "type_locality",
    label: "Surinam",
    latitude: 4,
    longitude: -56,
    coordinatePrecisionKm: 350,
    confidence: "medium",
    year: 1758,
    sourceUrls: ["https://example.test/source"],
    sourceNotes: "Type locality source notes with enough detail for review.",
  },
  image: {
    url: "https://example.test/image.jpg",
    sourcePage: "https://example.test/image-source",
    license: "CC BY 2.0",
    creator: "Example Creator",
    attribution: "Example Creator, CC BY 2.0",
  },
  card: {
    titleZh: "红邮差蝶",
    summaryZh: "用于测试的蝴蝶卡片摘要，说明为什么它能进入首屏。",
    locationCaptionZh: "模式产地按国家级坐标展示。",
  },
  curationStatus: "approved",
};

test("prepareSpeciesRecords only exposes approved, non-low-confidence records with coordinates", () => {
  const records = prepareSpeciesRecords([
    approvedBase,
    { ...approvedBase, speciesId: "low-confidence", discoveryPoint: { ...approvedBase.discoveryPoint, confidence: "low" } },
    { ...approvedBase, speciesId: "candidate", curationStatus: "candidate" },
    { ...approvedBase, speciesId: "missing-coords", discoveryPoint: { ...approvedBase.discoveryPoint, latitude: null } },
  ]);

  assert.deepEqual(records.map((record) => record.speciesId), ["heliconius-erato"]);
});

test("classifyPrecision visually downgrades coarse coordinates", () => {
  assert.equal(classifyPrecision(75).style, "pin");
  assert.equal(classifyPrecision(350).style, "regional");
  assert.equal(classifyPrecision(2500).style, "continental");
  assert.equal(classifyPrecision(4200).style, "hemisphere");
});

test("buildCardModel keeps the evidence and image-license chain visible", () => {
  const card = buildCardModel(approvedBase);

  assert.equal(card.title, "红邮差蝶");
  assert.equal(card.scientificName, "Heliconius erato");
  assert.equal(card.authority, "(Linnaeus, 1758)");
  assert.equal(card.locationBasis, "type locality");
  assert.equal(card.precisionLabel, "regional");
  assert.equal(card.license, "CC BY 2.0");
  assert.equal(card.sourceUrls.length, 1);
  assert.ok(card.provenance.some((step) => step.includes("Type locality")));
  assert.ok(card.provenance.some((step) => step.includes("CC BY 2.0")));
});

test("selectDemoPath prefers contrasting precision examples", () => {
  const prepared = prepareSpeciesRecords([
    approvedBase,
    {
      ...approvedBase,
      speciesId: "danaus-plexippus",
      displayNames: { zh: "黑脉金斑蝶", en: "Monarch butterfly" },
      discoveryPoint: { ...approvedBase.discoveryPoint, coordinatePrecisionKm: 2500, longitude: -100 },
    },
    {
      ...approvedBase,
      speciesId: "vanessa-cardui",
      displayNames: { zh: "小红蛱蝶", en: "Painted lady" },
      discoveryPoint: { ...approvedBase.discoveryPoint, coordinatePrecisionKm: 4200, longitude: 20 },
    },
  ]);

  assert.deepEqual(selectDemoPath(prepared).map((record) => record.speciesId), [
    "heliconius-erato",
    "danaus-plexippus",
    "vanessa-cardui",
  ]);
});
