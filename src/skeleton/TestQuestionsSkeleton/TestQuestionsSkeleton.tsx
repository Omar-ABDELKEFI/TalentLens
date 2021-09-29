import React from 'react';
import { Button, Col, Row, Skeleton, Table } from 'antd';

const TestQuestionsSkeleton = () => {
  const columns = [
    {
      title: '#',
      width: '5%',
      render: () => <Skeleton paragraph={false} title={{ width: 10 }} active/>
    },
    {
      title: 'Name',
      width: '50%',
      render: () => <Skeleton paragraph={false} title={{ width: 150 }} active/>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: '12%',
      render: () => <Skeleton paragraph={false} title={{ width: 40 }} active/>
    },
    {
      title: 'Difficulty',
      width: '12%',
      render: () => <Skeleton paragraph={false} title={{ width: 40 }} active/>

    },
    {
      title: 'Time',
      width: '12%',
      render: () => <Skeleton paragraph={false} title={{ width: 40 }} active/>
    },
    {
      title: 'Points',
      width: '12%',
      render: () => <Skeleton paragraph={false} title={{ width: 40 }} active/>

    }
  ];
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div>
      <Row justify="space-between" align={'middle'} style={{ marginBottom: '10px' }}>
        <Col>
          <Skeleton paragraph={false} title={{ width: 150 }} active/>
        </Col>
        <Col>
          <Button type="primary" style={{ background: '#28a745', borderColor: '#28a745' }}
                  disabled={true}>Add
            Questions</Button>
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} rowKey={record => record.id} bordered
             rowClassName={(record, index) => index % 2 === 0 ? 'display-candidates__table-even-row' : ''}/>
    </div>
  );
};

export default TestQuestionsSkeleton;
