/* index json data setting */
const params = new URLSearchParams(location.search);
const id = params.get("id");
const type = params.get("type");

// console.log("넘어온 id:", id);
// console.log("넘어온 type:", type);

// json type mapping
const typeMap = {
  과일: "fruits",
  채소: "vegetables",
  가공식품: "processed_etc",
};

// subtitle mapping
const subTitleMap = {
  과일: "달콤하고 맛있는 제철과일을 만나보세요",
  채소: "신선하고 맛있는 상품을 만나보세요",
  가공식품: "좋은 재료로 만들어진 상품을 만나보세요",
};

// product ex mapping
const productExMap = {
  과일: [
    {
      title: "크기와 모양을 기준으로 선별하지 않아요.",
      desc: "모양이 다르고 크기가 들쭉날쭉해도 과일 본연의 맛과 영양은 그대로예요. 자연의 다양성을 담아낸 과일들은 오히려 그 자체로 더 특별하고 정직해요. 보기 좋은 과일만을 고르기보다, 자연의 모습 그대로를 인정하고 받아들이는 것이 더 건강하고 지속가능한 소비로 이어져요.",
    },
    {
      title: "선별되지 않아도 충분히 맛있어요.",
      desc: "조금 울퉁불퉁하거나 생김새가 특이하다고 해서 맛까지 떨어지는 건 아니에요. 오히려 속은 더 달콤하고 영양도 풍부할 수 있어요. 상품성이라는 기준 때문에 버려지는 과일들, 맛은 그대로인데 사라지기엔 너무 아까운 존재들이에요. 우리는 그 과일들을 소중히 여기고 담아내고 있어요.",
    },
    {
      title: "자연이 만든 색, 맛, 모양을 그대로.",
      desc: "자연에서 자란 과일은 하나하나 다른 모양과 색을 가지고 있어요. 너무 예쁘고 완벽한 외형만을 기준으로 삼는 건 자연을 온전히 받아들이지 못하는 일이에요. 자연이 주는 다양한 모습에는 그만의 이유와 개성이 있어요. 이 다름을 받아들이는 것이 진짜 자연을 이해하는 방법이에요.",
    },
    {
      title: "보기보다 중요한 건 맛과 영양!",
      desc: "껍질에 흠이 있거나 크기가 작다고 해서 영양이 떨어지는 건 아니에요. 실제로는 당도가 더 높거나, 농약 없이 건강하게 자라 더 안전한 경우도 많답니다. 겉모습이 중요한 기준이 되지 않도록, 속까지 들여다보는 소비를 함께 만들어가고 있어요. 진짜 맛은 안에 숨어 있어요.",
    },
  ],
  채소: [
    {
      title: "흠집과 상처도 신선함의 일부예요.",
      desc: "햇볕과 바람을 그대로 맞으며 자란 채소는 상처 하나 없이 자라기 어렵죠. 자연 속에서 자라난 만큼 겉에 흠이 있을 수 있어요. 하지만 그건 신선함과 건강하게 자랐다는 증거예요. 오히려 보기 좋은 채소보다 더 믿을 수 있는 채소들이에요. 자연 그대로의 채소를 받아들이는 시선이 필요해요.",
    },
    {
      title: "균일하지 않아도 품질은 최고!",
      desc: "잎이 찢어졌거나 줄기가 굽었다고 해서 채소의 신선함이 떨어지진 않아요. 오히려 땅의 기운을 듬뿍 머금은 건강한 채소일 수 있어요. 우리가 흔히 알고 있는 ‘정상’의 기준은 정말 정답일까요? 다양하고 자연스러운 모양의 채소들도 품질엔 전혀 문제가 없어요. 편견을 버려보세요.",
    },
    {
      title: "모양은 달라도 요리에 딱!",
      desc: "모양이 일정하지 않다고 걱정할 필요 없어요. 요리에 들어가면 모양은 사라지고 맛만 남죠. 색도 모양도 들쭉날쭉해도 요리할 땐 오히려 더 다채로운 느낌을 줄 수 있어요. 중요한 건 얼마나 신선하냐는 거예요. 껍질 속에 담긴 진짜 맛은 어디서든 요리를 빛나게 해줘요.",
    },
    {
      title: "건강한 땅에서 자란 그대로.",
      desc: "화학비료나 농약에 의존하지 않고 자란 채소는 모양이 일정하지 않아요. 하지만 그만큼 자연의 흐름 속에서 건강하게 자랐다는 뜻이에요. 겉보기엔 조금 못생겨 보일 수 있어도 속은 더 안전하고 영양도 살아있어요. 건강한 토양에서 자란 채소는 그 자체로 믿을 수 있는 증거예요.",
    },
  ],
  가공식품: [
    {
      title: "포장이 살짝 다를 뿐, 맛은 그대로.",
      desc: "가끔 포장에 긁힘이나 찌그러짐이 있을 수 있어요. 하지만 내용물은 전혀 손상되지 않았고, 맛과 품질도 동일해요. 단지 겉모습이 기준에 맞지 않아 판매되지 못한 제품일 뿐이에요. 이런 제품을 선택함으로써 우리는 낭비를 줄이고, 여전히 훌륭한 음식을 합리적으로 소비할 수 있어요.",
    },
    {
      title: "유통기한 임박? 그만큼 알뜰하게.",
      desc: "유통기한이 가까워졌다는 이유만으로 버려지는 식품이 많아요. 사실상 대부분의 경우 보관 상태만 잘 유지됐다면 품질은 그대로예요. 이런 제품을 알뜰하게 소비하면 음식 낭비를 줄일 수 있고, 지갑도 환경도 함께 지킬 수 있어요. 합리적인 선택이 더 나은 소비 문화를 만들어요.",
    },
    {
      title: "맛과 품질, 알뜰하게 챙겨요.",
      desc: "계획보다 많이 생산된 가공식품들은 소비되지 못하고 버려지곤 해요. 하지만 그런 제품들 대부분은 품질에도, 위생에도 아무런 문제가 없어요. 우리는 이런 음식들을 합리적인 가격으로 제공하면서 낭비 없이 맛있는 식탁을 만들 수 있다고 믿어요. 알뜰한 소비가 지혜로운 선택이에요.",
    },
    {
      title: "지구도 지키고, 알뜰 소비도!",
      desc: "식품 하나를 생산하기 위해 많은 자원이 쓰여요. 포장이나 유통 기준에서 벗어났다는 이유로 버려지는 건 큰 낭비예요. 작게는 내 지갑을 위해, 크게는 지구를 위해 조금 더 합리적인 소비가 필요해요. 맛있는 한 끼를 챙기면서 환경까지 생각하는 이 선택, 꽤 멋지지 않나요?",
    },
  ],
};

