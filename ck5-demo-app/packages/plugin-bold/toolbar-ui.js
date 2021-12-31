import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import boldIcon from "@ckeditor/ckeditor5-basic-styles/theme/icons/bold.svg";
import { COMMAND_NAME__BOLD, COMMAND_LABEL__BOLD } from "./constant";

export default class BoldToolbarUI extends Plugin {
  init() {
    this._createToolbarButton();
  }

  _createToolbarButton() {
    const editor = this.editor;
    const command = editor.commands.get(COMMAND_NAME__BOLD);
    editor.ui.componentFactory.add(COMMAND_NAME__BOLD, (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: COMMAND_LABEL__BOLD,
        tooltip: true,
        icon: boldIcon,
        // withText: true, // 在按钮上展示 label
        class: "toolbar_button_bold",
      });
      // 将按钮的状态关联到命令
      view.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
      // 点击按钮时触发相应命令
      this.listenTo(view, "execute", () => editor.execute(COMMAND_NAME__BOLD));
      return view;
    });
  }
}
