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
  cartElem = document.querySelector(".cart-count"),
  arrCart = [];

const checkClick = function (e) {
  if (e.target.dataset.elemgl === "addtocart") {
    //console.log(e.target.children[0]);
    let blockImgCard = e.srcElement,
      nameGlasses =
        blockImgCard.parentElement.className === "block-info-more"
          ? blockImgCard.parentElement.parentElement.querySelector(".name-gl")
              .innerText
          : blockImgCard.parentElement.querySelector(".name-gl").innerText;

    if (e.target.children[0].dataset.add === "added") {
      e.target.children[0].remove();
      let idxDel = arrCart.findIndex((element) => element === nameGlasses);
      arrCart.splice(idxDel, 1);
      console.log("del idx =", idxDel, arrCart);

      if (arrCart.length <= 0) cartElem.classList.remove("in-cart");

      cartElem.innerText = arrCart.length;
      blockImgCard.style = "background: #ffa500;";
      blockImgCard.insertAdjacentHTML(
        "afterbegin",
        `<img src="./img/cartpng.png" alt="img"  width="20px" height="20px" class="cart">`
      );
      return;
    }

    e.target.children[0].remove();
    blockImgCard.style = "background: #fff;";
    blockImgCard.insertAdjacentHTML(
      "afterbegin",
      `<img src="./img/add.png" alt="img"  width="20px" height="20px" class="cart" data-add="added">`
    );

    //================== element move to cart ===============
    arrCart.push(nameGlasses);
    // console.log(blockImgCard.parentElement);

    cartElem.classList.add("in-cart");
    console.log("add");
    cartElem.innerText = arrCart.length;
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

    const overlay = `<div class="overlay" data-close="close">
	<div class="description-product">
		<span class="close" data-close="close">&#10060;</span>
		<img src="${imgSrc}" alt="img">
		<span class="description-title">Description</span> <br> <br>
		<span class="name-gl">${nameGl}</span> <br> <br>
		<span class="discripton-txt">Здесь доджно быть описание, но это только пример =)</span> 
	<div class="block-info-more"> 
		<span class="modal-txt-price">${txtPrice.innerText}</span>
		<span class="x">${
      e.target.firstElementChild.className === "sale" ? salePrice.innerText : ""
    }</span>
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

      let modSalePrice = overlayHtml.querySelector(".x");
      modSalePrice.classList.add("mod-sale-price");
    }

    const blockDescription = document.querySelector(".description-product");
    let nameGlDescription = blockDescription.querySelector(".name-gl");

    arrCart.forEach((item) => {
      if (nameGlDescription.innerText === item) {
        let boxCart = blockDescription.lastElementChild.lastElementChild;
        boxCart.children[0].remove();
        boxCart.style = "background: #fff;";
        boxCart.insertAdjacentHTML(
          "afterbegin",
          `<img src="./img/add.png" alt="img"  width="20px" height="20px" class="cart" data-add="added">`
        );
      }
    });

    overlayHtml.addEventListener("click", function (eBlock) {
      eBlock.stopPropagation();
      if (eBlock.target.dataset.close === "close") {
        document.body.classList.remove("block-scroll"); //unlock scroll
        overlayHtml.remove();

        let matchName = arrCart.find(
          (elem) => elem === nameGlDescription.innerText
        );
        console.log(matchName);
        if (matchName === undefined) {
          cards.forEach((card) => {
            if (
              card.querySelector(".name-gl").innerText ===
              nameGlDescription.innerText
            ) {
              let delElem = card.querySelector(".box-cart");
              delElem.style = "background: #ffa500";
              delElem.children[0].remove();
              delElem.insertAdjacentHTML(
                "afterbegin",
                `<img src="./img/cartpng.png" alt="img"  width="20px" height="20px" class="cart" data-add="added">`
              );
              console.log("deleted");
            }
          });
        }
        return;
      }
      if (eBlock.target.dataset.elemgl === "addtocart") {
        cards.forEach((card) => {
          if (
            card.querySelector(".name-gl").innerText ===
            nameGlDescription.innerText
          ) {
            let addElem = card.querySelector(".box-cart");
            addElem.style = "background: #fff";
            addElem.children[0].remove();
            addElem.insertAdjacentHTML(
              "afterbegin",
              `<img src="./img/add.png" alt="img"  width="20px" height="20px" class="cart" data-add="added">`
            );
          }
        });
        console.log("add to cart");
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

    let salePrice = `<span class="sale-price">$ ${Math.ceil(
      property.price - property.price * property.percent
    )} </span>`;

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
