import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification, Select, Slider } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Choice from '@components/question/Choice/Choice';
import McaQuestion from '@components/Quiz/McaQuestion/McaQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { getSkills } from '@redux/actions/skills';
import { createQuestion, updateQuestion } from '@redux/actions/question';
import { handleError } from '@utils/constTypesError';
import { ArgsProps, ConfigProps, NotificationApi } from 'antd/lib/notification';
import service from '@service/test-api';
import { useParams } from 'react-router';
import { history } from '@redux/store';
import Header from '@layout/header/header';
import "./EditMcaQuestion.less";
import RadioChoices from '@components/question/RadioChoices/RadioChoices';

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

const EditMcaQuestion = () => {
  const [questionTestIsValid, setQuestionTestIsValid] = useState<boolean>(true);
  const [choiceTestIsValid, setChoiceTestIsValid] = useState<boolean>(true);

  const [thereOneAnswer, setThereOneAnswer] = useState<boolean>(true);
  const dataError = useSelector((state: any) => state.questions.dataError);
  const handleCkeElement = (question_text: any) => {
    const ckeElement = document.getElementsByClassName('ck-editor__main');
    if (question_text === '') {
      setQuestionTestIsValid(false);
      ckeElement[0].classList.add('EditMcaQuestions__ckEditor');
      return false;
    } else {
      setQuestionTestIsValid(true);
      ckeElement[0].classList.remove('EditMcaQuestions__ckEditor');
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
  const [question, setQuestion] = useState<Iquestion | any>();
  const tokenError = useSelector((state: any) => state.skills.tokenError);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    service.baseApiParams.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    service.questions.editDetail(id).then(
      (res: any) => {
        console.log(res.data);
        setQuestion(res.data.data);
      },
      (res: any) => {
        if (res.error.error === 'token invalid') {
          history.push('/403');
        }
        console.log(res, 'resresresr');
      }
    );

    dispatch(getSkills());
  }, [dataError]);
  const skills = useSelector((state: any) => state.skills.skills);

  const [customSkill, setCustomSkill] = useState<boolean>(false);
  const handleAddButton = () => {
    setQuestion({
      ...question,
      choices: [...question.choices, { choice_text: '', is_answer: false, id: Math.random() }]
    });
  };
  const handleDelete = (id?: number) => {
    if (question.choices?.length > 2) {
      const updatedChoices = question.choices!.filter((choice: any) => choice.id !== id);
      setQuestion({ ...question, choices: updatedChoices });
    }
  };
  const handleChoiceChange = (e: any, id?: number) => {
    const value = e.target.value;
    setQuestion({
      ...question,
      choices: question.choices!.map((choice: any) =>
        choice.id === id
          ? {
            ...choice,
            choice_text: value
          }
          : choice
      )
    });
  };
  const handleChange = (e: any) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const handleSelectDifficulty = (value: any) => {
    setQuestion({ ...question, difficulty: value });
  };
  const handleSelectPoints = (value: any) => {
    setQuestion({ ...question, max_points: parseInt(value, 10) });
  };
  const handleSelectSkill = (value: any) => {

    for (const skill of skills) {
      if (skill.ID === value) {
        const name = skill.name;
        setQuestion({ ...question, skill_id: value, skill_name: name });
        break;
      }
    }
  };
  const handleSelectExpectedTime = (value: any) => {
    setQuestion({ ...question, expected_time: value });
  };
  const handleCheckChange = (id?: number) => {
    setQuestion({
      ...question,
      choices: question.choices!.map((choice: any) =>
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
  const handleRadioChange = (e: any) => {
    setQuestion({
      ...question,
      choices: question.choices!.map((choice: any) =>
        choice.id === e.target.value
          ? {
            ...choice,
            is_answer: true
          }
          : {
            ...choice ,
            is_answer:false
          }
      )
    });
    for (const choice of question.choices) {
      if (choice.id === e.target.value && !choice.is_answer) {
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
    if (questionTextValide && choicesValide) {
      dispatch(updateQuestion(id, question));
    }
  };
  const error = useSelector((state: any) => state.questions.error);

  useEffect(() => {
      if (error) {
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

    setQuestion({ ...question, question_text: editor.getData().toString() });
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
    <>
      <Header/>
      <div className="EditMcaQuestions__main-container">
        <div className="EditMcaQuestions__container">
          <h1 className="EditMcaQuestions__title">{question.type==="mca"?"New Multiple Correct Answers Question":"New Multiple Choices Question"}</h1>
          {
            question &&
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
                ]} initialValue={question.name}
              >

                <Input placeholder="Name" name="name" onChange={handleChange}/>

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
                          data={question.question_text}
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
                  {question.type ==="mca" ?
                    question.choices!.map((choice: any, index: number) => {
                    return (
                      <Choice
                        key={choice.id}
                        onDelete={handleDelete}
                        onTextChange={handleChoiceChange}
                        onCheckChange={handleCheckChange}
                        choice={choice}
                      />
                    );
                  })
                  :
                    <RadioChoices choices ={question.choices}
                                  onDelete={handleDelete}
                                  onTextChange={handleChoiceChange}
                                  handleRadioChange={handleRadioChange} />

                  }
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
                <div className="EditMcaQuestions__add-skill">
                  {!customSkill ? <Form.Item
                    style={{ width: '100%' }}
                    name="skill"
                  >
                    <Select onChange={handleSelectSkill} placeholder="select skill" defaultValue={question.Skill.ID}>
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

                <Button size={'large'} style={{ backgroundColor: '#28A745', color: '#fff' }}
                        onClick={() => history.goBack() }>
                  Close editor
                </Button>
              </Form.Item>
            </Form>}
        </div>
      </div>
    </>
  );
};

export default EditMcaQuestion;
