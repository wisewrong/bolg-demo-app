import React, { useContext } from "react";
import { Handle } from "react-flow-renderer";
import { MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import { FlowContext, Actions } from "../../context";

const renderMenu = ({ dispatch, ...node }) => {
  const edit = () => {
    dispatch({
      type: Actions.OPEN_MODAL,
      payload: {
        id: node.id,
        type: "relation",
      },
    });
  };
  const remove = () => {
    dispatch({
      type: Actions.REMOVE_FLOW_NODE,
      payload: node,
    });
  };
  return (
    <Menu>
      <Menu.Item key="1" onClick={edit}>
        编辑
      </Menu.Item>
      <Menu.Item key="2" onClick={remove}>
        删除
      </Menu.Item>
    </Menu>
  );
};

const RelationNode = (props) => {
  const { id, isConnectable = true } = props;
  const { dispatch, state } = useContext(FlowContext);
  const currentNode = state.flowData.get(id) || {};

  return (
    <div className="relation-node">
      <div className="relation-node-title">{currentNode.label}</div>
      <div className="relation-node-action">
        <Dropdown overlay={renderMenu({ ...props, dispatch })} trigger={["click"]}>
          <Button
            className="relation-node-btn"
            shape="circle"
            size="small"
            icon={<MoreOutlined />}
          />
        </Dropdown>
      </div>
      {/* 提供一个入口和一个出口 */}
      <Handle type="target" position="top" isConnectable={isConnectable} />
      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </div>
  );
};

export default React.memo(RelationNode);
