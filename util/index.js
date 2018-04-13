var page = "categories"; //which display is currently being shown (categories, videos, info)
var category = null; //which category is being shown -- set to null unless showing a category
var video = null; //which video is being shown by id -- set to null unless showing a video

var svg = d3.select("svg"),
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(2,2)"),
    format = d3.format(",d");

var pack = d3.pack()
.size([diameter - 4, diameter - 4]);

d3.json("data.json", function(error, root) {
    if (error) throw error;

    root = d3.hierarchy(root)
        .sum(function(d) { return d.size; })
        .sort(function(a, b) { return b.value - a.value; });

    var node = g.selectAll(".node")
    .data(pack(root).descendants())
    .enter().append("g")
    .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .on("click",function(e){changeCategory(e['data']['name'])});

    node.append("title")
        .text(function(d) { return d.data.name + "\n" + format(d.value); });

    node.append("circle")
        .attr("r", function(d) { return d.r; });

    node.filter(function(d) { return !d.children; }).append("text")
        .attr("dy", "0.3em")
        .text(function(d) { return d.data.name.substring(0, d.r / 3); });
});

//change the category variable based on the input -- activated by clicking on circles
var changeCategory = function(e){
    category = e;
}

//return an array of videos based on their category
var searchByCategory = function(e){
    var arr = [];
    d3.csv("/data/USvideos.csv", function(data) {
        for (var x = 0; x < data.length; x++){
            if (data[x]["category_id"] == e){
                arr.push(data[x]);
            }
        }
    });
    return arr;
}