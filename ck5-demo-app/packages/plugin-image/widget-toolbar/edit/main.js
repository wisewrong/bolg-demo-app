import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import EditCommand from './command';
import EditEditing from './editing';
import EditToolbarUI from './toolbar-ui';
import { TOOLBAR_NAME__IMAGE_EDIT } from '../../constant';

export default class ImageEdit extends Plugin {
  static get requires() {
    return [ EditCommand, EditEditing, EditToolbarUI ];
  }
  static get pluginName() {
   return TOOLBAR_NAME__IMAGE_EDIT;
  }
}
