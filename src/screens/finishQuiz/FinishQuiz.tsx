import React from 'react';
import { useSelector } from 'react-redux';
import './FinishQuiz.less';

const FinishQuiz = () => {
  const result = useSelector((state: any) => state.quiz.testInfo);

  return (
    <div className={'finish-quiz__container'}>
      {result.test_status === 'failed' ?
        <div>
          <div style={{textAlign: 'center' }}>Sorry !</div>
          <div style={{textAlign: 'center'}}>
            Your total score for the test was {result.score} %.
            We invite you to take anther test after you have had some more practice, since, as the saying goes, practice
            makes perfect :)
          </div>
        </div>
        :
        <div>
          <div style={{textAlign: 'center'}}>Congratulation !</div>
          <div style={{textAlign: 'center'}}>Your total score for the test was {result.score} %.</div>
          <div style={{textAlign: 'center'}}>we will contact as soon as possible</div>
        </div>
      }
    </div>
  );
};

export default FinishQuiz;
