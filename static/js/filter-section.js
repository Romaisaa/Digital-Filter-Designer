function change_filter() {
  $.ajax({
    type: "POST",
    url: `http://127.0.0.1:5000/filter`,
    data: JSON.stringify({
      zeros: zerosCoordinates,
      poles: polesCoordinates,
      a_coef: a_coef,
    }),
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (res) {
      var graph1Trace = {
        x: res.magnitude.x,
        y: res.magnitude.y,
        marker: { color: "#00051e" },
        mode: "lines",
      };
      var graph2Trace = {
        x: res.phase.x,
        y: res.phase.y,
        marker: { color: "#00051e" },
        mode: "lines",
      };

      Plotly.newPlot("fig-mag", [graph1Trace]);
      Plotly.newPlot("fig-phase", [graph2Trace]);
      Plotly.newPlot("original-phase", [graph2Trace]);
    },
  });
}

// function difference_equation(num_coeff, den_coeff) {
//   numeratorCoeff = [];
//   denominatorCoeff = [];

//   for (let i = 0; i < num_coeff.abs.length; i++) {
//     numeratorCoeff.push(
//       math.Complex.fromPolar({
//         r: num_coeff.abs[i],
//         phi: num_coeff.angle[i],
//       })
//     );
//   }

//   for (let i = 0; i < den_coeff.abs.length; i++) {
//     denominatorCoeff.push(
//       math.Complex.fromPolar({
//         r: den_coeff.abs[i],
//         phi: den_coeff.angle[i],
//       })
//     );
//   }
// }

// function get_coeff() {
//   return [numeratorCoeff, denominatorCoeff];
// }