fetch("../food_dataset.json")
  .then((r) => r.json())
  .then((d) => {
    console.log("json 안의 타입 키들:", Object.keys(d));

    // review (random)
    const randomRating = (Math.random() * 2 + 3).toFixed(1); // 별점 최소 3.0 ~ 최대 5.0
    const randomRew = Math.floor(Math.random() * (100 - 10 + 1)) + 10; //10 ~ 100건

    const mappedType = typeMap[type];
    if (!mappedType || !d[mappedType]) {
      console.error(`${type}은 유효하지 않은 type입니다.`);
      return;
    }

    const items = d[mappedType];
    const item = items.find((i) => String(i.id) === id);

    if (!item) {
      console.error(`id "${id}"에 해당하는 상품을 찾을 수 없습니다.`);
      return;
    }

    // data binding
    const imgTag = document.querySelector(".info_img img");
    imgTag.src = item.imgURL;
    imgTag.alt = item.title;

    // title
    document.querySelector(".info_title h1").innerText = item.title;
    // subtitle
    document.querySelector(".info_title p").innerText = subTitleMap[type] || "";

    // discount_rate + "%"
    document.querySelector(".price_one").innerHTML = `
  ${item.discount_rate}<span class="price_sub">%</span>
`;

    // discount_price + "원"
    document.querySelector(".price_two").innerHTML = `
  ${item.discount_price.toLocaleString()}<span class="price_sub">원</span>
`;

    // price + "원"
    document.querySelector(".price_three").innerHTML = `
  <del>원가 ${item.price.toLocaleString()}원</del>
`;

    // review data binding
    // review + text_few
    const textFew = document.querySelector(".text_few");
    if (textFew) {
      textFew.innerText = randomRew;
    }
    // review count / 5
    const ratingOne = document.querySelector(".rating_one");
    if (ratingOne) {
      ratingOne.innerText = randomRating;
    }
    // review + xx건
    const reviewMoreBtn = document.querySelector(".review_more");
    if (reviewMoreBtn) {
      reviewMoreBtn.innerText = `${randomRew}건 리뷰 더보기 ▼`;
    }

    // review random data
    document.querySelector(".review_rating").innerText = randomRating;
    document.querySelector(".review_few").innerText = `${randomRew}건`;

    // product img
    const productImg = document.querySelector(".product_title_img");
    productImg.src = item.imgURL;
    productImg.alt = item.title;

    // product sub img
    const subImg = document.querySelectorAll(".product_sub_img");
    subImg.forEach((img, idx) => {
      img.src = item.imgURL;
      img.alt = `${item.title} ${idx + 1}`;
    });

    // product ex text
    const classification = item.classification;
    const exContent = document.querySelector(".ex_content");

    if (productExMap[classification]) {
      exContent.innerHTML = "";

      productExMap[classification].forEach((ex, num) => {
        const block = document.createElement("div");
        block.classList.add("thumb_one");

        block.innerHTML = `
              <div class="thumb_one">
                <div class="ex_content">
                  <p>${num + 1}</p>
                  <h4 class="product_ex_title">${ex.title}</h4>
                  <span class="product_ex_desc">${ex.desc}</span>
                </div>
                <img class="product_sub_img" src="${item.imgURL}" alt="thumb" />
              </div>
        `;

        exContent.appendChild(block);
      });
    }
  })
  .catch((e) => {
    console.error("마지막에 오류 났다 :", e);
  });

