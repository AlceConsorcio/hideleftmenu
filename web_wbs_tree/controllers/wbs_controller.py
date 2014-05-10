import openerp.addons.web.controllers.main as main_c
from openerp.addons.web import http
from openerp.addons.web.http import request

def wbs_fix_view_modes(action):
    """ For historical reasons, OpenERP has weird dealings in relation to
    view_mode and the view_type attribute (on window actions):

    * one of the view modes is ``tree``, which stands for both list views
      and tree views
    * the choice is made by checking ``view_type``, which is either
      ``form`` for a list view or ``tree`` for an actual tree view

    This methods simply folds the view_type into view_mode by adding a
    new view mode ``list`` which is the result of the ``tree`` view_mode
    in conjunction with the ``form`` view_type.

    TODO: this should go into the doc, some kind of "peculiarities" section

    :param dict action: an action descriptor
    :returns: nothing, the action is modified in place
    """
    if not action.get('views'):
        generate_views(action)
    if action.pop('view_type', 'form') != 'form':
        return action

    if 'view_mode' in action:
        action['view_mode'] = ','.join(
            mode if mode != 'tree' else 'list'
            for mode in action['view_mode'].split(','))
    action['views'] = [
        [id, mode if mode != 'tree' else 'list']
        for id, mode in action['views']
    ]

    return action

main_c.fix_view_modes = wbs_fix_view_modes
print main_c.fix_view_modes

class wbs_tree(http.Controller):
    @http.route('/static/wbs_tree', type='json', cors='*', auth='public')
    def show_wbs(self,**post):
        print "post ",post
        cr, uid, context = request.cr, request.uid, request.context
        data_obj = request.registry['ir.model.data']
        #view_brw = data_obj.get_object(cr, uid, 'web_wbs_tree','')
        return False

