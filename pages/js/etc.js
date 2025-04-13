fetch("../../food_dataset.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("데이터를 불러오지 못했습니다.");
    }
    return response.json();
  })
  .then((data) => {
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

    const content = document.querySelector("#etcs > .etc_inner > .etc_it");

    etcs.forEach((item) => {
      const section = document.createElement("li");
      if (item.discount_rate < 20) {
        section.className = "main_type1";
        section.innerHTML = `
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
        section.className = "main_type2";
        section.innerHTML = ` 
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
      const linkImg = section.querySelector(".img_link");
      linkImg.addEventListener("click", () => {
        window.location.href = `/detail/detail.html?id=${item.id}&type=${item.classification}`;
      });

      /* Icon button start */
      const cartIconBtn = section.querySelector(".fa-cart-shopping");
      const heartIconBtn = section.querySelector(".fa-heart");
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

      content.appendChild(section);
    });
  })
  .catch((error) => {
    console.error("에러:", error);
  });
