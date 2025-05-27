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

document.addEventListener('DOMContentLoaded', function() {
    const magnifyContainer = document.querySelector('.magnify-container');
    const magnifyingGlass = document.querySelector('.magnifying-glass');
    const img = magnifyContainer.querySelector('img');

    magnifyContainer.addEventListener('mousemove', function(e) {
        const bounds = magnifyContainer.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        // Calculate magnification position
        const magnifyX = (x / bounds.width) * 100;
        const magnifyY = (y / bounds.height) * 100;

        magnifyingGlass.style.opacity = '1';
        magnifyingGlass.style.left = `${x - 75}px`;
        magnifyingGlass.style.top = `${y - 75}px`;
        magnifyingGlass.style.backgroundImage = `url(${img.src})`;
        magnifyingGlass.style.backgroundPosition = `${magnifyX}% ${magnifyY}%`;
        magnifyingGlass.style.backgroundSize = `${bounds.width * 2}px`;
    });

    magnifyContainer.addEventListener('mouseleave', function() {
        magnifyingGlass.style.opacity = '0';
    });
});

// Sausage Dog Border Animation (SVG Segments)
const segTop = document.querySelector('.dog-body-top');
const segRight = document.querySelector('.dog-body-right');
const segBottom = document.querySelector('.dog-body-bottom');
const segLeft = document.querySelector('.dog-body-left');
const borderHead = document.querySelector('.dog-head');
const borderTail = document.querySelector('.dog-tail');

function setDogBorderByScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollMax = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const scrollPos = scrollContainer.scrollTop;
    const percent = scrollMax === 0 ? 0 : scrollPos / scrollMax;
    const thickness = 8;
    const w = window.innerWidth - thickness;
    const h = window.innerHeight - thickness;
    const total = 2 * (w + h);
    let fill = percent * total;

    // By default, connect head and tail
    if (fill <= 0) {
        segTop.style.left = '96px';
        segTop.style.top = '0px';
        segTop.style.width = '0px';
        segTop.style.height = thickness + 'px';
        borderTail.style.left = '96px';
        borderTail.style.top = '0px';
        borderTail.style.transform = 'rotate(0deg) scaleX(1)';
        // Hide other bars
        segRight.style.height = '0px';
        segBottom.style.width = '0px';
        segLeft.style.height = '0px';
        return;
    }

    // Top
    if (fill <= w - 96) {
        segTop.style.left = '96px';
        segTop.style.top = '0px';
        segTop.style.width = (fill > 0 ? fill : 0) + 'px';
        segTop.style.height = thickness + 'px';
        borderTail.style.left = (96 + fill) + 'px';
        borderTail.style.top = '0px';
        borderTail.style.transform = 'rotate(0deg) scaleX(1)'; // Default: horizontal
        // Hide other bars
        segRight.style.height = '0px';
        segBottom.style.width = '0px';
        segLeft.style.height = '0px';
    } else {
        segTop.style.left = '96px';
        segTop.style.top = '0px';
        segTop.style.width = (w - 96) + 'px';
        segTop.style.height = thickness + 'px';
        fill -= (w - 96);
        // Right
        if (fill <= h) {
            segRight.style.left = w + 'px';
            segRight.style.top = '0px';
            segRight.style.height = (fill > 0 ? fill : 0) + 'px';
            segRight.style.width = thickness + 'px';
            borderTail.style.left = (w - 80 - thickness) + 'px';
            borderTail.style.top = fill + 'px';
            borderTail.style.transform = 'rotate(90deg) scaleX(1)'; // Down
            // Hide other bars
            segBottom.style.width = '0px';
            segLeft.style.height = '0px';
        } else {
            segRight.style.left = w + 'px';
            segRight.style.top = '0px';
            segRight.style.height = h + 'px';
            segRight.style.width = thickness + 'px';
            fill -= h;
            // Bottom
            if (fill <= w) {
                segBottom.style.left = (w - fill) + 'px';
                segBottom.style.top = h + 'px';
                segBottom.style.width = (fill > 0 ? fill : 0) + 'px';
                segBottom.style.height = thickness + 'px';
                borderTail.style.left = (w - fill - 96) + 'px';
                borderTail.style.top = (h - 80 - thickness) + 'px';
                borderTail.style.transform = 'rotate(0deg) scaleX(-1)'; // Mirrored
                // Hide left bar
                segLeft.style.height = '0px';
            } else {
                segBottom.style.left = '0px';
                segBottom.style.top = h + 'px';
                segBottom.style.width = w + 'px';
                segBottom.style.height = thickness + 'px';
                fill -= w;
                // Left
                if (fill <= h) {
                    segLeft.style.left = '0px';
                    segLeft.style.top = (h - fill) + 'px';
                    segLeft.style.height = (fill > 0 ? fill : 0) + 'px';
                    segLeft.style.width = thickness + 'px';
                    borderTail.style.left = '0px';
                    borderTail.style.top = Math.max(0, h - fill - 96) + 'px';
                    borderTail.style.transform = 'rotate(90deg) scaleX(-1)'; // Up, mirrored
                } else {
                    segLeft.style.left = '0px';
                    segLeft.style.top = '0px';
                    segLeft.style.height = h + 'px';
                    segLeft.style.width = thickness + 'px';
                    // Tail at start (full loop)
                    borderTail.style.left = '96px';
                    borderTail.style.top = '0px';
                    borderTail.style.transform = 'rotate(0deg) scaleX(1)'; // Reset
                }
            }
        }
    }
}

window.addEventListener('resize', setDogBorderByScroll);
document.querySelector('.scroll-container').addEventListener('scroll', setDogBorderByScroll);
setDogBorderByScroll();


