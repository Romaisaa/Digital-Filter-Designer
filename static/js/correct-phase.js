let lArrow = document.querySelector(".l-arrow");
let rArrow = document.querySelector(".r-arrow");
let catalogImgs = document.getElementsByClassName("catalog-img");
var exIndex = 0;
var rimgPos = 1;
var limgPos = 1;
var a_coef = [5, "4-2i"];
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
  for (var i = 0; i < a_coef.length; i++) {
    container.innerHTML += `<div class="filter f${
      i + 1
    }"><div class="f-icon"><i class="fa-solid fa-eye"></i></div><div class="vr"></div><div class="f-title"> a= ${
      a_coef[i]
    }</div></div>`;
  }
}

function is_valid_complex(complex_string) {
  let flag = true;
  try {
    var b = math.complex(complex_string);
  } catch (err) {
    flag = false;
  }
  return flag;
}

function validate_complex() {
  input = document.getElementById("a_input").value;
  var regex = new RegExp(
    "^(?=[iI.\\d+-])([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?(?![iI.\\d]))?([+-]?(?:(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?)?[iI])?$"
  );
  return regex.test(input);
}
