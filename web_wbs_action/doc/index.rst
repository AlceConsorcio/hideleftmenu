Gmaps in OpenERP Documentation
==============================

This module intent build a little api for "developers" to be able to show data using GoogleMaps API
trying to avoid to developers expend a lot of time emebeding complicated things in OpenERP.

To use this module you must build a "Client Action" with an action as is shown in the demo file,
this action will pass some important information to widget to allow customize all thing that you
can show with a Map.

The first feature that will be able to work is the "Area Selection".

What is an "Area":

An area is a zone delimited by the segments produced in the intersection of 3 or more points.

Then to use this with any model you will need add a \*2many field to your model, and the "destiny"
model will need at least 2 field which define Latitud an Longitude information, you should have at
leat 3 points loaded to render the area..

To create the widget, you should use a client action like this:

code::

    <openerp>
        <data>
            <record model="ir.actions.client" id="action_client_map">
                <field name="name">Example Gmaps</field>
                <field name="tag">gmaps.example</field>
                <field name="res_model">res.partner</field>
                <field name="params" eval="{
                    'domain': [
                        ('name', 'ilike', 'Vauxoo'),
                    ],
                    'context':{
                    },
                    'qweb_action': 'qweb_gmaps'
                    }"/>
            </record>
            <menuitem action="action_client_map" id="menu_client_example"/>
        </data>
    </openerp>


