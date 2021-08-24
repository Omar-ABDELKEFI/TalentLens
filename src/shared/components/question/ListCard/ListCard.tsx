import React, {useEffect, useState} from 'react';
import './ListCard.less';
import {DashboardOutlined, ClockCircleOutlined, InsertRowBelowOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {addTestQuestions, removeTestQuestions} from "@redux/actions/question";
import {useParams} from "react-router";
import { removeHtml } from '@utils/common';

const ListCard: React.FC<any> = ({question}) => {
    const {idTest} = useParams();
    const dispatch = useDispatch();
    const [added, setAdded] = useState<boolean>()
    const loading = useSelector((state: any) => state.questions.loading);

    useEffect(() => {
        const isAdded = question.test_questions?.some((test_question: any) => {
            return test_question.test_id === Number(idTest)
        })
        setAdded(isAdded)
    },[])

    const handleAddClick = (question_id: number) => {
        setAdded((prevState => !prevState))
        dispatch(addTestQuestions(question_id, idTest))
    }
    const handleRemoveClick = () => {
        const testQuestion = question.test_questions.filter((test_question: any) => test_question.test_id === Number(idTest))
        setAdded((prevState => !prevState))
        dispatch(removeTestQuestions(testQuestion[0].ID, question.ID))
    }
    return (
        <div className="list-card__container">
            <div className={'list-card__row'}>
                <div className={'list-card__question-body'}>
                    <span>{question.name} - </span>
                    <div className={'list-card__question-text'}>
                        {removeHtml(question.question_text)}
                    </div>
                </div>
                {
                    added ? (
                        <button disabled={loading} className={'list-card__button'} onClick={handleRemoveClick}>Remove Question</button>
                      ) :
                      (
                        <button disabled={loading} className={'list-card__button'}  onClick={()=>handleAddClick(question.ID)}>Add Question</button>
                      )
                }
            </div>
            <div className={'list-card__row'}>
                <span className={'list-card__skill'}>{question.Skill.name}</span>
            </div>
            <div className={'list-card__row-3'}>
                <div className={'list-card__row-item'}>
                    <div className={'list-card__icon'}>
                        <DashboardOutlined/>
                    </div>
                    <span>{question.difficulty}</span>
                </div>
                <div className={'list-card__row-item'}>
                    <div className={'list-card__icon'}>
                        <ClockCircleOutlined/>
                    </div>
                    <span>{question.expected_time}</span>
                </div>
                <div className={'list-card__row-item'}>
                    <div className={'list-card__icon'}>
                        <InsertRowBelowOutlined/>
                    </div>
                    <span>mcq</span>
                </div>
            </div>
        </div>
    );
};

export default ListCard;
