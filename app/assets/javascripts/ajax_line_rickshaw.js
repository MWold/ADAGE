
$(document).ready(function () {

  
  
  var xAxis, yAxis, legend;
  var graph = new Rickshaw.Graph.Ajax( {
    element: document.getElementById("chart"),
    width: 1000,
    height: 500,
    renderer: 'line',
    dataURL: url,

    onData: function(d) {
  	  Rickshaw.Series.zeroFill(d);
  	  return d;
  	},
  	onComplete: function(transport) {
  	  var graph = transport.graph;
      
      if(!yAxis)
      {
        yAxis = new Rickshaw.Graph.Axis.Y({
          graph: graph,
        });
        yAxis.render();
      }

      if(!xAxis)
      {
        var local =  new Rickshaw.Fixtures.Time();
        var format = function(d) {
          d = new Date(d)
          return d3.time.format("%b %e %I:%M")(d)
        }
        xAxis = new Rickshaw.Graph.Axis.X( { 
          graph: graph,
          orientation: 'top',
          tickFormat: format
        } );
        xAxis.render();
      }

      if(!legend)
      {
        legend = new Rickshaw.Graph.Legend({
          graph: graph,
          element: document.getElementById('legend'),
        });
        legend.render();

        var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
        	graph: graph,
	        legend: legend
        } );

        var order = new Rickshaw.Graph.Behavior.Series.Order( {
	        graph: graph,
        	legend: legend
        } );

        var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight( {
          graph: graph,
  	      legend: legend
        } );
      }



    }

  } );

    
  refreshGraph();

  
  function refreshGraph() {
    graph.request();
    setTimeout(refreshGraph, 1000);

  }
  

 
});