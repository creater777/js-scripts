;
var
$import = function(src){
    var e = document.createElement("script");
    e.src = src;
    e.type="text/javascript";
    document.getElementsByTagName("head")[0].appendChild(e);
};

var chartData = function(labels, data, color){
    return {
		labels : labels,
		datasets : [
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill: "rgba(151,187,205,0.7)",
				highlightStroke: "rgba(151,187,205,1)",
				data : data
			}
		]

	}
}

Array.prototype.draw = function(){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
  	document.getElementsByTagName("body")[0].appendChild(canvas);

    switch (this[0].constructor.name){
        case "Number":
            var data = [];
            var labels = [];
            this.forEach(function(entry){
               labels[entry-1] = entry + "";
               data[entry-1] = data[entry-1] == undefined ? 1 : data[entry-1] + 1;
            })
        	window.myBar = new Chart(ctx).Bar(chartData(labels,data,100), {
      	    	responsive : true
           	});
            break;
        case "String":
            break;
        case "Object":;
            console.log("Object");
            break;
        case "Array":;
            console.log("Array");
            break;
    }
    console.log(this);
};