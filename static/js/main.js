var zeros, poles;
var zerosCoordinates = [];
var polesCoordinates = [];
console.log(zerosCoordinates);
let zContainer = document.querySelector(".z-container");
zContainer.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("zero") &&
    !e.target.classList.contains("pole")
  ) {
    addZeros(e);
    console.log(zerosCoordinates);
    console.log(polesCoordinates);
  }
});

//*************************** SelectMode ***************************//
let zerosPoles = document.getElementsByClassName("z-p");
var mode = "Zeros";
document.addEventListener("click", (e) => {
  menu.classList.remove("menu-show");
  if (e.target.classList.contains("z-p")) {
    for (i = 0; i < zerosPoles.length; i++) {
      zerosPoles[i].classList.remove("active-mode");
    }
    e.target.classList.add("active-mode");
    mode = e.target.innerHTML;
    console.log(mode);
  }
});

//*************************** fuctions ***************************//
var circleMove;
function addZeros(e) {
  clearInterval(circleMove);
  var x = e.pageX + "px";
  var y = e.pageY + "px";
  let zero = document.createElement("div");
  zero.style.position = "absolute";
  zero.style.left = x;
  zero.style.top = y;
  if (mode == "Zeros") {
    zero.className = "item zero";
    zerosCoordinates.push([e.pageX - 72.214, e.pageY - 236.57]);
  } else if (mode == "Poles") {
    zero.className = "item pole";
    polesCoordinates.push([e.pageX - 72.214, e.pageY - 236.57]);
  }
  console.log(zerosCoordinates.length);
  circleMove = setInterval(function () {
    a = (a - Math.PI / 360) % Math.PI;
    rotate(a);
  }, 1);
  zContainer.append(zero);
}

//*************************** move ***************************//

var el;
let newPosX = 0,
  newPosY = 0,
  startPosX = 0,
  startPosY = 0;

// when the user clicks down on the element
document.addEventListener("mousedown", function (e) {
  if (
    e.target.classList.contains("zero") ||
    e.target.classList.contains("pole")
  ) {
    e.target.classList.add("drag");
    el = document.querySelector(".drag");

    e.preventDefault();

    // get the starting position of the cursor
    startPosX = e.clientX;
    startPosY = e.clientY;

    document.addEventListener("mousemove", mouseMove);

    document.addEventListener("mouseup", function (e) {
      e.target.classList.remove("drag");

      document.removeEventListener("mousemove", mouseMove);
    });
  }
  change_filter();
});

function mouseMove(e) {
  // calculate the new position
  newPosX = startPosX - e.clientX;
  newPosY = startPosY - e.clientY;

  // with each move we also want to update the start X and Y
  startPosX = e.clientX;
  startPosY = e.clientY;

  // set the element's new position:
  el.style.top = el.offsetTop - newPosY + "px";
  el.style.left = el.offsetLeft - newPosX + "px";
}

////////////////////////////////////////////////////////
let menu = document.querySelector(".menu");
var selected;
document.addEventListener("contextmenu", (e) => {
  // e.preventDefault()
  if (
    e.target.classList.contains("zero") ||
    e.target.classList.contains("pole")
  ) {
    items = document.getElementsByClassName("item");
    for (i = 0; i < items.length; i++) {
      items[i].classList.remove("selected");
      items[i].classList.remove("selected-zero");
      items[i].classList.remove("selected-pole");
    }
    var x = e.pageX + "px";
    var y = e.pageY + "px";
    menu.style.left = x;
    menu.style.top = y;
    menu.classList.toggle("menu-show");
    if (e.target.classList.contains("zero")) {
      menu.querySelector(".option").innerHTML = "Convert to pole";
      e.target.classList.add("selected-zero");
      e.target.classList.add("selected");
      selected = "zero";
    } else {
      menu.querySelector(".option").innerHTML = "Convert to zero";
      e.target.classList.add("selected-pole");
      e.target.classList.add("selected");
      selected = "pole";
    }
  }
});

let convert = document.querySelector(".convert");
convert.addEventListener("click", (e) => {
  if (selected == "zero") {
    document.querySelector(".selected-zero").className = "pole";
  } else {
    document.querySelector(".selected-pole").className = "zero";
  }
});

let deletebtn = document.querySelector(".delete");
deletebtn.addEventListener("click", (e) => {
  document.querySelector(".selected").remove();
});

////////////////////////////////////////////////
let body = document.querySelector("body");
let zGraph = document.querySelector(".z-graph");
var filter = [];
console.log(zGraph.clientWidth / 2);
document.querySelector(".test").style.left = zGraph.clientWidth / 2 + "px";
document.querySelector(".test").style.top = zGraph.clientHeight / 2 + "px";
var x = zGraph.clientWidth / 2;
var y = zGraph.clientHeight / 2;
var r = zGraph.clientWidth / 2;
console.log([x, y, r]);
var a = 0;
var standardization = 0;
function rotate(a) {
  var px = x + r * Math.cos(a); // <-- that's the maths you need
  var py = y + r * Math.sin(a);

  document.querySelector(".circle-test").style.left = px + "px";
  document.querySelector(".circle-test").style.top = py + "px";
  if (zerosCoordinates.length != 0) {
    if (Math.round(a) == 0) {
      standardization = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
    }
    console.log(zerosCoordinates[0][1]);
    console.log(py);
    filter.push(
      Math.sqrt(
        (px - zerosCoordinates[0][0]) ** 2 + (py - zerosCoordinates[0][1]) ** 2
      ) / standardization
    );
  }
  if (-a - Math.PI > -0.001) {
    clearInterval(circleMove);
    console.log(filter);
  }
}
