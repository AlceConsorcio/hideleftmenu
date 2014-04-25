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
{
    'name':"Web Action WBS Tree",
    'category':'Hidden',
    'author': 'Vauxoo',
    'description': '''
WBS view:
===========

    This module adds the capability to create a wbs tree on projects.
    ''',
    'depends':[
        'web',
        'contacts',
        'web_allow_custom_root',
        'web_bootstrap3',
        'decimal_precision',
        ],
    'data':[
        'data/wbs_data.xml',
        'wbs_point_view.xml',
        ],
    'demo':[
        #'web_gmaps_demo.xml'
        ],
    'js':[
        'static/src/js/wbs.js',
        ],
    'css':[
        'static/src/css/wbs.css'
        ],
    'qweb':[
        'static/src/xml/wbs.xml'
        ],
}

