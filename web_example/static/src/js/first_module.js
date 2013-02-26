openerp.web_example = function (instance){
    instance.web.client_actions.add('example.action','instance.web_example.Action');
    instance.web_example.Action = instance.web.Widget.extend({
        className: 'oe_map_canvas',
        start: function () {


            var mapOptions = new google.maps.LatLng(-34.397, 150.644);
            var map = { center: mapOptions, zoom:8, mapTypeId: google.maps.MapTypeId.ROADMAP }
            console.log(map);
            this._super();
            var thing = this.$el.text("Hello, world!"); 
            var torender = this.$el.find('div.oe_map_canvas');
            console.log(thing);
            var mapped = new google.maps.Map(thing[0], map);
            console.log(mapped);
            thing.text(mapped);
        }
//        render_value: function() {
//            if (!this.get("effective_readonly")) {
//                this._super();
//            } else {
//                var mapOptions = {
//                  center: new google.maps.LatLng(-34.397, 150.644),
//                  zoom: 20,
//                  mapTypeId: google.maps.MapTypeId.ROADMAP
//                }, 
//            torender = this.$el.find('div.oe_map_canvas');
//                var map = new google.maps.Map(torender[0], mapOptions);
//            }
//        },
    });
};
