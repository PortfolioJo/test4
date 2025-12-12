// ===========================================
// Main Application - Innovative Portfolio
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initIdentitySnapshot();
    initCreativeMap();
    initImpactGallery();
    initIngredients();
    initComparisonWall();
    initCollabSimulator();
    initFormSubmission();
    initScrollAnimations();
    initThemeToggle();
    initParallaxEffects();
    
    console.log("✨ Portfolio initialized with innovative sections");
});

// ===========================================
// Identity Snapshot
// ===========================================

function initIdentitySnapshot() {
    const snapshot = document.querySelector('.identity-snapshot');
    const statusDot = document.querySelector('.status-dot');
    
    // Add floating animation
    setInterval(() => {
        snapshot.style.transform = `translateY(${Math.sin(Date.now() / 2000) * 5}px)`;
    }, 50);
    
    // Pulsing dot animation
    setInterval(() => {
        statusDot.style.transform = `scale(${1 + Math.sin(Date.now() / 500) * 0.2})`;
    }, 50);
    
    // Interactive snapshot
    snapshot.addEventListener('click', function() {
        this.classList.toggle('expanded');
        showNotification('Creator mode activated! 🚀', 'info');
    });
}

// ===========================================
// Creative Map Timeline
// ===========================================

function initCreativeMap() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const videoPreviews = document.querySelectorAll('.video-preview');
    
    // Hover effects for timeline points
    timelinePoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.02)';
            
            // Highlight the point
            const circle = this.querySelector('.point-circle');
            circle.style.background = 'var(--gradient-primary)';
            circle.style.borderColor = 'transparent';
            
            const icon = this.querySelector('.point-icon');
            icon.style.color = 'var(--color-black)';
            
            // Play subtle animation
            this.style.animation = 'glitch 0.3s steps(4, end)';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            
            const circle = this.querySelector('.point-circle');
            circle.style.background = '';
            circle.style.borderColor = '';
            
            const icon = this.querySelector('.point-icon');
            icon.style.color = '';
        });
    });
    
    // Video preview interactions
    videoPreviews.forEach(preview => {
        preview.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const step = this.closest('.timeline-point').getAttribute('data-step');
            const steps = {
                1: "Creative spark moment",
                2: "Quick script writing",
                3: "Mood board creation",
                4: "Intentional filming",
                5: "Rhythmic editing",
                6: "Final delivery"
            };
            
            showVideoModal(steps[step]);
            
            // Play animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// ===========================================
// Impact Gallery Carousel
// ===========================================

function initImpactGallery() {
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const cinemaFrames = document.querySelectorAll('.cinema-frame');
    
    let currentSlide = 0;
    const totalSlides = cinemaFrames.length;
    const slideWidth = cinemaFrames[0].offsetWidth + 32; // Including gap
    
    // Update carousel position
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update frame styles
        cinemaFrames.forEach((frame, index) => {
            if (index === currentSlide) {
                frame.style.opacity = '1';
                frame.style.transform = 'scale(1.02)';
                frame.style.zIndex = '2';
            } else {
                frame.style.opacity = '0.7';
                frame.style.transform = 'scale(0.98)';
                frame.style.zIndex = '1';
            }
        });
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
        playSlideTransition();
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
        playSlideTransition();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
            playSlideTransition();
        });
    });
    
    // Video overlay clicks
    document.querySelectorAll('.video-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            const frame = this.closest('.cinema-frame');
            const title = frame.querySelector('.screen-title').textContent;
            showVideoModal(title);
        });
    });
    
    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Initial update
    updateCarousel();
    
    function playSlideTransition() {
        carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            carouselTrack.style.transition = '';
        }, 500);
    }
}

// ===========================================
// Ingredients Interactions
// ===========================================

function initIngredients() {
    const ingredientCards = document.querySelectorAll('.ingredient-card');
    const videoThumbs = document.querySelectorAll('.video-thumb');
    
    // Hover effects for ingredient cards
    ingredientCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const ingredientName = this.querySelector('.ingredient-name').textContent;
            
            // Add floating effect
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            
            // Glow effect
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 170, 0.3)';
            
            // Play sound (simulated)
            playSoundEffect('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Video thumb interactions
    videoThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const card = this.closest('.ingredient-card');
            const ingredientName = card.querySelector('.ingredient-name').textContent;
            
            // Play animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Show ingredient demo
            showIngredientDemo(ingredientName);
        });
    });
}

