import React from 'react';
import './CandidateCol.less';
import { history } from '@redux/store';

const CandidateCol = ({ email, record,checkWidth}: any) => {
  console.log(checkWidth);
  return (
    <div>

      <div className={'candidate-col__first-line'}>{email}</div>
      {checkWidth &&  <div  className={'candidate-col__line'}><div className="candidate-col__test-name" onClick={() => history.push(`/my-tests/${record.test_candidate_id.slice(0, record.test_candidate_id.indexOf('-'))}`)}>test: {record.test_name}</div>
            <div className="candidate-col__other-line"><div className={"candidate-col__one-line"}>score: {record.score}</div>
            <div className={"candidate-col__one-line"}>status: {record.test_status}</div></div></div>}
    </div>
  );
};

export default CandidateCol;
