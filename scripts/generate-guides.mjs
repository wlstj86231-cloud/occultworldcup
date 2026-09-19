import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const base = "https://occultworldcup.com";
const originalDate = "2026-08-10";
const updateDate = "2026-09-20";
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
      ["서울가락 홍로 10kg kg당", "garak-apple-price-lookup"],
      ["서울가락 추희자두 5kg kg당", "garak-plum-price-lookup"],
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
    internalLinks: [
      ["같은 조건으로 트랙터 탁송 견적 비교하기", "/guides/tractor-transport-quote-comparison.html"],
    ],
    modifiedAt: updateDate,
  },
  {
    slug: "tractor-transport-quote-comparison",
    title: "트랙터 탁송 견적 비교법: 농기계 용달 비용을 같은 조건으로 맞추세요",
    description: "트랙터 탁송과 농기계 용달 견적을 거리, 장비 제원, 작업기, 상하차 장비, 진입로와 추가 비용까지 같은 조건으로 비교하는 방법입니다.",
    lead: "주소와 거리만 보내 받은 견적은 포함 범위가 달라 비교하기 어렵습니다. 여러 운송업체에 같은 장비 정보와 현장 사진을 보내고, 상차·고정·하차·대기·통행료·보상 범위를 한 표에 적어야 최종 비용과 책임을 비교할 수 있습니다.",
    sections: [
      ["1. 모든 업체에 같은 견적 요청서를 보내세요", ["출발지·도착지, 희망 날짜와 시간 범위, 제조사·모델명을 적습니다.", "로더·로터리·캐빈 등 부착 작업기를 포함한 전체 길이·너비·높이·중량을 확인합니다.", "시동과 주행 가능 여부, 작업기 분리 가능 여부, 상하차 장비가 필요한지를 함께 알립니다."]],
      ["2. 현장 사진으로 진입과 상하차 조건을 맞추세요", ["출발지와 도착지의 진입로 폭, 급경사, 낮은 전선·나뭇가지, 회차 공간을 같은 각도로 촬영합니다.", "지면이 무르거나 기울었는지, 대형 차량이 잠시 설 수 있는 평탄한 공간이 있는지 알립니다.", "주소만으로 진입 가능 여부를 단정하지 말고 기사에게 사진과 실제 조건을 확인받습니다."]],
      ["3. 기본 운임보다 최종 결제 범위를 비교하세요", ["상차비·하차비, 크레인·지게차 사용료, 대기료, 통행료와 부가세 포함 여부를 각각 적습니다.", "판매자·구매자·운송업체 중 누가 장비를 운전하고 작업기를 분리하며 적재물을 고정할지 정합니다.", "현장 조건이 사전 설명과 다를 때 추가 비용을 계산하는 기준과 일정 변경·취소 조건을 확인합니다."]],
      ["4. 운송 전후 상태와 인수 시점을 기록하세요", ["상차 전 장비 네 면, 유리, 계기판, 작업기와 기존 흠집을 촬영합니다.", "운송 중 사고 때 연락 순서와 보상 범위, 필요한 증빙을 계약 전에 확인합니다.", "도착 뒤 고정 장치를 풀기 전에 적재 상태와 외관을 다시 촬영하고 인수 확인 시점을 정합니다."]],
    ],
    comparison: {
      caption: "트랙터 탁송 견적 비교표",
      headers: ["비교 항목", "업체에 전달할 조건", "견적서에서 확인할 내용"],
      rows: [
        ["장비", "모델·작업기·전체 제원·주행 가능 여부", "배차 차량과 적재 가능 여부"],
        ["상하차", "램프·크레인·지게차 필요 여부", "장비 사용료와 담당자"],
        ["현장", "진입로·경사·회차·대기 공간 사진", "현장 추가비와 대기료 기준"],
        ["최종 비용", "날짜·거리·통행 구간", "운임·통행료·부가세 포함 총액"],
        ["사고·변경", "기존 흠집과 인수 시점", "보상 범위·연락처·취소 조건"],
      ],
    },
    faqs: [
      ["농기계 탁송 비용을 거리만으로 알 수 있나요?", "거리 외에도 장비와 작업기의 실제 제원, 자력 상차 가능 여부, 크레인·지게차 필요 여부, 진입로와 대기 조건이 달라 최종 견적이 달라질 수 있습니다."],
      ["농기계 용달과 트랙터 탁송 중 무엇을 고르면 되나요?", "명칭보다 실제 장비의 크기·중량을 적재할 수 있는 차량인지, 필요한 상하차 방식과 고정 장비를 갖췄는지 확인하세요."],
      ["판매자와 구매자 중 누가 탁송비를 내나요?", "정해진 한 가지 답은 없습니다. 계약 전에 부담 주체, 상하차 담당, 추가 비용과 인수 시점을 문서로 합의하세요."],
    ],
    links: [
      ["농기계 탁송 견적 요청 항목 전체 보기", "farm-machinery-transport-checklist"],
      ["중고 농기계 판매·인도 준비", "used-machinery-selling-checklist"],
      ["중고 트랙터 현장 점검표", "used-tractor-buying-checklist"],
    ],
    internalLinks: [
      ["마력·작업기·운송 조건으로 트랙터 고르기", "/guides/tractor-horsepower-work-tool.html"],
    ],
    sources: [
      ["농촌진흥청 농업기계 안전수칙 5계명", "https://www.rda.go.kr/board/board.do?boardId=movie&dataNo=100000794225&mode=updateCnt&prgId=con_movie&site_preference=normal"],
      ["농촌진흥청 농업인안전365", "https://farmer.rda.go.kr/portal/menu3/contentMainPlay.do?m_id=9002_55&menuId=PS03436"],
    ],
    publishedAt: updateDate,
    modifiedAt: updateDate,
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
  {
    slug: "garak-auction-direct-price-comparison",
    title: "가락시장 오늘 시세와 직거래 가격: 최고가 말고 kg당으로 맞추세요",
    description: "서울가락 오늘 경락가는 거래량 가중 kg당과 최저~최고 범위로 읽고, 직거래 판매가와는 선별·포장·배송 조건을 나눠 비교하는 방법입니다.",
    lead: "가락시장 경락가는 도매시장 거래 결과이고 산지 직거래가는 선별·포장·배송이 포함될 수 있습니다. 오늘 숫자만 복사하지 말고, 가중평균과 최고가를 구분한 뒤 같은 품종·등급·포장으로 맞춥니다.",
    sections: [
      ["1. 오늘 서울가락 숫자는 kg당 가중평균으로 먼저 보세요", ["당일 잠정과 전일 확정을 구분하고, 거래일과 시장이 서울가락인지 확인합니다.", "최고가 한 건이 아니라 거래량 가중 kg당과 최저~최고 범위를 한 줄에 적습니다.", "품종·등급·상자 중량이 다르면 같은 시세로 묶지 않습니다."]],
      ["2. 상자 가격은 kg당 가격으로 먼저 맞추세요", ["상자 가격을 실제 내용량으로 나눠 kg당 가격을 계산합니다. 예를 들어 5kg 30,000원은 kg당 6,000원입니다.", "포장재 무게를 뺀 실중량인지, 배송비가 포함된 가격인지 확인합니다.", "10kg 상자와 5kg 상자를 비교할 때 품종·등급·규격도 같지 않으면 단가만으로 결론 내리지 않습니다."]],
      ["3. 경락가와 실제 정산액을 구분하세요", ["경락가는 낙찰된 거래 가격이고 출하자가 받는 정산액은 위탁수수료·운송·하역·선별·포장 등 실제 비용에 따라 달라질 수 있습니다.", "직거래 판매가에서도 포장재·택배·결제 비용·반품 손실을 빼야 판매자가 남기는 금액과 비교할 수 있습니다.", "두 방식은 같은 기준의 예상 순수령액으로 바꾼 뒤 비교합니다."]],
      ["4. 하루 값보다 같은 조건의 흐름을 기록하세요", ["날짜가 바뀔 때마다 품종·등급·규격과 물량이 같은지 먼저 확인합니다.", "최고가·최저가 한 건보다 같은 조건의 중심 범위와 며칠간 변화를 봅니다.", "가공 표는 참고값이며, 출하·계약 전에는 공식 가격정보도 확인합니다."]],
    ],
    comparison: {
      caption: "가락시장 경락가와 직거래 가격 비교표",
      headers: ["맞출 항목", "가락시장 경락가", "산지 직거래 가격"],
      rows: [
        ["상품 조건", "품목·품종·등급·규격·산지", "같은 품목·품종·상태·선별 기준"],
        ["단위", "kg 또는 포장 단위와 물량", "실중량과 상자당 개수·크기"],
        ["비용", "수수료·운송·하역·선별·포장", "포장재·택배·결제·반품 비용"],
        ["비교값", "비용을 뺀 예상 정산액", "비용을 뺀 예상 판매 수익"],
      ],
    },
    faqs: [
      ["가락시장 오늘 시세는 어디서 조회하나요?", "서울가락 오늘 잠정·전일 확정 경락가를 거래량 가중 kg당으로 보려면 보리장터 서울가락 표를 열고, 원자료는 서울시농수산식품공사 공식 가격정보에서도 확인합니다."],
      ["같은 농산물인데 경락가가 다른 이유는 무엇인가요?", "품종, 등급, 규격, 산지, 포장 단위, 거래 날짜와 물량이 다를 수 있습니다. 이름만 같은 상품을 한 가격으로 묶지 마세요."],
      ["경락가와 직거래 판매가를 바로 비교해도 되나요?", "포함된 비용이 달라 그대로 비교하기 어렵습니다. 양쪽 가격을 kg당 단가로 맞추고 각 방식의 운송·선별·포장·수수료 등을 반영한 예상 순수령액을 계산하세요."],
    ],
    links: [
      ["서울가락 오늘 경락가 kg당 가중평균 표", "garak-market-price-lookup"],
      ["농산물 상자 가격 kg당 비교 계산기", "produce-price-calculator"],
      ["농산물 직거래 가격·포장 기준", "produce-direct-sale-pricing-packaging"],
    ],
    sources: [
      ["서울시농수산식품공사 가락시장 공식 가격정보", "https://einvoice.garak.co.kr/"],
    ],
    modifiedAt: updateDate,
  },
  {
    slug: "kimjang-pack-unit-kg",
    title: "김장 출하 포장 단위: 배추 망·무 상자·양파 망을 kg으로 맞추세요",
    description: "김장 배추 10kg 그물망, 김장무 20kg 상자, 저장양파 15kg 망 가격을 실중량 kg당으로 바꿔 서울가락 품목 표와 비교하는 방법입니다.",
    lead: "김장 출하 글은 망·상자 가격을 시세처럼 적기 쉽습니다. 포장 단위 이름을 그대로 두지 말고 내용 중량으로 나눈 뒤, 배추·무·양파를 서로 다른 품목 표와 맞춥니다.",
    sections: [
      ["1. 배추 10kg 그물망을 실중량으로 나누기", ["표시 10kg가 배추만의 무게인지 확인합니다.", "망 가격을 내용 kg으로 나눈 값이 비교용 kg당입니다.", "포기 수와 결구 크기가 다르면 같은 망으로 묶지 않습니다."]],
      ["2. 김장무 20kg 상자와 심는 시기를 나누기", ["20kg 상자는 출하 단위이고 심는 시기 안내는 파종 판단입니다.", "상자 표시가 무 실중량인지 총중량인지 확인합니다.", "열무·알타리와 김장무를 한 시세로 읽지 않습니다."]],
      ["3. 양파 15kg 망과 대파 단을 각각 맞추기", ["저장양파와 햇양파는 품종·건조 상태가 다르면 같은 행이 아닙니다.", "대파 단 무게를 확인하기 전에 쪽파 시세와 섞지 않습니다.", "세 품목을 한 평균 가격으로 곱하지 않습니다."]],
      ["4. 직거래 판매가는 선별·포장·배송을 따로 적기", ["가락 kg당은 도매 거래 결과입니다.", "택배 김장 세트 가격에는 묶음·완충·배송이 포함될 수 있습니다.", "같은 단위로 맞춘 뒤에만 어느 쪽이 유리한지 비교합니다."]],
    ],
    comparison: {
      caption: "김장 포장 단위를 kg당으로 맞추는 표",
      headers: ["포장 이름", "먼저 확인할 것", "비교값"],
      rows: [
        ["배추 10kg 그물망", "배추 실중량·포기 구성", "망 가격 ÷ 내용 kg"],
        ["김장무 20kg 상자", "무 실중량·작형", "상자 가격 ÷ 내용 kg"],
        ["양파 15kg 망", "저장 여부·품종", "망 가격 ÷ 내용 kg"],
        ["대파 단·망", "단 무게·쪽파 여부", "단·망 가격 ÷ 내용 kg"],
      ],
    },
    faqs: [
      ["김장배추 망 가격이 가락 시세보다 비싸면 손해인가요?", "포함된 비용이 다릅니다. kg당으로 맞춘 뒤 선별·포장·배송을 반영한 예상 순수령액으로 비교하세요."],
      ["김장무 심는 시기 페이지의 숫자로 상자 가격을 매겨도 되나요?", "심는 시기는 파종 판단입니다. 오늘 상자 시세는 서울가락 무 kg당 표와 실중량으로 확인하세요."],
    ],
    links: [
      ["서울가락 배추 10kg 그물망 kg당", "garak-cabbage-price-lookup"],
      ["서울가락 김장무 20kg 상자 kg당", "garak-radish-price-lookup"],
      ["서울가락 양파 15kg 망 kg당", "garak-onion-price-lookup"],
      ["서울가락 대파 kg·망 단위", "garak-daepa-price-lookup"],
    ],
    internalLinks: [
      ["가락 경락가와 직거래 가격을 kg당으로 맞추기", "/guides/garak-auction-direct-price-comparison.html"],
    ],
    sources: [
      ["서울시농수산식품공사 가락시장 공식 가격정보", "https://einvoice.garak.co.kr/"],
    ],
    publishedAt: updateDate,
    modifiedAt: updateDate,
  },
  {
    slug: "autumn-fruit-box-kg",
    title: "제철 과일 상자: 샤인마스캇 4kg·신고 7.5kg·홍로 10kg을 kg으로 맞추세요",
    description: "샤인마스캇 4kg, 신고배 7.5kg, 홍로 10kg, 복숭아 4kg, 추희자두 5kg 상자 가격을 실중량 kg당으로 바꿔 서울가락 품목 표와 비교하는 방법입니다.",
    lead: "제철 과일 글은 상자 가격을 시세처럼 적기 쉽습니다. 4kg·7.5kg·10kg·5kg 이름을 그대로 두지 말고 내용 중량으로 나눈 뒤, 품종명이 같은 행만 고릅니다.",
    sections: [
      ["1. 샤인마스캇 4kg와 2kg를 나누기", ["표시 4kg가 포도 실중량인지 확인합니다.", "캠벨·마스캇베리에이 행을 샤인마스캇 시세로 쓰지 않습니다.", "알 빠짐 송이를 뺀 뒤에 kg당을 다시 계산합니다."]],
      ["2. 신고배 7.5kg와 15kg, 선물 개수를 나누기", ["7.5kg 상자와 15kg 상자·파렛트는 같은 행이 아닐 수 있습니다.", "몇 과 세트 가격은 개당이고 가락 표는 kg당입니다.", "화산과 신고를 한 평균으로 묶지 않습니다."]],
      ["3. 홍로 10kg·복숭아 4kg·추희 5kg를 각각 맞추기", ["햇사과 문구와 품종명 홍로를 나눕니다.", "복숭아 숙도 표현은 경락가 표에 없습니다.", "후무사·김천 산지 안내의 숫자를 추희 5kg 시세로 쓰지 않습니다."]],
      ["4. 직거래 택배가는 선별·완충·배송을 따로 적기", ["가락 kg당은 도매 거래 결과입니다.", "난좌·아이스팩·택배가 포함되면 같은 숫자가 될 수 없습니다.", "같은 품종·실중량으로 맞춘 뒤에만 비교합니다."]],
    ],
    comparison: {
      caption: "제철 과일 상자를 kg당으로 맞추는 표",
      headers: ["포장 이름", "먼저 확인할 것", "비교값"],
      rows: [
        ["샤인마스캇 4kg", "품종명·실중량·송이 상태", "상자 가격 ÷ 내용 kg"],
        ["신고배 7.5kg", "신고/화산·상자/파렛트", "상자 가격 ÷ 내용 kg"],
        ["홍로 10kg", "품종명·개수 구성", "상자 가격 ÷ 내용 kg"],
        ["복숭아 4kg", "품종명·숙도", "상자 가격 ÷ 내용 kg"],
        ["추희자두 5kg", "추희/후무사·무름", "상자 가격 ÷ 내용 kg"],
      ],
    },
    faqs: [
      ["샤인마스캇 4kg가 가락 시세보다 비싸면 손해인가요?", "포함된 비용이 다릅니다. kg당으로 맞춘 뒤 선별·포장·배송을 반영한 예상 순수령액으로 비교하세요."],
      ["신고배 선물 세트 개수 가격을 kg당 표와 바로 비교해도 되나요?", "개수를 kg으로 바꾸기 전에 과실 크기 구성이 같은지 확인하세요. 개당과 kg당을 한 숫자로 두지 않습니다."],
    ],
    links: [
      ["서울가락 샤인마스캇 4kg kg당", "garak-grape-price-lookup"],
      ["서울가락 신고배 7.5kg kg당", "garak-pear-price-lookup"],
      ["서울가락 홍로 10kg kg당", "garak-apple-price-lookup"],
      ["서울가락 복숭아 4kg kg당", "garak-peach-price-lookup"],
      ["서울가락 추희자두 5kg kg당", "garak-plum-price-lookup"],
    ],
    internalLinks: [
      ["사과·자두 품종·숙도·포장 선택하기", "/guides/apple-plum-season-pack-size.html"],
      ["가락 경락가와 직거래 가격을 kg당으로 맞추기", "/guides/garak-auction-direct-price-comparison.html"],
    ],
    sources: [
      ["서울시농수산식품공사 가락시장 공식 가격정보", "https://einvoice.garak.co.kr/"],
    ],
    publishedAt: updateDate,
    modifiedAt: updateDate,
  },
  {
    slug: "autumn-produce-box-kg",
    title: "가을 과채 상자: 네트계 8kg·토마토 5kg·하우스감귤 3kg을 kg으로 맞추세요",
    description: "네트계 멜론 8kg, 토마토 5kg, 하우스감귤 3kg, 수박 통, 대추방울 3kg, 생대추 2kg, 송본 단감 10kg 상자 가격을 실중량 kg당으로 바꿔 서울가락 품목 표와 비교하는 방법입니다.",
    lead: "과채 글은 상자·통 가격을 시세처럼 적기 쉽습니다. 8kg·5kg·3kg·통 이름을 그대로 두지 말고 내용 중량으로 나눈 뒤, 품목명·작형이 같은 행만 고릅니다.",
    sections: [
      ["1. 네트계 8kg와 수박 통을 나누기", ["표시 8kg가 멜론 실중량인지 확인합니다.", "참외 행과 8kg 파렛트를 네트계 시세로 쓰지 않습니다.", "수박 한 통은 무게를 재기 전에 kg당과 같다고 보지 않고 꼭지절단 행과 나눕니다."]],
      ["2. 토마토 5kg와 대추방울 3kg를 나누기", ["일반·완숙·찰토마토와 방울토마토는 품목이 다릅니다.", "대추방울 3kg를 완숙 5kg 행과 바로 비교하지 않습니다.", "열과를 뺀 판매 가능 중량으로 다시 나눕니다."]],
      ["3. 하우스감귤 3kg·생대추 2kg·송본 10kg를 각각 맞추기", ["3kg·5kg·6kg와 몇 개입 선물을 한 단가로 묶지 않습니다.", "생대추와 건대추, 송본과 떫은감·곶감 원료를 나눕니다.", "쥬키니 10kg와 애호박, 빨강 파프리카와 피망도 작형·색 행이 다릅니다."]],
      ["4. 직거래 택배가는 선별·완충·배송을 따로 적기", ["가락 kg당은 도매 거래 결과입니다.", "아이스팩·파손 위험이 포함되면 같은 숫자가 될 수 없습니다.", "같은 품목·실중량으로 맞춘 뒤에만 비교합니다."]],
    ],
    comparison: {
      caption: "가을 과채 상자를 kg당으로 맞추는 표",
      headers: ["포장 이름", "먼저 확인할 것", "비교값"],
      rows: [
        ["네트계 멜론 8kg", "품종·상자/파렛트·참외 여부", "상자 가격 ÷ 내용 kg"],
        ["수박 통·12kg 상자", "통 무게·꼭지절단", "통 또는 상자 가격 ÷ 내용 kg"],
        ["토마토 5kg", "일반/완숙/찰·방울 구분", "상자 가격 ÷ 내용 kg"],
        ["하우스감귤 3kg", "작형·개수 구성", "상자 가격 ÷ 내용 kg"],
        ["송본 단감 10kg", "송본/태추·떫은감", "상자 가격 ÷ 내용 kg"],
      ],
    },
    faqs: [
      ["네트계 8kg가 가락 시세보다 비싸면 손해인가요?", "포함된 비용이 다릅니다. kg당으로 맞춘 뒤 선별·포장·배송을 반영한 예상 순수령액으로 비교하세요."],
      ["수박 한 통 가격을 kg당 표와 바로 비교해도 되나요?", "통 무게를 잰 뒤에만 비교하세요. 꼭지절단·소형 수박과 일반 통을 한 숫자로 두지 않습니다."],
    ],
    links: [
      ["서울가락 네트계 멜론 8kg kg당", "garak-melon-price-lookup"],
      ["서울가락 토마토 5kg kg당", "garak-tomato-price-lookup"],
      ["서울가락 하우스감귤 3kg kg당", "garak-citrus-price-lookup"],
      ["서울가락 수박 통·상자 kg당", "garak-watermelon-price-lookup"],
      ["서울가락 대추방울 3kg kg당", "garak-cherry-tomato-price-lookup"],
      ["서울가락 생대추 2kg kg당", "garak-jujube-price-lookup"],
      ["서울가락 송본 단감 10kg kg당", "garak-persimmon-price-lookup"],
    ],
    internalLinks: [
      ["제철 과일 상자를 kg으로 맞추기", "/guides/autumn-fruit-box-kg.html"],
      ["가락 경락가와 직거래 가격을 kg당으로 맞추기", "/guides/garak-auction-direct-price-comparison.html"],
    ],
    sources: [
      ["서울시농수산식품공사 가락시장 공식 가격정보", "https://einvoice.garak.co.kr/"],
    ],
    publishedAt: updateDate,
    modifiedAt: updateDate,
  },
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const head = (title, description, canonical, type = "article") => `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | 농사월드컵</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}"><link rel="alternate" type="application/rss+xml" title="농사월드컵 선택 가이드" href="/rss.xml"><meta property="og:title" content="${esc(title)} | 농사월드컵"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${type}"><meta property="og:url" content="${canonical}"><link rel="stylesheet" href="/style.css?v=3.1.0"><link rel="stylesheet" href="/guide.css?v=1.1.0"></head><body><header><a class="brand" href="/"><span><i data-lucide="trophy"></i></span><strong>농사월드컵</strong><small>품종·산지·농기계 선택 비교</small></a><nav><a href="/">비교 도구</a><a href="/guides.html">선택 가이드</a></nav></header>`;
const foot = `<footer><strong>농사월드컵</strong><p>인기보다 목적과 조건으로 농산물·농기계를 비교합니다.</p><nav><a href="/about.html">소개</a><a href="/privacy.html">개인정보</a><a href="/contact.html">문의</a></nav></footer><script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script><script>if(window.lucide)lucide.createIcons();</script></body></html>`;

await fs.mkdir(path.join(root, "guides"), { recursive: true });
const cards = guides.map((guide) => `<article><p>선택 기준</p><h2><a href="/guides/${guide.slug}.html">${esc(guide.title)}</a></h2><span>${esc(guide.description)}</span><a href="/guides/${guide.slug}.html">기준 자세히 보기 <i data-lucide="arrow-right"></i></a></article>`).join("");
const hubSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "농산물·농기계 선택 가이드", url: `${base}/guides.html`, hasPart: guides.map((guide) => ({ "@type": "Article", name: guide.title, url: `${base}/guides/${guide.slug}.html` })) }).replace(/</g, "\\u003c");
const hub = `${head("농산물·농기계 선택 가이드", "감자·사과·자두·쌀, 중고 트랙터와 탁송 견적, 가락시장 시세를 목적, 규격, 상태와 거래 조건으로 비교하는 선택 가이드입니다.", `${base}/guides.html`, "website")}<script type="application/ld+json">${hubSchema}</script><main class="guide-main"><nav class="guide-breadcrumb"><a href="/">홈</a><span>›</span><span>선택 가이드</span></nav><section class="guide-hero"><p>조건부터 맞추는 비교 기준</p><h1>농산물·농기계<br><em>선택 가이드</em></h1><span>인기순이나 광고 문구보다 용도·규격·상태·인도 조건으로 비교하세요.</span></section><section class="guide-grid">${cards}</section></main>${foot}`;
await fs.writeFile(path.join(root, "guides.html"), hub, "utf8");

