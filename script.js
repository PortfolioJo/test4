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
                const isRTL = document.documentElement.dir === 'rtl';
                navMenu.style.animation = isRTL ? 'slideInLeft 0.3s ease-out' : 'slideInRight 0.3s ease-out';
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
    const savedTheme = localStorage.getItem('mubdi-theme') || 'dark';
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
            localStorage.setItem('mubdi-theme', newTheme);
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
    const savedLang = localStorage.getItem('mubdi-lang') || 'ar';
    setLanguage(savedLang);
    updateLangToggle(savedLang);
    
    // تبديل اللغة مع أنيميشن
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        
        // إضافة أنيميشن للزر
        this.style.animation = 'rotate 0.5s ease';
        
        setTimeout(() => {
            setLanguage(newLang);
            updateLangToggle(newLang);
            localStorage.setItem('mubdi-lang', newLang);
            this.style.animation = '';
        }, 250);
    });
    
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // تحديث نص العنوان بناءً على اللغة
        const pageTitle = document.querySelector('title');
        const pageDescription = document.querySelector('meta[name="description"]');
        
        if (lang === 'ar') {
            pageTitle.textContent = 'مُبْدِع | صانع محتوى إبداعي - إستراتيجية المحتوى والإنتاج الرقمي';
            pageDescription.content = 'مُبْدِع - صانع محتوى متخصص في إستراتيجيات المحتوى، إنتاج الفيديو، والتسويق الرقمي. أبدع قصصاً رقمية مؤثرة.';
            document.documentElement.style.setProperty('--font-body', "'Noto Sans Arabic', sans-serif");
        } else {
            pageTitle.textContent = 'Mubdi | Creative Content Creator - Content Strategy & Digital Production';
            pageDescription.content = 'Mubdi - Creative content creator specializing in content strategies, video production, and digital marketing. I create impactful digital stories.';
            document.documentElement.style.setProperty('--font-body', "'Inter', sans-serif");
        }
        
        updateTexts(lang);
        
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
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.15)';
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
            category: 'Video Campaign',
            title: 'Interactive Educational Series',
            year: '2024',
            description: 'Educational video campaign for a tech brand combining entertainment with learning. The project involved creating engaging content that simplifies complex topics.',
            tags: ['Video Production', 'Script Writing', 'Editing', 'Educational Content'],
            imageClass: 'project-card__image--1'
        },
        2: {
            category: 'Content Strategy',
            title: 'Annual Content Plan',
            year: '2024',
            description: 'Comprehensive content strategy for a fashion brand with quarterly implementation plans. The strategy focused on brand storytelling and audience engagement.',
            tags: ['Strategy', 'Social Media', 'Planning', 'Content Calendar'],
            imageClass: 'project-card__image--2'
        },
        3: {
            category: 'Podcast',
            title: 'Weekly Podcast Program',
            year: '2023',
            description: 'Production and hosting of a weekly podcast covering entrepreneurship and innovation topics. The show gained significant audience engagement and positive feedback.',
            tags: ['Podcast Production', 'Audio Engineering', 'Hosting', 'Interviewing'],
            imageClass: 'project-card__image--3'
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
        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        
        if (!project) return;
        
        // تحديث محتوى المودال
        const modalCategory = document.getElementById('modalCategory');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        modalCategory.textContent = currentLang === 'ar' ? 
            getArabicCategory(project.category) : project.category;
        modalTitle.textContent = project.title;
        document.getElementById('modalYear').textContent = project.year;
        
        // ترجمة الوصف بناءً على اللغة
        if (currentLang === 'ar') {
            modalDescription.textContent = getArabicDescription(projectId);
        } else {
            modalDescription.textContent = project.description;
        }
        
        // تحديث الوسوم
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = currentLang === 'ar' ? 
                getArabicTag(tag) : tag;
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
    
    function getArabicCategory(category) {
        const categories = {
            'Video Campaign': 'حملة فيديوهات',
            'Content Strategy': 'إستراتيجية محتوى',
            'Podcast': 'بودكاست'
        };
        return categories[category] || category;
    }
    
    function getArabicDescription(projectId) {
        const descriptions = {
            1: 'حملة فيديوهات تعليمية لعلامة تقنية تجمع بين الترفيه والتعلم. تضمن المشروع إنشاء محتوى جذاب يبسط المواضيع المعقدة.',
            2: 'إستراتيجية محتوى متكاملة لعلامة أزياء مع خطط تنفيذ ربع سنوية. ركزت الإستراتيجية على سرد القصص والتفاعل مع الجمهور.',
            3: 'إنتاج وتقديم بودكاست أسبوعي يغطي مواضيع الريادة والابتكار. حصل البرنامج على تفاعل كبير من الجمهور وردود فعل إيجابية.'
        };
        return descriptions[projectId] || '';
    }
    
    function getArabicTag(tag) {
        const tags = {
            'Video Production': 'إنتاج فيديو',
            'Script Writing': 'كتابة النص',
            'Editing': 'مونتاج',
            'Educational Content': 'محتوى تعليمي',
            'Strategy': 'إستراتيجية',
            'Social Media': 'وسائل التواصل',
            'Planning': 'تخطيط',
            'Content Calendar': 'تقويم المحتوى',
            'Podcast Production': 'إنتاج بودكاست',
            'Audio Engineering': 'مهندس صوت',
            'Hosting': 'تقديم',
            'Interviewing': 'إجراء مقابلات'
        };
        return tags[tag] || tag;
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
                const currentLang = document.documentElement.getAttribute('lang') || 'ar';
                const message = currentLang === 'ar' 
                    ? 'شكراً لك على رسالتك! سأتصل بك قريباً لمناقشة مشروعك.'
                    : 'Thank you for your message! I will contact you soon to discuss your project.';
                
                alert(message);
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
// Translations
// ===========================================

const translations = {
    en: {
        'nav.creator': 'Content Creator',
        'nav.home': 'Home',
        'nav.about': 'About Me',
        'nav.work': 'My Work',
        'nav.services': 'My Services',
        'nav.gallery': 'Content Gallery',
        'nav.contact': 'Contact Me',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'Digital Creativity',
        'hero.title': 'Creative Content Creator',
        'hero.description': 'I create digital stories that combine visual creativity, impactful messaging, and thoughtful marketing strategy.',
        'hero.viewPortfolio': 'View My Work',
        'hero.startProject': 'Start a Project',
        'hero.explore': 'Explore',
        'about.title': 'My Creative Philosophy',
        'about.subtitle': 'Where story meets strategy in the digital world',
        'about.imageText': 'Visual Storyteller',
        'about.heading': 'Creativity with Purpose',
        'about.description1': 'I specialize in transforming ideas into impactful digital stories that touch hearts and achieve business goals. I blend visual creativity with marketing strategy.',
        'about.description2': 'With over 5 years of experience in content creation, I have collaborated with diverse brands to build distinctive digital presence and create memorable content experiences.',
        'about.creatorTitle': 'Creative Content Creator',
        'projects.title': 'Featured Work',
        'projects.subtitle': 'Selected projects showcasing my content creation excellence',
        'projects.project1.category': 'Video Campaign',
        'projects.project1.title': 'Interactive Educational Series',
        'projects.project1.description': 'Educational video campaign for a tech brand combining entertainment with learning',
        'projects.project2.category': 'Content Strategy',
        'projects.project2.title': 'Annual Content Plan',
        'projects.project2.description': 'Comprehensive content strategy for a fashion brand with quarterly implementation plans',
        'projects.project3.category': 'Podcast',
        'projects.project3.title': 'Weekly Podcast Program',
        'projects.project3.description': 'Production and hosting of a weekly podcast covering entrepreneurship and innovation topics',
        'projects.tags.video': 'Video Production',
        'projects.tags.script': 'Script Writing',
        'projects.tags.editing': 'Editing',
        'projects.tags.strategy': 'Strategy',
        'projects.tags.social': 'Social Media',
        'projects.tags.planning': 'Planning',
        'projects.tags.podcast': 'Podcast Production',
        'projects.tags.audio': 'Audio Engineering',
        'projects.tags.hosting': 'Hosting',
        'projects.viewCase': 'View Case Study',
        'services.title': 'Content Creation Services',
        'services.subtitle': 'Transforming ideas into impactful content',
        'services.service1.title': 'Video Production',
        'services.service1.description': 'Professional video production for digital media, from planning and filming to editing and final direction.',
        'services.service2.title': 'Content Strategy',
        'services.service2.description': 'Developing strategic content plans that achieve brand objectives and align with target audience needs.',
        'services.service3.title': 'Podcast Production',
        'services.service3.description': 'Professional audio program production including recording, editing, distribution, and promotion on podcast platforms.',
        'gallery.title': 'Content Gallery',
        'gallery.subtitle': 'A curated selection of my creative work',
        'gallery.item1': 'Educational Video',
        'gallery.item2': 'Professional Reels',
        'gallery.item3': 'Motion Graphics',
        'gallery.item4': 'Event Coverage',
        'gallery.item5': 'Video Interviews',
        'gallery.item6': 'Interactive Content',
        'contact.title': 'Let\'s Start a Project',
        'contact.subtitle': 'Ready to transform your ideas into impactful content?',
        'contact.heading': 'Contact Me',
        'contact.description': 'Have a content idea? I\'d love to hear about it. Let\'s discuss how we can turn your vision into tangible reality.',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Phone',
        'contact.locationTitle': 'Location',
        'contact.location': 'Available Remotely',
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
        'nav.creator': 'صانع محتوى',
        'nav.home': 'الرئيسية',
        'nav.about': 'من أنا',
        'nav.work': 'أعمالي',
        'nav.services': 'خدماتي',
        'nav.gallery': 'معرض المحتوى',
        'nav.contact': 'تواصل معي',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'إبداع رقمي',
        'hero.title': 'صانع محتوى إبداعي',
        'hero.description': 'أبدع قصصاً رقمية تجمع بين الإبداع البصري، الرسالة المؤثرة، واستراتيجية تسويقية مدروسة.',
        'hero.viewPortfolio': 'عرض أعمالي',
        'hero.startProject': 'ابدأ مشروع',
        'hero.explore': 'استكشف',
        'about.title': 'فلسفتي الإبداعية',
        'about.subtitle': 'حيث تلتقي القصة بالاستراتيجية في العالم الرقمي',
        'about.imageText': 'راوي قصص مرئي',
        'about.heading': 'إبداع بغاية',
        'about.description1': 'أتخصص في تحويل الأفكار إلى قصص رقمية مؤثرة تلامس قلوب الجمهور وتحقق أهداف العمل. أدمج بين الإبداع البصري والاستراتيجية التسويقية.',
        'about.description2': 'مع أكثر من 5 سنوات من الخبرة في صناعة المحتوى، تعاونت مع علامات تجارية متنوعة لبناء حضور رقمي مميز وخلق تجارب محتوى لا تنسى.',
        'about.creatorTitle': 'صانع محتوى إبداعي',
        'projects.title': 'أعمال مميزة',
        'projects.subtitle': 'مشاريع مختارة تعرض تميزي في صناعة المحتوى',
        'projects.project1.category': 'حملة فيديوهات',
        'projects.project1.title': 'سلسلة تعليمية تفاعلية',
        'projects.project1.description': 'حملة فيديوهات تعليمية لعلامة تقنية تجمع بين الترفيه والتعلم',
        'projects.project2.category': 'إستراتيجية محتوى',
        'projects.project2.title': 'خطة محتوى سنوية',
        'projects.project2.description': 'إستراتيجية محتوى متكاملة لعلامة أزياء مع خطة تنفيذ ربع سنوية',
        'projects.project3.category': 'بودكاست',
        'projects.project3.title': 'برنامج بودكاست أسبوعي',
        'projects.project3.description': 'إنتاج وتقديم بودكاست أسبوعي يغطي مواضيع الريادة والابتكار',
        'projects.tags.video': 'إنتاج فيديو',
        'projects.tags.script': 'كتابة النص',
        'projects.tags.editing': 'مونتاج',
        'projects.tags.strategy': 'إستراتيجية',
        'projects.tags.social': 'وسائل التواصل',
        'projects.tags.planning': 'تخطيط',
        'projects.tags.podcast': 'إنتاج بودكاست',
        'projects.tags.audio': 'مهندس صوت',
        'projects.tags.hosting': 'تقديم',
        'projects.viewCase': 'عرض دراسة الحالة',
        'services.title': 'خدمات صناعة المحتوى',
        'services.subtitle': 'تحويل الأفكار إلى محتوى مؤثر',
        'services.service1.title': 'إنتاج الفيديو',
        'services.service1.description': 'إنتاج فيديوهات احترافية للوسائط الرقمية، من التخطيط والتصوير إلى المونتاج والإخراج النهائي.',
        'services.service2.title': 'إستراتيجية محتوى',
        'services.service2.description': 'تطوير خطط محتوى استراتيجية تحقق أهداف العلامة التجارية وتتوافق مع احتياجات الجمهور المستهدف.',
        'services.service3.title': 'إنتاج بودكاست',
        'services.service3.description': 'إنتاج برامج صوتية احترافية تشمل التسجيل، المونتاج، التوزيع، والترويج على منصات البودكاست.',
        'gallery.title': 'معرض المحتوى',
        'gallery.subtitle': 'مجموعة مختارة من أعمالي الإبداعية',
        'gallery.item1': 'فيديو تعليمي',
        'gallery.item2': 'رييلز احترافية',
        'gallery.item3': 'جرافيكس متحرك',
        'gallery.item4': 'تغطية فعاليات',
        'gallery.item5': 'مقابلات مرئية',
        'gallery.item6': 'محتوى تفاعلي',
        'contact.title': 'لنبدأ مشروعاً',
        'contact.subtitle': 'مستعد لتحويل أفكارك إلى محتوى مؤثر؟',
        'contact.heading': 'تواصل معي',
        'contact.description': 'هل لديك فكرة لمحتوى؟ يسعدني سماع أفكارك. لنتناقش حول كيفية تحويل رؤيتك إلى واقع ملموس.',
        'contact.emailTitle': 'البريد الإلكتروني',
        'contact.phoneTitle': 'الهاتف',
        'contact.locationTitle': 'الموقع',
        'contact.location': 'متاح للعمل عن بعد',
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
    
    // تحديث اتجاه الأسهم في الأزرار
    const buttons = document.querySelectorAll('.btn__icon, .project-card__link i');
    buttons.forEach(button => {
        if (lang === 'ar') {
            if (button.classList.contains('fa-arrow-right')) {
                button.classList.remove('fa-arrow-right');
                button.classList.add('fa-arrow-left');
            }
        } else {
            if (button.classList.contains('fa-arrow-left')) {
                button.classList.remove('fa-arrow-left');
                button.classList.add('fa-arrow-right');
            }
        }
    });
}