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
        if (d == "title" || d == "channel_title" || d == "Other") { //these keys sort alphabetically
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
