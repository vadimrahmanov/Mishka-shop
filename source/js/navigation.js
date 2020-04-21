var navigation = document.querySelector(".main-nav");
var navLists = document.querySelectorAll(".main-nav__list");
var menuButton = document.querySelector(".header__toggle");

navLists.forEach(function(item) {
  item.classList.add("main-nav-hidden");
})

menuButton.addEventListener("click", function () {
  navLists.forEach(function (item) {
    item.classList.toggle("main-nav-hidden");
  })
});
