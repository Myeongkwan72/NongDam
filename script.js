// main banner 슬라이드
// $(document).ready(function () {
//   $(".main_banner").slick({
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplayspeed: 6000,
//     arrows: false,
//     pauseOnFoucus: true,
//     pauseOnHover: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 767,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 550,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   });
// });

const swiper = new Swiper(".swiper", {
  loop: true,
  loopAdditionalSlides: 1,
  autoplay: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1024: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 1,
    },
  },
});

// recipe 슬라이드
$(document).ready(function () {
  $(".main_recipe").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplayspeed: 3000,
    pauseOnFoucus: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// json
fetch("./food_dataset.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("데이터를 불러오지 못했습니다.");
    }
    return response.json();
  })
  .then((data) => {
    const fruits = data.fruits.map((item) => {
      return {
        id: item.id,
        title: item.title,
        classification: item.classification,
        price: item.price,
        discount_price: item.discount_price,
        discount_rate: item.discount_rate,
        imgURL: item.imgURL,
      };
    });
    const vegetables = data.vegetables.map((item) => {
      return {
        id: item.id,
        title: item.title,
        classification: item.classification,
        price: item.price,
        discount_price: item.discount_price,
        discount_rate: item.discount_rate,
        imgURL: item.imgURL,
      };
    });
    const etcs = data.processed_etc.map((item) => {
      return {
        id: item.id,
        title: item.title,
        classification: item.classification,
        price: item.price,
        discount_price: item.discount_price,
        discount_rate: item.discount_rate,
        imgURL: item.imgURL,
      };
    });

    // 랜덤하게 8개 추출하는 함수
    const getRandomItems = (array, count) => {
      const shuffled = [...array].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    };

    // 3개 배열 합치기
    const allItems = [...fruits, ...vegetables, ...etcs];
    // 랜덤으로 8개 추출
    const random = getRandomItems(allItems, 8);
    const random1 = getRandomItems(allItems, 8);
    const random2 = getRandomItems(allItems, 8);

    const content1 = document.querySelector(
      "#main_con1 > .main_inner >.main_it"
    );
    const content2 = document.querySelector(
      "#main_con2 > .main_inner > .main_it"
    );
    const content4 = document.querySelector(
      "#main_con4 > .main_inner >.main_it"
    );
    // main_con1에 나열
    random.forEach((item) => {
      const section1 = document.createElement("li");
      if (item.discount_rate < 20) {
        section1.className = "main_type1";
        section1.innerHTML = `
              <div class="img">
                <img src="${item.imgURL}" alt="${
          item.title
        }" class="img_link" />
              </div>
              <div class="main_info">
                <h3 class="main_title">${item.title}</h3>
                <div class="main_shopping">
                  <p>${item.price.toLocaleString()}원</p>
                  <div class="icon">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
              </div>
        `;
      } else {
        section1.className = "main_type2";
        section1.innerHTML = ` 
              <div class="img">
                <img src="${item.imgURL}" alt="item1" class="img_link" />
                <button>${item.discount_rate}% 할인</button>
              </div>
              <div class="main_info">
                <h3>${item.title}</h3>
                <div class="main_tag">
                  <div class="main_sale">
                    <div class="main_percent">
                      <p>
                        <b>${item.discount_rate}</b>
                        %
                      </p>
                    </div>
                    <div class="main_price">
                      <span>${item.price.toLocaleString()}원</span>
                      <p>${item.discount_price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div class="icon">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
              </div>
        `;
      }
      const linkImg = section1.querySelector(".img_link");
      linkImg.addEventListener("click", () => {
        window.location.href = `./detail/detail.html?id=${item.id}&type=${item.classification}`;
      });
      /* Icon button start */
      const cartIconBtn = section1.querySelector(".fa-cart-shopping");
      const heartIconBtn = section1.querySelector(".fa-heart");
      const currentUserId = localStorage.getItem("ndUsers");

      // heart Icon
      heartIconBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        // 로그인 유효성 검사
        if (!currentUserId) {
          alert("찜 하기 버튼은 로그인 후에 이용가능합니다!😉");
          location.href = "../login/login.html";
          return;
        }

        // regular: 빈하트 / solid: 채워진 하트
        heartIconBtn.classList.toggle("fa-regular");
        heartIconBtn.classList.toggle("fa-solid");

        if (heartIconBtn.classList.contains("fa-solid")) {
          heartIconBtn.style.color = "#f37100";
          heartIconBtn.style.border = "1px solid #f37100";
        } else {
          heartIconBtn.style.color = "";
          heartIconBtn.style.border = "";
        }
      });

      // cart Icon
      cartIconBtn.addEventListener("click", (e) => {
        // preventDefault() : 브라우저 고유 행동 막는 함수
        // stopPropagation() : 부모 엘리먼트로의 이벤트 전달 막는 함수
        e.stopPropagation();

        // 로그인 사용자인지 유효성 검사

        if (!currentUserId) {
          alert("해당 상품을 담고 싶으시다면 로그인 후에 이용해주세요!😊");
          location.href = "../login/login.html";
          return;
        }

        const cartKey = `cart_${currentUserId}`;
        const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

        const productInfo = {
          id: item.id,
          title: item.title,
          quantity: 1,
        };

        // 이미 있는 상품 값인지 확인하고 스토리지에 누적값 추가하고, 장바구니 num 증가
        const exItem = cartData.find((it) => it.id === productInfo.id);
        exItem ? (exItem.quantity += 1) : cartData.push(productInfo);

        // 로컬스토리지에 값 저장
        localStorage.setItem(cartKey, JSON.stringify(cartData));
        // console.log(localStorage.getItem(cartKey), "스토리지 들어왔나?");

        cartCount();
        alert(`${item.title} 상품을 담았습니다.`);
      });
      /* cart Icon button end */

      content1.appendChild(section1);
    });

    // main_con2에 나열
    random1.forEach((item) => {
      const section2 = document.createElement("li");
      if (item.discount_rate < 20) {
        section2.className = "main_type1";
        section2.innerHTML = `
              <div class="img">
                <img src="${item.imgURL}" alt="${
          item.title
        }" class="img_link" />
              </div>
              <div class="main_info">
                <h3 class="main_title">${item.title}</h3>
                <div class="main_shopping">
                  <p>${item.price.toLocaleString()}원</p>
                  <div class="icon">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
              </div>
        `;
      } else {
        section2.className = "main_type2";
        section2.innerHTML = ` 
              <div class="img">
                <img src="${item.imgURL}" alt="item1" class="img_link" />
                <button>${item.discount_rate}% 할인</button>
              </div>
              <div class="main_info">
                <h3>${item.title}</h3>
                <div class="main_tag">
                  <div class="main_sale">
                    <div class="main_percent">
                      <p>
                        <b>${item.discount_rate}</b>
                        %
                      </p>
                    </div>
                    <div class="main_price">
                      <span>${item.price.toLocaleString()}원</span>
                      <p>${item.discount_price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div class="icon">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
              </div>
        `;
      }
      const linkImg = section2.querySelector(".img_link");
      linkImg.addEventListener("click", () => {
        window.location.href = `./detail/detail.html?id=${item.id}&type=${item.classification}`;
      });

      /* Icon button start */
      const cartIconBtn = section2.querySelector(".fa-cart-shopping");
      const heartIconBtn = section2.querySelector(".fa-heart");
      const currentUserId = localStorage.getItem("ndUsers");

      // heart Icon
      heartIconBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        // 로그인 유효성 검사
        if (!currentUserId) {
          alert("찜 하기 버튼은 로그인 후에 이용가능합니다!😉");
          location.href = "../login/login.html";
          return;
        }

        // regular: 빈하트 / solid: 채워진 하트
        heartIconBtn.classList.toggle("fa-regular");
        heartIconBtn.classList.toggle("fa-solid");

        if (heartIconBtn.classList.contains("fa-solid")) {
          heartIconBtn.style.color = "#f37100";
          heartIconBtn.style.border = "1px solid #f37100";
        } else {
          heartIconBtn.style.color = "";
          heartIconBtn.style.border = "";
        }
      });

      // cart Icon
      cartIconBtn.addEventListener("click", (e) => {
        // preventDefault() : 브라우저 고유 행동 막는 함수
        // stopPropagation() : 부모 엘리먼트로의 이벤트 전달 막는 함수
        e.stopPropagation();

        // 로그인 사용자인지 유효성 검사
        const currentUserId = localStorage.getItem("ndUsers");
        if (!currentUserId) {
          alert("해당 상품을 담고 싶으시다면 로그인 후에 이용해주세요!😊");
          location.href = "../login/login.html";
          return;
        }

        const cartKey = `cart_${currentUserId}`;
        const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

        const productInfo = {
          id: item.id,
          title: item.title,
          quantity: 1,
        };

        // 이미 있는 상품 값인지 확인하고 스토리지에 누적값 추가하고, 장바구니 num 증가
        const exItem = cartData.find((it) => it.id === productInfo.id);
        exItem ? (exItem.quantity += 1) : cartData.push(productInfo);

        // 로컬스토리지에 값 저장
        localStorage.setItem(cartKey, JSON.stringify(cartData));
        // console.log(localStorage.getItem(cartKey), "스토리지 들어왔나?");

        cartCount();
        alert(`${item.title} 상품을 담았습니다.`);
      });
      /* Icon button end */
      content2.appendChild(section2);
    });

    // main_con4(오늘의 특가상품)에 나열
    random2.forEach((item) => {
      const saleItem = document.createElement("li");
      saleItem.className = "main_type2";
      saleItem.innerHTML = `
                    <div class="img">
                <img src="${item.imgURL}" alt="item1" class="img_link" />
                <button>${item.discount_rate}% 할인</button>
              </div>
              <div class="main_info">
                <h3>${item.title}</h3>
                <div class="main_tag">
                  <div class="main_sale">
                    <div class="main_percent">
                      <p>
                        <b>${item.discount_rate}</b>
                        %
                      </p>
                    </div>
                    <div class="main_price">
                      <span>${item.price.toLocaleString()}원</span>
                      <p>${item.discount_price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div class="icon">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
              </div>
      `;
      const linkImg = saleItem.querySelector(".img_link");
      linkImg.addEventListener("click", () => {
        window.location.href = `./detail/detail.html?id=${item.id}&type=${item.classification}`;
      });

      /* Icon button start */
      const cartIconBtn = saleItem.querySelector(".fa-cart-shopping");
      const heartIconBtn = saleItem.querySelector(".fa-heart");
      const currentUserId = localStorage.getItem("ndUsers");

      // heart Icon
      heartIconBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        // 로그인 유효성 검사
        if (!currentUserId) {
          alert("찜 하기 버튼은 로그인 후에 이용가능합니다!😉");
          location.href = "../login/login.html";
          return;
        }

        // regular: 빈하트 / solid: 채워진 하트
        heartIconBtn.classList.toggle("fa-regular");
        heartIconBtn.classList.toggle("fa-solid");

        if (heartIconBtn.classList.contains("fa-solid")) {
          heartIconBtn.style.color = "#f37100";
          heartIconBtn.style.border = "1px solid #f37100";
        } else {
          heartIconBtn.style.color = "";
          heartIconBtn.style.border = "";
        }
      });

      // cart Icon
      cartIconBtn.addEventListener("click", (e) => {
        // preventDefault() : 브라우저 고유 행동 막는 함수
        // stopPropagation() : 부모 엘리먼트로의 이벤트 전달 막는 함수
        e.stopPropagation();

        // 로그인 사용자인지 유효성 검사
        const currentUserId = localStorage.getItem("ndUsers");
        if (!currentUserId) {
          alert("해당 상품을 담고 싶으시다면 로그인 후에 이용해주세요!😊");
          location.href = "../login/login.html";
          return;
        }

        const cartKey = `cart_${currentUserId}`;
        const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

        const productInfo = {
          id: item.id,
          title: item.title,
          quantity: 1,
        };

        // 이미 있는 상품 값인지 확인하고 스토리지에 누적값 추가하고, 장바구니 num 증가
        const exItem = cartData.find((it) => it.id === productInfo.id);
        exItem ? (exItem.quantity += 1) : cartData.push(productInfo);

        // 로컬스토리지에 값 저장
        localStorage.setItem(cartKey, JSON.stringify(cartData));
        // console.log(localStorage.getItem(cartKey), "스토리지 들어왔나?");

        cartCount();
        alert(`${item.title} 상품을 담았습니다.`);
      });
      /* Icon button end */
      content4.appendChild(saleItem);
    });
  })
  .catch((error) => {
    console.error("에러:", error);
  });

// sale timer
const sale_timer = document.querySelector(".sale_time");
const timer = () => {
  const now = new Date();

  const currentSeconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const totalSecondsInDay = 24 * 3600;
  const remainingSeconds = totalSecondsInDay - currentSeconds;

  const hours = Math.floor(remainingSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingSeconds % 60).toString().padStart(2, "0");

  sale_timer.innerHTML = `${hours} : ${minutes} : ${seconds}`;
};

timer();
setInterval(timer, 1000);

// main_eventbanner timer
const banner_eventTimer = document.querySelector(".banner_time");

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
let remainingSeconds = SEVEN_DAYS_IN_SECONDS;

// 초를 일, 시, 분, 초로 변환하는 함수
function formatTime(seconds) {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = seconds % 60;

  return `${days}일 ${String(hours).padStart(2, "0")} : ${String(
    minutes
  ).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
}

function updateTimer() {
  // 남은 시간 표시
  banner_eventTimer.textContent = formatTime(remainingSeconds);

  if (remainingSeconds <= 0) {
    remainingSeconds = SEVEN_DAYS_IN_SECONDS;
  }

  remainingSeconds--;
}

setInterval(updateTimer, 1000);
updateTimer();

// heart click event
