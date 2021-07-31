import React, {useState} from 'react';
import {Row, Col, Slider, InputNumber, Button, Modal, Input, Radio, Space, Form,Checkbox} from 'antd'


import {useParams} from "react-router-dom";


function AddQuestions() {
    const [PassingScore, setPassingScore] = useState(1)
    const [valueSetting, setValueSetting] = useState<any>([])
    let { idTest } = useParams();
    const [showFinalScore, setShowFinalScore] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onHandelChangeCheck=(checked_values:any)=>{
        setValueSetting( [...valueSetting,{"question_id":checked_values[0],"test_id":Number(idTest)}])
        console.log(valueSetting)

    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Row justify="space-between">
                <div>Add questions to see the expected solving time.</div>
                <div>
                    <div>
                        <Button type="primary" style={{background: "#28a745", borderColor: "#28a745"}} onClick={showModal}>Add
                            Questions</Button>
                        <Modal title="add candidate" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Checkbox.Group onChange={onHandelChangeCheck} name="question_id">

                                    <Checkbox value={1}>question id 1</Checkbox>
                                    <Checkbox value={2}>question id 2</Checkbox>
                                    <Checkbox value={3}>question id 3</Checkbox>

                            </Checkbox.Group>
                        </Modal>
                    </div>
                </div>
            </Row>
                <Row justify="center">
                    <div>Add Question to your test</div>
                </Row>

        </>
    );
}
export default AddQuestions;