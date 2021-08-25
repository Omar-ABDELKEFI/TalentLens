import React, { useState } from 'react';
import { Col, Dropdown, Menu, Row } from 'antd';
import './TestCard.less';
import { ClockCircleOutlined } from '@ant-design/icons';
import { UnorderedListOutlined, UsergroupDeleteOutlined } from '@ant-design/icons/lib';
import { history } from '@redux/store';
import { useDispatch } from 'react-redux';
import { cloneTest } from '@redux/actions/tests';

const TestCard = ({ test }: any) => {
  const dispatch = useDispatch()
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span className={"test-card__test-menu-item"} onClick={(e:any)=>handleCloneClick(e)}>Clone</span>
      </Menu.Item>
    </Menu>
  );
  const [visible, setVisible] = useState(false);
  const handleMenuClick = (e: any) => {
    e.stopPropagation();
    setVisible(!visible);
  };
  const handleCloneClick = (e: any) => {
    e.stopPropagation();
    dispatch(cloneTest(test.test_id,test.expected_time))
  }

  return (
    <div className={'test-card__container'} onClick={() => {
      history.push(`/my-tests/${test.test_id}`);
    }}>
      <Row style={{ marginBottom: 10 }} justify={'space-between'}>
        <Col><span className={'test-card__test-name'}>{test.test_name}</span></Col>
        <Col>
          <Row>
            <Dropdown.Button visible={visible} buttonsRender={buttons => {
              buttons[1] =
                <span className={'test-card__test-menu'} onClick={(e: any) => handleMenuClick(e)}>...</span>;
              return buttons;
            }} overlay={menu}/>
          </Row>

        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <UsergroupDeleteOutlined className={'test-card__icon'}/>
          <span className={'test-card__card-element'}>{test.number_candidate} candidates</span>
        </Col>
        <Col span={6}>
          <UnorderedListOutlined className={'test-card__icon'}/>
          <span className={'test-card__card-element'}>{test.number_Question} Questions</span>
        </Col>
        <Col span={12}>

          <ClockCircleOutlined className={'test-card__icon'}/>
          <span
            className={'test-card__card-element'}>{test.expected_time === null ? '-' : test.expected_time} mins</span>
        </Col>
      </Row>
    </div>
  );
};

export default TestCard;
