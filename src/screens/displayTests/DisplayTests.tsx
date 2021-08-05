import React from 'react';
import './DisplayTests.less';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { actionTest } from '@redux/actions/index';
import { Redirect } from 'react-router-dom';
import TestCard from '@components/test_card/TestCard';
import Header from '@layout/header/header';

function DisplayTests() {
  const dispatch = useDispatch();
  const handelClickCreteTest = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(actionTest.createTest());
  };
  const token = localStorage.getItem('token');
  const TESTS = [1,2,3,4]
  return (<>{!token ? <Redirect to="/403"/> :
      <>
        <Header />
        <div className={'display-test__main-container'}>
          <div className={'display-test__container'}>
            <div className={'display-test__first-line'}>
              <span className={'display-test__my-test'}>My Tests</span>
              <Button size={'large'} style={{ backgroundColor: '#28A745', color: '#fff', border:"none"}} type="primary"
                      onClick={handelClickCreteTest}>Create Tests</Button>
            </div>
            {TESTS.map((test) => {
              return(
                <TestCard key={test}  />
              );
            })}

          </div>
        </div>
      </>}</>
  );
}

export default DisplayTests;
{/*
            <Button type="primary" onClick={handelClickCreteTest}>Create Tests</Button>
*/
}
