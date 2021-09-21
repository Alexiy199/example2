"use strict";

const btnSlider = document.querySelectorAll(".btn-slider");
let slides = document.querySelectorAll(".img-slide"),
  dots = document.querySelectorAll(".dote");

btnSlider[0].addEventListener("click", () => toLeft());
btnSlider[1].addEventListener("click", () => toRight());

function toLeft() {
  dots[1].style = "background: white;";
  dots[0].style = "background: #0012ff;";
  slides[1].style =
    "transform: translate(100%, 0%); transition: all 0.5s ease 0s;";
  slides[0].style =
    "transform: translate(+0%, 0%); transition: all 0.5s ease 0s;";
}

function toRight() {
  dots[0].style = "background: white;";
  dots[1].style = "background: #0012ff;";
  slides[1].style =
    "transform: translate(0%, 0%); transition: all 0.5s ease 0s;";
  slides[0].style =
    "transform: translate(-100%, 0%); transition: all 0.5s ease 0s;";
}

//============ SLIDER 2 =============

const slides2 = document.querySelectorAll(".img-slider-2"),
  dots2 = document.querySelectorAll(".dote-2");
console.log(dots2);

const currentDote = "border: 4px solid blue; background-color: green;";
const defDote = "border: 4px solid #99999f; background: white;";

const cssMove = [
  "transform: translate(-100%, 0%); transition: all 0.5s ease 0s;",
  "transform: translate(0%, 0%); transition: all 0.5s ease 0s;",
  "transform: translate(100%, 0%); transition: all 0.5s ease 0s;",

  "transform: translate(-200%, 0%); transition: all 0.5s ease 0s;",
  "transform: translate(-100%, 0%); transition: all 0.5s ease 0s;",
  "transform: translate(0%, 0%); transition: all 0.5s ease 0s;",

  "transform: translate(0%, 0%); transition: all 0.5s ease 0s;",
  "transform: translate(100%, 0%); transition: all 0.5s ease 0s;",
  "transform: translate(200%, 0%); transition: all 0.5s ease 0s;",
];

let count = 0;

function moveSlide() {
  if (count === 0) {
    dots2[1].style = defDote;
    dots2[2].style = currentDote;
    slides2[0].style = cssMove[0];
    slides2[1].style = cssMove[1];
    slides2[2].style = cssMove[2];
  }
  if (count === 1) {
    dots2[2].style = defDote;
    dots2[3].style = currentDote;
    slides2[0].style = cssMove[3];
    slides2[1].style = cssMove[4];
    slides2[2].style = cssMove[5];
  }
  if (count === 2) {
    dots2[3].style = defDote;
    dots2[2].style = currentDote;
    slides2[0].style = cssMove[0];
    slides2[1].style = cssMove[1];
    slides2[2].style = cssMove[2];
  }
  if (count === 3) {
    dots2[1].style = currentDote;
    dots2[2].style = defDote;
    slides2[0].style = cssMove[6];
    slides2[1].style = cssMove[7];
    slides2[2].style = cssMove[8];
  }
}

setInterval(() => {
  moveSlide();
  count++;
  if (count > 3) count = 0;
}, 6000);

//============= CART ===================================
const glassesSection = document.querySelector(".glasses"),
  cartElem = document.querySelector(".cart-count");

let countCart = 0;

const checkClick = function (e) {
  console.log("check click");
  if (e.target.dataset.elemgl === "addtocart") {
    console.log(e.target.children[0].dataset);
    let blockImgCard = e.srcElement;

    if (e.target.children[0].dataset.add === "added") {
      console.log("ADDED");
      e.target.children[0].remove();
      countCart--;
      cartElem.innerText = `CART (${countCart})`;
      blockImgCard.style = "background: #ffa500;";
      blockImgCard.insertAdjacentHTML(
        "afterbegin",
        `<img src="./img/cartpng.png" alt="img" width="25px" height="25px" class="cart">`
      );
      return;
    }

    e.target.children[0].remove();

    blockImgCard.style = "background: #fff;";
    blockImgCard.insertAdjacentHTML(
      "afterbegin",
      `<img src="./img/add.png" alt="img" width="25px" height="25px" data-add="added" class="cart">`
    );
    countCart++;
    cartElem.innerText = `CART (${countCart})`;
    return;
  }
};

const addToCart = (e) => {
  checkClick(e);

  if (e.target.dataset.elemgl === "cardglasses") {
    console.log(e.target.children[3].innerText);
    const imgSrc = e.target.children[0].src;

    const overlay = `<div class="overlay">
	<div class="discription-product">
		<span class="close">&#10060;</span>
		<img src="${imgSrc}" alt="img">
		<span class="discription-title">Discription</span> <br> <br>
		<span class="discripton-txt">Здксь доджно быть описание, но это только пример =)</span> 
	<div class="block-info-more"> 
		<span>${e.target.children[3].innerText}</span>
		<div class="box-cart" data-elemgl="addtocart">
			<img src="./img/cartpng.png" alt="img" width="20px" height="20px" class="cart">
		</div>
		</div>
	</div>
	</div>`;

    document.body.insertAdjacentHTML("afterbegin", overlay);
    const blockDiscription = document
      .querySelector(".discription-product")
      .addEventListener("click", (evt) => checkClick(evt));

    const close = document
      .querySelector(".close")
      .addEventListener("click", () => {
        console.log("close");
      });
  }
};

glassesSection.addEventListener("click", addToCart);
