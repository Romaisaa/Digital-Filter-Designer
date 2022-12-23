inputSignal = [];
outputSignal = [];
importedSignal = [];
generateMode = true;
generateIndex = 0;

const signalPad = document.getElementById("generate-sig-pad");
signalPad.addEventListener("mousemove", (event) => {
  event.preventDefault();
  get_signal_data(event.pageY);
});

const uploadSignal = document.getElementById("file-upload");
uploadSignal.addEventListener("change", (event) => {
  event.preventDefault();
  read_csv();
});

function read_csv() {
  var formData = new FormData($(`#upload-form`)[0]);
  console.log(formData);
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
  console.log(point);
  if (inputSignal.length < 100) {
    inputSignal.push(point);
  } else {
    inputSignal.shift();
    inputSignal.push(point);
  }
  get_z_transform();
  draw_signals();
}

setInterval(() => {
  if (!generateMode) {
    get_signal_data(importedSignal[generateIndex]);
    generateIndex = (generateIndex + 1) % importedSignal.length;
  }
}, 50);
