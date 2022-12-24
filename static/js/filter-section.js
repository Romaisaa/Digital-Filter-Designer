function change_filter() {
  $.ajax({
    type: "POST",
    url: `http://127.0.0.1:5000/filter`,
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
    },
  });
}
