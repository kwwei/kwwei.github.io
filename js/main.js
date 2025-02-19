// Intersection Observer for section animations
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Mouse follower animation
const follower = document.querySelector('.mouse-follower');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 8;
    mouseY = e.clientY - 8;
});

function animate() {
    const lag = 0.8;
    currentX += (mouseX - currentX) * lag;
    currentY += (mouseY - currentY) * lag;

    follower.style.transform = `translate(${currentX - 5}px, ${currentY - 5}px)`;

    requestAnimationFrame(animate);
}
animate();

// Hover effects
document.querySelectorAll('a, button, [data-hoverable]').forEach(element => {
    element.addEventListener('mouseenter', () => {
        follower.classList.add('hover');
        // Add slight position adjustment on hover
        mouseX += 2;
        mouseY += 2;
    });

    element.addEventListener('mouseleave', () => {
        follower.classList.remove('hover');
        // Reset position adjustment
        mouseX -= 2;
        mouseY -= 2;
    });
});

// Add nav hover effect
document.querySelectorAll('.main-nav a').forEach(element => {
    element.addEventListener('mouseenter', () => {
        follower.classList.add('nav-hover');
    });

    element.addEventListener('mouseleave', () => {
        follower.classList.remove('nav-hover');
    });
});


