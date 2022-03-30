const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
// const switchLabel = document.querySelector(".switch label");
// const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function () {
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true"
    ? (this.setAttribute("aria-expanded", "false"),
      document.querySelector(".admin-menu img").style.display = "none",
      document.querySelector(".admin-menu").style.marginTop = (35).toString()+"px")
      : (this.setAttribute("aria-expanded", "true"),
      document.querySelector(".admin-menu img").style.display = "initial",
      document.querySelector(".admin-menu").style.marginTop = 0);
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true"
    ? (this.setAttribute("aria-expanded", "false"),
      document.querySelector(".admin-menu").classList.remove("active"))
    : (this.setAttribute("aria-expanded", "true"),
      document.querySelector(".admin-menu").classList.add("active"),
      document.querySelector(".admin-menu img").style.display = "initial",
      document.querySelector(".admin-menu").style.marginTop = 0);
  this.getAttribute("aria-label") == "open menu"
    ? this.setAttribute("aria-label", "close menu")
    : this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
  link.addEventListener("mouseenter", function () {
    if (
      body.classList.contains(collapsedClass) &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      const tooltip = this.querySelector("span").textContent;
      this.setAttribute("title", tooltip);
    } else {
      this.removeAttribute("title");
    }
  });
}

window.addEventListener('resize', () => {
  window.innerWidth > 767 
  ? (body.classList.toggle("mob-menu-opened"),
    toggleMobileMenu.setAttribute("aria-expanded", "false"),
    document.querySelector(".admin-menu").classList.remove("active"),
    toggleMobileMenu.setAttribute("aria-label", "close menu"))
  : (body.classList.remove(collapsedClass),
    collapseBtn.setAttribute("aria-expanded", "true"),
    document.querySelector(".admin-menu img").style.display = "initial",
    document.querySelector(".admin-menu").style.marginTop = 0,
    collapseBtn.setAttribute("aria-label", "expand menu"));
});

/*TOGGLE LIGHT/DARK MODE*/
// if (localStorage.getItem("dark-mode") === "false") {
//   html.classList.add(lightModeClass);
//   switchInput.checked = false;
//   switchLabelText.textContent = "Light";
// }

// switchInput.addEventListener("input", function () {
//   html.classList.toggle(lightModeClass);
//   if (html.classList.contains(lightModeClass)) {
//     switchLabelText.textContent = "Light";
//     localStorage.setItem("dark-mode", "false");
//   } else {
//     switchLabelText.textContent = "Dark";
//     localStorage.setItem("dark-mode", "true");
//   }
// });