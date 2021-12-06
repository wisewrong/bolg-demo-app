import React, { useContext, useEffect, useImperativeHandle } from "react";
import { Input, Form } from "antd";
import { FlowContext, Actions } from "../../context";

function RelationNodeForm(props, ref) {
  const { state, dispatch } = useContext(FlowContext);
  const { flowData, modalConfig } = state;
  const [form] = Form.useForm();

  const initialValues = flowData.get(modalConfig.nodeId) || {};

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  useImperativeHandle(ref, () => ({
    // 将 submit 方法暴露给父组件
    submit: () => {
      return form
        .validateFields()
        .then((values) => {
          dispatch({
            type: Actions.SET_FLOW_NODE,
            payload: {
              id: modalConfig.nodeId,
              ...values,
            },
          });
        })
        .catch((err) => {
          return false;
        });
    },
  }));

  useEffect(() => {
    form.resetFields();
  }, [modalConfig.nodeId, form]);

  return (
    <Form {...layout} form={form} initialValues={initialValues}>
      <Form.Item
        label="名称"
        name="label"
        rules={[{ required: true, message: "节点名称不能为空" }]}
      >
        <Input placeholder="请输入节点名称" maxLength={20} />
      </Form.Item>
      <Form.Item label="描述" name="remark">
        <Input placeholder="请输入节点的描述信息" />
      </Form.Item>
    </Form>
  );
}

export default React.forwardRef(RelationNodeForm);
