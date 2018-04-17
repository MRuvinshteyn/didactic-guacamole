var csv_data = [];

var csv = d3.csv("/static/USvideos.csv", function(d){
    csv_data.push(d);
});

var search_category = function(cat){
    results = [];

    var i = 0;
    while (i < csv_data[0].length){
	var curr = csv_data[0][i];
	if(curr.category_id == cat){
	    console.log("matched!")
	    results.push(curr);
	}
	i++;
    }
    return results;
};

//returns the information at the specified index for a given video
var byIndex = function(category, vidInd, dataInd){
    return search_category(category)[vidInd][dataInd];
}


//=======================================json stuffs===============================
var json_data = [];

var json = d3.json("/static/US_category_id.json", function(d){
    json_data.push(d);
});

//console.log(json_data[0].items);
