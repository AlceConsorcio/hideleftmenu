openerp.web_url2 = function(instance) {
    var _t = instance.web._t,
       _lt = instance.web._lt;
    widget_name = 'url2';
    console.log(widget_name);
    //Add in the widgets list
    instance.web.form.widgets.add(widget_name, 'instance.web.form.FieldUrl2'); 
    console.log(instance.web.form.widgets)
    //instance of the widget itself
    instance.web.form.FieldUrl2 = instance.web.form.FieldChar.extend({

        template: 'FieldUrl2',
        
        display_name: _lt('Url2'),

        initialize_content: function() {
            console.log('Initializing');
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
                var s = /(\w+):(.+)/.exec(tmp);
                if (!s) {
                    tmp = "http://" + this.get('value');
                }
                this.$el.find('a').attr('href', tmp).text(this.get('value') ? tmp : '');
            }
        },
        on_button_clicked: function() {
            if (!this.get('value')) {
                this.do_warn(_t("Resource error"), _t("This resource is empty"));
            } else {
                var url = $.trim(this.get('value'));
                if(/^www\./i.test(url))
                    url = 'http://'+url;
                window.open(url);
            }
        },
    });
}
