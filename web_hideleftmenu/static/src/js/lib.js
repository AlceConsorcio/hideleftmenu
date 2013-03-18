openerp.web_hideleftmenu = function (instance) {
    console.log("Module loaded");
    instance.web.WebClient.include({
        events: {
            'click .oe_hidemenu': 'hideleftmenu',
        },
        hideleftmenu: function(ev) {
            this.$(".oe_leftbar").toggle("slow");
        },
    });
};
