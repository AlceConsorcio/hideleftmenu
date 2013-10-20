
#-*- coding: utf-8 -*-
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
    'name': "Custom Init Template Parameters",
    'author': "Vauxoo",
    'category': "Hidden",
    'description': """
Make customizable your html_template:
=====================================

Some things in the html_template variable are wired in the code.

With this module we can pass them as parameters.

1.- Favicon.
------------

Add the key: favicon in your config file mapping to your public available path, and it will be taken.

i.e:

code::

    Relative:
    favicon = /path/to/your/favicon.ico
    Absolute:
    favicon = https://url.com/path/to/your/favicon.ico

    default:
    '/web/static/src/img/favicon.ico'

2.- Extra js Scripts.
---------------------

Add a key: script_extra_`NAME`

code::

    script_extra_addwords = '<script type="text/javascript"> <!--//--><![CDATA[//><!-- GA_googleFetchAds(); //--><!]]> </script>'

3.- Gmaps API loaded.
---------------------

i.e:

code::

    gmaps_api_key = "https://maps.googleapis.com/maps/api/js?key=API_KEY&sensor=SET_TO_TRUE_OR_FALSE"

In this way you can put your customize loading stuff and/or namespace all your client to use your
own css.

If you put this module available in your addons path the variable will be overwritten and this
options will be availables, change your config file and all will work smothly.

This is used in http://www.vauxoo.com see how it loads all this information very quickly.
    """,
    'version': "0.1",
    'depends': [
        'web',
        'base',
        ],
    'js': [
    ],
    'css': [
    ],
    'qweb': [
    ],
    'installable': True,
}
