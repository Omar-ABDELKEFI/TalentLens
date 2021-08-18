import React from 'react';
import "./CandidateCol.less"
const CandidateCol = ({ email, name }: any) => {
  return (
    <div>

      <div className={"candidate-col__first-line"}>{name}</div>
      <div className={name.length === 0 ? "candidate-col__first-line" : ""}>{email}</div>
    </div>
  );
};

export default CandidateCol;