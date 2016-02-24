;
var
$import = function(src){
    var e = document.createElement("script");
    e.src = src;
    e.type="text/javascript";
    document.getElementsByTagName("head")[0].appendChild(e);
};

Object.prototype.draw = function(){
    console.log(this);
};

var chartData = function(labels, data, color){
    return {
		labels : [labels],
		datasets : [
			{
				fillColor : "rgba(" + color + ")",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
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
            case "String":
            	window.myBar = new Chart(ctx).Bar(chartData(this, this, 100), {
        	    	responsive : true
            	});
            	console.log("Number");
                console.log("String");
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