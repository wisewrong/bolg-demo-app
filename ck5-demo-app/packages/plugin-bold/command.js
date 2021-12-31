// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import { SCHEMA_NAME__BOLD } from "./constant";

export default class BoldCommand extends Command {
  constructor(editor) {
    super(editor);
    this.attributeKey = SCHEMA_NAME__BOLD;
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;

    // 如果选中的文本含有 bold 属性，设置 value 为 true，
    // 由于已在 toolbar-ui 中关联，当 value 为 true 时会高亮工具栏按钮
    this.value = this._getValueFromFirstAllowedNode();

    // 校验选中的 Schema 是否允许 bold 属性，若不允许则禁用按钮
    this.isEnabled = model.schema.checkAttributeInSelection(
      selection,
      this.attributeKey
    );
  }

  execute() {
    const model = this.editor.model;
    const selection = model.document.selection;

    const value = !this.value;

    // 对选中文本设置 bold 属性
    model.change((writer) => {
      if (selection.isCollapsed) {
        if (value) {
          writer.setSelectionAttribute(this.attributeKey, true);
        } else {
          writer.removeSelectionAttribute(this.attributeKey);
        }
      } else {
        const ranges = model.schema.getValidRanges(
          selection.getRanges(),
          this.attributeKey
        );

        for (const range of ranges) {
          if (value) {
            writer.setAttribute(this.attributeKey, value, range);
          } else {
            writer.removeAttribute(this.attributeKey, range);
          }
        }
      }
    });
  }

  _getValueFromFirstAllowedNode() {
    const model = this.editor.model;
    const schema = model.schema;
    const selection = model.document.selection;

    // 如果选中的是闭合标签，检查是否含有 bold 属性
    if (selection.isCollapsed) {
      return selection.hasAttribute(this.attributeKey);
    }

    // 对于非闭合标签，通过 range 确认是否含有 bold 属性
    for (const range of selection.getRanges()) {
      for (const item of range.getItems()) {
        if (schema.checkAttribute(item, this.attributeKey)) {
          return item.hasAttribute(this.attributeKey);
        }
      }
    }

    return false;
  }
}
