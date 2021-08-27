import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '@redux/actions/question';
import ListCard from '@components/question/ListCard/ListCard';
import './AddTestQuestions.less';
import { Button } from 'antd';
import ModelQuestionsTypes from '@components/question/ModelQuestionsTypes/ModelQuestionsTypes';
import McaQuestion from '@components/Quiz/McaQuestion/McaQuestion';

const AddTestQuestions: React.FC<any> = () => {
  const questions = useSelector((state: any) => state.questions.questions);
  const errors = useSelector((state: any) => state.questions.error);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    console.log('get all question');
    dispatch(getQuestions());

  }, []);
  return errors ? (
    <h1>{errors}</h1>
  ) : (
    <div>
      <div className={'add-questions__add-btn-container'}>
        {/*  <Link to={'/question'}><Button*/}
        {/*className="add-questions__create-button">Create Question</Button></Link>*/}
        <Button onClick={showModal} className="add-questions__create-button">Create Question</Button>
        <ModelQuestionsTypes isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
      </div>
      {questions && questions.map((question: any) => {

        return (
          // return question in card
          <ListCard question={question} key={question.ID}/>
        );
      }
      )}
    </div>
  );

};

export default AddTestQuestions;

