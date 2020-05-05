var navigation = document.querySelector(".main-nav");
var navListOne = document.querySelector(".main-nav__list--catalog-and-order");
var navListTwo = document.querySelector(".main-nav__list--search-and-basket");
var menuButton = document.querySelector(".header__toggle");
var openMenu = document.querySelector(".header__toggle-button");
var closeMenu = document.querySelector(".header__toggle-close");

menuButton.classList.remove("header__toggle--hidden");
navListOne.classList.add("main-nav-hidden");
navListTwo.classList.add("main-nav-hidden");

menuButton.addEventListener("click", function () {
  navListOne.classList.toggle("main-nav-hidden"),
  navListTwo.classList.toggle("main-nav-hidden"),
  openMenu.classList.toggle("header__toggle--hidden"),
  closeMenu.classList.toggle("header__toggle--hidden");
});
