var placeData = [
    { name: 'Park Ave Penthouse', location: { lat: 40.7713024, lng: -73.9632393 } },
    { name: 'Chelsea Loft', location: { lat: 40.7444883, lng: -73.9949465 } },
    { name: 'Union Square Open Floor Plan', location: { lat: 40.7347062, lng: -73.9895759 } },
    { name: 'East Village Hip Studio', location: { lat: 40.7281777, lng: -73.984377 } },
    { name: 'TriBeCa Artsy Bachelor Pad', location: { lat: 40.7195264, lng: -74.0089934 } },
    { name: 'Chinatown Homey Space', location: { lat: 40.7180628, lng: -73.9961237 } }
];

var map;
var infowindow;
var defaultIcon;
var highlightIcon;
var preUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
var endUrl = "&sort=newest&api-key=f7e8a625301e4a5eb74d4f10564eddd3";
var bounds;
var markers = [];

var func = [];

var mapError = function() {
    console.log('map error');
    $('body').append('<p style="text-align: center; vertical-align: middle; position: absolute; left: 20vw; top: 15vh; width: 60vw; background-color: #FDF6E3; color: red; font-weight: bold; font-size: 120px;" >MAP ERROR</p>');
}

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    bounds = new google.maps.LatLngBounds();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7413549, lng: -73.9980244 },
        zoom: 13
    });
    infowindow = new google.maps.InfoWindow({});
    defaultIcon = makeMarkerIcon('F76458');
    highlightIcon = makeMarkerIcon('FDF6E3');
    for (var i = 0; i < placeData.length; i++) {
        var marker = new google.maps.Marker({
            position: placeData[i].location,
            map: map,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            title: placeData[i].name
        });
        bounds.extend(marker.position);
        markers.push(marker);
    }
    map.fitBounds(bounds);
    for (var i = 0; i < placeData.length; i++) {
        nytUrl = preUrl + placeData[i].name + endUrl;
        markers[i].addListener('mouseover', function() {
            this.setIcon(highlightIcon);
        });
        markers[i].addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        markers[i].addListener('click', (function(nytUrl, name) {
            return function() {
                if (this.getAnimation() !== null) {
                    this.setAnimation(null);
                } else {
                    this.setAnimation(google.maps.Animation.BOUNCE);
                }
                // setTimeout to stop bouncing.
                window.setTimeout((function(marker) {
                    return function() {marker.setAnimation(null);}
                })(this), 1450);
                var nytRequestTimeout = setTimeout(function() {
                    infowindow.setContent("Sorry, some problem occured.");
                }, 5000);
                infowindow.setContent('Please wait...(error msg will show in 5s)');
                infowindow.open(map, this);
                $.getJSON(nytUrl, function(data) {
                    articles = data.response.docs;
                    infowindow.setContent('<h3>News on ' + name + '</h3><p><a href="' + articles[0].web_url + '" >' + articles[0].headline.main + '</a>' + '<p>' + articles[0].snippet + '</p>');
                    clearTimeout(nytRequestTimeout);
                });
            };
        })(nytUrl, placeData[i].name));
        func[i] = (function(copyI) {return function() {google.maps.event.trigger(markers[copyI], 'click');}})(i);
    }
}


var Place = function(name, location, id) {
    this.name = name;
    this.location = location;
    this.id = id
        // this.favorite = ko.computed(function() {})
}

var ViewModel = function() {
    this.isChecked = ko.observable(false);
    this.re = ko.observable("");
    this.places = ko.observableArray();
    this.placesCache = [];
    for (var i = 0; i < placeData.length; i++) {
        var tmp = new Place(placeData[i].name, placeData[i].location, i);
        tmp.listClick = (function(copyI) {return function() {
            func[copyI]()
        }})(i);
        this.places.push(tmp);
        this.placesCache.push(tmp)
    }
    this.searchList = function() {
        this.places.removeAll();
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        for (var i = 0; i < placeData.length; i++) {
            if (new RegExp(this.re().toLowerCase()).test(placeData[i].name.toLowerCase())) {
                this.places.push(this.placesCache[i]);
                markers[i].setMap(map);
            }
        }
        map.fitBounds(bounds);
    }
}
var viewModel = new ViewModel();
ko.applyBindings(viewModel);
