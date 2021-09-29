import React from 'react';
import { Modal } from 'antd';
import McaQuestion from '@components/Quiz/McaQuestion/McaQuestion';

const QuestionPreview = ({ question, previewModal, setPreviewModal }: any) => {

  return (
    <Modal title="Preview" visible={previewModal} onOk={() => setPreviewModal(((prevState: any) => !prevState))}
           cancelButtonProps={{ style: { display: 'none' } }}
           onCancel={() => setPreviewModal(((prevState: any) => !prevState))}
           width={'100%'}
           style={{ top: 5 }}
           bodyStyle={{ maxHeight: '80vh', overflowY: 'scroll' }}
    >
      <McaQuestion questionIndex={1}
                   totalQuestion={1}
                   currentQuestion={question}
                   lastUpdate={Date.now()}
      />
    </Modal>
  );
};

export default QuestionPreview;
