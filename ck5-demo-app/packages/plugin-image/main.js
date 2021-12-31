// main.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ToolbarUI from './toolbar-ui';
import Editing from './editing';
import WidgetToolbar from './widget-toolbar/toolbar';
import { TOOLBAR_NAME__IMAGE } from './constant';

import './index.less';

export default class Image extends Plugin {
  static get requires() {
    return [ Editing, ToolbarUI, WidgetToolbar ];
  }
  static get pluginName() {
   return TOOLBAR_NAME__IMAGE;
  }
}
