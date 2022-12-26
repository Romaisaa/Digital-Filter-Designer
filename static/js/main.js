var zeros, poles;
var zerosCoordinates = [];
var polesCoordinates = [];

var realZeros = [];
var realPoles = [];

var dragMode = false;

var selectedPoint;
let importBtn = document.querySelector(".import-btn");
let filterData = document.getElementById("filter_data");
let controls = document.querySelector(".controls");
let zContainer = document.querySelector(".z-container");
let exportBtn = document.querySelector(".export-btn");
zContainer.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("zero") &&
    !e.target.classList.contains("pole")
  ) {
    addZeros(e);
  }
});
importBtn.addEventListener("click", (e) => {
  document.getElementById("filterData").click();
});

document.getElementById("filterData").addEventListener("change", (e) => {
  try {
    let files = e.target.files;
    if (!files.length) {
      alert("No file selected!");
      return;
    }
    let file = files[0];
    let reader = new FileReader();
    let data;
    reader.onload = (event) => {
      data = JSON.parse(event.target.result);
      zeros = data["zeros"];
      poles = data["poles"];

      console.log(zeros);
      console.log(poles);

      for (let zero of zeros) {
        draw_point(zero.x, zero.y, "Zeros");
      }
      for (let pole of poles) {
        draw_point(pole.x, pole.y, "Poles");
      }
    };

    reader.readAsText(file);
  } catch (err) {
    console.error(err);
  }
});

exportBtn.addEventListener("click", (e) => {
  console.log("here");
  var a = document.createElement("a");
  let content = {
    zeros: realZeros,
    poles: realPoles,
  };
  var file = new Blob([JSON.stringify(content)], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = "filter.json";
  a.click();
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
  }
});

//*************************** functions ***************************//
var circleMove;
var xPoint, yPoint;
function addZeros(e) {
  clearInterval(circleMove);

  draw_point(e.pageX, e.pageY, mode);
}

function draw_point(x, y, mode) {
  var xPoint = x - 30;
  var yPoint = y - importBtn.clientHeight - controls.clientHeight - 70;

  let zero = document.createElement("div");
  zero.style.position = "absolute";
  zero.style.left = xPoint + "px";
  zero.style.top = yPoint + "px";

  let point = {
    x: (xPoint - zContainer.clientWidth / 2) / r,
    y: (zContainer.clientHeight / 2 - yPoint) / r,
  };

  if (mode == "Zeros") {
    zero.className = "item zero";
    zerosCoordinates.push(point);
    realZeros.push({
      x: x,
      y: y,
    });
  } else if (mode == "Poles") {
    zero.className = "item pole";
    polesCoordinates.push(point);
    realPoles.push({
      x: x,
      y: y,
    });
  }
  zContainer.append(zero);
  change_filter();
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

    selectedPoint = calculateCoordinates(startPosX, startPosY);

    document.addEventListener("mousemove", mouseMove);

    document.addEventListener("mouseup", function (e) {
      e.target.classList.remove("drag");

      if (selectedPoint && dragMode) {
        update_points(selectedPoint, e.pageX, e.pageY, "drag");
      }
      if (dragMode) {
        selectedPoint = null;
      }

      document.removeEventListener("mousemove", mouseMove);
    });
  }
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
  e.preventDefault();
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
  update_points(selectedPoint, 0, 0, "convert");
  selectedPoint = null;
  dragMode = false;
});

let deletebtn = document.querySelector(".delete");
deletebtn.addEventListener("click", (e) => {
  document.querySelector(".selected").remove();
  update_points(selectedPoint, 0, 0, "delete");
  selectedPoint = null;
  dragMode = false;
});

