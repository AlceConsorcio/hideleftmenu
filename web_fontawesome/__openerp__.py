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
    'name': "FontAwesome 3.2.1",
    'author': "Vauxoo",
    'website': "http://www.vauxoo.com",
    'category': "Hidden",
    'description': """
Just let have available: fontawesome for Bootstrap 3.0.2 available on Openerp V7.0

More information and documentation about how use it:

http://fontawesome.io

Some things you will be able to do:

if you declare a menu with web_icon in v7 it was ignored, now, you can set simply the class name
available in this examples:

A menu declared like this:

.. code::
    
    + 45     <menuitem action="action_client_main"
    <!-- Icon Home a little bigger. -->
    + 46               web_icon="icon-home icon-large" 
    <!-- Name with an Space to avoid be ignored by the Web Client -->
    + 47               name=" " 
    + 48               id="menu_client_home" sequence="1"/>

Will render something like this:

.. image:: /web_fontawesome/static/src/img/menu.png
   :alt: Menu Example.

.. note::
   
   Until `THIS MERGE`_ is not applied on server, to be able to use the feature explained above you
   must apply this patch in your sever or simply merge the revno 4031 of this branch_.

You can use it too directly in your Form Views, simply try this examples_ on the
oficial FontAwesome documentation directly as simple html on your Form and Kanban Views.

.. _examples: http://fontawesome.io/examples/ 
.. _THIS MERGE: https://code.launchpad.net/~vauxoo/openerp-web/7.0-missing-menu-attr-nhomar/+merge/186960  
.. _branch: https://code.launchpad.net/~vauxoo/openerp-web/7.0-missing-menu-attr-nhomar 
    """,
    'version': "1.0",
    'depends': ['web'],
    'js': [
    ],
    'css': [
        'static/src/css/font-awesome.css',
#        'static/src/css/font-awesome-ie7.css',
    ],
    'qweb': [
        'static/src/xml/base.xml',
    ],
    'installable': True,
    'auto_install': False,
    'web_preload': False,
}
