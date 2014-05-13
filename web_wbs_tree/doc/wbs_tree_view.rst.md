![Mou icon](http://ve.pycon.org/media/logos/VAUXOO_1.gif)
# WBS Tree View 
## Overview

**WBS Tree View**, It transforms the original tree view of OpenERP in a WBS Tree like mixing both the *list* and *tree* views.

### How to use


You must declare window actions like this, here is a known relation
between two models: `account.account` and `account.move.line`.

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



### Need support?

Dont forget to contact Vauxoo.

Follow [@vauxoo](http://twitter.com/vauxoo) on Twitter for the latest news.

or you can visit our [website](http://vauxoo.com).