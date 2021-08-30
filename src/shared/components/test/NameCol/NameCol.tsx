import React, { useState } from 'react';
import { removeHtml } from '@utils/common';
import './NameCol.less';
import { Modal } from 'antd';
import McaQuestion from '@components/Quiz/McaQuestion/McaQuestion';
import Question from '@components/questions_types/McaQuestions/McaQuestions';
import QuestionPreview from '@components/question/QuestionPreview/QuestionPreview';

const NameCol = ({ question }: any) => {
  const [previewModal, setPreviewModal] = useState(false);

  return (
    <>
      <div>
        <div className={'name-col__row'}>
          <div className={'name-col__question-body'} onClick={() => setPreviewModal((prevState => !prevState))}>
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
      <QuestionPreview previewModal={previewModal} setPreviewModal={setPreviewModal} question={question}/>
    </>
  );
};

export default NameCol;