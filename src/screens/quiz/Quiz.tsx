import React, { useEffect, useState } from 'react';
import './Quiz.less';
import service from '@service/test-api';
import { createResult, getQuiz, startQuiz, updateCurrentQuestion } from '@redux/actions/quiz';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import McaQuestion from '@components/Quiz/McaQuestion/McaQuestion';

const Quiz = () => {
  const quiz = useSelector((state: any) => state.quiz.quiz);
  const dispatch = useDispatch();
  const { idTestCandidate } = useParams();
  const isLoading = useSelector((state: any) => state.quiz.loadingQuiz);
  const loadingTest = useSelector((state: any) => state.quiz.loadingTesInfo);
  const currentQuestion = useSelector((state: any) => state.quiz.testInfo.current_question);
  const lastUpdate = useSelector((state: any) => state.quiz.testInfo.updated_at);
  useEffect(() => {
    dispatch(getQuiz(idTestCandidate));

  }, []);

  const [answer, setAnswer] = useState<any>();
  const handleSubmit = () => {
    service.startTest.startTest(idTestCandidate).then(
      (res: any) => {
        if (res.data.data.current_question === currentQuestion && res.data.data.test_status === 'started') {
          const apiAnswer = {
            ...answer,
            question_id: quiz.questions[currentQuestion].ID
          };

          service.answers.answersCreate(idTestCandidate, apiAnswer).then(
            (res: any) => {
              const questionNumber = currentQuestion + 1;
              if (questionNumber !== quiz.questions.length) {
                dispatch(updateCurrentQuestion(idTestCandidate, { current_question: questionNumber }));
              } else {
                dispatch(createResult(idTestCandidate));
              }
            },
            (res: any) => {
              console.log(res.error);
            }
          );
        } else {
          dispatch(startQuiz(idTestCandidate));
        }
      },
      (error: any) => {
      }
    );

  };


  const handleCheckChange = (values: any) => {
    const checkedAnswers = values.map((choice: any) => {
      return { choices_id: choice };
    });
    setAnswer({ ...answer, answer_choices: checkedAnswers });
  };
  const handleRadioChange = (e: any) => {
    console.log(e);
    const checkedAnswers = [{ choices_id: e.target.value }]
    setAnswer({ ...answer, answer_choices: checkedAnswers });
  };
  if (!isLoading && Date.now() > ((quiz.questions[currentQuestion].expected_time) * 60 * 1000 + Date.parse(lastUpdate))) {
    handleSubmit();
  }
  return (
    <>
      {isLoading ? <></> :
        <div className={'quiz__container'}>

          <McaQuestion quizName={quiz.name} questionIndex={currentQuestion + 1}
                       totalQuestion={quiz.questions.length} handleSubmit={handleSubmit}
                       handleCheckChange={handleCheckChange}
                       currentQuestion={quiz.questions[currentQuestion]}
                       lastUpdate={Date.parse(lastUpdate)}
                       disabled={(loadingTest || isLoading)}
                       handleRadioChange={handleRadioChange}
          />

        </div>

      }</>
  );
};

export default Quiz;
