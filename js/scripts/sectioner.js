document.addEventListener("DOMContentLoaded", startSectioning);

let currentSection = 0;

let sections = [];

function startSectioning() {
  document.querySelectorAll(".section, .hero").forEach(element => {
    sections.push(element);
  });

  // Prevent user from scrolling and do my own behavior using javascript event listeners
  window.addEventListener('wheel', function(e) {
    e.preventDefault();  // Prevent the default scroll behavior

    // Add your own scroll behavior here
    // For example, scroll to the next section when scrolling down, and to the previous section when scrolling up
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      // Scroll down
      currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
      // Scroll up
      currentSection--;
    }

    // Scroll to the current section
    window.scrollTo({
      top: sections[currentSection].offsetTop,
      behavior: 'smooth'
    });
  }, { passive: false });  // Use { passive: false } to make preventDefault work
}
