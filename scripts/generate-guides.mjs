import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const base = "https://occultworldcup.com";
const date = "2026-08-10";
const guides = [
  {
    slug: "potato-purpose-size-selection",
    title: "감자 용도·크기 선택법: 식용, 조림, 튀김용을 먼저 나누세요",
    description: "감자 품종 이름보다 조리 목적, 크기 구성, 표면 상태와 보관 조건을 먼저 정하는 구매 기준입니다.",
    lead: "감자는 ‘좋은 품종’ 하나를 고르는 문제가 아닙니다. 삶기·찌기, 조림, 튀김처럼 용도를 먼저 정하면 필요한 식감과 크기, 구매 규격이 선명해집니다.",
    sections: [
      ["1. 용도를 한 문장으로 정하기", ["가정용 혼합 조리라면 크기가 고르고 설명이 쉬운 구성을 우선합니다.", "조림은 작은 크기와 균일성, 튀김·가공은 건물률과 품종 특성을 판매자에게 확인합니다."]],
      ["2. 크기와 외관을 따로 보기", ["대·중·소 혼합 여부와 가장 작은 크기, 가장 큰 크기를 숫자나 비교 사진으로 확인합니다.", "못난이 감자는 모양 편차와 상처·부패를 구분하고 먹기 어려운 손상의 제외 기준을 정합니다."]],
      ["3. 가격은 같은 조건으로 비교하기", ["내용량, 배송비, 선별 정도, 수확 시기까지 같게 맞춘 뒤 상자 가격을 비교합니다.", "도착 즉시 확인할 중량·상처·싹·녹변 기준을 주문 전에 합의합니다."]],
    ],
    links: [
      ["햇감자 10kg 가격 비교 원리", "new-potato-10kg-price-guide"],
      ["못난이 감자 구매 점검표", "ugly-potato-buying-guide"],
      ["강원도 햇감자 산지 확인법", "gangwon-new-potato-buying-guide"],
    ],
  },
  {
    slug: "apple-plum-season-pack-size",
    title: "사과·자두 제철 포장 선택법: 품종, 숙도, 중량을 함께 보세요",
    description: "홍로 사과와 자두를 살 때 품종명만 보지 않고 출하시기, 숙도, 크기 혼합과 실중량을 비교하는 방법입니다.",
    lead: "과일은 같은 품종이라도 출하시기와 숙도, 크기 구성에 따라 먹는 시점과 배송 안정성이 달라집니다. ‘몇 kg’보다 상자 안 구성을 먼저 확인하세요.",
    sections: [
      ["1. 먹을 날짜에서 거꾸로 고르기", ["바로 먹을 물량과 며칠 보관할 물량을 나누고, 숙도와 보관 안내를 확인합니다.", "명절·선물용은 외관과 개수, 가정용은 맛과 손상 제외 기준을 우선합니다."]],
      ["2. 품종과 크기 구성을 기록하기", ["홍로처럼 수확기가 짧은 품종은 생산지와 수확·발송일을 함께 봅니다.", "자두는 품종별 출하시기와 무름 정도가 달라 품종명, 크기, 숙도를 사진으로 확인합니다."]],
      ["3. 포장 단위 비교하기", ["박스 표시 중량이 내용물 실중량인지 확인합니다.", "혼합 크기라면 대표 과실만 보지 말고 전체 상자 사진과 대략적인 개수를 요청합니다."]],
    ],
    links: [
      ["홍로 사과 구매 기준", "hongro-apple-buying-guide"],
      ["못난이 사과 확인 항목", "ugly-apple-buying-guide"],
      ["자두 5kg 가격·구성 비교", "plum-5kg-price-guide"],
    ],
  },
  {
    slug: "tractor-horsepower-work-tool",
    title: "중고 트랙터 마력 선택법: 작업기·면적·운송까지 맞추세요",
    description: "중고 트랙터를 인기 모델이나 마력 숫자만으로 고르지 않고 작업기, 포장 규모, 정비와 운송 조건으로 비교하는 방법입니다.",
    lead: "트랙터는 마력이 높다고 항상 유리하지 않습니다. 실제로 연결할 작업기와 포장 조건, 이동 경로, 정비 접근성을 먼저 적으면 과한 장비와 부족한 장비를 걸러낼 수 있습니다.",
    sections: [
      ["1. 작업기부터 적기", ["로터리·로더·쟁기 등 실제 사용할 작업기의 규격과 요구 동력을 확인합니다.", "본체 가격에 포함되는 작업기와 별도 구매할 작업기를 구분합니다."]],
      ["2. 사용시간보다 상태 보기", ["냉간 시동, 누유, PTO, 유압, 변속을 직접 확인하고 계기판 교체 여부를 묻습니다.", "정비 영수증과 소모품 교환 기록이 사용시간 설명과 맞는지 비교합니다."]],
      ["3. 인도 비용까지 총액으로 보기", ["상차·결박·운송·하차 비용과 책임자를 계약서에 적습니다.", "진입로 폭과 경사, 전선, 하차 공간을 운송 기사와 미리 확인합니다."]],
    ],
    links: [
      ["중고 트랙터 가격 비교 원리", "used-tractor-price-comparison-guide"],
      ["중고 트랙터 현장 점검표", "used-tractor-buying-checklist"],
      ["농기계 운송·인도 점검표", "farm-machinery-transport-checklist"],
    ],
  },
  {
    slug: "rice-milling-weight-selection",
    title: "쌀 10kg·20kg 선택법: 생산연도와 도정일을 분리해 보세요",
    description: "햅쌀과 갓도정 쌀을 구분하고 10kg·20kg 가격을 배송비와 보관 기간까지 맞춰 비교하는 방법입니다.",
    lead: "햅쌀은 생산연도, 갓도정은 도정연월일에 관한 표현입니다. 두 날짜를 분리해 보고 가정의 소비 속도에 맞는 중량을 골라야 신선도와 단가를 함께 판단할 수 있습니다.",
    sections: [
      ["1. 표시사항을 네 칸으로 보기", ["품종, 생산연도, 도정연월일, 원산지를 각각 확인합니다.", "혼합미인지 단일 품종인지, 생산자와 판매자가 같은지도 함께 봅니다."]],
      ["2. 10kg와 20kg의 실제 비용 비교", ["상품가와 배송비를 더한 뒤 kg당 가격으로 환산합니다.", "소비 기간이 길다면 낮은 kg당 가격보다 개봉 후 보관 부담을 더 중요하게 봅니다."]],
      ["3. 도착 뒤 확인", ["포장 파손, 습기, 벌레 흔적과 표시사항을 개봉 전에 촬영합니다.", "판매자가 안내한 밀폐·저온 보관법과 반품 기준을 주문 전에 확인합니다."]],
    ],
    links: [
      ["햅쌀 10kg·20kg 가격 비교", "new-rice-10kg-20kg-price-guide"],
      ["갓도정 쌀 구매 확인법", "fresh-milled-rice-buying-guide"],
    ],
  },
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const head = (title, description, canonical, type = "article") => `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | 농사월드컵</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${esc(title)} | 농사월드컵"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${type}"><meta property="og:url" content="${canonical}"><link rel="stylesheet" href="/style.css?v=3.1.0"><link rel="stylesheet" href="/guide.css?v=1.0.0"></head><body><header><a class="brand" href="/"><span><i data-lucide="trophy"></i></span><strong>농사월드컵</strong><small>품종·산지·농기계 선택 비교</small></a><nav><a href="/">비교 도구</a><a href="/guides.html">선택 가이드</a></nav></header>`;
const foot = `<footer><strong>농사월드컵</strong><p>인기보다 목적과 조건으로 농산물·농기계를 비교합니다.</p><nav><a href="/about.html">소개</a><a href="/privacy.html">개인정보</a><a href="/contact.html">문의</a></nav></footer><script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script><script>if(window.lucide)lucide.createIcons();</script></body></html>`;

await fs.mkdir(path.join(root, "guides"), { recursive: true });
const cards = guides.map((guide) => `<article><p>선택 기준</p><h2><a href="/guides/${guide.slug}.html">${esc(guide.title)}</a></h2><span>${esc(guide.description)}</span><a href="/guides/${guide.slug}.html">기준 자세히 보기 <i data-lucide="arrow-right"></i></a></article>`).join("");
const hubSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "농산물·농기계 선택 가이드", url: `${base}/guides.html`, hasPart: guides.map((guide) => ({ "@type": "Article", name: guide.title, url: `${base}/guides/${guide.slug}.html` })) }).replace(/</g, "\\u003c");
const hub = `${head("농산물·농기계 선택 가이드", "감자·사과·자두·쌀과 중고 트랙터를 목적, 규격, 상태와 인도 조건으로 비교하는 짧은 선택 가이드입니다.", `${base}/guides.html`, "website")}<script type="application/ld+json">${hubSchema}</script><main class="guide-main"><nav class="guide-breadcrumb"><a href="/">홈</a><span>›</span><span>선택 가이드</span></nav><section class="guide-hero"><p>1분 비교 뒤 읽는 기준</p><h1>농산물·농기계<br><em>선택 가이드</em></h1><span>인기순이나 광고 문구보다 용도·규격·상태·인도 조건으로 비교하세요.</span></section><section class="guide-grid">${cards}</section></main>${foot}`;
await fs.writeFile(path.join(root, "guides.html"), hub, "utf8");

