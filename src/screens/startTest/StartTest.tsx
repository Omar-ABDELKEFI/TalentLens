import React, { useEffect } from 'react';
import './StartTest.less';
import { candidateActions } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import TestQuestionsTable from '@components/test-question-table/testQuestionsTable';
import Header from '@layout/header/header';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import {Button} from 'antd';
import {history} from '@redux/store';

const StartTest = () => {

  const dispatch = useDispatch();
  let { idTestCandidate } = useParams();

  console.log(idTestCandidate, 'idTestCandidateidTestCandidate');
  useEffect(() => {
    dispatch(candidateActions.startTest(idTestCandidate));
  }, [dispatch]);
  const isLoading = useSelector((state: any) => state.candidate.loading);
  const testInfo = useSelector((state: any) => state.candidate.testInfo);
  console.log(isLoading, 'isLoadingisLoading');
  const token = localStorage.getItem('token');
  const data = !isLoading && testInfo.questions.map((questions: any, key: any) => {
    return {
      'key': key,
      'Questions': questions.name,
      'Environment': questions.type
    };
  });
  return (<>
    {!token ? <Redirect to="/403"/> :
      !isLoading && (<><Header/>
        <div className={'start-test__main-container'}>
          <div className={'start-test__container'}>
            <div className={'start-test__first-line'}>
              <span className={'start-test__my-test'}>{testInfo.name}</span>
            </div>
            <div className={'start-test__secand-line'}>
            <p><b>Deadline:</b> The test must be completed before Aug 14, 16:00 (CEST, 24-hour clock).</p>
            <p><b>Test duration:</b> This test normally takes 5min, but you have up to 7min 30sec (no breaks allowed).
            </p></div>
            <TestQuestionsTable data={data}/>
            <div style={{marginBottom:5}}><b>EMAIL:</b></div>
            <p>{testInfo.email}</p>
            <Button type="primary"  style={{ width: "20"}} block size="large" onClick={()=>{history.push(`/quiz/${idTestCandidate}`)}}>Start Test</Button>
          </div>
        </div>
      </>)}</>);
};

export default StartTest;
