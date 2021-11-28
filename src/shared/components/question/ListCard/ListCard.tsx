import React, { useEffect, useState } from 'react';
import './ListCard.less';
import { DashboardOutlined, ClockCircleOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { removeHtml } from '@utils/common';
import QuestionPreview from '@components/question/QuestionPreview/QuestionPreview';
import TextIcon from '@components/TextIcon/TextIcon';
import { addTestQuestions, removeTestQuestions } from '@redux/actions/tests';
import { Dropdown, Menu, Row } from 'antd';
import { Link } from 'react-router-dom';

const ListCard: React.FC<any> = ({ question, test, cardType }) => {
  const { idTest } = useParams();
  const dispatch = useDispatch();
  const [added, setAdded] = useState<boolean>();
  const loading = useSelector((state: any) => state.test.loading);

  useEffect(() => {
    if (cardType !== 'questionsList') {
      const isAdded = test.questions?.some((testQuestion: any) => {
        return question.ID === testQuestion.ID;
      });
      setAdded(isAdded);
    }
  }, []);

  const handleAddClick = (e: any, question: any) => {
    e.stopPropagation();
    setAdded((prevState => !prevState));
    dispatch(addTestQuestions(question, idTest));
  };
  const handleRemoveClick = (e: any, question: any) => {
    e.stopPropagation();
    setAdded((prevState => !prevState));
    dispatch(removeTestQuestions(idTest, question));
  };
  const [previewModal, setPreviewModal] = useState(false);
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/questions/edit/${question.ID}`}><span className={'list-card__question-menu-item'}>Edit</span></Link>
      </Menu.Item>
    </Menu>
  );
  const [visible, setVisible] = useState(false);
  const handleMenuClick = (e: any) => {
    e.stopPropagation();
    setVisible(!visible);
  };

  return (
    <>
      <div  className="list-card__container" onClick={() => setPreviewModal((prevState => !prevState))}>
        <div className={'list-card__row'}>
          <div className={'list-card__question-body'}>
            <span>{question.name} - &nbsp;</span>
            <div className={'list-card__question-text'}>
              {removeHtml(question.question_text)}
            </div>
          </div>
          {
            cardType === 'questionsList' ?
              <Dropdown.Button visible={visible} buttonsRender={buttons => {
                buttons[1] =
                  <span className={'list-card__question-menu'} onClick={(e: any) => handleMenuClick(e)}>...</span>;
                return buttons;
              }} overlay={menu}/>
              :
              added ? (
                  <button disabled={loading} className={'list-card__button list-card__button-remove'}
                          onClick={(e: any) => handleRemoveClick(e, question)}>Remove
                    Question</button>
                ) :
                (
                  <button disabled={loading} className={'list-card__button list-card__button-add'}
                          onClick={(e) => handleAddClick(e, question)}>Add Question</button>
                )
          }
        </div>
        <div className={'list-card__row'}>
          <span className={'list-card__skill'}>{question.Skill.name}</span>
        </div>
        <div className={'list-card__row-3'}>
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

export default ListCard;
