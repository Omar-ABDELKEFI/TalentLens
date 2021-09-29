import React from 'react';

import { Table } from 'antd';

const TestQuestionsTable = ({ data }: any) => {
  const columns = [
    {
      title: 'Questions',
      dataIndex: 'Questions',
      key: 'Questions'

    },
    {
      title: 'Environment',
      dataIndex: 'Environment',
      key: 'Environment'
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={data}/>
    </>
  );
};

export default TestQuestionsTable;
