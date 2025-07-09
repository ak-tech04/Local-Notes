const themeToggleBtn = document.querySelector(".theme-toggle-btn");

window.onload = () => {
  let html = document.querySelector("html");
  let theme = localStorage.getItem("theme");
  if (!theme) {
      localStorage.setItem("theme", "light");
      themeToggleBtn.innerHTML = '🌞';
  }
  html.setAttribute("data-theme", theme);
};
themeToggleBtn.addEventListener("click", (e) => {
  let theme = localStorage.getItem("theme");
  let html = document.querySelector("html");
  if (theme === "light") {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggleBtn.innerHTML = '🌞';
} else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeToggleBtn.innerHTML = '🌙';
  }
});

