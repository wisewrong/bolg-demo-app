// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import { createImageViewElement, createImageModel } from './util';
import ImageCommand from "./command";
import {
  SCHEMA_NAME__IMAGE,
  COMMAND_NAME__IMAGE,
  CUSTOM_PROPERTY__IMAGE,
  IMAGE_CLASS,
  IMAGE_CONFIG,
} from "./constant";

export default class ImageEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  static get pluginName() {
    return "ImageEditing";
  }

constructor(editor) {
  super(editor);

  // 配置 IMAGE_CONFIG 的缺省值
  editor.config.define(IMAGE_CONFIG, {});

  // 通过 get 方法
  this.imageConfig = editor.config.get(IMAGE_CONFIG);
}

  init() {
    const editor = this.editor;

    this._defineSchema();
    this._defineConverters();

    editor.commands.add(COMMAND_NAME__IMAGE, new ImageCommand(editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    // SCHEMA_NAME__IMAGE --> "image"
    schema.register(SCHEMA_NAME__IMAGE, {
      isObject: true,
      isBlock: true,
      allowWhere: "$block",
      allowAttributes: ["src", "title"],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("editingDowncast").elementToElement({
      model: SCHEMA_NAME__IMAGE,
      view: (element, { writer }) => {
        const widgetElement = createImageViewElement(element, writer, this.imageConfig);
        writer.setCustomProperty(CUSTOM_PROPERTY__IMAGE, true, widgetElement);
        return toWidget(widgetElement, writer);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: SCHEMA_NAME__IMAGE,
      view: (element, { writer }) =>
        createImageViewElement(element, writer, this.imageConfig),
    });

    conversion.for("upcast").elementToElement({
      view: {
        name: "figure",
        classes: IMAGE_CLASS,
      },
      model: createImageModel,
    });
  }
}
