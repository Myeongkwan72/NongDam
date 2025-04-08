// 스위치
const findSwitchCall = document.querySelector(".find_switch_call");
const callP = findSwitchCall.querySelector("p");
const callHr = findSwitchCall.querySelector("hr");

const findSwitchEmail = document.querySelector(".find_switch_email");
const emailP = findSwitchEmail.querySelector("p");
const emailHr = findSwitchEmail.querySelector("hr");

const findByCall = document.querySelector(".find_by_call");
const findByEmail = document.querySelector(".find_by_email");

let currentMode = "call";

// 연락처로 찾기
findSwitchCall.addEventListener("click", () => {
  currentMode = "call";

  callP.classList.add("active");
  callHr.classList.add("active");

  emailP.classList.remove("active");
  emailHr.classList.remove("active");

  findByCall.style.display = "flex";
  findByEmail.style.display = "none";

  vaildTest();
});

// 이메일로 찾기
findSwitchEmail.addEventListener("click", () => {
  currentMode = "email";

  emailP.classList.add("active");
  emailHr.classList.add("active");

  callP.classList.remove("active");
  callHr.classList.remove("active");

  findByEmail.style.display = "flex";
  findByCall.style.display = "none";

  vaildTest();
});

// 로컬 스토리지에서 유저 정보 찾아오기
const ndUsers = localStorage.getItem("ndUsers");

// 현재 유저 정보
const users = JSON.parse(localStorage.getItem("Users")) || [];
const currentUser = users.find((user) => user.id === ndUsers);

// 계정 찾기
const form = document.querySelector(".find_id");
const findButton = document.querySelector(".find_button");

// 에러메시지
const nameError = document.querySelector(".name_error_message");
const callError = document.querySelector(".call_error_message");
const emailError = document.querySelector(".email_error_message");

nameError.style.opacity = "0";
callError.style.opacity = "0";
emailError.style.opacity = "0";

const vaildTest = (e) => {
  if (e) e.preventDefault();

  let isVaild = true;

  // 이름
  const name = document.querySelector("#name");
  const nameValue = name.value.trim();

  if (nameValue === "") {
    nameError.style.opacity = "1";
    isVaild = false;
  } else {
    nameError.style.opacity = "0";
  }

  // 연락처
  const call = document.querySelector("#call");
  const callValue = call.value.trim();

  if (currentMode === "call") {
    if (callValue === "") {
      callError.style.opacity = "1";
      isVaild = false;
    } else {
      callError.style.opacity = "0";
    }
  }

  // 이메일
  const email = document.querySelector("#email");
  const emailValue = email.value.trim();

  if (currentMode === "email") {
    if (emailValue === "") {
      emailError.style.opacity = "1";
      isVaild = false;
    } else {
      emailError.style.opacity = "0";
    }
  }

  // 버튼
  if (isVaild) {
    findButton.disabled = false;
  } else {
    findButton.disabled = true;
  }
};

form.addEventListener("input", vaildTest);
