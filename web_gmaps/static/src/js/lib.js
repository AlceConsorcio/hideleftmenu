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
            console.log('Entre al render');
            if (!this.get("effective_readonly")) {
                this._super();
            } else {
                var tmp = this.get('value');
////                //if (this.UrlExists(tmp)){
////                    //Magia de renderizado
////                     this.$el.find('div.oe_map_canvas').text("Hola Mundo");
//                //} else {
//                //    this.$el.find('a').attr('href', instance.webclient.session.server + '/web_url/static/html/404.html').text('Link is broken verify destiny.');
//                //}
//                console.log(google);
//                var mapOptions = {
//                  center: new google.maps.LatLng(10.505833, -66.914444),
//                  zoom: 8,
//                  disableDefaultUI: true,
//                  overviewMapControl: true,
//                  scaleControl: true,
//                  mapTypeId: google.maps.MapTypeId.SATELLITE
//                };
//                var map = new google.maps.Map(this.$el.find('div.oe_map_canvas'),
//                    mapOptions);
                }
//            },
        },
    });
}
