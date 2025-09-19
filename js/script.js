// --- Skill Bar 애니메이션 ---
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill-fill");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.dataset.percent;
        bar.style.width = percent + "%";
        let span = bar.querySelector("span");
        let count = 0;
        let interval = setInterval(() => {
          if (count >= percent) clearInterval(interval);
          span.textContent = count + "%";
          count++;
        }, 15);
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  skills.forEach(skill => observer.observe(skill));
});

// --- 별 배경 & 움직임 ---
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];

  // 흰색 점 별
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      color: 'white'
    });
  }

  // 노란 작은 별
  for (let i = 0; i < 20; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 2 + Math.random() * 2,
      alpha: Math.random(),
      delta: 0.02 + Math.random() * 0.03,
      color: 'yellow'
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color === 'yellow'
      ? `rgba(255, 223, 0, ${s.alpha})`
      : `rgba(255, 255, 255, ${s.alpha})`;
    ctx.fill();

    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;

    // 흰색 점 별만 살짝 움직임
    if (s.color === 'white') {
      s.x += s.dx;
      s.y += s.dy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;
    }
  }

  requestAnimationFrame(drawStars);
}
window.addEventListener('resize', initStars);
initStars();
drawStars();

// --- 랜덤 글자 등장 효과 ---
const floatItems = document.querySelectorAll(".float-item");
const container = document.querySelector(".home-banner");

function initFloatItems() {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const leftLimit = containerWidth * 0.1;  // 왼쪽 10% 여백
  const rightLimit = containerWidth * 0.9; // 오른쪽 10% 여백

  floatItems.forEach(item => {
    let x, y;

    do {
      // 중앙 텍스트 피하고, 좌우 10% 여백 확보
      x = leftLimit + Math.random() * (rightLimit - leftLimit);
      y = Math.random() * containerHeight;
    } while (
      x > containerWidth / 2 - 250 && x < containerWidth / 2 + 250 &&
      y > containerHeight / 2 - 100 && y < containerHeight / 2 + 100
    );

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    const moveY = 15 + Math.random() * 15; // 위아래 웨이브 범위

    item.animate([
      { transform: 'translateY(0px)' },
      { transform: `translateY(-${moveY}px)` },
      { transform: 'translateY(0px)' },
      { transform: `translateY(${moveY}px)` },
      { transform: 'translateY(0px)' }
    ], {
      duration: 3000 + Math.random() * 2000,
      iterations: Infinity,
      easing: 'ease-in-out'
    });
  });
}

initFloatItems();
