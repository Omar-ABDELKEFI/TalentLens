import React, { useState } from 'react';
import './CreateTest.less';
import { Tabs, Layout } from 'antd';
import Settings from '@components/cards_create_test/Settings/Settings';
import AddCandidates from '@shared/components/cards_create_test/AddCandidates/AddCandidates';
import AddQuestions from '@shared/components/cards_create_test/AddQuestions/AddQuestions';
import Header from '@layout/header/header';
import AddTestQuestions from '../addTestQuestions/AddTestQuestions';

function CreateTest() {
  const [passingScore, setPassingScore] = useState(1);
  const { TabPane } = Tabs;
  const { Content } = Layout;
  const [showQuestionList, setShowQuestionList] = useState(false);
  const handleAddClick = () => {
    setShowQuestionList(!showQuestionList);
  };
  const onChangePassingScore = (value: any) => {
    console.log("passing score", passingScore)
    setPassingScore(value)
  }

  return (
    <>
      <Header/>
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="Questions" key="1">
                {showQuestionList ? <AddTestQuestions/> : <AddQuestions handleAddClick={handleAddClick}/>}
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
    </>
  );
}

export default CreateTest;

