import React, { useEffect } from 'react';
import './StartTest.less';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { startQuiz } from '@redux/actions/quiz';
import QuizWaiting from '@components/quiz_waiting/QuizWaiting';
import Q from '@components/quiz_waiting/QuizWaiting';
import Quiz from '@screens/quiz/Quiz';
import FinishQuiz from '@screens/finishQuiz/FinishQuiz';
import { candidateActions } from '@redux/actions';
import QuizCanceled from '@components/quiz_canceled/QuizCanceled';

const StartTest = () => {

  const dispatch = useDispatch();
  let { idTestCandidate } = useParams();

  useEffect(() => {
    dispatch(startQuiz(idTestCandidate));
  }, [dispatch]);
  const isLoading = useSelector((state: any) => state.quiz.loadingTesInfo);
  const testInfo = useSelector((state: any) => state.quiz.testInfo);
  const testStatus = useSelector((state: any) => state.quiz.error);
  console.log(testInfo,"testInfotestInfotestInfotestInfotestInfotestInfo");
  return (<>
    {
      <>
        {isLoading ? <></> :testStatus ? <QuizCanceled testStatus={testStatus}/> :
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
