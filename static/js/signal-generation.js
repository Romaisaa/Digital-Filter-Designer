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

// function filter(n, x, y) {
//   coeff = get_coeff();
//   let filter_order = Math.max(coeff[1].length, coeff[0].length);

//   if (coeff[1].length != coeff[0].length)
//     coeff = equateLength(coeff[0], coeff[1]);
//   if (n < filter_order) return y[n];

//   let y_n = math.multiply(coeff[0][0], x[n]);
//   for (let m = 1; m < filter_order; m++) {
//     let diff = math.add(
//       math.multiply(coeff[0][m], x[n - m]),
//       math.multiply(coeff[1][m], -y[n - m])
//     );
//     y_n = math.add(y_n, diff);
//   }
//   return math.re(y_n);
// }

// function equateLength(a, b) {
//   max_length = Math.max(a.length, b.length);
//   for (let i = 0; i < max_length; i++) {
//     a[i] = i < a.length ? a[i] : 0;
//     b[i] = i < b.length ? b[i] : 0;
//   }
//   return [a, b];
// }
