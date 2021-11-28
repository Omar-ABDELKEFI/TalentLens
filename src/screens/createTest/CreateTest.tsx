import React, { useEffect, useState } from 'react';
import './CreateTest.less';
import { Layout, Row, Tabs } from 'antd';
import Settings from '@components/cards_create_test/Settings/Settings';
import AddCandidates from '@shared/components/cards_create_test/AddCandidates/AddCandidates';
import AddQuestions from '@shared/components/cards_create_test/AddQuestions/AddQuestions';
import SubHeader from '@layout/header/header';
import AddTestQuestions from '../addTestQuestions/AddTestQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { getTest } from '@redux/actions/tests';
import { useParams } from 'react-router';

function CreateTest() {
  const { TabPane } = Tabs;
  const { Content } = Layout;
  const [showQuestionList, setShowQuestionList] = useState(false);
  const dispatch = useDispatch();
  const { idTest } = useParams();
  const handleAddClick = () => {
    setShowQuestionList(!showQuestionList);
  };
  const errorToken = useSelector((state: any) => state.test.error);
  const tokenErrorCerateQuestion = useSelector((state: any) => state.questions.tokenError);

  console.log(errorToken, 'errorToken');
  useEffect(() => {
    dispatch(getTest(idTest));
  }, []);
  const test = useSelector((state: any) => (state.test.test));
  const handleTabChange = (key: string) => {
    if (key === '1') {
      setShowQuestionList(false);
    }
  };
  return (<>{errorToken || tokenErrorCerateQuestion ? <></> :
      <>
        <SubHeader/>
        <div className={'create-test__main-container'}>

          <div className={'create-test__container'}>
            <Layout style={{ minHeight: '100vh' }}>
              <Content style={{ marginTop: 25,marginBottom:25 }}>
                <div className="card-container">
                  <Row className={'create-test__title-container'} style={{ marginBottom: 15 }} align={'middle'}>
                    <span className={'create-test__test-name'}>{test.name}</span>
                  </Row>
                  <Tabs type="card" onTabClick={handleTabChange}>
                    <TabPane tab="Questions" key="1" >
                      {showQuestionList ? <AddTestQuestions/> :
                        <AddQuestions handleAddClick={handleAddClick} questions={test.questions}/>}
                    </TabPane>
                    <TabPane tab="Candidates" key="2">
                      <AddCandidates idTest={idTest} initialPassingScore={test.passing_score}/>
                    </TabPane>
                    <TabPane tab="Settings" key="3">
                      <Settings/>
                    </TabPane>
                  </Tabs>
                </div>
              </Content>
            </Layout>
          </div>
        </div>

      </>}</>
  );
}

export default CreateTest;

