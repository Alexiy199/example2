const cartWhite = document.querySelector("#cart-white");

cartWhite.addEventListener("click", function () {
  document.body.classList.add("block-scroll"); //block scroll

  const modalCart = `<div class="overlay" data-close="close">
		<div class="modal-cart">
			<div class="header-cart">
				<span class="close" data-close="close">&#10060;</span>
				<span>MY CART</span>
			</div>
			<div class="box-sum">
			<span>SUM :</span> <br>
			<button>BUY</button>
		</div>
		</div>
	</div>`;

  document.body.insertAdjacentHTML("afterbegin", modalCart);

  let cartContent = document.querySelector(".modal-cart"),
    sumBox = document.querySelector(".box-sum"),
    sumPrice = 0;

  for (let i = 0; arrCart.length > i; i++) {
    cards.forEach((element) => {
      if (element.querySelector(".name-gl").innerText === arrCart[i]) {
        console.log(element);

        if (element.querySelector(".sale-price") !== null) {
          sumPrice += Number(
            element.querySelector(".sale-price").innerText.replace(/\D/g, "")
          );
        } else {
          sumPrice += Number(
            element.querySelector(".price-gl").innerText.replace(/\D/g, "")
          );
        }

        cartContent.insertAdjacentHTML(
          "beforeend",
          `<div class="box-content-cart">${element.innerHTML}</div>`
        );
      }
    });
  }

  let addedImg = cartContent.querySelectorAll(".box-cart");
  if (addedImg.length > 0) {
    addedImg.forEach((element) => element.remove());
  }

  sumBox.insertAdjacentHTML(
    "afterbegin",
    `<span class="sum-price">${sumPrice} $</span>`
  );

  if (sumPrice === 0) {
    cartContent.innerHTML = `<span class="empty">Empty</span>`;
  }

  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", (eCart) => {
    document.body.classList.remove("block-scroll"); //unlock scroll

    if (eCart.target.dataset.close === "close") overlay.remove();
  });
});

//======== BURGER MENU ================

const menuBrg = document.querySelector(".mob-menu-brg"),
  menu2 = document.querySelector(".menu-2"),
  nav2 = document.querySelector(".nav2");

menuBrg.addEventListener("click", function () {
  menu2.classList.add("menu-2-on");
  nav2.classList.add("nav2-on");

  menu2.insertAdjacentHTML(
    "beforebegin",
    `<span class="close-menu">&#10060;</span>`
  );

  menuBrg.style = "display: none;";

  let close = document.querySelector(".close-menu");
  close.addEventListener("click", () => {
    menu2.classList.remove("menu-2-on");
    nav2.classList.remove("nav2-on");
    close.remove();
    menuBrg.style = "display: block;";
  });
});
