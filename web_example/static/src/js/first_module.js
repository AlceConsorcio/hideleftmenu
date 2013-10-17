var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwNE-vFDyyOb62ODaRiqpiL2kz8wR0aTc&sensor=true&callback=gmap_draw"
$("head").append(script);
window.gmap_draw = function(){
}
openerp.web_example = function (instance){

    instance.web_example.Map = instance.web.Widget.extend({
        template: 'web_example.Map',
        init: function(parent, action) {
            this.action = _.clone(action);
            //Take the "res_model" Field and become part of the widget.
            this.res_model = this.action.res_model; 
            //Take the "params[options]" part of Field and become part of the widget.
            this.options = this.action.params.options; 
            //Take the "params[domain]" part of Field and become part of the widget.
            this.domain = this.action.params.domain; 
            //Take the "params[context]" part of Field and become part of the widget.
            //B care about the _.extend of underscore read the specific documentation to
            //understand why it is being used.
            this.context = _.extend(this.action.params.context || {}, this.action.context || {});
			this._super(parent);
		},
        writeArea: function () {
            this.area = google.maps.geometry.spherical.computeArea(this.polygon.getPath());
            $("#shape_area").html(this.area + " m<sup>2</sup>");
            
            $("#paths").html("");
            for (var i = 0; i < this.path.length; ++i)
            {
                $("#paths").html($("#paths").html() + "<br />" + this.path.getAt(i)); 
            }
        },
        addPoint: function(event, parent){
            self = this;
            parent.path.insertAt(this.path.length, event.latLng);

            var marker = new google.maps.Marker({
                position: event.latLng,
                map: this.map,
                draggable: true,
                animation: "BOUNCE"
            });
            parent.markers.push(marker);
            marker.setTitle("#" + this.path.length);

            google.maps.event.addListener(marker, 'click', function() {
                marker.setMap(null);
                var i = 0;
                for (var I = markers.length; i < I && markers[i] != marker; ++i); 
                markers.splice(i, 1);
                self.path.removeAt(i);
                
                writeArea();
            });
            
            google.maps.event.addListener(marker, 'dragend', function() {
                var i = 0;
                for (var I = markers.length; i < I && markers[i] != marker; ++i);
                self.path.setAt(i, marker.getPosition());
                
                this.writeArea();
            });
            
            this.writeArea();
        },
        startShape: function() {
            self = this;
            this.polygon.setPath(new google.maps.MVCArray([self.path]));
            this.event_click_map = google.maps.event.addListener(this.map, 'click', function(e){
                self.addPoint(e, self)
            });
        },
        endShape: function() {
            google.maps.event.removeListener(this.event_click_map);
        },
        loadMap: function(parent){
            self = this;
            this.map, this.polygon;
            this.markers = [];
            parent.path = new google.maps.MVCArray;
            this.event_click_map;

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
			
            var mapCoords = new google.maps.LatLng(21.150975, -101.645336);
            var mapOptions = { 
				center: mapCoords, 
				zoom:17, 
				mapTypeId: google.maps.MapTypeId.ROADMAP 
			}
            var torender = this.$el.find('#map_canvas');

            this.map = new google.maps.Map(torender[0], mapOptions);
            
            var polygonOptions = { 
				strokeColor: "#ff0000",//color,
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "#ff0000",//color,
				fillOpacity: 0.35 
			}
			this.polygon = new google.maps.Polygon(polygonOptions);
			this.polygon.setMap(this.map);

			$("#shape_b").clicktoggle(
				function () {
					$(this).removeClass("unselected");
					$(this).addClass("selected");
					self.startShape();
				},
				function () {
					$(this).removeClass("selected");
					$(this).addClass("unselected");
					self.endShape();
				}
			);
        },
        start: function() {
            var self = this;
			this._super.apply(this, arguments);
            //We instanciate the widget with data, see the parameter passed is "Self" to be sure
            //both objects are connected and retreive informatios from parent in the child.
            //If you dont pass the self object, then you will need to be care of a lot of not
            //necesary thing already in the framework.
            this.elements = new instance.web_example.ListElements(self);
            this.$('a.oe_load_map').on('click', function(){
                self.loadMap(self);
                self.$('.information').fadeOut(400);
                //We just use Jquery to show the information where we need.
                self.elements.appendTo(self.$('.oe_list_placeholder'));
            });
        }
    });
    instance.web_example.ListElements = instance.web.Widget.extend({
        template: 'web_example.ListElements',
        init: function(parent){
            this._super();
        }
    })
    instance.web.client_actions.add('example.action','instance.web_example.Map');
};
