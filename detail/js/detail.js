/* Review More Event start */
const reviewMoreBtn = document.querySelector(".review_more");
const hideBtn = document.querySelectorAll(".hide_members");

let reviewShow = false;

reviewMoreBtn.addEventListener("click", () => {
  hideBtn.forEach((member) => {
    if (reviewShow) {
      const currentHeight = member.scrollHeight;

      // close event
      member.style.height = currentHeight + "px";
      member.style.opacity = "1";
      member.style.transform = "translateY(0)";
      member.style.pointerEvents = "auto";

      // 강제 reflow
      void member.offsetHeight;

      member.style.height = "0px";
      member.style.opacity = "0";
      member.style.transform = "translateY(-10px)";
      member.style.pointerEvents = "none";
    } else {
      const scrollHeight = member.scrollHeight;

      // open
      member.style.height = "0px";
      member.style.opacity = "0";
      member.style.transform = "translateY(-10px)";
      member.style.pointerEvents = "none";

      void member.offsetHeight;

      // open event
      member.style.height = scrollHeight + "px";
      member.style.opacity = "1";
      member.style.transform = "translateY(0)";
      member.style.pointerEvents = "auto";

      // transition handler event
      const handler = () => {
        member.style.height = "auto";
        // event 제거
        member.removeEventListener("transitionend", handler);
      };
      // event 생성
      member.addEventListener("transitionend", handler);
    }
  });
  reviewShow = !reviewShow;
  reviewMoreBtn.innerText = reviewShow ? "리뷰 접기 ▲" : "232건 리뷰 더보기 ▼";
});
/* Review More Event end */

/* faqButton start */
const contactUs = document.querySelector(".contact_us");

contactUs.addEventListener("click", () => {
  console.log(contactUs, "클릭");
});
/* faqButton end */

/* Page nation start */
// const faqPage = 5;
// const faqRows = document.querySelectorAll(".faq_table .faq_row");
// const numContain = document.querySelector(".faq_number");
// const totalPages = Math.ceil(faqRows.length / faqPage);

// const activePage = (page) => {
//   faqRows.forEach((faqRow, i) => {
//     faqRow.style.display = "none";
//     if (i >= (page - 1) * faqPage && i < page * faqPage) {
//       faqRow.style.display = "table-row";
//     }
//   });

//   const numBtns = numContain.querySelectorAll("div");
//   numBtns.forEach((btn, idx) => {
//     btn.classList.toggle("active", idx + 1 === page);
//   });
// };

// const setPagenations = () => {
//   numContain.innerHTML = "";

//   for (let i = 1; i <= totalPages; i++) {
//     const pagesBtn = document.createElement("div");
//     pagesBtn.innerText = i;

//     pagesBtn.addEventListener("click", () => activePage(i));
//     numContain.appendChild(pagesBtn);
//   }
//   activePage(1);
// };

// setPagenations();
/* Page nation end */
