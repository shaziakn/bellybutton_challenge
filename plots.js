function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value");
      buildMetadata(sampleNames[0]);
      buildCharts(sampleNames[0]);
      });
  })}
  
  init();

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var result = metadata.filter(sampleObj => sampleObj.id.toString() === sample)[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");

      Object.entries(result).forEach((key) => {   
        PANEL.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n"); 
      });
    });
  }




function buildCharts(sample) {
  
    d3.json("samples.json").then(data => {
    // Build Bar Graph
    console.log(data.samples[0])
    var topTen = data.samples[0]['sample_values'].slice(0, 10).reverse()
        var barData = [{
            x: topTen,
            y: data.samples[0]['otu_ids'].slice(0, 10).reverse().map(d => "OTU " + d),
            type: 'bar',
            orientation: 'h'
        }];
        
        var layout = {
            title: "Top Ten OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "Bacterial Species"
        }};
        Plotly.newPlot('bar', barData, layout);

});

    d3.json("samples.json").then(data => {
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
    Plotly.newPlot('bubble', bubble, layoutBubble);
});
}



function optionChanged(sample) {
  console.log(sample)
  buildMetadata(sample);
  buildCharts(sample);
}

