// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ImageEditCommand from "./command";
import { COMMAND_NAME__IMAGE_EDIT } from "../../constant";

export default class ImageEditEditing extends Plugin {
  init() {
    const editor = this.editor;
    const command = new ImageEditCommand(editor);
    editor.commands.add(COMMAND_NAME__IMAGE_EDIT, command);
  }
}
