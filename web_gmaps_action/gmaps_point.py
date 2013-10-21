# -*- coding: utf-8 -*-
# See doc/licence.rst for licence information.
import openerp.addons.decimal_precision as dp
from openerp import tools
from openerp import SUPERUSER_ID
from openerp.osv import osv, fields

class gmaps_point(osv.Model):
    '''
    This model has the intention of prepare one model to be used to show Geo Information with
    updating bidirectional trought gmaps API.

    THe intention is work with a set of generic methods that allow only inherit the technical
    things in terms of data model and business objects and try to extend this in terms of view
    using the features of google maps.

    Technically an object can have (in terms of geolocalizations this parameters.

    The objective is generalize the geo position information due to the simplicity of this 2
    behavior no matter why you want to use this information.

    gmaps_position = a group of 2 coordinates (float) which represent a point for the element.
    gmaps_area_ids = a group of +3 points \*2many which represent an area.
    '''
    _name = 'gmaps.point'
    _description = 'Point to be represented in Gmaps'
    _order = 'sequence desc'
    _columns = {
            'name': fields.char('Name', size=128, translate=True,
                help='Referential text to identify this point.'), 
            'res_id': fields.integer('Related Document ID', select=1),
            'model': fields.char('Related Model Name', select=1),
            'sequence':fields.integer('Sequence', help='Sequence'), 
            'description':fields.text('Html Representation',
                help='Html Representation to use in google maps'), 
            'gmaps_lat': fields.float('Latitude',
                digits_compute=dp.get_precision('Payment Term'),
                help="Latitude in the point"),
            'gmaps_lon': fields.float('Longitude',
                digits_compute=dp.get_precision('Payment Term'),
                help="Longitud of the point"),
            'author_id': fields.many2one('res.partner', 'Author', select=1,
                ondelete='set null',
                help="Author of the point. If not set, Point can be used publically."),
            'company_id': fields.many2one('res.company', 'Company', select=1,
                help="Company of the point, If it is used for private or following thing you will "
                "need manage multi company enviroment."),

    }

class gmaps_group(osv.AbstractModel):
    _name = 'gmaps.group'
    '''
    Use group of point as an Area.
    '''
    _area = True
    '''
    Use group of point as an route.
    '''
    _route = False
    '''
    Show html description field per point
    '''
    _show_description = False
    _columns = {
        'gmaps_point_ids':fields.one2many('gmaps.point', 'res_id', 'Group of Points',
            domain=lambda self: [('model', '=', self._name)],
            auto_join=True,
            help='Group of points related to this object.'), 
        
    }

