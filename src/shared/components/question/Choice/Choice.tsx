import React from 'react';
import {Checkbox, Input} from 'antd';
import {CloseOutlined} from '@ant-design/icons';


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
        <div className="question__choices">
            <div className={'question__choices-checkbox'}>
                <Checkbox onChange={() => onCheckChange(choice.id)}/>
            </div>
            <Input name="choice_text" onBlur={e => onTextChange(e, choice.id)}/>
            <div className="question__choices-icon" onClick={() => onDelete(choice?.id)}>
                <CloseOutlined style={{fontSize: '16px', color: '#08c'}}/>
            </div>
        </div>
    );
};

export default Choice;
