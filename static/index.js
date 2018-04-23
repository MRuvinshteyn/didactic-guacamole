var page = "categories"; //which display is currently being shown (categories, videos, info)
var category = null; //which category is being shown -- set to null unless showing a category
var video = null; //which video is being shown by id -- set to null unless showing a video
var category_id = null;

//master array of all videos
var videos = [];
d3.csv("../static/USvideos.csv", 
       function(data) {
    for (var x = 0; x < data.length; x++)
    {
        if (idExists(data[x]['video_id'])){}
        else
        {
            videos.push(data[x]);
        }
    }
    document.getElementById("loader").outerHTML = '';
    console.log(videos);
    console.log(videos.length);
});


var idExists = function(id){
    for (var x = 0; x < videos.length; x++){
        if (videos[x]['video_id'] == id){
            return true;
        }
    }
    return false;
}

var svg = d3.select("svg")["_groups"][0][0];

var displayMenu = function(){
    var sv = d3.select("svg"),
        diameter = +sv.attr("width"),
        g = sv.append("g").attr("transform", "translate(2,2)"),
        format = d3.format(",d");

    var pack = d3.pack()
    .size([diameter - 4, diameter - 4]);

    d3.json("static/data.json", function(error, root) {
        if (error) throw error;

        root = d3.hierarchy(root)
            .sum(function(d) { return d.size; })
            .sort(function(a, b) { return b.value - a.value; });

        var node = g.selectAll(".node")
        .data(pack(root).descendants())
        .enter().append("g")
        .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .on("click",function(e){
            console.log(e);
            var newCategory = e['data']['name'];
            changeCategory(newCategory);
            d3.json("static/data.json", function(error, d){
                if (error) throw error;
                for (var c = 0; c < d['children'].length; c++){
                    //console.log(d['children'][c]['name']);
                    //console.log(newCategory == d['children'][c]['name']);
                    if (newCategory == d['children'][c]['name']){
                        category_id = d['children'][c]['id'];
                        page = 'videos';
                        display();
                        break;
                        //console.log(data);
                    }
                }
            })
            //page = "videos";
            //display();
        });

        node.append("title")
            .text(function(d) { return d.data.name + "\n" + format(d.value) + " videos"; });

        node.append("circle")
            .attr("r", function(d) { return d.r; });

        node.filter(function(d) { return !d.children; }).append("text")
            .attr("dy", "0.3em")
            .text(function(d) { return d.data.name.substring(0, d.r / 3); });
    });
}

//change the category variable based on the input -- activated by clicking on circles
var changeCategory = function(e){
    category = e;
}

//return an array of videos based on their category
var searchByCategory = function(e){
    var arr = [];
    for (var x = 0; x < videos.length; x++){
        if (videos[x]["category_id"] == e){
            arr.push(videos[x]);
        }
    }
    return arr;
}

var getSingleData = function(index)
{
    return videos[index];
}

var getCatAverage = function(index)
{
    var origCat = videos[index]["category_id"];
    var average = [
        {area:"Views",value:0},
        {area:"Likes",value:0},
        {area:"Comments",value:0},
        {area:"Tags",value:0},
        {area:"Dislikes",value:0}
    ]
    var i = 0;
    var counter = 0;
    var temp = {}
    while (i<videos.length)
    {
        if (videos[i]["category_id"] == origCat)
        {
            average[0]["value"]+=parseInt(videos[i]["views"]);
            average[1]["value"]+=parseInt(videos[i]["likes"]);
            average[2]["value"]+=parseInt(videos[i]["comment_count"]);
            temp = JSON.parse(JSON.stringify(videos[i]["tags"]));
            average[3]["value"]+=parseInt(temp.split("|").length);
            average[4]["value"]+=parseInt(videos[i]["dislikes"]);
            //console.log(counter)
            counter+=1;
        }
        i+=1;
    }
    console.log(counter);
    for (j = 0;j<5;j++)
    {   
        average[j]["value"] = Math.floor(average[j]["value"]/counter);
    }
    console.log("AVERAGE FOR "+origCat);
    console.log(average);
    return average;
}

