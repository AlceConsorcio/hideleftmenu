var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBwNE-vFDyyOb62ODaRiqpiL2kz8wR0aTc&sensor=true&callback=gmap_draw"
window.gmap_draw = function(){
    console.log("Dunno wtd here");
}
$("head").append(script);

