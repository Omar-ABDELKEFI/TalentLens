import React, {useEffect, useState} from 'react';
import './Question.less';
import {Form, Input, Button, Slider, Select} from 'antd';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {useDispatch, useSelector} from 'react-redux';
import Choice from '@components/question/Choice/Choice';
import {getSkills} from '@redux/actions/skills';
import {createQuestion} from '@redux/actions/question';
import {Redirect} from "react-router-dom";
import Header from '@layout/header/header';

interface Ichoice {
    choice_text: string;
    is_answer: boolean;
    id?: number;
}

interface Iquestion {
    choices?: Ichoice[];
    difficulty: string;
    expected_time: number;
    file_read_me?: string;
    max_points: number;
    name: string;
    question_text: string;
    skill_id?: number;
    type?: string;
    skill_name?: string
}

const Question = () => {
  const marks = {
    1: '1',
    2: '2',
    3: '3',
    5: '5',
    7: '7',
    10: '10',
    15: '15',
    20: '20',
    30: '30',
    40: '40',
    60: '60'
  };
  const [question, setQuestion] = useState<Iquestion>({
    name: '',
    choices: [
      { choice_text: '', is_answer: false, id: Math.random() },
      { choice_text: '', is_answer: false, id: Math.random() },
      { choice_text: '', is_answer: false, id: Math.random() },
      { choice_text: '', is_answer: false, id: Math.random() }
    ],
    difficulty: '',
    max_points: 3,
    expected_time: 10,
    question_text: '',
    skill_name: ''
  });
  const skills = useSelector((state: any) => state.skills.skills);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSkills());
  }, []);
  const [customSkill, setCustomSkill] = useState<boolean>(false);
  const handleAddButton = () => {
    setQuestion({
      ...question,
      choices: [...question.choices, { choice_text: '', is_answer: false, id: Math.random() }]
    });
    console.log(question);
  };
  const handleDelete = (id?: number) => {
    const updatedChoices = question.choices!.filter(choice => choice.id !== id);
    setQuestion({ ...question, choices: updatedChoices });
  };
  const handleChoiceChange = (e: any, id?: number) => {
    const value = e.target.value;
    setQuestion({
      ...question,
      choices: question.choices!.map(choice =>
        choice.id === id
          ? {
            ...choice,
            choice_text: value
          }
          : choice
      )
    });
    console.log(question);
  };
  const handleChange = (e: any) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
    console.log(question);
  };
  const handleSelectDifficulty = (value: any) => {
    setQuestion({ ...question, difficulty: value });
    console.log(question);
  };
  const handleSelectPoints = (value: any) => {
    setQuestion({ ...question, max_points: parseInt(value,10) });
    console.log(question);
  };
  const handleSelectSkill = (value: any) => {
    setQuestion({ ...question, skill_id: value });
    console.log(question);
  };
  const handleSelectExpectedTime = (value: any) => {
    setQuestion({ ...question, expected_time: value });
    console.log(question);
  };
  const handleCheckChange = (id?: number) => {
    setQuestion({
      ...question,
      choices: question.choices!.map(choice =>
        choice.id === id
          ? {
            ...choice,
            is_answer: !choice.is_answer
          }
          : choice
      )
    });
  };
  const handleSubmit = (values: any) => {
    dispatch(createQuestion(question));
  };
  const handleEditorChange = (event: any,editor:any) => {
    console.log(question,"question")
    setQuestion({...question, question_text:editor.getData().toString()});
    console.log(question);
  };
  const handleNewSkill = (e: any) => {
    setQuestion({ ...question, skill_name: e.target.value });
  };
  const handleAddSkillClick = () => {
    setCustomSkill(!customSkill);
    setQuestion({ ...question, skill_name: '' });
  };

    const token = localStorage.getItem("token")
    return (
        <>{!token ? <Redirect to="/403"/> :
                <>
                <Header/>
                <div className="question__main-container">
                    <div className="question__container">
                        <h1 className="question__title">New Multiple Correct Answers Question</h1>
                        <Form
                            labelCol={{
                                span: 5
                            }}
                            colon={false}
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                label={
                                    <label style={{fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)'}}>
                                        Name
                                    </label>
                                }
                            >
                                <Input placeholder="Name" name="name" onBlur={handleChange}/>
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label style={{fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)'}}>
                                        Question Text
                                    </label>
                                }
                            >
                                <CKEditor editor={ClassicEditor}
                                          onChange={(e: any, editor: any) => handleEditorChange(e, editor)}/>
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label style={{fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)'}}>
                                        Choices
                                    </label>
                                }
                            >
                                <div>
                                    {question.choices!.map((choice, index) => {
                                        return (
                                            <Choice
                                                key={choice.id}
                                                onDelete={handleDelete}
                                                onTextChange={handleChoiceChange}
                                                onCheckChange={handleCheckChange}
                                                choice={choice}
                                            />
                                        );
                                    })}
                                    <Button type="primary" onClick={handleAddButton}>
                                        Add new
                                    </Button>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label style={{fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)'}}>
                                        Difficulty
                                    </label>
                                }
                            >
                                <Select onChange={handleSelectDifficulty}>
                                    <Select.Option value="-">-</Select.Option>
                                    <Select.Option value="hard">Hard</Select.Option>
                                    <Select.Option value="easy">Easy</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label style={{fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)'}}>
                                        Points
                                    </label>
                                }
                            >
                                <Select onChange={handleSelectPoints}>
                                    <Select.Option value="1">1</Select.Option>
                                    <Select.Option value="2">2</Select.Option>
                                    <Select.Option value="3">3</Select.Option>
                                    <Select.Option value="4">4</Select.Option>
                                    <Select.Option value="5">5</Select.Option>
                                    <Select.Option value="6">6</Select.Option>
                                    <Select.Option value="7">7</Select.Option>
                                    <Select.Option value="8">8</Select.Option>
                                    <Select.Option value="9">9</Select.Option>
                                    <Select.Option value="10">10</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label style={{fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)'}}>
                                        Expected Time
                                    </label>
                                }
                            >
                                <Slider
                                    marks={marks}
                                    value={question.expected_time}
                                    included={false}
                                    defaultValue={1}
                                    step={null}
                                    max={60}
                                    onChange={handleSelectExpectedTime}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label style={{fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)'}}>
                                        Skill
                                    </label>
                                }
                            >
                                <div className="question__add-skill">
                                    {!customSkill ? (
                                        <Select onChange={handleSelectSkill}>
                                            {skills &&
                                            skills.map((skill: any) => {
                                                return (
                                                    <Select.Option value={skill.ID} key={skill.ID}>
                                                        {skill.name}
                                                    </Select.Option>
                                                );
                                            })}
                                        </Select>
                                    ) : (
                                        <Input
                                            placeholder="Type your custom skill name"
                                            name="skill"
                                            onChange={handleNewSkill}
                                        />
                                    )}
                                    <Button type="primary" onClick={handleAddSkillClick}>
                                        {customSkill ? 'Discard custom skill' : 'Add new skkill'}
                                    </Button>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label style={{fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)'}}>
                                        Preview
                                    </label>
                                }
                            >
                                <Button type="primary">Preview as candidate</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    size={'large'}
                                    style={{backgroundColor: '#28A745', color: '#fff'}}
                                    htmlType={'submit'}
                                >
                                    Save
                                </Button>
                                <Button size={'large'} style={{backgroundColor: '#28A745', color: '#fff'}}>
                                    Close editor
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div> </>}</>

        )
        ;
};
export default Question;
