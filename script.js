// main banner 슬라이드
$(document).ready(function () {
  $(".main_banner").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplayspeed: 6000,
    pauseOnFoucus: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
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
    console.log(fruits);

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
                <img src="${item.imgURL}" alt="${item.title}" />
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
                <img src="${item.imgURL}" alt="item1" />
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

      section1.addEventListener("click", () => {
        window.location.href = `./detail/detail.html?id=${item.id}&type=${item.classification}`;
      });

      content1.appendChild(section1);
    });

    // main_con2에 나열
    random1.forEach((item) => {
      const section2 = document.createElement("li");
      if (item.discount_rate < 20) {
        section2.className = "main_type1";
        section2.innerHTML = `
              <div class="img">
                <img src="${item.imgURL}" alt="${item.title}" />
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
                <img src="${item.imgURL}" alt="item1" />
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

      section2.addEventListener("click", () => {
        window.location.href = `./detail/detail.html?id=${item.id}&type=${item.classification}`;
      });
      content2.appendChild(section2);
    });

    // main_con4(오늘의 특가상품)에 나열
    random2.forEach((item) => {
      const saleItem = document.createElement("li");
      saleItem.className = "main_type2";
      saleItem.innerHTML = `
                    <div class="img">
                <img src="${item.imgURL}" alt="item1" />
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

      saleItem.addEventListener("click", () => {
        window.location.href = `./detail/detail.html?id=${item.id}&type=${item.classification}`;
      });
      content4.appendChild(saleItem);
    });
  })
  .catch((error) => {
    console.error("에러:", error);
  });
