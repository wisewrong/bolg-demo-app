import {
  findOptimalInsertionPosition,
  isWidget,
} from "@ckeditor/ckeditor5-widget/src/utils";
import {
  IMAGE_CLASS,
  SCHEMA_NAME__IMAGE,
  CUSTOM_PROPERTY__IMAGE,
} from "./constant";

export function insertImage(model, attributes = {}) {
  if (!attributes || !attributes.src) {
    return;
  }

  model.change((writer) => {
    const imageElement = writer.createElement(SCHEMA_NAME__IMAGE, attributes);
    // 使用 findOptimalInsertionPosition 方法来获取最佳位置
    // 如果某个选择位于段落的中间，则将返回该段落之前的位置，不拆分当前段落
    // 如果选择位于段落的末尾，则将返回该段落之后的位置
    const insertAtSelection = findOptimalInsertionPosition(
      model.document.selection,
      model
    );
    model.insertContent(imageElement, insertAtSelection);
  });
}

// 根据 Model 创建图片 View
export function createImageViewElement(element, writer, imageConfig) {
  // 获取用户配置的 className
  const { className } = imageConfig || {};

  // 使用 createContainerElement 创建容器元素
  const figure = writer.createContainerElement("figure", {
    class: `${IMAGE_CLASS} ${className || ""}`,
  });

  // 使用 createEmptyElement 创建 img 标签，并设置属性
  const imageElement = writer.createEmptyElement("img");
  ["src", "title"].map((k) => {
    writer.setAttribute(k, element.getAttribute(k), imageElement);
  });

  // 将 img 作为子节点插入到 figure
  writer.insert(writer.createPositionAt(figure, 0), imageElement);
  return figure;
}

// 根据 View 创建图片 Model
export function createImageModel(view, { writer }) {

  const params = {};
  const imageInner = view.getChild(0);

  ["src", "title"].map((k) => {
    params[k] = imageInner.getAttribute(k);
  });

  return writer.createElement(SCHEMA_NAME__IMAGE, params);
}

export function getSelectedImageWidget(selection) {
  const viewElement = selection.getSelectedElement();

  if (viewElement && isImageWidget(viewElement)) {
    return viewElement;
  }

  return null;
}

export function isImageWidget(viewElement) {
  return (
    !!viewElement && viewElement.getCustomProperty(CUSTOM_PROPERTY__IMAGE) &&
    isWidget(viewElement)
  );
}
