const signId = document.querySelector(".sign_id");

// 눈 아이콘
const eyeIcon = document.querySelectorAll(".fa-eye-slash");

// 눈 아이콘 변경
eyeIcon.forEach((eye) => {
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
});

// 날짜 옵션
const year = document.querySelector(".date_select_year");
const month = document.querySelector(".date_select_month");
const day = document.querySelector(".date_select_day");

// 연도 추가
for (let i = 1900; i < 2100; i++) {
  let yearText = document.createElement("option");
  yearText.value = i;
  yearText.innerText = `${i}년`;
  year.appendChild(yearText);
}

// 월 추가
for (let i = 1; i < 13; i++) {
  let monthText = document.createElement("option");
  i = i < 10 ? "0" + i : i;
  monthText.value = i;
  monthText.innerText = `${i}월`;
  month.appendChild(monthText);
}

// 일 추가
for (let i = 1; i < 32; i++) {
  let dayText = document.createElement("option");
  i = i < 10 ? "0" + i : i;
  dayText.value = i;
  dayText.innerText = `${i}일`;
  day.appendChild(dayText);
}

// 체크박스 이벤트
const checkAll = document.querySelector(".check_all");
const checkMust = document.querySelectorAll(".check_must");
const checkBox = document.querySelectorAll(".check_boxes");
const must01 = checkMust[0];
const must02 = checkMust[1];

checkAll.addEventListener("change", () => {
  checkBox.forEach((box) => (box.checked = checkAll.checked));
  console.log(must01);
});

// 연락처 이벤트
const phone1 = document.querySelector("#phone1");
const phone2 = document.querySelector("#phone2");
const phone3 = document.querySelector("#phone3");

phone1.addEventListener("input", () => {
  const phone1Value = phone1.value;
  phone1.value = phone1.value.replace(/\D/g, "");
  if (phone1Value.length === 3) {
    document.querySelector("#phone2").focus();
  }
});

phone2.addEventListener("input", () => {
  const phone2Value = phone2.value;
  phone2.value = phone2.value.replace(/\D/g, "");
  if (phone2Value.length === 4) {
    document.querySelector("#phone3").focus();
  }
});

phone3.addEventListener("input", () => {
  const phone3Value = phone3.value;
  phone3.value = phone3.value.replace(/\D/g, "");
});

// 가입하기 버튼
const signButton = document.querySelector(".sign_button");

// 에러메시지
const errorMessage = document.querySelectorAll(".sign_error_message");
const idError = document.querySelector("#sign_id_error");
const pwError = document.querySelector("#sign_pw_error");
const pwAgainError = document.querySelector("#sign_pw_again_error");
const nameError = document.querySelector("#sign_name_error");
const emailError = document.querySelector("#sign_email_error");
const callError = document.querySelector("#sign_call_error");
const serviceError = document.querySelector("#sign_service_error");
const privacyError = document.querySelector("#sign_privacy_error");

// 에러메시지 숨기기
errorMessage.forEach((message) => {
  message.style.opacity = "0";
});

// 가입하기
const form = document.querySelector(".sign_form");

