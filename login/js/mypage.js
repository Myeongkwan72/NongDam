// 로컬 스토리지에서 유저 정보 찾아오기
const ndUsers = localStorage.getItem("ndUsers");

// 현재 유저 정보
const users = JSON.parse(localStorage.getItem("Users")) || [];
const currentUser = users.find((user) => user.id === ndUsers);
console.log(currentUser);

if (currentUser) {
  document.querySelector(".mypage_id").textContent = currentUser.id;
  document.querySelector(".mypage_name").textContent = currentUser.name;
  document.querySelector(".mypage_birth").textContent = currentUser.birth;
  document.querySelector(".mypage_email").textContent = currentUser.email;
  document.querySelector(".mypage_call").textContent = currentUser.call;
  document.querySelector(".mypage_address").textContent = currentUser.address;
} else {
  console.log("유저를 찾을 수 없습니다.");
}

// 유저 정보 수정
const modifyButton = document.querySelectorAll(".mypage_modify");
const modalPage = document.querySelector(".mypage_modal");

// 스크롤 이벤트 방지
preventScroll = (e) => {
  e.preventDefault();
};

// 모달창 출력
modifyButton.forEach((Button) => {
  Button.addEventListener("click", () => {
    modalPage.style.display = "flex";
    document.body.style.overflow = "hidden";
    document.body.style.background = "rgba(0, 0, 0, 0.5));";
    document.addEventListener("wheel", preventScroll, { passive: false });
  });
});
