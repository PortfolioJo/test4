// ===========================================
// Main Application - Gen Z Portfolio
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeSwitcher();
    initTypewriter();
    initCounterAnimation();
    initScrollAnimations();
    initTimeline();
    initCurrentYear();
    
    // Set initial theme
    setTimeout(() => {
        const savedTheme = localStorage.getItem('aseel-theme') || 'light';
        setTheme(savedTheme);
    }, 100);
});

// ===========================================
// Navigation
// ===========================================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===========================================
// Theme Switcher
// ===========================================

function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Get saved theme or use default
    const savedTheme = localStorage.getItem('aseel-theme') || 'light';
    setTheme(savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add flip animation
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            setTheme(newTheme);
            this.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('aseel-theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// ===========================================
// Typewriter Effect
// ===========================================

function initTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;
    
    // Reset animation for replay
    typewriter.style.animation = 'none';
    setTimeout(() => {
        typewriter.style.animation = '';
    }, 10);
    
    // Add cursor blink after animation completes
    setTimeout(() => {
        const lines = typewriter.querySelectorAll('.line1, .line2');
        lines.forEach(line => {
            line.style.borderRight = 'none';
        });
    }, 4500); // After all typing animations complete
}

// ===========================================
// Counter Animation
// ===========================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                        
                        // Add plus sign for millions
                        if (target >= 2) {
                            counter.textContent = target + '+';
                        }
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===========================================
// Scroll Animations
// ===========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .value-card, .service-card, .why-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            observer.observe(element);
        }, 100);
    });
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
        pointer-events: none;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===========================================
// Timeline Interaction
// ===========================================

function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add pulse animation
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// ===========================================
// Current Year
// ===========================================

function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===========================================
// Video Play Simulation
// ===========================================

document.addEventListener('click', function(e) {
    if (e.target.closest('.play-btn')) {
        const playBtn = e.target.closest('.play-btn');
        const videoThumb = playBtn.closest('.video-thumb');
        
        // Add playing animation
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        videoThumb.style.opacity = '0.7';
        
        // Simulate video playing for 3 seconds
        setTimeout(() => {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            videoThumb.style.opacity = '1';
            
            // Show notification
            showNotification('الفيديو قيد التشغيل! 🎬', 'info');
        }, 3000);
    }
});

// ===========================================
// Notification System
// ===========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.genz-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `genz-notification notification-${type}`;
    
    // Emoji based on type
    const emoji = type === 'info' ? '🎬' : '✨';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-emoji">${emoji}</span>
            <span class="notification-text">${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--accent-color);
        border-radius: 16px;
        padding: 1rem 1.25rem;
        z-index: 9999;
        animation: slideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 8px 32px rgba(255, 110, 199, 0.2);
        max-width: 320px;
        overflow: hidden;
    `;
    
    // Progress bar
    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        right: 0;
        height: 3px;
        background: var(--gradient-primary);
        width: 100%;
        animation: progress 3s linear forwards;
    `;
    
    // Add keyframes for progress animation
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes progress {
                from { width: 100% }
                to { width: 0% }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================================
// Smooth Scrolling
// ===========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.genz-nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================================
// Hover Effects Enhancement
// ===========================================

document.querySelectorAll('.project-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '';
    });
});

// ===========================================
// Contact Form Simulation
// ===========================================

document.addEventListener('submit', function(e) {
    if (e.target.closest('#contactForm') || e.target.closest('.cta-btn')) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]') || e.target.closest('.cta-btn');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success notification
            showNotification('تم الإرسال! 🎉 رح أتواصل معك خلال 24 ساعة', 'info');
            
            // Reset form if exists
            const form = e.target.closest('form');
            if (form) form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 2000);
    }
});