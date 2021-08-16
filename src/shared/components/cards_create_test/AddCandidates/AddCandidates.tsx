import React, {ChangeEvent, useState} from 'react';
import {Row, Col, Slider, InputNumber, Button, Input, Modal} from 'antd'
import {useDispatch} from 'react-redux';
import {actionTest} from "@redux/actions";
import {useParams} from "react-router-dom";
import ModelAddCandidates from '@components/cards_create_test/ModelAddCandidate/ModelAddCandidate';
function AddCandidates({passingScore,onChangePassingScore}:any) {

    const [isModalVisible, setIsModalVisible] = useState(false);



    const showModal = () => {
        setIsModalVisible(true);
    };




    return (
        <>
            <Row justify="space-between">
                <Col>
                    <div>No candidates invited</div>
                </Col>
                <Col>

                    <Col span={24}>
                        <div>passing score</div>
                    </Col>

                    <Row>
                        <Col span={13}>
                            <Slider
                                min={0}
                                max={100}
                                onChange={onChangePassingScore}
                                value={typeof passingScore === 'number' ? passingScore : 0}

                            />
                        </Col>
                        <Col span={8}>
                            <InputNumber
                                min={0}
                                max={100}
                                formatter={value => `${value}%`}
                                style={{width: "100%", marginLeft: 4}}
                                value={passingScore}
                                onChange={onChangePassingScore}
                            />
                        </Col>
                    </Row>


                </Col>

                <Col>
                    <div>
                        <Button type="primary" style={{background: "#28a745", borderColor: "#28a745"}}
                                onClick={showModal}>add candidate</Button>
                    </div>
                    <ModelAddCandidates isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
                </Col>
            </Row>

            <Row justify="center" style={{margin: 20}}>
                <Col span={8}>
                    <Row justify="center">
                        <div>Invite Candidates to Your Test</div>
                    </Row>

                    <Row justify="center">
                        <div style={{textAlign: "center"}}>invite candidates to take your test and you'll see a breakdown
                            of their performance across
                            skills, time
                            management and their attempts during the test
                        </div>
                    </Row>
                </Col>
            </Row>

        </>
    )
        ;
}

export default AddCandidates;
