import React from 'react';
import { Table } from 'antd';
import TextIcon from '@components/TextIcon/TextIcon';
import { DashboardOutlined, InsertRowBelowOutlined } from '@ant-design/icons/lib';
import NameCol from '@components/test/NameCol/NameCol';

const TestQuestions = ({ questions }: any) => {
  const columns = [
    {
      title: '#',
      width: '5%',
      render: (text: any, record: any) => <div>{questions.indexOf(record) + 1}</div>
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      width: '50%',
      render: (name: any, record: any) => <NameCol question={record}/>,
      ellipsis:true
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: '12%',
      render: (type: any) => <TextIcon icon={InsertRowBelowOutlined} text={type}/>
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      width: '12%',
      render: (difficulty: any) => <TextIcon icon={DashboardOutlined} text={difficulty}/>

    },
    {
      title: 'Time',
      dataIndex: 'expected_time',
      width: '12%',
      render: (time: any) => <span style={{ color: '#006fad' }}>{time} min</span>
    },
    {
      title: 'Points',
      dataIndex: 'max_points',
      width: '12%',
      render: (points: any) => <span style={{ color: '#006fad' }}>{points} points</span>

    }

  ];

  return (
    <Table dataSource={questions} columns={columns} rowKey={record => record.ID} bordered
           rowClassName={(record, index) => index % 2 === 0 ? 'display-candidates__table-even-row' : ''}/>
  );
};

export default TestQuestions;