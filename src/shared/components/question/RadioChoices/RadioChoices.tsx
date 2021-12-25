import React from 'react';
import { Input, Radio } from 'antd';
import { CloseOutlined } from '@ant-design/icons/lib';
import './RadioChoices.less'
const RadioChoices = ({choices , onTextChange , onDelete , handleRadioChange } : any) => {
  return (
    <Radio.Group style={{display: 'block'}} onChange={handleRadioChange}>
      {choices.map( (choice : any , index: any) => {
        return(
          <div className="Radio-Choice__choices" key={choice.id}>
            <div className={'Radio-Choice__choices-radio'}>
              <Radio value={choice.id} />
            </div>
            <Input name="Radio-choice_text" onBlur={e => onTextChange(e, choice.id)} defaultValue={choice.choice_text}/>
            <div className="Radio-Choice__choices-icon" onClick={() => onDelete(choice?.id)}>
              <CloseOutlined style={{fontSize: '16px', color: '#08c'}}/>
            </div>
          </div>

        );
      })}
    </Radio.Group>
  );
};

export default RadioChoices;
