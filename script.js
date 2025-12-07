// script.js - بورتفوليو صانع محتوى - ثيم أبيض وأسود
document.addEventListener('DOMContentLoaded', function() {
    // نظام الترجمة الكامل
    const translations = {
        ar: {
            // التنقل
            logo: "زياد",
            navHome: "الرئيسية",
            navProfile: "حول",
            navServices: "الخدمات",
            navPortfolio: "أعمالي",
            navSkills: "المهارات",
            navContact: "اتصل",
            language: "EN",
            
            // الصفحة الرئيسية
            heroBadge: "صانع محتوى إبداعي",
            heroTitle: "أحكي قصتك بصرياً",
            heroDescription: "أصنع محتوى مرئيًا مؤثرًا يجذب جمهورك ويحكي قصتك بطريقة لا تُنسى. أجمع بين الإبداع البصري والتسويق الرقمي لإنتاج محتوى يلهم ويؤثر.",
            viewPortfolio: "شاهد أعمالي",
            contactMe: "دعنا نتواصل",
            statProjects: "مشروع",
            statClients: "عميل",
            statYears: "سنوات خبرة",
            whyChooseTitle: "لماذا تختارني؟",
            feature1Title: "إبداع لا حدود له",
            feature1Desc: "أبتكر أفكارًا فريدة تجعل محتواك مميزًا وتجذب انتباه جمهورك المستهدف",
            feature2Title: "سرعة في التسليم",
            feature2Desc: "ألتزم بمواعيد التسليم مع الحفاظ على أعلى معايير الجودة والإبداع",
            feature3Title: "تحليل أداء",
            feature3Desc: "أحلل أداء المحتوى وأقدم تقارير تفصيلية لتحسين استراتيجيتك الرقمية",
            feature4Title: "تعاون مستمر",
            feature4Desc: "أعمل معك عن قرب لفهم رؤيتك وتحويلها إلى محتوى مؤثر وفعال",
            
            // ملخص الأقسام
            summaryTitle: "استكشف محفظتي",
            summarySubtitle: "تصفح أقسامي المختلفة لاكتشاف مهاراتي وخبراتي في صناعة المحتوى",
            summaryProfileTitle: "الملف الشخصي",
            summaryProfileDesc: "تعرف على مسيرتي المهنية وخبراتي في مجال صناعة المحتوى الرقمي والإبداع البصري",
            summaryServicesTitle: "الخدمات",
            summaryServicesDesc: "اكتشف مجموعة الخدمات المتكاملة التي أقدمها في مجال صناعة المحتوى الرقمي",
            summaryPortfolioTitle: "معرض الأعمال",
            summaryPortfolioDesc: "تصفح مجموعة من أبرز مشاريعي في إنتاج الفيديو والمحتوى البصري الإبداعي",
            summarySkillsTitle: "المهارات",
            summarySkillsDesc: "تعرف على مهاراتي التقنية والإبداعية المتقدمة في مجال صناعة المحتوى",
            
            // اقتباس
            quoteText: "المحتوى الجيد ليس مجرد رسالة، بل هو تجربة بصرية تترك أثرًا في الذاكرة",
            quoteAuthor: "- زياد، صانع محتوى",
            
            // صفحة حول
            profileTitle: "حول زياد",
            profileDescription: "صانع محتوى إبداعي متخصص في إنتاج محتوى مرئي مؤثر يجمع بين الإبداع والتسويق الرقمي",
            aboutTitle: "شغفي هو صناعة المحتوى الذي يلهم",
            aboutDescription: "مع أكثر من 3 سنوات من الخبرة في صناعة المحتوى الرقمي، أساعد العلامات التجارية والأفراد على سرد قصصهم بشكل مرئي مؤثر. أؤمن أن كل علامة تجارية لها قصة فريدة تستحق أن تُحكى بطريقة إبداعية.",
            specialtiesTitle: "تخصصاتي",
            connectTitle: "تواصل معي",
            philosophyTitle: "فلسفتي في صناعة المحتوى",
            philosophy1Title: "القصة أولاً",
            philosophy1Desc: "أبدأ دائمًا من القصة، لأن المحتوى الجيد يبدأ بقصة جيدة",
            philosophy2Title: "الجودة فوق الكمية",
            philosophy2Desc: "أفضل إنتاج محتوى عالي الجودة يؤثر على جمهور واحد بدلاً من محتوى ضعيف للجميع",
            philosophy3Title: "الابتكار المستمر",
            philosophy3Desc: "أتطور باستمرار لأواكب أحدث اتجاهات المحتوى وأساليب الإنتاج",
            
            // صفحة الخدمات
            servicesTitle: "خدماتي",
            servicesDescription: "أقدم مجموعة متكاملة من خدمات صناعة المحتوى لتلبية جميع احتياجاتك الرقمية",
            service1Title: "إنتاج الفيديو",
            service1Desc: "تصوير ومونتاج فيديوهات احترافية للعلامات التجارية، المنتجات، والمحتوى الترويجي",
            service1Feature1: "فيديو سلو موشن",
            service1Feature2: "فيديو موشن جرافيك",
            service1Feature3: "فيديو المنتجات",
            service2Title: "كتابة المحتوى",
            service2Desc: "كتابة محتوى إبداعي وجذاب لمواقع التواصل الاجتماعي، المدونات، والمواقع الإلكترونية",
            service2Feature1: "نصوص وسائل التواصل",
            service2Feature2: "مقالات المدونات",
            service2Feature3: "سيناريوهات الفيديو",
            service3Title: "استراتيجية المحتوى",
            service3Desc: "تطوير خطط محتوى شاملة وتحليل أداء لتحقيق أهدافك الرقمية",
            service3Feature1: "تخطيط المحتوى",
            service3Feature2: "تحليل المنافسة",
            service3Feature3: "تقارير الأداء",
            service4Title: "التصوير الإبداعي",
            service4Desc: "تصوير محتوى مرئي عالي الجودة للاستخدام على مختلف المنصات الرقمية",
            service4Feature1: "تصوير المنتجات",
            service4Feature2: "تصوير الأحداث",
            service4Feature3: "صور المحتوى",
            
            // عملية العمل
            processTitle: "كيف أعمل؟",
            step1Title: "التشاور",
            step1Desc: "نناقش رؤيتك وأهدافك لفهم احتياجاتك بشكل دقيق",
            step2Title: "التخطيط",
            step2Desc: "أطور خطة محتوى واستراتيجية تنفيذ مخصصة لك",
            step3Title: "الإنتاج",
            step3Desc: "أبدأ في إنتاج المحتوى مع تحديثات مستمرة لك",
            step4Title: "التسليم",
            step4Desc: "أسلّم المحتوى النهائي مع تقرير الأداء والتوصيات",
            
            // صفحة أعمالي
            portfolioTitle: "معرض أعمالي",
            portfolioDescription: "مجموعة مختارة من مشاريع المحتوى التي نفذتها لعلامات تجارية مختلفة",
            project1Title: "حملة فيديو لعلامة تجارية",
            project1Desc: "إنتاج سلسلة فيديوهات ترويجية لعلامة تجارية في قطاع الأزياء",
            project2Title: "إدارة محتوى وسائل التواصل",
            project2Desc: "تخطيط وتنفيذ استراتيجية محتوى لمدة 3 أشهر لعلامة تجارية",
            project3Title: "جلسة تصوير لمنتج",
            project3Desc: "تصوير محترف لمنتجات إلكترونية جديدة لاستخدامها في التسويق",
            project4Title: "فيديو موشن جرافيك",
            project4Desc: "إنتاج فيديو موشن جرافيك لشركة ناشئة في مجال التكنولوجيا",
            project5Title: "محتوى تيك توك",
            project5Desc: "إنشاء محتوى تيك توك يومي لعلامة تجارية لمدة شهر",
            project6Title: "تصوير حدث",
            project6Desc: "توثيق وتصوير حدث إطلاق منتج لشركة تقنية",
            
            // صفحة المهارات
            skillsTitle: "مهاراتي",
            skillsDescription: "مجموعة من المهارات التقنية والإبداعية التي أتمتع بها في مجال صناعة المحتوى",
            creativeSkills: "المهارات الإبداعية",
            skillVideo: "إنتاج الفيديو والمونتاج",
            skillWriting: "كتابة المحتوى الإبداعي",
            skillPhoto: "التصوير الفوتوغرافي",
            skillDesign: "التصميم البصري",
            technicalSkills: "المهارات التقنية",
            skillPremiere: "Adobe Premiere Pro",
            skillAfter: "Adobe After Effects",
            skillPhotoshop: "Adobe Photoshop",
            skillAnalytics: "تحليل البيانات",
            softSkills: "المهارات الشخصية",
            skillCommunication: "التواصل الفعال",
            skillTime: "إدارة الوقت",
            skillProblem: "حل المشكلات",
            skillTeam: "العمل الجماعي",
            toolsTitle: "الأدوات التي أستخدمها",
            
            // صفحة الاتصال
            contactTitle: "لنعمل معًا",
            contactDescription: "أهلاً بك! دعنا نناقش مشروعك القادم ونحول أفكارك إلى محتوى إبداعي مؤثر",
            emailTitle: "البريد الإلكتروني",
            phoneTitle: "الهاتف",
            locationTitle: "الموقع",
            locationText: "الرياض، المملكة العربية السعودية",
            hoursTitle: "ساعات العمل",
            hoursText: "الأحد - الخميس: 9 ص - 6 م",
            formName: "الاسم *",
            formEmail: "البريد الإلكتروني *",
            formSubject: "نوع المشروع *",
            formMessage: "تفاصيل المشروع *",
            formMessagePlaceholder: "أخبرني عن مشروعك وأهدافك...",
            formSubmit: "أرسل الرسالة",
            
            // التذييل
            footerText: "صانع محتوى إبداعي متخصص في إنتاج محتوى مرئي مؤثر يجمع بين الإبداع والتسويق الرقمي"
        },
        en: {
            // Navigation
            logo: "Ziad",
            navHome: "Home",
            navProfile: "About",
            navServices: "Services",
            navPortfolio: "Portfolio",
            navSkills: "Skills",
            navContact: "Contact",
            language: "AR",
            
            // Home Page
            heroBadge: "Creative Content Creator",
            heroTitle: "Tell Your Story Visually",
            heroDescription: "I create impactful visual content that attracts your audience and tells your story in an unforgettable way. I combine visual creativity and digital marketing to produce content that inspires and influences.",
            viewPortfolio: "View My Work",
            contactMe: "Let's Connect",
            statProjects: "Projects",
            statClients: "Clients",
            statYears: "Years Experience",
            whyChooseTitle: "Why Choose Me?",
            feature1Title: "Unlimited Creativity",
            feature1Desc: "I create unique ideas that make your content stand out and capture your target audience's attention",
            feature2Title: "Fast Delivery",
            feature2Desc: "I commit to delivery deadlines while maintaining the highest standards of quality and creativity",
            feature3Title: "Performance Analysis",
            feature3Desc: "I analyze content performance and provide detailed reports to improve your digital strategy",
            feature4Title: "Continuous Collaboration",
            feature4Desc: "I work closely with you to understand your vision and transform it into impactful, effective content",
            
            // Sections Summary
            summaryTitle: "Explore My Portfolio",
            summarySubtitle: "Browse through my different sections to discover my skills and experience in content creation",
            summaryProfileTitle: "Profile",
            summaryProfileDesc: "Learn about my professional journey and experience in digital content creation and visual creativity",
            summaryServicesTitle: "Services",
            summaryServicesDesc: "Discover the comprehensive range of services I offer in digital content creation",
            summaryPortfolioTitle: "Portfolio",
            summaryPortfolioDesc: "Browse a collection of my most prominent projects in video production and creative visual content",
            summarySkillsTitle: "Skills",
            summarySkillsDesc: "Learn about my advanced technical and creative skills in content creation",
            
            // Quote
            quoteText: "Good content is not just a message, it's a visual experience that leaves a mark in memory",
            quoteAuthor: "- Ziad, Content Creator",
            
            // About Page
            profileTitle: "About Ziad",
            profileDescription: "Creative content creator specializing in producing impactful visual content that combines creativity and digital marketing",
            aboutTitle: "My Passion is Creating Content That Inspires",
            aboutDescription: "With over 3 years of experience in digital content creation, I help brands and individuals tell their stories in visually impactful ways. I believe every brand has a unique story that deserves to be told creatively.",
            specialtiesTitle: "My Specialties",
            connectTitle: "Connect With Me",
            philosophyTitle: "My Content Creation Philosophy",
            philosophy1Title: "Story First",
            philosophy1Desc: "I always start with the story, because good content begins with a good story",
            philosophy2Title: "Quality Over Quantity",
            philosophy2Desc: "I prefer producing high-quality content that impacts one audience over weak content for everyone",
            philosophy3Title: "Continuous Innovation",
            philosophy3Desc: "I continuously evolve to keep up with the latest content trends and production methods",
            
            // Services Page
            servicesTitle: "My Services",
            servicesDescription: "I offer a comprehensive set of content creation services to meet all your digital needs",
            service1Title: "Video Production",
            service1Desc: "Professional video shooting and editing for brands, products, and promotional content",
            service1Feature1: "Slow Motion Video",
            service1Feature2: "Motion Graphics Video",
            service1Feature3: "Product Videos",
            service2Title: "Content Writing",
            service2Desc: "Creative and engaging content writing for social media, blogs, and websites",
            service2Feature1: "Social Media Texts",
            service2Feature2: "Blog Articles",
            service2Feature3: "Video Scripts",
            service3Title: "Content Strategy",
            service3Desc: "Developing comprehensive content plans and performance analysis to achieve your digital goals",
            service3Feature1: "Content Planning",
            service3Feature2: "Competition Analysis",
            service3Feature3: "Performance Reports",
            service4Title: "Creative Photography",
            service4Desc: "High-quality visual content photography for use on various digital platforms",
            service4Feature1: "Product Photography",
            service4Feature2: "Event Photography",
            service4Feature3: "Content Images",
            
            // Work Process
            processTitle: "How I Work?",
            step1Title: "Consultation",
            step1Desc: "We discuss your vision and goals to understand your needs accurately",
            step2Title: "Planning",
            step2Desc: "I develop a customized content plan and implementation strategy for you",
            step3Title: "Production",
            step3Desc: "I start producing content with continuous updates to you",
            step4Title: "Delivery",
            step4Desc: "I deliver the final content with performance report and recommendations",
            
            // Portfolio Page
            portfolioTitle: "My Portfolio",
            portfolioDescription: "A curated selection of content projects I've executed for various brands",
            project1Title: "Brand Video Campaign",
            project1Desc: "Production of promotional video series for a fashion brand",
            project2Title: "Social Media Content Management",
            project2Desc: "Planning and implementing 3-month content strategy for a brand",
            project3Title: "Product Photography Session",
            project3Desc: "Professional photography of new electronic products for marketing use",
            project4Title: "Motion Graphics Video",
            project4Desc: "Production of motion graphics video for a tech startup",
            project5Title: "TikTok Content",
            project5Desc: "Creating daily TikTok content for a brand for one month",
            project6Title: "Event Photography",
            project6Desc: "Documentation and photography of a product launch event for a tech company",
            
            // Skills Page
            skillsTitle: "My Skills",
            skillsDescription: "A set of technical and creative skills I possess in content creation",
            creativeSkills: "Creative Skills",
            skillVideo: "Video Production & Editing",
            skillWriting: "Creative Content Writing",
            skillPhoto: "Photography",
            skillDesign: "Visual Design",
            technicalSkills: "Technical Skills",
            skillPremiere: "Adobe Premiere Pro",
            skillAfter: "Adobe After Effects",
            skillPhotoshop: "Adobe Photoshop",
            skillAnalytics: "Data Analysis",
            softSkills: "Soft Skills",
            skillCommunication: "Effective Communication",
            skillTime: "Time Management",
            skillProblem: "Problem Solving",
            skillTeam: "Teamwork",
            toolsTitle: "Tools I Use",
            
            // Contact Page
            contactTitle: "Let's Work Together",
            contactDescription: "Welcome! Let's discuss your upcoming project and transform your ideas into impactful creative content",
            emailTitle: "Email",
            phoneTitle: "Phone",
            locationTitle: "Location",
            locationText: "Riyadh, Saudi Arabia",
            hoursTitle: "Working Hours",
            hoursText: "Sunday - Thursday: 9 AM - 6 PM",
            formName: "Name *",
            formEmail: "Email *",
            formSubject: "Project Type *",
            formMessage: "Project Details *",
            formMessagePlaceholder: "Tell me about your project and goals...",
            formSubmit: "Send Message",
            
            // Footer
            footerText: "Creative content creator specializing in producing impactful visual content that combines creativity and digital marketing"
        }
    };

    // تهيئة تأثير الجزيئات المتحركة
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#000000" },
                shape: { type: "circle" },
                opacity: { value: 0.1, random: true },
                size: { value: 2, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#000000",
                    opacity: 0.05,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // تهيئة المتغيرات
    let currentLang = 'ar';
    let currentPage = 'home';
    const backHomeBtn = document.getElementById('backHomeBtn');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');

    // وظيفة تغيير اللغة
    function changeLanguage(lang) {
        currentLang = lang;
        
        // تحديث اتجاه الصفحة
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // تغيير الخط حسب اللغة
        document.body.style.fontFamily = lang === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif";
        
        // تحديث جميع النصوص
        updateAllTexts();
        
        // تحديث زر اللغة
        const languageText = languageBtn.querySelector('.language-text');
        if (languageText) {
            languageText.textContent = translations[lang].language;
        }
        
        // تحديث القائمة المنسدلة للغة
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            }
        });
        
        // تحديث زر الرجوع
        const backHomeSpan = backHomeBtn.querySelector('span');
        if (backHomeSpan) {
            backHomeSpan.textContent = translations[lang].navHome;
        }
    }

    // وظيفة تحديث جميع النصوص
    function updateAllTexts() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[currentLang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', translations[currentLang][key]);
                    }
                } else if (element.tagName === 'BUTTON' && element.type === 'submit') {
                    element.innerHTML = `<i class="fas fa-paper-plane"></i> ${translations[currentLang][key]}`;
                } else {
                    const text = translations[currentLang][key];
                    if (text.includes('<br>')) {
                        element.innerHTML = text;
                    } else {
                        element.textContent = text;
                    }
                }
            }
        });
    }

    // وظيفة تغيير الصفحة
    function changePage(pageId) {
        if (pageId === currentPage) return;
        
        // إخفاء جميع الصفحات
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // إزالة النشاط من جميع روابط التنقل
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // إظهار الصفحة المحددة
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // إضافة النشاط للرابط المحدد
            const targetLink = document.querySelector(`.navbar-link[data-page="${pageId}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            }
            
            // تحديث المتغير الحالي
            currentPage = pageId;
            
            // إظهار أو إخفاء زر الرجوع
            if (pageId === 'home') {
                backHomeBtn.style.display = 'none';
            } else {
                backHomeBtn.style.display = 'flex';
            }
            
            // إغلاق القائمة على الأجهزة المحمولة
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
                navbarToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // تفعيل تأثير شريط المهارات إذا كانت الصفحة هي المهارات
            if (pageId === 'skills') {
                setTimeout(animateSkills, 300);
            }
            
            // تفعيل عداد الإحصائيات إذا كانت الصفحة الرئيسية
            if (pageId === 'home') {
                setTimeout(animateStats, 300);
            }
            
            // تفعيل تأثيرات البطاقات
            setTimeout(checkCards, 300);
            
            // التمرير إلى أعلى الصفحة
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // زر الرجوع للرئيسية
    backHomeBtn.addEventListener('click', function() {
        changePage('home');
    });

    // تبديل القائمة على الأجهزة المحمولة
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        this.innerHTML = navbarMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // التنقل عبر روابط القائمة
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
        });
    });

    // التنقل عبر بطاقات الملخص
    document.querySelectorAll('.summary-card').forEach(card => {
        card.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
        });
    });

    // التنقل عبر روابط الملخص (لمنع انتشار الحدث)
    document.querySelectorAll('.summary-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
        });
    });

    // التنقل عبر الأزرار
    document.querySelectorAll('.btn[data-page]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
        });
    });

    // تبديل اللغة
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    // اختيار لغة من القائمة
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            languageDropdown.classList.remove('show');
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });

    // تأثير شريط المهارات
    function animateSkills() {
        const skillProgressElements = document.querySelectorAll('.skill-progress');
        const skillsPage = document.getElementById('skills');
        
        if (!skillsPage) return;
        
        const rect = skillsPage.getBoundingClientRect();
        
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            skillProgressElements.forEach(skill => {
                const width = skill.getAttribute('data-width');
                skill.style.width = width + '%';
            });
        }
    }

    // تأثير عداد الإحصائيات
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        const statsSection = document.querySelector('.hero-stats');
        
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
            });
        }
    }

    // تصفية أعمال المعرض
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // إرسال نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // رسالة نجاح
            const message = currentLang === 'ar' 
                ? 'شكراً لك على رسالتك! سأعود إليك في أقرب وقت ممكن.' 
                : 'Thank you for your message! I will get back to you as soon as possible.';
            
            // إنشاء إشعار
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 30px;
                background: #000000;
                color: #ffffff;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                z-index: 9999;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 12px;
                transform: translateX(150%);
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border: 2px solid #000000;
            `;
            
            notification.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 20px;"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // عرض الإشعار
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // إخفاء الإشعار بعد 4 ثواني
            setTimeout(() => {
                notification.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }, 4000);
            
            // إعادة تعيين النموذج
            contactForm.reset();
        });
    }

    // إضافة تأثيرات للبطاقات عند التمرير
    const cards = document.querySelectorAll('.feature-card, .service-card, .philosophy-card, .portfolio-item, .skill-category, .contact-card, .tool-item, .summary-card, .stat-item');
    
    function checkCards() {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // إعداد البطاقات الأولية
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    // تفعيل تأثيرات البطاقات عند التحميل
    setTimeout(checkCards, 300);
    
    // تفعيل تأثيرات البطاقات عند التمرير
    window.addEventListener('scroll', checkCards);
    
    // تفعيل تأثيرات عند التمرير
    window.addEventListener('scroll', function() {
        animateSkills();
        animateStats();
    });
    
    // تهيئة اللغة الافتراضية
    changeLanguage('ar');
    
    // إخفاء زر الرجوع في الصفحة الرئيسية
    backHomeBtn.style.display = 'none';
    
    // تفعيل تأثيرات عند التحميل
    setTimeout(() => {
        animateStats();
        animateSkills();
    }, 500);
    
    // تأثير تحريك العناوين عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // مراقبة عناصر الصفحة
    document.querySelectorAll('.page-title, .section-title, .hero-title, .page-description').forEach(el => {
        observer.observe(el);
    });
});