// ===========================================
// Comparison Wall
// ===========================================

function initComparisonWall() {
    const wallScreens = document.querySelectorAll('.wall-screen');
    const comparisonItems = document.querySelectorAll('.comparison-item');
    
    // Screen hover effects
    wallScreens.forEach(screen => {
        screen.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-lg)';
            
            // Add glow effect
            if (this.classList.contains('left-screen')) {
                this.style.boxShadow = '0 20px 40px rgba(255, 77, 141, 0.3)';
            } else {
                this.style.boxShadow = '0 20px 40px rgba(0, 212, 170, 0.3)';
            }
        });
        
        screen.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Comparison item interactions
    comparisonItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const before = this.querySelector('.item-before');
            const after = this.querySelector('.item-after');
            
            before.style.transform = 'translateX(-5px)';
            after.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            const before = this.querySelector('.item-before');
            const after = this.querySelector('.item-after');
            
            before.style.transform = 'translateX(0)';
            after.style.transform = 'translateX(0)';
        });
        
        item.addEventListener('click', function() {
            // Show detailed comparison
            const beforeText = this.querySelector('.item-before .item-label').textContent;
            const afterText = this.querySelector('.item-after .item-label').textContent;
            
            showComparisonDetail(beforeText, afterText);
        });
    });
}

// ===========================================
// Collab Simulator Wizard
// ===========================================

function initCollabSimulator() {
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const optionBtns = document.querySelectorAll('.option-btn');
    const prevBtn = document.querySelector('.prev-step');
    const nextBtn = document.querySelector('.next-btn');
    const stepDots = document.querySelectorAll('.step-dot');
    const resultContent = document.querySelector('.result-content');
    
    let currentStep = 1;
    const totalSteps = wizardSteps.length;
    const userSelections = {
        type: '',
        pace: '',
        duration: '',
        mood: ''
    };
    
    // Initialize wizard
    updateWizard();
    
    // Option button clicks
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const step = this.closest('.wizard-step').getAttribute('data-step');
            const value = this.getAttribute('data-value');
            
            // Remove selection from other buttons in this step
            const stepOptions = this.closest('.step-options').querySelectorAll('.option-btn');
            stepOptions.forEach(option => {
                option.classList.remove('selected');
            });
            
            // Select this button
            this.classList.add('selected');
            
            // Store selection
            switch(step) {
                case '1': userSelections.type = this.querySelector('span').textContent; break;
                case '2': userSelections.pace = this.querySelector('span').textContent; break;
                case '3': userSelections.duration = this.querySelector('span').textContent; break;
                case '4': userSelections.mood = this.querySelector('span').textContent; break;
            }
            
            // Auto-advance after selection
            setTimeout(() => {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateWizard();
                } else {
                    generateResult();
                }
            }, 300);
        });
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateWizard();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateWizard();
        }
    });
    
    function updateWizard() {
        // Show current step
        wizardSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === currentStep) {
                step.classList.add('active');
            }
        });
        
        // Update step dots
        stepDots.forEach((dot, index) => {
            dot.classList.toggle('active', index < currentStep);
        });
        
        // Update navigation buttons
        prevBtn.disabled = currentStep === 1;
        nextBtn.textContent = currentStep === totalSteps ? 'Generate Recipe' : 'Next';
        
        // Hide result if going back
        if (currentStep < totalSteps) {
            resultContent.classList.add('hidden');
        }
    }
    
    function generateResult() {
        // Update result display
        document.getElementById('result-type').textContent = userSelections.type || '—';
        document.getElementById('result-pace').textContent = userSelections.pace || '—';
        document.getElementById('result-duration').textContent = userSelections.duration || '—';
        document.getElementById('result-mood').textContent = userSelections.mood || '—';
        
        // Show result
        resultContent.classList.remove('hidden');
        
        // Animation
        resultContent.style.animation = 'fadeIn 0.5s ease';
        
        // Play celebration effect
        playCelebrationEffect();
        
        // Show notification
        showNotification('Content recipe generated! 🎉', 'success');
    }
}

