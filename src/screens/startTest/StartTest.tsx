import React, { useEffect } from 'react';
import './StartTest.less';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { startQuiz } from '@redux/actions/quiz';
import QuizWaiting from '@components/quiz_waiting/QuizWaiting';
import Quiz from '@screens/quiz/Quiz';
import FinishQuiz from '@screens/finishQuiz/FinishQuiz';

const StartTest = () => {

  const dispatch = useDispatch();
  let { idTestCandidate } = useParams();

  useEffect(() => {
    dispatch(startQuiz(idTestCandidate));
  }, []);
  const isLoading = useSelector((state: any) => state.quiz.loadingTesInfo);
  const testInfo = useSelector((state: any) => state.quiz.testInfo);
  return (<>
    {
      <>
        {isLoading ? <></> :
          testInfo.test_status === 'waiting' ?
            <QuizWaiting testInfo={testInfo} idTestCandidate={idTestCandidate}/>
            : testInfo.test_status === 'started' ?
            <Quiz/>
            :
            <FinishQuiz/>

        }
      </>
    }</>);
};

export default StartTest;
