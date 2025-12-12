// ===========================================
// Main Application - مع أنيميشنات خفيفة
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initThemeSwitcher();
    initLanguageSwitcher();
    initCurrentYear();
    initScrollAnimations();
    initHoverEffects();
    initProjectModal();
    initContactForm();
    initScrollProgress();
    
    // الدوال الجديدة
    initCustomCursor();
    initCanvasAnimation();
    initMasonryGrid();
    initSkillCharts();
    initSmartFilter();
    initTestimonialCarousel();
    initVideoPreviews();
    initStoryMode();
});

// ===========================================
// Navigation
// ===========================================

function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // إضافة أنيميشن للقائمة
            if (navMenu.classList.contains('active')) {
                navMenu.style.animation = 'slideInRight 0.3s ease-out';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // الانتقال السلس للقسم
                const targetId = href.substring(1);
                navigateToSection(targetId);
                
                // تحديث الرابط النشط مع أنيميشن
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    l.style.animation = 'none';
                });
                this.classList.add('active');
                this.style.animation = 'pulse 0.3s ease';
                
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // تحديث الروابط النشطة بناءً على التمرير
        updateActiveNavLink();
        lastScroll = currentScroll;
    });
    
    function navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || (href === '#hero' && currentSection === '')) {
                link.classList.add('active');
            }
        });
    }
}

// ===========================================
// Theme Switcher مع أنيميشن
// ===========================================

function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // الحصول على الثيم المحفوظ أو استخدام الافتراضي
    const savedTheme = localStorage.getItem('aseel-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // تبديل الثيم مع أنيميشن
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // إضافة أنيميشن للتحديق
        this.style.animation = 'rotate 0.5s ease';
        
        // تحديث الثيم بعد تأخير بسيط للأنيميشن
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('aseel-theme', newTheme);
            updateThemeIcon(newTheme);
            this.style.animation = '';
        }, 250);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}

// ===========================================
// Language Switcher مع أنيميشن
// ===========================================

function initLanguageSwitcher() {
    const langToggle = document.getElementById('languageToggle');
    const langTexts = document.querySelectorAll('.language-toggle__text');
    
    // الحصول على اللغة المحفوظة أو استخدام الافتراضي
    const savedLang = localStorage.getItem('aseel-lang') || 'en';
    setLanguage(savedLang);
    updateLangToggle(savedLang);
    
    // تبديل اللغة مع أنيميشن
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.getAttribute('lang') || 'en';
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        
        // إضافة أنيميشن للزر
        this.style.animation = 'rotate 0.5s ease';
        
        setTimeout(() => {
            setLanguage(newLang);
            updateLangToggle(newLang);
            localStorage.setItem('aseel-lang', newLang);
            this.style.animation = '';
        }, 250);
    });
    
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        updateTexts(lang);
        
        // تحديث الخط للعربية
        if (lang === 'ar') {
            document.documentElement.style.setProperty('--font-body', "'Noto Sans Arabic', sans-serif");
        } else {
            document.documentElement.style.setProperty('--font-body', "'Inter', sans-serif");
        }
        
        // إضافة أنيميشن لتغيير اللغة
        document.body.style.animation = 'fadeIn 0.3s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 300);
    }
    
    function updateLangToggle(lang) {
        langTexts.forEach(text => {
            text.classList.toggle('hidden');
        });
    }
}

// ===========================================
// Scroll Animations خفيفة وسريعة
// ===========================================

function initScrollAnimations() {
    // عناصر للمراقبة
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale, .scroll-observer'
    );
    
    // إنشاء مراقب IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // إزالة المراقبة بعد الظهور
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // مراقبة جميع العناصر
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // إضافة أنيميشن للعناصر عند التمرير
    window.addEventListener('scroll', function() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    });
}

// ===========================================
// Hover Effects مع أنيميشن
// ===========================================

