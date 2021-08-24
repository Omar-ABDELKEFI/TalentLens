import React, { useEffect, useState } from 'react';
import './CreateTest.less';
import { Tabs, Layout } from 'antd';
import Settings from '@components/cards_create_test/Settings/Settings';
import AddCandidates from '@shared/components/cards_create_test/AddCandidates/AddCandidates';
import AddQuestions from '@shared/components/cards_create_test/AddQuestions/AddQuestions';
import Header from '@layout/header/header';
import AddTestQuestions from '../addTestQuestions/AddTestQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { getTest } from '@redux/actions/tests';
import { useParams } from 'react-router';

function CreateTest() {
  const [passingScore, setPassingScore] = useState(1);
  const { TabPane } = Tabs;
  const { Content } = Layout;
  const [showQuestionList, setShowQuestionList] = useState(false);
  const dispatch = useDispatch();
  const { idTest } = useParams();
  const handleAddClick = () => {
    setShowQuestionList(!showQuestionList);
  };
  const onChangePassingScore = (value: any) => {
    console.log('passing score', passingScore);
    setPassingScore(value);
  };
  useEffect(() => {
    dispatch(getTest(idTest));
  }, []);

  const test = useSelector((state: any) => (state.test.test));
  return (
    <>
      <Header/>
      <div className={'create-test__main-container'}>

        <div className={'create-test__container'}>
          <Layout style={{ minHeight: '100vh' }}>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="card-container">
              <Tabs type="card">
                <TabPane tab="Questions" key="1">
                  {showQuestionList ? <AddTestQuestions/> :
                    <AddQuestions handleAddClick={handleAddClick} questions={test.questions}/>}
                </TabPane>
                <TabPane tab="Candidates" key="2">
                  <AddCandidates passingScore={passingScore} onChangePassingScore={onChangePassingScore}/>
                </TabPane>
                <TabPane tab="Settings" key="3">
                  <Settings passingScore={passingScore}/>
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
        </div>
      </div>

    </>
  );
}

export default CreateTest;

