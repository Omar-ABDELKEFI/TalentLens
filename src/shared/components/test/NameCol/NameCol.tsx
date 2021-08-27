import React, { useState } from 'react';
import { removeHtml } from '@utils/common';
import './NameCol.less';
import { Modal } from 'antd';
import McaQuestion from '@components/Quiz/McaQuestion/McaQuestion';

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
      <Modal title="Preview" visible={previewModal} onOk={() => setPreviewModal((prevState => !prevState))}
             cancelButtonProps={{ style: { display: 'none' } }}
             onCancel={() => setPreviewModal((prevState => !prevState))}
             width={'100%'}
             style={{ top: 5 }}
      >
        <McaQuestion questionIndex={1}
                     totalQuestion={1}
                     currentQuestion={question}
                     lastUpdate={Date.now()}
        />
      </Modal>
    </>
  );
};

export default NameCol;