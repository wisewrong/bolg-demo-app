import React, { useContext } from 'react';
import { Modal } from 'antd';
import RelationNodeForm from './RelationNodeForm';
import { FlowContext, Actions } from '../../context';

const componentsMap = {
  relation: RelationNodeForm,
};

export default function FlowModal() {
  const { state, dispatch } = useContext(FlowContext);
  const { modalConfig } = state;

  const handleOk = () => dispatch({ type: Actions.CLOSE_MODAL });

  const handleCancel = () => dispatch({ type: Actions.CLOSE_MODAL });

  const Component = componentsMap[modalConfig.nodeType];

  return (
    <Modal
      title="编辑节点"
      visible={modalConfig.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {Component && <Component />}
    </Modal>
  );
}
