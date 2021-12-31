import Editor from "../packages/my-editor/src/index";

const content = `<p>wise&nbsp;<strong>wrong</strong>&nbsp;<a href="wise">hello</a>&nbsp;<strong>world</strong></p><figure class="ck-image wise-test"><img src="//t7.baidu.com/it/u=2621658848,3952322712&amp;fm=193&amp;f=GIF" title="测试图片"></figure>`

function render() {
  return new Editor({
    id: "editor-area",
    content,
  })
}

function _bind($editor) {
  const submitBtn = document.getElementById("submit");
  submitBtn.onclick = function () {
    const val = $editor.editor && $editor.editor.getData();
    console.log("editorGetValue", val);
  };
};

const editor = render();
_bind(editor);
