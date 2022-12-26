function change_filter() {
  $.ajax({
    type: "POST",
    url: `http://127.0.0.1:5000/filter`,
    data: JSON.stringify({
      zeros: zerosCoordinates,
      poles: polesCoordinates,
      a_coeff: a_coef,
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
function preview_filter() {
  $.ajax({
    type: "POST",
    url: `http://127.0.0.1:5000/preview_a`,
    data: JSON.stringify({
      a_prev: a_preview,
    }),
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (res) {
      var graph1Trace = {
        x: res.x,
        y: res.y,
        marker: { color: "#00051e" },
        mode: "lines",
      };

      Plotly.newPlot("preview-phase", [graph1Trace]);
    },
  });
}
