import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ToolbarUI from './toolbar-ui';
import BoldEditing from './editing';
import { COMMAND_NAME__BOLD } from './constant';

export default class Bold extends Plugin {
  static get requires() {
    return [ BoldEditing, ToolbarUI ];
  }
  static get pluginName() {
   return COMMAND_NAME__BOLD;
  }
}
