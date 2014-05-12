(function(){

var instance = openerp;
openerp.web.view_tree = {};
var QWeb = instance.web.qweb,
      _lt = instance.web._lt;

instance.web.TreeView.include({
    load_tree: function(fields_view){
    console.log("USAGE==");
    self = this;
    self._super(fields_view);
    var has_toolbar = !!fields_view.arch.attrs.toolbar;
    var usage = false
    console.log("USAGE");
    console.log(self.options.action.usage);
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
        'toolbar': has_toolbar,
    }));
    },
    /**
     * Sets up opening a row
     */
    hook_row_click: function () {
        var self = this
        self._super();
            my_context = self.session.user_context
        this.$el.delegate('.treeview-td span, .treeview-tr span', 'click', function (e) {
            e.stopImmediatePropagation();
            active_id = $(this).closest('tr').data('id');
            self.activate($(this).closest('tr').data('id')).then(function (new_action) {
            var ids = [],
                placeholderwbs = $('.oe_list_wbs_view')
            rel_field = self.get_field(new_action.context);
            var filtered_ids = new instance.web.DataSetSearch(self, 
                new_action.res_model, my_context, [[rel_field, '=' ,parseInt(active_id)]]);
            filtered_ids.read_slice(['id'], {}).then(function (r){
            _.each(r, function (id) {
                ids.push(id.id);
            });
            var dataset = new instance.web.DataSetStatic(self, new_action.res_model, my_context, ids); 
            var l = new instance.web.ListView({}, dataset, false, {editable: 'top'});
            var ds = new instance.web.DataSetStatic(null, 'demo', null, [1, 2, 3]);
            var l = new instance.web.ListView({
                do_action: openerp.testing.noop
            }, dataset, false, {editable: 'top'});
            placeholderwbs.html('');
            return l.appendTo(placeholderwbs)
            .then(l.proxy('reload_content'))
            .then(function () {
                var d = $.Deferred();
                l.records.bind('remove', function () {
                    d.resolve();
                });
                placeholderwbs.find('table tbody tr:eq(1) button').click();
                return d.promise();
            })
            .then(function () {
                strictEqual(l.records.length, 2,
                            "should have 2 records left");
                strictEqual(placeholderwbs.find('table tbody tr[data-id]').length, 2,
                            "should have 2 rows left");
            });
          }); 
            });
        });
            

        this.$el.delegate('.treeview-tr', 'click', function () {
            var is_loaded = 0,
                $this = $(this),
                record_id = $this.data('id'),
                row_parent_id = $this.data('row-parent-id'),
                record = self.records[record_id],
                children_ids = record[self.children_field];

            _(children_ids).each(function(childid) {
                if (self.$el.find('[id=treerow_' + childid + '][data-row-parent-id='+ record_id +']').length ) {
                    if (self.$el.find('[id=treerow_' + childid + '][data-row-parent-id='+ record_id +']').is(':hidden')) {
                        is_loaded = -1;
                    } else {
                        is_loaded++;
                    }
                }
            });
            if (is_loaded === 0) {
                if (!$this.parent().hasClass('oe_open')) {
                    self.getdata(record_id, children_ids);
                }
            } else {
                self.showcontent($this, record_id, is_loaded < 0);
            }
        });
    },
        
    // Get details in listview
    activate: function(id) {
        var self = this;
        self._super(id);
        var local_context = {
            active_model: self.dataset.model,
            active_id: id,
            active_ids: [id]};
        return this.rpc('/web/treeview/action', {
            id: id,
            model: this.dataset.model,
            context: instance.web.pyeval.eval(
                'context', new instance.web.CompoundContext(
                    this.dataset.get_context(), local_context))
        }).then(function (actions) {
            if (!actions.length) { return; }
            var action = actions[0][2];
            var c = new instance.web.CompoundContext(local_context);
            if (action.context) {
                c.add(action.context);
            }
            return action
        }, null);
    }

});
})();
