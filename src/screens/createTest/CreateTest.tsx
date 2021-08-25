import React, { useEffect, useRef, useState } from 'react';
import './CreateTest.less';
import { Tabs, Layout, Row, Input, Form } from 'antd';
import Settings from '@components/cards_create_test/Settings/Settings';
import AddCandidates from '@shared/components/cards_create_test/AddCandidates/AddCandidates';
import AddQuestions from '@shared/components/cards_create_test/AddQuestions/AddQuestions';
import Header from '@layout/header/header';
import AddTestQuestions from '../addTestQuestions/AddTestQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { getTest } from '@redux/actions/tests';
import { useParams } from 'react-router';
import { EditTwoTone, SaveTwoTone } from '@ant-design/icons/lib';

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
  const [nameEdit, setNameEdit] = useState(false);
  const test = useSelector((state: any) => (state.test.test));
  const nameInput = useRef(null);
  const handleSaveName = () => {
    setNameEdit(false)
  };
  const handleEditName = () => {
    setNameEdit(true)
  };
  useEffect(()=>{
    // @ts-ignore
    nameEdit && nameInput.current.focus()
  },[nameEdit])

  return (
    <>
      <Header/>
      <div className={'create-test__main-container'}>

        <div className={'create-test__container'}>
          <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ marginTop: 25 }}>
              <div className="card-container">
                <Row style={{ marginBottom: 15 }} align={'middle'}>
                  {nameEdit ?
                    <Form colon={false} layout={'inline'}>
                      <Row align={'middle'}>
                        <Form.Item>
                          <Input defaultValue={test.name} size={'small'}
                                 style={{ fontSize: 30, fontWeight: 500, color: '#212529' }} onBlur={()=>setNameEdit(false)}
                                 ref={nameInput}
                          />
                        </Form.Item>
                        <Form.Item>
                          <SaveTwoTone onClick={handleSaveName} style={{ fontSize: 20 }}/>
                        </Form.Item>
                      </Row>
                    </Form>
                    :
                    <>
                      <span className={'create-test__test-name'} onClick={handleEditName}>{test.name}</span>
                      <EditTwoTone style={{ marginLeft: 20, fontSize: 20 }} onClick={handleEditName}/>
                    </>
                  }
                </Row>
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

