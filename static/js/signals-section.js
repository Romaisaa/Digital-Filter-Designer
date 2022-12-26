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
Plotly.newPlot(
  "input-sig",
  [graph1Trace],
  get_signal_graph_layout("Input Signal", "", "Amplitude", [0, 100])
);
Plotly.newPlot(
  "output-sig",
  [graph2Trace],
  get_signal_graph_layout("Output Signal", "", "Amplitude", [0, 100])
);

function draw_signals() {
  Plotly.extendTraces("input-sig", { y: [inputSignal] }, [0]);
  Plotly.extendTraces("output-sig", { y: [outputSignal] }, [0]);

  cnt++;

  if (cnt > 100) {
    Plotly.relayout(
      "input-sig",
      get_signal_graph_layout("Input Signal", "", "Amplitude", [cnt - 100, cnt])
    );
    Plotly.relayout(
      "output-sig",
      get_signal_graph_layout("Output Signal", "", "Amplitude", [
        cnt - 100,
        cnt,
      ])
    );
  }
}

function get_signal_graph_layout(title, xTitle, yTitle, range) {
  return {
    width: 460,
    height: 180,
    margin: { l: 55, r: 30, t: 45, b: 20 },
    title: {
      text: title,
      font: {
        family: "Roboto",
        size: 20,
      },
    },
    xaxis: {
      showticklabels: false,
      title: {
        text: xTitle,
        font: {
          family: "Roboto",
          size: 14,
          color: "#000522e0",
        },
      },
      range: range,
    },
    yaxis: {
      title: {
        text: yTitle,
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
