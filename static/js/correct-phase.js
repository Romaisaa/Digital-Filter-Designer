let lArrow = document.querySelector(".l-arrow");
let rArrow = document.querySelector(".r-arrow");
let catalogImgs = document.getElementsByClassName("catalog-img");
let openDialog = document.getElementsByClassName("phase-correct-btn")[0];
var exIndex = 0;
var rimgPos = 1;
var limgPos = 1;
var a_coef = [];
var a_preview = [];
var a_layers = [];

const correctPhase = document.getElementsByClassName("correct-phase")[0];
openDialog.addEventListener("click", (e) => {
  e.preventDefault();
  cpPage.style.display = "flex"
  console.log(correctPhase.classList);
  correctPhase.classList.remove("preview-mode");
});

var selected_a;
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
      console.log(`a = ${catalogImgs[exIndex - 1].classList[2]}`)
      scrollImgs(105);
    } else if (e.target == rArrow) {
      limgPos = 1;
      catalogImgs[parseInt(exIndex) + 1].classList.add("selected-catalog-img");
      console.log(`a = ${catalogImgs[parseInt(exIndex) + 1].classList[2]}`)
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
  for (var i = 0; i < a_layers.length; i++) {
    container.innerHTML += `<div class="filter-dialog" id="${i}" ><div class="f-icon" id="f${i}"><i class="fa-solid fa-eye"></i></div><div class="vr"></div><div class="f-title" id=text${i}> a= ${
      a_layers[i]
    }</div></div>`;
  }
}

let filterDialogs = document.getElementsByClassName("filter-dialog")
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-dialog")) {
    for (i = 0; i < filterDialogs.length; i++){
      filterDialogs[i].classList.remove("selected-filter")
    }
    e.target.classList.add("selected-filter")
  }
  if (e.target.classList.contains("f-icon")) {
    e.target.querySelector("svg").classList.toggle("hide-svg")
    console.log(e.target.id[1])
  }
})


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
  a_layers.push(a_input);
  updateList();
  change_filter();
  document.getElementById("a_input").value = "";
}

const a_group = document.getElementById("filters");
const filtersGroup = (e) => {
  if (e.target.id !== "filters") {
    if (e.target.id.substring(0, 4) === "text") {
      selected_a = e.target.id.substring(4, e.target.id.length);
      selected_a = parseInt(selected_a);
    } else selected_a = e.target.id;
  }
};

a_group.addEventListener("click", filtersGroup);

function delete_filter() {
  let index = a_coef.indexOf(selected_a);
  a_coef.splice(index, 1);
  a_layers.splice(selected_a, 1);
  updateList();
  change_filter();
}

const delete_btn = document.getElementById("delete-filter");
delete_btn.addEventListener("click", delete_filter);

function disable_filter() {
  let index = a_coef.indexOf(selected_a);
  a_coef.splice(index, 1);
  change_filter();
}

function enable_filter() {
  let new_a = a_layers[selected_a];
  a_coef.push(new_a);
  change_filter();
}


////////////////// close tab //////////////////
let cpPage = document.querySelector(".correct-phase")
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-tab")) {
    cpPage.style.display = "none"
  }
})