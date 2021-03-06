# -*- coding: utf-8 -*-
##############################################################################
#
#    Tech-Receptives Solutions Pvt. Ltd.
#    Copyright (C) 2009-TODAY Tech-Receptives(<http://www.tech-receptives.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

{
    'name': "Webcam Widget Module",
    'version': "1.0",
    'description': """
Widget for Capturing Image using a webcam.
==========================================

How can you use this widget?

Define a field type "binary"
Define in the view for the field widget="webcam"

It is all!
    """,
    'depends': ['web'],
    'website' : "http://www.techreceptives.com",
    'author': "Tech-Receptives Solutions Pvt. Ltd",
    'js': ['static/src/js/view.js'],
    'qweb': ['static/src/xml/webcam_template.xml'],
    'css' : ['static/src/css/base.css'],
    'installable': True,
    'auto_install': False,
    'application': True,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
