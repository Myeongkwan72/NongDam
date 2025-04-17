const logoBtn = document.querySelector("#header_logo");
logoBtn.addEventListener("click", () => {
  location.href = "/index.html";
});

const triBtn = document.querySelector(".trigger");
const gnbList = document.querySelector(".gnb");
console.log(gnbList);
triBtn.addEventListener("click", (e) => {
  if (window.innerWidth <= 767) {
    const isActive = e.currentTarget.classList.toggle("active");
    gnbList.classList.toggle("active");

    if (isActive) {
      gnbList.style.display = "flex";
    } else {
      gnbList.style.display = "none";
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    gnbList.style.display = "";
    triBtn.classList.remove("active");
    gnbList.classList.remove("active");
  } else {
    gnbList.style.display = "none";
  }
});

/* cartBtn count start */
const cartCount = () => {
  const currentUserId = localStorage.getItem("ndUsers");
  const cartCountTag = document.querySelector(".fa-cart-shopping p");

  if (!cartCountTag) return;

  if (!currentUserId) {
    cartCountTag.style.display = "none";
    return;
  }

  const cartKey = `cart_${currentUserId}`;
  const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

  const cartTotalCount = cartData.reduce((cur, it) => cur + it.quantity, 0);

  cartCountTag.style.display = "flex";
  cartCountTag.innerText = cartTotalCount;
};

cartCount();
/* cartBtn count end */

// search event
const searchBtn = document.querySelector(".search_bar .fa-magnifying-glass");
const searchInput = document.querySelector(".search_bar input");

/* icon click start */
searchBtn.addEventListener("click", () => {
  const searchData = searchInput.value.trim();

  if (searchData) {
    const encode = encodeURIComponent(searchData);
    window.location.href = `../pages/search.html?searchData=${encode}`;
  }
});
/* icon click end */

/* enter event start */
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchData = searchInput.value.trim();
    if (searchData) {
      const encode = encodeURIComponent(searchData);
      window.location.href = `../pages/search.html?searchData=${encode}`;
    }
  }
});
/* enter event end */

// url searchData load
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("searchData")?.trim().toLowerCase() || "";

/* json data setting start */
fetch("../../food_dataset.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("데이터를 불러오지 못했습니다.");
    }
    return response.json();
  })
  .then((data) => {
    //
    const allCategory = [
      ...data.fruits,
      ...data.vegetables,
      ...data.processed_etc,
    ];
    const searchValue = allCategory.map((it) => {
      return {
        id: it.id,
        title: it.title,
        classification: it.classification,
        price: it.price,
        discount_price: it.discount_price,
        discount_rate: it.discount_rate,
        imgURL: it.imgURL,
        subImgUrls: it.subImgUrls,
      };
    });
    console.log(searchValue);

    // search word filter
    const searchFilter = searchValue.filter((it) =>
      it.title.toLowerCase().includes(searchQuery)
    );

    const contentWrapper = document.querySelector("#search > .search_inner");
    const content = document.querySelector(
      "#search > .search_inner > .search_it"
    );
    // 실제로 .search_it안에 contentWrapper & content요소가 존재하는지 확인
    if (contentWrapper && content) {
      if (searchFilter.length === 0) {
        content.style.display = "none";

        const epyMsag = document.createElement("li");
        epyMsag.className = "search_empty";
        epyMsag.innerText = "검색 결과가 없습니다.";
        contentWrapper.appendChild(epyMsag);
        return;
      }
      // 실제로 .search_it안에 content요소가 존재하는지 확인
      content.style.display = "grid";
    }
    searchFilter.forEach((item) => {
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
        // preventDefault() : 브라우저 고유 행동 막는 함수 (form action="")
        // stopPropagation() : 부모 엘리먼트로의 이벤트 전달 막는 함수
        e.stopPropagation();
        // console.log("딭테일로 안갈거야~");

        // 로그인 유효성 검사
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

      section.addEventListener("click", () => {
        window.location.href = `/detail/detail.html?id=${item.id}&type=${item.classification}`;
      });

      if (content) {
        content.appendChild(section);
      }
    });
  })
  .catch((error) => {
    console.error("에러:", error);
  });

