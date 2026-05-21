const BASIS_LABELS = {
  type_locality: "type locality",
  original_description_locality: "original description locality",
  nomenclatural_act_locality: "nomenclatural act locality",
  curated_surrogate: "curated surrogate",
};

const PRECISION_TIERS = [
  { maxKm: 150, style: "pin", label: "pinpoint", radius: 0.018, halo: 0.08 },
  { maxKm: 1000, style: "regional", label: "regional", radius: 0.026, halo: 0.16 },
  { maxKm: 3000, style: "continental", label: "continental", radius: 0.032, halo: 0.28 },
  { maxKm: Infinity, style: "hemisphere", label: "hemisphere", radius: 0.038, halo: 0.42 },
];

export function classifyPrecision(coordinatePrecisionKm) {
  const km = Number(coordinatePrecisionKm);
  if (!Number.isFinite(km) || km < 0) {
    return { ...PRECISION_TIERS.at(-1), coordinatePrecisionKm: null };
  }
  const tier = PRECISION_TIERS.find((item) => km <= item.maxKm) ?? PRECISION_TIERS.at(-1);
  return { ...tier, coordinatePrecisionKm: km };
}

export function basisLabel(basis) {
  return BASIS_LABELS[basis] ?? basis?.replaceAll("_", " ") ?? "unknown basis";
}

export function buildCardModel(record) {
  const discovery = record.discoveryPoint ?? {};
  const image = record.image ?? {};
  const precision = classifyPrecision(discovery.coordinatePrecisionKm);
  const locationBasis = basisLabel(discovery.basis);
  const basisSentence =
    locationBasis === "type locality"
      ? `Type locality: ${discovery.label}`
      : `${titleCase(locationBasis)}: ${discovery.label}`;

  return {
    id: record.speciesId,
    title: record.card?.titleZh || record.displayNames?.zh || record.scientificName,
    englishName: record.displayNames?.en ?? "",
    scientificName: record.scientificName,
    authority: record.taxonAuthority,
    year: discovery.year,
    location: discovery.label,
    locationBasis,
    confidence: discovery.confidence,
    precisionLabel: precision.style,
    precisionKm: precision.coordinatePrecisionKm,
    summary: record.card?.summaryZh ?? "",
    locationCaption: record.card?.locationCaptionZh ?? "",
    imageUrl: image.url,
    imageSourcePage: image.sourcePage,
    license: image.license,
    creator: image.creator,
    attribution: image.attribution,
    sourceUrls: Array.isArray(discovery.sourceUrls) ? discovery.sourceUrls : [],
    sourceNotes: discovery.sourceNotes ?? "",
    provenance: [
      basisSentence,
      `Evidence: ${discovery.sourceUrls?.[0] ?? "source pending"}`,
      `Image: ${image.creator ?? "creator pending"} / ${image.license ?? "license pending"}`,
      `Coordinate confidence: ${discovery.confidence}; precision ${formatPrecision(precision.coordinatePrecisionKm)}`,
    ],
  };
}

export function prepareSpeciesRecords(rawRecords) {
  if (!Array.isArray(rawRecords)) return [];
  return rawRecords
    .filter((record) => {
      const point = record.discoveryPoint ?? {};
      return (
        record.curationStatus === "approved" &&
        point.confidence !== "low" &&
        Number.isFinite(point.latitude) &&
        Number.isFinite(point.longitude)
      );
    })
    .map((record) => {
      const precision = classifyPrecision(record.discoveryPoint.coordinatePrecisionKm);
      return {
        ...record,
        precision,
        cardModel: buildCardModel(record),
      };
    });
}

export function selectDemoPath(records) {
  const byStyle = new Map(records.map((record) => [record.precision?.style, record]));
  const picks = ["regional", "continental", "hemisphere"]
    .map((style) => byStyle.get(style))
    .filter(Boolean);

  for (const record of records) {
    if (picks.length >= 3) break;
    if (!picks.some((item) => item.speciesId === record.speciesId)) picks.push(record);
  }

  return picks.slice(0, 3);
}

export function formatPrecision(km) {
  return Number.isFinite(km) ? `${Math.round(km).toLocaleString("en-US")} km` : "unknown";
}

function titleCase(value) {
  return String(value)
    .split(" ")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}
