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
    'name': "Web Process PrettyPrint",
    'author': "Vauxoo",
    'category': "Hidden",
    'description': """
Process PrettyPrint:
====================

This module configure all the necesary tools to print in the right way
(as an ISO document the process view)

    """,
    'version': "1.0",
    'depends': [
                'web',
                'process', #To show the process
                'hr', #To link process to hr departments and resposabilities.
                'document_page', #To build internal documentation Human readable.
                'document_ftp', #To links with external files.
                ],
    'js': [
        'static/src/js/lib.js', 
    ],
    'css': [
        'static/src/css/lib.css',
    ],
    'qweb': [
        'static/src/xml/lib.xml',
    ],
    'installable': True,
    'auto_install': False,
    'web_preload': False,
}
