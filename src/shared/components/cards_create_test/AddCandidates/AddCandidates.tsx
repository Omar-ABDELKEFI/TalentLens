import React, { useEffect, useState } from 'react';
import { Button, Col, InputNumber, notification, Row, Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionTest } from '@redux/actions';
import ModelAddCandidates from '@components/cards_create_test/ModelAddCandidate/ModelAddCandidate';
import { ArgsProps, ConfigProps, NotificationApi } from 'antd/lib/notification';
import { useWindowDimensions } from '@utils/common';
import { getTest } from '@redux/actions/tests';
import DisplayCandidates from '@screens/displayCandidates/DisplayCandidates';

function AddCandidates({ idTest, initialPassingScore }: any) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const loading = useSelector(((state: any) => state.test.loading));
  const questions = useSelector(((state: any) => state.test.test.questions));
  const errorDuplicate = useSelector(((state: any) => state.test.error_add_candidate));
  const test = useSelector((state: any) => (state.test.test));
  const { height, width } = useWindowDimensions();
  console.log(errorDuplicate, 'errorDuplicate');
  const checkWidth = (width: number) =>{
    return width > 650;
  }
  useEffect(() => {
      if (errorDuplicate && errorDuplicate.length !== 0) {
        console.log(errorDuplicate, 'error1');
        errorDuplicate.map((email: any) => openNotificationWithIcon('error', `the candidate with email ${email} already invited`));
        dispatch(actionTest.removeError([]));
      }
      else{
        dispatch(getTest(idTest));
      }

    }
    , [errorDuplicate]);
  const openNotificationWithIcon = (type: string, description: string) => {
    notification[type as keyof NotificationApi]({
      message: 'error',
      description
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

        <Col order={1}>
          <div hidden={test.candidate.length !==0}>No candidates invited</div>
          <div hidden={test.candidate.length ===0}>invite more candidate</div>
        </Col>
        <Col span={checkWidth(width)?8:24} order={!checkWidth(width)?3:2}>

          <Col span={24} hidden={!checkWidth(width)}>
            <div style={{marginLeft:4}}>passing score</div>
          </Col>

          <Row>
            <Col span={13} hidden={!checkWidth(width)} >

              <Slider
                min={0}
                max={100}
                onChange={onChangePassingScore}
                onAfterChange={onAfterChange}
                value={typeof passingScore === 'number' ? passingScore : 0}
                disabled={loading}

              />
            </Col>
            <span style={{verticalAlign:"middle",lineHeight:2,marginRight:5}} hidden={checkWidth(width)}>passing score</span>
            <Col span={checkWidth(width)?8:3}>

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

        <Col order={!checkWidth(width)?2:3}>
          <div>
            <Button type="primary" style={{ background: '#28a745', borderColor: '#28a745' }}
                    disabled={questions.length === 0} onClick={showModal}>invite <span hidden={!checkWidth(width)}>&nbsp;candidate</span></Button>
          </div>
          <ModelAddCandidates isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
          />
        </Col>
      </Row>
      {test.candidate.length !==0&&<DisplayCandidates idTest={idTest}/>}
      <Row justify="center" style={{ margin: 20 }}>
        <Col span={24} lg={8}>
          <Row justify="center">
            <div hidden={test.candidate.length !==0}>Invite Candidates to Your Test</div>
          </Row>

          <Row justify="center">
            <div hidden={test.candidate.length !==0} style={{ textAlign: 'center' }}>invite candidates to take your test and you'll see a breakdown
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
