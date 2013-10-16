openerp.web_example = function (instance){

var map, polygon;
var markers = [];
var path = new google.maps.MVCArray;
var event_click_map;

$.fn.clicktoggle = function(a, b) {
    return this.each(function() {
        var clicked = false;
        $(this).click(function() {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }
            clicked = true;
            return a.apply(this, arguments);
        });
    });
};

function writeArea() {
    var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    $("#shape_area").html(area + " m<sup>2</sup>");
    
    $("#paths").html("");
    for (var i = 0; i < path.length; ++i)
    {
        $("#paths").html($("#paths").html() + "<br />" + path.getAt(i)); 
    }
}

function addPoint(event) {
    path.insertAt(path.length, event.latLng);

    var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        draggable: true,
        animation: "BOUNCE"
    });
    markers.push(marker);
    marker.setTitle("#" + path.length);

    google.maps.event.addListener(marker, 'click', function() {
        marker.setMap(null);
        var i = 0;
        for (var I = markers.length; i < I && markers[i] != marker; ++i); 
        markers.splice(i, 1);
        path.removeAt(i);
        
        writeArea();
    });
    
    google.maps.event.addListener(marker, 'dragend', function() {
        var i = 0;
        for (var I = markers.length; i < I && markers[i] != marker; ++i);
        path.setAt(i, marker.getPosition());
        
        writeArea();
    });
    
    writeArea();
}

function startShape() {
    polygon.setPath(new google.maps.MVCArray([path]));
    event_click_map = google.maps.event.addListener(map, 'click', addPoint);
}

function endShape() {
    google.maps.event.removeListener(event_click_map);
}

        

    instance.web_example.Map = instance.web.Widget.extend({
        template: 'web_example.Map',
        init: function(parent) {
			this._super(parent);
		},
        start: function () {
			this._super();
			
            var mapCoords = new google.maps.LatLng(21.150975, -101.645336);
            var mapOptions = { 
				center: mapCoords, 
				zoom:17, 
				mapTypeId: google.maps.MapTypeId.ROADMAP 
			}
            //console.log(map);
            //this._super();
            //var thing = this.$el.text("Hello, world!"); 
            var torender = this.$el;

            //console.log(thing);
            map = new google.maps.Map(torender[0], mapOptions);
            //console.log(mapped);
            //thing.text(mapped);
            
            var polygonOptions = { 
				strokeColor: "#ff0000",//color,
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "#ff0000",//color,
				fillOpacity: 0.35 
			}
			polygon = new google.maps.Polygon(polygonOptions);
			polygon.setMap(map);


			torender.after("<div id='shape_b' class='unselected'></div><div id='shape_area'></div><div id='paths'></div>");
			$("#shape_b").clicktoggle(
				function () {
					$(this).removeClass("unselected");
					$(this).addClass("selected");
					startShape();
				},
				function () {
					$(this).removeClass("selected");
					$(this).addClass("unselected");
					endShape();
				}
			);
        }
    });
    instance.web.client_actions.add('example.action','instance.web_example.Map');
};
