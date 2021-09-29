import React from 'react';
import { Checkbox } from 'antd';
import './Mca.less';

const Mca = ({ question, onCheckChange }: any) => {
  return (
    <>
      <div className={'mca__question-text'}>
        <span dangerouslySetInnerHTML={{ __html: question.question_text }}/>
      </div>
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
    </>
  );
};

export default Mca;
