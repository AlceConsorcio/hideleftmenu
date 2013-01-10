function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}

openerp.web_url2 = function(instance) {
    var _t = instance.web._t,
       _lt = instance.web._lt;
    widget_name = 'relative_url';
    //Add in the widgets list
    instance.web.form.widgets.add(widget_name, 'instance.web.form.FieldRelativeUrl'); 
    //instance of the widget itself
    instance.web.form.FieldRelativeUrl = instance.web.form.FieldChar.extend({

        template: 'FieldRelativeUrl',
        
        display_name: _lt('Field relative Url'),

        initialize_content: function() {
            this._super();
            var $button = this.$el.find('button');
            $button.click(this.on_button_clicked);
            this.setupFocus($button);
        },
        
        render_value: function() {
            if (!this.get("effective_readonly")) {
                this._super();
            } else {
                var tmp = this.get('value');
                if (!isUrl(tmp)) {
                    console.log(instance.webclient.session.server);
                    tmp = instance.webclient.session.server + this.get('value');
                }
                this.$el.find('a').attr('href', tmp).text(this.get('value') ? tmp : '');
                this.$el.find('a').attr('target', '_NEW');
            }
        },
    });
}
