import React, { useEffect, useState } from 'react';
import './McaQuestions.less';
import { Button, Form, Input, Modal, notification, Select, Slider } from 'antd';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useDispatch, useSelector } from 'react-redux';
import Choice from '@components/question/Choice/Choice';
import { getSkills } from '@redux/actions/skills';
import { createQuestion } from '@redux/actions/question';
import Header from '@layout/header/header';
import { handleError } from '@utils/constTypesError';
import { ArgsProps, ConfigProps, NotificationApi } from 'antd/lib/notification';
import McaQuestion from '@components/Quiz/McaQuestion/McaQuestion';

interface Ichoice {
  choice_text: string;
  is_answer: boolean;
  id?: number;
}

interface Iquestion {
  choices: Ichoice[];
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
  const [questionTestIsValid, setQuestionTestIsValid] = useState<boolean>(true);
  const [choiceTestIsValid, setChoiceTestIsValid] = useState<boolean>(true);

  const [thereOneAnswer, setThereOneAnswer] = useState<boolean>(true);
  const dataError = useSelector((state: any) => state.questions.dataError);
  console.log(dataError && dataError.error.error.Message, 'daataError');
  const handleCkeElement = (question_text: any) => {
    const ckeElement = document.getElementsByClassName('ck-editor__main');
    console.log(question.question_text, 'question.question_text');
    if (question_text === '') {
      setQuestionTestIsValid(false);
      console.log(ckeElement[0], 'ckeElement');
      ckeElement[0].classList.add('McaQuestions__ckEditor');
      return false;
    } else {
      setQuestionTestIsValid(true);
      ckeElement[0].classList.remove('McaQuestions__ckEditor');
      return true;
    }
  };

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
      { choice_text: '', is_answer: false, id: Math.random() }

    ],
    difficulty: 'easy',
    max_points: 1,
    expected_time: 1,
    question_text: '',
    skill_name: '',
    type: 'mca'
  });
  const tokenError = useSelector((state: any) => state.skills.tokenError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSkills());
  }, [dataError]);
  const skills = useSelector((state: any) => state.skills.skills);

  console.log(skills, 'skiils');
  const [customSkill, setCustomSkill] = useState<boolean>(false);
  const handleAddButton = () => {
    setQuestion({
      ...question,
      choices: [...question.choices, { choice_text: '', is_answer: false, id: Math.random() }]
    });
    console.log(question);
  };
  const handleDelete = (id?: number) => {
    if (question.choices?.length > 2) {
      const updatedChoices = question.choices!.filter(choice => choice.id !== id);
      setQuestion({ ...question, choices: updatedChoices });
    }
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
    setQuestion({ ...question, max_points: parseInt(value, 10) });
    console.log(question);
  };
  const handleSelectSkill = (value: any) => {

    for (const skill of skills) {
      if (skill.ID === value) {
        const name = skill.name;
        setQuestion({ ...question, skill_id: value, skill_name: name });
        break;
      }
    }
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
    for (const choice of question.choices) {
      if (choice.id === id && !choice.is_answer) {
        setThereOneAnswer(true);
        return true;
      }
      if (choice.is_answer === true) {
        setThereOneAnswer(true);
        return true;
      }
    }
  };
  const handleForm =
    (e: any) => {

      console.log(e, 'fffffffffffffffff');
      handleCkeElement(question.question_text);
      for (const choice of question.choices) {
        if (choice.choice_text === '') {
          setChoiceTestIsValid(false);
          return false;
        }
      }
      setChoiceTestIsValid(true);
      let choicesValide = false;
      for (const choice of question.choices) {
        if (choice.is_answer === true) {
          choicesValide = true;
          setThereOneAnswer(true);
          return true;
        }
      }
      setThereOneAnswer(false);
      if (!choicesValide) {
        return false;
      }

      return true;
    };
  const handleSubmit = (e: any) => {
    const questionTextValide = handleCkeElement(question.question_text);
    const choicesValide = handleForm(e);
    console.log(choicesValide, 'choicesValide');
    if (questionTextValide && choicesValide) {
      dispatch(createQuestion(question));
    }
  };
  const error = useSelector((state: any) => state.questions.error);

  console.log(dataError && dataError.error.error.Message, 'dataError');
  useEffect(() => {
      if (error) {
        console.log(error.errors, 'error1');
        error.map((err: any) => openNotificationWithIcon('error', handleError(err)));
      }
    }
    , [error]);
  const openNotificationWithIcon = (type: string, description: string) => {
    notification[type as keyof NotificationApi]({
      message: 'error',
      description
    } as ArgsProps & string & ConfigProps);
  };
  const handleEditorChange = (event: any, editor: any) => {

    console.log(question, 'question');
    setQuestion({ ...question, question_text: editor.getData().toString() });
    console.log(question);
    handleCkeElement(editor.getData().toString());
  };
  const handleNewSkill = (e: any) => {
    setQuestion({ ...question, skill_name: e.target.value });
  };
  const handleAddSkillClick = () => {
    setCustomSkill(!customSkill);
    setQuestion({ ...question, skill_name: '' });
  };

  const token = localStorage.getItem('token');
  const [showModal, setShowModal] = useState<boolean | undefined>(false);

  return (
    <>{tokenError ? <></> :
      <>
        <Header/>
        <div className="McaQuestions__main-container">
          <div className="McaQuestions__container">
            <h1 className="McaQuestions__title">New Multiple Correct Answers Question</h1>
            <Form
              scrollToFirstError
              labelCol={{
                span: 5
              }}
              colon={false}
              onFinishFailed={handleForm}
              onFinish={handleSubmit}
            >
              <Form.Item
                required
                name="name"
                label={
                  <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
                    Name
                  </label>
                }

                rules={[
                  {
                    required: true,
                    message: 'name is required'
                  }
                ]}
              >

                <Input defaultValue={question.name} placeholder="Name" name="name" onChange={handleChange}/>

              </Form.Item>
              <div style={{ marginLeft: 228, color: 'red' }} hidden={!(dataError && dataError.error.error.Message)}>name
                have to be unique
              </div>
              <Form.Item
                required
                label={
                  <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
                    Question Text
                  </label>
                }

              >
                <CKEditor editor={ClassicEditor}


                          onChange={(e: any, editor: any) => handleEditorChange(e, editor)}/>
                <div hidden={questionTestIsValid} style={{ color: 'red' }}>the question test is required</div>
              </Form.Item>
              <Form.Item
                required
                label={
                  <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
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
                <div style={{ color: 'red' }} hidden={choiceTestIsValid}>The choice text is required</div>
                <div style={{ color: 'red' }} hidden={!choiceTestIsValid ? true : thereOneAnswer}>There should be one
                  correct answer
                </div>
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
                    Difficulty
                  </label>
                }
              >
                <Select onChange={handleSelectDifficulty} defaultValue={question.difficulty}>
                  <Select.Option value="hard">Hard</Select.Option>
                  <Select.Option value="easy">Easy</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
                    Points
                  </label>
                }
              >
                <Select onChange={handleSelectPoints} defaultValue={question.max_points}>
                  <Select.Option value={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                  <Select.Option value={4}>4</Select.Option>
                  <Select.Option value={5}>5</Select.Option>
                  <Select.Option value={6}>6</Select.Option>
                  <Select.Option value={7}>7</Select.Option>
                  <Select.Option value={8}>8</Select.Option>
                  <Select.Option value={9}>9</Select.Option>
                  <Select.Option value={10}>10</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
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

                required
                label={
                  <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
                    Skill
                  </label>
                }
              >
                <div className="McaQuestions__add-skill">
                  {!customSkill ? <Form.Item
                    style={{ width: '100%' }}
                    name="skill"
                    rules={[
                      {
                        required: true,
                        message: 'Please select skill!'
                      }
                    ]}
                  >
                    <Select onChange={handleSelectSkill} placeholder="select skill">
                      {skills &&
                      skills.map((skill: any) => {
                        return (
                          <Select.Option value={skill.ID} key={skill.ID}>
                            {skill.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item> : <Form.Item name="skillInput" style={{ width: '100%' }} rules={[
                    {
                      required: true,
                      message: 'Please enter skill!'
                    }
                  ]}>
                    <Input
                      placeholder="Type your custom skill name"
                      name="skillInput"
                      onChange={handleNewSkill}
                    /></Form.Item>
                  }
                  <Button type="primary" onClick={handleAddSkillClick}>
                    {customSkill ? 'Discard custom skill' : 'Add new skkill'}
                  </Button>
                </div>
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(33,37,41)' }}>
                    Preview
                  </label>
                }
              >
                <Button type="primary" onClick={() => setShowModal((prevState => !prevState))}>Preview as
                  candidate</Button>
                <Modal title="Preview" visible={showModal} onOk={() => setShowModal((prevState => !prevState))}
                       cancelButtonProps={{ style: { display: 'none' } }}
                       onCancel={() => setShowModal((prevState => !prevState))}
                       width={'100%'}
                       style={{ top: 5 }}
                >
                  <McaQuestion questionIndex={1}
                               totalQuestion={1}
                               currentQuestion={question}
                               lastUpdate={Date.now()}
                  />
                </Modal>
              </Form.Item>
              <Form.Item>
                <Button
                  size={'large'}
                  style={{ backgroundColor: '#28A745', color: '#fff' }}
                  htmlType={'submit'}
                >
                  Save
                </Button>
                <Button size={'large'} style={{ backgroundColor: '#28A745', color: '#fff' }}>
                  Close editor
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </>}</>

  )
    ;
};
export default Question;
