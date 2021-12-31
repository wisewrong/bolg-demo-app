// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import { insertImage } from "./util";

export default class LinkCommand extends Command {
  refresh() {
    const model = this.editor.model;
    const selectedContent = model.getSelectedContent(model.document.selection);
    this.isEnabled = selectedContent.isEmpty;
  }

  execute(data) {
    const model = this.editor.model;
    insertImage(model, data);
  }
}
