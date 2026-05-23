document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. NAVIGATION & SCROLL HANDLERS
    // ==========================================
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    // Scrolled Header Style
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        nav.classList.toggle('open');
    });

    // Close mobile menu when nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            nav.classList.remove('open');
        });
    });

    // ==========================================
    // 1.5 AVATAR VIEW TOGGLE (VECTOR VS PHOTO)
    // ==========================================
    const toggleButtons = document.querySelectorAll('.avatar-toggle .toggle-btn');
    const vectorAvatar = document.getElementById('vector-avatar');
    const photoAvatar = document.getElementById('photo-avatar');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.getAttribute('data-view');
            if (view === 'photo') {
                vectorAvatar.classList.remove('active');
                photoAvatar.classList.add('active');
            } else {
                photoAvatar.classList.remove('active');
                vectorAvatar.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. TURBAN THEME SELECTOR & DYNAMIC COLORING
    // ==========================================
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    themeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active state
            themeButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class
            btn.classList.add('active');
            
            // Update body class theme
            const theme = btn.getAttribute('data-theme');
            
            // Clear existing theme classes
            body.className = body.className.replace(/\btheme-\S+/g, '');
            body.classList.add(`theme-${theme}`);
        });
    });

    // Fifty (band) color changer
    const fiftyButtons = document.querySelectorAll('.fifty-btn');
    fiftyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            fiftyButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const color = btn.getAttribute('data-color');
            body.style.setProperty('--fifty-color', color);
        });
    });

    // ==========================================
    // 3. STATS COUNT UP ANIMATION
    // ==========================================
    const statCards = document.querySelectorAll('.stat-card');
    
    const startCountAnimation = (card) => {
        const numberEl = card.querySelector('.stat-number');
        const target = parseInt(numberEl.getAttribute('data-target'), 10);
        let current = 0;
        const duration = 1500; // ms
        const stepTime = Math.max(Math.floor(duration / target), 10);
        
        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
                numberEl.textContent = target;
                clearInterval(timer);
            } else {
                numberEl.textContent = current;
            }
        }, stepTime);
    };

    // Intersection Observer for counting stats when visible
    const observerOptions = {
        threshold: 0.5,
        triggerOnce: true
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCountAnimation(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statCards.forEach(card => {
        statsObserver.observe(card);
    });

    // Skill Bar filling animation on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    // ==========================================
    // 4. INTERACTIVE HEIGHT-O-METER PLAYGROUND
    // ==========================================
    const bhvanoorHeightCm = 162.5; // 5'4"

    const comparisonData = {
        cup: {
            name: "Coffee Cups",
            heightCm: 10,
            caption: "Bhavnoor stands tall at exactly 16.3 standard ceramic coffee cups. Conveniently stacked to showcase his daily fuel intake!",
            svg: `<svg viewBox="0 0 100 100" stroke="var(--accent-primary)" fill="none" stroke-width="6" stroke-linecap="round"><path d="M20 20 h50 v40 a20 20 0 0 1 -20 20 h-10 a20 20 0 0 1 -20 -20 z"/><path d="M70 30 h10 a10 10 0 0 1 10 10 v10 a10 10 0 0 1 -10 10 h-10" /><path d="M25 90 h40" /></svg>`
        },
        laptop: {
            name: "Stacked MacBooks",
            heightCm: 15, // Represents standard open MacBook heights
            caption: "Bhavnoor is roughly 10.8 open MacBook Airs tall. That's a lot of computing power packed into a compact frame!",
            svg: `<svg viewBox="0 0 100 100" stroke="var(--accent-primary)" fill="none" stroke-width="5" stroke-linecap="round"><path d="M15 70 h70 l5 15 h-80 z"/><path d="M22 25 h56 v45 h-56 z"/></svg>`
        },
        guitar: {
            name: "Guitars",
            heightCm: 101, // Approx 1m
            caption: "At 1.6 electric guitars, he is rockstar size. Highly portable, ready to perform, and perfectly balanced for riffs.",
            svg: `<svg viewBox="0 0 100 150" stroke="var(--accent-primary)" fill="none" stroke-width="4" stroke-linecap="round"><path d="M50 15 L50 75 M44 15 H56 M44 25 H56 M44 35 H56 M35 90 Q30 75 50 75 Q70 75 65 90 Q60 100 65 115 Q70 130 50 130 Q30 130 35 115 Q40 100 35 90 Z"/></svg>`
        },
        burj: {
            name: "Burj Khalifas",
            heightCm: 82800, // 828m
            caption: "Bhavnoor is approximately 0.00196 Burj Khalifas. Zoom in enough, and he is a critical, beautiful building block of modern architecture!",
            svg: `<svg viewBox="0 0 100 250" stroke="var(--accent-primary)" fill="none" stroke-width="3"><path d="M50 10 L50 240 M45 40 L45 240 M55 40 L55 240 M40 80 L40 240 M60 80 L60 240 M30 150 L30 240 M70 150 L70 240 M20 200 L20 240 M80 200 L80 240"/></svg>`
        },
        dhol: {
            name: "Traditional Dhols",
            heightCm: 48,
            caption: "Bhavnoor stands at exactly 3.4 stacked Punjabi Dhols. The perfect height to match the rhythm of Bhangra and drop the beat!",
            svg: `<svg viewBox="0 0 100 100" stroke="var(--accent-primary)" fill="none" stroke-width="4" stroke-linecap="round"><ellipse cx="50" cy="20" rx="30" ry="10"/><ellipse cx="50" cy="80" rx="30" ry="10"/><path d="M20 20 L20 80 M80 20 L80 80"/><path d="M20 20 L50 50 L80 20 M20 50 L50 20 L80 50 M20 80 L50 50 L80 80" stroke-dasharray="2 2" opacity="0.6"/><path d="M50 10 Q50 90 50 90" stroke-width="2" stroke-dasharray="4 4"/></svg>`
        },
        ego: {
            name: "Dev Ego",
            heightCm: 10000000, // MASSIVE
            caption: "Bhavnoor is a microscopic fraction (0.000016%) of the Average Senior Developer's Ego. He values humility, continuous learning, and clean reviews instead!",
            svg: `<svg viewBox="0 0 100 100" stroke="var(--accent-primary)" fill="none" stroke-width="4"><circle cx="50" cy="50" r="35" stroke-dasharray="6 4" /><path d="M35 45 Q40 30 50 30 Q60 30 65 45 Q70 60 50 75 Q30 60 35 45 Z" /><text x="50" y="52" font-size="7" font-weight="900" text-anchor="middle" fill="var(--accent-primary)" stroke="none">"IT WORKS"</text></svg>`
        }
    };

    const stackContainer = document.getElementById('items-stack');
    const mathNumber = document.getElementById('math-number');
    const mathUnits = document.getElementById('math-units');
    const comparisonText = document.getElementById('comparison-text');
    const selectorButtons = document.querySelectorAll('.selector-btn');

    const updateHeightComparison = (compareKey) => {
        const item = comparisonData[compareKey];
        if (!item) return;

        // Clear stack
        stackContainer.innerHTML = '';
        
        // Compute math
        const fraction = bhvanoorHeightCm / item.heightCm;
        let displayFraction = fraction.toFixed(2);
        if (fraction < 0.01) {
            displayFraction = fraction.toFixed(5);
        }

        // Set Text
        mathNumber.textContent = displayFraction;
        mathUnits.textContent = item.name;
        comparisonText.textContent = item.caption;

        // Render visual representation
        if (compareKey === 'burj') {
            // Special representation for huge items: Show one Burj Khalifa with a tiny scale representation of Bhavnoor
            stackContainer.style.justifyContent = 'flex-end';
            const stackItem = document.createElement('div');
            stackItem.className = 'stack-item';
            stackItem.style.height = '100%';
            stackItem.style.width = '100px';
            stackItem.innerHTML = item.svg;
            stackContainer.appendChild(stackItem);
            
            // Highlight Bhavnoor Silhouette scale shrink
            const bhSil = document.querySelector('.bhavnoor-silhouete');
            bhSil.style.transition = 'all 0.5s ease';
            bhSil.style.transform = 'scale(0.05)';
            bhSil.style.transformOrigin = 'bottom center';
            bhSil.style.opacity = '0.7';
        } else if (compareKey === 'ego') {
            // Another gag for ego: Show it flowing off the top!
            stackContainer.style.justifyContent = 'flex-end';
            const stackItem = document.createElement('div');
            stackItem.className = 'stack-item';
            stackItem.style.height = '120%'; // Overflows
            stackItem.style.width = '120px';
            stackItem.innerHTML = item.svg;
            stackContainer.appendChild(stackItem);
            
            // Standard Bhavnoor
            const bhSil = document.querySelector('.bhavnoor-silhouete');
            bhSil.style.transition = 'all 0.5s ease';
            bhSil.style.transform = 'scale(1)';
            bhSil.style.opacity = '1';
        } else {
            // Reset silhouette scaling
            const bhSil = document.querySelector('.bhavnoor-silhouete');
            bhSil.style.transition = 'all 0.5s ease';
            bhSil.style.transform = 'scale(1)';
            bhSil.style.opacity = '1';

            // Stack items regularly
            stackContainer.style.justifyContent = 'flex-reverse';
            const roundedCount = Math.min(Math.ceil(fraction), 30); // Cap at 30 items for clean rendering
            
            // Calculate proportional height for each item to stack up to the target height
            // Container height in comparison viewport is 90% (about 340px)
            const containerHeight = 340 * 0.9;
            const singleItemVisualHeight = containerHeight / fraction;
            
            for (let i = 0; i < roundedCount; i++) {
                const stackItem = document.createElement('div');
                stackItem.className = 'stack-item';
                
                // Set sizes
                stackItem.style.height = `${Math.min(singleItemVisualHeight, 60)}px`;
                stackItem.style.width = '60px';
                stackItem.style.margin = '0 auto';
                stackItem.style.animationDelay = `${i * 0.05}s`;
                
                // Cut off top item fractionally if needed
                if (i === roundedCount - 1 && fraction % 1 !== 0) {
                    const topFraction = fraction % 1;
                    stackItem.style.clipPath = `polygon(0 ${100 - (topFraction * 100)}%, 100% ${100 - (topFraction * 100)}%, 100% 100%, 0% 100%)`;
                }
                
                stackItem.innerHTML = item.svg;
                stackContainer.appendChild(stackItem);
            }
        }
    };

    // Button event listeners
    selectorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const compareType = btn.getAttribute('data-compare');
            updateHeightComparison(compareType);
        });
    });

    // Initialize with coffee cup comparison
    updateHeightComparison('cup');

    // ==========================================
    // 5. CONTACT FORM INTERACTION
    // ==========================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `<span>Sending...</span><i class="fa-solid fa-spinner fa-spin"></i>`;
        submitBtn.disabled = true;
        
        // Simulate email send
        setTimeout(() => {
            // Show success feedback
            formFeedback.textContent = "Chardi Kala! Message sent successfully. Bhavnoor will reach out soon!";
            formFeedback.className = "form-feedback success";
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formFeedback.textContent = "";
                formFeedback.className = "form-feedback";
            }, 5000);
            
        }, 1500);
    });
});
