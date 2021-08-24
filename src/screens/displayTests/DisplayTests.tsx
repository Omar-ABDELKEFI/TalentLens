import React, { useEffect } from 'react';
import './DisplayTests.less';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionTest } from '@redux/actions/index';
import { Redirect } from 'react-router-dom';
import TestCard from '@components/test_card/TestCard';
import Header from '@layout/header/header';
import ListCardSkeleton from '../../skeleton/ListCardSkeleton/ListCardSkeleton';


function DisplayTests() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionTest.getMyTests());
  }, [dispatch]);
  const isLoading = useSelector((state: any) => state.test.loading);
  const myTests = useSelector((state: any) => state.test.myTests);

  const handelClickCreteTest = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(actionTest.createTest());
  };
  const token = localStorage.getItem('token');
  return (<>{!token ? <Redirect to="/403"/> :
      <>
        <Header/>
        <div className={'display-test__main-container'}>
          <div className={'display-test__container'}>
            <div className={'display-test__first-line'}>
              <span className={'display-test__my-test'}>My Tests</span>
              <Button size={'large'} style={{ backgroundColor: '#28A745', color: '#fff', border: 'none' }}
                      type="primary"
                      onClick={handelClickCreteTest}>Create Tests</Button>
            </div>
            {isLoading ? <>
                <ListCardSkeleton/>
              </>
              : myTests.map((test: any) => {
                return (
                  <TestCard key={test.test_id} test={test}/>
                );
              })}

          </div>
        </div>
      </>}</>
  );
}

export default DisplayTests;
