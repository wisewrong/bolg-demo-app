// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import findAttributeRange from "@ckeditor/ckeditor5-typing/src/utils/findattributerange";
import { SCHEMA_NAME__LINK } from "./constant";

export default class LinkCommand extends Command {
  refresh() {
    const model = this.editor.model;
    const doc = model.document;

    // 将链接关联到到 value
    this.value = doc.selection.getAttribute(SCHEMA_NAME__LINK);
    // 根据 editing.js 中定义的 schema 规则来维护按钮的禁用/启用状态
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      SCHEMA_NAME__LINK
    );
  }

  execute(href) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change((writer) => {
      // 选区的锚点和焦点是否位于同一位置
      if (selection.isCollapsed) {
        const position = selection.getFirstPosition();

        // 光标位于 link 中间
        if (selection.hasAttribute(SCHEMA_NAME__LINK)) {
          const range = findAttributeRange(
            position,
            SCHEMA_NAME__LINK,
            selection.getAttribute(SCHEMA_NAME__LINK),
            model
          );
          this._handleLink(writer, href, range)
        }
      } else {
        const ranges = model.schema.getValidRanges(
          selection.getRanges(),
          SCHEMA_NAME__LINK
        );
        for (const range of ranges) {
          this._handleLink(writer, href, range)
        }
      }
    });
  }

  _handleLink(writer, href, range) {
    if (href) {
      writer.setAttribute(SCHEMA_NAME__LINK, href, range);
    } else {
      writer.removeAttribute(SCHEMA_NAME__LINK, range);
    }
  }
}
