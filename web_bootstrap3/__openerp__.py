# -*- coding: utf-8 -*-
###################################################################################################
#
#   OpenERP, Open Source Management Solution Copyright (C) 2004-2009 Tiny SPRL (<http://tiny.be>).
#   All Rights Reserved
#   Financed and Planified by Vauxoo
#   developed by: nhomar@vauxoo.com
#   This program is free software: you can redistribute it and/or modify it under the terms of the
#   GNU General Public License as published by the Free Software Foundation, either version 3 of
#   the License, or (at your option) any later version.
#   This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
#   without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See
#   the GNU General Public License for more details.
#   You should have received a copy of the GNU General Public License    along with this program.
#   If not, see <http://www.gnu.org/licenses/>.
###################################################################################################

{
    'name': "Bootstrap 3.0 for OpenERP",
    'author': "Vauxoo",
    'category': "Hidden",
    'description': """
Bootstrap 3.0 in OpenERP
========================

Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web
development.

Openerp have embeded partially Bootstrap 2.x but the new version is so powerfull.

With this module you will be able to design cool views with this documentation, all what you need
is namespace your views with a delimiter with class .bs3

i.e.:

::

    <form version="7.0">
    ...
    ...
    <pre>
        <div class="bs3">
            <field name="text" widget="html"/>
        </div>
    </pre>
    ...
    ...
    ...
    </form>

Now all the content of the field ``text`` with widget ``html`` bellow will be rendered with all the
power of bs3

We include the original less files to allow you compile this when you need but you can download and
compile by your self the original sources, just need to compile the bs3-openerp.less again pointing
the bs3 original files.

The most interesting part of this way to work is that our specific modules in terms of look and
feel will be prepared for version 8.0.

The bootstrap documentation can be found here_

You will find a directory called bootstrap3 with the bootstrap's source code, the main objective of
do that is be able to just pull from original bootstrap project and commit in this module almost
directly.

Is you want compile your own version of bootstrap_ download the source code in the link_

.. _here http://getbootstrap.com/
.. _bootstrap https://github.com/twbs/bootstrap/
.. _link https://github.com/twbs/bootstrap/
    """,
    'version': "1.0",
    'depends': [
        'web'
        ],
    'js': [
        'static/src/bootstrap3/dist/js/bootstrap.js',
    ],
    'css': [
        'static/src/css/bs3-openerp.css',
    ],
    'qweb': [
    ],
    'installable': True,
    'auto_install': False,
    'web_preload': False, #set to True if you want this module be available always without ask.
}
