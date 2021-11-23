// context/reducer.js
import { removeElements } from 'react-flow-renderer';
import * as Actions from './actions';

const setElements = (state, elements) => ({
  ...state,
  elements: Array.isArray(elements) ? elements : [],
});

const setFlowNode = (state, node) => {
  if (!node || !node.id) return state;
  const nodeId = node.id;
  const res = { ...state };
  res.flowData.set(nodeId, node);
  return res;
};

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
    nodeType: '',
    nodeId: '',
  },
});

// 管理所有处理函数
const handlerMap = {
  [Actions.SET_FLOW_NODE]: setFlowNode,
  [Actions.REMOVE_FLOW_NODE]: removeFlowNode,
  [Actions.OPEN_MODAL]: openModal,
  [Actions.CLOSE_MODAL]: closeModal,
  [Actions.SET_ELEMENTS]: setElements,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  const handler = handlerMap[type];
  const res = typeof handler === 'function' && handler(state, payload);
  return res || state;
};

export default reducer;
