import React from 'react';
import { Redirect } from 'react-router-dom';

const QuizCanceled = ({ testStatus }: any) => {


  function parseISOString(isoString: any) {
    let isoDate = new Date(isoString);
    let month = isoDate.toLocaleString('default', { month: 'short' });
    let date = isoDate.getUTCDate();
    let year = isoDate.getFullYear();
    let hour = isoDate.getHours();
    let minute = isoDate.getMinutes();

    return `${year} ${month} ${date} , ${hour}:${minute < 10 ? '0' : ''}${minute}h`;

  }

  const token = localStorage.getItem('token');

  return (<> {
    (!token ? <Redirect to="/403"/> :
      (<>
        <div className="start-test__container"><h1>Test invitation has expired</h1><p>Test invitation for test
          "{testStatus.testCandidate.name}" has expired on: {parseISOString(testStatus.time)}. Please contact us for
          more
          details.</p></div>
      </>))}}</>);
};

export default QuizCanceled;
