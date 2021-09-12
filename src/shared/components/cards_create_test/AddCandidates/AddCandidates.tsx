import React, { ChangeEvent, useEffect, useState } from 'react';
import { Row, Col, Slider, InputNumber, Button, Input, Modal, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionTest } from '@redux/actions';
import { useParams } from 'react-router-dom';
import ModelAddCandidates from '@components/cards_create_test/ModelAddCandidate/ModelAddCandidate';
import { handleError } from '@utils/constTypesError';
import { ArgsProps, ConfigProps, NotificationApi } from 'antd/lib/notification';

function AddCandidates({ idTest, initialPassingScore }: any) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const loading = useSelector(((state: any) => state.test.loading));
  const errorDuplicate = useSelector(((state: any) => state.test.error_add_candidate));
  console.log(errorDuplicate,"errorDuplicate");
  useEffect(() => {
      if (errorDuplicate&&errorDuplicate.length!==0) {
        console.log(errorDuplicate,"error1");
        errorDuplicate.map((email:any)=>openNotificationWithIcon("error", `the candidate with email ${email} already invited`))
      }
    }
    , [errorDuplicate])
  const openNotificationWithIcon = (type: string, description: string) => {
    notification[type as keyof NotificationApi]({
      message: 'error',
      description,
    } as ArgsProps & string & ConfigProps);
  };
  const onAfterChange = (value: any) => {

    if (!isNaN(value)) {
      dispatch(actionTest.updateTest(idTest, { passing_score: value }));
    }
  };
  const onChangePassingScore = (value: any) => {
    if (!isNaN(value)) {
      setPassingScore(value);
    }
  };
  const [passingScore, setPassingScore] = useState(initialPassingScore);

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
                onAfterChange={onAfterChange}
                value={typeof passingScore === 'number' ? passingScore : 0}
                disabled={loading}

              />
            </Col>
            <Col span={8}>
              <InputNumber
                min={0}
                max={100}
                formatter={value => `${value}%`}
                style={{ width: '100%', marginLeft: 4 }}
                value={passingScore}
                onChange={onChangePassingScore}
                onBlur={(e) => onAfterChange(parseInt(e.target.value.substr(0, e.target.value.indexOf('%'))))}
              />
            </Col>
          </Row>


        </Col>

        <Col>
          <div>
            <Button type="primary" style={{ background: '#28a745', borderColor: '#28a745' }}
                    onClick={showModal}>add candidate</Button>
          </div>
          <ModelAddCandidates isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                              />
        </Col>
      </Row>

      <Row justify="center" style={{ margin: 20 }}>
        <Col span={8}>
          <Row justify="center">
            <div>Invite Candidates to Your Test</div>
          </Row>

          <Row justify="center">
            <div style={{ textAlign: 'center' }}>invite candidates to take your test and you'll see a breakdown
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
