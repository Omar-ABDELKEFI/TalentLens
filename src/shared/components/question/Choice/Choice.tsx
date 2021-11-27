import React from 'react';
import { Checkbox, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './Choice.less';

interface Ichoice {
  choice_text: string;
  is_answer: boolean;
  id?: number;
}

interface ChoiceProps {
  onDelete: (id?: number) => void;
  onTextChange: (e: any, id?: number) => void;
  choice: Ichoice;
  onCheckChange: (id?: number) => void;
}

const Choice: React.FC<ChoiceProps> = ({onDelete, choice, onTextChange, onCheckChange}) => {
    return (
        <div className="Choice__choices">
            <div className={'Choice__choices-checkbox'}>
                <Checkbox onChange={() => onCheckChange(choice.id)} checked={choice.is_answer}/>
            </div>
            <Input name="choice_text" onBlur={e => onTextChange(e, choice.id)} defaultValue={choice.choice_text}/>
            <div className="Choice__choices-icon" onClick={() => onDelete(choice?.id)}>
                <CloseOutlined style={{fontSize: '16px', color: '#08c'}}/>
            </div>
        </div>
    );
};

export default Choice;
