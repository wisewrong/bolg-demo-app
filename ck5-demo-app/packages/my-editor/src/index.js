// packages/my-editor/src/index.js

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading";
// import Link from "@ckeditor/ckeditor5-link/src/link";
// import List from "@ckeditor/ckeditor5-list/src/list";

// 调试器
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
// 自定义插件
import Bold from "@plugin/plugin-bold/main";
import Link from "@plugin/plugin-link/main";
import Image from "@plugin/plugin-image/main";

export default class MyEditor {
  constructor(props) {
    Object.assign(
      this,
      {
        id: "editor",
      },
      props
    );
    this.render();
  }

  render() {
    ClassicEditor.create(document.querySelector(`#${this.id}`), {
      plugins: [
        Essentials,
        Paragraph,
        Bold,
        Link,
        Image,
      ],
      toolbar: [
        "undo",
        "redo",
        "|",
        Bold.pluginName,
        Link.pluginName,
        Image.pluginName,
      ],
      initialData: this.content,
      // 'imageConfig' --> IMAGE_CONFIG
      imageConfig: {
        className: 'wise-wrong'
      }
    })
      .then((editor) => {
        CKEditorInspector.attach( editor );
        this.editor = editor;
      })
      .catch((error) => {
        console.error(error.stack);
      });
  }
}
