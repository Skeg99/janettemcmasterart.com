document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const root = document.documentElement;

  function setTheme(mode) {
    if (mode === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      icon.innerHTML = `<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />`; // Moon
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      icon.innerHTML = `<path d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 0l-.7.7M6.34 17.66l-.7.7M12 5a7 7 0 000 14 7 7 0 000-14z" />`; // Sun
    }
  }

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  toggleBtn?.addEventListener("click", () => {
    const isDark = root.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  });
});

// js/main.js — append after your existing code
document.addEventListener("DOMContentLoaded", () => {
  // Stats count-up on scroll into view
  const statsSection = document.getElementById("stats");
  const statEls = statsSection.querySelectorAll(".stat-number");
  let started = false;

  const animateCount = (el) => {
    const target = +el.dataset.target;
    const duration = 2000; // ms
    const stepTime = Math.abs(Math.floor(duration / target));
    let count = 0;

    const timer = setInterval(() => {
      count += 1;
      el.textContent = count.toLocaleString();
      if (count >= target) {
        clearInterval(timer);
        el.textContent = target.toLocaleString();
      }
    }, stepTime);
  };

  const onEntry = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        statEls.forEach((el) => animateCount(el));
        started = true;
        observer.disconnect();
      }
    });
  };

  const observer = new IntersectionObserver(onEntry, {
    threshold: 0.5,
  });
  observer.observe(statsSection);
});

// js/main.js — append after your existing code
document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.getElementById("calendar-days");
  const monthYearEl = document.getElementById("month-year");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  function renderCalendar() {
    // Header
    monthYearEl.textContent = `${monthNames[month]} ${year}`;

    // Clear previous days
    daysContainer.innerHTML = "";

    // Day of week month starts on (0=Sun, 6=Sat)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Number of days in this month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill blanks for days of previous month
    for (let i = 0; i < firstDayIndex; i++) {
      const blank = document.createElement("div");
      daysContainer.appendChild(blank);
    }

    // Fill actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("div");
      cell.textContent = day;
      cell.className =
        "py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700 transition";

      // Highlight today
      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate()
      ) {
        cell.classList.add(
          "bg-indigo-600",
          "dark:bg-indigo-500",
          "text-white",
          "font-semibold"
        );
      }

      daysContainer.appendChild(cell);
    }
  }

  // Navigation
  prevBtn.addEventListener("click", () => {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    renderCalendar();
  });

  // Initial draw
  renderCalendar();
});