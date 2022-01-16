import React from 'react';
import './Settings.less';
import { Button, Checkbox, Form, Input, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionTest } from '@redux/actions';
import { useParams } from 'react-router-dom';

function Settings() {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { idTest } = useParams();
  const test = useSelector((state: any) => state.test.test);

  const handleSubmit = (e: any) => {
    dispatch(actionTest.updateTest(idTest, e));
  };
  return (
    <div>
      <Form
        onFinish={handleSubmit}
        labelCol={{
          span: 4
        }}
        initialValues={test}
        colon={false}
        labelAlign="left"
      >
        <Form.Item
          name="name"
          label={
            <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
              Name<span>*</span>
            </label>
          }
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
              Description
            </label>
          }
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Settings;
