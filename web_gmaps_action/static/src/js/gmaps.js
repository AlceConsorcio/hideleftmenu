openerp.web_gmaps_action = function (instance) {

    var _t = instance.web._t,
       _lt = instance.web._lt;
    instance.web.form.widgets.add('gmaps_sector', 'instance.web_gmaps_action.GmapsSector');
    instance.web_gmaps_action.GmapsSector = instance.web.form.FieldOne2Many.extend({

        init: function (field_manager, node) {
            this._super.apply(this, arguments);
        },

        start: function () {
            this._super.apply(this, arguments);
        },
    });

    instance.web_gmaps_action.Map = instance.web.Widget.extend({
        template: 'web_gmaps_action.Map',
        init: function(parent, action) {
            if (action.params.qweb_action_template){
                this.template = action.params.qweb_action_template
            }
            this.action = _.clone(action);
            //Take the "res_model" Field and become part of the widget.
            this.res_model = this.action.res_model; 
            //Take the "params[options]" part of Field and become part of the widget.
            this.options = this.action.params.options || {}; 
            //Take the "params[domain]" part of Field and become part of the widget.
            this.options.domain = this.action.params.domain; 
            //Take the "params[context]" part of Field and become part of the widget.
            //B care about the _.extend of underscore read the specific documentation to
            //understand why it is being used.
            this.options.context = _.extend(this.action.params.context || {}, this.action.context || {});
			this._super(parent);
		},
        writeArea: function () {
            area = google.maps.geometry.spherical.computeArea(this.polygon.getPath());
            $("#shape_area").html(area + " m<sup>2</sup>");
            
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
                for (var I = parent.markers.length; i < I && parent.markers[i] != marker; ++i);
                parent.path.setAt(i, marker.getPosition());
                
                parent.writeArea();
            });
            
            this.writeArea();
        },

        startShape: function() {
            self = this;
            this.polygon.setPath(new google.maps.MVCArray([this.path]));
            this.event_click_map = google.maps.event.addListener(this.map, 'click', function(e){
                self.addPoint(e, self)
            });
        },

        endShape: function() {
            google.maps.event.removeListener(this.event_click_map);
        },

        loadMap: function(self){
            self.map, this.polygon;
            self.markers = [];
            self.path = new google.maps.MVCArray;
            self.event_click_map;

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

			$(".shape_b").clicktoggle(
				function () {
					$(this).addClass("btn-warning");
					$(this).removeClass("btn-default");
                    $(this).text('Deactivate Map Controls');
					self.startShape();
				},
				function () {
					$(this).removeClass("btn-warning");
					$(this).addClass("btn-default");
                    $(this).text('Activate Map Controls');
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
            this.elements = new instance.web_gmaps_action.ListElements(self);
            //Just adding the help windows in buttons (read dat-* on template to see how to get the
            //information to show.
            this.$('.helpbutton').popover();
            this.$('.gmaps_save').popover();
            this.$('.gmaps_cancel').popover();
            this.$('.oe_load_map').popover();
            this.$('.shape_b').popover();
            this.$('a.oe_load_map').on('click', function(){
                self.loadMap(self);
                self.$('.information').fadeOut(400);
                self.$('.oe_section_map').fadeIn(400);
                self.$('a.oe_load_map').addClass('disabled');
                //We just use Jquery to show the information where we need.
                self.elements.appendTo(self.$('.oe_list_placeholder'));
            });
        }

    });

    instance.web_gmaps_action.ListElements = instance.web.Widget.extend({
        template: 'web_gmaps_action.ListElements',
        init: function(parent){
            if (parent.action.params.qweb_list_template){
                this.template = parent.action.params.qweb_list_template
            }
            this.parent = parent
            this.options = parent.options;
            this.model = parent.res_model;
            this.context = parent.options.context;
            //Wired domain to search, it doesn't matter for this PoC how get the domain the search
            //widget will do that for us.
            this.domain = [['model', 'ilike', this.model]];
            this.obj_model_search = new instance.web.DataSetSearch( this, 'gmaps.point', this.domain,
                                                                    this.context);
            this._super(parent);
        },

        start: function(){
            this._super.apply(this, arguments);
            this.render_list(this, this.parent);
        },

        render_list: function(self, windows){
            //parent is the "Parent View"
            self = this;
            this.obj_model_search.read_slice(['name', 'gmaps_lat', 'gmaps_lon', 'description', 'res_id', 'sequence'], self.options)
                .done(function(results){
                //Example of async render.
                //It can be done with templating Qweb, or wired "building in the code the view".
                //as we are doing here almost all time will be more easy use templates
                _.each(results, function(result){
                    console.log(result); 
                    act = instance.web.qweb.render('Gmaps.action_buttons', {'widget': self, 'result': result}) 
                    row_ = $(instance.web.qweb.render('Gmaps.data_row', {'widget': self, 'result': result, 'act': act})); 
                    row_.appendTo(self.$('tbody'));
                });
                //Binding "Click Event"
                self.$('.oe_save_btn').on('click', function(ev){
                    //The correct way to get this information is reading the object .map
                    //But the concept is only push information in the database, not amanipulate
                    //map information
                    PATHS = windows.$('#paths').text();
                    AREA = windows.$('#shape_area').text();
                    self.save_result(self, PATHS, AREA, ev.currentTarget.dataset.id, windows);
                });
                 
            });
        },

        save_result: function(parent, paths, area, id, windows){
            self = this; 
            this.ds_model = new instance.web.DataSet(self, this.model, this.options.context)
            //this.obj_model_search.read_slice(['name', 'comment'], self.options)
            TextToSave = '<p><b>Area  :</b><br/>' +
                         area + '</p>' +
                         '<p><b>Puntos :</b></p>' +
                         paths
            this.ds_model.write(parseInt(id),
                    {'comment': TextToSave},
                    self.options).done(function(res){
                        self.$('#cell'+id).html(TextToSave); 
                        windows.$('.oe_warning_bs3').fadeIn(400); 
                    })
        },
    });
    instance.web.client_actions.add('gmaps.example','instance.web_gmaps_action.Map');
};
