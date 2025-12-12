// ===========================================
// Main Application - بورتفوليو صانعة محتوى
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initThemeSwitcher();
    initLanguageSwitcher();
    initCurrentYear();
    initScrollAnimations();
    initHoverEffects();
    initTestimonialsSlider();
    initContactForm();
    initScrollProgress();
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
                navMenu.style.animation = 'fadeIn 0.3s ease-out';
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
    const savedTheme = localStorage.getItem('aseel-theme') || 'light';
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
            document.documentElement.style.setProperty('--font-heading', "'Noto Sans Arabic', sans-serif");
        } else {
            document.documentElement.style.setProperty('--font-body', "'Inter', sans-serif");
            document.documentElement.style.setProperty('--font-heading', "'Playfair Display', serif");
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
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(168, 187, 163, 0.15)';
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
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===========================================
// Testimonials Slider
// ===========================================

function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials__track');
    const dots = document.querySelectorAll('.testimonials__dot');
    const prevBtn = document.querySelector('.testimonials__control--prev');
    const nextBtn = document.querySelector('.testimonials__control--next');
    
    if (!track) return;
    
    const cards = document.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
    let currentIndex = 0;
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // تحديث النقاط النشطة
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // الأزرار السابقة والتالية
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
            updateSlider();
        });
    }
    
    // النقاط
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // التمرير التلقائي
    let autoSlide = setInterval(() => {
        currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);
    
    // إيقاف التمرير التلقائي عند التفاعل
    const sliderContainer = track.parentElement;
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000);
    });
    
    // دعم السحب على الهاتف
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    
    cards.forEach(card => {
        // منع سلوك السحب الافتراضي للصور
        card.addEventListener('dragstart', (e) => e.preventDefault());
    });
    
    track.addEventListener('mousedown', startDrag);
    track.addEventListener('touchstart', startDrag);
    
    function startDrag(event) {
        isDragging = true;
        startPosition = getPositionX(event);
        track.style.cursor = 'grabbing';
        
        // إيقاف التمرير التلقائي
        clearInterval(autoSlide);
        
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag);
        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);
    }
    
    function drag(event) {
        if (!isDragging) return;
        event.preventDefault();
        
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
        
        // تحديث الموضع
        track.style.transform = `translateX(${currentTranslate - (currentIndex * cardWidth)}px)`;
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        
        const movedBy = currentTranslate - prevTranslate;
        
        // إذا تم السحب بما يكفي، انتقل للشريحة التالية أو السابقة
        if (movedBy < -100 && currentIndex < cards.length - 1) currentIndex++;
        if (movedBy > 100 && currentIndex > 0) currentIndex--;
        
        updateSlider();
        prevTranslate = currentIndex * -cardWidth;
        
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('touchmove', drag);
        window.removeEventListener('mouseup', endDrag);
        window.removeEventListener('touchend', endDrag);
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
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
                alert('Thank you for your message! I will get back to you within 24 hours.');
                this.reset();
                submitBtn.style.animation = '';
                
                // إعادة تعيين التسميات
                const labels = this.querySelectorAll('label');
                labels.forEach(label => {
                    const input = this.querySelector(`#${label.getAttribute('for')}`);
                    if (input && !input.value && input.tagName !== 'SELECT') {
                        label.style.top = '0.75rem';
                        label.style.fontSize = '1rem';
                    }
                });
                
                // إعادة تعيين التسميات للـ select
                const select = this.querySelector('select');
                const selectLabel = this.querySelector('label[for="service"]');
                if (select && selectLabel) {
                    selectLabel.style.top = '0.75rem';
                    selectLabel.style.fontSize = '1rem';
                }
            }, 1000);
        });
    }
    
    // أنيميشن لتسميات النموذج
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', function() {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--color-accent-primary)';
            });
            
            input.addEventListener('blur', function() {
                if (this.tagName === 'SELECT') {
                    if (!this.value) {
                        label.style.top = '0.75rem';
                        label.style.fontSize = '1rem';
                        label.style.color = 'var(--color-text-tertiary)';
                    }
                } else if (!this.value) {
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
            
            // معالجة الـ select
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', function() {
                    if (this.value) {
                        label.style.top = '-0.5rem';
                        label.style.fontSize = '0.875rem';
                        label.style.color = 'var(--color-accent-primary)';
                    }
                });
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
// Translations
// ===========================================

const translations = {
    en: {
        'nav.creator': 'Content Creator',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.testimonials': 'Testimonials',
        'nav.contact': 'Contact',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'Digital Storytelling',
        'hero.title': 'Content Creator',
        'hero.description': 'Crafting compelling narratives and engaging content that connects brands with their audiences.',
        'hero.viewWork': 'View My Work',
        'hero.contactMe': 'Let\'s Collaborate',
        'hero.explore': 'Learn More',
        'about.title': 'About Me',
        'about.subtitle': 'Crafting stories that resonate and engage',
        'about.imageText': 'Content Creator',
        'about.heading': 'My Story',
        'about.description1': 'I\'m Aseel, a passionate content creator with over 5 years of experience in digital storytelling. I specialize in creating engaging content across multiple platforms that helps brands connect authentically with their audience.',
        'about.description2': 'My journey began with a simple smartphone and a passion for storytelling. Today, I collaborate with brands and businesses to create compelling content strategies that drive engagement and build communities.',
        'about.stats.projects': '150+',
        'about.stats.projectsLabel': 'Projects',
        'about.stats.clients': '50+',
        'about.stats.clientsLabel': 'Happy Clients',
        'about.stats.platforms': '8+',
        'about.stats.platformsLabel': 'Platforms',
        'services.title': 'Services',
        'services.subtitle': 'How I can help you grow',
        'services.service1.title': 'Video Content',
        'services.service1.description': 'Engaging video content for social media, YouTube, and websites. From short-form reels to long-form documentaries.',
        'services.service1.list1': 'Social Media Videos',
        'services.service1.list2': 'YouTube Content',
        'services.service1.list3': 'Explainer Videos',
        'services.service2.title': 'Social Media',
        'services.service2.description': 'Complete social media management and content creation across all major platforms.',
        'services.service2.list1': 'Content Strategy',
        'services.service2.list2': 'Platform Management',
        'services.service2.list3': 'Engagement Growth',
        'services.service3.title': 'Content Strategy',
        'services.service3.description': 'Strategic planning and execution of content campaigns that drive results and build brand loyalty.',
        'services.service3.list1': 'Brand Storytelling',
        'services.service3.list2': 'Campaign Planning',
        'services.service3.list3': 'Analytics & Reporting',
        'portfolio.title': 'Portfolio',
        'portfolio.subtitle': 'Recent projects and collaborations',
        'portfolio.project1.category': 'Brand Campaign',
        'portfolio.project1.title': 'Lifestyle Brand Series',
        'portfolio.project1.description': 'Complete social media content strategy and video series for a wellness brand',
        'portfolio.project2.category': 'Educational Series',
        'portfolio.project2.title': 'Tech Tutorial Series',
        'portfolio.project2.description': 'YouTube series explaining complex tech concepts in simple terms',
        'portfolio.project3.category': 'Social Media',
        'portfolio.project3.title': 'Fashion Brand Launch',
        'portfolio.project3.description': 'Social media campaign for a sustainable fashion brand launch',
        'portfolio.tags.video': 'Video',
        'portfolio.tags.social': 'Social Media',
        'portfolio.tags.strategy': 'Strategy',
        'portfolio.tags.youtube': 'YouTube',
        'portfolio.tags.education': 'Education',
        'portfolio.tags.animation': 'Animation',
        'portfolio.tags.campaign': 'Campaign',
        'portfolio.tags.fashion': 'Fashion',
        'portfolio.tags.instagram': 'Instagram',
        'portfolio.seeMore': 'See More Projects',
        'testimonials.title': 'Client Testimonials',
        'testimonials.subtitle': 'What my clients say about working together',
        'testimonials.testimonial1.text': '"Working with Aseel transformed our brand\'s online presence. Her content strategy increased our engagement by 200% in just three months. Professional, creative, and always delivers beyond expectations."',
        'testimonials.testimonial1.name': 'Sarah Johnson',
        'testimonials.testimonial1.role': 'Marketing Director, TechFlow',
        'testimonials.testimonial2.text': '"Aseel\'s video content for our product launch was exceptional. She understood our brand perfectly and created content that resonated with our target audience. The results exceeded all our KPIs."',
        'testimonials.testimonial2.name': 'Ahmed Hassan',
        'testimonials.testimonial2.role': 'CEO, Bloom Cosmetics',
        'testimonials.testimonial3.text': '"As a startup, we needed someone who could wear multiple hats. Aseel delivered amazing content across all our social platforms while staying true to our brand voice. She\'s more than a content creator - she\'s a partner."',
        'testimonials.testimonial3.name': 'Layla Mohammed',
        'testimonials.testimonial3.role': 'Founder, Nomad Coffee Co.',
        'contact.title': 'Let\'s Work Together',
        'contact.subtitle': 'Ready to create amazing content?',
        'contact.heading': 'Get In Touch',
        'contact.description': 'Have a project in mind? I\'d love to hear about it. Let\'s discuss how we can create content that tells your brand\'s story and connects with your audience.',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Phone',
        'contact.locationTitle': 'Location',
        'contact.location': 'Available for remote work worldwide',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Email Address',
        'contact.form.service': 'Service Needed',
        'contact.form.options.video': 'Video Content',
        'contact.form.options.social': 'Social Media',
        'contact.form.options.strategy': 'Content Strategy',
        'contact.form.options.other': 'Other',
        'contact.form.message': 'Project Details',
        'contact.form.submit': 'Send Message',
        'contact.socialTitle': 'Follow My Content',
        'footer.rights': 'All rights reserved'
    },
    ar: {
        'nav.creator': 'صانعة محتوى',
        'nav.home': 'الرئيسية',
        'nav.about': 'عنّي',
        'nav.services': 'الخدمات',
        'nav.portfolio': 'الأعمال',
        'nav.testimonials': 'آراء العملاء',
        'nav.contact': 'اتصل',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'سرد قصص رقمي',
        'hero.title': 'صانعة محتوى',
        'hero.description': 'أصمم قصصًا مؤثرة ومحتوى جذابًا يربط العلامات التجارية بجماهيرها.',
        'hero.viewWork': 'شاهد أعمالي',
        'hero.contactMe': 'لنعمل معًا',
        'hero.explore': 'اعرف المزيد',
        'about.title': 'عنّي',
        'about.subtitle': 'صياغة قصص تلقى صدى وتجذب',
        'about.imageText': 'صانعة محتوى',
        'about.heading': 'قصتي',
        'about.description1': 'أنا أسيل، صانعة محتوى شغوفة بخبرة تزيد عن 5 سنوات في السرد القصصي الرقمي. أتخصص في إنشاء محتوى جذاب عبر منصات متعددة يساعد العلامات التجارية على التواصل بصدق مع جمهورها.',
        'about.description2': 'بدأت رحلتي بهاتف ذكي بسيط وشغف بسرد القصص. اليوم، أتعاون مع العلامات التجارية والشركات لإنشاء استراتيجيات محتوى مقنعة تدفع المشاركة وتبني المجتمعات.',
        'about.stats.projects': '١٥٠+',
        'about.stats.projectsLabel': 'مشروع',
        'about.stats.clients': '٥٠+',
        'about.stats.clientsLabel': 'عميل سعيد',
        'about.stats.platforms': '٨+',
        'about.stats.platformsLabel': 'منصة',
        'services.title': 'الخدمات',
        'services.subtitle': 'كيف يمكنني مساعدتك على النمو',
        'services.service1.title': 'محتوى فيديو',
        'services.service1.description': 'محتوى فيديو جذاب لوسائل التواصل الاجتماعي ويوتيوب والمواقع الإلكترونية. من الريلز القصيرة إلى الأفلام الوثائقية الطويلة.',
        'services.service1.list1': 'فيديوهات وسائل التواصل',
        'services.service1.list2': 'محتوى يوتيوب',
        'services.service1.list3': 'فيديوهات توضيحية',
        'services.service2.title': 'وسائل التواصل الاجتماعي',
        'services.service2.description': 'إدارة كاملة لوسائل التواصل الاجتماعي وإنشاء محتوى عبر جميع المنصات الرئيسية.',
        'services.service2.list1': 'استراتيجية المحتوى',
        'services.service2.list2': 'إدارة المنصات',
        'services.service2.list3': 'نمو المشاركة',
        'services.service3.title': 'استراتيجية المحتوى',
        'services.service3.description': 'التخطيط الاستراتيجي وتنفيذ حملات المحتوى التي تحقق النتائج وتبني ولاء العلامة التجارية.',
        'services.service3.list1': 'سرد قصص العلامة التجارية',
        'services.service3.list2': 'تخطيط الحملات',
        'services.service3.list3': 'التحليلات والتقارير',
        'portfolio.title': 'الأعمال',
        'portfolio.subtitle': 'المشاريع والتعاونات الحديثة',
        'portfolio.project1.category': 'حملة علامة تجارية',
        'portfolio.project1.title': 'سلسلة علامة أسلوب حياة',
        'portfolio.project1.description': 'استراتيجية محتوى كاملة لوسائل التواصل الاجتماعي وسلسلة فيديو لعلامة تجارية للعافية',
        'portfolio.project2.category': 'سلسلة تعليمية',
        'portfolio.project2.title': 'سلسلة دروس تقنية',
        'portfolio.project2.description': 'سلسلة يوتيوب تشرح مفاهيم تقنية معقدة بمصطلحات بسيطة',
        'portfolio.project3.category': 'وسائل التواصل الاجتماعي',
        'portfolio.project3.title': 'إطلاق علامة أزياء',
        'portfolio.project3.description': 'حملة وسائل التواصل الاجتماعي لإطلاق علامة أزياء مستدامة',
        'portfolio.tags.video': 'فيديو',
        'portfolio.tags.social': 'وسائل تواصل',
        'portfolio.tags.strategy': 'استراتيجية',
        'portfolio.tags.youtube': 'يوتيوب',
        'portfolio.tags.education': 'تعليم',
        'portfolio.tags.animation': 'رسوم متحركة',
        'portfolio.tags.campaign': 'حملة',
        'portfolio.tags.fashion': 'أزياء',
        'portfolio.tags.instagram': 'إنستغرام',
        'portfolio.seeMore': 'شاهد المزيد من المشاريع',
        'testimonials.title': 'آراء العملاء',
        'testimonials.subtitle': 'ما يقوله عملائي عن العمل معًا',
        'testimonials.testimonial1.text': '"عملت أسيل على تحويل وجود علامتنا التجارية عبر الإنترنت. زادت استراتيجيتها للمحتوى من مشاركتنا بنسبة 200٪ في ثلاثة أشهر فقط. محترفة، مبدعة، وتتجاوز التوقعات دائمًا."',
        'testimonials.testimonial1.name': 'سارة جونسون',
        'testimonials.testimonial1.role': 'مديرة التسويق، تك فلو',
        'testimonials.testimonial2.text': '"كان محتوى الفيديو الذي قدمته أسيل لإطلاق منتجنا استثنائيًا. فهمت علامتنا التجارية تمامًا وأنشأت محتوى لقي صدى لدى جمهورنا المستهدف. تجاوزت النتائج جميع مؤشرات الأداء الرئيسية لدينا."',
        'testimonials.testimonial2.name': 'أحمد حسن',
        'testimonials.testimonial2.role': 'الرئيس التنفيذي، بلوم كوزمتكس',
        'testimonials.testimonial3.text': '"كشركة ناشئة، كنا بحاجة إلى شخص يمكنه أداء عدة أدوار في وقت واحد. قدمت أسيل محتوى مذهلاً عبر جميع منصات التواصل الاجتماعي الخاصة بنا مع الحفاظ على صوت علامتنا التجارية. إنها أكثر من مجرد صانعة محتوى - إنها شريك."',
        'testimonials.testimonial3.name': 'ليلى محمد',
        'testimonials.testimonial3.role': 'المؤسسة، نوماد كوفي',
        'contact.title': 'لنعمل معًا',
        'contact.subtitle': 'مستعد لإنشاء محتوى رائع؟',
        'contact.heading': 'تواصل معي',
        'contact.description': 'هل لديك مشروع في ذهنك؟ يسعدني سماع أفكارك. لنتناقش حول كيفية إنشاء محتوى يحكي قصة علامتك التجارية ويتواصل مع جمهورك.',
        'contact.emailTitle': 'البريد الإلكتروني',
        'contact.phoneTitle': 'الهاتف',
        'contact.locationTitle': 'الموقع',
        'contact.location': 'متاحة للعمل عن بعد في جميع أنحاء العالم',
        'contact.form.name': 'اسمك',
        'contact.form.email': 'البريد الإلكتروني',
        'contact.form.service': 'الخدمة المطلوبة',
        'contact.form.options.video': 'محتوى فيديو',
        'contact.form.options.social': 'وسائل التواصل الاجتماعي',
        'contact.form.options.strategy': 'استراتيجية المحتوى',
        'contact.form.options.other': 'أخرى',
        'contact.form.message': 'تفاصيل المشروع',
        'contact.form.submit': 'إرسال الرسالة',
        'contact.socialTitle': 'تابع محتواي',
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
    
    // تحديث خيارات الـ select
    const selectOptions = document.querySelectorAll('option[data-i18n]');
    selectOptions.forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            option.textContent = translations[lang][key];
        }
    });
}