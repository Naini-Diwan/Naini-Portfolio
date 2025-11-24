// ==================== COSMIC CANVAS (About Page Background) ====================
const cosmicCanvas = document.getElementById('cosmicCanvas');
if (cosmicCanvas) {
    const cosmicCtx = cosmicCanvas.getContext('2d');
    cosmicCanvas.width = window.innerWidth;
    cosmicCanvas.height = document.documentElement.scrollHeight;

    // Cosmic particles
    class CosmicParticle {
        constructor() {
            this.x = Math.random() * cosmicCanvas.width;
            this.y = Math.random() * cosmicCanvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.6 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > cosmicCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > cosmicCanvas.height) this.speedY *= -1;
        }

        draw() {
            cosmicCtx.fillStyle = `rgba(100, 150, 255, ${this.opacity})`;
            cosmicCtx.beginPath();
            cosmicCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            cosmicCtx.fill();
        }
    }

    const cosmicParticles = [];
    for (let i = 0; i < 150; i++) {
        cosmicParticles.push(new CosmicParticle());
    }

    function animateCosmic() {
        cosmicCtx.fillStyle = 'rgba(10, 22, 40, 0.05)';
        cosmicCtx.fillRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);
        
        cosmicParticles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animateCosmic);
    }

    animateCosmic();
}

// ==================== EQUATION CANVAS ====================
const eqCanvas = document.getElementById('equationCanvas');
if (eqCanvas) {
    const eqCtx = eqCanvas.getContext('2d');
    eqCanvas.width = window.innerWidth;
    eqCanvas.height = document.querySelector('.academic-section').offsetHeight;

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
            const y = Math.floor(i / 3) * 300 + 400;
            eqCtx.fillText(eq, x, y);
        });
    }

    drawEquations();
}

// ==================== FLASHLIGHT EFFECT ====================
const flashlight = document.querySelector('.flashlight');
const academicSection = document.querySelector('.academic-section');

if (flashlight && academicSection) {
    academicSection.addEventListener('mousemove', (e) => {
        const rect = academicSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        flashlight.style.left = (x - 150) + 'px';
        flashlight.style.top = (y - 150) + 'px';
    });
}

// ==================== WINDOW RESIZE ====================
window.addEventListener('resize', () => {
    if (cosmicCanvas) {
        cosmicCanvas.width = window.innerWidth;
        cosmicCanvas.height = document.documentElement.scrollHeight;
    }
    if (eqCanvas) {
        eqCanvas.width = window.innerWidth;
        eqCanvas.height = document.querySelector('.academic-section').offsetHeight;
        const eqCtx = eqCanvas.getContext('2d');
        eqCtx.clearRect(0, 0, eqCanvas.width, eqCanvas.height);
        drawEquations();
    }
});
