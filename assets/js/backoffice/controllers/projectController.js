app.controller('projectsCtrl',
function projectsCtrl($scope,$filter,ngTableParams) {
	  var data = [{name: "Moroni", age: 50},
                {name: "Tiancum", age: 43},
                {name: "Jacob", age: 27},
                {name: "Nephi", age: 29},
                {name: "Enos", age: 34},
                {name: "Tiancum", age: 43},
                {name: "Jacob", age: 27},
                {name: "Nephi", age: 29},
                {name: "Enos", age: 34},
                {name: "Tiancum", age: 43},
                {name: "Jacob", age: 27},
                {name: "Nephi", age: 29},
                {name: "Enos", age: 34},
                {name: "Tiancum", age: 43},
                {name: "Jacob", age: 27},
                {name: "Nephi", age: 29},
                {name: "Enos", age: 34}];

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 100,          // count per page
        sorting: {
            name: 'asc'     // initial sorting
        }
    }, {
  //   	groupBy: function (item) {
		//   	return item.name;
		// },
    	// counts:[],
        total: data.length, // length of data
        getData: function($defer, params) {
        	console.log(data);
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

});