function initHoverEffects() {
    // تأثيرات Hover للبطاقات
    const cards = document.querySelectorAll('.project-card, .service-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(198, 166, 103, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // تأثيرات Hover للأزرار
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // تأثيرات Hover للروابط الاجتماعية
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// ===========================================
// Project Modal
// ===========================================

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const projectViewBtns = document.querySelectorAll('.project-view-btn');
    
    // بيانات المشاريع
    const projects = {
        1: {
            category: 'Brand Identity',
            title: 'Luxury Fashion House',
            year: '2024',
            description: 'Complete visual identity for a high-end fashion brand blending heritage with modernity. The project involved creating a comprehensive brand system that works across digital and physical touchpoints.',
            tags: ['Logo Design', 'Visual Identity', 'Typography', 'Brand Guidelines'],
            imageClass: 'project-card__image--1'
        },
        2: {
            category: 'Web Design',
            title: 'Interactive Art Gallery',
            year: '2024',
            description: 'Digital platform for art exhibition with immersive user experience. The design focuses on creating a seamless journey through virtual exhibitions while maintaining the artistic integrity of each piece.',
            tags: ['UI/UX Design', 'Interaction', 'Digital Art', 'Web Development'],
            imageClass: 'project-card__image--2'
        },
        3: {
            category: 'Advertising',
            title: 'Premium Beverage Campaign',
            year: '2023',
            description: 'Comprehensive advertising campaign with professional photography. The campaign successfully positioned the brand as a premium lifestyle choice through strategic visual storytelling.',
            tags: ['Advertising', 'Photography', 'Marketing', 'Campaign Strategy'],
            imageClass: 'project-card__image--3'
        },
        4: {
            category: 'Packaging',
            title: 'Organic Skincare Line',
            year: '2024',
            description: 'Sustainable packaging design with natural elements and eco-friendly materials. The design reflects the brand\'s commitment to nature and sustainability while maintaining luxury appeal.',
            tags: ['Packaging Design', 'Sustainability', 'Illustration', 'Brand Strategy'],
            imageClass: 'project-card__image--4'
        },
        5: {
            category: 'Motion Design',
            title: 'Animated Brand Story',
            year: '2024',
            description: 'Motion graphics and animation for brand storytelling campaign. The animation brings the brand\'s values to life through fluid movement and emotional storytelling.',
            tags: ['Animation', 'Motion Design', 'Video Production', 'Storytelling'],
            imageClass: 'project-card__image--5'
        }
    };
    
    // فتح المودال عند النقر على زر المشروع
    projectViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // إغلاق المودال
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
    
    // إغلاق المودال بمفتاح Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openProjectModal(projectId) {
        const project = projects[projectId];
        const currentLang = document.documentElement.getAttribute('lang') || 'en';
        
        if (!project) return;
        
        // تحديث محتوى المودال
        document.getElementById('modalCategory').textContent = 
            currentLang === 'ar' ? 'الهوية البصرية' : project.category;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalYear').textContent = project.year;
        document.getElementById('modalDescription').textContent = project.description;
        
        // تحديث الوسوم
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.style.animation = 'fadeInScale 0.3s ease backwards';
            tagElement.style.animationDelay = `${Math.random() * 0.3}s`;
            tagsContainer.appendChild(tagElement);
        });
        
        // تحديث الصورة
        const modalImage = document.getElementById('modalImage');
        modalImage.className = 'modal__image';
        modalImage.classList.add(project.imageClass);
        
        // عرض المودال
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===========================================
// Contact Form
// ===========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على بيانات النموذج
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // إضافة أنيميشن للإرسال
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.style.animation = 'pulse 0.5s ease';
            
            // محاكاة الإرسال (في الواقع ستقوم بإرسال البيانات لخادم)
            setTimeout(() => {
                // عرض رسالة النجاح
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitBtn.style.animation = '';
                
                // إعادة تعيين التسميات
                const labels = this.querySelectorAll('label');
                labels.forEach(label => {
                    const input = this.querySelector(`#${label.getAttribute('for')}`);
                    if (input && !input.value) {
                        label.style.top = '0.75rem';
                        label.style.fontSize = '1rem';
                    }
                });
            }, 1000);
        });
    }
    
    // أنيميشن لتسميات النموذج
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', function() {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--color-accent-primary)';
                label.style.animation = 'fadeInScale 0.2s ease';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.top = '0.75rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--color-text-tertiary)';
                }
            });
            
            // التحقق عند التحميل
            if (input.value) {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--color-accent-primary)';
            }
        }
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
// Scroll Progress Bar
// ===========================================

