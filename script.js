;
var layout = function(title){
     return {
         title: title,
         showlegend: false,
         height: 300,
         width: 400
     }
};

Object.prototype.draw = function(){

    if (this.constructor.name == "Object"){
        var canvas = document.createElement("div");
        canvas.id="lineDiv";
        canvas.style="float: left";
        document.getElementsByTagName("body")[0].appendChild(canvas);
        var labels = [];
        var data = [];
        for (entry in this){
            if (this[entry].constructor.name=="Array"){
                labels.push(entry);
                data.push(this[entry]);
            }
        }
        var lineData = [];
        var i = data[0].length;
        while (i--){
            var d = [];
            data.forEach(function(entry, j){
                d.push(data[j][i]);
            })
            lineData.push(d);
        }
        var barData = [];
        lineData.forEach(function(entry){
            barData.push({
                x: labels,
                y: entry,
                type: "line"
            })
        })
        Plotly.newPlot('lineDiv', barData, layout("Line chart"));
    }

    if (this[0] == undefined){
        return;
    }

    switch (this[0].constructor.name){
        case "Number":
            var canvas = document.createElement("div");
            canvas.id="numberDiv";
            canvas.style="float: left";
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
            canvas.style="float: left";
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
                canvas.style="float: left";
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
            var canvas = document.createElement("div");
            canvas.id="stackedDiv";
            canvas.style="float: left";
            document.getElementsByTagName("body")[0].appendChild(canvas);

            var barData=[];
            var data = [];
            var labels = [];

            this.forEach(function(entry){
                if (labels.indexOf(entry[0]) == -1){
                    labels.push(entry[0]);
                    for (var i = 1; i < entry.length; i++){
                        if (data[i - 1] == undefined)
                            data[i - 1] = [];
                        data[i - 1].push(entry[i]);
                    }
                } else{
                    var index = labels.indexOf(entry[0]);
                    for (var i = 1; i < entry.length; i++){
                        data[i-1][index] = data[i-1][index] + entry[i];
                    }
                }
            })
            data.forEach(function(entry){
                barData.push({
                    x: labels,
                    y: entry,
                    type: "bar"
                })
            })
            var l = layout("Stacked Bar Chart");
            l.barmode = 'stack';
            Plotly.newPlot('stackedDiv', barData, l);
            break;
    }
    console.log(this);
};