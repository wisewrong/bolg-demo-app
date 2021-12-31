import { domParser } from "../util";
import "./dialog.less";

// 用于批量绑定/解绑事件
const EventMaps = {
  'closeButton': {
    selector: '.dialog-button_close',
    handleName: 'close',
  },
  'cancelButton': {
    selector: '.dialog-button_cancel',
    handleName: 'close',
  },
  'submitButton': {
    selector: '.dialog-button_submit',
    handleName: '_handleSubmit',
  },
  'mask': {
    selector: '.dialog-mask',
    handleName: 'close',
    verifier: 'maskEvent'
  }
}

export default class Dialog {
  constructor(props) {
    Object.assign(
      this,
      {
        container: "body", // querySelector 可接收的参数
        content: {}, // 内容对象 { title, body, classes }
        afterClose: () => {},
        beforeClose: () => {},
        onSubmit: () => {},
        maskEvent: true,  // 是否允许在点击遮罩时关闭弹窗
        width: '60%', // 弹窗宽度，需携带单位
      },
      props || {}
    );

    this.$container = document.querySelector(this.container);
    this.render();
  }

  render() {
    let config = {};
    if (typeof this.content === 'object') {
      config = this.content;
    } else {
      config.body = this.content;
    }

    this.$pop = domParser(template({
      ...config,
      width: this.width
    }));
    this.$container.appendChild(this.$pop);
    this._bind();
  }

  close() {
    typeof this.beforeClose === "function" && this.beforeClose();
    this.$pop.style.display = "none";
    this.destroy();
    typeof this.afterClose === "function" && this.afterClose();
  }

  destroy() {
    this._unbind();
    this.$pop && this.$pop.remove();
  }

  _bind() {
    for (const key in EventMaps) {
      const item = EventMaps[key];
      // 当存在检验器，且校验器为 falsy 时，不监听事件
      if (item.verifier && !this[item.verifier]) {
        continue;
      }
      this[key] = this.$pop.querySelector(item.selector);
      this[key].addEventListener("click", this[item.handleName].bind(this));
    }
  }

  _unbind() {
    for (const key in EventMaps) {
      const item = EventMaps[key];
      try {
        this[key] && this[key].removeEventListener("click", this[item.handleName].bind(this));
      } catch(err) {
        console.error('Dialog Unbind Error: ', err);
      }
    }
  }

  _handleSubmit() {
    typeof this.onSubmit === "function" && this.onSubmit();
    this.close();
  }
}

function template(config) {
  const { classes, title, body, width } = config || {};
  const cls =
    typeof classes === "string"
      ? classes
      : Array.isArray(classes)
      ? classes.join(" ")
      : "";

  return `
    <div class="dialog">
      <div class="dialog-main ${cls}" style="width:${width || "60%"};">
        <div class="dialog-header">
          <span class="dialog-title">${title || ""}</span>
          <span class="dialog-header-action">
            <button class="dialog-button dialog-button_close button-icon">X</button>
          </span>
        </div>
        <div class="dialog-content">
          ${body || ""}
        </div>
        <div class="dialog-footer">
          <button class="dialog-button dialog-button_cancel">取消</button>
          <button class="dialog-button button-primary dialog-button_submit">确认</button>
        </div>
      </div>
      <div class="dialog-mask"></div>
    </div>
  `;
}
