// main banner 슬라이드
$(document).ready(function () {
  $(".main_banner").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 3000,
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
    console.log(data); // 불러온 JSON 데이터
    // 여기서 데이터 활용 가능

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
    console.log(fruits);
    // 🍎 랜덤하게 8개 추출하는 함수
    function getRandomItems(array, count) {
      const shuffled = [...array].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }
    const randomFruits = getRandomItems(fruits, 8); // ✅ 랜덤 8개 추출
    const container = document.querySelector(
      "#main_con4 > .main_inner >.main_it"
    );
    randomFruits.forEach((fruit) => {
      const saleItem = document.createElement("li");
      saleItem.className = "main_type2";
      saleItem.innerHTML = `
                    <div class="img">
                <img src="${fruit.imgURL}" alt="item1" />
                <button>${fruit.discount_rate}% 할인</button>
              </div>
              <div class="main_info">
                <h3>${fruit.title}</h3>
                <div class="main_tag">
                  <div class="main_sale">
                    <div class="main_percent">
                      <p>
                        <b>${fruit.discount_rate}</b>
                        %
                      </p>
                    </div>
                    <div class="main_price">
                      <span>${fruit.price}원</span>
                      <p>${fruit.discount_price}원</p>
                    </div>
                  </div>
                  <div class="icon">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
              </div>
      `;
      container.appendChild(saleItem);
    });
    // const fruits = data.fruits.map(
    //   ({
    //     id,
    //     title,
    //     classification,
    //     price,
    //     discount_price,
    //     discount_rate,
    //     imgURL,
    //   }) => ({
    //     id,
    //     title,
    //     classification,
    //     price,
    //     discount_price,
    //     discount_rate,
    //     imgURL,
    //   })
    // );
    // const vegetables = data.vegetables.map((item) => item);
    // const etcs = data.processed_etc.map((item) => item);

    //   id: item.id,
    //   title: item.title,
    //   classification: item.classification,
    //   price: item.price,
    //   discount_price: item.discount_price,
    //   discount_rate: item.discount_rate,
    //   imgURL: item.imgURL,
    // });
    // const fruits = data.fruits.map(extractFields);
    // const vegetables = data.vegetables.map(extractFields);
    // const processed = data.processed_etc.map(extractFields);

    // // 하나로 합치기 (필요할 경우)
    // const allItems = [...fruits, ...vegetables, ...processed];

    // console.log(allItems);
  })
  .catch((error) => {
    console.error("에러:", error);
  });
