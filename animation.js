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

  // ========== NAVIGATION SCROLL LOGIC ========== //
  const nav = document.querySelector("nav");
  if (nav) {
    function onScroll() {
      nav.classList.toggle("available-mode", window.scrollY > 60);
    }
    
    onScroll();
    window.addEventListener("scroll", onScroll);
  }

  // ========== GSAP FLOATING IMAGE ANIMATION ========== //
  const floatingCard = document.querySelector('.floating-image-card');
  const floatingWrapper = document.querySelector('.floating-image-wrapper');
  const servicesTarget = document.querySelector('#services-image-target');
  const aboutTarget = document.querySelector('#about-image-target');

  if (!floatingCard || !floatingWrapper || !servicesTarget || !aboutTarget) {
    console.warn('Floating image elements not found');
    return;
  }

  // Only run on desktop (768px+)
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {

    // Animation 1: Hero → Services (flip to back, move to services right container)
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.services',
        start: 'top 70%',
        end: 'top 25%',
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    });

    tl1.to(floatingCard, {
      rotateY: 180,
      ease: 'power2.inOut'
    }, 0);

    tl1.to(floatingWrapper, {
      x: () => {
        const target = servicesTarget.getBoundingClientRect();
        const wrapper = floatingWrapper.getBoundingClientRect();
        // Calculate exact center position
        return target.left + (target.width / 2) - (wrapper.left + wrapper.width / 2);
      },
      y: () => {
        const target = servicesTarget.getBoundingClientRect();
        const wrapper = floatingWrapper.getBoundingClientRect();
        // Center vertically in container
        return target.top + (target.height / 2) - (wrapper.top + wrapper.height / 2);
      },
      scale: 0.85,
      ease: 'power2.inOut'
    }, 0);

    // Animation 2: Services → About (flip to front, move to about right container)
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.About',
        start: 'top 70%',
        end: 'top 25%',
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    });

    tl2.to(floatingCard, {
      rotateY: 360,
      ease: 'power2.inOut'
    }, 0);

    tl2.to(floatingWrapper, {
      x: () => {
        const target = aboutTarget.getBoundingClientRect();
        const wrapper = floatingWrapper.getBoundingClientRect();
        return target.left + (target.width / 2) - (wrapper.left + wrapper.width / 2);
      },
      y: () => {
        const target = aboutTarget.getBoundingClientRect();
        const wrapper = floatingWrapper.getBoundingClientRect();
        return target.top + (target.height / 2) - (wrapper.top + wrapper.height / 2);
      },
      scale: 0.8,
      ease: 'power2.inOut'
    }, 0);

    console.log('GSAP animations initialized');
  });

});
