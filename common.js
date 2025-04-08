/* logo location */
const logoBtn = document.querySelector("#header_logo");
logoBtn.addEventListener("click", () => {
  location.href = "../index.html";
});

/* trigger menu */
const triBtn = document.querySelector(".trigger");
triBtn.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("active");
  document.querySelector(".gnb").classList.toggle("active");
});

const menus = document.querySelectorAll(".gnb a");
menus.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    e.preventDefault();
    const target = menu.getAttribute("href");
    console.log(target, "클릭");
  });
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
  else if (scrollTop > lastScrollTop && scrollTop > 50) {
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
const up_btn = document.querySelector(".up_btn > a");

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