// ===========================================
// Form Submission
// ===========================================

function initFormSubmission() {
    const projectInput = document.querySelector('.project-input');
    const submitBtn = document.querySelector('.submit-story');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const emailBtn = document.querySelector('.email-btn');
    
    // Project input animation
    projectInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-5px)';
    });
    
    projectInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
    
    // Submit button click
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const message = projectInput.value.trim();
        
        if (!message) {
            showNotification('Please tell me about your project first! ✨', 'info');
            projectInput.focus();
            return;
        }
        
        // Show loading state
        const originalText = this.querySelector('span').textContent;
        this.querySelector('span').textContent = 'Sending...';
        this.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            showNotification('Message sent! I\'ll reply within 2 hours. 🚀', 'success');
            
            // Reset form
            projectInput.value = '';
            this.querySelector('span').textContent = originalText;
            this.disabled = false;
            
            // Play success animation
            playSuccessAnimation();
        }, 1500);
    });
    
    // WhatsApp button
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Opening WhatsApp... Let\'s chat! 💬', 'info');
        
        // Simulate opening WhatsApp
        setTimeout(() => {
            window.open('https://wa.me/1234567890', '_blank');
        }, 500);
    });
    
    // Email button
    emailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Opening email composer... 📧', 'info');
        
        // Simulate opening email
        setTimeout(() => {
            window.location.href = 'mailto:hello@aseelcreative.com?subject=Let\'s Create Together&body=Hi Aseel, I\'d like to discuss a project...';
        }, 500);
    });
}

// ===========================================
// Scroll Animations
// ===========================================

function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const identitySnapshot = document.querySelector('.identity-snapshot');
    
    // Intersection Observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add specific animations based on section
                const sectionId = entry.target.id || entry.target.className.split(' ')[0];
                playSectionAnimation(sectionId);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        // Set initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observe section
        observer.observe(section);
    });
    
    // Update identity snapshot on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for identity snapshot
        identitySnapshot.style.transform = `translateY(${scrolled * 0.1}px)`;
        
        // Change snapshot status based on scroll position
        if (scrolled > 500) {
            identitySnapshot.querySelector('.status-text').textContent = 'Creator Mode: INSPIRED';
            identitySnapshot.querySelector('.status-dot').style.background = 'var(--color-secondary)';
        } else {
            identitySnapshot.querySelector('.status-text').textContent = 'Creator Mode: ON';
            identitySnapshot.querySelector('.status-dot').style.background = 'var(--color-primary)';
        }
    });
}

// ===========================================
// Theme Toggle
// ===========================================

function initThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('aseel-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        color: var(--text-primary);
        font-size: 1.25rem;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply transition effect
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('aseel-theme', newTheme);
            
            document.body.style.opacity = '1';
            
            // Update button icon
            const icon = this.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            
            // Show notification
            showNotification(`Switched to ${newTheme} mode`, 'info');
        }, 200);
        
        // Button animation
        this.style.transform = 'rotate(180deg) scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'rotate(0) scale(1)';
        }, 300);
    });
    
    // Update button icon based on initial theme
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===========================================
// Parallax Effects
// ===========================================

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.intro-canvas, .create-visual, .canvas-grid, .visual-grid');
    
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('intro-canvas') ? 0.02 : 
                         element.classList.contains('create-visual') ? 0.03 : 0.01;
            
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ===========================================
// Helper Functions
// ===========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.portfolio-notification');
    existing.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `portfolio-notification notification-${type}`;
    
    // Icons based on type
    const icons = {
        info: 'fas fa-info-circle',
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem;
        z-index: 9999;
        animation: slideInRight 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: var(--shadow-lg);
        max-width: 320px;
        overflow: hidden;
    `;
    
    // Add accent border
    if (type === 'success') {
        notification.style.borderLeft = '3px solid var(--color-primary)';
    }
    
    // Progress bar
    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background: var(--gradient-primary);
        width: 100%;
        animation: progress 3s linear forwards;
    `;
    
    // Add animation styles if not present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
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
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => this.remove(), 300);
    });
}

