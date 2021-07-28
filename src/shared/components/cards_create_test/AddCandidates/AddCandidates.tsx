import React, {useState} from 'react';
import {Row, Col, Slider, InputNumber, Button} from 'antd'


function AddCandidates() {
    const [PassingScore, setPassingScore] = useState(1)
    const [showFinalScore, setShowFinalScore] = useState(true)

    const onChangePassingScore = (value: any) => {
        console.log("passing score", PassingScore)
        setPassingScore(value)
    }
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
                                value={typeof PassingScore === 'number' ? PassingScore : 0}

                            />
                        </Col>
                        <Col span={8}>
                            <InputNumber
                                min={0}
                                max={100}
                                formatter={value => `${value}%`}
                                style={{width: "100%", marginLeft: 4}}
                                value={PassingScore}
                                onChange={onChangePassingScore}
                            />
                        </Col>
                    </Row>


                </Col>

                <Col>
                    <div>
                        <Button type="primary" style={{background: "#28a745", borderColor: "#28a745"}}>Primary
                            Button</Button>
                    </div>
                </Col>
            </Row>

            <Row justify="center" style={{margin:20}}>
                <Col span={8}>
                    <Row justify="center">
                        <div>Invite Candidates to Your Test</div>
                    </Row>

                    <Row justify="center">
                        <div style={{textAlign:"center"}}>nvite candidates to take your test and you'll see a breakdown of their performance across
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