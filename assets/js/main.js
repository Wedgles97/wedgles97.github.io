/*=========== MENU TOGGLE ===========*/
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.querySelector(".nav__menu");
const navLinks = document.querySelectorAll(".nav__link");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navToggle.classList.toggle("not-active");
    if (navMenu) navMenu.classList.toggle("show-menu");
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navToggle.classList.add("not-active");
    if (navMenu) navMenu.classList.remove("show-menu");
  });
});


/*=========== BLUR HEADER ON SCROLL ===========*/
const header = document.getElementById("header");
const blurHeader = () => {
  if (!header) return;
  header.classList.toggle("blur-header", window.scrollY >= 50);
};
window.addEventListener("scroll", blurHeader);


/*=========== SHOW SCROLL UP BUTTON ===========*/
const scrollUpBtn = document.getElementById("scroll-up");
const toggleScrollUp = () => {
  if (!scrollUpBtn) return;
  scrollUpBtn.classList.toggle("show-scroll", window.scrollY >= 350);
};
window.addEventListener("scroll", toggleScrollUp);


/*=========== DARK / LIGHT THEME ===========*/
const themeButton = document.getElementById("theme-button");
const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const updateTheme = () => {
  document.documentElement.classList.toggle(
    "dark-mode",
    darkMediaQuery.matches
  );
};

updateTheme();
darkMediaQuery.addEventListener("change", updateTheme);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");
  });
}


/*=========== SMOOTH SCROLL (APENAS ÂNCORAS) ===========*/
function smoothScrollToTarget(target) {
  // Ignora href inválidos ou apenas "#"
  if (!target || target === "#") return;

  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const nav = document.querySelector("nav");
  const navHeight = nav ? nav.offsetHeight : 0;
  const offset = 20;

  const targetPosition =
    targetElement.getBoundingClientRect().top +
    window.scrollY -
    navHeight -
    offset;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}

// Intercepta apenas links internos (#)
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (href && href.startsWith("#") && href !== "#") {
    e.preventDefault();
    smoothScrollToTarget(href);
  }
});


/*=========== DOWNLOAD CV ===========*/
const downloadLink = document.getElementById("downloadLink");
if (downloadLink) {
  const downloadFile = (event) => {
    event.preventDefault();
    const fileUrl = downloadLink.getAttribute("href");
    if (!fileUrl) return;

    const tempLink = document.createElement("a");
    tempLink.href = fileUrl;
    tempLink.download = "Wedgles-CV.pdf";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  downloadLink.addEventListener("click", downloadFile);
  downloadLink.addEventListener("touchstart", downloadFile);
}
