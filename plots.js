function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(result.id);
      PANEL.append("h6").text(result.ethnicity);
      PANEL.append("h6").text(result.gender);
      PANEL.append("h6").text(result.age);
      PANEL.append("h6").text(result.location);
      PANEL.append("h6").text(result.bbtype);
      PANEL.append("h6").text(result.wfreq);
    });
  }




function buildCharts(sample, otu) {
    d3.json("samples.json").then((data) => {
    // Build Bar Graph
    console.log(data.samples[0])
        var barData = [{
            x: data.samples[0]['sample_values'].slice(0, 10),
            y: data.samples[0]['otu_ids'].slice(0, 10),
            type: 'bar',
            orientation: 'h'
        }];
        var layout = {
            title: "Top Ten OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "Bacterial Species"
        }};
        Plotly.plot('bar', barData, layout);

});

    d3.json("samples.json").then((data) => {
    // Build Bubble Chart
    var layoutBubble = {
        margin: { t: 0 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' }
    };
    var bubble = [{
        x: data.samples[0]['otu_ids'],
        y: data.samples[0]['sample_values'],
        mode: 'markers',
        marker: {
            size: data.samples[0]['sample_values'],
            color: data.samples[0]['otu_ids'],
            colorscale: "Earth"
        }
    }];

    Plotly.plot('bubble', bubble, layoutBubble);
});
}



function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}