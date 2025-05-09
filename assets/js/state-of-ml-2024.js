import 'https://code.jquery.com/jquery-3.6.0.min.js'

const chartStyles = [
	// 1
	"bar", // libraries
	"bar", // modality
	"pie", // usecase
	"polarArea", // timetoprod
	"pie", // cloud
	"doughnut", // challenges
	// 2)
	"bar", // registry
	"bar", // feature store
	"bar", // vector
	"bar", // etl
	"bar", // training
	"bar", // serving
	"bar", // monitoring
	"bar", // data
	"bar", // llm
	// 3)
	"bar", // industry
	"radar", // orgsize
//	"pie", // company REMOVED 
	"radar", // modelsnow
	"radar", // modelsfuture
	"polarArea", // orgsetup
	"polarArea", // inference
	"bar", // infra
	// 4)
	"bar", // jf
	"bar", // role
	"bar", // age
	"pie", // country
	"bar", // identify
];

// Using arquero as initial implementation was performing filtering directly
// However now we use TableFilter to do all of this for us, and arquero is 
// only used to populate the initial table
// TODO: Remove dependency and instead load initial data/table directly
let dt = await aq.loadCSV('data.csv'); 

const origColNames = dt.columnNames().slice(1, -3); // Cutting timestamp, company, score, etc
const multiChoiceCols = [1, 2, 5, 19, 21];
const COL_WIDTH="20em";
const LONG_COL_WIDTH="40em";

let colWidths = Array(origColNames.length).fill(COL_WIDTH);
for (const i of multiChoiceCols) {
    colWidths[i] = LONG_COL_WIDTH;
}

// Drop first and last columns
dt = dt.select(...origColNames);

// Register chartjs plugins (needs uncomment on the chartjs 3.9.x)
Chart.register(ColorSchemesPlugin);
Chart.register(ChartDataLabels);

const themes = ["brewer.YlGnBu9", "brewer.GnBu9", "brewer.GnBu9", "brewer.PuBuGn9", "brewer.PuBu9", "brewer.BuPu9", "brewer.RdPu9", "brewer.PuRd9", "brewer.OrRd9", "brewer.YlOrRd9", "brewer.YlOrBr9"];
const chartSections = [5, 14, 22];

Chart.defaults.color = '#fff';
Chart.defaults.borderColor = '#22242f';
Chart.defaults.scales.radialLinear.ticks.backdropColor = '#000';

// Global charts object
var charts = [];

for (let i = 0, j = 0; i < origColNames.length; i++) {
	
    // TODO: Move these to single row for titles, charts and filters for correct sizes
	const chartContainer = $("<div class='chart-container'></div>");
    chartContainer.append("<div class='text-center chart-question-title'>"+origColNames[i]+"</div>")

	// Choose the right section based on the distributions
	if (i > chartSections[j]) {
		j++;
	}

	// Select the row object inside the respective section ID
	const chartTab = $("#chart-section-"+(j+1)+" .row");
    chartTab.append(chartContainer);

	const chartCanvas = $("<canvas class='chart-canvas' id='chart-"+i+"'></canvas>");
	chartContainer.append(chartCanvas)

	if (multiChoiceCols.includes(i)) {
        chartContainer.append("<div id='inpChart"+i+"' class='form-check form-switch form-text-container'></div>")
	}
	else {
        chartContainer.append("<div id='slcChart"+i+"' class='form-check form-switch form-extend-on-hover'></div>")
	}
    chartContainer.addClass("col-lg-8 col-11 p-0 px-md-5");

    let config = {
        type: chartStyles[i],
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.2,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
                            //calculate the total of this data set
                            const total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                              return previousValue + currentValue;
                            });
                            //get the current items value
                            const currentValue = dataset.data[tooltipItem.dataIndex];
                            //calculate the precentage based on the total and current item
                            //also this does a rough rounding to give a whole number
                            const percentage = parseInt(((currentValue/total) * 100));

                            return percentage + "%";
                        }
                    }
                },
                colors: {
                    forceOverride: false
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                datalabels: {
                    // Ensure all data is highlighted in %
                    formatter: ((chartStyle) => { 
                        return (value, ctx) => {
                            let sum = 0;
                            const dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            const percentage = parseInt(value*100 / sum);
                            let percentageStr = percentage+"%";

                            if (chartStyle == "pie" && window.innerWidth > 735 && window.innerHeight > 600) {
                                let label = ctx.chart.data.labels[ctx.dataIndex];
                                switch (label) {
                                    case "Amazon Web Services": label = "AWS"; break;
                                    case "Google Cloud Platform": label = "GCP"; break;
                                    case "Recommender systems": label = "RecSys"; break;
                                    case "Demand Forecasting": label = "Demand FC"; break;
                                    case "United Kingdom": label = "UK"; break;
                                }
                                console.log(label);
                                if (label.length >= 15) {
                                    label = label.slice(0, 15) + "..."
                                }
                                percentageStr = label + ": " + percentageStr;
                            }

                            // We don't add label if lower than 3% as too small area
                            if (percentage < 3)	{
                                percentageStr = "";
                            }
                            return percentageStr;
                        }
					})(chartStyles[i]),
                    color: '#fff',
                }
            }
        }
    };

    // Remove labels for bar charts as these are the dataset level
    if (chartStyles[i] == "bar" || chartStyles[i] == "radar") {
        config.options.plugins.legend.display = false;
    }

    const chart = new Chart($("#chart-"+i), config);

    charts.push(chart);
}

