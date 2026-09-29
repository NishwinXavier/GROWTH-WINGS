/**
 * NEXX Digital Marketing & Media Agency — Client-Side Application
 * Premium Blue & White Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], main');
  const backToTopBtn = document.getElementById('backToTop');
  const cursorGlow = document.getElementById('cursorGlow');
  const currentYearSpan = document.getElementById('currentYear');

  // Set current copyright year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Cursor Glow Follower (Desktop only)
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateCursor = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(updateCursor);
    };
    updateCursor();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // 3. Navbar Scroll Transition
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar compact styling
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active navigation link highlighting
    let currentActiveId = '';
    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to top action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Mobile Navigation Toggle
  const toggleMobileMenu = () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // Close mobile drawer on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      toggleMobileMenu();
    }
  });

  // 5. Hero Video Autoplay Assurance
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay prevented. User interaction required:', err);
        // Play once user interacts with anywhere on document
        const playOnInteraction = () => {
          heroVideo.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
    }
  }

  // 6. Services Section — High-End Scroll-Driven Stacked-Card Engine
  const servicesHeader = document.getElementById('servicesHeader');
  const servicesScrollContainer = document.getElementById('servicesScrollContainer');
  const servicesCardsStage = document.getElementById('servicesCardsStage');
  const serviceCards = document.querySelectorAll('.service-panel-card');
  const progressBtns = document.querySelectorAll('.progress-step-btn');
  const progressFill = document.getElementById('progressTrackFill');

  // Entrance animation for Services Header
  if (servicesHeader && 'IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          servicesHeader.classList.add('in-view');
          headerObserver.unobserve(servicesHeader);
        }
      });
    }, { threshold: 0.2 });
    headerObserver.observe(servicesHeader);
  } else if (servicesHeader) {
    servicesHeader.classList.add('in-view');
  }

  // Scroll-Driven Sticky Card Stack Interaction (Desktop)
  let isTicking = false;

  const updateServicesScroll = () => {
    if (!servicesScrollContainer || !servicesCardsStage || serviceCards.length === 0) return;

    const isDesktop = window.innerWidth >= 1025;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReducedMotion) {
      // Clean mobile & tablet reset
      serviceCards.forEach((card) => {
        card.style.transform = '';
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.filter = 'none';
        card.style.pointerEvents = 'auto';
        card.style.zIndex = '';
        const parallaxImg = card.querySelector('.visual-parallax-wrap');
        if (parallaxImg) parallaxImg.style.transform = '';
      });
      return;
    }

    const rect = servicesScrollContainer.getBoundingClientRect();
    const containerHeight = servicesScrollContainer.offsetHeight;
    const stageHeight = servicesCardsStage.offsetHeight;
    const scrollableDistance = Math.max(1, containerHeight - stageHeight);

    // Compute stage sticky top offset
    const stageStyle = window.getComputedStyle(servicesCardsStage);
    const stageTopOffset = parseFloat(stageStyle.top) || 96;

    // Progress within services scroll section (0.0 to 1.0)
    const scrolled = stageTopOffset - rect.top;
    const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    // Fill the minimal vertical indicator line
    if (progressFill) {
      progressFill.style.height = `${(rawProgress * 100).toFixed(1)}%`;
    }

    // Active button tracking with clear zones
    let activeIndex = 0;
    if (rawProgress >= 0.85) {
      activeIndex = 3;
    } else if (rawProgress >= 0.58) {
      activeIndex = 2;
    } else if (rawProgress >= 0.26) {
      activeIndex = 1;
    } else {
      activeIndex = 0;
    }

    progressBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === activeIndex);
    });

    // SOLID SLIDE-UP DECK ENGINE:
    // Every card stays 100% opaque. No cross-fades where text blends together.
    // Card 1 starts in place.
    // Card 2 slides UP over Card 1.
    // Card 3 slides UP over Card 2.
    // Card 4 slides UP over Card 3 and stays locked in place through the end of the container.
    // Outgoing cards recede slightly (scale 0.96) then hide once fully covered.
    serviceCards.forEach((card, i) => {
      let translateY = 0;
      let scale = 1;
      let opacity = 1;
      let visibility = 'visible';
      let pointerEvents = 'auto';
      let zIndex = 10 + i;

      const slideTravel = stageHeight + 40;

      if (i === 0) {
        if (rawProgress < 0.20) {
          translateY = 0;
          scale = 1;
        } else if (rawProgress < 0.32) {
          const t = (rawProgress - 0.20) / 0.12;
          translateY = -t * 15;
          scale = 1 - 0.04 * t;
          pointerEvents = t < 0.5 ? 'auto' : 'none';
        } else {
          translateY = -15;
          scale = 0.96;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        }
      } else if (i === 1) {
        if (rawProgress < 0.20) {
          translateY = slideTravel;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        } else if (rawProgress < 0.32) {
          const t = (rawProgress - 0.20) / 0.12;
          // Smooth ease-out curve
          const ease = Math.sin((t * Math.PI) / 2);
          translateY = (1 - ease) * slideTravel;
          scale = 0.98 + 0.02 * ease;
          pointerEvents = t > 0.7 ? 'auto' : 'none';
        } else if (rawProgress < 0.52) {
          translateY = 0;
          scale = 1;
        } else if (rawProgress < 0.64) {
          const t = (rawProgress - 0.52) / 0.12;
          translateY = -t * 15;
          scale = 1 - 0.04 * t;
          pointerEvents = t < 0.5 ? 'auto' : 'none';
        } else {
          translateY = -15;
          scale = 0.96;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        }
      } else if (i === 2) {
        if (rawProgress < 0.52) {
          translateY = slideTravel;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        } else if (rawProgress < 0.64) {
          const t = (rawProgress - 0.52) / 0.12;
          const ease = Math.sin((t * Math.PI) / 2);
          translateY = (1 - ease) * slideTravel;
          scale = 0.98 + 0.02 * ease;
          pointerEvents = t > 0.7 ? 'auto' : 'none';
        } else if (rawProgress < 0.80) {
          translateY = 0;
          scale = 1;
        } else if (rawProgress < 0.90) {
          const t = (rawProgress - 0.80) / 0.10;
          translateY = -t * 15;
          scale = 1 - 0.04 * t;
          pointerEvents = t < 0.5 ? 'auto' : 'none';
        } else {
          translateY = -15;
          scale = 0.96;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        }
      } else if (i === 3) {
        // CARD 4 (FINAL CARD): Slides up cleanly over Card 3, then locks in place until the end
        if (rawProgress < 0.80) {
          translateY = slideTravel;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        } else if (rawProgress < 0.90) {
          const t = (rawProgress - 0.80) / 0.10;
          const ease = Math.sin((t * Math.PI) / 2);
          translateY = (1 - ease) * slideTravel;
          scale = 0.98 + 0.02 * ease;
          pointerEvents = t > 0.7 ? 'auto' : 'none';
        } else {
          // Locked in 100% active state through the rest of the container!
          translateY = 0;
          scale = 1;
        }
      }

      // Hardware-accelerated transformation with integer pixel translations
      if (translateY === 0 && scale === 1) {
        card.style.transform = 'translateY(0) scale(1)';
      } else {
        card.style.transform = `translateY(${Math.round(translateY)}px) scale(${scale.toFixed(4)})`;
      }
      card.style.opacity = opacity.toString();
      card.style.visibility = visibility;
      card.style.filter = 'none';
      card.style.pointerEvents = pointerEvents;
      card.style.zIndex = zIndex;

      // Subtle Image Parallax inside card
      const parallaxImg = card.querySelector('.visual-parallax-wrap');
      if (parallaxImg) {
        const pOffset = Math.round((i - activeIndex) * -8);
        parallaxImg.style.transform = `translateY(${pOffset}px)`;
      }
    });
  };

  const onScroll = () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        updateServicesScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateServicesScroll();

  // Progress Nav Dot Click: Smooth scroll to selected card
  const cardScrollTargets = [0.05, 0.40, 0.70, 0.95];
  progressBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(btn.getAttribute('data-index'), 10);
      if (isNaN(targetIndex) || !servicesScrollContainer || !servicesCardsStage) return;

      const containerRect = servicesScrollContainer.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const containerTop = currentScrollY + containerRect.top;
      const containerHeight = servicesScrollContainer.offsetHeight;
      const stageHeight = servicesCardsStage.offsetHeight;
      const scrollableDistance = containerHeight - stageHeight;

      const pTarget = cardScrollTargets[targetIndex] ?? 0;
      const targetScroll = containerTop + pTarget * scrollableDistance;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    });
  });

  // 7. Stat Counters Live Count-Up Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateStats = () => {
    if (animatedStats) return;

    statNumbers.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.textContent.startsWith('$') ? '$' : '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const easeOut = 1 - (1 - progress) * (1 - progress);
        const currentValue = Math.floor(easeOut * target);

        el.textContent = `${prefix}${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    });

    animatedStats = true;
  };

  const statsSection = document.querySelector('.stats-counter-grid');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // 8. Portfolio Filtering
  const filterPills = document.querySelectorAll('.filter-pill');
  const workCards = document.querySelectorAll('.work-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      workCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });



  // 10. Testimonials Slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentTestimonialIndex = 0;
  let testimonialAutoTimer = null;

  const showTestimonial = (index) => {
    testimonialCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentTestimonialIndex = index;
  };

  const nextTestimonial = () => {
    const nextIdx = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(nextIdx);
  };

  const prevTestimonial = () => {
    const prevIdx = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prevIdx);
  };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextTestimonial();
      resetTestimonialCycle();
    });

    prevBtn.addEventListener('click', () => {
      prevTestimonial();
      resetTestimonialCycle();
    });
  }

  sliderDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showTestimonial(idx);
      resetTestimonialCycle();
    });
  });

  const startTestimonialCycle = () => {
    clearInterval(testimonialAutoTimer);
    testimonialAutoTimer = setInterval(nextTestimonial, 7000);
  };

  const resetTestimonialCycle = () => {
    clearInterval(testimonialAutoTimer);
    startTestimonialCycle();
  };

  startTestimonialCycle();

  // Pause on hover
  const testimonialContainer = document.querySelector('.testimonials-slider-container');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => clearInterval(testimonialAutoTimer));
    testimonialContainer.addEventListener('mouseleave', startTestimonialCycle);
  }

  // 11. Lead Generation Form Submission
  const leadForm = document.getElementById('leadForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check form validity
      if (!leadForm.checkValidity()) {
        formStatus.style.display = 'block';
        formStatus.className = 'form-status-alert error';
        formStatus.textContent = 'Please complete all required fields correctly.';
        return;
      }

      const nameInput = document.getElementById('contactName').value.trim();
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      // Loading state
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnSpinner.style.display = 'block';
      formStatus.style.display = 'none';

      // Simulate network request
      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        btnSpinner.style.display = 'none';

        formStatus.style.display = 'block';
        formStatus.className = 'form-status-alert success';
        formStatus.innerHTML = `
          <strong>Thank you, ${nameInput}!</strong><br>
          Your strategic inquiry has been prioritized. A Growth Wings Managing Partner will review your brand's data and contact you within 4 hours.
        `;

        leadForm.reset();
      }, 1200);
    });
  }

});