function showVideoModal(title) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
                <h3>${title}</h3>
                <p>Preview playing...</p>
            </div>
            <div class="modal-video">
                <div class="video-player">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="modal-footer">
                <p>This is a preview of the creative process.</p>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        
        .modal-overlay {
            position: absolute;
            inset: 0;
            background: rgba(10, 10, 15, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            max-width: 600px;
            width: 100%;
            animation: modalAppear 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-full);
            width: 40px;
            height: 40px;
            color: var(--text-primary);
            cursor: pointer;
            z-index: 2;
        }
        
        .modal-header {
            padding: 2rem 2rem 1rem;
            text-align: center;
        }
        
        .modal-header h3 {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .modal-header p {
            color: var(--text-secondary);
        }
        
        .modal-video {
            padding: 0 2rem;
        }
        
        .video-player {
            aspect-ratio: 16/9;
            background: var(--gradient-primary);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .video-player i {
            font-size: 3rem;
            color: white;
        }
        
        .modal-footer {
            padding: 1rem 2rem 2rem;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        @keyframes modalAppear {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
    
    // Play video simulation
    const videoPlayer = modal.querySelector('.video-player');
    videoPlayer.addEventListener('click', function() {
        this.innerHTML = '<div class="playing-animation"></div>';
        
        // Simulate 5-second playback
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i><p>Preview complete!</p>';
            this.style.background = 'var(--gradient-secondary)';
        }, 5000);
    });
    
    function closeModal() {
        modal.style.animation = 'modalAppear 0.3s ease reverse forwards';
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 300);
    }
}

function playSoundEffect(type) {
    // In a real implementation, you would play actual sounds
    console.log(`Playing ${type} sound effect`);
    
    // Visual feedback instead of actual sound
    const visualFeedback = document.createElement('div');
    visualFeedback.className = 'sound-visual';
    visualFeedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
        opacity: 0;
        pointer-events: none;
        z-index: 9998;
        animation: soundWave 0.5s ease;
    `;
    
    document.body.appendChild(visualFeedback);
    
    setTimeout(() => {
        visualFeedback.remove();
    }, 500);
}

function playCelebrationEffect() {
    // Create confetti effect
    const colors = ['#00D4AA', '#6C63FF', '#FF4D8D', '#FF8E53'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            top: -20px;
            left: ${Math.random() * 100}vw;
            opacity: 0;
            pointer-events: none;
            z-index: 9998;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            {
                transform: `translateY(0) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Remove after animation
        animation.onfinish = () => confetti.remove();
    }
}

function playSuccessAnimation() {
    // Create success animation
    const successAnim = document.createElement('div');
    successAnim.className = 'success-animation';
    successAnim.innerHTML = '<i class="fas fa-check"></i>';
    successAnim.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 100px;
        height: 100px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        color: var(--color-black);
        z-index: 9998;
        pointer-events: none;
        animation: successPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    document.body.appendChild(successAnim);
    
    setTimeout(() => {
        successAnim.remove();
    }, 1000);
}

function playSectionAnimation(sectionId) {
    // Different animations for different sections
    const animations = {
        'story-intro': () => {
            const headline = document.querySelector('.intro-headline');
            headline.style.animation = 'fadeIn 0.8s ease';
        },
        'creative-map': () => {
            const points = document.querySelectorAll('.timeline-point');
            points.forEach((point, index) => {
                setTimeout(() => {
                    point.style.opacity = '0.7';
                }, index * 100);
            });
        },
        'impact-gallery': () => {
            const frames = document.querySelectorAll('.cinema-frame');
            frames.forEach((frame, index) => {
                setTimeout(() => {
                    frame.style.transform = 'scale(1)';
                }, index * 200);
            });
        }
    };
    
    if (animations[sectionId]) {
        animations[sectionId]();
    }
}

// Add missing CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes soundWave {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes successPop {
        0% {
            transform: translate(-50%, -50%) scale(0);
        }
        70% {
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(additionalStyles);

// Initialize
console.log("🎨 Innovative portfolio ready! All systems go.");