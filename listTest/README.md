# D3 v4 Sortable Table

Adapted from [Mingsong Hu](https://bl.ocks.org/AMDS)'s Block [D3.js Sortable & Responsive Table](http://bl.ocks.org/AMDS/4a61497182b8fcb05906)

gh-pages [demo](https://shanegibney.github.io/d3-v4-sortable-table/)

Also on [jsFiddle](https://jsfiddle.net/ofey/dxxpkhj7/2/)

This table is created using a JSON object. Some table columns have string values and the others have numerical values. The string values need to be sorted alphabetically and the others numerically.

The alphabetical columns are hard coded for alphabetical sorting.

```
    if (d == "name" || d == "club" || d == "category") { //these keys sort alphabetically
```

<img width="1428" alt="screen shot 2017-08-12 at 15 41 09" src="https://user-images.githubusercontent.com/17167992/29241590-c7811092-7f74-11e7-8013-09c1e3676103.png">