/* Review More Event start */
const reviewMoreBtn = document.querySelector(".review_more");
const hideBtn = document.querySelectorAll(".hide_members");
const cartBtn = document.querySelector(".info_purchase");

/* cartBtn count event start */
cartBtn.addEventListener("click", () => {
  const currentUserId = localStorage.getItem("ndUsers");

  // 로그인 안되있는 사용자에게 띄워주는 메세지
  if (!currentUserId) {
    alert("해당 상품을 담고 싶으세요? 로그인 후에 이용해주세요!😊");
    location.href = "../login/login.html";
    return;
  }

  const cartKey = `cart_${currentUserId}`;
  const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

  // 누적값 쌓이게 하기 위해 만든 데이터
  const productInfo = {
    id: "test 2kg",
    title: "test Title",
    quantity: 1,
  };

  const exItem = cartData.find((it) => it.id === productInfo.id);

  if (exItem) {
    exItem.quantity += 1;
  } else {
    cartData.push(productInfo);
  }

  localStorage.setItem(cartKey, JSON.stringify(cartData));

  cartCount();
});
/* cartBtn click event end */

/* cartBtn count start */
const cartCount = () => {
  const currentUserId = localStorage.getItem("ndUsers");
  const cartKey = `cart_${currentUserId}`;
  const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

  const cartTotalCount = cartData.reduce((cur, it) => cur + it.quantity, 0);

  const cartCountTag = document.querySelector(".fa-cart-shopping p");
  if (cartCountTag) {
    cartCountTag.innerText = cartTotalCount;
  }
};

cartCount();
/* cartBtn count end */

let reviewShow = false;

reviewMoreBtn.addEventListener("click", () => {
  hideBtn.forEach((member) => {
    if (reviewShow) {
      const currentHeight = member.scrollHeight;

      // close event
      member.style.height = currentHeight + "px";
      member.style.opacity = "1";
      member.style.transform = "translateY(0)";
      member.style.pointerEvents = "auto";

      // 강제 reflow
      void member.offsetHeight;

      member.style.height = "0px";
      member.style.opacity = "0";
      member.style.transform = "translateY(-10px)";
      member.style.pointerEvents = "none";
    } else {
      const scrollHeight = member.scrollHeight;

      // open
      member.style.height = "0px";
      member.style.opacity = "0";
      member.style.transform = "translateY(-10px)";
      member.style.pointerEvents = "none";

      void member.offsetHeight;

      // open event
      member.style.height = scrollHeight + "px";
      member.style.opacity = "1";
      member.style.transform = "translateY(0)";
      member.style.pointerEvents = "auto";

      // transition handler event
      const handler = () => {
        member.style.height = "auto";
        // event 제거
        member.removeEventListener("transitionend", handler);
      };
      // event 생성
      member.addEventListener("transitionend", handler);
    }
  });
  reviewShow = !reviewShow;
  const reviewCountReview = document
    .querySelector(".review_few")
    .innerText.replace("건", "");
  reviewMoreBtn.innerText = reviewShow
    ? "리뷰 접기 ▲"
    : `${reviewCountReview}건 리뷰 더보기 ▼`;
});
/* Review More Event end */

/* Modal start */
const contactUs = document.querySelector(".contact_us");
const modal = document.querySelector(".modal_container");
const closeBtn = document.querySelector(".modal_close_btn");
const body = document.body;
const faqTable = document.querySelector(".faq_table");