form.addEventListener("input", (e) => {
  e.preventDefault();

  let isValid = true;

  // 아이디
  const id = document.querySelector("#id");
  const idValue = id.value.trim();

  if (idValue === "") {
    idError.style.opacity = "1";
    idError.textContent = "아이디가 입력되지 않았습니다.";
    isValid = false;
  } else {
    idError.style.opacity = "0";
  }

  // 비밀번호
  const pw = document.querySelector("#pw");
  const pwValue = pw.value.trim();
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;

  if (pwValue === "") {
    pwError.style.opacity = "1";
    pwError.textContent = "비밀번호가 입력되지 않았습니다.";
    isValid = false;
  } else if (!pwRegex.test(pwValue)) {
    pwError.style.opacity = "1";
    pwError.textContent = "비밀번호는 영문과 숫자를 포함한 8자리입니다.";
    isValid = false;
  } else {
    pwError.style.opacity = "0";
  }

  // 비밀번호 확인
  const pwAgain = document.querySelector("#pw_again");
  const pwAgainValue = pwAgain.value.trim();

  if (pwAgainValue === "") {
    pwAgainError.style.opacity = "1";
    pwAgainError.textContent = "비밀번호를 재입력해주세요.";
  } else if (pwAgainValue !== pwValue) {
    pwAgainError.style.opacity = "1";
    pwAgainError.textContent = "비밀번호가 일치하지 않습니다.";
    isValid = false;
  } else {
    pwAgainError.style.opacity = "0";
  }

  // 이름
  const name = document.querySelector("#name");
  const nameValue = name.value.trim();
  const nameRegex = /^[A-Za-z가-힣]+$/;

  if (nameValue === "") {
    nameError.style.opacity = "1";
    nameError.textContent = "이름이 입력되지 않았습니다.";
    isValid = false;
  } else if (!nameRegex.test(nameValue)) {
    nameError.style.opacity = "1";
    nameError.textContent = "이름은 한글 혹은 영문으로 입력하세요.";
    isValid = false;
  } else {
    nameError.style.opacity = "0";
  }

  // 이메일
  const email = document.querySelector("#email");
  const domain = document.querySelector(".email_list");
  const emailValue = email.value.trim();
  const domainValue = domain.value;
  const emailRegex = /^[A-Za-z0-9]+$/;

  if (emailValue === "" || domainValue === "") {
    emailError.style.opacity = "1";
    emailError.textContent = "이메일이 입력되지 않았습니다.";
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    emailError.style.opacity = "1";
    emailError.textContent = "이메일 형식을 확인해주세요.";
    isValid = false;
  } else {
    emailError.style.opacity = "0";
  }

  // 연락처
  const p1 = phone1.value.trim();
  const p2 = phone2.value.trim();
  const p3 = phone3.value.trim();

  if (p1 === "" || p2 === "" || p3 === "") {
    callError.style.opacity = "1";
    callError.textContent = "연락처가 입력되지 않았습니다.";
    isValid = false;
  } else if (p1.length !== 3 || p2.length !== 4 || p3.length !== 4) {
    callError.style.opacity = "1";
    callError.textContent = "연락처가 올바르지 않습니다.";
    isValid = false;
  } else {
    callError.style.opacity = "0";
  }

  // 약관
  if (!must01.checked) {
    serviceError.style.opacity = "1";
    serviceError.textContent = "필수 약관에 동의해주세요.";
    isValid = false;
  } else {
    serviceError.style.opacity = "0";
  }

  if (!must02.checked) {
    privacyError.style.opacity = "1";
    privacyError.textContent = "필수 약관에 동의해주세요.";
    isValid = false;
  } else {
    privacyError.style.opacity = "0";
  }

  // 버튼
  if (isValid) {
    signButton.disabled = false;
  } else {
    signButton.disabled = true;
  }
});

signButton.addEventListener("click", (e) => {
  e.preventDefault();

  // 값 다시 가져오기
  const id = document.querySelector("#id").value.trim();
  const pw = document.querySelector("#pw").value.trim();
  const name = document.querySelector("#name").value.trim();
  const birth = `${year.value.trim()}년 ${month.value.trim()}월 ${day.value.trim()}일`;
  const email = document.querySelector("#email").value.trim();
  const domain = document.querySelector(".email_list").value;
  const phone = `${phone1.value.trim()}-${phone2.value.trim()}-${phone3.value.trim()}`;
  const address = document.querySelector("#address").value.trim();

  // 기존 사용자 데이터 불러오기 (없으면 빈 배열)
  const users = JSON.parse(localStorage.getItem("Users")) || [];

  // 새로운 사용자 데이터 추가
  users.push({
    id: id,
    pw: pw,
    name: name,
    birth: birth,
    email: `${email}@${domain}`,
    call: phone,
    address: address,
  });

  // 사용자 목록을 로컬스토리지에 저장
  localStorage.setItem("Users", JSON.stringify(users));

  alert(`회원가입이 완료되었습니다!`);

  // 폼 초기화 후 이메일 로그인 페이지로 이동
  form.reset();
  window.location.href = "./login.html";
});
