// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  
  // ========== MOUSE FOLLOWER ========== //
  const follower = document.querySelector(".mouse-follower");
  if (follower) {
    document.addEventListener("mousemove", (e) => {
      follower.style.left = (e.clientX + 25) + "px";
      follower.style.top = (e.clientY + 15) + "px";
    });
  }

  // ========== CUSTOM CURSOR WITH HOVER IMAGE ========== //
  const customCursor = document.querySelector(".custom-cursor");
  const cursorCircle = document.querySelector(".cursor-circle");
  const cursorImage = document.querySelector(".cursor-image");

  if (customCursor && cursorCircle && cursorImage) {
    // Track mouse position
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      cursorCircle.style.left = x + "px";
      cursorCircle.style.top = y + "px";
      
      cursorImage.style.left = x + "px";
      cursorImage.style.top = y + "px";
    });

    // Detect hovering over interactive elements (including summary tags)
    const hoverTargets = document.querySelectorAll('a, button, summary, .hoverable');
    
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        // Change image if data attribute exists
        const customImage = target.getAttribute('data-cursor-image');
        if (customImage) {
          cursorImage.querySelector('img').src = customImage;
        }
        
        cursorCircle.style.width = '60px';
        cursorCircle.style.height = '60px';
        cursorCircle.style.borderColor = 'transparent';
        cursorCircle.style.background = 'rgba(255, 255, 255, 0.1)';
        
        cursorImage.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorImage.style.opacity = '1';
      });
      
      target.addEventListener('mouseleave', () => {
        cursorCircle.style.width = '20px';
        cursorCircle.style.height = '20px';
        cursorCircle.style.borderColor = 'white';
        cursorCircle.style.background = 'transparent';
        
        cursorImage.style.transform = 'translate(-50%, -50%) scale(0)';
        cursorImage.style.opacity = '0';
      });
    });
  }

  // ========== NAVIGATION SCROLL LOGIC ========== //
  const nav = document.querySelector("nav");
  if (nav) {
    function onScroll() {
      nav.classList.toggle("available-mode", window.scrollY > 60);
    }
    
    onScroll();
    window.addEventListener("scroll", onScroll);
  }

  // ========== FADE IN ANIMATIONS ON SCROLL ========== //
  gsap.utils.toArray('.label-container, .drop-list-container, .about-first-labels').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1
      },
      opacity: 0,
      y: 50,
      duration: 1
    });
  });

  // ========== STAGGER ANIMATION FOR DETAILS TAGS ========== //
  gsap.from('.drop-list-container details', {
    scrollTrigger: {
      trigger: '.drop-list-container',
      start: 'top 80%',
      end: 'top 40%',
      scrub: 1
    },
    opacity: 0,
    x: -30,
    stagger: 0.1
  });

  // ========== FLOATING ANIMATION FOR HERO LABELS ========== //
  gsap.to('.label-left', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: -100,
    opacity: 0.5
  });

  gsap.to('.label-right', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: -80,
    opacity: 0.5
  });

  // ========== GSAP FLOATING IMAGE ANIMATION ========== //
  const floatingCard = document.querySelector('.floating-image-card');
  const floatingWrapper = document.querySelector('.floating-image-wrapper');
  const servicesTarget = document.querySelector('.services .right-container');
  const aboutTarget = document.querySelector('.About .right-container');

  if (!floatingCard || !floatingWrapper || !servicesTarget || !aboutTarget) {
    console.warn('Floating image elements not found');
    return;
  }

  // Only run on desktop (768px+)
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {

    // Store initial position
    let initialX = 0;
    let initialY = 0;

    // ========== Animation 1: Hero → Services Container (SLOWER) ========== //
    ScrollTrigger.create({
      trigger: '.services',
      start: 'top 90%',
      end: 'center center',
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        const targetRect = servicesTarget.getBoundingClientRect();
        const wrapperRect = floatingWrapper.getBoundingClientRect();
        
        // Calculate center of target
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        
        // Calculate center of wrapper (without transforms)
        const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2;
        const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2;
        
        // Calculate movement needed
        const moveX = (targetCenterX - wrapperCenterX) * progress;
        const moveY = (targetCenterY - wrapperCenterY) * progress;
        
        // Store the final position for next animation
        if (progress === 1) {
          initialX = moveX;
          initialY = moveY;
        }
        
        gsap.set(floatingWrapper, {
          x: moveX,
          y: moveY,
          scale: 1 - (0.15 * progress)
        });
        
        // Flip to back (180 degrees)
        gsap.set(floatingCard, {
          rotateY: 180 * progress
        });
      }
    });

    // ========== Animation 2: Services → About Container (SLOWER + EXACT FLIP) ========== //
    ScrollTrigger.create({
      trigger: '.About',
      start: 'top 90%',
      end: 'center center',
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Get current transform values to prevent jump
        const currentX = gsap.getProperty(floatingWrapper, 'x');
        const currentY = gsap.getProperty(floatingWrapper, 'y');
        
        // Get positions
        const aboutRect = aboutTarget.getBoundingClientRect();
        const wrapperRect = floatingWrapper.getBoundingClientRect();
        
        // Calculate about center
        const aboutCenterX = aboutRect.left + aboutRect.width / 2;
        const aboutCenterY = aboutRect.top + aboutRect.height / 2;
        
        const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2;
        const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2;
        
        // Calculate target movement
        const targetX = aboutCenterX - wrapperCenterX;
        const targetY = aboutCenterY - wrapperCenterY;
        
        // Interpolate from current position to target
        const moveX = currentX + (targetX - currentX) * progress;
        const moveY = currentY + (targetY - currentY) * progress;
        
        gsap.set(floatingWrapper, {
          x: moveX,
          y: moveY,
          scale: 0.85 - (0.05 * progress)
        });
        
        // Flip from back (180°) to front (360°) - completes at progress = 1
        gsap.set(floatingCard, {
          rotateY: 180 + (180 * progress)
        });
      }
    });

    console.log('GSAP animations initialized - exact flip timing with extras');
  });

});
