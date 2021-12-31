import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { TOOLBAR_NAME__IMAGE_EDIT, TOOLBAR_LABEL__IMAGE_EDIT } from "../../constant";

export default class ImageEditToolbarUI extends Plugin {
  init() {
    this._createToolbarButton();
  }

  _createToolbarButton() {
    const editor = this.editor;
    const command = editor.commands.get(TOOLBAR_NAME__IMAGE_EDIT);

    editor.ui.componentFactory.add(TOOLBAR_NAME__IMAGE_EDIT, (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: TOOLBAR_LABEL__IMAGE_EDIT,
        tooltip: true,
        withText: true, // 在按钮上展示 label
        class: "toolbar_button_image-edit",
      });
      view.bind("isEnabled").to(command, "isEnabled");
      this.listenTo(view, "execute", () => editor.execute(TOOLBAR_NAME__IMAGE_EDIT));

      return view;
    });
  }
}
