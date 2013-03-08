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
        
        render_value: function() {
            if (!this.get("effective_readonly")) {
                this._super();
            } else {
                var val = this.get('value').split(",");
                latlng = new google.maps.LatLng(parseFloat(val[0]), parseFloat(val[1]))
                var mapOptions = {
                  center: latlng,
                  zoom: 20,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                }, 
                torender = this.$el.find('div.oe_map_canvas');
                var map_rendered = new google.maps.Map(torender[0], mapOptions);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map_rendered
                });
            }
        },
    });
}