$('#table').html(dt.toHTML()).children().attr('id', 'demo').ready(function() { loadTable() });

function tableAddBootstrapClasses() {
    $("#table table").addClass("table table-striped-columns table-bordered table-sm table-hover align-middle");
}

function setupFilterBootstrapAndConfig() {
    $("input[type='checkbox']").addClass("form-check-input");
    $("input[type='text']").prop("placeholder", "Filter on Multiple Option Question...")
}

function addClearFilterEvent() {
    // The events have to be added when the tab content is loaded so uing "on"
    $(".charts-container").on("change", ".form-check ul li:first input:checkbox", (obj) => {
            if ($(obj.target).is(':checked')) {
                $(obj.target).prop("checked", false);
            }
        }
    );
}

function loadTable() {
	
	tableAddBootstrapClasses();

    var tfConfig = {
        //base_path: 'https://unpkg.com/tablefilter@0.7.2/dist/tablefilter/',
        // TODO: Add base path with blank css to ermove errors
        alternate_rows: true,
        rows_selected: {
            text: 'Displayed rows: '
        },
        loader: true,
        status: true,
        status_bar: true,

        clear_filter_text: Array(origColNames.length).fill("<Clear Filter>"),

        col_widths: colWidths,

        /* sorting feature */
        extensions: [],

        /** Bootstrap integration */

        // aligns filter at cell bottom when Bootstrap is enabled
        filters_cell_tag: 'th',

        // allows Bootstrap table styling
        themes: [{
            name: 'transparent'
        }]

    };

    // Adding column filters
    let customFilterIds = [];
    for (let i = 0; i < origColNames.length; i++) {
        if (multiChoiceCols.includes(i)) {
            customFilterIds.push("inpChart" + i);
            tfConfig["col_" + i] = "input";
        }
        else {
            customFilterIds.push("slcChart" + i);
            tfConfig["col_" + i] = "checklist";
        }
    }
    tfConfig["external_flt_ids"] = customFilterIds;


    var tf = new TableFilter('demo', tfConfig);

    tf.emitter.on([
        'after-filtering',
        "after-clearing-filters",
        "initialized"
        ], reComputeChartData(tf));

    tf.init();

    setupFilterBootstrapAndConfig();
    addClearFilterEvent();

}

function reComputeChartData(tf) {
	return function () {
		const data = tf.getFilteredData();
        window.data = data;
        let chartData = [];
        for (let i = 0; i < origColNames.length; i++) {
            chartData.push({});
        }
        for (let i = 0; i < data.length; i++) {
            let row = data[i][1];
            for (let j = 0; j < origColNames.length; j++) {
                // Split the multi choice options
                if (multiChoiceCols.includes(j)) {
                    let multiValues = row[j].split(",");
                    for (let k = 0; k < multiValues.length; k++) {
						let multiValue = multiValues[k].trim()
                        if (multiValue == "null") {
                            continue;
                        }

                        if (multiValue in chartData[j]) {
                            chartData[j][multiValue] += 1;
                        } else {
                            chartData[j][multiValue] = 1;
                        }
                    }
                }
                else {
                    let rowVal = row[j];
                    if (rowVal == "null") {
                        // ensure only skip if not part of platform choice quesitons
                        if (j > 5 && j < 15) {
                            rowVal = "None";
                        } else {
                            continue;
                        }
                    }

                    if (rowVal in chartData[j]) {
                        chartData[j][rowVal] += 1;
                    } else {
                        chartData[j][rowVal] = 1;
                    }
                }
            }
        }
        window.chartData = chartData;
        for (let chartIndex = 0; chartIndex < chartData.length; chartIndex++) {
            updateChart(charts[chartIndex], Object.keys(chartData[chartIndex]), Object.values(chartData[chartIndex]))
        }
	}

}


let CHART_COLORS = [
    '#36a2eb', // light blue
    '#ff6384', // light red
    '#10c79b', // light green
    '#ff6900', // Dark orange
    '#585a60', // Dark grey

    '#2E5EAA', // dark blue
    "#9E0059", // dark intense red
    "#4C6663", // pale green
    "#FFB100", // intense yellow
    "#39393A", // yet grey


    "#390099", // duke blue
    '#69353F', // pale dark red
    "#1F271B" // dark green
];

function sortLabelsData(labels, data) {
    let arrayOfObj = labels.map(function(d, i) {
      return {
        label: d,
        data: data[i] || 0
      };
    });

    let sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
        return b.data - a.data;
    });

    let newArrayLabel = [];
    let newArrayData = [];

    sortedArrayOfObj.forEach(function(d){
      newArrayLabel.push(d.label);
      newArrayData.push(d.data);
    });

    return [newArrayLabel, newArrayData];
}

function updateChart(chart, labels, data) {
    [labels, data] = sortLabelsData(labels, data);

    // TODO: Hide charts that don't have any data
    chart.data = {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: CHART_COLORS
        }]
    }
    chart.update()
}

