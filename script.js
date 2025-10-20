const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 6 - 3,
        alpha: 1,
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= 0.01;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.fillStyle = `rgba(${this.color}, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

let fireworks = [];

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach(f => { f.update(); f.draw(); });
  fireworks = fireworks.filter(f => f.particles.length > 0);
  requestAnimationFrame(animate);
}

setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const color = `${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)}`;
  fireworks.push(new Firework(x, y, color));
}, 500);

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
