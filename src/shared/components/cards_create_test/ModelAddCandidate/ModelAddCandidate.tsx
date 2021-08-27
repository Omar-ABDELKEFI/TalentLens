import React, {ChangeEvent, useState} from 'react';
import { Row, Col, Slider, InputNumber, Button, Select, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {actionTest} from "@redux/actions";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/style.css";
import {useParams} from "react-router-dom";

function ModelAddCandidates({isModalVisible,setIsModalVisible}:any) {
  const [emails,setEmails]=useState<string[]>([])
  const {Option} =Select
  const dispatch = useDispatch()
  const {idTest} = useParams();

  const time_limit = useSelector(((state:any) => state.test.test.time_limit))
  function handleChange(value:any) {
    dispatch(actionTest.updateTest(idTest, { time_limit:value }))
  }
  console.log(emails,"emails");
  const handleOk = () => {
    if(emails.length>0){
      const valueCandidate=emails.map((email => {
        return {"email":email,"test": [{id: Number(idTest)}]}
      }))
      console.log(valueCandidate,"valueCandidate");
      dispatch(actionTest.setCandidates(valueCandidate))
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
          <Modal title="add candidate"  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={700}>
            <Form
                  labelCol={{
                    sm: {span: 6, offset: 0}
                  }}
                  colon={false}
                  labelAlign="left"
                  size="middle"
            >
              <Form.Item
                label={<label style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Emails<span>*</span></label>}>
                <ReactMultiEmail
                  style={{ minHeight: '75px' }}
                  placeholder="Input candidates emails"
                  emails={emails}
                  onChange={(_emails: string[]) => {
                    setEmails( _emails);
                  }}
                  getLabel={(
                    email: string,
                    index: number,
                    removeEmail: (index: number) => void
                  ) => {
                    return (
                      <div data-tag key={index}>
                        {email}
                        <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
                      </div>
                    );
                  }}
                />
              </Form.Item>
              <Form.Item
                label={<label
                  style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Time limit</label>}>
                <Select defaultValue={time_limit} style={{ width: 120 }} onChange={handleChange}>
                  <Option value={1}>1 day</Option>
                  <Option value={3}>3 days</Option>
                  <Option value={5}>5 days</Option>
                  <Option value={7}>7 days</Option>
                  <Option value={14}>14 days</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
    </>
  )
    ;
}

export default ModelAddCandidates;
