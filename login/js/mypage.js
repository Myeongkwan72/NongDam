// 유저 정보 찾아오기
const users = JSON.parse(localStorage.getItem("Users")) || [];

// 현재 유저 정보
const currentUser = users.find((user) => user.id);

if (currentUser) {
  document.querySelector(".mypage_id").textContent = currentUser.id;
  document.querySelector(".mypage_pw").textContent = "*".repeat(
    currentUser.pw.length
  );
  document.querySelector(".mypage_name").textContent = currentUser.name;
  document.querySelector(".mypage_birth").textContent = currentUser.birth;
  document.querySelector(".mypage_email").textContent = currentUser.email;
  document.querySelector(".mypage_call").textContent = currentUser.call;
  document.querySelector(".mypage_address").textContent = currentUser.address;
} else {
  console.log("유저를 찾을 수 없습니다.");
}

// 눈 아이콘
const eye = document.querySelector(".fa-eye-slash");

// 최초 비밀번호 가림상태
const myPw = document.querySelector(".mypage_pw");
const realPw = currentUser.pw;
let showPw = false;

eye.addEventListener("click", () => {
  showPw = !showPw;

  if (showPw) {
    eye.classList.toggle("fa-eye");
    myPw.textContent = realPw;
  } else {
    eye.classList.toggle("fa-eye");
    myPw.textContent = "*".repeat(realPw.length);
  }
});
