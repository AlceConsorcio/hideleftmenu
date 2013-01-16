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
    'name': "Web Binary Icon",
    'author': "Vauxoo",
    'category': "Hidden",
    'description': """
Binary Icon plugin.
===================

When you are using a binary field, it is cool, if depending of the extension
the field show the icon of the app, something like the plugin for gmail does,
recognizing the extension and showing the correct icon.
    """,
    'version': "1.0",
    'depends': ['web'],
    'js': [
        'static/src/js/lib.js', 
    ],
    'css': [
    ],
    'qweb': [
        'static/src/xml/lib.xml',
    ],
    'installable': True,
    'auto_install': False,
    'web_preload': False,
}
