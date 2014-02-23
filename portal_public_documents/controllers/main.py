# -*- coding: utf-8 -*-

from openerp.addons.web import http                                                                    
from openerp.addons.web.controllers.main import Binary
openerpweb = http
import simplejson
import time
import openerp
import os
import StringIO
import xmlrpclib
import base64
'''
class Binary(Binary):
    @openerpweb.httprequest
    def upload_attachment(self, req, callback, model, id, ufile):
        Model = req.session.model('ir.attachment')
        ModelXML = req.session.model('ir.model.data')
        group_folder_id = ModelXML.get_object_reference(
                'portal_public_documents',
                'portal_public_mail_groups_folder')
        out = """<script language="javascript" type="text/javascript">
                    var win = window.top.window;
                    win.jQuery(win).trigger(%s, %s);
                </script>"""
        try:
            attachment_id = Model.create({
                'name': ufile.filename,
                'datas': base64.encodestring(ufile.read()),
                'datas_fname': ufile.filename,
                'res_model': model,
                'res_id': int(id),
            }, req.context)
            args = {
                'filename': ufile.filename,
                'id':  attachment_id
            }
        except xmlrpclib.Fault, e:
            args = {'error':e.faultCode }
        return out % (simplejson.dumps(callback), simplejson.dumps(args))
'''
