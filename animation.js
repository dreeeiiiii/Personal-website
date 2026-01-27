document.addEventListener("DOMContentLoaded", () => {

    const follower = document.querySelector(".mouse-follower");
    if (follower) {
      document.addEventListener("mousemove", (e) => {
        follower.style.left = (e.clientX + 25) + "px";
        follower.style.top = (e.clientY + 15) + "px";
      });
    }
  

    const nav = document.querySelector("nav");
    if (!nav) return;
  
    function onScroll() {
      nav.classList.toggle("available-mode", window.scrollY > 60);
    }
  
    onScroll();
    window.addEventListener("scroll", onScroll);
  });
  