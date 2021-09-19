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