/* json data setting end */

const shopCar = document.querySelector(".basket i");
// console.log(shopCar);
shopCar.addEventListener("click", () => {
  alert("현재 준비중인 페이지입니다..!😢");
});

// header 스크롤 체크, 히든
let lastScrollTop = 0;
const header = document.querySelector("#header");

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;

  if (scrollTop === 0) {
    header.classList.remove("hidden");
  }
  // 스크롤을 내릴 때만 숨기기
  else if (scrollTop > lastScrollTop && scrollTop > 230) {
    header.classList.add("hidden");
  }
  // 스크롤을 올릴 때 보이게
  else if (scrollTop < lastScrollTop) {
    header.classList.remove("hidden");
  }

  if (window.scrollY > 50) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }

  lastScrollTop = scrollTop >= 0 ? scrollTop : 0;
});

// footer 이벤트
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    document.querySelector(".up_btn").classList.add("active");
  } else {
    document.querySelector(".up_btn").classList.remove("active");
  }
});

// footer topscroll event
const up_btn = document.querySelector(".up_btn");

up_btn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* 반응형 767size부터 검색바 드롭다운 start */
const resSearchBtn = document.querySelector(".res_magnify");
const resInputWrapper = document.querySelector(".res_dropdown_input");
const inputEl = resInputWrapper?.querySelector("input");

const handleResize = () => {
  if (window.innerWidth > 767) {
    resInputWrapper.classList.remove("show");
    resInputWrapper.classList.add("hidden");
    resInputWrapper.style.display = "none";
    if (inputEl) inputEl.value = "";
    removeDocumentClickListener();
  }
};

const moveToSearchPage = (searchData) => {
  const encode = encodeURIComponent(searchData);
  window.location.href = `../pages/search.html?searchData=${encode}`;
};

// input 바깥 클릭 시 닫히는 이벤트
const handleDocumentClick = (e) => {
  if (
    resInputWrapper &&
    !resInputWrapper.contains(e.target) &&
    !resSearchBtn.contains(e.target)
  ) {
    resInputWrapper.classList.remove("show");
    resInputWrapper.classList.add("hidden");
    resInputWrapper.style.display = "none";
    if (inputEl) inputEl.value = "";
    removeDocumentClickListener();
  }
};

const addDocumentClickListener = () => {
  document.addEventListener("click", handleDocumentClick);
};

const removeDocumentClickListener = () => {
  document.removeEventListener("click", handleDocumentClick);
};

if (resSearchBtn && resInputWrapper && inputEl) {
  resSearchBtn.addEventListener("click", (e) => {
    console.log("클릭");

    if (window.innerWidth <= 767) {
      e.stopPropagation();

      if (resInputWrapper.classList.contains("hidden")) {
        resInputWrapper.classList.remove("hidden");
        resInputWrapper.style.display = "block";
        setTimeout(() => {
          resInputWrapper.classList.add("show");
          console.log(resInputWrapper.classList, "2");
        }, 10);
        // 열렸을때 클릭 감지 시작
        addDocumentClickListener();
      } else {
        resInputWrapper.classList.toggle("show");

        if (!resInputWrapper.classList.contains("show")) {
          inputEl.value = "";
          // 닫히면 클릭 감지 종료
          removeDocumentClickListener();
        }

        console.log(resInputWrapper.classList, "3");
      }

      if (resInputWrapper.classList.contains("show")) {
        inputEl.focus();
      }
    }
  });

  window.addEventListener("resize", handleResize);

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && window.innerWidth <= 767) {
      const searchData = inputEl.value.trim();
      if (searchData) {
        moveToSearchPage(searchData);
      }
    }
  });
}
/* 반응형 767size부터 검색바 드롭다운 end */

