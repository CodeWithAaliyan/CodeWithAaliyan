const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let starsArray = [];
let glowParticlesArray = [];

// 🟡 Small white stars
class Star {
  constructor(x, y, size, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedY = speedY;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.alphaChange = Math.random() * 0.02 + 0.005;
  }

  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) this.y = 0;
    this.alpha += this.alphaChange;
    if (this.alpha <= 0.2 || this.alpha >= 1) this.alphaChange *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 🌈 Big glowing colorful particles
class GlowParticle {
  constructor(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.alphaChange = Math.random() * 0.02 + 0.005;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    this.alpha += this.alphaChange;
    if (this.alpha <= 0.3 || this.alpha >= 1) this.alphaChange *= -1;
  }

  draw() {
    const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6);
    glow.addColorStop(0, `${this.color}`);
    glow.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  starsArray = [];
  glowParticlesArray = [];

  // 🌟 15 normal tiny stars
  for (let i = 0; i < 15; i++) {
    const size = Math.random() * 1.5 + 0.5;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedY = Math.random() * 0.05 + 0.02; // slow
    starsArray.push(new Star(x, y, size, speedY));
  }

  // 💫 15 big glowing colored particles
  const colors = [
    "rgba(0,255,255,0.9)",   // cyan
    "rgba(255,0,255,0.9)",   // magenta
    "rgba(255,255,0,0.9)",   // yellow
    "rgba(255,105,180,0.9)", // pink
    "rgba(173,216,230,0.9)", // light blue
  ];

  for (let i = 0; i < 15; i++) {
    const size = Math.random() * 6 + 6; // bigger glowing
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 0.1; // very slow
    const speedY = (Math.random() - 0.5) * 0.1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    glowParticlesArray.push(new GlowParticle(x, y, size, speedX, speedY, color));
  }
}

function animate() {
  // Background gradient
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 1.1
  );
  gradient.addColorStop(0, "rgba(0,0,25,0.6)");
  gradient.addColorStop(1, "rgba(0,0,5,0.9)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw stars and glow particles
  starsArray.forEach((star) => {
    star.update();
    star.draw();
  });

  ctx.globalCompositeOperation = "lighter";
  glowParticlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  ctx.globalCompositeOperation = "source-over";

  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
