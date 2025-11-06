document.addEventListener('DOMContentLoaded', () => {

    // === 1. Mobile Menu Toggle ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // === 2. Sticky Header Scroll Effect ===
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // === 3. Scroll Fade-in Animation ===
    const sections = document.querySelectorAll('.section-fade-in');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once it's visible to prevent re-animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // === 4. Hero Typing Effect ===
    const typingTextElement = document.querySelector('.typing-text');
    const caretElement = document.querySelector('.caret');
    
    if (typingTextElement && caretElement) {
        const roles = ["Bioscience Specialist", "Biotechnology Research Analyst"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 100;
        const deleteSpeed = 75;
        const delayBetweenRoles = 2000;

        function type() {
            const currentRole = roles[roleIndex];
            
            // Show caret only while typing/deleting
            caretElement.style.opacity = '1';

            if (isDeleting) {
                // Deleting text
                typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, 500); // Pause before typing new role
                } else {
                    setTimeout(type, deleteSpeed);
                }
            } else {
                // Typing text
                typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(type, delayBetweenRoles); // Pause after typing
                } else {
                    setTimeout(type, typeSpeed);
                }
            }
        }
        
        // Initial call to start the animation
        setTimeout(type, 500);
    }

    // === 5. Smooth Scrolling for ALL Anchor Links ===
    // This is handled by `scroll-behavior: smooth;` in the CSS file now.
    // This JS is a fallback or for more complex offsets if needed,
    // but for this build, CSS is cleaner.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's a link to the same page
            if (this.hash !== "") {
                const targetElement = document.querySelector(this.hash);
                if (targetElement) {
                    e.preventDefault(); // Prevent default jump
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

});