;
var layout = function(title){
     return {
         title: title,
         showlegend: false,
         height: 400,
         width: 600
     }
};

Object.prototype.draw = function(){

    if (this[0] == undefined){
        return;
    }

    switch (this[0].constructor.name){
        case "Number":
            var canvas = document.createElement("div");
            canvas.id="numberDiv";
  	        document.getElementsByTagName("body")[0].appendChild(canvas);

            var data = [];
            var labels = [];
            this.forEach(function(entry){
               labels[entry-1] = entry + "";
               data[entry-1] = data[entry-1] == undefined ? 1 : data[entry-1] + 1;
            })
            var chartData={
                x: labels,
                y: data,
                type: 'bar'
            }
            Plotly.newPlot('numberDiv', [chartData], layout("Numeric bar"));
            break;
        case "String":
            var canvas = document.createElement("div");
            canvas.id="stringDiv";
  	        document.getElementsByTagName("body")[0].appendChild(canvas);

            var data = [];
            var labels = [];
            this.forEach(function(entry){
               if (labels.indexOf(entry) == -1){
                   labels.push(entry);
                   data.push(1);
               } else {
                  data[labels.indexOf(entry)] = data[labels.indexOf(entry)] + 1;
               }
            })
            var chartData={
                x: labels,
                y: data,
                type: 'bar'
            }
            Plotly.newPlot('stringDiv', [chartData], layout("String values"));
            break;
        case "Object":
            if (this[0].x != undefined){
                var canvas = document.createElement("div");
                canvas.id="scatterDiv";
  	            document.getElementsByTagName("body")[0].appendChild(canvas);

  	            var data = [];
                var labels = [];
                var sizes = [];
                this.forEach(function(entry){
                   labels.push(entry.x);
                   data.push(entry.y);
                   sizes.push(entry.r);
                })
                var chartData={
                    x: labels,
                    y: data,
                    mode: 'markers',
                    marker: {
                        size: sizes
                    }
                }
                Plotly.newPlot('scatterDiv', [chartData], layout("Scatter plot"));
            }
            break;
        case "Array":;
            var barData=[];
            var data = [];
            var labels = [];
            var sizes = [];
            this.forEach(function(entry){

            }
            console.log("Array");
            break;
    }
    console.log(this);
};