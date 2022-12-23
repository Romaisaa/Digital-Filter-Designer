inputSignal = [];
outputSignal = [];

const signalPad = document.getElementById("generate-sig-pad");
signalPad.addEventListener("mousemove", (event) => {
  event.preventDefault();
  let mouseY = event.pageY;
  if (inputSignal.length < 100) {
    inputSignal.push(mouseY);
  } else {
    inputSignal.shift();
    inputSignal.push(mouseY);
  }
  get_z_transform();
  draw_signals();
});
