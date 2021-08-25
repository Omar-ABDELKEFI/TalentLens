import React, { useEffect } from 'react';
import { candidateActions } from '@redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import TestQuestionsTable from '@components/test-question-table/testQuestionsTable';
import Header from '@layout/header/header';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';

import { updateTestStatus } from '@redux/actions/quiz';

const QuizCanceled = ({ testStatus }: any) => {






  function parseISOString(isoString: any) {
    var isoDate = new Date(isoString);
    var month = isoDate.toLocaleString('default', { month: 'short' });
    var date = isoDate.getUTCDate();
    var year = isoDate.getFullYear();
    var hour = isoDate.getHours();
    var minute = isoDate.getMinutes();

    return `${year} ${month} ${date} , ${hour}:${minute < 10 ? '0' : ''}${minute}h`;

  }

  const token = localStorage.getItem('token');

  return (<> {
    (!token ? <Redirect to="/403"/> :
      (<>
        <div className="start-test__container"><h1>Test invitation has expired</h1><p>Test invitation for test
          "{testStatus.testCandidate.name}" has expired on: {parseISOString(testStatus.time)}. Please contact us for more
          details.</p></div>
      </>))}}</>);
};

export default QuizCanceled;
