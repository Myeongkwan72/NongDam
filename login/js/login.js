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
