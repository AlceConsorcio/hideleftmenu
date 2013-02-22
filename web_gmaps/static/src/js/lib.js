openerp.web_gmaps = function(instance) {
    var _t = instance.web._t,
        _lt = instance.web._lt,
        widget_name = 'gmaps';
    //Declare the widget
    instance.web.form.widgets.add(widget_name, 'instance.web.form.Gmaps'); 
    //instance of the widget itself
    instance.web.form.Gmaps = instance.web.form.FieldChar.extend({

        template: 'FieldGmaps',
        
        display_name: _lt('Field Gmaps'),
        
        initialize_content: function() {
            this._super();
        },
        
        render_value: function() {
            if (!this.get("effective_readonly")) {
                this._super();
            } else {
                var mapOptions = {
                  center: new google.maps.LatLng(10.505833, -66.914444),
                  zoom: 8,
                  mapTypeId: google.maps.MapTypeId.SATELLITE
                }, 
                    torender = this.$el.find('div.oe_map_canvas');
                var map = new google.maps.Map(torender[0], mapOptions);
                console.log(map);
            }
        },
    });
}
