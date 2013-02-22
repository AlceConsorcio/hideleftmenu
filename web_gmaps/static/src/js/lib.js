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
                //Get the value of the field.
                var val = this.get('value').split(",");
                //Convert the value in an LatLng object
                var myLatlng = new google.maps.LatLng(parseFloat(val[0]), parseFloat(val[1]));
                //Set the options for the map.
                var mapOptions = {
                  center: myLatlng,
                  zoom: 10,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                //Get the element where the map will be rendered.
                torender = this.$el.find('div.oe_map_canvas');
                //Create the map.
                var map = new google.maps.Map(torender[0], mapOptions);
                //Create the marker for the point LatLng and set in the map
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Uluru (Ayers Rock)'
                });        
                //Set the String for windows.
                var contentString = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                    '<div id="bodyContent">'+
                    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                    'sandstone rock formation in the southern part of the '+
                    '</p>'+
                    '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                    'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                    '(last visited June 22, 2009).</p>'+
                    '</div>'+
                    '</div>';
                //Create the Object Window.
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                //Add the window to marker
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });
            }
        },
    });
}
