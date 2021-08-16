import React, { useState } from 'react';
import {Row, Button} from 'antd'
import ModelQuestionsTypes from '@components/question/ModelQuestionsTypes/ModelQuestionsTypes'

function AddQuestions({handleAddClick}: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
    return (
        <>
            <Row justify="space-between">
                <div>Add questions to see the expected solving time.</div>
                <div>
                    <div>
                        <Button type="primary" style={{background: "#28a745", borderColor: "#28a745"}}
                                onClick={handleAddClick}>Add
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
