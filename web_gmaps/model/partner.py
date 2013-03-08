# -*- encoding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution    
#    Copyright (C) 2004-2009 Tiny SPRL (<http://tiny.be>). All Rights Reserved
#    d$
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from openerp import pooler, tools
from openerp.osv import fields, osv
from openerp.tools.translate import _
from googlemaps import GoogleMaps

class partner_geo_map(osv.osv):
    """
    Compute in server side data to rendered with gmaps
    """
    def _geo_loc(self, cr, uid, ids, field_name, arg, context):
        result = {}
        gmaps = GoogleMaps("http://maps.googleapis.com/maps/api/js?key=AIzaSyBwNE-vFDyyOb62ODaRiqpiL2kz8wR0aTc")
        for partner in self.browse(cr,uid,ids):
            address = partner.street
            lat, lng = gmaps.address_to_latlng(address) 
            latlng = str(lat) +","+ str(lng)
            result[partner.id] = str(latlng)
        return result
    _inherit = 'res.partner'
    _columns = {
    'geo_all': fields.function(_geo_loc, 
                                method=True, 
                                type='char', 
                                string='Computed Geolocal',
                                store=False),
    }
partner_geo_map()
