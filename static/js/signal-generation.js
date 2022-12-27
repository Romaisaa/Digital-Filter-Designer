inputSignal = [];
outputSignal = [];
importedSignal = [];
generateMode = true;
generateIndex = 0;
let counter = 0;

const signalPad = document.getElementById("generate-sig-pad");
signalPad.addEventListener("mousemove", (event) => {
  event.preventDefault();
  get_signal_data(event.pageX);

  counter++;
});

const uploadSignal = document.getElementById("file-upload");
uploadSignal.addEventListener("change", (event) => {
  event.preventDefault();
  read_csv();
});

function read_csv() {
  var formData = new FormData($(`#upload-form`)[0]);
  $.ajax({
    type: "POST",
    url: `/import-csv`,
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (res) {
      importedSignal = res.data;
      generateMode = false;
    },
  });
}

function get_signal_data(point) {
  if (inputSignal.length < 100) {
    inputSignal.push(point);
  } else {
    inputSignal.shift();
    inputSignal.push(point);
  }

  if (zerosCoordinates.length == 0 && polesCoordinates == 0)
    outputSignal = inputSignal;
  else apply_filter(inputSignal);

  draw_signals();
}

setInterval(() => {
  if (!generateMode) {
    get_signal_data(importedSignal[generateIndex]);
    generateIndex = (generateIndex + 1) % importedSignal.length;
  }
}, 50);

function apply_filter(input_signal) {
  $.ajax({
    type: "POST",
    url: `http://127.0.0.1:5000/apply-filter`,
    data: JSON.stringify({
      input_signal: input_signal,
    }),
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (res) {
      outputSignal = res.filtered_signal;
    },
  });
}
