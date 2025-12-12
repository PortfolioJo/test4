// ===========================================
// Main Application - بورتفوليو الفن التجريدي
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
    initAbstractEffects();
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
    const savedTheme = localStorage.getItem('elyra-theme') || 'light';
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
            localStorage.setItem('elyra-theme', newTheme);
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
    const savedLang = localStorage.getItem('elyra-lang') || 'en';
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
            localStorage.setItem('elyra-lang', newLang);
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
    const cards = document.querySelectorAll('.project-card, .service-card, .gallery-item');
    
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
// Abstract Effects
// ===========================================

function initAbstractEffects() {
    // تحريك العناصر التجريدية
    const abstractElements = document.querySelectorAll('.abstract-element');
    abstractElements.forEach((element, index) => {
        element.style.animationDelay = `${index * -3}s`;
    });
    
    // تأثير النسيج على التمرير
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        document.body.style.backgroundPosition = `0px ${rate}px`;
    });
    
    // تأثيرات عشوائية للعناصر التجريدية
    setInterval(() => {
        abstractElements.forEach(element => {
            const randomOpacity = 0.05 + Math.random() * 0.1;
            element.style.opacity = randomOpacity;
        });
    }, 3000);
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
            category: 'Digital Series',
            title: 'Ethereal Forms',
            year: '2024',
            description: 'A study in fluid abstraction and organic digital textures exploring the space between form and emptiness. This series examines the delicate balance of negative space and subtle color transitions.',
            tags: ['Digital Painting', 'Texture Mapping', 'Color Theory', 'Abstract Composition'],
            imageClass: 'project-card__image--1'
        },
        2: {
            category: 'Gallery Installation',
            title: 'Silent Dialogue',
            year: '2024',
            description: 'Interactive digital installation exploring space and perception through abstract forms. Viewers engage with shifting perspectives and changing light conditions.',
            tags: ['Interactive Art', 'Digital Projection', 'Spatial Design', 'Light Art'],
            imageClass: 'project-card__image--2'
        },
        3: {
            category: 'Private Collection',
            title: 'Whispering Canvas',
            year: '2023',
            description: 'Large-scale digital pieces created for private residences, focusing on creating meditative spaces through abstract art that evolves with changing light throughout the day.',
            tags: ['Large Format', 'Site Specific', 'Light Interaction', 'Meditative Art'],
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
        const currentLang = document.documentElement.getAttribute('lang') || 'en';
        
        if (!project) return;
        
        // تحديث محتوى المودال
        document.getElementById('modalCategory').textContent = project.category;
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
                alert('Thank you for your interest in a commission! I will review your vision and get back to you within 48 hours.');
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
        'nav.designer': 'Abstract Artist',
        'nav.home': 'Home',
        'nav.about': 'Artistry',
        'nav.work': 'Works',
        'nav.services': 'Services',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'Abstract Artistry',
        'hero.title': 'Abstract Digital Artist',
        'hero.description': 'Crafting serene visual experiences that blend minimalism, abstract forms, and emotional depth.',
        'hero.viewPortfolio': 'View Artworks',
        'hero.startProject': 'Commission Art',
        'hero.explore': 'Discover',
        'about.title': 'Artistic Vision',
        'about.subtitle': 'Where abstraction meets emotion in digital form',
        'about.imageText': 'Visual Poet',
        'about.heading': 'Art with Intention',
        'about.description1': 'I specialize in creating abstract digital art that evokes emotion and invites contemplation. My work explores the balance between form and emptiness, color and space.',
        'about.description2': 'With over 6 years in digital artistry, I\'ve collaborated with galleries and collectors worldwide to create pieces that transform spaces and inspire moments of reflection.',
        'about.designerTitle': 'Abstract Artist',
        'projects.title': 'Selected Works',
        'projects.subtitle': 'Curated pieces showcasing abstract expression',
        'projects.project1.category': 'Digital Series',
        'projects.project1.title': 'Ethereal Forms',
        'projects.project1.description': 'A study in fluid abstraction and organic digital textures',
        'projects.project2.category': 'Gallery Installation',
        'projects.project2.title': 'Silent Dialogue',
        'projects.project2.description': 'Interactive digital installation exploring space and perception',
        'projects.project3.category': 'Private Collection',
        'projects.project3.title': 'Whispering Canvas',
        'projects.project3.description': 'Large-scale digital pieces for private residences',
        'projects.tags.abstract': 'Abstract',
        'projects.tags.digital': 'Digital',
        'projects.tags.texture': 'Texture',
        'projects.tags.installation': 'Installation',
        'projects.tags.interactive': 'Interactive',
        'projects.tags.space': 'Space',
        'projects.tags.collection': 'Collection',
        'projects.tags.large': 'Large Scale',
        'projects.tags.canvas': 'Canvas',
        'projects.viewCase': 'View Series',
        'services.title': 'Art Services',
        'services.subtitle': 'Transforming spaces through abstract expression',
        'services.service1.title': 'Commissioned Art',
        'services.service1.description': 'Bespoke abstract pieces created specifically for your space, considering light, texture, and emotional resonance.',
        'services.service2.title': 'Digital Installations',
        'services.service2.description': 'Immersive digital experiences for galleries, corporate spaces, and private collections.',
        'services.service3.title': 'Art Direction',
        'services.service3.description': 'Curating and directing artistic projects that blend digital innovation with timeless aesthetic principles.',
        'gallery.title': 'Abstract Gallery',
        'gallery.subtitle': 'A meditation on form, color, and space',
        'gallery.item1': 'Fluid Forms',
        'gallery.item2': 'Subtle Gradients',
        'gallery.item3': 'Organic Textures',
        'gallery.item4': 'Geometric Balance',
        'gallery.item5': 'Minimalist Space',
        'gallery.item6': 'Emotional Color',
        'contact.title': 'Let\'s Create',
        'contact.subtitle': 'Ready to transform your space with art?',
        'contact.heading': 'Commission Art',
        'contact.description': 'Interested in a custom piece? I\'d love to discuss your vision and create something truly unique for your space.',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Phone',
        'contact.locationTitle': 'Studio',
        'contact.location': 'Global Commissions',
        'contact.availabilityTitle': 'Availability',
        'contact.availability': 'Limited Commissions Open',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Email Address',
        'contact.form.message': 'Project Vision',
        'contact.form.submit': 'Discuss Commission',
        'contact.socialTitle': 'Follow the Journey',
        'modal.overview': 'Artistic Statement',
        'modal.techniques': 'Techniques Used',
        'modal.startProject': 'Commission Similar',
        'footer.rights': 'All rights reserved'
    },
    ar: {
        'nav.designer': 'فنانة تجريدية',
        'nav.home': 'الرئيسية',
        'nav.about': 'الفن',
        'nav.work': 'الأعمال',
        'nav.services': 'الخدمات',
        'nav.gallery': 'المعرض',
        'nav.contact': 'اتصل',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'فن تجريدي',
        'hero.title': 'فنانة رقمية تجريدية',
        'hero.description': 'أصمم تجارب بصرية هادئة تجمع بين البساطة والأشكال التجريدية والعمق العاطفي.',
        'hero.viewPortfolio': 'عرض الأعمال',
        'hero.startProject': 'طلب عمل فني',
        'hero.explore': 'استكشف',
        'about.title': 'الرؤية الفنية',
        'about.subtitle': 'حيث يلتقي التجريد بالعاطفة في الشكل الرقمي',
        'about.imageText': 'شاعرة بصرية',
        'about.heading': 'فن بقصد',
        'about.description1': 'أتخصص في إنشاء فن رقمي تجريدي يثير المشاعر ويدعو للتأمل. يستكشف عملي التوازن بين الشكل والفراغ، اللون والفضاء.',
        'about.description2': 'مع أكثر من 6 سنوات في الفن الرقمي، تعاونت مع معارض وجامعي تحف حول العالم لإنشاء قطع فنية تحول المساحات وتلهم لحظات تأمل.',
        'about.designerTitle': 'فنانة تجريدية',
        'projects.title': 'أعمال مختارة',
        'projects.subtitle': 'قطع فنية مختارة تعرض التعبير التجريدي',
        'projects.project1.category': 'سلسلة رقمية',
        'projects.project1.title': 'أشكال خيالية',
        'projects.project1.description': 'دراسة في التجريد السائل والأنسجة الرقمية العضوية',
        'projects.project2.category': 'تركيب معرض',
        'projects.project2.title': 'حوار صامت',
        'projects.project2.description': 'تركيب رقمي تفاعلي يستكشف الفضاء والإدراك',
        'projects.project3.category': 'مجموعة خاصة',
        'projects.project3.title': 'لوحات همسية',
        'projects.project3.description': 'قطع رقمية كبيرة الحجم للمساكن الخاصة',
        'projects.tags.abstract': 'تجريدي',
        'projects.tags.digital': 'رقمي',
        'projects.tags.texture': 'نسيج',
        'projects.tags.installation': 'تركيب',
        'projects.tags.interactive': 'تفاعلي',
        'projects.tags.space': 'فضاء',
        'projects.tags.collection': 'مجموعة',
        'projects.tags.large': 'كبير الحجم',
        'projects.tags.canvas': 'لوحة',
        'projects.viewCase': 'عرض السلسلة',
        'services.title': 'خدمات فنية',
        'services.subtitle': 'تحويل المساحات عبر التعبير التجريدي',
        'services.service1.title': 'أعمال فنية مطلوبة',
        'services.service1.description': 'قطع تجريدية مصممة خصيصاً لمساحتك، مع مراعاة الضوء والنسيج والرنين العاطفي.',
        'services.service2.title': 'التركيبات الرقمية',
        'services.service2.description': 'تجارب رقمية غامرة للمعارض والمساحات المؤسسية والمجموعات الخاصة.',
        'services.service3.title': 'الإخراج الفني',
        'services.service3.description': 'تنظيم وتوجيه المشاريع الفنية التي تدمج بين الابتكار الرقمي والمبادئ الجمالية الخالدة.',
        'gallery.title': 'المعرض التجريدي',
        'gallery.subtitle': 'تأمل في الشكل واللون والفضاء',
        'gallery.item1': 'أشكال سائلة',
        'gallery.item2': 'تدرجات لونية خفية',
        'gallery.item3': 'أنسجة عضوية',
        'gallery.item4': 'توازن هندسي',
        'gallery.item5': 'فضاء بسيط',
        'gallery.item6': 'لون عاطفي',
        'contact.title': 'لنخلق معاً',
        'contact.subtitle': 'مستعد لتحويل مساحتك بالفن؟',
        'contact.heading': 'طلب عمل فني',
        'contact.description': 'مهتم بقطعة مخصصة؟ يسعدني مناقشة رؤيتك وإنشاء شيء فريد حقاً لمساحتك.',
        'contact.emailTitle': 'البريد الإلكتروني',
        'contact.phoneTitle': 'الهاتف',
        'contact.locationTitle': 'الاستوديو',
        'contact.location': 'طلبات عالمية',
        'contact.availabilityTitle': 'التوافر',
        'contact.availability': 'طلبات محدودة متاحة',
        'contact.form.name': 'اسمك',
        'contact.form.email': 'البريد الإلكتروني',
        'contact.form.message': 'رؤية المشروع',
        'contact.form.submit': 'مناقشة الطلب',
        'contact.socialTitle': 'تابع الرحلة',
        'modal.overview': 'بيان فني',
        'modal.techniques': 'التقنيات المستخدمة',
        'modal.startProject': 'طلب عمل مماثل',
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