openerp.web_url = function(instance) {
    var _t = instance.web._t,
        _lt = instance.web._lt,
        widget_name = 'relative_url';
    //Declare the widget
    instance.web.form.widgets.add(widget_name, 'instance.web.form.FieldRelativeUrl'); 
    //instance of the widget itself
    instance.web.form.FieldRelativeUrl = instance.web.form.FieldChar.extend({

        template: 'FieldRelativeUrl',
        
        display_name: _lt('Field relative Url'),
        
        initialize_content: function() {
            this._super();
        },
        
        render_value: function() {
            if (!this.get("effective_readonly")) {
                this._super();
            } else {
                var tmp = this.get('value');
                if (!this.isUrl(tmp)) {
                    tmp = instance.webclient.session.server + this.get('value');
                }
                if (this.UrlExists(tmp)){
                    this.$el.find('a').attr('href', tmp).text(this.get('value') ? tmp : '');
                } else {
                    this.$el.find('a').attr('href', instance.webclient.session.server + '/web_url/static/html/404.html').text('Link is broken verify destiny.');
                }
            }
        },

        isUrl: function (url) {
        	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	        return regexp.test(url);
        },

        UrlExists: function(url) {
            var http = new XMLHttpRequest();
            var hn = url.replace("http://","").replace("https://","").replace("ftp://","").split("/")[0];
            if (location.host === hn) {                
                http.open('HEAD', url, false);
                http.send();
                return http.status!=404;
            } else {
                return true;
                console.log('Are Not the same');
            }
        },
    });
}
