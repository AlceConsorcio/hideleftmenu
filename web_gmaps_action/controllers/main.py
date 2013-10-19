# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution    
#    Copyright (C) 2004-2009 Tiny SPRL (<http://tiny.be>). All Rights Reserved
#    Financed and Planified by Vauxoo
#    developed by: nhomar@vauxoo.com
#    developed by: oscar@vauxoo.com
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

import openerp
from openerp.tools import config
from openerp.addons.web.controllers.main import Home
from openerp.addons.web import http
openerpweb = http
GMAP_API_KEY = config.get('gmap_api_key')

class HomeApi(Home):
    '''
    Home action http for client web, overwritten to include the libraries necesaries.
    '''
    @openerpweb.httprequest
    def index(self, req, s_action=None, db=None, **kw):
        print "En mi index"
        print GMAP_API_KEY
        r = super(HomeApi, self).index(req, s_action=s_action, db=db, kw=kw)
        print r
        return r
#Force to use my Home: There is a more elegant way?
openerp.addons.web.controllers.main.Home = HomeApi 
