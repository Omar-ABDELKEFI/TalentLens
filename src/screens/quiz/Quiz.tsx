import React, { useEffect, useState } from 'react';
import Mca from '@components/Quiz/Mca/Mca';
import { Button, Col, Divider, Form, Row, Statistic } from 'antd';
import './Quiz.less';
import service from '@service/test-api';
import { createResult, getQuiz, updateCurrentQuestion } from '@redux/actions/quiz';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const { Countdown } = Statistic;
const Quiz = () => {
  const quiz = useSelector((state: any) => state.quiz.quiz);
  const dispatch = useDispatch();
  const { idTestCandidate } = useParams();
  const isLoading = useSelector((state: any) => state.quiz.loadingQuiz);
  const currentQuestion = useSelector((state:any ) => state.quiz.testInfo.current_question)

  useEffect(() => {
    dispatch(getQuiz(idTestCandidate));

  }, []);

  const [answer, setAnswer] = useState<any>();
  const handleSubmit = () => {
    const apiAnswer = {
      ...answer,
      question_id: quiz.questions[currentQuestion].ID
    };
    service.answers.answersCreate(idTestCandidate, apiAnswer).then(
      (res: any) => {
        const questionNumber = currentQuestion + 1;
        if (questionNumber !== quiz.questions.length) {
          dispatch(updateCurrentQuestion(idTestCandidate,{current_question:questionNumber}))
        } else {
          dispatch(createResult(idTestCandidate));
        }      },
      (res: any) => {
        console.log(res.error);
      }
    );

  };
  const handleCheckChange = (values: any) => {
    const checkedAnswers = values.map((choice: any) => {
      return { choices_id: choice };
    });
    setAnswer({ ...answer, answer_choices: checkedAnswers });
  };
  return (
    <>
      {isLoading ? <></> :
        <div className={'quiz__container'}>
          <Row justify={'space-between'}>
            <Col><span
              className={'quiz__current-question'}>Question {currentQuestion + 1} of {quiz.questions.length}</span></Col>
            <Col><span className={'quiz__test-name'}>{quiz.name}</span></Col>
            <Col><span className={'quiz__report'}>Report a problem ?</span></Col>
          </Row>
          <Divider className="quiz__divider"/>
          <Row>
            <Col style={{ paddingLeft: '15px' }}>
              <Form>

                <Mca question={quiz.questions[currentQuestion]} onCheckChange={handleCheckChange}
                />

                <Form.Item>
                  <Form.Item style={{ display: 'inline-block' }}>
                    <Button
                      size={'large'}
                      type={'primary'}
                      onClick={handleSubmit}
                    >
                      Submit & next
                    </Button>
                  </Form.Item>
                  <Form.Item style={{ display: 'inline-block', marginLeft: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>Question time remaining :</div>
                      <Countdown valueStyle={{ fontSize: '18px', fontWeight: 600 }}
                                 value={quiz.questions[currentQuestion].expected_time * 60 * 1000 + Date.now()}
                                 onFinish={handleSubmit}/>
                    </div>
                  </Form.Item>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      }</>
  );
};

export default Quiz;