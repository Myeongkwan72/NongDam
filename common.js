// const triBtn = document.querySelector(".trigger");
// triBtn.addEventListener("click", (e) => {
//   e.currentTarget.classList.toggle("active");
//   document.querySelector(".gnb").classList.toggle("active");
// });

// const menus = document.querySelectorAll(".gnb a");
// menus.forEach((menu) => {
//   menu.addEventListener("click", (e) => {
//     e.preventDefault();
//     const target = menu.getAttribute("href");
//     console.log(target, "클릭");
//   });
// });

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
    window.location.href = "./login.html";
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
    window.location.href = "./login.html";
  });

  signUp.addEventListener("click", () => {
    window.location.href = "./sign.html";
  });
}
