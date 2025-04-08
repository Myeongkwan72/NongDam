/* Review More Event start */
const reviewMoreBtn = document.querySelector(".review_more");
const hideBtn = document.querySelectorAll(".hide_members");

let reviewShow = false;

reviewMoreBtn.addEventListener("click", () => {
  hideBtn.forEach((member) => {
    if (reviewShow) {
      const currentHeight = member.scrollHeight;

      // close event
      member.style.height = currentHeight + "px"; // 1. 현재 높이로 고정
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
