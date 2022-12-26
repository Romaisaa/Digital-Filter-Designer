let lArrow = document.querySelector(".l-arrow");
let rArrow = document.querySelector(".r-arrow");
let catalogImgs = document.getElementsByClassName("catalog-img");
let openDialog = document.getElementsByClassName("phase-correct-btn")[0];
var exIndex = 0;
var rimgPos = 1;
var limgPos = 1;
var a_coef = [];
var a_preview = [];

const correctPhase = document.getElementsByClassName("correct-phase")[0];
openDialog.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(correctPhase.classList);
  correctPhase.classList.remove("preview-mode");
});

// window.addEventListener("click", function (e) {
//   if (!openDialog.contains(e.target)) {
//     correctPhase.classList.add("preview-mode");
//   }
// });

updateList();
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("arrow")) {
    for (i = 0; i < catalogImgs.length; i++) {
      if (catalogImgs[i].classList.contains("selected-catalog-img")) {
        exIndex = catalogImgs[i].classList[1][2];
      }
      catalogImgs[i].classList.remove("selected-catalog-img");
    }
    if (e.target == lArrow) {
      catalogImgs[exIndex - 1].classList.add("selected-catalog-img");
      scrollImgs(105);
    } else if (e.target == rArrow) {
      limgPos = 1;
      catalogImgs[parseInt(exIndex) + 1].classList.add("selected-catalog-img");
      scrollImgs(-105);
    }
  }
});

function scrollImgs(e) {
  var style = window.getComputedStyle(document.querySelector(".catalog-img"));
  var matrix = new WebKitCSSMatrix(style.transform);
  console.log("translateX: ", matrix.m41);
  for (i = 0; i < catalogImgs.length; i++) {
    catalogImgs[
      i
    ].style.transform = `translateX(calc(${e}% + ${matrix.m41}px))`;
  }
}

function updateList() {
  var container = document.getElementById("filters");
  container.innerHTML = "";
  for (var i = 0; i < a_coef.length; i++) {
    container.innerHTML += `<div class="filter-dialog f${
      i + 1
    }"><div class="f-icon"><i class="fa-solid fa-eye"></i></div><div class="vr"></div><div class="f-title"> a= ${
      a_coef[i]
    }</div></div>`;
  }
}

var form_config = { button: null };

$("#add_a").click(function () {
  form_config.button = "add_a";
});

$("#preview_a").click(function () {
  form_config.button = "preview_a";
});

$("#a_form").submit(function (e) {
  e.preventDefault();
  if (form_config.button === "add_a") add_a();
  else if (form_config.button === "preview_a") preview_a();
});

function preview_a() {
  let a_input = document.getElementById("a_input").value;
  console.log("preview");
  a_preview = [a_input];
  document.getElementById(
    "all-pass-title"
  ).innerHTML = `All Pass Filter for a=${a_input}`;
  preview_filter();
}

function add_a() {
  let a_input = document.getElementById("a_input").value;
  a_coef.push(a_input);
  updateList();
  change_filter();
  document.getElementById("a_input").value = "";
}
