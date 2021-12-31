// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import inlineHighlight from '@ckeditor/ckeditor5-typing/src/utils/inlinehighlight';
import LinkCommand from "./command";
import {
  SCHEMA_NAME__LINK,
  COMMAND_NAME__LINK,
} from "./constant";

const HIGHLIGHT_CLASS = 'ck-link_selected';

export default class LinkEditing extends Plugin {
  static get pluginName() {
    return "LinkEditing";
  }

  init() {
    const editor = this.editor;

    this._defineSchema();
    this._defineConverters();

    // COMMAND_NAME__LINK -> 'link'
    editor.commands.add(COMMAND_NAME__LINK, new LinkCommand(editor));

    // 当光标位于 link 中间，追加 class，用于高亮当前超链接
    inlineHighlight(editor, SCHEMA_NAME__LINK, "a", HIGHLIGHT_CLASS);
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.extend("$text", {
      // SCHEMA_NAME__LINK -> 'linkHref'
      allowAttributes: SCHEMA_NAME__LINK,
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("downcast").attributeToElement({
      model: SCHEMA_NAME__LINK,
      // attributeToElement 方法中，如果 view 是一个函数，其第一个参数是对应的属性值，在这里就是超链接的 url
      // 实际项目中需要校验 url 的真实性，这里就省略掉了
      view: createLinkElement,
    });

    conversion.for("upcast").elementToAttribute({
      view: {
        name: "a",
        attributes: {
          href: true,
        },
      },
      model: {
        key: SCHEMA_NAME__LINK,
        value: (viewElement) => viewElement.getAttribute("href"),
      },
    });
  }
}

function createLinkElement(href, { writer }) {
  return writer.createAttributeElement("a", { href });
}
