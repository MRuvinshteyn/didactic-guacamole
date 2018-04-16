var parse_csv = function(){
    var f = new File("USvideos.csv");
    f.open("r");

    var info = [];

    //while it isn't the end of the file
    while(!f.eof){
	var curr = f.readln().split(",");

	//in case of commas in entries
	if(curr.length > 16){
	    var i = 0;
	    //while theres an incorrect amount of entries in the array
	    while(i < curr.length && curr.length > 16){
		var first = curr[i].charAt(0);
		var last = curr[i].charAt(curr[i].length - 1);
		//if the entry doesn't close a quotation mark, keep deleting entries from the array and storing them until the quote is closed.
		if(first == '"' && last != '"'){
		    store = '';
		    while (i < curr.length){
			store += curr[i];
			last = curr[i].charAt(curr[i].length - 1);
			if (last == '"'){
			    delete curr[i];
			    break;
			}
			delete curr[i];
		    }
		    curr.splice(i, 0, store);
		}
		i++;
	    }
	}
	//in case of newlines or other invalid cases
	if(curr.length > 6){
	    info.push(curr);
	    //tags are separated by |
	    info[i][6] = info[i][6].split("|");
	}
    }
    return info;
};

var search_category = function(cat){
    var data = parse_csv();
    results = [];

    var i = 0;
    while(i < data.length){
	if(data[i][4] == cat){
	    results.push(data[i]);
	}
    }
    return resultsl
};

var d = parse_csv();
var num_wrong = 0;
var i = 0;
while (i < d.length){
    if (d[i].length != 16){
	num_wrong+=1;
    }
    i+=1;
}

var parse_json = function(){
    
    
};



'''

def parse_json():
    data = json.load(open(\'US_category_id.json\'))[\'items\']
    categories = []
    for i in range(0, len(data)):
        idd = data[i][\'id\']
        title = data[i][\'snippet\'][\'title\']
        temp = [idd, title]
        categories.append(temp)

    return categories


d = parse_json()


#for i in range(0, len(d)):
#    print d[i]
'''
