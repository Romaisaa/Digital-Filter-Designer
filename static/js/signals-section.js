var graph1Trace = {
  y: inputSignal,
  marker: { color: "#00051e" },
  mode: "lines",
};
var graph2Trace = {
  y: outputSignal,
  marker: { color: "#00051e" },
  mode: "lines",
};
let cnt = 0;
Plotly.newPlot("input-sig", [graph1Trace], get_signal_graph_layout());
Plotly.newPlot("output-sig", [graph2Trace], get_signal_graph_layout());

function get_z_transform() {
  $.ajax({
    type: "POST",
    url: `/get_z_transform`,
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (res) {
      if (outputSignal.length < 100) {
        outputSignal.push(res.point);
      } else {
        outputSignal.shift();
        outputSignal.push(res.point);
      }
    },
  });
}

function draw_signals() {
  Plotly.extendTraces("input-sig", { y: [inputSignal] }, [0]);
  Plotly.extendTraces("output-sig", { y: [outputSignal] }, [0]);

  cnt++;
  let xMove = {
    xaxis: {
      range: [cnt - 100, cnt],
    },
  };
  console.log(cnt);

  if (cnt > 100) {
    Plotly.relayout("input-sig", xMove);
    Plotly.relayout("output-sig", xMove);
  }
}

function get_signal_graph_layout() {
  return {
    width: 500,
    height: 300,
    xaxis: {
      title: {
        text: "time",
        font: {
          family: "Roboto",
          size: 14,
          color: "#000522e0",
        },
      },
      range: [0, 100],
    },
    yaxis: {
      title: {
        text: "Amplitude",
        font: {
          family: "Roboto",
          size: 14,
          color: "#000522e0",
        },
      },
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
  };
}
