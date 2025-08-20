document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  function animateCircle(circle) {
    let percent = parseInt(circle.getAttribute("data-percent"));
    let number = circle.parentElement.querySelector(".number");
    let progress = circle.querySelector(".progress");

    let radius = progress.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;

    progress.style.strokeDasharray = circumference;
    progress.style.strokeDashoffset = circumference;

    let count = 0;
    let interval = setInterval(() => {
      if (count <= percent) {
        number.textContent = count + "%";
        let offset = circumference - (count / 100) * circumference;
        progress.style.strokeDashoffset = offset;
        count++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const circle = entry.target;
      const number = circle.parentElement.querySelector(".number");
      const progress = circle.querySelector(".progress");
      let radius = progress.r.baseVal.value;
      let circumference = 2 * Math.PI * radius;

      if (entry.isIntersecting) {
        animateCircle(circle);
      } else {
        // Reset
        number.textContent = "0%";
        progress.style.strokeDashoffset = circumference;
      }
    });
  }, { threshold: 0.6 });

  circles.forEach(circle => observer.observe(circle));
});
