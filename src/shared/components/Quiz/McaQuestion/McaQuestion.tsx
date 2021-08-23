import { Button, Col, Divider, Form, Row, Statistic } from 'antd';
import React from 'react';
import Mca from '@components/Quiz/Mca/Mca';
import './McaQuestion.less';

const { Countdown } = Statistic;

const McaQuestion = ({ quizName, questionIndex, totalQuestion, currentQuestion, handleCheckChange, handleSubmit, lastUpdate, disabled }: any) => {
  return (
    <>
      <Row justify={'space-between'}>
        <Col><span
          className={'mca-question__current-question'}>Question {questionIndex} of {totalQuestion}</span></Col>
        <Col><span className={'mca-question__test-name'}>{quizName}</span></Col>
        <Col><span className={'mca-question__report'}>Report a problem ?</span></Col>
      </Row>
      <Divider className="mca-question__divider"/>
      <Row>
        <Col style={{ paddingLeft: '15px' }}>
          <Form>

            <Mca question={currentQuestion} onCheckChange={handleCheckChange}
            />

            <Form.Item>
              <Form.Item style={{ display: 'inline-block' }}>
                <Button
                  size={'large'}
                  type={'primary'}
                  onClick={handleSubmit}
                  disabled={disabled}
                >
                  Submit & next
                </Button>
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginLeft: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>Question time remaining :</div>
                  <Countdown valueStyle={{ fontSize: '18px', fontWeight: 600 }}
                             value={(currentQuestion.expected_time) * 60 * 1000 + (lastUpdate)}
                             onFinish={handleSubmit}/>
                </div>
              </Form.Item>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </>
  );
};
export default McaQuestion;
