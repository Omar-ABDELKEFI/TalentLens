import React from 'react';
import { removeHtml } from '@utils/common';
import './NameCol.less';

const NameCol = ({ question }: any) => {
  return (
    <div>
      <div className={'name-col__row'}>
        <div className={'name-col__question-body'}>
          <span>{question.name} - </span>
          <div className={'name-col__question-text'}>
            {removeHtml(question.question_text)}
          </div>
        </div>
      </div>
      <div>
        <span className={'name-col__skill'}>{question.Skill.name}</span>
      </div>
    </div>
  );
};

export default NameCol;