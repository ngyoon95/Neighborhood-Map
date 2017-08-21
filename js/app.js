// VIEW MODEL
var viewModel = {
    locations: [
        new Place('Suria KLCC', 3.1575065, 101.7121546, 'Suria%20KLCC', 'https://www.suriaklcc.com.my/main'),
        new Place('Sunway Pyramid', 3.073107, 101.6077879, 'Sunway%20Pyramid', 'https://www.sunwaypyramid.com'),
        new Place('1 Utama Shopping Centre', 3.1507745, 101.6153685, '1%20Utama', 'http://www.1utama.com.my'),
        new Place('Mid Valley Megamall', 3.1173914, 101.6778458, 'Mid%20Valley%20Megamall', 'http://www.midvalley.com.my'),
        new Place('IOI Mall Puchong', 3.0456284, 101.6182287, 'IOI%20Mall%20Puchong', 'http://www.myioi.com'),
        new Place('IPC Shopping Centre', 3.1559474, 101.6114185, 'IPC%20Shopping%20Centre', 'https://www.ipc.com.my'),
        new Place('Subang Parade', 3.0818763, 101.5852073, 'Subang%20Parade', 'http://www.subangparade.com.my'),
        new Place('Setia City Mall', 3.1088907, 101.4615074, 'Setia%20City%20Mall', 'http://www.setiacitymall.com'),
     ], 
    //Observable for side Menu | Navigation Bar Toggle-Menu Button
    visibleMenu: ko.observable(true),
    //observable used for running a search against locations array
    searchBox: ko.observable(''),
    //observable used for opening infowindow when <li> item clicked from search
    clickEventHandlerFunction: function() {
        openInfowindow(this.marker);
    },
    //observable when encounter map error 
    mapUnavailable: ko.observable(false)
};


    //Toggle-Menu Button for Side Menu
        clickMe = function() {
        var self = this;
        this.visibleMenu(!this.visibleMenu());
     };


    // Search and filter out from the list of locations with the name and display their marker accordingly.
        this.search = ko.computed(function() {
        var self = this;
        var filterMall = this.searchBox().toLowerCase();
        console.log(this);
        return ko.utils.arrayFilter(self.locations, function(markerLocation) {
            var title = markerLocation.title.toLowerCase();
            var matched = title.indexOf(filterMall) >= 0;
            //console.log(matched);
            var marker = markerLocation.marker;
            if (marker) {
                marker.setVisible(matched);
            }
            return matched;
        });
    }, viewModel);

ko.applyBindings(viewModel);

