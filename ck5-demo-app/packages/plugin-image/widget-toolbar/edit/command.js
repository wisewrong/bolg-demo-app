import Command from "@ckeditor/ckeditor5-core/src/command";
import { insertImage } from "../../util";
import { COMMAND_NAME__IMAGE } from "../../constant";
import ImageForm from "../../form/image-form";

export default class ImageEditCommand extends Command {
  constructor(editor) {
    super(editor);
  }

  refresh() {
    const element = this.editor.model.document.selection.getSelectedElement();
    this.isEnabled = !!element && element.is("element", COMMAND_NAME__IMAGE);
  }

  execute() {
    const model = this.editor.model;
    const viewElement = model.document.selection.getSelectedElement();
    const attributes = viewElement.getAttributes();

    // 获取当前图片的参数
    const initialValue = [...attributes].reduce(
      (obj, [key, value]) => ((obj[key] = value), obj),
      {}
    );

    // 打开弹窗，编辑图片信息
    this.$form = new ImageForm({
      initialValue,
      onSubmit: this._handleEditImage.bind(this),
    });
  }

  _handleEditImage(data) {
    const model = this.editor.model;
    const imageElement = model.document.selection.getSelectedElement();

    model.change((writer) => {
      writer.remove(imageElement);
      insertImage(model, data)
    });
  }
}