////////////////////////////////////////////////
let body = document.querySelector("body");
let zGraph = document.querySelector(".z-graph");
var filter = [];
document.querySelector(".test").style.left = zContainer.clientWidth / 2 + "px";
document.querySelector(".test").style.top = zContainer.clientHeight / 2 + "px";
var x = (zContainer.clientWidth * 0.9) / 2;
var y = (zContainer.clientHeight * 0.9) / 2;
var r = (zContainer.clientWidth * 0.9) / 2;
var a = 0;
// function rotate(a) {
//   var px = x + r * Math.cos(a); // <-- that's the maths you need
//   var py = y + r * Math.sin(a);

//   document.querySelector(".circle-test").style.left = px + "px";
//   document.querySelector(".circle-test").style.top = py + "px";
//   if (zerosCoordinates.length != 0) {
//     if (Math.round(a) == 0) {
//       standardization = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
//     }

//     filter.push(
//       Math.sqrt(
//         (px - zerosCoordinates[0][0]) ** 2 + (py - zerosCoordinates[0][1]) ** 2
//       ) / standardization
//     );
//   }
//   if (-a - Math.PI > -0.001) {
//     clearInterval(circleMove);
//   }
// }

/////////////////////////////////////
const generateSignalButton = document.getElementById("generate-sig");
const importSignalButton = document.getElementById("import-sig");

generateSignalButton.addEventListener("click", () => {
  generateMode = true;
  document
    .getElementsByClassName("generate-sig")[0]
    .classList.remove("hide-element");
  document
    .getElementsByClassName("upload-form")[0]
    .classList.add("hide-element");
});

importSignalButton.addEventListener("click", () => {
  document
    .getElementsByClassName("generate-sig")[0]
    .classList.add("hide-element");
  document
    .getElementsByClassName("upload-form")[0]
    .classList.remove("hide-element");
});

//////////////////////////////////////////////////////
let sigModes = document.getElementsByClassName("sig-mode");
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("sig-mode")) {
    for (i = 0; i < sigModes.length; i++) {
      sigModes[i].classList.remove("active-sig-mode");
    }
    e.target.classList.add("active-sig-mode");
  }
});

function calculateCoordinates(xPosition, yPosition) {
  return {
    x: (xPosition - 30 - zContainer.clientWidth / 2) / r,
    y:
      (zContainer.clientHeight / 2 -
        (yPosition - importBtn.clientHeight - controls.clientHeight - 70)) /
      r,
  };
}

function update_points(oldPositions, pageX, pageY, operation) {
  newPositions = calculateCoordinates(pageX, pageY);
  for (let i = 0; i < zerosCoordinates.length; i++) {
    if (
      Math.abs(zerosCoordinates[i].x - oldPositions.x) < 0.05 &&
      Math.abs(zerosCoordinates[i].y - oldPositions.y) < 0.05
    ) {
      if (operation == "drag") {
        zerosCoordinates[i] = newPositions;
        realPoles[i] = { x: pageX, y: pageY };
      } else if (operation == "convert") {
        polesCoordinates.push(zerosCoordinates[i]);
        realPoles.push(realZeros[i]);

        zerosCoordinates.splice(i, 1);
        realZeros.splice(i, 1);
      } else {
        zerosCoordinates.splice(i, 1);
        realZeros.splice(i, 1);
      }
      change_filter();
      return;
    }
  }

  for (let i = 0; i < polesCoordinates.length; i++) {
    if (
      Math.abs(polesCoordinates[i].x - oldPositions.x) < 0.05 &&
      Math.abs(polesCoordinates[i].y - oldPositions.y) < 0.05
    ) {
      if (operation == "drag") {
        polesCoordinates[i] = newPositions;
        realZeros[i] = { x: pageX, y: pageY };
      } else if (operation == "convert") {
        zerosCoordinates.push(polesCoordinates[i]);
        realZeros.push(realPoles[i]);

        polesCoordinates.splice(i, 1);
        realPoles.splice(i, 1);
      } else {
        polesCoordinates.splice(i, 1);
        realPoles.splice(i, 1);
      }
      change_filter();
      return;
    }
  }
}
