const form = document.querySelector(".login_01");
const loginButton = document.querySelector(".login_button");
const id = document.querySelector("#id");
const pw = document.querySelector("#pw");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  // 로그인 정보 입력
  const idValue = id.value.trim();
  const pwValue = pw.value.trim();

  // 로컬 스토리지에서 유저 정보 찾아오기
  let users = JSON.parse(localStorage.getItem("Users")) || [];

  // 로그인하려는 유저 정보
  let currentUser = users.find((user) => user.id === idValue);
  const name = currentUser.name;

  // 아이디 미입력
  if (idValue === "") {
    alert("아이디를 입력해주세요.");
    return;
  }

  // 등록되지 않은 아이디
  if (!currentUser) {
    alert("등록되지 않은 아이디입니다.");
    return;
  }

  // 비밀번호 미입력
  if (pwValue === "") {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  // 잘못된 비밀번호
  if (currentUser.pw !== pwValue) {
    alert("비밀번호가 올바르지 않습니다.");
    return;
  }

  // 로그인 성공
  if (currentUser.pw === pwValue) {
    alert(`${name}님, 반갑습니다!`);
  }

  localStorage.setItem("ndUsers", currentUser.id);

  window.location.href = "/index.html";
});

// 눈 아이콘
const eye = document.querySelector(".fa-eye-slash");

eye.addEventListener("click", () => {
  eye.classList.toggle("fa-eye");
  // 비밀번호 보이기
  const pwInput = eye.closest("div").querySelector("input");
  if (pwInput.type === "password") {
    pwInput.type = "text";
  } else {
    pwInput.type = "password";
  }
});

// 페이지 이동
const signUp = document.querySelector(".login_sign");
const findId = document.querySelector(".login_find_id");
const findPw = document.querySelector(".login_find_pw");

signUp.addEventListener("click", () => {
  window.location.href = "/login/sign.html";
});

findId.addEventListener("click", () => {
  window.location.href = "/login/find-id.html";
});

findPw.addEventListener("click", () => {
  window.location.href = "/login/find-pw.html";
});
