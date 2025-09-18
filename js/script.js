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
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02,
      dx: (Math.random()-0.5)*0.2,
      dy: (Math.random()-0.5)*0.2
    });
  }
}

function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >=1) s.delta *= -1;
    s.x += s.dx; s.y += s.dy;
    if (s.x<0) s.x=canvas.width;
    if (s.x>canvas.width) s.x=0;
    if (s.y<0) s.y=canvas.height;
    if (s.y>canvas.height) s.y=0;
  }
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize', initStars);
initStars();
drawStars();

// --- 랜덤 글자 등장 효과 ---
const floatItems = document.querySelectorAll(".float-item");
floatItems.forEach(item => {
  item.style.top = Math.random()*80 + "%";
  item.style.left = Math.random()*80 + "%";
  item.animate([
    { transform: 'translateY(0px)', opacity:1 },
    { transform: 'translateY(-40px)', opacity:0.6 },
    { transform: 'translateY(0px)', opacity:1 }
  ], {
    duration: 3000 + Math.random()*2000,
    iterations: Infinity,
    direction: 'alternate'
  });
});