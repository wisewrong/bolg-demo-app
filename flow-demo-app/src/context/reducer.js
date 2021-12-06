// context/reducer.js
import { removeElements } from "react-flow-renderer";
import * as Actions from "./actions";

// 保存画布实例
const setInstance = (state, reactFlowInstance) => ({
  ...state,
  reactFlowInstance,
});

// 设置节点/连线数据
const setElements = (state, elements) => ({
  ...state,
  elements: Array.isArray(elements) ? elements : [],
});

// 保存节点配置信息
const setFlowNode = (state, node) => {
  const nodeId = node?.id;
  if (!nodeId) return state;
  state.flowData.set(nodeId, node);
  return state;
};

// 删除节点，同时删除节点配置信息
const removeFlowNode = (state, node) => {
  const { id } = node;
  const { flowData } = state;
  const res = { ...state };

  if (flowData.get(id)) {
    flowData.delete(id);
    res.elements = removeElements([node], state.elements);
  }
  return res;
};

const openModal = (state, node) =>
  node?.id
    ? {
        ...state,
        modalConfig: {
          visible: true,
          nodeType: node.type,
          nodeId: node.id,
        },
      }
    : state;

const closeModal = (state) => ({
  ...state,
  modalConfig: {
    visible: false,
    nodeType: "",
    nodeId: "",
  },
});

// 管理所有处理函数
const handlerMap = {
  [Actions.SET_INSTANCE]: setInstance,
  [Actions.SET_FLOW_NODE]: setFlowNode,
  [Actions.REMOVE_FLOW_NODE]: removeFlowNode,
  [Actions.OPEN_MODAL]: openModal,
  [Actions.CLOSE_MODAL]: closeModal,
  [Actions.SET_ELEMENTS]: setElements,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  const handler = handlerMap[type];
  const res = typeof handler === "function" && handler(state, payload);
  return res || state;
};

export default reducer;
