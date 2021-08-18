import React, { useEffect } from 'react';
import TestQuestionsTable from '../test-question-table/testQuestionsTable';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { updateTestStatus } from '@redux/actions/quiz';

const QuizWaiting = ({testInfo , idTestCandidate} : any) => {
  const data = testInfo.questions.map((questions: any, key: any) => {
    return {
      'key': key,
      'Questions': questions.name,
      'Environment': questions.type
    };
  });
  const dispatch = useDispatch();

  return (
    <div className={'start-test__main-container'}>
      <div className={'start-test__container'}>
        <div className={'start-test__first-line'}>
          <span className={'start-test__my-test'}>{testInfo.name}</span>
        </div>
        <div className={'start-test__secand-line'}>
          <p><b>Deadline:</b> The test must be completed before Aug 14, 16:00 (CEST, 24-hour clock).</p>
          <p><b>Test duration:</b> This test normally takes 5min, but you have up to 7min 30sec (no breaks
            allowed).
          </p></div>
        <TestQuestionsTable data={data}/>
        <div style={{ marginBottom: 5 }}><b>EMAIL:</b></div>
        <p>{testInfo.email}</p>
        <Button type="primary" style={{ width: '20' }} block size="large" onClick={() => {
          dispatch(updateTestStatus(idTestCandidate,{test_status:"started"}))
        }}>Start Test</Button>
      </div>
    </div>
  );
};

export default QuizWaiting;