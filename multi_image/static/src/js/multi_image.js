openerp.multi_image = function(openerp) {
    var _t = openerp.web._t;
    var QWeb = openerp.web.qweb;
openerp.web.form.FieldBinaryImageMulti = openerp.web.form.FieldBinaryImage.extend({
    template: 'FieldBinaryImageMulti',
    init: function(field_manager, node) {
        var self = this;
        this._super(field_manager, node);
        this.binary_value = false;
        this.useFileAPI = !window.FileReader;
        this.max_upload_size = 25 * 1024 * 1024; // 25Mo
        if (!this.useFileAPI) {
            this.fileupload_id = _.uniqueId('oe_fileupload');
            $(window).on(this.fileupload_id, function() {
                var args = [].slice.call(arguments).slice(1);
                self.on_file_uploaded.apply(self, args);
            });
        }
    },
    initialize_content: function() {
        var self = this;
        var dataset = new openerp.web.DataSetSearch(this, 'res.users', {}, []);
        dataset.read_ids([openerp.session.uid], ['name']).then(function(res) {
            if (res)
                self.user_name = res[0].name;
        });
        this._super();
    },
    on_file_uploaded_and_valid: function(size, name, content_type, orignal_file_name, date) {
        if (name) {
            var data_dict = {"size": openerp.web.human_size(size), "name": name, "content_type": content_type, "date": date, "orignal_name": orignal_file_name, 'user':this.user_name};
            var data = JSON.parse(this.get('value'));
            if (data)
                data.push(data_dict);
            else
                data = [data_dict];
            this.internal_set_value(JSON.stringify(data));
            this.binary_value = true;
            this.set_filename(name);
            this.render_value();
            this.do_warn(_t("File Upload"), _t("File Upload Successfully !"));
        }
        else{
            this.do_warn(_t("File Upload"), _t("There was a problem while uploading your file"));
        }
    },
    on_list_image: function() {
        var images_list = this.get('value');
        var self = this;
        if (!this.get('value')) { 
            this.do_warn(_t("Image"), _t("Image not available !"));
            return false; 
        }
        this.image_list_dialog = new openerp.web.Dialog(this, {
            title: _t("Image List"),
            width: '840px',
            height: '70%',
            min_width: '600px',
            min_height: '500px',
            buttons: [
                 {text: _t("Close"), click: function() { self.image_list_dialog.close();}}
            ]
        }).open();
        this.on_render_dialog();
    },
    on_render_dialog: function() {
        var images_list = JSON.parse(this.get('value'));
        var self = this;
        var url_list = [];
        if (images_list) {
            _.each(images_list, function (index) {
                if (index) {
                    if(index['name_1']){
                        url_list.push({'name' : index['name_1'], 'path' : index['name']})
                    }else{
                        url_list.push({'name' : index['orignal_name'], 'path' : index['name']})
                    }
                }
            });
        }
        else { return false; }
        var image_list = [];
        var start = 0;
        for(var i=1; i <= Math.ceil(url_list.length/4); i++) {
            image_list.push(url_list.slice(start, start + 4))
            start = i * 4;
        }
        this.image_list_dialog.$el.html(QWeb.render('DialogImageList', {'widget': this, 'image_list': image_list}));
        this.image_list_dialog.$el.find(".oe-remove-image").click(function() {
            self.do_remove_image(this, true);
        });
    },
    
    render_value: function() {
        var self = this;
        this.$el.find('.oe-image-preview').click(this.on_preview_button);
        this.$el.find('.oe_image_list').click(this.on_list_image);
        var images_list = JSON.parse(this.get('value'));
        this.$el.find('#imagedescription').remove();
        var $img = QWeb.render("ImageDescription", { image_list: images_list, widget: this});
        this.$el.append($img);
        this.$el.find(".oe_image_row").click(function() {
            if (this.id) {
                var clicked = this.id;
                var name_desc = "";
                _.each(images_list, function (index) {
                    if (index['name'] == clicked ) {
                        var title = index['name_1'] ? index['name_1'] : ''
                        var description = index['description'] ? index['description'] : ''
                        name_desc = 'Title:-' + title + '<br/>Description:-' +description
                    }
                });
                self.do_display_image(this, name_desc);
            }
        });
        this.$el.find(".oe_list_record_delete").click(function() {
            if (this.id) {
                self.do_remove_image(this, false);
            }
        });
        this.$el.find(".oe-record-edit-link").click(function() {
            var self_1 = this;
            var data = JSON.parse(self.get('value'));
            _.each(data, function(d){
                if(d.name == self_1.id){
                    self.name_display = d.name_1 ? d.name_1 : '';
                    self.description_display =d.description ? d.description : '';
                }
            });
            self.select_mo_dialog = $(QWeb.render('edit_name_description', {widget:self})).dialog({
                resizable: false,
                modal: true,
                title: _t("Image Description"),
                width: 500,
                buttons: {
                    "Ok": function() {
                        var new_list = [];
                        var data = JSON.parse(self.get('value'));
                        if (self_1.id && data) {
                            _.each(data, function (index) {
                                if (index['name'] != self_1.id ) {
                                    new_list.push(index)
                                }
                                else {
                                    index["name_1"] = self.select_mo_dialog.find('#name_1').val()
                                    index["description"] = self.select_mo_dialog.find('#description').val()
                                    new_list.push(index)
                                }
                            });
                            self.internal_set_value(JSON.stringify(new_list));
                            self.invalid = false
                            self.dirty = true
                            self.render_value();
                            $(this).dialog( "close" );
                        }
                    },
                    "Close": function() {
                        $(this).dialog( "close" );
                    }
                },
            });
        });
    },
    do_display_image: function(curr_id, name_desc) {
        this.$el.find('.oe-image-preview').lightbox({
            fitToScreen: true,
            jsonData: [{"url" :curr_id.id, "title": name_desc}],
            loopImages: true,
            imageClickClose: false,
            disableNavbarLinks: true
        });
    },
    do_remove_image: function(curr_id, dialog) {
        var self = this;
        var images_list = JSON.parse(this.get('value'));
        if (images_list) {
            var new_list = [];
            if (confirm(_t("Are you sure to remove this image?"))) {
                _.each(images_list, function (index) {
                    if (index['name'] != curr_id.id ) {
                        new_list.push(index)
                    }
                });
                self.internal_set_value(JSON.stringify(new_list));
                this.invalid = false
                this.dirty = true
                if (dialog) {
                    this.on_render_dialog();
                }
                else{
                    this.render_value();
                }
            }
        }
    },
    on_preview_button: function() {
        var images_list = JSON.parse(this.get('value'));
        var url_list = [];
        var self = this;
        if (images_list) {
            _.each(images_list, function (index) {
                if (index) {
                    var title = index['name_1'] ? index['name_1'] : ''
                    var description = index['description'] ? index['description'] : ''
                    url_list.push({"url" :index['name'], "title": 'Title:-' + title + '<br/>Description:-' +description})
                }
            });
        }
        else {
            this.do_warn("Image", "Image not available !");
            return false;
        }
        this.$el.find('.oe-image-preview').lightbox({
            fitToScreen: true,
            jsonData: url_list,
            loopImages: true,
            imageClickClose: false,
            disableNavbarLinks: true
        });
    },
});

openerp.web.form.widgets = openerp.web.form.widgets.extend({
    'image_multi' : 'openerp.web.form.FieldBinaryImageMulti',
});
}
