openerp.web_gmaps = function(instance) {
    var _t = instance.web._t,
        _lt = instance.web._lt,
        widget_name = 'gmaps';
    //Declare the widget - Add the widget to the widget collection of the form widget
    instance.web.form.widgets.add(widget_name, 'instance.web.form.Gmaps'); 
    //instance of the widget itself
    instance.web.form.Gmaps = instance.web.form.FieldChar.extend({

        template: 'FieldGmaps',
        
        display_name: _lt('Field Gmaps'),
        
        initialize_content: function() {
            var script = document.createElement("script");
            this._super();
            script.type = "text/javascript";
            script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBwNE-vFDyyOb62ODaRiqpiL2kz8wR0aTc&sensor=true&callback=gmap_draw"
            window.gmap_draw = function(){
                console.log("Dunno wtd here");
            }
            $("head").append(script);

        },
        
        render_value: function() {
            if (!this.get("effective_readonly")) {
                this._super();
            } else {
                var val = this.get('value').split(",");
                var mapOptions = {
                  center: new google.maps.LatLng(parseFloat(val[0]), parseFloat(val[1])),
                  zoom: 20,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                }, 
                torender = this.$el.find('div.oe_map_canvas');
                var map = new google.maps.Map(torender[0], mapOptions);
            }
        },
    });
}