for (const guide of guides) {
  const canonical = `${base}/guides/${guide.slug}.html`;
  const sectionHtml = guide.sections.map(([heading, items]) => `<section><h2>${esc(heading)}</h2><ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>`).join("");
  const linksHtml = guide.links.map(([text, slug]) => `<a href="https://boribay.com/guides/${slug}?utm_source=occultworldcup.com&amp;utm_medium=owned_referral&amp;utm_campaign=farm_selection_guides&amp;utm_content=${guide.slug}">${esc(text)} <i data-lucide="arrow-right"></i></a>`).join("");
  const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: date, dateModified: date, inLanguage: "ko-KR", mainEntityOfPage: canonical, author: { "@type": "Organization", name: "농사월드컵 편집팀" }, publisher: { "@type": "Organization", name: "농사월드컵", url: base } }).replace(/</g, "\\u003c");
  const html = `${head(guide.title, guide.description, canonical)}<script type="application/ld+json">${schema}</script><main class="guide-main"><nav class="guide-breadcrumb"><a href="/">홈</a><span>›</span><a href="/guides.html">선택 가이드</a></nav><article class="guide-article"><header><p>선택 가이드 · ${date}</p><h1>${esc(guide.title)}</h1><span>${esc(guide.description)}</span></header><div class="guide-layout"><div><aside class="guide-lead"><strong>먼저 정할 것</strong><p>${esc(guide.lead)}</p></aside>${sectionHtml}<section class="guide-source"><h2>확인 원칙</h2><p>실제 구매·계약 전에는 상품 표시, 실물, 판매자 설명과 최신 공식 기준을 다시 확인하세요.</p></section></div><aside class="guide-next"><h2>조건을 정했다면</h2><p>같은 조건으로 시세와 거래 기준을 비교하세요.</p>${linksHtml}</aside></div></article></main>${foot}`;
  await fs.writeFile(path.join(root, "guides", `${guide.slug}.html`), html, "utf8");
}

