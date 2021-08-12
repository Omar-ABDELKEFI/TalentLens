import React from 'react';
import { Col, Row } from 'antd';

import { ClockCircleOutlined } from "@ant-design/icons"
import { Table, Tag, Space } from 'antd';
import { UnorderedListOutlined, UsergroupDeleteOutlined } from '@ant-design/icons/lib';
const TestQuestionsTable = ({data}:any) => {
  const columns = [
    {
      title: 'Questions',
      dataIndex: 'Questions',
      key: 'Questions',

    },
    {
      title: 'Environment',
      dataIndex: 'Environment',
      key: 'Environment',
    },
    ]

  return (
    <>
      <Table columns={columns} dataSource={data}/>
    </>
  );
};

export default TestQuestionsTable;