var makeRadarData = function(index)
{   
    //Use with getSingleData
    //Only keeps: tags, views, likes, dislikes, comment_count
    var copied = JSON.parse(JSON.stringify( videos[index] ));
    delete copied["category_id"];
    delete copied["channel_title"];
    delete copied["comments_disabled"];
    delete copied["description"];
    delete copied["publish_time"];
    delete copied["title"];
    delete copied["trending_date"];
    delete copied["video_error_or_removed"];
    delete copied["video_id"];
    delete copied["thumbnail_link"];
    delete copied["ratings_disabled"];
    copied["tags"] = copied["tags"].split("|").length;
    console.log(copied);
    var average = getCatAverage(index);
    var cheese = [
        {area:"Views",value:Math.floor(100*(copied["views"]/average[0]["value"]))},
        {area:"Likes",value:Math.floor(100*(copied["likes"]/average[1]["value"]))},
        {area:"Comments",value:Math.floor(100*(copied["comment_count"]/average[2]["value"]))},
        {area:"Tags",value:Math.floor(100*(copied["tags"]/average[3]["value"]))},
        {area:"Dislikes",value:Math.floor(100*(copied["dislikes"]/average[4]["value"]))}
    ]
    var avg = [
        {area:"Views",value:100},
        {area:"Likes",value:100},
        {area:"Comments",value:100},
        {area:"Tags",value:100},
        {area:"Dislikes",value:100}
    ]
    var newArr = [cheese,avg];
    console.log(newArr);
    return newArr;
}

var displayCategory = function(){
    console.log(category_id);
    makeTable(searchByCategory(category_id));
}

var displayVideo = function(){
    //data = 
    //diyList.listerine("table",data);
    var config = {
        w: 300,
        h: 300,
        maxValue: 100,
        levels: 5,
        ExtraWidthX: 300,
    }
    var radarData = makeRadarData(video);
    var newMax = 0;
    for (i = 0; i<5; i++)
    {
        if (radarData[0][i]["value"]>newMax)
        {
            newMax = radarData[0][i]["value"];
        }
    }
    if (newMax<100)
    {
        newMax = 100;
    }
    config["maxTop"] = newMax;
    config["maxValue"] = newMax;
    RadarChart.draw("#radar", radarData, config);

}

//displays different page based on page variable
var display = function(){
    svg.innerHTML = "";
    if (page == "categories"){
        displayMenu();
    }
    if (page == "videos"){
        displayCategory();
    }
    if (page == "info"){
        displayVideo();
    }
}

display();

var makeTable = function(data){
    var table = d3.select("#table").append("table");
    var thead = table.append("thead");
    var tbody = table.append("tbody");
    thead.append('tr')
        .selectAll('th')
        .data(['Title']).enter()
        .append('th')
        .text(function (column) { return column; });

    var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

    var cells = rows.selectAll('td')
    .data(function (row) {
        return ["title"].map(function (column) {
            return {column: column, value: row[column]};
        });
    })
    .enter()
    .append('td')
    .text(function (d) { return d.value; });
    
    tbody.selectAll('tr').on("click",function(e){
        video = e['video_id'];
        page = "info";
        display();        
    });
}

var diyList = {
    listerine: function(itemID,data){
        itemID = '#'+itemID;
        var sortAscending = true;
        var table = d3.select(itemID).append('table');
        var titles = d3.keys(data[0]);
        var headers = table.append('thead').append('tr')
        .selectAll('th')
        .data(titles).enter()
        .append('th')
        .text(function(d) {
            return d
        })
        .on('click', function(d) {
            headers.attr('class', 'header');
            if (d == "title" || d == "channel_title" || d=='trending_date' || d == "Other") { //these keys sort alphabetically
                // sorting alphabetically");
                if (sortAscending) {
                    rows.sort(function(a, b) {
                        return d3.ascending(a[d], b[d]);
                    });
                    sortAscending = false;
                    this.className = 'aes';
                } else {
                    rows.sort(function(a, b) {
                        return d3.descending(a[d], b[d]);
                    });
                    sortAscending = true;
                    this.className = 'des';
                }
            } else {
                if (sortAscending) {
                    //all other keys sort numerically including time
                    rows.sort(function(a, b) {
                        return b[d] - a[d];
                    });
                    sortAscending = false;
                    this.className = 'aes';
                } else {
                    rows.sort(function(a, b) {
                        return a[d] - b[d];
                    });
                    sortAscending = true;
                    this.className = 'des';
                }
            }
        });

        var rows = table.append('tbody').selectAll('tr')
        .data(data).enter()
        .append('tr');
        rows.selectAll('td')
            .data(function(d) {
            return titles.map(function(key, i) {
                return {
                    'value': d[key],
                    'name': d
                };
            });
        }).enter()
            .append('td')
            .attr('data-th', function(d) {
            return d.name;
        })
            .text(function(d) {
            //BRING BACK IF YOU EVER NEED DEBUGGING
            //console.log("typeof(" + d.value + "): " + typeof(d.value));

            if (typeof(d.value) == "object") {
                console.log("Yippee it's an object");
                return timeformat(d.value)
            } else {
                return d.value
            }
        });

    }
};