// footer button bottom event
document.addEventListener("scroll", function () {
  const button = document.querySelector(".up_btn");
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  let footerThreshold = 240;
  if (window.innerWidth <= 767) {
    footerThreshold = 180;
  } else if (window.innerWidth <= 1440) {
    footerThreshold = 200;
  }

  const maxBottom = documentHeight - footerThreshold - windowHeight;

  if (scrollY >= maxBottom) {
    button.style.position = "absolute";
    button.style.bottom = `${footerThreshold}px`;
  } else {
    button.style.position = "fixed"; // 기본 상태 유지
    button.style.bottom = "6vh"; // 기본 위치 유지
  }
});

// 헤더 로그인 & 로그아웃
const headerLoginOut = document.querySelector(".header_login");

// 로컬 스토리지에서 유저 정보 찾아오기
const headerNdUsers = localStorage.getItem("ndUsers");

// 현재 유저 정보
const headerUsers = JSON.parse(localStorage.getItem("Users")) || [];
const headerCurrentUser = headerUsers.find((user) => user.id === headerNdUsers);

if (headerCurrentUser) {
  const logOut = document.createElement("li");
  logOut.innerText = "로그아웃";
  const divider = document.createElement("p");
  divider.innerText = "|";
  const myPage = document.createElement("li");
  myPage.innerText = "마이페이지";

  headerLoginOut.appendChild(logOut);
  headerLoginOut.appendChild(divider);
  headerLoginOut.appendChild(myPage);

  logOut.addEventListener("click", () => {
    localStorage.removeItem("ndUsers");
    alert("로그아웃 되었습니다.");
    window.location.href = "/login/login.html";
  });

  myPage.addEventListener("click", () => {
    window.location.href = "/login/mypage.html";
  });
} else {
  const logIn = document.createElement("li");
  logIn.innerText = "로그인";
  const divider = document.createElement("p");
  divider.innerText = "|";
  const signUp = document.createElement("li");
  signUp.innerText = "회원가입";

  headerLoginOut.appendChild(logIn);
  headerLoginOut.appendChild(divider);
  headerLoginOut.appendChild(signUp);

  logIn.addEventListener("click", () => {
    window.location.href = "/login/login.html";
  });

  signUp.addEventListener("click", () => {
    window.location.href = "/login/sign.html";
  });
}

// 페이지 이동
const locationFriut = document.querySelectorAll(".header_location_fruit");
const locationVegetable = document.querySelectorAll(
  ".header_location_vegetable"
);
const locationEtc = document.querySelectorAll(".header_location_etc");
const locationEvent = document.querySelectorAll(".header_event");

const eventProBtn = document.querySelector(
  ".header_inner_left > ul > .header_location_event"
);
const eventBtn = document.querySelector(".gnb > .header_location_event");
eventProBtn.addEventListener("click", () => {
  window.location.href = "/eventpromotion/event.html";
});

eventBtn.addEventListener("click", () => {
  window.location.href = "/eventpromotion/event.html";
});

// 과일 페이지 이동
locationFriut.forEach((fruit) => {
  fruit.addEventListener("click", () => {
    window.location.href = "/pages/fruit.html";
  });
});

// 채소 페이지 이동
locationVegetable.forEach((vegetable) => {
  vegetable.addEventListener("click", () => {
    console.log(vegetable);
    window.location.href = "/pages/vegetable.html";
  });
});

// 가공식품/기타 페이지 이동
locationEtc.forEach((etc) => {
  etc.addEventListener("click", () => {
    window.location.href = "/pages/etc.html";
  });
});

// 이벤트 페이지 이동
locationEvent.forEach((event) => {
  event.addEventListener("click", () => {
    window.location.href = "/eventpromotion/event.html";
  });
});