for (const guide of guides) {
  const canonical = `${base}/guides/${guide.slug}.html`;
  const publishedAt = guide.publishedAt ?? originalDate;
  const modifiedAt = guide.modifiedAt ?? publishedAt;
  const sectionHtml = guide.sections.map(([heading, items]) => `<section><h2>${esc(heading)}</h2><ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>`).join("");
  const linksHtml = guide.links.map(([text, slug]) => `<a href="https://boribay.com/guides/${slug}?utm_source=occultworldcup.com&amp;utm_medium=owned_referral&amp;utm_campaign=farm_selection_guides&amp;utm_content=${guide.slug}">${esc(text)} <i data-lucide="arrow-right"></i></a>`).join("");
  const internalLinksHtml = guide.internalLinks?.length
    ? `<section class="guide-related"><h2>농사월드컵에서 이어서 비교하기</h2>${guide.internalLinks.map(([text, href]) => `<a href="${esc(href)}">${esc(text)} <i data-lucide="arrow-right"></i></a>`).join("")}</section>`
    : "";
  const comparisonHtml = guide.comparison
    ? `<section class="guide-comparison"><h2>${esc(guide.comparison.caption)}</h2><div class="guide-table-wrap"><table><thead><tr>${guide.comparison.headers.map((header) => `<th scope="col">${esc(header)}</th>`).join("")}</tr></thead><tbody>${guide.comparison.rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`
    : "";
  const faqHtml = guide.faqs?.length
    ? `<section class="guide-faq"><h2>자주 묻는 질문</h2>${guide.faqs.map(([question, answer]) => `<details><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join("")}</section>`
    : "";
  const sourcesHtml = guide.sources?.length
    ? `<p>공식 자료: ${guide.sources.map(([text, url]) => `<a href="${esc(url)}" rel="noopener">${esc(text)}</a>`).join(", ")}</p>`
    : "";
  const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: publishedAt, dateModified: modifiedAt, inLanguage: "ko-KR", mainEntityOfPage: canonical, author: { "@type": "Organization", name: "농사월드컵 편집팀" }, publisher: { "@type": "Organization", name: "농사월드컵", url: base } }).replace(/</g, "\\u003c");
  const html = `${head(guide.title, guide.description, canonical)}<script type="application/ld+json">${schema}</script><main class="guide-main"><nav class="guide-breadcrumb"><a href="/">홈</a><span>›</span><a href="/guides.html">선택 가이드</a></nav><article class="guide-article"><header><p>선택 가이드 · ${modifiedAt}</p><h1>${esc(guide.title)}</h1><span>${esc(guide.description)}</span></header><div class="guide-layout"><div><aside class="guide-lead"><strong>먼저 정할 것</strong><p>${esc(guide.lead)}</p></aside>${sectionHtml}${comparisonHtml}${faqHtml}${internalLinksHtml}<section class="guide-source"><h2>확인 원칙</h2><p>실제 구매·계약 전에는 상품 표시, 실물, 판매자 설명과 최신 공식 기준을 다시 확인하세요.</p>${sourcesHtml}</section></div><aside class="guide-next"><h2>조건을 정했다면</h2><p>같은 조건으로 시세와 거래 기준을 비교하세요.</p>${linksHtml}</aside></div></article></main>${foot}`;
  await fs.writeFile(path.join(root, "guides", `${guide.slug}.html`), html, "utf8");
}

const css = `.guide-main{max-width:1000px}.guide-breadcrumb{padding-top:26px;display:flex;gap:8px;color:#77807a;font-size:13px}.guide-hero{padding:60px 0 42px}.guide-hero>p,.guide-grid article>p,.guide-article>header>p{color:var(--green2);font-size:13px;font-weight:900}.guide-hero h1{font-size:48px;line-height:1.22;letter-spacing:-2px;margin:7px 0}.guide-hero h1 em{font-style:normal;color:var(--green)}.guide-hero>span,.guide-grid article>span,.guide-article>header>span{color:var(--text)}.guide-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;padding-bottom:70px}.guide-grid article{border:1px solid var(--line);border-radius:12px;padding:22px}.guide-grid h2{font-size:20px;line-height:1.45;margin:7px 0;word-break:keep-all}.guide-grid article>a,.guide-related a{display:flex;align-items:center;gap:7px;margin-top:14px;color:var(--green2);font-weight:800;font-size:13px}.guide-grid svg,.guide-related svg{width:16px}.guide-article>header{display:block;height:auto;padding:38px 0;border-bottom:1px solid var(--line)}.guide-article h1{font-size:40px;line-height:1.3;margin:7px 0;word-break:keep-all}.guide-layout{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:34px;padding:34px 0 70px}.guide-layout>div>section{padding:8px 0 24px;border-bottom:1px solid var(--line)}.guide-layout h2{font-size:21px;word-break:keep-all}.guide-layout li{color:var(--text);margin:9px 0}.guide-lead{background:var(--pale);border-left:4px solid var(--yellow);padding:18px;margin-bottom:18px}.guide-lead p{margin-bottom:0;color:var(--text)}.guide-source a,.guide-related a{color:var(--green2);font-weight:800;text-decoration:underline;text-underline-offset:3px}.guide-table-wrap{overflow-x:auto}.guide-comparison table{width:100%;border-collapse:collapse;font-size:14px}.guide-comparison th,.guide-comparison td{border:1px solid var(--line);padding:11px;text-align:left;vertical-align:top}.guide-comparison thead th,.guide-comparison tbody th{background:var(--pale);font-weight:800}.guide-faq details{border:1px solid var(--line);border-radius:8px;padding:13px 15px;margin:9px 0}.guide-faq summary{cursor:pointer;font-weight:800}.guide-faq details p{margin:10px 0 0;color:var(--text)}.guide-next{align-self:start;position:sticky;top:96px;background:var(--pale);padding:20px;border-radius:10px}.guide-next p{font-size:13px;color:var(--text)}.guide-next a{display:flex;align-items:center;justify-content:space-between;gap:8px;background:#fff;border:1px solid var(--line);border-radius:7px;padding:11px;margin-top:8px;color:var(--green2);font-size:13px;font-weight:800}.guide-next svg{width:15px;min-width:15px}@media(max-width:760px){.guide-grid,.guide-layout{grid-template-columns:1fr}.guide-hero h1,.guide-article h1{font-size:35px}.guide-article>header{padding:26px 0}.guide-next{position:static}.guide-comparison table{min-width:620px}}`;
await fs.writeFile(path.join(root, "guide.css"), css, "utf8");

const toRssDate = (date) => new Date(`${date}T00:00:00+09:00`).toUTCString();
const rssItems = guides.map((guide) => `<item><title>${esc(guide.title)}</title><link>${base}/guides/${guide.slug}.html</link><guid isPermaLink="true">${base}/guides/${guide.slug}.html</guid><description>${esc(guide.description)}</description><pubDate>${toRssDate(guide.publishedAt ?? originalDate)}</pubDate></item>`).join("");
const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>농사월드컵 선택 가이드</title><link>${base}/guides.html</link><description>품종·산지·농기계를 목적과 조건으로 비교하는 선택 가이드</description><language>ko-KR</language><lastBuildDate>${toRssDate(updateDate)}</lastBuildDate>${rssItems}</channel></rss>`;
await fs.writeFile(path.join(root, "rss.xml"), rss, "utf8");

let index = await fs.readFile(path.join(root, "index.html"), "utf8");
if (!index.includes('href="/guides.html"')) index = index.replace('<a href="#how">선택 원리</a>', '<a href="#how">선택 원리</a><a href="/guides.html">선택 가이드</a>');
if (!index.includes('type="application/rss+xml"')) index = index.replace('</head>', '<link rel="alternate" type="application/rss+xml" title="농사월드컵 선택 가이드" href="/rss.xml"></head>');
await fs.writeFile(path.join(root, "index.html"), index, "utf8");

const staticPages = [
  ["/", originalDate, "weekly", "1.0"],
  ["/about.html", originalDate, "yearly", "0.3"],
  ["/privacy.html", originalDate, "yearly", "0.3"],
  ["/terms.html", originalDate, "yearly", "0.3"],
  ["/contact.html", originalDate, "yearly", "0.3"],
  ["/guides.html", updateDate, "monthly", "0.8"],
];
const sitemapEntries = [
  ...staticPages.map(([pathName, lastmod, changefreq, priority]) => `  <url><loc>${base}${pathName}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`),
  ...guides.map((guide) => `  <url><loc>${base}/guides/${guide.slug}.html</loc><lastmod>${guide.modifiedAt ?? guide.publishedAt ?? originalDate}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</urlset>\n`;
await fs.writeFile(path.join(root, "sitemap.xml"), sitemap, "utf8");
console.log(`generated ${guides.length} selection guides`);
