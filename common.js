/* logo location */
const logoBtn = document.querySelector("#header_logo");
logoBtn.addEventListener("click", () => {
  location.href = "/index.html";
});

const triBtn = document.querySelector(".trigger");
triBtn.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("active");
  document.querySelector(".gnb").classList.toggle("active");
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

// search event
const searchBtn = document.querySelector(".search_bar .fa-magnifying-glass");
const searchInput = document.querySelector(".search_bar input");
// console.log(searchInput);
searchBtn.addEventListener("click", () => {
  const searchData = searchInput.value.trim();

  if (searchData) {
    const encode = encodeURIComponent(searchData);
    window.location.href = `../pages/search.html?searchData=${encode}`;
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchData = searchInput.value.trim();
    if (searchData) {
      const encode = encodeURIComponent(searchData);
      window.location.href = `../pages/search.html?searchData=${encode}`;
    }
  }
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
const locationEvent = document.querySelectorAll(".header_location_event");

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