const css = `.guide-main{max-width:1000px}.guide-breadcrumb{padding-top:26px;display:flex;gap:8px;color:#77807a;font-size:13px}.guide-hero{padding:60px 0 42px}.guide-hero>p,.guide-grid article>p,.guide-article>header>p{color:var(--green2);font-size:13px;font-weight:900}.guide-hero h1{font-size:48px;line-height:1.22;letter-spacing:-2px;margin:7px 0}.guide-hero h1 em{font-style:normal;color:var(--green)}.guide-hero>span,.guide-grid article>span,.guide-article>header>span{color:var(--text)}.guide-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;padding-bottom:70px}.guide-grid article{border:1px solid var(--line);border-radius:12px;padding:22px}.guide-grid h2{font-size:20px;line-height:1.45;margin:7px 0}.guide-grid article>a{display:flex;align-items:center;gap:7px;margin-top:14px;color:var(--green2);font-weight:800;font-size:13px}.guide-grid svg{width:16px}.guide-article>header{padding:38px 0;border-bottom:1px solid var(--line)}.guide-article h1{font-size:40px;line-height:1.3;margin:7px 0}.guide-layout{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:34px;padding:34px 0 70px}.guide-layout>div>section{padding:8px 0 24px;border-bottom:1px solid var(--line)}.guide-layout h2{font-size:21px}.guide-layout li{color:var(--text);margin:9px 0}.guide-lead{background:var(--pale);border-left:4px solid var(--yellow);padding:18px;margin-bottom:18px}.guide-lead p{margin-bottom:0;color:var(--text)}.guide-next{align-self:start;position:sticky;top:96px;background:var(--pale);padding:20px;border-radius:10px}.guide-next p{font-size:13px;color:var(--text)}.guide-next a{display:flex;align-items:center;justify-content:space-between;gap:8px;background:#fff;border:1px solid var(--line);border-radius:7px;padding:11px;margin-top:8px;color:var(--green2);font-size:13px;font-weight:800}.guide-next svg{width:15px;min-width:15px}@media(max-width:760px){.guide-grid,.guide-layout{grid-template-columns:1fr}.guide-hero h1,.guide-article h1{font-size:35px}.guide-next{position:static}}`;
await fs.writeFile(path.join(root, "guide.css"), css, "utf8");

let index = await fs.readFile(path.join(root, "index.html"), "utf8");
if (!index.includes('href="/guides.html"')) index = index.replace('<a href="#how">선택 원리</a>', '<a href="#how">선택 원리</a><a href="/guides.html">선택 가이드</a>');
await fs.writeFile(path.join(root, "index.html"), index, "utf8");

let sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
const urls = [`${base}/guides.html`, ...guides.map((guide) => `${base}/guides/${guide.slug}.html`)];
const entries = urls.filter((url) => !sitemap.includes(`<loc>${url}</loc>`)).map((url) => `  <url><loc>${url}</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
if (entries) sitemap = sitemap.replace("</urlset>", `${entries}\n</urlset>`);
sitemap = sitemap.replaceAll("<lastmod>2026-08-09</lastmod>", `<lastmod>${date}</lastmod>`);
await fs.writeFile(path.join(root, "sitemap.xml"), sitemap, "utf8");
console.log(`generated ${guides.length} selection guides`);
