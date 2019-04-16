var lineChartData = {
  labels: [
    "2014",
    "2015",
    "2016",
    "2017"
  ],

  datasets: [

    {
      label: "Prescribed Medication",
      backgroundColor: "rgba(61,61,61,0.5)",
      borderColor: "#3d3d3d",
      borderWidth: 2,
			pointHoverRadius: 6,
      data: [9951, 9580, 9357,9812]
    },
    {
      label: "Received Treatment",
      backgroundColor: "rgba(108,141,163,0.5)",
      borderColor: "#6C8DA3",
      borderWidth: 2,
			pointHoverRadius: 6,
      data: [12190,11945, 11632,12462]
    }

  ]
};

var chartOptions = {
  responsive: true,
  legend: {
    position: "top",
		fontColor: "#3d3d3d",
		labels: {
			fontColor:'#3d3d3d' ,
			fontFamily:'Nunito Sans'
		}
  },
  title: {
    display: false,
    text: "Line Chart"
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

window.onload = function() {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myLine = new Chart(ctx, {
    type: "line",
    data: lineChartData,
    options: chartOptions
  });
};
