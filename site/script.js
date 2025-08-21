// Semantic Gallery Website JavaScript
// Handles smooth scrolling, animations, and interactive features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initSmoothScrolling();
  initScrollAnimations();
  initNavbarScroll();
  initMobileMenu();
  initHeroAnimations();
  initParallax();
  initStatsCounter();
  initContactButtons();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  });
}

// Scroll Animations
function initScrollAnimations() {
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

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.fade-in');
  animateElements.forEach(el => observer.observe(el));

  // Observe feature cards for staggered animation
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe contact cards
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('mobile-active');
      mobileToggle.classList.toggle('active');

      // Animate hamburger menu
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
}

// Hero Section Animations
function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  const phoneMockup = document.querySelector('.phone-mockup');
  const searchResults = document.querySelectorAll('.result-item');

  // Add initial animation class
  setTimeout(() => {
    if (phoneMockup) {
      phoneMockup.classList.add('animate-in');
    }
  }, 500);

  // Animate search results with delay
  searchResults.forEach((result, index) => {
    setTimeout(() => {
      result.classList.add('animate-in');
    }, 1000 + (index * 200));
  });
}

// Parallax Effect
function initParallax() {
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
  });
}

// Statistics Counter Animation
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  function animateStats() {
    if (hasAnimated) return;
    hasAnimated = true;

    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 20);
    });
  }

  // Trigger animation when stats come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Contact Button Interactions
function initContactButtons() {
  const contactButtons = document.querySelectorAll('.contact-card .btn');

  contactButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Add loading state
      const originalText = this.textContent;
      this.textContent = 'Opening...';
      this.classList.add('loading');

      // Reset after 2 seconds
      setTimeout(() => {
        this.textContent = originalText;
        this.classList.remove('loading');
      }, 2000);
    });
  });
}

// Download Button Tracking
function initDownloadTracking() {
  const downloadBtn = document.querySelector('.btn-download');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      // Track download event (can be extended with analytics)
      console.log('Download button clicked');

      // Add click animation
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 300);
    });
  }
}

// Performance Optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle scroll events for better performance
const throttledScrollHandler = debounce(function() {
  // Handle scroll-based animations or effects
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
  }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Add CSS for mobile menu
const mobileMenuCSS = `
  .nav-links.mobile-active {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 1rem 0;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 12px 12px;
  }

  .nav-links.mobile-active .nav-link {
    padding: 1rem 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .nav-links.mobile-active .nav-link:last-child {
    border-bottom: none;
  }

  .mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  .btn.clicked {
    transform: scale(0.95);
  }

  .phone-mockup {
    animation: phoneFloat 6s ease-in-out infinite;
  }

  @keyframes phoneFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  .hero-badge {
    animation: badgePulse 2s ease-in-out infinite;
  }

  @keyframes badgePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

// Inject mobile menu CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuCSS;
document.head.appendChild(styleSheet);

// Initialize download tracking
initDownloadTracking();

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  // Could send to error reporting service
});

// Performance monitoring
window.addEventListener('load', function() {
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)} milliseconds`);

  // Add loaded class to body for any CSS transitions
  document.body.classList.add('loaded');
});
