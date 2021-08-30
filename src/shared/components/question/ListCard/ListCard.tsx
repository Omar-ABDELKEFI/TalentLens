import React, { useEffect, useState } from 'react';
import './ListCard.less';
import { DashboardOutlined, ClockCircleOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTestQuestions, removeTestQuestions } from '@redux/actions/question';
import { useParams } from 'react-router';
import { removeHtml } from '@utils/common';
import QuestionPreview from '@components/question/QuestionPreview/QuestionPreview';
import TextIcon from '@components/TextIcon/TextIcon';

const ListCard: React.FC<any> = ({ question }) => {
  const { idTest } = useParams();
  const dispatch = useDispatch();
  const [added, setAdded] = useState<boolean>();
  const loading = useSelector((state: any) => state.questions.loading);

  useEffect(() => {
    const isAdded = question.test_questions?.some((test_question: any) => {
      return test_question.test_id === Number(idTest);
    });
    setAdded(isAdded);
  }, []);

  const handleAddClick = (e: any, question_id: number) => {
    e.stopPropagation();
    setAdded((prevState => !prevState));
    dispatch(addTestQuestions(question_id, idTest));
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    const testQuestion = question.test_questions.filter((test_question: any) => test_question.test_id === Number(idTest));
    setAdded((prevState => !prevState));
    dispatch(removeTestQuestions(testQuestion[0].ID, question.ID));
  };
  const [previewModal, setPreviewModal] = useState(false);

  return (
    <>
      <div className="list-card__container" onClick={() => setPreviewModal((prevState => !prevState))}>
        <div className={'list-card__row'}>
          <div className={'list-card__question-body'}>
            <span>{question.name} - &nbsp;</span>
            <div className={'list-card__question-text'}>
              {removeHtml(question.question_text)}
            </div>
          </div>
          {
            added ? (
                <button disabled={loading} className={'list-card__button'}
                        onClick={(e: any) => handleRemoveClick(e)}>Remove
                  Question</button>
              ) :
              (
                <button disabled={loading} className={'list-card__button'}
                        onClick={(e) => handleAddClick(e, question.ID)}>Add Question</button>
              )
          }
        </div>
        <div className={'list-card__row'}>
          <span className={'list-card__skill'}>{question.Skill.name}</span>
        </div>
        <div className={'list-card__row-3'}>
          <TextIcon icon={DashboardOutlined} text={question.difficulty} style={{ padding: '0 5px' }}/>
          <TextIcon icon={ClockCircleOutlined} text={question.expected_time} style={{ padding: '0 5px' }}/>
          <TextIcon icon={InsertRowBelowOutlined} text={question.type} style={{ padding: '0 5px' }}/>
        </div>
      </div>
      <QuestionPreview previewModal={previewModal} setPreviewModal={setPreviewModal} question={question}/>
    </>
  );
};

export default ListCard;
