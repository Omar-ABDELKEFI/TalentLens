import React from 'react';
import { Checkbox, Input, Radio } from 'antd';
import './Mca.less';
import { CloseOutlined } from '@ant-design/icons/lib';

const Mca = ({ question, onCheckChange , onRadioChange}: any) => {
  return (
    <>
      <div className={'mca__question-text'}>
        <span dangerouslySetInnerHTML={{ __html: question.question_text }}/>
      </div>
      {question.type === "mca" ?
        <Checkbox.Group onChange={onCheckChange}>
          {question.choices.map((choice: any) => {
            return (
              <div key={choice.id} className={'mca__option'}>
                <Checkbox value={choice.id} style={{ paddingRight: '5px' }}/>
                {choice.choice_text}
              </div>
            );
          })
          }
        </Checkbox.Group>
        :
        <Radio.Group onChange={onRadioChange}>
          {question.choices.map((choice: any) => {
            return (
              <div key={choice.id} className={'mca__option'}>
                <Radio value={choice.id} style={{ paddingRight: '5px' }}>
                {choice.choice_text}
                </Radio>
              </div>
            );
          })
          }
        </Radio.Group>

      }
      </>
  );
};

export default Mca;
