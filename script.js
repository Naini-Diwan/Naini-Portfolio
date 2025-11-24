// ==================== HERO CANVAS ANIMATION ====================
const heroCanvas = document.getElementById('heroCanvas');
const heroCtx = heroCanvas.getContext('2d');

heroCanvas.width = window.innerWidth;
heroCanvas.height = window.innerHeight;

// Animation states
let animationState = 0; // 0: wave, 1: basketball, 2: sketches
let stateTimer = 0;
const stateDuration = 180; // frames per state (3 seconds at 60fps)

// Particle system for cosmic background
class Particle {
    constructor() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > heroCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > heroCanvas.height) this.speedY *= -1;
    }

    draw() {
        heroCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        heroCtx.beginPath();
        heroCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        heroCtx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

// Wave function animation
function drawWaveFunction(time) {
    const centerX = heroCanvas.width * 0.7;
    const centerY = heroCanvas.height / 2;
    const amplitude = 80;
    const frequency = 0.02;

    heroCtx.strokeStyle = `rgba(0, 212, 255, ${0.6 + Math.sin(time * 0.05) * 0.3})`;
    heroCtx.lineWidth = 3;
    heroCtx.beginPath();

    for (let x = -200; x < 200; x += 2) {
        const y = amplitude * Math.sin(frequency * x + time * 0.1) * Math.exp(-Math.abs(x) / 150);
        const plotX = centerX + x;
        const plotY = centerY + y;
        
        if (x === -200) {
            heroCtx.moveTo(plotX, plotY);
        } else {
            heroCtx.lineTo(plotX, plotY);
        }
    }
    heroCtx.stroke();

    // Probability density
    heroCtx.fillStyle = 'rgba(168, 85, 247, 0.2)';
    heroCtx.beginPath();
    for (let x = -200; x < 200; x += 2) {
        const y = amplitude * Math.sin(frequency * x + time * 0.1) * Math.exp(-Math.abs(x) / 150);
        const plotX = centerX + x;
        const plotY = centerY + y;
        
        if (x === -200) {
            heroCtx.moveTo(plotX, plotY);
        } else {
            heroCtx.lineTo(plotX, plotY);
        }
    }
    heroCtx.lineTo(centerX + 200, centerY);
    heroCtx.lineTo(centerX - 200, centerY);
    heroCtx.closePath();
    heroCtx.fill();
}

// Basketball player animation
function drawBasketball(time) {
    const centerX = heroCanvas.width * 0.7;
    const centerY = heroCanvas.height / 2;
    
    // Simple basketball player silhouette
    const jumpHeight = Math.abs(Math.sin(time * 0.05)) * 100;
    
    // Player body
    heroCtx.fillStyle = 'rgba(0, 212, 255, 0.8)';
    heroCtx.beginPath();
    heroCtx.arc(centerX, centerY - 150 - jumpHeight, 20, 0, Math.PI * 2); // head
    heroCtx.fill();
    
    // Body
    heroCtx.fillRect(centerX - 15, centerY - 130 - jumpHeight, 30, 60);
    
    // Arms (reaching up)
    heroCtx.fillRect(centerX - 40, centerY - 120 - jumpHeight, 25, 10);
    heroCtx.fillRect(centerX + 15, centerY - 120 - jumpHeight, 25, 10);
    
    // Legs
    heroCtx.fillRect(centerX - 15, centerY - 70 - jumpHeight, 12, 40);
    heroCtx.fillRect(centerX + 3, centerY - 70 - jumpHeight, 12, 40);
    
    // Basketball
    const ballY = centerY - 200 - jumpHeight - Math.abs(Math.sin(time * 0.08)) * 50;
    heroCtx.strokeStyle = 'rgba(255, 140, 0, 0.9)';
    heroCtx.fillStyle = 'rgba(255, 140, 0, 0.6)';
    heroCtx.lineWidth = 2;
    heroCtx.beginPath();
    heroCtx.arc(centerX, ballY, 15, 0, Math.PI * 2);
    heroCtx.fill();
    heroCtx.stroke();
    
    // Jersey number 24
    heroCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    heroCtx.font = 'bold 16px Inter';
    heroCtx.fillText('24', centerX - 8, centerY - 105 - jumpHeight);
    
    // Hoop
    heroCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    heroCtx.lineWidth = 3;
    heroCtx.beginPath();
    heroCtx.arc(centerX + 150, centerY - 150, 30, 0, Math.PI);
    heroCtx.stroke();
    heroCtx.strokeRect(centerX + 145, centerY - 150, 10, 60);
}

// Sketches animation
function drawSketches(time) {
    const centerX = heroCanvas.width * 0.7;
    const centerY = heroCanvas.height / 2;
    
    const rotation = time * 0.02;
    
    // Multiple floating sketch frames
    for (let i = 0; i < 3; i++) {
        const angle = rotation + (i * Math.PI * 2 / 3);
        const radius = 120;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        heroCtx.save();
        heroCtx.translate(x, y);
        heroCtx.rotate(angle);
        
        // Frame
        heroCtx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
        heroCtx.lineWidth = 3;
        heroCtx.strokeRect(-40, -50, 80, 100);
        
        // Simple sketch content (abstract lines)
        heroCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        heroCtx.lineWidth = 1;
        heroCtx.beginPath();
        heroCtx.moveTo(-30, -30);
        heroCtx.lineTo(30, -20);
        heroCtx.moveTo(-20, 0);
        heroCtx.lineTo(25, 10);
        heroCtx.moveTo(-25, 20);
        heroCtx.lineTo(20, 30);
        heroCtx.stroke();
        
        heroCtx.restore();
    }
    
    // Pencil icon
    heroCtx.fillStyle = 'rgba(0, 212, 255, 0.7)';
    heroCtx.fillRect(centerX - 5, centerY - 60, 10, 80);
    heroCtx.beginPath();
    heroCtx.moveTo(centerX, centerY - 70);
    heroCtx.lineTo(centerX - 8, centerY - 60);
    heroCtx.lineTo(centerX + 8, centerY - 60);
    heroCtx.closePath();
    heroCtx.fill();
}

// Main animation loop
let heroTime = 0;
function animateHero() {
    heroCtx.fillStyle = 'rgba(10, 22, 40, 0.1)';
    heroCtx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
    
    // Draw particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    // Cycle through animations
    stateTimer++;
    if (stateTimer >= stateDuration) {
        stateTimer = 0;
        animationState = (animationState + 1) % 3;
    }
    
    // Draw current animation state
    switch(animationState) {
        case 0:
            drawWaveFunction(heroTime);
            break;
        case 1:
            drawBasketball(heroTime);
            break;
        case 2:
            drawSketches(heroTime);
            break;
    }
    
    heroTime++;
    requestAnimationFrame(animateHero);
}

animateHero();

// ==================== EQUATION CANVAS (Academic Section) ====================
const eqCanvas = document.getElementById('equationCanvas');
const eqCtx = eqCanvas.getContext('2d');

eqCanvas.width = window.innerWidth;
eqCanvas.height = document.querySelector('.academic-section').offsetHeight;

// Draw Schrödinger equation faintly
function drawEquations() {
    eqCtx.fillStyle = 'rgba(0, 212, 255, 0.03)';
    eqCtx.font = '48px serif';
    
    const equations = [
        'iℏ∂ψ/∂t = Ĥψ',
        'E = mc²',
        '∇²ψ + k²ψ = 0',
        '⟨x⟩ = ∫ψ*xψ dx',
        'Ŝ² |s,m⟩ = ℏ²s(s+1)|s,m⟩'
    ];
    
    equations.forEach((eq, i) => {
        const x = (i % 3) * 400 + 100;
        const y = Math.floor(i / 3) * 300 + 200;
        eqCtx.fillText(eq, x, y);
    });
}

drawEquations();

// Flashlight effect
const flashlight = document.querySelector('.flashlight');
const academicSection = document.querySelector('.academic-section');

academicSection.addEventListener('mousemove', (e) => {
    const rect = academicSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    flashlight.style.left = (x - 150) + 'px';
    flashlight.style.top = (y - 150) + 'px';
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.poem-item').forEach(poem => {
    observer.observe(poem);
});

// ==================== WINDOW RESIZE ====================
window.addEventListener('resize', () => {
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;
    
    eqCanvas.width = window.innerWidth;
    eqCanvas.height = document.querySelector('.academic-section').offsetHeight;
    drawEquations();
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
