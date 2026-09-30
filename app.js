import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * NEXX Digital Marketing & Media Agency — Client-Side Application
 * Premium Blue & White Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Lenis Smooth Scroll Engine (120fps silky momentum scrolling)
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    infinite: false,
  });

  // RAF ticker loop driving Lenis scroll updates continuously
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Expose globally for console access or interactions
  window.lenis = lenis;

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
  if (lenis) {
    lenis.on('scroll', handleScroll);
  }
  handleScroll();

  // Smooth scroll handler for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -70, duration: 1.15 });
        } else {
          const topPos = targetElement.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: topPos, behavior: 'smooth' });
        }
      }
    });
  });

  // Back to top action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
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
      if (lenis) lenis.start();
    } else {
      mobileDrawer.classList.add('open');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
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


  // 6. Services Section — Ultra-Smooth Scroll-Driven Stacked-Card Engine
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

  // Smoothstep ease curve for zero jerk (derivative 0 at start and end)
  const smoothstep = (t) => t * t * (3 - 2 * t);

  // Cached layout metrics to avoid layout thrashing on scroll
  let cachedStageHeight = 640;
  let cachedScrollableDistance = 1;
  let cachedStageTopOffset = 96;

  const measureServicesLayout = () => {
    if (!servicesScrollContainer || !servicesCardsStage) return;
    cachedStageHeight = servicesCardsStage.offsetHeight || 640;
    const containerHeight = servicesScrollContainer.offsetHeight || window.innerHeight * 4;
    cachedScrollableDistance = Math.max(1, containerHeight - cachedStageHeight);
    const stageStyle = window.getComputedStyle(servicesCardsStage);
    cachedStageTopOffset = parseFloat(stageStyle.top) || 96;
  };

  measureServicesLayout();

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
        card.style.pointerEvents = 'auto';
        card.style.zIndex = '';
        const parallaxImg = card.querySelector('.visual-parallax-wrap');
        if (parallaxImg) parallaxImg.style.transform = '';
      });
      return;
    }

    // Only one read: bounding rect top of container
    const rectTop = servicesScrollContainer.getBoundingClientRect().top;
    const scrolled = cachedStageTopOffset - rectTop;
    const rawProgress = Math.max(0, Math.min(1, scrolled / cachedScrollableDistance));

    // Instant real-time progress fill tracking (no lag!)
    if (progressFill) {
      progressFill.style.height = `${(rawProgress * 100).toFixed(2)}%`;
    }

    // Active button tracking with clear zones
    let activeIndex = 0;
    if (rawProgress >= 0.82) {
      activeIndex = 3;
    } else if (rawProgress >= 0.55) {
      activeIndex = 2;
    } else if (rawProgress >= 0.25) {
      activeIndex = 1;
    } else {
      activeIndex = 0;
    }

    progressBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === activeIndex);
    });

    // SOLID SLIDE-UP DECK ENGINE:
    // Every card stays 100% opaque with buttery smoothstep interpolation.
    // Floating-point translate3d ensures GPU sub-pixel compositing.
    const slideTravel = cachedStageHeight + 30;

    serviceCards.forEach((card, i) => {
      let translateY = 0;
      let scale = 1;
      let opacity = 1;
      let visibility = 'visible';
      let pointerEvents = 'auto';
      let zIndex = 10 + i;

      if (i === 0) {
        if (rawProgress < 0.18) {
          translateY = 0;
          scale = 1;
        } else if (rawProgress < 0.34) {
          const t = (rawProgress - 0.18) / 0.16;
          const ease = smoothstep(t);
          translateY = -ease * 16;
          scale = 1 - 0.04 * ease;
          pointerEvents = t < 0.5 ? 'auto' : 'none';
        } else {
          translateY = -16;
          scale = 0.96;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        }
      } else if (i === 1) {
        if (rawProgress < 0.18) {
          translateY = slideTravel;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        } else if (rawProgress < 0.34) {
          const t = (rawProgress - 0.18) / 0.16;
          const ease = smoothstep(t);
          translateY = (1 - ease) * slideTravel;
          scale = 0.98 + 0.02 * ease;
          pointerEvents = t > 0.6 ? 'auto' : 'none';
        } else if (rawProgress < 0.50) {
          translateY = 0;
          scale = 1;
        } else if (rawProgress < 0.66) {
          const t = (rawProgress - 0.50) / 0.16;
          const ease = smoothstep(t);
          translateY = -ease * 16;
          scale = 1 - 0.04 * ease;
          pointerEvents = t < 0.5 ? 'auto' : 'none';
        } else {
          translateY = -16;
          scale = 0.96;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        }
      } else if (i === 2) {
        if (rawProgress < 0.50) {
          translateY = slideTravel;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        } else if (rawProgress < 0.66) {
          const t = (rawProgress - 0.50) / 0.16;
          const ease = smoothstep(t);
          translateY = (1 - ease) * slideTravel;
          scale = 0.98 + 0.02 * ease;
          pointerEvents = t > 0.6 ? 'auto' : 'none';
        } else if (rawProgress < 0.78) {
          translateY = 0;
          scale = 1;
        } else if (rawProgress < 0.92) {
          const t = (rawProgress - 0.78) / 0.14;
          const ease = smoothstep(t);
          translateY = -ease * 16;
          scale = 1 - 0.04 * ease;
          pointerEvents = t < 0.5 ? 'auto' : 'none';
        } else {
          translateY = -16;
          scale = 0.96;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        }
      } else if (i === 3) {
        // CARD 4 (FINAL CARD): Slides up cleanly over Card 3, then locks in place until the end
        if (rawProgress < 0.78) {
          translateY = slideTravel;
          opacity = 0;
          visibility = 'hidden';
          pointerEvents = 'none';
        } else if (rawProgress < 0.92) {
          const t = (rawProgress - 0.78) / 0.14;
          const ease = smoothstep(t);
          translateY = (1 - ease) * slideTravel;
          scale = 0.98 + 0.02 * ease;
          pointerEvents = t > 0.6 ? 'auto' : 'none';
        } else {
          // Locked in 100% active state through the rest of the container!
          translateY = 0;
          scale = 1;
        }
      }

      // Hardware-accelerated sub-pixel floating-point transform (smooth GPU layer compositing)
      if (translateY === 0 && scale === 1) {
        card.style.transform = 'translate3d(0, 0, 0) scale(1)';
      } else {
        card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      }
      card.style.opacity = opacity.toString();
      card.style.visibility = visibility;
      card.style.pointerEvents = pointerEvents;
      card.style.zIndex = zIndex;

      // Subtle Image Parallax inside card
      const parallaxImg = card.querySelector('.visual-parallax-wrap');
      if (parallaxImg) {
        const pOffset = (i - activeIndex) * -6;
        parallaxImg.style.transform = `translate3d(0, ${pOffset.toFixed(1)}px, 0)`;
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
  window.addEventListener('resize', () => {
    measureServicesLayout();
    onScroll();
  }, { passive: true });

  // Hook into Lenis scroll lifecycle for 120fps lockstep smooth scroll
  if (lenis) {
    lenis.on('scroll', onScroll);
  }

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
      const scrollableDistance = cachedScrollableDistance;

      const pTarget = cardScrollTargets[targetIndex] ?? 0;
      const targetScroll = containerTop + pTarget * scrollableDistance;

      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.0 });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
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



  // 10. Testimonials Slider (Automatic Carousel)
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const testimonialContainer = document.querySelector('.testimonials-slider-container');

  let currentTestimonialIndex = 0;
  let testimonialAutoTimer = null;
  const totalCards = testimonialCards.length;
  const AUTOPLAY_INTERVAL = 4500; // Auto-advance every 4.5 seconds

  const updateTestimonialCarousel = (index, immediate = false) => {
    if (!testimonialTrack || totalCards === 0) return;
    
    // Wrap around index
    currentTestimonialIndex = (index + totalCards) % totalCards;

    if (immediate) {
      testimonialTrack.style.transition = 'none';
    } else {
      testimonialTrack.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    // Slide track smoothly with GPU acceleration
    testimonialTrack.style.transform = `translate3d(-${currentTestimonialIndex * 100}%, 0, 0)`;

    // Update active class for card focus & styling
    testimonialCards.forEach((card, i) => {
      const isActive = i === currentTestimonialIndex;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    // Update dot indicators
    sliderDots.forEach((dot, i) => {
      const isActive = i === currentTestimonialIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const nextTestimonial = () => {
    updateTestimonialCarousel(currentTestimonialIndex + 1);
  };

  const prevTestimonial = () => {
    updateTestimonialCarousel(currentTestimonialIndex - 1);
  };

  const startTestimonialAutoPlay = () => {
    stopTestimonialAutoPlay();
    testimonialAutoTimer = setInterval(nextTestimonial, AUTOPLAY_INTERVAL);
  };

  const stopTestimonialAutoPlay = () => {
    if (testimonialAutoTimer) {
      clearInterval(testimonialAutoTimer);
      testimonialAutoTimer = null;
    }
  };

  const resetTestimonialCycle = () => {
    startTestimonialAutoPlay();
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextTestimonial();
      resetTestimonialCycle();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevTestimonial();
      resetTestimonialCycle();
    });
  }

  sliderDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      updateTestimonialCarousel(idx);
      resetTestimonialCycle();
    });
  });

  // Pause on hover
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', stopTestimonialAutoPlay);
    testimonialContainer.addEventListener('mouseleave', startTestimonialAutoPlay);

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopTestimonialAutoPlay();
    }, { passive: true });

    testimonialContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          nextTestimonial();
        } else {
          prevTestimonial();
        }
      }
      startTestimonialAutoPlay();
    }, { passive: true });
  }

  // Initialize carousel on load
  updateTestimonialCarousel(0, true);
  startTestimonialAutoPlay();

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
