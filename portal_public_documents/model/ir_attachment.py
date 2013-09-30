# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2004-2009 Tiny SPRL (<http://tiny.be>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

import hashlib
import itertools
import logging
import os
import re
from shutil import copyfile, rmtree

from openerp import tools
from openerp import addons
from openerp import SUPERUSER_ID
from openerp.tools.translate import _
from openerp.osv import fields, osv
_logger = logging.getLogger(__name__)


class document_directory(osv.osv):
    _inherit = 'document.directory'
    _columns = {
        'publish': fields.boolean('Allow Publish',
                                  help='If you want allow files under this directory be published '
                                       'directly as an http file.'),
    }


class ir_attachment(osv.Model):

    '''OverWrite Document Class to ensure add the new coputeb field to know the public link'''

    _inherit = 'ir.attachment'

    def _get_anonymous_id(self, cr, uid, ids, context=None):
        ir_model_data = self.pool.get('ir.model.data')
        users_obj = self.pool.get('res.users')
        anonymous_data_id = ir_model_data.get_object_reference(
            cr, SUPERUSER_ID, 'portal_anonymous',
            'anonymous_user')
        anonymous_id = ir_model_data.browse(cr, SUPERUSER_ID, [
                                            anonymous_data_id[1]], context=context)
        anonymous_brw = users_obj.browse(cr, SUPERUSER_ID, [
                                         anonymous_id[0].id], context=context)
        return anonymous_brw and anonymous_brw[0] or False

    def _full_url_plocation(self, cr, uid, location, path):
        # location = 'file:filestore'
        assert location.startswith(
            'file:'), "Unhandled filestore location %s" % location
        location = location[5:]

        # sanitize location name and path
        location = re.sub('[.]', '', location)
        location = location.strip('/\\')

        path = re.sub('[.]', '', path)
        path = path.strip('/\\')
        # TODO: Change for url manipulation lib
        base_url = self.pool.get('ir.config_parameter').get_param(cr, uid,
                                                                  'web.base.url')
        return os.path.join(base_url, 'portal_public_documents', location, cr.dbname, path)

    def _get_public_path(self, cr, uid, ids, name, arg, context=None):
        if context is None:
            context = {}
        res = {}
        doc_brw = self.browse(cr, SUPERUSER_ID, ids, context=context)
        a_id = self._get_anonymous_id(cr, SUPERUSER_ID, ids, context=context)
        plocation = self.pool.get('ir.config_parameter').get_param(cr, uid,
                                                                   'ir_attachment.plocation')
        for d in doc_brw:
            if not d.store_fname:
                res[d.id] = False
            else:
                if d and d.user_id == a_id:
                    res[d.id] = self._full_url_plocation(
                        cr, uid, plocation, d.store_fname)
                else:
                    res[d.id] = False
        return res

    _columns = {
        'public_path': fields.function(_get_public_path, 'Public Path', method=True, store=False,
        fnct_inv=None, type='char', size=1024, fnct_search=None,
        help='''Public path for this file, if "Allow Public access is checked in the Folder and it
        is owned by Anonymous."'''),
    }

    def _full_path_plocation(self, cr, uid, location, path):
        # location = 'file:filestore'
        assert location.startswith(
            'file:'), "Unhandled filestore location %s" % location
        location = location[5:]

        # sanitize location name and path
        location = re.sub('[.]', '', location)
        location = location.strip('/\\')
        path = re.sub('[.]', '', path)
        path = path.strip('/\\')
        return os.path.join(addons.portal_public_documents.__path__[0], location, cr.dbname, path)

    def publish_document(self, cr, uid, ids, context=None):
        '''
        Make Public a list of attachments.
        '''
        a_brw = self._get_anonymous_id(cr, uid, ids, context=context)
        doc_brw = self.browse(cr, uid, ids, context=context)
        location = self.pool.get('ir.config_parameter').get_param(cr, uid,
                                                                  'ir_attachment.location')
        plocation = self.pool.get('ir.config_parameter').get_param(cr, uid,
                                                                   'ir_attachment.plocation')
        dict_write = a_brw and {'user_id': a_brw.id} or {}
        for d in doc_brw:
            if d.parent_id.publish:
                # Write in db first, if something happend, nothing happen
                d.write(dict_write, context=context)
                # TODO: This copy process must be done,
                # 1.- With an user different and secure.
                # 2.- Maybe this files will be accessed by a web-server too!
                # explain clearly in documentation how to do that.
                # 3.- Is secure use the same name?
                # 4.- TODO: Always is insecure be in touch of make public a file, maybe sincronize
                # with external tools like Gdocs, Dropbox or even put on a scp or ftp public server
                # is a better approach
                if not d.store_fname:
                    raise osv.except_osv(_('Security!'), 'Store Fname no setted Try to recreate'
                                         ' the file or use an export/import script to convert this'
                                         'file in a file saved on the file system. '
                                         '%s ' % d.store_fname)
                if not plocation:
                    raise osv.except_osv(_(
                        'Security!'), 'Public location not setted go to Setting')
                destiny = self._full_path_plocation(
                    cr, uid, plocation, d.store_fname)
                origin = self._full_path(cr, uid, location, d.store_fname)
                try:
                    dirname = os.path.dirname(destiny)
                    if not os.path.isdir(dirname):
                        os.makedirs(dirname)
                    copyfile(origin, destiny)
                except IOError:
                    _logger.error("Making public error writing from %s to %s" % (
                        origin, destiny))
                #(location and plocation) and shutil
            else:
                raise osv.except_osv(_('Security!'),
                                     _('You can not make public a File in a folder that is not '
                                       'explicitally marked as '
                                       '"Allowe Publish" it is happening sharing the file'
                                       '%s in the folder %s' % (d.name, d.parent_id.name)))
        return True

    def unpublish_document(self, cr, uid, ids, context=None):
        doc_brw = self.browse(cr, uid, ids, context=context)
        plocation = self.pool.get('ir.config_parameter').get_param(cr, uid,
                                                                   'ir_attachment.plocation')
        for d in doc_brw:
            dict_write = d.create_uid and {'user_id': d.create_uid.id} or {}
            super(ir_attachment, self).write(cr, uid, ids, dict_write, context)
            if not d.store_fname:
                raise osv.except_osv(_('Security!'), 'Store Fname no setted Try to recreate'
                                     ' the file or use an export/import script to convert this'
                                     'file in a file saved on the file system. '
                                     '%s ' % d.store_fname)
            if not plocation:
                raise osv.except_osv(_(
                    'Security!'), 'Public location not setted go to Setting')
            destiny = self._full_path_plocation(
                cr, uid, plocation, d.store_fname)
            try:
                os.remove(destiny)
            except IOError:
                _logger.error('I cant delete file %s' % destiny)
            except OSError:
                _logger.error('This file was already deleted. %s' % destiny)
        return True

    def unlink(self, cr, uid, ids, context=None):
        plocation = self.pool.get('ir.config_parameter').get_param(cr, uid,
                                                                   'ir_attachment.plocation')
        if plocation:
            for attach in self.browse(cr, uid, ids, context=context):
                destiny = self._full_path_plocation(
                    cr, uid, plocation, attach.store_fname)
                try:
                    os.remove(destiny)
                except IOError:
                    _logger.error('I cant delete file %s' % destiny)
                except OSError:
                    _logger.error(
                        'This file was already deleted. %s' % destiny)
        return super(ir_attachment, self).unlink(cr, uid, ids, context)

    def _file_write(self, cr, uid, location, value):
        return super(ir_attachment, self)._file_write(cr, uid, location, value)

    def write(self, cr, uid, ids, vals, context=None):
        self.check(cr, uid, ids, 'write', context=context, values=vals)
        for i in self.browse(cr, uid, ids, context=context):
            if i.public_path:
                self.unpublish_document(cr, uid, [i.id], context=context)
        return super(ir_attachment, self).write(cr, uid, ids, vals, context)
