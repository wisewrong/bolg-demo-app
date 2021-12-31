import { domParser } from "../util";
import "./alert.less";

const POSITION_TOP = "28px";

export default class Alert {
  constructor(props) {
    Object.assign(
      this,
      {
        container: "body", // querySelector 可接收的参数
        type: "info", // info / success / warning / error
        text: "", // 提示文本，限定 String 类型
        duration: 3000,
      },
      props || {}
    );

    this.$container = document.querySelector(this.container);
    this.render();
  }

  render() {
    if (typeof this.text !== "string") {
      return;
    }
    const config = {
      type: this.type,
      text: this.text,
    };
    this.$alert = domParser(template(config));
    this.$container.appendChild(this.$alert);

    // 渐入动画
    setTimeout(() => {
      this.$alert.style.top = POSITION_TOP;
      this.$alert.style.opacity = 1;
    }, 0);

    // 一段时间后关闭
    const duration = Number(this.duration) || 3000;
    setTimeout(this.destory.bind(this), duration);
  }

  destory() {
    // 渐隐动画
    this.$alert.style.opacity = 0;
    let timer = setTimeout(() => {
      clearTimeout(timer);
      this.$alert.parentNode.removeChild(this.$alert);
    }, 300);
  }
}

function template(config) {
  const { type, text } = config;
  return `
    <div class="alert-box type-${type || "info"}">${text}</div>
  `;
}
