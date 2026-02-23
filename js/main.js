/* ================================
   First Physio - Main JavaScript
   ================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ================================
    // Utility: Safe localStorage access
    // ================================
    function safeGetItem(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }
    function safeSetItem(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { /* private browsing */ }
    }

    // ================================
    // Mobile Navigation
    // ================================
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Open menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close menu
    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking a link
    if (navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show-menu');
                document.body.style.overflow = '';
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle &&
            navMenu.classList.contains('show-menu') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        }
    });

    // ================================
    // Header Scroll Effect
    // ================================
    const header = document.getElementById('header');

    // Combined scroll handler (header effect + active nav)
    function onScroll() {
        if (!header) return;
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active nav link highlighting
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = currentScroll + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
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
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ================================
    // Theme Toggle (Light/Dark Mode)
    // ================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark
    const savedTheme = safeGetItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            body.setAttribute('data-theme', newTheme);
            safeSetItem('theme', newTheme);
        });
    }

    // ================================
    // Smooth Scroll for Anchor Links
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target && header) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ================================
    // Intersection Observer for Animations
    // ================================
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // ================================
    // Counter Animation for Stats
    // ================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    // Trigger counter animation when stats come into view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const number = parseInt(text.replace(/\D/g, ''));
                        if (number) {
                            stat.textContent = '0';
                            animateCounter(stat, number);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ================================
    // Practo Widget Button Handler
    // ================================
    // All buttons with class 'book-appointment-btn' or 'practo-trigger' 
    // will trigger the hidden Practo booking widget
    function initPractoBooking() {
        // Find all booking buttons that should trigger Practo
        const bookingButtons = document.querySelectorAll('.book-appointment-btn, .practo-trigger, [data-practo-trigger]');

        bookingButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                triggerPractoWidget();
            });
        });
    }

    // Function to trigger the Practo widget
    const PRACTO_PROFILE_URL = 'https://www.practo.com/coimbatore/doctor/augustine-joseph-physiotherapist';

    function triggerPractoWidget() {
        const practoWidget = document.querySelector('practo\\:abs_widget, [widget]');
        if (practoWidget) {
            const practoButton = practoWidget.querySelector('a, button, [role="button"]') || practoWidget;
            if (practoButton && practoButton.click) {
                practoButton.click();
                return;
            }
        }
        // Fallback: open Practo profile if widget didn't load
        window.open(PRACTO_PROFILE_URL, '_blank', 'noopener,noreferrer');
    }

    // Initialize Practo booking handlers
    initPractoBooking();

    // Make triggerPractoWidget available globally for inline onclick handlers
    window.triggerPractoWidget = triggerPractoWidget;

    // ================================
    // Form Handling - Web3Forms Integration
    // ================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            try {
                // Submit to Web3Forms API
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                if (result.success) {
                    // Success - Show modal popup
                    contactForm.reset();
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;

                    // Show success modal
                    showSuccessModal();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }

            } catch (error) {
                submitBtn.innerHTML = '<span>Error. Try again.</span>';

                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // ================================
    // Success Modal Functions
    // ================================
    window.showSuccessModal = function () {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.style.display = 'flex';
            // Trigger reflow for animation
            modal.offsetHeight;
            modal.classList.add('show');
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeSuccessModal = function () {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            // Restore body scroll
            document.body.style.overflow = '';
        }
    };

    // Close modal on backdrop click
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }

    // ================================
    // Parallax Effect for Orbs
    // ================================
    const orbs = document.querySelectorAll('.orb');

    if (orbs.length > 0 && window.innerWidth > 768) {
        let ticking = false;
        window.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    orbs.forEach((orb, index) => {
                        const speed = (index + 1) * 10;
                        const x = (mouseX - 0.5) * speed;
                        const y = (mouseY - 0.5) * speed;
                        orb.style.transform = `translate(${x}px, ${y}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ================================
    // Preloader (optional)
    // ================================
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // ================================
    // Lazy Loading Images
    // ================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ================================
    // Keyboard Navigation
    // ================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (navMenu && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
                document.body.style.overflow = '';
            }
            // Close success modal
            const modal = document.getElementById('success-modal');
            if (modal && modal.classList.contains('show')) {
                closeSuccessModal();
            }
        }
    });

    // ================================
    // Font Size Controls for Blog
    // ================================
    function initFontSizeControls() {
        const decreaseBtn = document.getElementById('decrease-font');
        const resetBtn = document.getElementById('reset-font');
        const increaseBtn = document.getElementById('increase-font');
        const blogContent = document.querySelector('.blog-article-content');
        const fontBtns = document.querySelectorAll('.font-btn');

        if (!blogContent || !decreaseBtn) return;

        const sizes = {
            small: '1rem',
            medium: '1.15rem',
            large: '1.5rem'
        };

        function setFontSize(size, activeBtn) {
            // Apply size using CSS variable for better performance and consistency
            blogContent.style.setProperty('--blog-font-size', sizes[size]);

            fontBtns.forEach(btn => btn.classList.remove('active'));
            if (activeBtn) activeBtn.classList.add('active');

            safeSetItem('blogFontSize', size);
        }

        decreaseBtn.addEventListener('click', () => setFontSize('small', decreaseBtn));
        resetBtn.addEventListener('click', () => setFontSize('medium', resetBtn));
        increaseBtn.addEventListener('click', () => setFontSize('large', increaseBtn));

        // Load saved preference
        const savedSize = safeGetItem('blogFontSize');
        if (savedSize) {
            const btnMap = {
                small: decreaseBtn,
                medium: resetBtn,
                large: increaseBtn
            };
            if (btnMap[savedSize]) {
                setFontSize(savedSize, btnMap[savedSize]);
            }
        }
    }

    initFontSizeControls();

    // ================================
    // Testimonials Carousel
    // ================================
    const testimonialsPrev = document.getElementById('testimonials-prev');
    const testimonialsNext = document.getElementById('testimonials-next');
    const testimonialsDots = document.getElementById('testimonials-dots');
    const testimonialsContainer = document.getElementById('testimonials-container');

    if (testimonialsPrev && testimonialsNext && testimonialsContainer) {
        let currentPage = 1;
        const totalPages = testimonialsDots ? testimonialsDots.querySelectorAll('.dot').length : 3;

        function updateCarousel() {
            // Update pages visibility
            const pages = testimonialsContainer.querySelectorAll('.testimonials-page');
            pages.forEach(page => {
                page.classList.remove('active');
                if (parseInt(page.dataset.page) === currentPage) {
                    page.classList.add('active');
                }
            });

            // Update dots
            if (testimonialsDots) {
                const dots = testimonialsDots.querySelectorAll('.dot');
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    if (parseInt(dot.dataset.page) === currentPage) {
                        dot.classList.add('active');
                    }
                });
            }

            // Update arrow states
            testimonialsPrev.disabled = currentPage === 1;
            testimonialsNext.disabled = currentPage === totalPages;
        }

        testimonialsPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateCarousel();
            }
        });

        testimonialsNext.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateCarousel();
            }
        });

        // Dot navigation
        if (testimonialsDots) {
            testimonialsDots.querySelectorAll('.dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    currentPage = parseInt(dot.dataset.page);
                    updateCarousel();
                });
            });
        }

        // Initial state
        updateCarousel();
    }

    // ================================
    // Service Read More Toggle
    // ================================
    function initServiceReadMore() {
        const readMoreBtns = document.querySelectorAll('.service-read-more-btn');

        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const card = this.closest('.category-service-card');
                const btnText = this.querySelector('.btn-text');

                if (card) {
                    card.classList.toggle('expanded');

                    if (card.classList.contains('expanded')) {
                        btnText.textContent = 'Read Less';
                    } else {
                        btnText.textContent = 'Read More';
                    }
                }
            });
        });
    }

    initServiceReadMore();

    // ================================
    // FAQ Toggle Functionality
    // ================================
    function initFAQToggle() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other open FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    initFAQToggle();
});
