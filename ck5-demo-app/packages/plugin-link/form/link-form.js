import Dialog from "../../UI/dialog/dialog";
import "./link-form.less";

export default class LinkForm {
  constructor(props) {
    Object.assign(
      this,
      {
        value: undefined, // 初始值
        onSubmit: () => {},
      },
      props || {}
    );

    this.render();
  }

  render() {
    const content = template(this.value);
    this.$form = new Dialog({
      content,
      width: "420px",
      onSubmit: this._submit.bind(this),
    });

    const dialog = this.$form.$pop;
    this.$input = dialog.querySelector(`input[name=linkValue]`);
    this.$cleanButton = dialog.querySelector(".link-form-button");

    this._bind();
  }

  destroy() {
    this._unbind();
  }

  _bind() {
    this.$cleanButton.addEventListener("click", this._handleCleanup.bind(this));
  }

  _unbind() {
    try {
      this.$cleanButton.removeEventListener(
        "click",
        this._handleCleanup.bind(this)
      );
    } catch (e) {
      console.error("LinkForm Unbind Error: ", e);
    }
  }

  _submit() {
    if (typeof this.onSubmit !== "function") {
      return;
    }

    return this.onSubmit(this.$input.value);
  }

  _handleCleanup() {
    this.$input.value = "";
  }
}

function template(initialValue) {
  const body = `
    <div class="link-form">
      <input
        placeholder="插入链接为空时取消超链接"
        type="text"
        class="link-form-input"
        name="linkValue"
        value="${initialValue || ""}"
      />
      <span title="清空" class="link-form-button">X</span>
    </div>
  `;

  return {
    classes: "link-form-dialog",
    title: "插入超链接",
    body,
  };
}
