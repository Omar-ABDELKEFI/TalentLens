import React from 'react';
import { Col, Row } from 'antd';
import "./TestCard.less"
import { ClockCircleOutlined } from "@ant-design/icons"
import { UnorderedListOutlined, UsergroupDeleteOutlined } from '@ant-design/icons/lib';
import {history} from '@redux/store';

const TestCard = ({test}:any) => {
  console.log(test,"testCard");
  return (
    <div className={"test-card__container"} onClick={()=>{history.push(`/my-tests/${test.test_id}`)}}>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}><span className={"test-card__test-name"}>{test.test_name}</span></Col>
      </Row>
      <Row>
        <Col span={6}>
          <UsergroupDeleteOutlined className={"test-card__icon"}/>
          <span className={"test-card__card-element"}>{test.number_candidate} candidates</span>
        </Col>
        <Col span={6}>
          <UnorderedListOutlined className={"test-card__icon"}/>
          <span className={"test-card__card-element"}>{test.number_Question} Questions</span>
        </Col>
        <Col span={12}>

          <ClockCircleOutlined className={"test-card__icon"} />
          <span className={"test-card__card-element"}>{test.expected_time===null?"-":test.expected_time} mins</span>
        </Col>
      </Row>
    </div>
  );
};

export default TestCard;
