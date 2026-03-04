document.addEventListener('DOMContentLoaded', () => {

    // Create and add transition overlay if it doesn't exist
    let overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
    }

    // Fade in page on load
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 100);

    // Page Transition Effect
    const pageLinks = document.querySelectorAll('a[href$=".html"]');

    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && !href.startsWith('#')) {
                e.preventDefault();

                // Fade to black
                overlay.classList.remove('hidden');
                overlay.classList.add('fade-in');

                // Navigate after fade completes
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });


    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        item.style.transitionDelay = `${index * 0.1}s`; // Staggered delay
        observer.observe(item);
    });

    // Lightbox Functionality
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    const activeImage = document.createElement('img');
    lightbox.appendChild(activeImage);

    // Lightbox styles (injected dynamically or could be in CSS)
    Object.assign(lightbox.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease'
    });

    activeImage.style.maxWidth = '90%';
    activeImage.style.maxHeight = '90%';
    activeImage.style.objectFit = 'contain';

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            activeImage.src = imgSrc;
            lightbox.classList.add('active');
            lightbox.style.opacity = '1';
            lightbox.style.pointerEvents = 'all';
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== activeImage) {
            lightbox.classList.remove('active');
            lightbox.style.opacity = '0';
            lightbox.style.pointerEvents = 'none';
        }
    });

    // Background Hover Logic for Links with data-bg attribute
    const linksWithBg = document.querySelectorAll('a[data-bg]');
    const bgContainer = document.querySelector('.hover-background-container');
    const bgOverlay = document.querySelector('.hover-bg-overlay');

    if (bgContainer) {
        linksWithBg.forEach(link => {
            const bgImage = link.getAttribute('data-bg');

            if (bgImage) {
                link.addEventListener('mouseenter', () => {
                    bgContainer.style.backgroundImage = `url(${bgImage})`;
                    bgContainer.style.opacity = '1';
                    bgOverlay.style.opacity = '0.3';
                });

                link.addEventListener('mouseleave', () => {
                    bgContainer.style.opacity = '0';
                    bgOverlay.style.opacity = '0';
                });
            }
        });
    }

    // Parallax Effect for Rust Settlers
    const scrollContainer = document.querySelector('.scroll-container');
    const bgImage = document.querySelector('.background-image');

    if (scrollContainer && bgImage) {
        scrollContainer.addEventListener('scroll', () => {
            const scrolled = scrollContainer.scrollTop;
            bgImage.style.transform = `scale(1.1) translateY(${scrolled * 0.05}px)`;
        });
    }

    // Book Panel Interactions for Rust Settlers
    const bookTitleButtons = document.querySelectorAll('.book-title-btn');
    const panelOverlay = document.querySelector('.panel-overlay');
    const bookPanels = document.querySelectorAll('.book-panel');
    const panelCloseButtons = document.querySelectorAll('.panel-close');

    if (bookTitleButtons.length > 0) {
        // Open panel when book title is clicked
        bookTitleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const bookId = button.getAttribute('data-book');
                const panel = document.getElementById(`panel-${bookId}`);

                if (panel) {
                    // Close any open panels first
                    bookPanels.forEach(p => p.classList.remove('active'));

                    // Open the selected panel
                    panel.classList.add('active');
                    panelOverlay.classList.add('active');
                    document.body.classList.add('panel-open');
                }
            });
        });

        // Close panel when close button is clicked
        panelCloseButtons.forEach(button => {
            button.addEventListener('click', closePanel);
        });

        // Close panel when overlay is clicked
        if (panelOverlay) {
            panelOverlay.addEventListener('click', closePanel);
        }

        // Close panel when ESC key is pressed
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePanel();
            }
        });

        // Function to close all panels
        function closePanel() {
            bookPanels.forEach(panel => panel.classList.remove('active'));
            panelOverlay.classList.remove('active');
            document.body.classList.remove('panel-open');
        }
    }

    // Background Zoom Animation for Rust Settlers Page
    const rustBgImage = document.querySelector('.background-image');
    const introBox = document.querySelector('.fixed-intro-box');
    const projectHeader = document.querySelector('.project-header-enhanced');

    if (rustBgImage && document.body.classList.contains('rust-settlers-theme')) {
        // Small delay to ensure page is loaded, then trigger zoom
        setTimeout(() => {
            rustBgImage.classList.add('zoomed');
        }, 100);

        // Trigger intro box entrance animation
        if (introBox) {
            setTimeout(() => {
                introBox.classList.add('visible');
            }, 400);
        }

        // Trigger typing animation for header after text box appears
        if (projectHeader) {
            setTimeout(() => {
                projectHeader.classList.add('typing');
            }, 1200); // Start after text box animation
        }
    }
});
