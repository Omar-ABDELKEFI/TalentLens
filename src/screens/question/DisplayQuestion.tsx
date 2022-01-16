import React, { useEffect, useState } from 'react';
import service from '@service/test-api';
import { history } from '@redux/store';
import ListCard from '@components/question/ListCard/ListCard';
import Header from '@layout/header/header';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import './DisplayQuestion.less';
import { setCurrentScreen } from '@redux/actions/currentScreen';
import { useDispatch } from 'react-redux';
import ModelQuestionTypes from '@components/question/ModelQuestionsTypes/ModelQuestionsTypes';
import { useWindowDimensions } from '@utils/common';

const DisplayQuestion = () => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const { height, width } = useWindowDimensions();
  const checkWidth = (width: number) => {
    if (width > 448) {
      return false;
    } else return true;
  };
  useEffect(() => {
    dispatch(setCurrentScreen('3'));
    service.baseApiParams.headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    service.questions.questionsList().then(
      (questions: any) => {
        console.log(questions.data.data);
        setQuestions(questions.data.data);
        setDataSource(questions.data.data);
      },
      (data: any) => {
        console.log(data.error, 'errorerror');
        if (data.error.error === 'token invalid') {
          history.push('/403');
        }
      }
    );
  }, []);
  const [dataSource, setDataSource] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Header />
      <ModelQuestionTypes isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <div className={'display-questions__main-container'}>
        <div className={'display-questions__container'}>
          <div className={'display-questions__first-line'}>
            <span className={'display-questions__my-questions'}>My Questions</span>
            <Button
              size={'large'}
              style={{ backgroundColor: '#28A745', color: '#fff', border: 'none' }}
              type="primary"
              onClick={() => setIsModalVisible(!isModalVisible)}
            >
              create <span hidden={checkWidth(width)}>&nbsp;Question</span>
            </Button>
          </div>
          <div>
            <Input
              className={'display-questions__search'}
              placeholder="Search Question"
              onChange={e => {
                const currValue = e.target.value;
                if (currValue.length === 0) {
                  setDataSource(questions);
                } else {
                  const filteredData = questions.filter(
                    (entry: any) =>
                      entry.name.toLowerCase().includes(currValue.toLowerCase()) ||
                      entry.name.toLowerCase().includes(currValue.toLowerCase())
                  );
                  setDataSource(filteredData);
                }
              }}
            />
          </div>
          {dataSource &&
            dataSource.map((question: any) => {
              return (
                // return question in card
                <ListCard question={question} cardType={'questionsList'} key={question.ID} />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default DisplayQuestion;
