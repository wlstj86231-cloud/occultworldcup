// 모든 페이지가 함께 쓰는 머리·바닥글, 운영자 정보, 작성 정보·출처·범위와 한계 블록, 구조화 데이터.
// 운영자 정보는 boribay.com/about 과 jnewmedia.com/company/ 에 공개된 내용만 씁니다.
export const base = "https://occultworldcup.com";
export const SITE_NAME = "농사 비교 월드컵";
export const AD_CLIENT = "ca-pub-5877883031077615";
export const STYLE_V = "4.1.0";

export const OPERATOR = {
  name: "제이 미디어",
  nameFull: "제이 미디어(Media)",
  ceo: "이정우",
  bizNo: "456-33-01705",
  address: "전북특별자치도 군산시 의료원로 80-8, 301호(지곡동)",
  phone: "010-2846-2011",
  email: "consultingjinjeong@gmail.com",
  kakaoGeneral: "https://open.kakao.com/o/scuvl1wi",
  kakaoBoribay: "https://open.kakao.com/o/p6HiJ9Pi",
  site: "https://jnewmedia.com/",
  company: "https://jnewmedia.com/company/",
};
export const BYLINE_TEXT = "작성·관리: 제이 미디어 편집팀 (운영 책임: 대표 이정우)";

export const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
export const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
export const arrow = `<span aria-hidden="true">→</span>`;
export const mailto = `<!--email_off--><a href="mailto:${OPERATOR.email}">${OPERATOR.email}</a><!--/email_off-->`;

// ---- 구조화 데이터 ----
export const ORG_ID = "https://jnewmedia.com/#organization";
export const SITE_ID = `${base}/#website`;
export const ORG = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: OPERATOR.name,
  alternateName: [OPERATOR.nameFull, "제이미디어", "J MEDIA"],
  url: OPERATOR.site,
  logo: { "@type": "ImageObject", url: "https://jnewmedia.com/assets/mark.svg" },
  email: OPERATOR.email,
  telephone: "+82-10-2846-2011",
  taxID: OPERATOR.bizNo,
  address: { "@type": "PostalAddress", streetAddress: "의료원로 80-8, 301호(지곡동)", addressLocality: "군산시", addressRegion: "전북특별자치도", addressCountry: "KR" },
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: "+82-10-2846-2011", email: OPERATOR.email, availableLanguage: "ko" },
  sameAs: ["https://www.instagram.com/boribaydotcom/", "https://blog.naver.com/plannerset", "https://jnewmedia.com/", "https://boribay.com/"],
};
export const WEBSITE = { "@type": "WebSite", "@id": SITE_ID, name: SITE_NAME, url: `${base}/`, inLanguage: "ko-KR", publisher: { "@id": ORG_ID } };
export const orgRef = { "@id": ORG_ID };
export const siteRef = { "@id": SITE_ID };
export const breadcrumbLd = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url.startsWith("http") ? url : `${base}${url}` })),
});
export const graph = (...nodes) => jsonLd({ "@context": "https://schema.org", "@graph": [ORG, WEBSITE, ...nodes] });

