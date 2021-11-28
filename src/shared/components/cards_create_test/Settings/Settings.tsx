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
      <Form onFinish={handleSubmit}
            labelCol={{
              span: 4
            }}
            initialValues={test}
            colon={false}
            labelAlign="left"
      >
        <Form.Item
          name="name"
          label={<label
            style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>Name<span>*</span></label>}>
          <Input placeholder="Name"/>
        </Form.Item>
        <Form.Item
          name="description"
          label={<label
            style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>Description</label>}>
          <Input/>
        </Form.Item>
        <Form.Item
          name="notify_emails"
          label={<label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}
                        placeholder="Enter e-mail addresses of those you want to notify when a candidate finishes this test.">Notify
            to <span className={'settings__break'}>E-mails</span></label>}>
          <TextArea rows={2}/>
        </Form.Item>
        <Form.Item
          name="timing_policy"
          label={<label
            style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>Timing <span className={'settings__break'}>Policy</span></label>}>
          <Radio.Group
          >
            <Space direction="vertical">
              <Radio value={'Strict'}>Srict: enforce the expacted limit</Radio>
              <Radio value={'Medium'}>Add an extra 50% time buffer</Radio>
              <Radio value={'Relaxed'}>Relaxed: Add an extra 200% time buffer</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name="show_score"
          label={<label
            style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>final Score</label>}>
          <Checkbox>Show to
            candidates</Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Settings;