// modal open
contactUs.addEventListener("click", () => {
  const currentUserId = localStorage.getItem("ndUsers");
  const users = JSON.parse(localStorage.getItem("Users"));

  if (
    !currentUserId ||
    !users ||
    !users.find((user) => user.id === currentUserId)
  ) {
    alert("문의하기는 로그인을 하셔야 사용 가능합니다!😊");
    window.location.href = "../login/login.html";
    return;
  }

  modal.style.display = "flex";
  document.body.classList.add("modal-open");

  const matchUser = users.find((user) => user.id === currentUserId);
  if (matchUser) {
    const userName = modal.querySelector(".modal_user_info p");
    userName.innerText = `이름: ${matchUser.name}`;
  }

  const todayDate = modal.querySelector(".modal_user_info span");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  todayDate.innerText = `${year}.${month}.${date}`;
});

// modal close
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

/* faqButton end */

// username hide
const hideName = (name) => {
  if (!name) return "";
  const nameLength = name.length;
  return nameLength === 2
    ? name[0] + "*"
    : name[0] + "*" + name[nameLength - 1];
};

// mockup data
const mock = [
  {
    title: "배송 관련 문의",
    name: "한민준",
    date: "2025.04.02",
    status: "답변완료",
  },
  {
    title: "상품 관련 문의",
    name: "강동현",
    date: "2025.03.22",
    status: "답변완료",
  },
  {
    title: "상품 관련 문의",
    name: "이정찬",
    date: "2025.02.17",
    status: "답변완료",
  },
  {
    title: "환불 관련 문의",
    name: "박지민",
    date: "2025.02.02",
    status: "답변완료",
  },
  {
    title: "환불 관련 문의",
    name: "최유나",
    date: "2025.01.31",
    status: "답변완료",
  },
];

// mock data rendering
const readMock = () => {
  mock.forEach((it) => {
    const maskedName = hideName(it.name);
    const row = document.createElement("tr");
    row.classList.add("faq_row");
    row.innerHTML = `
      <td class="left">${it.title} <i class="fas fa-lock"></i></td>
      <td class="right faq_name">${maskedName}</td>
      <td class="right faq_date">${it.date}</td>
      <td class="right ">${it.status}</td>
    `;
    faqTable.appendChild(row);
  });
};

// modal data create
const modalCreateBtn = document.querySelector(".modal_submit");

modalCreateBtn.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modal_input input").value.trim();
  const userName = document
    .querySelector(".modal_user_info p")
    .innerText.replace("이름: ", "");

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  const formatDate = `${year}.${month}.${date}`;

  // 문의하기 폼 제목입력 유효성 검사
  if (modalTitle === "") {
    alert("제목을 입력해주세요.");
    return;
  }

  // 사용자가 등록한 문의 요소 만들기
  const maskName = hideName(userName);
  const recent = document.createElement("tr");
  recent.classList.add("faq_row");
  recent.innerHTML = `
    <td class="left">${modalTitle} <i class="fas fa-lock"></i></td>
    <td class="right faq_name">${maskName}</td>
    <td class="right faq_date">${formatDate}</td>
    <td class="right faq_status">답변대기</td>
  `;

  faqTable.insertBefore(recent, faqTable.querySelector(".faq_row"));

  document.querySelector(".modal_input input").value = "";
  document.querySelector(".modal_input textarea").value = "";
  modal.style.display = "none";
  document.body.classList.remove("modal-open");

  setPagenations();
});

/* Page nation start */
const faqPage = 5;
const numContain = document.querySelector(".faq_number");

const activePage = (page) => {
  const faqRows = document.querySelectorAll(".faq_table .faq_row");
  faqRows.forEach((faqRow, i) => {
    faqRow.style.display = "none";
    if (i >= (page - 1) * faqPage && i < page * faqPage) {
      faqRow.style.display = "table-row";
    }
  });

  const numBtns = numContain.querySelectorAll("div");
  numBtns.forEach((btn, idx) => {
    btn.classList.toggle("active", idx + 1 === page);
  });
};

const setPagenations = (page = 1) => {
  const faqRows = document.querySelectorAll(".faq_table .faq_row");
  const totalPages = Math.ceil(faqRows.length / faqPage);
  numContain.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pagesBtn = document.createElement("div");
    pagesBtn.innerText = i;
    pagesBtn.addEventListener("click", () => activePage(i));
    numContain.appendChild(pagesBtn);
  }
  activePage(page);
};
readMock();
setPagenations();
