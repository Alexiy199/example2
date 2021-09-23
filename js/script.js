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
  if (e.target.dataset.elemgl === "addtocart") {
    // console.log(e.target.children[0].dataset);
    let blockImgCard = e.srcElement;

    if (e.target.children[0].dataset.add === "added") {
      e.target.children[0].remove();
      countCart--;
      if (countCart <= 0) cartElem.classList.remove("in-cart");
      cartElem.innerText = `${countCart}`;
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
    cartElem.classList.add("in-cart");
    countCart++;
    cartElem.innerText = `${countCart}`;
    return;
  }
};

const addToCart = (e) => {
  checkClick(e);

  if (e.target.dataset.elemgl === "cardglasses") {
    document.body.classList.add("block-scroll"); //block scroll

    let imgSrc = e.target.querySelector(".glass-img").src,
      txtPrice = e.target.querySelector(".price-gl"),
      nameGl = e.target.querySelector(".name-gl").innerText,
      salePrice = e.target.querySelector(".sale-price");

    const overlay = `<div class="overlay">
	<div class="description-product">
		<span class="close" data-close="close">&#10060;</span>
		<img src="${imgSrc}" alt="img">
		<span class="description-title">Description</span> <br> <br>
		<span>${nameGl}</span> <br> <br>
		<span class="discripton-txt">Здесь доджно быть описание, но это только пример =)</span> 
	<div class="block-info-more"> 
		<span class="modal-txt-price">${txtPrice.innerText}</span>
		${e.target.firstElementChild.className === "sale" ? salePrice.innerText : ""}
		<div class="box-cart" data-elemgl="addtocart">
			<img src="./img/cartpng.png" alt="img" width="20px" height="20px" class="cart">
		</div>
		</div>
	</div>
	</div>`;

    document.body.insertAdjacentHTML("afterbegin", overlay);

    const overlayHtml = document.querySelector(".overlay");

    if (e.target.firstElementChild.className === "sale") {
      let modTxtPrice = overlayHtml.querySelector(".modal-txt-price");
      modTxtPrice.style =
        "background: white; text-decoration: line-through; color: gray;";
    }

    overlayHtml.addEventListener("click", () => {
      document.body.classList.remove("block-scroll"); //unlock scroll
      overlayHtml.remove();
    });

    const blockDescription = document.querySelector(".description-product");
    blockDescription.addEventListener("click", function (eBlock) {
      eBlock.stopPropagation();
      if (eBlock.target.dataset.close === "close") {
        document.body.classList.remove("block-scroll"); //unlock scroll
        overlayHtml.remove();
      }

      checkClick(eBlock);
    });
  }
};

glassesSection.addEventListener("click", addToCart);

//========= Sale =======
const cards = document.querySelectorAll(".elem-gl"),
  iconSale = document.querySelector(".icon");

let saleCount = 0;

function createMark(property) {
  property.price = property.card.children[3].innerText;
  property.price = property.price.slice(1, property.price.lenght);

  const saleActive = () => {
    property.card.children[3].style =
      "text-decoration: line-through; color: gray;";
    let salePrice = `<span class="sale-price">$ ${
      property.price - property.price * property.percent
    } </span>`;

    return salePrice;
  };

  let blockMark = `<div class="${property.mark}" data-mark="${property.mark}">
		<span>${property.mark}</span>
	</div>${property.mark === "sale" ? saleActive() : ""}`;

  property.card.insertAdjacentHTML("afterbegin", blockMark);
}

const sale1 = {
  price: 0,
  percent: 0.11,
  card: cards[2],
  mark: "sale",
};

createMark(sale1);

const sale2 = {
  price: 0,
  percent: 0.21,
  card: cards[7],
  mark: "sale",
};

createMark(sale2);

const newGl = {
  price: 0,
  percent: 0,
  card: cards[15],
  mark: "new",
};
createMark(newGl);

const newGl2 = {
  price: 0,
  percent: 0,
  card: cards[16],
  mark: "new",
};

createMark(newGl2);

const newGl3 = {
  price: 0,
  percent: 0,
  card: cards[17],
  mark: "new",
};

createMark(newGl3);
//============== last function ==
writeCountSale();

function writeCountSale() {
  cards.forEach((elem) => {
    if (elem.firstElementChild.className === "sale") saleCount++;
  });
  if (saleCount > 0) {
    iconSale.insertAdjacentHTML(
      "afterbegin",
      `<span class="sale-count">${saleCount}</span>`
    );
  }
}
