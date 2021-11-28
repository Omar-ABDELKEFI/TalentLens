import React, { useEffect, useState } from 'react';
import './TestQuestionCard.less';
import { ClockCircleOutlined, DashboardOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { removeHtml } from '@utils/common';
import QuestionPreview from '@components/question/QuestionPreview/QuestionPreview';
import TextIcon from '@components/TextIcon/TextIcon';


const TestQuestionsCard: React.FC<any> = ({ question}) => {
  const { idTest } = useParams();
  const dispatch = useDispatch();
  const [added, setAdded] = useState<boolean>();
  const loading = useSelector((state: any) => state.test.loading);




  const [previewModal, setPreviewModal] = useState(false);

  return (
    <>
      <div  className="test-question-card__container" onClick={() => setPreviewModal((prevState => !prevState))}>
        <div className={'test-question-card__row'}>
          <div className={'test-question-card__question-body'}>
            <span>{question.name} - &nbsp;</span>
            <div className={'test-question-card__question-text'}>
              {removeHtml(question.question_text)}
            </div>
          </div>

        </div>
        <div className={'test-question-card__row'}>
          <span className={'test-question-card__skill'}>{question.Skill.name}</span>
        </div>
        <div className={'test-question-card__row-3'}>
          <TextIcon icon={DashboardOutlined} text={question.difficulty} style={{ padding: '0 5px', color: '#6c757d' }}/>
          <TextIcon icon={ClockCircleOutlined} text={question.expected_time}
                    style={{ padding: '0 5px', color: '#6c757d' }}/>
          <TextIcon icon={InsertRowBelowOutlined} text={question.type} style={{ padding: '0 5px', color: '#6c757d' }}/>
        </div>
      </div>
      <QuestionPreview previewModal={previewModal} setPreviewModal={setPreviewModal} question={question}/>
    </>
  );
};

export default TestQuestionsCard;
