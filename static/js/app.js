// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    console.log(data);
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let id_array = metadata.filter(id_object => id_object.id == sample);
    let id_one = id_array[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for(key in id_one){
      panel.append("h6").text(`${key.toUpperCase()}: ${id_one[key]}`);
    };
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let id_sample = samples.filter(id_object => id_object.id == sample);
    let id_one = id_sample[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = id_one.otu_ids;
    let otu_labels = id_one.otu_labels;
    let sample_values = id_one.sample_values;

    // Build a Bubble Chart
    let layoutBubble = {
      title: "Bacteria Cultures Per Samples",
      xaxis:{title: "OTU ID"},
      yaxis:{title: "Number of Bacteria"},
    };
    let dataBubble = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers", 
      marker: {
        size: sample_values,
        color: otu_ids,
      }
    }];

    // Render the Bubble Chart
    Plotly.newPlot("bubble", dataBubble, layoutBubble);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(otuID => `OTU ${otuID} `);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => { 

    // Get the names field
    let sample_values = data.names;
    

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options    
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < sample_values.length; i++){
      dropdown.append("option").text(sample_values[i]).property("value", sample_values[i]);
    };

    // Get the first sample from the list
    let sample_one = sample_values[0];

    // Build charts and metadata panel with the first sample
    buildCharts(sample_one);
    buildMetadata(sample_one);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
