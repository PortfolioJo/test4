// ===========================================
// Main Application - Neo-Editorial Portfolio
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeSwitcher();
    initSmoothScrolling();
    initScrollAnimations();
    initFormValidation();
    initVideoPlayers();
    initCounterAnimation();
    initTimelineAnimations();
    
    // Set initial theme
    const savedTheme = localStorage.getItem('aseel-editorial-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// ===========================================
// Theme Switcher
// ===========================================

function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Update icon based on current theme
    updateThemeIcon();
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Apply transition effect
        document.body.style.opacity = '0.9';
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('aseel-editorial-theme', newTheme);
            
            // Update icon
            updateThemeIcon();
            
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.3s ease';
        }, 150);
        
        // Add rotation effect
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0)';
        }, 300);
    });
    
    function updateThemeIcon() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            themeIcon.classList.remove('fa-adjust');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-adjust');
        }
    }
}

// ===========================================
// Smooth Scrolling
// ===========================================

function initSmoothScrolling() {
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.editorial-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', debounce(function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            updateActiveNavLink(currentSection);
        }
    }, 100));
    
    function updateActiveNavLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ===========================================
// Scroll Animations
// ===========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.why-card, .project-card, .strip-item, .package-card, .testimonial-card, .formula-step'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observe element
        observer.observe(element);
        
        // Add animated class handler
        element.addEventListener('animationstart', function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, var(--color-accent), var(--color-mint));
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
// Form Validation
// ===========================================

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate
            let isValid = true;
            const requiredFields = ['name', 'email', 'message'];
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    showFormError(input, 'This field is required');
                } else {
                    clearFormError(input);
                }
            });
            
            // Validate email format
            const emailInput = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && !emailRegex.test(emailInput.value)) {
                isValid = false;
                showFormError(emailInput, 'Please enter a valid email');
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.querySelector('span').textContent;
                submitBtn.querySelector('span').textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Reset all form labels
                    const labels = this.querySelectorAll('label');
                    labels.forEach(label => {
                        label.style.top = '0.75rem';
                        label.style.fontSize = '0.95rem';
                        label.style.color = 'var(--text-tertiary)';
                    });
                }, 1500);
            }
        });
        
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    showFormError(this, 'This field is required');
                } else {
                    clearFormError(this);
                }
                
                // Special validation for email
                if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        showFormError(this, 'Please enter a valid email');
                    }
                }
            });
            
            input.addEventListener('focus', function() {
                clearFormError(this);
            });
        });
    }
    
    function showFormError(input, message) {
        clearFormError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            position: absolute;
            bottom: -1.5rem;
            left: 0;
            font-size: 0.75rem;
            color: #ff6b6b;
        `;
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(errorElement);
        input.style.borderBottomColor = '#ff6b6b';
    }
    
    function clearFormError(input) {
        const existingError = input.parentElement.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderBottomColor = '';
    }
}

// ===========================================
// Video Players
// ===========================================

function initVideoPlayers() {
    const playButtons = document.querySelectorAll('.player-overlay');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const player = this.closest('.project-media');
            const playIcon = this.querySelector('i');
            
            // Toggle play state
            if (this.classList.contains('playing')) {
                // Pause
                this.classList.remove('playing');
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                
                // Remove overlay effect
                this.style.background = 'rgba(13, 15, 17, 0.4)';
                
                // Show notification
                showNotification('Video paused', 'info');
            } else {
                // Play
                this.classList.add('playing');
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                
                // Add playing effect
                this.style.background = 'rgba(13, 15, 17, 0.7)';
                
                // Simulate video playing
                simulateVideoPlayback(this);
                
                // Show notification
                showNotification('Now playing: Project showcase', 'info');
            }
        });
    });
    
    function simulateVideoPlayback(element) {
        // Simulate 5 seconds of playback
        setTimeout(() => {
            if (element.classList.contains('playing')) {
                element.classList.remove('playing');
                const playIcon = element.querySelector('i');
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                element.style.background = 'rgba(13, 15, 17, 0.4)';
                
                showNotification('Video completed', 'success');
            }
        }, 5000);
    }
}

// ===========================================
// Counter Animation
// ===========================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(element) {
        const target = parseFloat(element.textContent.replace('+', ''));
        const duration = 2000;
        const steps = 60;
        const increment = target / (duration / steps);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, duration / steps);
    }
}

// ===========================================
// Timeline Animations
// ===========================================

function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach((item, index) => {
        // Set initial state with staggered delay
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(item);
    });
}

// ===========================================
// Notification System
// ===========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.editorial-notification');
    existingNotifications.forEach(notification => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    const notification = document.createElement('div');
    notification.className = `editorial-notification notification-${type}`;
    
    // Icon based on type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-medium);
        padding: 1rem 1.25rem;
        z-index: 9999;
        animation: slideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: var(--shadow-medium);
        max-width: 320px;
        overflow: hidden;
    `;
    
    // Add mint accent border for success
    if (type === 'success') {
        notification.style.borderLeft = `3px solid var(--color-mint)`;
    }
    
    // Progress bar
    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background: var(--color-mint);
        width: 100%;
        animation: progress 3s linear forwards;
    `;
    
    // Add animation styles if not already added
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
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Close on click
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => this.remove(), 300);
    });
}

// ===========================================
// Hover Effects Enhancement
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.editorial-btn, .whatsapp-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `translate(${deltaX * 2}px, ${deltaY * 2}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.backgroundPosition = `center ${rate}px`;
        });
    }
});