// ---- 머리 ----
const ICONS = `<meta name="theme-color" content="#1d6b42"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">`;
export const ADSENSE_META = `<meta name="google-adsense-account" content="${AD_CLIENT}">`;
export const ADSENSE_ASYNC = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>`;
// 긴 비교표 페이지는 첫 화면을 먼저 그린 뒤(load 이후) 같은 AdSense 코드를 불러옵니다. 광고 단위는 추가하지 않습니다.
export const ADSENSE_DEFERRED = `<script>addEventListener("load",function(){setTimeout(function(){var s=document.createElement("script");s.async=true;s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}";s.crossOrigin="anonymous";document.head.appendChild(s)},300)},{once:true})</script>`;
const adsTag = (ads) => (ads === "async" ? ADSENSE_ASYNC : ads === "deferred" ? ADSENSE_DEFERRED : "");

export const HEADER = (current = "") => {
  const items = [["/#compare", "비교 시작"], ["/compare/", "비교표"], ["/guides.html", "선택 가이드"], ["/tools/tractor-candidate-sheet.html", "트랙터 확인표"]];
  return `<header class="site-header"><div class="wrap"><a class="brand" href="/"><img src="/favicon.svg" width="34" height="34" alt=""><span><strong>${SITE_NAME}</strong><small>품종·산지·농기계 선택 기준</small></span></a><nav aria-label="주 메뉴">${items.map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav></div></header>`;
};

export const FOOTER = `<footer class="site-footer"><div class="wrap"><nav aria-label="사이트 정보"><a href="/about.html">소개</a><a href="/contact.html">문의</a><a href="/editorial.html">편집 원칙</a><a href="/corrections.html">정정·수정 기록</a><a href="/privacy.html">개인정보처리방침</a><a href="/terms.html">이용약관</a></nav><p class="op"><strong>${SITE_NAME}</strong> · <span>운영 ${OPERATOR.name}(보리장터 운영사)</span> · <span>대표 ${OPERATOR.ceo}</span> · <span>사업자등록번호 ${OPERATOR.bizNo}</span> · <span>고객센터 <a href="tel:${OPERATOR.phone}">${OPERATOR.phone}</a></span></p></div></footer>`;

export const head = ({ title, description, canonical, ogType = "article", css = [], ads = "async", robots = "index,follow,max-image-preview:large", extra = "", fullTitle = false }) => `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(fullTitle ? title : `${title} | ${SITE_NAME}`)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${robots}">${canonical ? `<link rel="canonical" href="${canonical}">` : ""}<link rel="alternate" type="application/rss+xml" title="${SITE_NAME} 선택 가이드" href="/rss.xml"><meta property="og:title" content="${esc(fullTitle ? title : `${title} | ${SITE_NAME}`)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${ogType}">${canonical ? `<meta property="og:url" content="${canonical}">` : ""}<meta property="og:site_name" content="${SITE_NAME}">${ICONS}${ADSENSE_META}<link rel="stylesheet" href="/style.css?v=${STYLE_V}">${css.map((href) => `<link rel="stylesheet" href="${href}">`).join("")}${extra}${adsTag(ads)}</head><body><a class="skip" href="#main">본문 바로 가기</a>`;

export const breadcrumbNav = (trail) => `<nav class="guide-breadcrumb" aria-label="위치">${trail.map(([name, url], i) => (i === trail.length - 1 ? `<span aria-current="page">${esc(name)}</span>` : `<a href="${url}">${esc(name)}</a><span aria-hidden="true">›</span>`)).join("")}</nav>`;

// ---- 작성 정보 블록 ----
// published: 처음 게시한 날(저장소 첫 기록), checked: 원문을 다시 확인한 날, revised: 같은 주소에서 내용을 새로 만든 날(선택)
export const metaBlock = ({ published, checked, sources, revised, sourcesHref = "#sources" }) => `<p class="page-meta"><span>작성·관리: <a href="/editorial.html">제이 미디어 편집팀</a> (운영 책임: 대표 이정우)</span><span>게시일 <time datetime="${published}">${published}</time></span>${revised && revised !== published ? `<span>전면 개편 <time datetime="${revised}">${revised}</time></span>` : ""}<span>최종 확인일 <time datetime="${checked}">${checked}</time></span>${sources != null ? `<span><a href="${sourcesHref}">출처 ${sources}건</a></span>` : ""}</p>`;

// ---- 출처 ----
const ORGS = [
  ["law.go.kr", "법제처 국가법령정보센터"],
  ["nongsaro.go.kr", "농촌진흥청 농사로"],
  ["farmer.rda.go.kr", "농촌진흥청 농업인안전365"],
  ["rda.go.kr", "농촌진흥청"],
  ["nics.go.kr", "농촌진흥청 국립식량과학원"],
  ["nihhs.go.kr", "농촌진흥청 국립원예특작과학원"],
  ["mafra.go.kr", "농림축산식품부"],
  ["korea.kr", "대한민국 정책브리핑(문화체육관광부)"],
  ["garak.co.kr", "서울시농수산식품공사"],
  ["nongnet.or.kr", "한국농수산식품유통공사"],
  ["naqs.go.kr", "국립농산물품질관리원"],
  ["agri.jeju.go.kr", "제주특별자치도농업기술원"],
  ["sangju.go.kr", "상주시농업기술센터"],
  ["police.go.kr", "경찰청"],
];
export const institution = (url) => {
  const host = new URL(url).hostname;
  return (ORGS.find(([h]) => host === h || host.endsWith(`.${h}`)) || [null, host])[1];
};
const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");
// items: [{ t, u, checked?, note? }]
export const sourceItems = (items, checked) => items.map((s) => `<li><a href="${esc(s.u)}" rel="noopener">${esc(s.t)}</a><small>${esc(institution(s.u))} · ${esc(hostOf(s.u))} · 확인일 ${esc(s.checked || checked)}${s.note ? ` · ${esc(s.note)}` : ""}</small></li>`).join("");
export const sourcesSection = ({ items, checked, intro, cls = "", heading = "출처" }) => `<section class="src-section${cls ? ` ${cls}` : ""}" id="sources"><h2>${heading}</h2>${intro ? `<p>${intro}</p>` : ""}<ol class="src-list">${sourceItems(items, checked)}</ol><p class="fine">틀린 내용이나 바뀐 기준을 발견하면 <a href="/contact.html">문의</a>로 알려주세요. 고친 내용은 <a href="/corrections.html">정정·수정 기록</a>에 남깁니다.</p></section>`;

// ---- 범위와 한계 ----
export const limitsSection = (items, cls = "") => `<section class="limits${cls ? ` ${cls}` : ""}" aria-labelledby="limits-title"><h2 id="limits-title">범위와 한계</h2><ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul></section>`;
