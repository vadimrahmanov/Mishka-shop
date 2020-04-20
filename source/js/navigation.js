var navigation = document.querySelector(".main-nav");
var navList = document.querySelector(".main-nav__list");
var menuButton = document.querySelector(".header__toggle");

navList.classList.add("main-nav-hidden");

menuButton.addEventListener("click", function () {
  navList.classList.toggle("main-nav-hidden");
});
