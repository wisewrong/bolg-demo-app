// toolbar-ui.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import imageIcon from "@ckeditor/ckeditor5-core/theme/icons/image.svg";
import {
  COMMAND_NAME__IMAGE,
  TOOLBAR_NAME__IMAGE,
  TOOLBAR_LABEL__IMAGE,
} from "./constant";

import ImageForm from "./form/image-form";

export default class ImageToolbarUI extends Plugin {
  init() {
    this._createToolbarButton();
  }

  _createToolbarButton() {
    const editor = this.editor;
    const imageCommand = editor.commands.get(COMMAND_NAME__IMAGE);

    editor.ui.componentFactory.add(TOOLBAR_NAME__IMAGE, (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: TOOLBAR_LABEL__IMAGE,
        tooltip: true,
        icon: imageIcon,
        class: "toolbar_button_image",
      });

      view.bind("isEnabled").to(imageCommand, "isEnabled");
      view.bind("isOn").to(imageCommand, "value", (value) => !!value);

      this.listenTo(view, "execute", () => {
        this._openDialog(imageCommand.value);
      });
      return view;
    });
  }

  _openDialog(value) {
    // const mock = {
    //   src: "//t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF",
    //   title: "测试图片",
    // };
    // this.editor.execute(COMMAND_NAME__IMAGE, mock);
    // return;

    new ImageForm({
      value,
      onSubmit: (data) => {
        this.editor.execute(COMMAND_NAME__IMAGE, data);
      },
    });
  }
}
