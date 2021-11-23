import React, { useContext } from 'react';
import { FlowContext} from '../../context';

export default function RelationNodeForm() {
  const { state } = useContext(FlowContext);
  const { flowData, modalConfig } = state;

  const currentNode = flowData.get(modalConfig.nodeId);

  return <div>RelationNodeForm {currentNode?.label}</div>;
}
