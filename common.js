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
