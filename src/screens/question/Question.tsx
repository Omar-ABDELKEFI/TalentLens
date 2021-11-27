import React, { useEffect, useState } from 'react';
import service from '@service/test-api';
import { history } from '@redux/store';
import ListCard from '@components/question/ListCard/ListCard';
import Header from '@layout/header/header';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import "./Question.less"
import { setCurrentScreen } from '@redux/actions/currentScreen';
import { useDispatch } from 'react-redux';

const Question = () => {
  const dispatch = useDispatch()
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    dispatch(setCurrentScreen('3'));
    service.baseApiParams.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    service.questions.questionsList().then(
      (questions: any) => {
        console.log(questions.data.data);
        setQuestions(questions.data.data);
      },
      (data: any) => {
        console.log(data.error, 'errorerror');
        if (data.error.error === 'token invalid') {
          history.push('/403');
        }
      }
    );
  }, []);
  return (
    <>
      <Header/>
      <div className={'display-questions__main-container'}>
        <div className={'display-questions__container'}>
          <div className={'display-questions__first-line'}>
            <span className={'display-questions__my-questions'}>My Questions</span>
            <Link to="/questions/edit">
              <Button size={'large'} style={{ backgroundColor: '#28A745', color: '#fff', border: 'none' }}
                      type="primary">Create Question</Button>
            </Link>
          </div>
          {questions &&
          questions.map((question: any) => {
            return (
              // return question in card
              <ListCard question={question} cardType={'questionsList'} key={question.ID}/>
            );
          })}
        </div>
      </div>
      </>
      );
      };
      export default Question;
