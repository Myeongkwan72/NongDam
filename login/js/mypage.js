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
console.log(modifyButton);
const closeButton = document.querySelector(".modal_close");
const changeButton = document.querySelector(".modal_change");
const modalPage = document.querySelector(".mypage_modal");
const modalOverlay = document.querySelector(".modal_overlay");
const titleBefore = document.querySelector(".info_before_title");
const textBefore = document.querySelector(".info_before_text");
const titleAfter = document.querySelector(".info_after_title");
const textAfter = document.querySelector(".info_after_text");

// 모달창 출력

let currentIndex = null;

modifyButton.forEach((Button, index) => {
  Button.addEventListener("click", () => {
    currentIndex = index;

    modalPage.style.display = "flex";
    modalOverlay.style.display = "block";

    // 스크롤 이벤트 방지
    preventScroll = (e) => {
      e.preventDefault();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("wheel", preventScroll, { passive: false });
    // 모달창 내용 변경

    // 주소
    if (currentIndex === 0) {
      titleBefore.innerText = "현재 이메일";
      textBefore.innerText = currentUser.email;
      titleAfter.innerText = "변경할 이메일";
      textAfter.placeholder = "예시) abc123@naver.com";
    }
    // 연락처
    else if (currentIndex === 1) {
      titleBefore.innerText = "현재 연락처";
      textBefore.innerText = currentUser.call;
      titleAfter.innerText = "변경할 연락처";
      textAfter.placeholder = "예시) 010-1234-5678";
    }
    // 주소
    else if (currentIndex === 2) {
      titleBefore.innerText = "현재 주소";
      textBefore.innerText = currentUser.address;
      titleAfter.innerText = "변경할 주소";
      textAfter.placeholder = "예시) 서울시 서초구 논현동";
      if (currentUser.address === undefined) {
        textBefore.innerText = "입력된 주소가 없습니다.";
      }
    }
  });
});

closeButton.addEventListener("click", () => {
  modalPage.style.display = "none";
  modalOverlay.style.display = "none";
  document.body.style.overflow = "visible";
  document.removeEventListener("wheel", preventScroll, { passive: false });
  textAfter.value = "";
});

changeButton.addEventListener("click", () => {
  const newValue = textAfter.value.trim();
  const changeEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const changeCallRegex = /^01[016789]-\d{3,4}-\d{4}$/;

  if (newValue === "") {
    alert("변경할 내용을 입력해주세요.");
    return;
  }
  // 이메일 변경
  if (currentIndex === 0) {
    if (!changeEmailRegex.test(newValue)) {
      alert("올바른 이메일 형식을 입력해주세요.\n\n예시) abc123@naver.com");
      textAfter.value = "";
      return;
    }
    currentUser.email = newValue;
    document.querySelector(".mypage_email").textContent = newValue;
  }
  // 연락처 변경
  else if (currentIndex === 1) {
    if (!changeCallRegex.test(newValue)) {
      alert("올바른 연락처 형식을 입력해주세요.\n\n예시) 010-1234-5678");
      textAfter.value = "";
      return;
    }
    currentUser.call = newValue;
    document.querySelector(".mypage_call").textContent = newValue;
  }
  // 주소 변경
  else if (currentIndex === 2) {
    currentUser.address = newValue;
    document.querySelector(".mypage_address").textContent = newValue;
  }

  // 수정된 정보를를 localStorage에서 수정
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? currentUser : user
  );
  localStorage.setItem("Users", JSON.stringify(updatedUsers));

  // 모달 닫기
  alert("회원 정보가 수정되었습니다.");
  modalPage.style.display = "none";
  modalOverlay.style.display = "none";
  document.body.style.overflow = "visible";
  document.removeEventListener("wheel", preventScroll, { passive: false });
  textAfter.value = "";
});
