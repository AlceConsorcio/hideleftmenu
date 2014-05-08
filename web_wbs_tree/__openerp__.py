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
    'name':"Web WBS Tree",
    'category':'Hidden',
    'author': 'Vauxoo',
    'description': '''
Web WBS Tree:
=============

    WBS Tree templating module

    ''',
    'depends':[
        'web',
        'account',
        ],
    'data':[
        ],
    'demo':[
        'demo/account_view.xml',
        ],
    'js':[
        'static/src/js/*.js',
        ],
    'css':[
        'static/src/css/*.css'
        ],
    'qweb':[
        'static/src/xml/*.xml'
        ],
}

