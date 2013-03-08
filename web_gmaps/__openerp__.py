# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution    
#    Copyright (C) 2004-2009 Tiny SPRL (<http://tiny.be>). All Rights Reserved
#    Financed and Planified by Vauxoo
#    developed by: nhomar@vauxoo.com
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

{
    'name': "Alternative Gmaps Position",
    'author': "Vauxoo",
    'category': "Hidden",
    'description': """
Gmaps view:
===========

Just allow given a point with this format X,Y in decimal coordinates, show the map.
You must to add:
        
        <script type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo-1vLyCKoMU1JkZZSe2Z9xpknaB0d6Qc&sensor=true">
        </script>

on line 516 in addons/web/controllers/main.py of web project. 
    """,
    'version': "1.0",
    'depends': [
                'web',
                'crm_partner_assign'
               ],
    'js': [
        'static/src/js/lib.js',
        'static/src/js/load_gmap_key.js',
    ],
    'css': [
        'static/src/css/gmaps.css',
    ],
    'qweb': [
        'static/src/xml/lib.xml',
    ],
    'data': [
        'view/partner_view.xml'
            ],
    'installable': True,
    'auto_install': False,
    'web_preload': False,
}
