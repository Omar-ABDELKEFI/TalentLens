import React, { useEffect, useState } from 'react';
import Mca from '@components/Quiz/Mca/Mca';
import { Button, Col, Divider, Form, Row } from 'antd';
import { history } from '@redux/store';
import './Quiz.less';
import service from '@service/test-api';
import { getQuiz } from '@redux/actions/quiz';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const Quiz = () => {
  const quiz = useSelector((state: any) => state.quiz.quiz);
  const dispatch = useDispatch();
  const search = useLocation().search;
  const testId = new URLSearchParams(search).get('testId');
  const candidateId = new URLSearchParams(search).get('candidateId');
  console.log(testId);


  useEffect(() => {
    dispatch(getQuiz(Number(testId)));
    console.log(quiz);

  }, []);

  const [answer, setAnswer] = useState<any>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const handleSubmit = (values: any) => {
    console.log(quiz);
    const apiAnswer = {
      ...answer,
      question_id: quiz.questions[currentQuestion].ID,
      candidate_id: Number(candidateId),
      test_id: Number(testId)
    };
    console.log(apiAnswer);
    service.answers.answersCreate(apiAnswer).then(
      (res: any) => {
        console.log(res, 'dataa');
      },
      (res: any) => {
        console.log(res.error);
      }
    );
    const questionNumber = currentQuestion + 1;
    if (questionNumber !== quiz.questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      history.push('/my-tests');
    }
  };
  const handleCheckChange = (values: any) => {
    const checkedAnswers = values.map((choice: any) => {
      return { choices_id: choice };
    });
    setAnswer({ ...answer, answer_choices: checkedAnswers });
  };
  return (
    <>
      {currentQuestion === quiz.questions.length ? <></> :
        <div className={"quiz__container"}>
          <Row justify={"space-between"}>
            <Col><span className={"quiz__current-question"}>Question {currentQuestion+1} of {quiz.questions.length}</span></Col>
            <Col><span className={"quiz__test-name"}>{quiz.name}</span></Col>
            <Col><span className={"quiz__report"}>Report a problem ?</span></Col>
          </Row>
          <Divider className="quiz__divider"/>
          <Row>
            <Col style={{paddingLeft:"15px"}}>
              <Form
                onFinish={handleSubmit}
              >

                <Mca question={quiz.questions[currentQuestion]} onCheckChange={handleCheckChange}
                />
                <Form.Item>
                  <Button
                    size={'large'}
                    style={{ backgroundColor: '#28A745', color: '#fff' }}
                    htmlType={'submit'}
                  >
                    Submit & next
                  </Button>

                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      }</>
  );
};

export default Quiz;