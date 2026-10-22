/**
 * Emma Carney — Contemporary Romance Author Official Site
 * Interactive Experience Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // Background Video Playback Initialization (Single-play, 50% speed, freezes on end frame)
    // -------------------------------------------------------------------------
    const heroBgVideo = document.getElementById('heroBgVideo');
    if (heroBgVideo) {
        heroBgVideo.muted = true;
        heroBgVideo.loop = false;
        heroBgVideo.playbackRate = 0.5; // 50% slow-motion speed

        // Maintain 50% speed across all state changes
        heroBgVideo.addEventListener('loadedmetadata', () => {
            heroBgVideo.playbackRate = 0.5;
        });
        heroBgVideo.addEventListener('play', () => {
            heroBgVideo.playbackRate = 0.5;
        });

        // Ensure video cleanly freezes on its last frame
        heroBgVideo.addEventListener('ended', () => {
            heroBgVideo.pause();
        });

        const playPromise = heroBgVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // If browser autoplay policy defers playback, play on first interaction
                const startVideo = () => {
                    heroBgVideo.playbackRate = 0.5;
                    heroBgVideo.play();
                    document.removeEventListener('click', startVideo);
                    document.removeEventListener('touchstart', startVideo);
                };
                document.addEventListener('click', startVideo, { once: true });
                document.addEventListener('touchstart', startVideo, { once: true });
            });
        }
    }

    // -------------------------------------------------------------------------
    // 1. Data Store for Book Synopses & Details
    // -------------------------------------------------------------------------
    const bookData = {
        'dare-to-dream': {
            title: 'Dare to Dream',
            tagline: 'Five women, five secrets, and one summer that changes everything.',
            cover2d: 'images/covers/dare-to-dream-2d.jpg',
            cover3d: 'images/3d/dare-to-dream-3d.png',
            rating: '5.0 ★★★★★',
            genres: ['Contemporary Romance', 'Sisterhood & Drama', 'Second Chances'],
            synopsis: `
                <p>Gathered beneath the soft rose-tinted peaks of a mountain sanctuary, five lifelong friends reunite after years of unspoken distance. Each woman brings more than memories to the table: an unresolved affection, a painful compromise, a lingering sorrow, and a quiet longing for a second chance that once felt impossible.</p>
                <p>As the lakeside summer unfolds, old laughter is rekindled alongside simmering truths. In an emotionally charged journey of vulnerability and courage, they discover that facing the future means finally giving themselves permission to dare to dream of love.</p>
            `,
            amazonLink: 'https://www.amazon.co.uk/dp/B0DDYGYQMG'
        },
        'max-and-emma': {
            title: 'Max and Emma',
            tagline: 'A perfect future threatened by an imperfect past.',
            cover2d: 'images/covers/max-and-emma-2d.jpg',
            cover3d: 'images/3d/max-and-emma-3d.png',
            rating: '4.8 ★★★★★',
            genres: ['Romantic Drama', 'Emotional Second Chances', 'Small Town'],
            synopsis: `
                <p>Max and Emma spent years fighting their way toward peace, building a shared life that looked unshakeable from the outside. But real love is forged in the fires of honesty, and the ghosts of their past refuse to stay silent.</p>
                <p>When unexpected revelations threaten the foundation they've constructed with such care, both Max and Emma must confront the choices that divided them years ago. A heartfelt, intensely personal exploration of loyalty, forgiveness, and the enduring power of true affection.</p>
            `,
            amazonLink: 'https://www.amazon.co.uk/dp/B0FHRLM5JH'
        },
        'girl-with-no-name': {
            title: 'The Girl with No Name',
            tagline: 'A forgotten melody, an untamed city, and a love that remembers who you are.',
            cover2d: 'images/covers/girl-with-no-name-2d.jpg',
            cover3d: 'images/3d/girl-with-no-name-3d.png',
            rating: '4.7 ★★★★★',
            genres: ['Contemporary Romance', 'Emotional Mystery', 'City Romance'],
            synopsis: `
                <p>High above the bustling city streets, she keeps her identity closely guarded. With only an acoustic instrument and fragments of a melody she cannot name, she seeks solace in being invisible to the world below.</p>
                <p>Until a chance encounter brings a quiet stranger into her orbit &mdash; someone whose patience and empathy gently disassemble every wall she has built. A deeply lyrical, tender journey of self-discovery, recovery, and finding home in another's arms.</p>
            `,
            amazonLink: 'https://www.amazon.co.uk/dp/B0BXJR7P6R'
        },
        'happy-lies-the-heart': {
            title: 'Happy Lies the Heart',
            tagline: 'When truth is too fragile to speak, can love survive the silence?',
            cover2d: 'images/covers/happy-lies-the-heart-2d.jpg',
            cover3d: 'images/3d/happy-lies-the-heart-3d.png',
            rating: '5.0 ★★★★★',
            genres: ['Contemporary Romance', 'Heartwarming Drama', 'Cathedral Town'],
            synopsis: `
                <p>Set among the sunlit stone spires and winding cobbled alleys of a historic cathedral city, two souls who parted under painful misunderstandings are unexpectedly reunited by destiny.</p>
                <p>The chemistry between them is as fierce and undeniable as ever, but years of guarded silence have left scars. As family loyalties and long-held secrets test their resolve, they must decide whether pride is worth more than a lifetime of happiness.</p>
            `,
            amazonLink: 'https://www.amazon.co.uk/dp/B0BQH1F1LK'
        },
        'chapel-acre': {
            title: 'Chapel Acre',
            tagline: 'An inherited sanctuary, buried family secrets, and a love that blossoms against all odds.',
            cover2d: 'images/covers/chapel-acre-2d.jpg',
            cover3d: 'images/3d/chapel-acre-3d.png',
            rating: '4.9 ★★★★★',
            genres: ['Contemporary Romance', 'Country Estate', 'Family Secrets'],
            synopsis: `
                <p>Seeking solace from a painful past, she arrives at Chapel Acre &mdash; a secluded country haven wrapped in whispers of old family history and forgotten vows.</p>
                <p>What begins as a quiet retreat soon becomes an emotional turning point when an unexpected bond takes root. Against the backdrop of golden rolling hills and quiet stone walls, she must decide if opening her guarded heart is worth the risk of loving again.</p>
            `,
            amazonLink: 'https://www.amazon.co.uk/Chapel-Acre-Emma-Carney-ebook/dp/B0C6FKVJBM'
        }
    };

    // -------------------------------------------------------------------------
    // 2. Navigation Header & Scroll Behavior
    // -------------------------------------------------------------------------
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');

    // Header shadow on scroll & Back to top button visibility
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active link spy
        highlightActiveNav();
    }, { passive: true });

    // Smooth scroll back to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Navigation Toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Active link highlighting on scroll
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. Subtle 3D Mouse Parallax on Hero Book
    // -------------------------------------------------------------------------
    const heroBookStage = document.getElementById('heroBookStage');
    const heroBook = document.getElementById('heroBook');

    if (heroBookStage && heroBook && window.matchMedia('(hover: hover)').matches) {
        heroBookStage.addEventListener('mousemove', (e) => {
            const rect = heroBookStage.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = -(y / rect.height) * 12;
            const rotateY = (x / rect.width) * 14;

            heroBook.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        heroBookStage.addEventListener('mouseleave', () => {
            heroBook.style.transform = '';
        });
    }

    // -------------------------------------------------------------------------
    // 4. Interactive 3D Card Hover Tilt
    // -------------------------------------------------------------------------
    const bookCards = document.querySelectorAll('.book-card');

    if (window.matchMedia('(hover: hover)').matches) {
        bookCards.forEach(card => {
            const coverWrapper = card.querySelector('.book-cover-3d-wrapper');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const tiltX = -(y / rect.height) * 8;
                const tiltY = (x / rect.width) * 10;

                if (coverWrapper) {
                    coverWrapper.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                if (coverWrapper) {
                    coverWrapper.style.transform = '';
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // 5. Synopsis Modal Implementation
    // -------------------------------------------------------------------------
    const modal = document.getElementById('synopsisModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    function openModal(bookKey) {
        const book = bookData[bookKey];
        if (!book) return;

        const genrePills = book.genres.map(g => `<span class="pill-badge">${g}</span>`).join(' ');

        modalContent.innerHTML = `
            <div class="modal-book-header">
                <img src="${book.cover3d}" alt="${book.title}" class="modal-book-thumb">
                <div class="modal-book-info">
                    <span class="pill-badge" style="margin-bottom: 6px;"><i class="fas fa-heart"></i> ${book.rating}</span>
                    <h3>${book.title}</h3>
                    <p class="modal-tagline">${book.tagline}</p>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">${genrePills}</div>
                </div>
            </div>
            <div class="modal-book-body">
                ${book.synopsis}
            </div>
            <div class="modal-book-footer">
                <button class="btn btn-secondary modal-close-btn">Close</button>
                <a href="${book.amazonLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <i class="fab fa-amazon"></i> Read on Amazon / KU
                </a>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Bind inner close button
        const innerClose = modalContent.querySelector('.modal-close-btn');
        if (innerClose) {
            innerClose.addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const bookKey = btn.getAttribute('data-book');
            openModal(bookKey);
        });
    });

    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // -------------------------------------------------------------------------
    // 6. Contact Form Submission & Confirmation Modal
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const contactFeedback = document.getElementById('contactFeedback');
    const btnSubmitContact = document.getElementById('btnSubmitContact');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = (document.getElementById('contactName')?.value || '').trim();
            const email = (document.getElementById('contactEmail')?.value || '').trim();
            const subject = (document.getElementById('contactSubject')?.value || '').trim();
            const message = (document.getElementById('contactMessage')?.value || '').trim();
            const hp = (contactForm.querySelector('input[name="_hp"]')?.value || '').trim();

            if (!name || !email || !message) {
                if (contactFeedback) {
                    contactFeedback.className = 'form-feedback error';
                    contactFeedback.textContent = 'Please provide your name, email, and message.';
                    contactFeedback.style.display = 'block';
                }
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (contactFeedback) {
                    contactFeedback.className = 'form-feedback error';
                    contactFeedback.textContent = 'Please enter a valid email address.';
                    contactFeedback.style.display = 'block';
                }
                return;
            }

            if (btnSubmitContact) {
                btnSubmitContact.disabled = true;
                btnSubmitContact.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending to Emma...';
            }
            if (contactFeedback) {
                contactFeedback.style.display = 'none';
            }

            try {
                // Anti-bot honeypot check
                if (hp) {
                    contactForm.reset();
                    showContactCallout();
                    return;
                }

                // Defensive CRLF sanitization to mitigate header injection
                const cleanSubject = subject.replace(/[\r\n]/g, ' ').trim();
                const cleanName = name.replace(/[\r\n]/g, ' ').trim();
                const emailSubject = `[From Emma Carney Website] ${cleanSubject || 'New message from ' + cleanName}`;

                const formPayload = {
                    name: cleanName,
                    email: email,
                    _replyto: email,
                    _subject: emailSubject,
                    message: message
                };

                // Dispatch using FormSubmit anonymized token to prevent email scraping
                const deliveries = [
                    fetch('https://formsubmit.co/ajax/a56559da3500dd457906bfc04ba0eefc', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify(formPayload)
                    }).catch(err => console.warn('Direct dispatch error:', err))
                ];

                await Promise.allSettled(deliveries);

                if (contactFeedback) contactFeedback.style.display = 'none';
                contactForm.reset();
                showContactCallout();
            } catch (err) {
                console.error('Contact submission error:', err);
                if (contactFeedback) {
                    contactFeedback.className = 'form-feedback error';
                    contactFeedback.textContent = 'Connection error. Please check your internet connection and try again.';
                    contactFeedback.style.display = 'block';
                }
            } finally {
                if (btnSubmitContact) {
                    btnSubmitContact.disabled = false;
                    btnSubmitContact.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }
            }
        });
    }

    // Contact Confirmation Callout Logic
    function showContactCallout() {
        const modal = document.getElementById('contactCalloutModal');
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeContactCalloutAndGoHome() {
        const modal = document.getElementById('contactCalloutModal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        // Return page smoothly to hero top
        const hero = document.getElementById('hero') || document.body;
        if (hero) {
            hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    const btnCalloutClose = document.getElementById('btnCalloutClose');
    const calloutCloseXBtn = document.getElementById('calloutCloseXBtn');
    const calloutBackdrop = document.getElementById('calloutBackdrop');
    const contactCalloutModal = document.getElementById('contactCalloutModal');

    if (btnCalloutClose) btnCalloutClose.addEventListener('click', closeContactCalloutAndGoHome);
    if (calloutCloseXBtn) calloutCloseXBtn.addEventListener('click', closeContactCalloutAndGoHome);
    if (calloutBackdrop) calloutBackdrop.addEventListener('click', closeContactCalloutAndGoHome);
    if (contactCalloutModal) {
        contactCalloutModal.addEventListener('click', (e) => {
            if (e.target === contactCalloutModal) {
                closeContactCalloutAndGoHome();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('contactCalloutModal');
            if (modal && modal.classList.contains('active')) {
                closeContactCalloutAndGoHome();
            }
        }
    });

});
