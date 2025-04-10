fetch("../../food_dataset.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("데이터를 불러오지 못했습니다.");
    }
    return response.json();
  })
  .then((data) => {
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

    const content = document.querySelector(
      "#vegetables > .vegetable_inner > .vegetable_it"
    );

    vegetables.forEach((item) => {
      const section = document.createElement("li");
      if (item.discount_rate < 20) {
        section.className = "main_type1";
        section.innerHTML = `
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
        section.className = "main_type2";
        section.innerHTML = ` 
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

      section.addEventListener("click", () => {
        window.location.href = `/detail/detail.html?id=${item.id}&type=${item.classification}`;
      });

      content.appendChild(section);
    });
  })
  .catch((error) => {
    console.error("에러:", error);
  });
