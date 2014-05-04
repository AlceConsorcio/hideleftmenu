(function(){

var instance = openerp;
openerp.web.view_tree = {};
var QWeb = instance.web.qweb,
      _lt = instance.web._lt;

instance.web.TreeView.include({
    load_tree: function(fields_view){
    self = this;
    self._super(fields_view)
    console.log(self);
    var has_toolbar = !!fields_view.arch.attrs.toolbar;
    var usage = false
    console.log('superpasamamamguevo ..........');
    if (self.options.action.usage =='wbs') {
        usage = 'WbsTreeView';
    }
    else {
        usage = 'TreeView';
    }
    self.$el.html(QWeb.render(usage, {
        'title': self.fields_view.arch.attrs.string,
        'fields_view': self.fields_view.arch.children,
        'fields': self.fields,
        'toolbar': has_toolbar
    }));
    console.log('asynchronous');
    }
});

})();
