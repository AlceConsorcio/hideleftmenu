openerp.web_many2many_attachments = function(instance) {
var _t = instance.web._t,
   _lt = instance.web._lt;
var QWeb = instance.web.qweb;
/**
 * Extend the html widget to allow manage correctly internal images before go to the server
 * We take off the "session_id" from the attr "src" and "href" in all links that are locals to this
 * server and include them when it is needed.
 */
instance.web.form.FieldTextHtml.include({
    /*
    render_value: function() {
        if (! this.get("effective_readonly")) {
            this.$textarea.val(this.get('value') || '');
            this._updating_editor = true;
            this.$cleditor.updateFrame();
            this._updating_editor = false;
        } else {
            this.$el.html(this.get('value'));
        }
    },
    set_value: function(value_) {
*/
                   /**
                    * Stop TODO: with URI.js manipulate the urls.
                    */
                   /**
        console.log('En mi set Value');
        variable = $(value_).find('img');
        console.log(variable.length);
        console.log('Fin de mi set value');
        parsed = $(value_).html();
        this._super.apply(this, [parsed]);

    }
                    */
});
/**
 * Extend of FieldMany2ManyTags widget method.
 * When many2many is used with attachments show a preview of the attachment if it is an image
 */
instance.web.form.FieldMany2ManyTagsAttachments = instance.web.form.FieldMany2ManyTags.extend({

    start: function() {
        this.values = [];
        this.values_checking = [];

        this.on("change:value", this, this.on_change_value_check);
        this.trigger("change:value");
        this._super.apply(this, arguments);
    },
    /*
    * Just Copy of the original method to bind the Click tagClick trigger on the tag to allow copy the image
    * TODO: Verify it it change, to allow manage it in an inheritable way.
    */
    initialize_content: function() {
        if (this.get("effective_readonly"))
            return;
        var self = this;
        var ignore_blur = false;
        self.$text = this.$("textarea");
        self.$text.textext({
            plugins : 'tags arrow autocomplete',
            autocomplete: {
                render: function(suggestion) {
                    return $('<span class="text-label"/>').
                             data('index', suggestion['index']).html(suggestion['label']);
                }
            },
            ext: {
                autocomplete: {
                    selectFromDropdown: function() {
                        this.trigger('hideDropdown');
                        var index = Number(this.selectedSuggestionElement().children().children().data('index'));
                        var data = self.search_result[index];
                        if (data.id) {
                            self.add_id(data.id);
                        } else {
                            ignore_blur = true;
                            data.action();
                        }
                        this.trigger('setSuggestions', {result : []});
                    },
                },
                tags: {
                    isTagAllowed: function(tag) {
                        return !!tag.name;

                    },
                    removeTag: function(tag) {
                        var id = tag.data("id");
                        self.set({"value": _.without(self.get("value"), id)});
                    },
                    renderTag: function(stuff) {
                        return $.fn.textext.TextExtTags.prototype.renderTag.
                            call(this, stuff).data("id", stuff.id);
                    },
                },
                itemManager: {
                    itemToString: function(item) {
                        return item.name;
                    },
                },
                core: {
                    onSetInputData: function(e, data) {
                        if (data == '') {
                            this._plugins.autocomplete._suggestions = null;
                        }
                        this.input().val(data);
                    },
                },
            },
        }).bind('getSuggestions', function(e, data) {
            var _this = this;
            var str = !!data ? data.query || '' : '';
            self.get_search_result(str).done(function(result) {
                self.search_result = result;
                $(_this).trigger('setSuggestions', {result : _.map(result, function(el, i) {
                    return _.extend(el, {index:i});
                })});
            });
        }).bind('hideDropdown', function() {
            self._drop_shown = false;
        }).bind('showDropdown', function() {
            self._drop_shown = true;
        }).bind('tagClick',function(e, tag, value, callback){
            /*
            * It is the unique change to the original methid to allow bind the
            * click, sadly this object can not be overwritten with just one property.
            */
            self.get_img_link_constructor(value);
        });
        self.tags = self.$text.textext()[0].tags();
        self.$text
            .focusin(function () {
                self.trigger('focused');
                ignore_blur = false;
            })
            .focusout(function() {
                self.$text.trigger("setInputData", "");
                if (!ignore_blur) {
                    self.trigger('blurred');
                }
            }).keydown(function(e) {
                if (e.which === $.ui.keyCode.TAB && self._drop_shown) {
                    self.$text.textext()[0].autocomplete().selectFromDropdown();
                }
            });
    },
    get_img_link_constructor: function(value) {
        /*
        * It only make sense if the relation is an ir.attachment otherwise, we
        * should have a different behavior
        */
        if (this.field.relation==='ir.attachment' && (this.field.type==='many2many' || this.field.type==='one2many')){
            var AttObj = new instance.web.DataSet(this, 'ir.attachment');
            console.log(this);
            AttObj.read_ids(
                    [value.id],
                    ['public_path'],
                    this.options).done(
                        function(elements, r, O){
                            this.image_url = elements[0].public_path; 
                            this.img_id = elements[0].id; 
                            DialogHtml = $('<div>');
                            DialogHtml.html(QWeb.render('previewImg', {widget: this}));
                            DialogHtml.dialog({
                                show: {
                                    effect: "blind",
                                    duration: 500
                                },
                                title: 'To Use it: Copy and paste in your html',
                                width: 580,
                                position: ['middle',28],
                            });
                        });
        } else {
            console.error('Not implemented for other models');
        }
    },
    on_change_value_check : function () {
        this.values = _.uniq(this.values);

        // filter for removed values
        var values_removed = _.difference(this.values, this.get('value'));
        if (values_removed.length) {
            this.values = _.difference(this.values, values_removed);
            this.set({'value': this.values});
            return false;
        }

        // find not checked values that are not currently on checking
        var not_checked = _.difference(this.get('value'), this.values, this.values_checking);
        if (not_checked.length) {
            // remember values on checking for cheked only one time
            this.values_checking = this.values_checking.concat(not_checked);
            // check values
        }
    }
});


/**
 * Registry of form fields
 */
instance.web.form.widgets = instance.web.form.widgets.extend({
    'many2many_tags_attachments' : 'instance.web.form.FieldMany2ManyTagsAttachments',
});

};
