// Readability Enhancements for Academic Website
// Inspired by modern web techniques from ChoiAca LP

document.addEventListener('DOMContentLoaded', function() {
    // ========== Scroll-triggered fade-in animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const fadeElements = document.querySelectorAll(
        '.page__content h2, ' +
        '.page__content h3, ' +
        '.page__content p, ' +
        '.archive__item, ' +
        '.page__content ul, ' +
        '.page__content ol, ' +
        '.page__content blockquote'
    );

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ========== Smooth scroll for anchor links ==========
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 70; // Masthead height
                const elementPosition = targetElement.offsetTop;
                const scrollPosition = elementPosition - headerHeight;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Enhanced hero animation on page load ==========
    const heroSection = document.querySelector('.hero-section, .minimal-hero'); // Support both during transition
    if (heroSection) {
        heroSection.classList.add('gradient-bg');
    }

    // ========== Progress indicator for long articles ==========
    const createProgressIndicator = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-400), var(--primary-600));
            width: 0%;
            transition: width 0.1s ease;
            z-index: 1000;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    // Only add progress indicator for long pages
    if (document.documentElement.scrollHeight > window.innerHeight * 2) {
        createProgressIndicator();
    }

    // ========== Link preview on hover (subtle effect) ==========
    const contentLinks = document.querySelectorAll('.page__content a[href^="http"]');
    
    contentLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ========== Highlight current section in navigation ==========
    const sections = document.querySelectorAll('.page__content h2[id]');
    const navLinks = document.querySelectorAll('.toc__menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});