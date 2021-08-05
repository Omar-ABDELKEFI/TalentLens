import React from 'react';
import { Col, Row } from 'antd';
import "./TestCard.less"
import { ClockCircleOutlined } from "@ant-design/icons"
import { UnorderedListOutlined, UsergroupDeleteOutlined } from '@ant-design/icons/lib';
const TestCard = () => {
  return (
    <div className={"test-card__container"}>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}><span className={"test-card__test-name"}>Custom test</span></Col>
      </Row>
      <Row>
        <Col span={6}>
          <UsergroupDeleteOutlined className={"test-card__icon"}/>
          <span className={"test-card__card-element"}>0 candidates</span>
        </Col>
        <Col span={6}>
          <UnorderedListOutlined className={"test-card__icon"}/>
          <span className={"test-card__card-element"}>0 Questions</span>
        </Col>
        <Col span={12}>

          <ClockCircleOutlined className={"test-card__icon"} />
          <span className={"test-card__card-element"}>10 mins</span>
        </Col>
      </Row>
    </div>
  );
};

export default TestCard;