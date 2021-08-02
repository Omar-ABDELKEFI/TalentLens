import React, {useState} from 'react';
import service from '../../service/test-api'
import {useParams} from 'react-router-dom'
import './CreateTest.less'
import { Tabs,Layout, } from 'antd'
import Settings from "@components/cards_create_test/Settings/Settings";
import AddCandidates from "../../shared/components/cards_create_test/AddCandidates/AddCandidates"
import AddQuestions from "../../shared/components/cards_create_test/AddQuestions/AddQuestions"
import Header from "@layout/header/header";
import AddTestQuestions from "../addTestQuestions/AddTestQuestions";
function CreateTest() {
    const {TabPane}=Tabs
    const { Content } = Layout;
    const [login, setLogin] = useState({email: "", password: ""})
    const [showQuestionList,setShowQuestionList] = useState(false)
    const handleAddClick = () => {
        setShowQuestionList(!showQuestionList)
    }
    return (

            <Layout style={{height:"100%"}} >
            <Header/>
                <Content  style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="card-container">
            <Tabs type="card">
                <TabPane tab="Tab Title 1" key="1">
                    <AddCandidates/>
                </TabPane>
                <TabPane tab="Tab Title 2" key="2">
                    {showQuestionList ? <AddTestQuestions/> : <AddQuestions handleAddClick={handleAddClick}/> }
                </TabPane>
                <TabPane tab="Tab Title 3" key="3">
                    <Settings/>
                </TabPane>
            </Tabs>
                    </div>
                </Content>
            </Layout>

    );
}

export default CreateTest;