function initScrollProgress() {
    // إنشاء شريط التقدم إذا لم يكن موجوداً
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary));
            z-index: 9999;
            transition: width 0.1s ease;
            pointer-events: none;
        `;
        document.body.appendChild(progressBar);
    }
    
    // تحديث شريط التقدم
    window.addEventListener('scroll', function() {
        const progressBar = document.querySelector('.scroll-progress');
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

// ===========================================
// Custom Cursor - مؤشر مخصص
// ===========================================

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // تغيير شكل المؤشر عند المرور على العناصر التفاعلية
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--color-accent-secondary)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--color-accent-primary)';
        });
    });
}

// ===========================================
// Canvas Background Animation - خلفية متحركة
// ===========================================

function initCanvasAnimation() {
    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-bg';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 0.1)`
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // ارتداد من الحواف
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // رسم الجسيمات
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // رسم خطوط بين الجسيمات القريبة
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(198, 166, 103, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateParticles();
    
    // تنظيف عند إغلاق الصفحة
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
}

// ===========================================
// Masonry Grid Layout - تخطيط شبكة ميسونري
// ===========================================

function initMasonryGrid() {
    const masonryGrids = document.querySelectorAll('.masonry-grid');
    
    masonryGrids.forEach(grid => {
        const items = Array.from(grid.children);
        
        // إعادة ترتيب العناصر عشوائيًا لشكل ميسونري
        items.sort(() => Math.random() - 0.5);
        
        // إزالة جميع العناصر
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        
        // إعادة إضافة العناصر بترتيب جديد
        items.forEach(item => {
            // إضافة ارتفاعات مختلفة للعناصر
            const randomHeight = Math.random() * 200 + 200;
            item.style.height = `${randomHeight}px`;
            grid.appendChild(item);
        });
    });
}

// ===========================================
// Skill Charts - مخططات المهارات
// ===========================================

function initSkillCharts() {
    const charts = document.querySelectorAll('.skill-chart');
    
    charts.forEach(chart => {
        const progress = chart.querySelector('.chart-progress');
        const valueElement = chart.querySelector('.chart-value');
        const targetValue = parseInt(progress.getAttribute('data-value'));
        let currentValue = 0;
        
        const radius = 54;
        const circumference = 2 * Math.PI * radius;
        
        // تعيين القيمة الأولية
        progress.style.strokeDasharray = circumference;
        progress.style.strokeDashoffset = circumference;
        
        // رسم المخطط تدريجيًا
        const drawChart = () => {
            if (currentValue < targetValue) {
                currentValue++;
                valueElement.textContent = currentValue + '%';
                
                const offset = circumference - (currentValue / 100) * circumference;
                progress.style.strokeDashoffset = offset;
                
                requestAnimationFrame(drawChart);
            }
        };
        
        // بدء الرسم عندما يكون العنصر مرئيًا
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(drawChart, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(chart);
    });
}

// ===========================================
// Smart Filter - الفلتر الذكي
// ===========================================

function initSmartFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // تطبيق الفلتر
            filterItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                    
                    // إضافة تأثير ظهور
                    item.style.animation = 'fadeInScale 0.5s ease';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    // إخفاء العنصر بعد الانتهاء من التأثير
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===========================================
// Testimonial Carousel - كاروسيل الشهادات
// ===========================================

function initTestimonialCarousel() {
    const carousels = document.querySelectorAll('.testimonial-carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.testimonial-track');
        const slides = Array.from(track.children);
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        let currentSlide = 0;
        const slideWidth = slides[0].getBoundingClientRect().width;
        
        // تعيين عرض المسار
        track.style.width = `${slideWidth * slides.length}px`;
        
        // تحديث الوضع
        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            
            // تحديث النقاط
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        };
        
        // النقاط التنقل
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });
        
        // التمرير التلقائي
        let autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }, 5000);
        
        // إيقاف التمرير التلقائي عند التمرير يدويًا
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            }, 5000);
        });
    });
}

