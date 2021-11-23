// Graph/index.jsx

import React, { useState, useRef, useContext } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
} from 'react-flow-renderer';
import RelationNode from '../components/Node/RelationNode';
import { FlowContext, Actions } from '../context';

function getHash(len) {
  let length = Number(len) || 8;
  const arr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  const al = arr.length;
  let chars = '';
  while (length--) {
    chars += arr[parseInt(Math.random() * al, 10)];
  }
  return chars;
}

export default function FlowGraph(props) {
  const { state, dispatch } = useContext(FlowContext);
  const { elements } = state;
  // 画布的 DOM 容器，用于计算节点坐标
  const graphWrapper = useRef(null);
  // 画布实例
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const setElements = (els) => {
    dispatch({
      type: Actions.SET_ELEMENTS,
      payload: els,
    });
  };

  // 自定义节点
  const nodeTypes = {
    relation: RelationNode,
  };

  // 画布加载完毕，保存当前画布实例
  const onLoad = (instance) => setReactFlowInstance(instance);
  // 连线
  const onConnect = (params) => setElements(addEdge(params, elements));

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = graphWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getHash(),
      type,
      position,
      data: { label: `${type} node` },
    };
    dispatch({
      type: Actions.SET_FLOW_NODE,
      payload: {
        id: newNode.id,
        ...newNode.data,
      },
    });
    setElements(elements.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="graph" ref={graphWrapper}>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
