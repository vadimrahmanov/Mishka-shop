var navListOne = document.querySelector(".main-nav__list--catalog-and-order");
var navListTwo = document.querySelector(".main-nav__list--search-and-basket");
var menuButton = document.querySelector(".header__toggle");
var cartButtons = document.querySelectorAll(".button--catalog-buy");
var weekOfferButton = document.querySelector(".button--week-offer");
var modal = document.querySelector(".modal");
var setListner = function (target, type, listner) {
  if (!target) {
    return;
  }
  target.addEventListener(type, listner);
}

menuButton.classList.remove("header__toggle--hidden");
navListOne.classList.add("main-nav-hidden");
navListTwo.classList.add("main-nav-hidden");

menuButton.addEventListener("click", function () {
  navListOne.classList.toggle("main-nav-hidden"),
  navListTwo.classList.toggle("main-nav-hidden"),
  menuButton.classList.toggle("header__toggle--close");
});

for (var i = 0; i < cartButtons.length; i++) {
  setListner(cartButtons[i], "click", function (e) {
    e.preventDefault();
    modal.classList.add("modal__open");
    if (modal.classList.contains("modal__open")) {
      window.addEventListener("click", function (e) {
        if (e.target === modal) {
          modal.classList.remove("modal__open");
        }
      })
    }
  });
};

setListner(weekOfferButton, "click", function (openOrder) {
  openOrder.preventDefault();
  modal.classList.add("modal__open");
  if (modal.classList.contains("modal__open")) {
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("modal__open");
      }
    })
  }
})
