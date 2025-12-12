// ==========================================
// Navbar Scroll Effect
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// Active Navigation Link on Scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu after click
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ==========================================
// Skills Progress Bar Animation
// ==========================================
function animateProgressBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const progressBar = entry.target.querySelector('.progress-fill');
                const progress = entry.target.querySelector('.progress-bar-custom').getAttribute('data-progress');
                
                if (progressBar && progress) {
                    progressBar.style.width = progress + '%';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize progress bar animation
animateProgressBars();

// ==========================================
// Scroll to Top Button
// ==========================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Contact Form Handling with AJAX
// ==========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showMessage('Iltimos, barcha maydonlarni to\'ldiring.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Iltimos, to\'g\'ri email manzilini kiriting.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Yuborilmoqda...';
        
        // Prepare form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('_subject', subject);
        formData.append('message', message);
        formData.append('_captcha', 'false');
        
        try {
            // Send via AJAX
            const response = await fetch('https://formsubmit.co/ajax/adilbekallayarov27@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    _captcha: 'false'
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showMessage('✅ Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beraman.', 'success');
                contactForm.reset();
            } else {
                showMessage('❌ Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('❌ Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
        }
    });
}

function showMessage(text, type) {
    formMessage.innerHTML = `
        <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
            ${text}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        const alert = formMessage.querySelector('.alert');
        if (alert) {
            alert.classList.remove('show');
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 300);
        }
    }, 5000);
}

// ==========================================
// Animate Elements on Scroll
// ==========================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .contact-info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations
animateOnScroll();

// ==========================================
// Typing Effect for Hero Section (Optional)
// ==========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-content h2');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 100);
// }

// ==========================================
// Parallax Effect for Hero Section
// ==========================================
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    const scrollPosition = window.scrollY;
    
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// ==========================================
// Project Card Hover Effect Enhancement
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// Lazy Loading Images
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Add Cursor Effect (Optional Modern Touch)
// ==========================================
function createCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #4a90e2;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Uncomment to enable custom cursor
// createCursorEffect();

// ==========================================
// Console Message (Developer Easter Egg)
// ==========================================
console.log('%c👋 Hello, Developer!', 'font-size: 20px; color: #4a90e2; font-weight: bold;');
console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #666;');
console.log('%c💼 Check out my portfolio above!', 'font-size: 14px; color: #f39c12;');

// ==========================================
// Initialize All Functions on Page Load
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully! 🚀');
    
    // Add any initialization code here
    
    // Preload animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ==========================================
// Handle Window Resize
// ==========================================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate any dynamic positioning if needed
        console.log('Window resized, recalculating layout...');
    }, 250);
});
