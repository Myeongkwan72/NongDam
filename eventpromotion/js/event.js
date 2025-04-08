const btn = document.querySelector("#roulette_center");
const panel = document.querySelector("#event_roulette_bg");
const event_modal_section = document.querySelector("#event_modal_section");
const modal_btn = document.querySelector("#modal_btn");
const modal_content = document.querySelector("#modal_content");

const anglesToProducts = [
  { angle: 60, product: "5% 할인쿠폰" },
  { angle: 120, product: "500 포인트" },
  { angle: 180, product: "10% 할인쿠폰" },
  { angle: 240, product: "100 포인트" },
  { angle: 300, product: "15% 할인쿠폰" },
  { angle: 360, product: "1000 포인트" },
];

const rouletter = {
  spinning: false,
  currentAngle: 0,
  speed: 600, // 초당 360도 회전 (1초에 한 바퀴)
  lastTime: performance.now(),

  random: () => {
    const min = Math.ceil(0);
    const max = Math.floor(5);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  spin: function () {
    if (!this.spinning) return;
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000; // 초 단위로 변환
    this.lastTime = currentTime;
    this.currentAngle += this.speed * deltaTime;
    panel.style.transform = `translateX(-50%) rotate(${this.currentAngle}deg)`;
    requestAnimationFrame(() => this.spin());
  },

  start: function () {
    if (this.spinning) return;
    this.spinning = true;
    this.lastTime = performance.now();
    this.spin();
    btn.innerText = "Stop!";
  },

  stop: function () {
    if (!this.spinning) return;
    this.spinning = false;

    // 현재 각도를 360으로 나눈 나머지로 정규화
    const normalizedAngle = this.currentAngle % 360 || 360; // 0도는 360으로 처리

    // 가장 가까운 60도 단위 각도 계산 (상단 기준)
    const sectionIndex = Math.floor(normalizedAngle / 60) % 6; // 30도 정도 보정하여 섹션을 정확하게 계산

    const targetAngle = sectionIndex * 60; // 해당 섹션의 각도 (1~6 섹션)

    this.currentAngle = targetAngle; // 최종 각도 저장

    // 멈춘 각도에 해당하는 상품을 찾기
    const selectedProduct = anglesToProducts.find(
      (item) => item.angle === targetAngle
    );

    // 상품이 결정되면 alert로 표시
    alert(`${selectedProduct.product}에 당첨되었습니다!`);

    setTimeout(() => {
      /* modal open event */
      modal_content.innerText = `${selectedProduct.product}`;
      event_modal_section.classList.add("active");
      document.body.style.overflow = "hidden";
    }, 200);

    // 모달 닫기 이벤트
    modal_btn.addEventListener("click", () => {
      event_modal_section.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    // 1초 후 "end"버튼 텍스트로 변경
    setTimeout(() => {
      btn.innerText = "end";
      btn.style.background = "#ff9900";
      btn.style.pointerEvents = "none"; // 1초 뒤 마우스 이벤트 비활성화
    }, 200);
  },
};

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.tagName === "BUTTON") {
    target.innerText === "Start!" ? rouletter.start() : rouletter.stop();
  }
});

/* event timer */

const event_timer = document.querySelector(".event_timer");

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
let remainingSeconds = SEVEN_DAYS_IN_SECONDS;

// 초를 일, 시, 분, 초로 변환하는 함수
function formatTime(seconds) {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = seconds % 60;

  return `${days}일 ${String(hours).padStart(2, "0")} : ${String(
    minutes
  ).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
}

function updateTimer() {
  // 남은 시간 표시
  event_timer.textContent = formatTime(remainingSeconds);

  if (remainingSeconds <= 0) {
    remainingSeconds = SEVEN_DAYS_IN_SECONDS;
  }

  remainingSeconds--;
}

setInterval(updateTimer, 1000);

updateTimer();

// // event_banner event
// const banner_item = document.querySelector("#product_banner_img");
// const banner_track = document.querySelector("#product_banner_imginner");
// const banner_item_clone = banner_item.cloneNode(true);
// product_banner_imginner.appendChild(banner_item_clone);

// const setAnimationDuration = () => {
//   const itemWidth = banner_item.offsetWidth;
//   const cloneWidth = banner_item_clone.offsetWidth;
//   const totalWidth = itemWidth + cloneWidth;

//   const duration = totalWidth / 100; // 속도 = px/sec
//   banner_track.style.animationDuration = `${duration}s`;
// };

// setAnimationDuration();
