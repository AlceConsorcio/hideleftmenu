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

.. image:: http://ve.pycon.org/media/logos/VAUXOO_1.gif

WBS Tree View
=============

Overview
________

**WBS Tree View**, It transforms the original tree view of OpenERP in a WBS Tree like mixing both the *list* and *tree* views.

How to use
__________

    You must declare window actions like this, here is a known relation
    between two models: `account.account` and `account.move.line`.

    .. code-block::

        <record id="account_wbs_tree_action" model="ir.actions.act_window">
        <field name="name">WBS account</field>
        <field name="type">ir.actions.act_window</field>
        <field name="res_model">account.account</field>
        <field name="view_type">tree</field>
        <field name="view_mode">tree</field>
        <field name="usage">wbs</field>
        <field name="view_id" ref="account_wbs_tree_view"/>
        </record>

        <record id="account_move_normal_action_wbs_tree" model="ir.actions.act_window">
        <field name="name">Account Moves</field>
        <field name="type">ir.actions.act_window</field>
        <field name="res_model">account.move.line</field>
        <field name="view_type">form</field>
        <field name="view_mode">tree,form,kanban</field>
        <field name="usage">wbs</field>
        <field name="context">{'account_id':active_id, 'search_default_account_id':active_id}</field>
        </record>

        <record id="action_move_line_select" model="ir.values">
        <field eval="'tree_but_open'" name="key2"/>
        <field eval="'account.account'" name="model"/>
        <field name="name">Account structure</field>
        <field eval="'ir.actions.act_window,%d'%account_move_normal_action_wbs_tree" name="value"/>
        </record>
Notice that the action declaration has a value on the `usage` field, it must be filled with 'wbs' value
on both actions, also the `context` must have at least the relation field of the destination model and the `active_id`
that is calling the destiny action.



Need support?
_____________

Dont forget to contact Vauxoo.

Follow `@vauxoo http://twitter.com/vauxoo`_ on Twitter for the latest news.

or you can visit our `website http://vauxoo.com`_.

    ''',
    'depends':[
        'web',
        'account_accountant',
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

