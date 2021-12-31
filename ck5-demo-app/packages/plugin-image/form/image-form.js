import Dialog from '../../UI/dialog/dialog';
import './image-form.less';

export default class imageForm {
  constructor(props) {
    Object.assign(
      this,
      {
        initialValue: undefined, // 初始值
        onSubmit: () => {},
      },
      props || {}
    );

    this.render();
  }

  render() {
    const content = template(this.initialValue || {});
    this.$form = new Dialog({
      content,
      width: '420px',
      onSubmit: this._submit.bind(this),
    });
  }

  // 提交表单数据，返回 { name, value, id }
  _submit() {
    if (typeof this.onSubmit !== 'function') {
      return
    }

    const dialog = this.$form.$pop;
    const data = {};

    ['src', 'title'].forEach(key => {
      const inputName = `image${titleCase(key)}`;
      const input = dialog.querySelector(`input[name=${inputName}]`) || {};
      data[key] = input.value;
    });

    return this.onSubmit(data);
  }
}



function template(initialValue) {
  const items = [{
    label: '图片名称',
    value: initialValue.title || '',
    name: 'imageTitle',
  }, {
    label: '图片地址',
    value: initialValue.src || '',
    name: 'imageSrc',
  }];
  const itemsTemplate = items.map(item => formItem(item))
  const body = `
    <div class="image-form__main">
      ${itemsTemplate.join('')}
    </div>
  `;
  return {
    classes: 'image-form-dialog',
    title: '插入图片',
    body,
  }
}

function formItem({ label, value, name }) {
  return `
  <div class="image-form__item">
    <label class="image-form__item-label">${label || ''}</label>
    <div class="image-form__item-content">
      <input type="text" class="image-form__item-input" value="${value || ''}" name="${name}" />
    </div>
  </div>
  `
}

function titleCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
