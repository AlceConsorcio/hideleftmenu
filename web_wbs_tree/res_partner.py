# -*- coding: utf-8 -*-
# See doc/licence.rst for licence information.
from openerp.osv import osv, fields

class res_partner_mail(osv.Model):
    """ Update partner to add a field about notification preferences """
    _name = "res.partner"
    _inherit = ['res.partner', 'gmaps.group']
