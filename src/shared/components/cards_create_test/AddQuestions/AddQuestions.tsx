import React, {useState} from 'react';
import {Row, Col, Slider, InputNumber, Button} from 'antd'


function AddQuestions() {
    const [PassingScore, setPassingScore] = useState(1)
    const [showFinalScore, setShowFinalScore] = useState(true)

    const onChangePassingScore = (value: any) => {
        console.log("passing score", PassingScore)
        setPassingScore(value)
    }
    return (
        <>
            <Row justify="space-between">
                <div>Add questions to see the expected solving time.</div>
                <div>
                    <div>
                        <Button type="primary" style={{background: "#28a745", borderColor: "#28a745"}}>Add
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