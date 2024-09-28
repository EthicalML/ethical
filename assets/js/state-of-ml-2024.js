import 'https://code.jquery.com/jquery-3.6.0.min.js'

const chartStyles = [
	// 1
	"bar", // libraries
	"bar", // modality
	"pie", // usecase
	"radar", // timetoprod
	"doughnut", // cloud
	"pie", // challenges
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
	"pie", // company
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

let dt = await aq.loadCSV('data.csv'); 

const origColNames = dt.columnNames().slice(1, -2);
const multiChoiceCols = [1, 2, 5, 20, 22];
const COL_WIDTH="20em";
const LONG_COL_WIDTH="40em";

let colWidths = Array(origColNames.length).fill(COL_WIDTH);
for (const i of multiChoiceCols) {
    console.log(i);
    colWidths[i] = LONG_COL_WIDTH;
}
console.log(colWidths)

// Drop first and last columns
dt = dt.select(...origColNames);
//// Rename columns
//dt = dt.select(aq.names(...colNames));
//// Drop columns
//dt = dt.select(...colNames.slice(1));


// Register chartjs plugins
//Chart.register(ColorSchemesPlugin);
Chart.register(ChartDataLabels);

const themes = ["brewer.YlGnBu9", "brewer.GnBu9", "brewer.GnBu9", "brewer.PuBuGn9", "brewer.PuBu9", "brewer.BuPu9", "brewer.RdPu9", "brewer.PuRd9", "brewer.OrRd9", "brewer.YlOrRd9", "brewer.YlOrBr9"];
const chartSections = [5, 14, 22];

Chart.defaults.color = '#fff';
Chart.defaults.borderColor = '#434659';

// Global charts object
var charts = [];

for (let i = 0, j = 0; i < origColNames.length; i++) {
	
	const chartContainer = $("<div></div>");
	chartContainer.append("<div style='color: rgb(68, 254, 227) !important; height: 80px; overflow: scroll' class='text-center d-flex align-items-center'>"+origColNames[i]+"</div>")

	// Choose the right section based on the distributions
	if (i > chartSections[j]) {
		j++;
	}

	// Select the row object inside the respective section ID
	const chartTab = $("#chart-section-"+(j+1)+" .row");
    chartTab.append(chartContainer);

	if (multiChoiceCols.includes(i)) {
        chartContainer.append("<div id='inpChart"+i+"' class='form-check form-switch'></div>")
	}
	else {
        chartContainer.append("<div id='slcChart"+i+"' class='form-check form-switch'></div>")
	}

	chartContainer.addClass("col-md-5");

	const chartCanvas = $("<canvas style='height: 300em' id='chart-"+i+"'></canvas>");
	chartContainer.append(chartCanvas)

    //const chartType = multiChoiceCols.includes(i) ? "bar"  : "bar";

    const chart = new Chart($("#chart-"+i), {
      type: chartStyles[i],
      options: {
		indexAxis: 'y',
		responsive: true,
		maintainAspectRatio: true,
		aspectRatio: 1.2,
        plugins: {
			colorschemes: {
				scheme: themes[i % themes.length-1]
			},
            colors: {
                forceOverride: true
            }
        }
      }
    });

    charts.push(chart);
}

$('#table').html(dt.toHTML()).children().attr('id', 'demo').ready(function() { loadTable() });

function tableAddBootstrapClasses() {
    $("#table table").addClass("table table-striped-columns table-bordered table-sm table-hover align-middle");
}

function filtersAddBootstrapClasses() {
    $("input[type='checkbox']").addClass("form-check-input");
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

        col_widths: colWidths,

        /* sorting feature */
        extensions: [{ name: 'sort' }],

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
    console.log(customFilterIds)


    var tf = new TableFilter('demo', tfConfig);

    tf.emitter.on([
        'after-filtering',
        "after-clearing-filters",
        "initialized"
        ], afterFilter(tf));

    tf.init();

    filtersAddBootstrapClasses();

}

function afterFilter(tf) {
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
                        if (multiValue in chartData[j]) {
                            chartData[j][multiValue] += 1;
                        } else {
                            chartData[j][multiValue] = 1;
                        }
                    }
                }
                else {
                    if (row[j] in chartData[j]) {
                        chartData[j][row[j]] += 1;
                    } else {
                        chartData[j][row[j]] = 1;
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

function updateChart(chart, labels, data) {
    // TODO: Hide charts that don't have any data
    chart.data = {
        labels: labels,
        datasets: [{
          data: data
        }]
    }
    chart.update()
}

