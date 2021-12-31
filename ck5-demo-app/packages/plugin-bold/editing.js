// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import BoldCommand from "./command";
import { COMMAND_NAME__BOLD, SCHEMA_NAME__BOLD } from "./constant";

export default class BoldEditing extends Plugin {
  static get pluginName() {
    return "BoldEditing";
  }
  init() {
    const editor = this.editor;

    this._defineSchema();
    this._defineConverters();

    // 注册一个 BoldCommand 命令
    editor.commands.add(COMMAND_NAME__BOLD, new BoldCommand(editor));
  }

  // 注册 schema
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.extend("$text", { allowAttributes: SCHEMA_NAME__BOLD });
  }

  // 定义转换器
  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.attributeToElement({
      model: SCHEMA_NAME__BOLD,
      view: "strong",
      upcastAlso: ["b"],
    });
  }
}
