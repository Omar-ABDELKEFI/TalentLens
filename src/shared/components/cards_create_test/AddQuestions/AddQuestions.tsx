import React, {useState} from 'react';
import {Row, Col, Slider, InputNumber, Button, Modal, Input, Radio, Space, Form,Checkbox} from 'antd'


import {useParams} from "react-router-dom";


function AddQuestions({handleAddClick}:any) {
    const [PassingScore, setPassingScore] = useState(1)
    const [valueSetting, setValueSetting] = useState<any>([])
    let { idTest } = useParams();
    const [showFinalScore, setShowFinalScore] = useState(true)
    const onHandelChangeCheck=(checked_values:any)=>{
        setValueSetting( [...valueSetting,{"question_id":checked_values[0],"test_id":Number(idTest)}])
        console.log(valueSetting)

    }
    return (
        <>
            <Row justify="space-between">
                <div>Add questions to see the expected solving time.</div>
                <div>
                    <div>
                        <Button type="primary" style={{background: "#28a745", borderColor: "#28a745"}} onClick={handleAddClick}>Add
                            Questions</Button>


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