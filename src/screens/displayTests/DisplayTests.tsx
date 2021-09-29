import React, { useEffect } from 'react';
import './DisplayTests.less';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionTest } from '@redux/actions/index';
import TestCard from '@components/test_card/TestCard';
import Header from '@layout/header/header';
import ListCardSkeleton from '../../skeleton/ListCardSkeleton/ListCardSkeleton';
import { setCurrentScreen } from '@redux/actions/currentScreen';


function DisplayTests() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentScreen('1'));
    dispatch(actionTest.getMyTests());
  }, []);
  const isLoading = useSelector((state: any) => state.test.loading);
  const myTests = useSelector((state: any) => state.test.myTests);
  const errorToken = useSelector((state: any) => state.test.error);

  console.log(errorToken, 'errorToken');
  const handelClickCreteTest = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(actionTest.createTest());
  };
  const token = localStorage.getItem('token');
  return (<>{errorToken ? <></> :
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
              : myTests === null ? <>
                Start Testing Candidates
                Choose one of our predefined tests for the skills you need or add individual questions one by one to a
                new empty test.

                You can also create your own custom questions to build a test tailored to your needs.


              </> : myTests.map((test: any) => {
                console.log('my testtss ', test);
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
