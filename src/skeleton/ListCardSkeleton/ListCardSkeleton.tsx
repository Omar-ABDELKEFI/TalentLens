import React from 'react';
import { Col, Row, Skeleton } from 'antd';
import './ListCardSkeleton.less';

const CardSkeleton = () => {
  return (
    <div className={'list-card-skeleton__container'}>
      <Row>
        <Skeleton title={{ width: 60 }} paragraph={false} active/>
      </Row>
      <Row>
        <Col span={6}>
          <Skeleton title={{ width: 80 }} paragraph={false} active/>
        </Col>
        <Col span={6}>
          <Skeleton title={{ width: 80 }} paragraph={false} active/>
        </Col>
        <Col span={12}>
          <Skeleton title={{ width: 80 }} paragraph={false} active/>
        </Col>

      </Row>


    </div>
  );
};
const ListCardSkeleton = () => {
  return (
    <>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>

    </>
  );
};

export default ListCardSkeleton;