// ===========================================
// Video Preview - معاينة الفيديو
// ===========================================

function initVideoPreviews() {
    const videoPreviews = document.querySelectorAll('.video-preview');
    
    videoPreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            
            // عرض مشغل الفيديو
            const videoModal = document.getElementById('videoPlayerModal');
            const videoPlayer = document.getElementById('videoPlayer');
            const videoClose = document.getElementById('videoPlayerClose');
            
            videoPlayer.src = videoSrc;
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // إغلاق المشغل
            const closeVideo = () => {
                videoModal.style.display = 'none';
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
                document.body.style.overflow = '';
            };
            
            videoClose.addEventListener('click', closeVideo);
            videoModal.querySelector('.modal__overlay').addEventListener('click', closeVideo);
            
            // إغلاق بمفتاح Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && videoModal.style.display === 'flex') {
                    closeVideo();
                }
            });
        });
    });
}

// ===========================================
// Story Mode Navigation - تنقل وضع القصة
// ===========================================

function initStoryMode() {
    const storySections = document.querySelectorAll('.story-section');
    const storyNav = document.querySelector('.story-nav');
    const storyClose = document.getElementById('storyClose');
    
    if (storySections.length > 0 && storyClose) {
        // إغلاق وضع القصة
        storyClose.addEventListener('click', () => {
            document.getElementById('projectStory').style.display = 'none';
            document.body.style.overflow = '';
        });
        
        // مراقبة التمرير في وضع القصة
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // تحديث التنقل
                    const index = Array.from(storySections).indexOf(entry.target);
                    updateStoryNav(index);
                }
            });
        }, { threshold: 0.3 });
        
        storySections.forEach(section => observer.observe(section));
        
        // إنشاء نقاط التنقل
        const dotsContainer = document.querySelector('.story-nav-dots');
        storySections.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'story-nav-dot';
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                scrollToStorySection(index);
            });
        });
    }
}

