#-*- encoding: utf-8 -*-
{
    'name': "Portal Document Public",
    'website': 'http://www.vauxoo.com',
    'category': 'Portal',
    'author': 'Vauxoo',
    'description': """
With this module we will intend to build a "Public Link" to be served as public via http with and
without allow the indexing of it.

The plan: Extend document module adding a field "Public Link" which will be relative to the url
base.

Extend the ir_config parameters to configure the public folder and serve it as werkzeug is doing
inside openerp.

Share the link extending the "many2many tag widget."
    """,
    'category': 'Tools',
    'depends':[
        'web',
        'base',
        'document',
        'portal_anonymous',
        ],
    'data': [
        'view/ir_attachment_view.xml',
        'data/portal_public_document_data.xml'
        ],
    'demo': [
        'demo/portal_public_document_demo.xml'
        ],
    'js': [
        ],
    'css': [
        ],
    'qweb': [
        ],
    'installable': True,
}
