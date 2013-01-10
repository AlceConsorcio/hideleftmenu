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
    'name': "Web Url Alternative",
    'author': "Vauxoo",
    'category': "Hidden",
    'description': """
Url Widget advanced.
====================

Before this module, the default widget just recognized as url all what start 
with http and if it dont start with this text then the original widget 
concatenated and http:// at the begining.

Due to the correct management of Urls fields in openerp, we improve the widget 
with an alternative way to manage this feature:

After you install this module, 

 * The field will be recognized as link when it start with: (ftp|http|https)
 * The link is managed with a _NEW target attr to avoid miss the actual page.
 * If the field bring just a text this one will be considered as a relative one 
 to openerp (specially usefull when you need to put links to internal 
 files/requests).
TODO: with this feature we lost the option of fill a field url with just
www.domain.com and become automagically the link, i think this is correct too, 
but no so clear for me, i prefer use explicitaly the http:// stuff.

How to test:
After install the module Just define your field with the atrubute 
widget='relative_url' and it is ready i.e.

<field name="link_doc" widget="relative_url"/>

.. warning::

    be sure make your module depends of this one, to avoid brake the view when 
    it will be loaded.
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
