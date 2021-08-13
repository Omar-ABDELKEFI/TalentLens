import React, { ChangeEvent, useState } from 'react';
import { Row, Col, InputNumber, Button, Select, Modal, Card, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { actionTest } from '@redux/actions';
import './ModelQuestionTypes.less'
import { Link, useParams } from 'react-router-dom';
import mca from '../../../../assets/img/mca.png';

function ModelQuestionTypes({ isModalVisible, setIsModalVisible }: any) {


  // const [valuesCandidate, setValuesCandidate] = useState<any>([])
  const [emails, setEmails] = useState<string[]>([]);
  const { Option } = Select;
  const dispatch = useDispatch();
  const { idTest } = useParams();


  console.log(emails, 'emails');
  const handleOk = () => {
    if (emails.length > 0) {
      const valueCandidate = emails.map((email => {
        return { 'email': email, 'test': [{ id: Number(idTest) }] };
      }));
      console.log(valueCandidate, 'valueCandidate');
      dispatch(actionTest.create_candidate(valueCandidate));
    }
    setIsModalVisible(false);
  };
  console.log(isModalVisible, 'isModalVisibleisModalVisible');
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Grid } = Card;
  return (
    <>
      <Modal title="add candidate" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1200}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages and add different test cases to validate candidate solutions</p>
              <Link to={'/questions/edit'}><Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice Question </Button></Link>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice Question </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice Question </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice Question </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice Question </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice Question </Button>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  )
    ;
}

export default ModelQuestionTypes;
