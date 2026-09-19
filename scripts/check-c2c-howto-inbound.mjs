import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const newSlugs = [
  ["listing-field-selection", "produce-listing-three-fields"],
  ["machinery-listing-fields", "used-machinery-listing-nameplate"],
  ["nearby-produce-filter", "nearby-produce-listing-search"],
  ["nearby-machinery-filter", "nearby-used-tractor-search"],
  ["meetup-or-parcel-choice", "meetup-vs-direct-shipping-choice"],
  ["farm-vs-appliance-category", "tractor-wrong-category-compare"],
  ["c2c-vs-mall-choice", "produce-and-machinery-one-list"],
  ["kimjang-listing-dates", "kimjang-rice-listing-dates"],
];
const errors = [];

for (const [slug, dest] of newSlugs) {
  const html = await fs.readFile(path.join(root, "guides", `${slug}.html`), "utf8");
  const header = html.slice(html.indexOf("<header>"), html.indexOf("</header>") + 9);
  if (header.includes("보리장터")) errors.push(`${slug}: header has 보리장터`);
  if (!html.includes(`utm_campaign=c2c_howto_202609`)) errors.push(`${slug}: missing campaign`);
  if (!html.includes(`utm_content=${slug}`)) errors.push(`${slug}: missing utm_content`);
  if (!html.includes(`https://boribay.com/guides/${dest}?`)) errors.push(`${slug}: missing dest ${dest}`);
  if ((html.match(/boribay.com\/guides\//g) || []).length !== 1) errors.push(`${slug}: expected 1 boribay guide href`);
  if (html.includes("garak-market-price-lookup") || html.includes("garak-cabbage-price-lookup")) errors.push(`${slug}: Garak dest`);
  if (html.includes("yomiwiki.com") || html.includes("reportools") || html.includes("goatool") || html.includes("scamreader")) errors.push(`${slug}: satellite-to-satellite`);
  if (html.includes("제휴") || html.includes("공식 파트너")) errors.push(`${slug}: partnership tone`);
}

const kimjang = await fs.readFile(path.join(root, "guides", "kimjang-pack-unit-kg.html"), "utf8");
if (!kimjang.includes("utm_campaign=farm_selection_guides")) errors.push("kimjang Dataset campaign rewritten");
if (!kimjang.includes("garak-cabbage-price-lookup")) errors.push("kimjang cabbage dest missing");

const index = await fs.readFile(path.join(root, "index.html"), "utf8");
if (!index.includes("/guides/kimjang-pack-unit-kg.html")) errors.push("home 3-card kimjang missing");
if (!index.includes("/guides/autumn-fruit-box-kg.html")) errors.push("home fruit card missing");
if (!index.includes("/guides/autumn-produce-box-kg.html")) errors.push("home produce card missing");
const indexHeader = index.slice(index.indexOf("<header>"), index.indexOf("</header>") + 9);
if (indexHeader.includes("보리장터")) errors.push("home header has 보리장터");

const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
for (const [slug] of newSlugs) {
  if (!sitemap.includes(`/guides/${slug}.html`)) errors.push(`sitemap missing ${slug}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`occult c2c inbound ok: ${newSlugs.length} pages`);
