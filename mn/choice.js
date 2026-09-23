const form = document.querySelector('[data-choice-form]');
const result = document.querySelector('[data-choice-result]');

function showResult(title, details) {
  const heading = document.createElement('h3');
  heading.textContent = title;
  const list = document.createElement('ul');
  for (const detail of details) {
    const item = document.createElement('li');
    item.textContent = detail;
    list.append(item);
  }
  result.replaceChildren(heading, list);
  result.hidden = false;
  result.focus();
}

if (form && result) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = new FormData(form);
    if (form.dataset.choiceForm === 'tractor') {
      const area = values.get('area');
      const setting = values.get('setting');
      const job = values.get('job');
      const baseline = [
        'Авах техник бүрийн загвар, холбох агрегатын шаардлага, засвар үйлчилгээний боломжийг тусад нь тулгаарай.',
        'Энэ нь худалдан авах зөвлөмж бус, эхний харьцуулалтын шалгах хуудас юм.'
      ];
      if (area === 'small' && setting === 'greenhouse' && job === 'light') {
        showResult('Явган тракторыг эхэлж харьцуулж болно', [
          '1 га хүртэлх талбай болон хүлэмжийн ажилд зориулсан явган тракторыг яамны техникийн баримт бичиг дурдсан.',
          'Хэрэглэх ажлын эрхтэн яг тухайн загварт угсрагдах эсэхийг шалгаарай.',
          ...baseline
        ]);
      } else {
        showResult('Дугуйт тракторын хувилбарыг мөн харьцуулна уу', [
          'Талбай, ажлын төрөл эсвэл орчин өөрчлөгдвөл явган трактор дангаараа тохирох эсэх нь тодорхойгүй.',
          'Агрегатын шаардлагатай чадал, холболт, ажлын өргөн ба талбайн нэвтрэх нөхцөлийг бичиж харьцуулаарай.',
          ...baseline
        ]);
      }
      return;
    }

    if (form.dataset.choiceForm === 'potato') {
      const spacing = Number(values.get('spacing'));
      const workflow = values.get('workflow');
      const workers = values.get('workers');
      if (!Number.isFinite(spacing) || spacing < 30 || spacing > 150) {
        showResult('Мөрийн зайг дахин хэмжинэ үү', ['30–150 см-ийн хооронд бодит хэмжилтээ оруулна уу.']);
      } else if (spacing < 70 || spacing > 90) {
        showResult('Эхлээд мөрийн зай, машин хоёрын тохирлыг шалгаарай', [
          'Эх сурвалжийн төмс ухагч ба комбайны жишээ үзүүлэлт 70–90 см мөрийн зайд хамаарна.',
          'Таны оруулсан зай энэ хүрээнээс өөр тул бодит машины техникийн паспорт ба туршилтаар нийцлийг баталгаажуулна уу.'
        ]);
      } else if (workflow === 'pickup' && workers === 'available') {
        showResult('Төмс ухагчийг эхэлж харьцуулж болно', [
          'Ухсаны дараах түүх, ангилалт, ачих ажлыг хэн хийхийг тооцоорой.',
          '1–2 мөрийн ухагчийн бодит ажлын өргөн ба трактортой холболтыг шалгаарай.',
          'Комбайныг ч нийт хөдөлмөр, тээвэр, түрээсийн нөхцөлөөр харьцуулаарай.'
        ]);
      } else {
        showResult('Ялгах ба ачих ажиллагаатай комбайныг ч харьцуулна уу', [
          'Яамны баримт бичигт ялгах ширээ, бункер, тээврийн хэрэгсэлд ачих боломжтой 1–2 мөрийн хувилбар дурдсан.',
          'Бодит бункерийн багтаамж, мөрийн зай, хөрсний нөхцөл, тээврийн машинтай нийцлийг шалгаарай.',
          'Хүн хүч ба түрээсийн зардлыг тооцож ухагчтай нийт ажлын өртгөөр харьцуулаарай.'
        ]);
      }
    }
  });
}