function scrollToStorySection(index) {
    const storySections = document.querySelectorAll('.story-section');
    const targetSection = storySections[index];
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function updateStoryNav(currentIndex) {
    const dots = document.querySelectorAll('.story-nav-dot');
    const progress = document.querySelector('.story-nav-progress');
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    
    if (progress) {
        const progressPercent = (currentIndex / (dots.length - 1)) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

// ===========================================
// Translations
// ===========================================

const translations = {
    en: {
        'nav.designer': 'Digital Designer',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.work': 'Work',
        'nav.skills': 'Skills',
        'nav.services': 'Services',
        'nav.gallery': 'Gallery',
        'nav.testimonials': 'Testimonials',
        'nav.contact': 'Contact',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'Digital Artistry',
        'hero.title': 'Graphic & Digital Designer',
        'hero.description': 'Crafting visual identities that blend minimalism, modern aesthetics, and emotional storytelling.',
        'hero.viewPortfolio': 'View Portfolio',
        'hero.startProject': 'Start a Project',
        'hero.explore': 'Explore',
        'about.title': 'Creative Philosophy',
        'about.subtitle': 'Where art meets purpose in digital form',
        'about.imageText': 'Visual Storyteller',
        'about.heading': 'Design with Intention',
        'about.description1': 'I specialize in transforming abstract concepts into compelling visual experiences that resonate with audiences. My approach combines artistic sensibility with strategic thinking.',
        'about.description2': 'With over 5 years of experience in digital design, I\'ve collaborated with brands worldwide to build distinctive visual identities and memorable user experiences.',
        'about.designerTitle': 'Digital Designer',
        'projects.title': 'Featured Work',
        'projects.subtitle': 'Selected projects showcasing design excellence',
        'projects.filter.all': 'All',
        'projects.filter.branding': 'Branding',
        'projects.filter.web': 'Web',
        'projects.filter.advertising': 'Advertising',
        'projects.project1.category': 'Brand Identity',
        'projects.project1.title': 'Luxury Fashion House',
        'projects.project1.description': 'Complete visual identity for a high-end fashion brand blending heritage with modernity',
        'projects.project2.category': 'Web Design',
        'projects.project2.title': 'Interactive Art Gallery',
        'projects.project2.description': 'Digital platform for art exhibition with immersive user experience',
        'projects.project3.category': 'Advertising',
        'projects.project3.title': 'Premium Beverage Campaign',
        'projects.project3.description': 'Comprehensive advertising campaign with professional photography',
        'projects.project4.category': 'Packaging',
        'projects.project4.title': 'Organic Skincare Line',
        'projects.project4.description': 'Sustainable packaging design with natural elements and eco-friendly materials',
        'projects.project5.category': 'Motion Design',
        'projects.project5.title': 'Animated Brand Story',
        'projects.project5.description': 'Motion graphics and animation for brand storytelling campaign',
        'projects.tags.logo': 'Logo Design',
        'projects.tags.identity': 'Visual Identity',
        'projects.tags.typography': 'Typography',
        'projects.tags.uiux': 'UI/UX Design',
        'projects.tags.interaction': 'Interaction',
        'projects.tags.digitalArt': 'Digital Art',
        'projects.tags.advertising': 'Advertising',
        'projects.tags.photography': 'Photography',
        'projects.tags.marketing': 'Marketing',
        'projects.tags.packaging': 'Packaging',
        'projects.tags.sustainability': 'Sustainability',
        'projects.tags.illustration': 'Illustration',
        'projects.tags.animation': 'Animation',
        'projects.tags.motion': 'Motion Design',
        'projects.tags.video': 'Video',
        'projects.viewCase': 'View Case Study',
        'skills.title': 'Expertise & Skills',
        'skills.subtitle': 'Mastering digital tools with artistic vision',
        'skills.category1': 'Design Tools',
        'skills.category2': 'Web Development',
        'skills.category3': 'UI/UX Design',
        'skills.tool1': 'Adobe Creative Suite',
        'skills.tool2': 'Frontend Technologies',
        'skills.tool3': 'User Experience',
        'services.title': 'Design Services',
        'services.subtitle': 'Transforming visions into visual realities',
        'services.service1.title': 'Web Design',
        'services.service1.description': 'Contemporary website designs that marry aesthetics with functionality, focusing on user experience and performance.',
        'services.service2.title': 'Brand Identity',
        'services.service2.description': 'Complete visual identity systems that express brand values and create memorable impressions.',
        'services.service3.title': 'Digital Art',
        'services.service3.description': 'Engaging visual content for social media that enhances brand presence and follows modern trends.',
        'gallery.title': 'Visual Gallery',
        'gallery.subtitle': 'A curated collection of artistic expressions',
        'gallery.item1': 'Abstract Design',
        'gallery.item2': 'Digital Print',
        'gallery.item3': 'Calligraphy Art',
        'gallery.item4': 'Digital Coloring',
        'gallery.item5': 'Geometric Design',
        'gallery.item6': 'Cinematic Art',
        'testimonials.title': 'Client Stories',
        'testimonials.subtitle': 'What partners say about our collaboration',
        'testimonials.text1': '"Aseel transformed our brand identity completely. The attention to detail and creative vision exceeded all expectations."',
        'testimonials.author1': 'Sarah Johnson',
        'testimonials.role1': 'Marketing Director, TechCorp',
        'testimonials.text2': '"Working with Aseel was a game-changer. The designs not only looked stunning but also improved our user engagement by 40%."',
        'testimonials.author2': 'Ahmed Al-Mansoor',
        'testimonials.role2': 'CEO, Artisan Studios',
        'testimonials.text3': '"The innovative approach and professional execution made this project a huge success. Highly recommended!"',
        'testimonials.author3': 'Elena Rodriguez',
        'testimonials.role3': 'Creative Lead, Global Brands',
        'contact.title': 'Let\'s Connect',
        'contact.subtitle': 'Ready to bring your vision to life?',
        'contact.heading': 'Get in Touch',
        'contact.description': 'Have a project in mind? I\'d love to hear about it. Let\'s discuss how we can transform your vision into reality.',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Phone',
        'contact.locationTitle': 'Location',
        'contact.location': 'Available Worldwide',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Email Address',
        'contact.form.message': 'Project Details',
        'contact.form.submit': 'Send Message',
        'contact.socialTitle': 'Follow My Work',
        'modal.overview': 'Project Overview',
        'modal.services': 'Services Provided',
        'modal.startProject': 'Start a Similar Project',
        'footer.rights': 'All rights reserved'
    },
    ar: {
        'nav.designer': 'مصمم رقمي',
        'nav.home': 'الرئيسية',
        'nav.about': 'عنّي',
        'nav.work': 'أعمالي',
        'nav.skills': 'مهاراتي',
        'nav.services': 'خدماتي',
        'nav.gallery': 'المعرض',
        'nav.testimonials': 'شهادات العملاء',
        'nav.contact': 'اتصل بي',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'فنون رقمية',
        'hero.title': 'مصمم جرافيك ورقمي',
        'hero.description': 'أصمم هويات بصرية تجمع بين البساطة والجمال المعاصر وسرد القصص العاطفية.',
        'hero.viewPortfolio': 'عرض الأعمال',
        'hero.startProject': 'ابدأ مشروع',
        'hero.explore': 'استكشف',
        'about.title': 'الفلسفة الإبداعية',
        'about.subtitle': 'حيث يلتقي الفن بالغرض في الشكل الرقمي',
        'about.imageText': 'راوي قصص بصري',
        'about.heading': 'تصميم بقصد',
        'about.description1': 'أتخصص في تحويل المفاهيم المجردة إلى تجارب بصرية مؤثرة تلقى صدى لدى الجمهور. يجمع أسلوبي بين الحس الفني والتفكير الاستراتيجي.',
        'about.description2': 'مع أكثر من 5 سنوات من الخبرة في التصميم الرقمي، تعاونت مع علامات تجارية عالمية لبناء هويات بصرية مميزة وتجارب مستخدم لا تنسى.',
        'about.designerTitle': 'مصمم رقمي',
        'projects.title': 'أعمال مميزة',
        'projects.subtitle': 'مشاريع مختارة تعرض التميز في التصميم',
        'projects.filter.all': 'الكل',
        'projects.filter.branding': 'هوية العلامة',
        'projects.filter.web': 'ويب',
        'projects.filter.advertising': 'إعلانات',
        'projects.project1.category': 'الهوية البصرية',
        'projects.project1.title': 'دار أزياء فاخرة',
        'projects.project1.description': 'هوية بصرية كاملة لعلامة أزياء فاخرة تجمع بين التراث والحداثة',
        'projects.project2.category': 'تصميم الويب',
        'projects.project2.title': 'معرض فني تفاعلي',
        'projects.project2.description': 'منصة رقمية لمعرض فني مع تجربة مستخدم غامرة',
        'projects.project3.category': 'إعلانات',
        'projects.project3.title': 'حملة مشروبات متميزة',
        'projects.project3.description': 'حملة إعلانية شاملة مع تصوير احترافي',
        'projects.project4.category': 'التعبئة والتغليف',
        'projects.project4.title': 'خط عناية بالبشرة عضوي',
        'projects.project4.description': 'تصميم تغليف مستدام بعناصر طبيعية ومواد صديقة للبيئة',
        'projects.project5.category': 'تصميم الحركة',
        'projects.project5.title': 'قصة علامة تجارية متحركة',
        'projects.project5.description': 'جرافيكس متحركة ورسوم متحركة لحملة سرد القصص للعلامة التجارية',
        'projects.tags.logo': 'تصميم الشعار',
        'projects.tags.identity': 'الهوية البصرية',
        'projects.tags.typography': 'الخطوط',
        'projects.tags.uiux': 'تصميم واجهة المستخدم',
        'projects.tags.interaction': 'تفاعلية',
        'projects.tags.digitalArt': 'فن رقمي',
        'projects.tags.advertising': 'إعلان',
        'projects.tags.photography': 'تصوير',
        'projects.tags.marketing': 'تسويق',
        'projects.tags.packaging': 'تعبئة وتغليف',
        'projects.tags.sustainability': 'استدامة',
        'projects.tags.illustration': 'رسم توضيحي',
        'projects.tags.animation': 'رسوم متحركة',
        'projects.tags.motion': 'تصميم الحركة',
        'projects.tags.video': 'فيديو',
        'projects.viewCase': 'عرض دراسة الحالة',
        'skills.title': 'المهارات والخبرات',
        'skills.subtitle': 'إتقان الأدوات الرقمية برؤية فنية',
        'skills.category1': 'أدوات التصميم',
        'skills.category2': 'تطوير الويب',
        'skills.category3': 'تصميم واجهة المستخدم',
        'skills.tool1': 'أدوبي كرييتيف سويت',
        'skills.tool2': 'تقنيات الواجهة الأمامية',
        'skills.tool3': 'تجربة المستخدم',
        'services.title': 'خدمات التصميم',
        'services.subtitle': 'تحويل الرؤى إلى واقع بصري',
        'services.service1.title': 'تصميم الويب',
        'services.service1.description': 'تصاميم مواقع ويب معاصرة تجمع بين الجمالية والوظيفة، مع التركيز على تجربة المستخدم والأداء.',
        'services.service2.title': 'الهوية البصرية',
        'services.service2.description': 'أنظمة هوية بصرية كاملة تعبر عن قيم العلامة التجارية وتخلق انطباعات لا تنسى.',
        'services.service3.title': 'الفن الرقمي',
        'services.service3.description': 'محتوى بصري جذاب لوسائل التواصل الاجتماعي يعزز حضور العلامة التجارية ويواكب الاتجاهات الحديثة.',
        'gallery.title': 'المعرض البصري',
        'gallery.subtitle': 'مجموعة مختارة من التعبيرات الفنية',
        'gallery.item1': 'تصميم تجريدي',
        'gallery.item2': 'طباعة رقمية',
        'gallery.item3': 'فن الخط العربي',
        'gallery.item4': 'تلوين رقمي',
        'gallery.item5': 'تصميم هندسي',
        'gallery.item6': 'فن سينمائي',
        'testimonials.title': 'قصص العملاء',
        'testimonials.subtitle': 'ماذا يقول الشركاء عن تعاوننا',
        'testimonials.text1': '"قامت أسيل بتحويل هوية علامتنا التجارية بالكامل. تجاوزت الاهتمام بالتفاصيل والرؤية الإبداعية كل التوقعات."',
        'testimonials.author1': 'سارة جونسون',
        'testimonials.role1': 'مديرة التسويق، تك كورب',
        'testimonials.text2': '"كان العمل مع أسيل نقطة تحول. لم تبدو التصاميم مذهلة فحسب، بل حسنت تفاعل المستخدمين بنسبة 40٪."',
        'testimonials.author2': 'أحمد المنصور',
        'testimonials.role2': 'الرئيس التنفيذي، أرتيزان ستوديوز',
        'testimonials.text3': '"جعل النهج المبتكر والتنفيذ المحترف هذا المشروع نجاحًا كبيرًا. موصى به بشدة!"',
        'testimonials.author3': 'إيلينا رودريجيز',
        'testimonials.role3': 'المشرفة الإبداعية، العلامات التجارية العالمية',
        'contact.title': 'لنتواصل',
        'contact.subtitle': 'مستعد لتحويل رؤيتك إلى واقع؟',
        'contact.heading': 'تواصل معي',
        'contact.description': 'هل لديك مشروع في ذهنك؟ يسعدني سماع أفكارك. لنتناقش حول كيفية تحويل رؤيتك إلى واقع.',
        'contact.emailTitle': 'البريد الإلكتروني',
        'contact.phoneTitle': 'الهاتف',
        'contact.locationTitle': 'الموقع',
        'contact.location': 'متاح عالمياً',
        'contact.form.name': 'اسمك',
        'contact.form.email': 'البريد الإلكتروني',
        'contact.form.message': 'تفاصيل المشروع',
        'contact.form.submit': 'إرسال الرسالة',
        'contact.socialTitle': 'تابع أعمالي',
        'modal.overview': 'نظرة عامة على المشروع',
        'modal.services': 'الخدمات المقدمة',
        'modal.startProject': 'ابدأ مشروعاً مماثلاً',
        'footer.rights': 'جميع الحقوق محفوظة'
    }
};

function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}