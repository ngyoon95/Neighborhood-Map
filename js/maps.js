/*jshint esversion: 6 */
var map;
var infowindow;
var openInfowindow;
var lastSelected;
var mapOptions;

// Model 
var locations =[
    {
        title : 'Suria KLCC',
        lat : 3.1575065,
        lng : 101.7121546,
        wikiPlace : 'Suria%20KLCC',
        link : 'https://www.suriaklcc.com.my/main'
    },
    {
        title : 'Sunway Pyramid',
        lat : 3.073107,
        lng : 101.6077879,
        wikiPlace : 'Sunway%20Pyramid',
        link : 'https://www.sunwaypyramid.com'
    },
    {
        title : '1 Utama Shopping Centre',
        lat : 3.1507745,
        lng : 101.6153685,
        wikiPlace : '1%20Utama',
        link : 'http://www.1utama.com.my'
    },
    {
        title : 'Mid Valley Megamall',
        lat : 3.1173914,
        lng : 101.6778458,
        wikiPlace : 'Mid%20Valley%20Megamall',
        link : 'http://www.midvalley.com.my'
    },        
    {
        title : 'IOI Mall Puchong',
        lat : 3.0456284,
        lng : 101.6182287,
        wikiPlace : 'IOI%20Mall%20Puchong',
        link : 'http://www.myioi.com'
    },
    {
        title : 'IPC Shopping Centre',
        lat : 3.1559474,
        lng : 101.6114185,
        wikiPlace : 'IPC%20Shopping%20Centre',
        link : 'https://www.ipc.com.my'
    },
    {
        title : 'Subang Parade',
        lat : 3.0818763,
        lng : 101.5852073,
        wikiPlace : 'Subang%20Parade',
        link : 'http://www.subangparade.com.my'
    },
    {
        title : 'Setia City Mall',
        lat : 3.1088907,
        lng : 101.4615074,
        wikiPlace : 'Setia%20City%20Mall',
        link : 'http://www.setiacitymall.com'
    } 
    ];


//Marker with information of each location
var Place = function(title, lng, lat, wikiPlace, link, marker) {
    var self = this;
    this.title = title;
    this.lat = lat;
    this.lng = lng;
    this.wikiPlace = wikiPlace;
    this.link = link;    
    this.marker = marker;
    };
    

function initMap() {
    //Scripts executed only after Google Maps API Loaded
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {

        // Create a styles array to use with the map.
        var styles = [
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#8fa7b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#667780"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#333333"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#8fa7b3"
                    },
                    {
                        "gamma": 2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a3becc"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#7a8f99"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#555555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a3becc"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#bbd9e9"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#525f66"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#bbd9e9"
                    },
                    {
                        "gamma": 2
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a3aeb5"
                    }
                ]
            }
        ];
        console.log("initMap executed");

        // Create a Klang Valley map with below co-ordinates.
        var myLatlng = new google.maps.LatLng(3.0975946, 101.6190471);
        var mapOptions = {
            zoom: 12,
            center: myLatlng,
            styles: styles,
            mapTypeControl: true,
            mapTypeControlOptions: {
              position: google.maps.ControlPosition.TOP_RIGHT
          },
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        infowindow = new google.maps.InfoWindow();
    }
    else {
        // Load error if Google Map does not successfully load
        viewModel.mapUnavailable(true);
    }

        // Markers creation based on location array
        for (var i = 0; i < viewModel.locations.length; i++) {
            /* jshint loopfunc: true */ 
            var self = viewModel.locations[i];
            // This function takes in a COLOR, and then creates a new marker icon of that color.
            var makeMarkerIcon = function(markerColor) {
                var markerImage = new google.maps.MarkerImage(
                    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
                    '|40|_|%E2%80%A2',
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(10, 34),
                    new google.maps.Size(21,34));         
                return markerImage;
            };

            // Custom Style applied to markers. This will be our listing marker icon.
            var defaultIcon = makeMarkerIcon('ffff00');

            // "Highlighted location" marker color for when the user
            // mouses over the marker.
            var highlightedIcon = makeMarkerIcon('ff0000');

            viewModel.locations[i].marker = new google.maps.Marker({
                position: new google.maps.LatLng(self.lng, self.lat),
                map: map,
                title: self.title,
                icon: defaultIcon,
                wikiPlace: self.wikiPlace,
                link: self.link
            }); 


            // Two event listeners - one for mouseover, one for mouseout,
            // to change the colors back and forth.
            viewModel.locations[i].marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon);
            });

            viewModel.locations[i].marker.addListener('mouseout', function () {
                this.setIcon(defaultIcon);
            });


            //When click, it will show Drop animation, highlight marker and display predefine info
            openInfowindow = function (marker) {

                //Last Selected Variable used to select only latest marker
                if (lastSelected != null) {
                    lastSelected.setIcon(defaultIcon);
                }
                lastSelected = marker;

                console.log(marker);

                marker.setIcon(highlightedIcon);
                map.panTo(marker.getPosition());

                //Set Animation on marker and set it to stop after 700ms
                marker.setAnimation(google.maps.Animation.DROP);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 700);

                infowindow.setContent(marker.title);
                infowindow.open(map,marker);

                // URL of Wikipedia Article for Source Reference
                var wikiSource = 'https://en.wikipedia.org/wiki/' + marker.wikiPlace;

                // Info taken from Wikipedia API
                var wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + marker.wikiPlace;
                var website = marker.link; 

                $.ajax({
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {},
                    url: wikiURL, website
                }).done(function(response) {
                    console.log("response received");
                    var info = response.query.pages[Object.keys(response.query.pages)[0]].extract;
                    info = info ? info : "Information not available";
                    // To test above ternary statement
                    //console.log(info);
                    infowindow.setContent('<div>' + '<h4 class="marker-title">' + marker.title + '</h4>' + info + '<br>Source: ' + '<a href=' + wikiSource + '>wikipedia</a>' + '<br>Website: ' + '<a href=' + website + '>Link</a>' + '</div>');
     
                //Set Content if failure of AJAX request
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    infowindow.setContent('<div>' + 'No Service/ Connection Detected (Please try again later)' + '</div>');
                });
            };

            // Event listener opens infowindow upon being clicked.
            this.addListener = google.maps.event.addListener(self.marker,'click', function() {
                openInfowindow(this);
                console.log(this);
            });
        }

    }

// Reset center and zoom map on click handler  
resetMap = function () {
        infowindow.close();
        map.setZoom(12);
        map.setCenter({lat:3.0975946, lng:101.6190471});
    };    

// Fallback error handling method for Google Maps
mapError = function () {
    viewModel.mapUnavailable(true);
};



