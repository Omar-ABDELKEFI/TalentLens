import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getQuestions} from "@redux/actions/question";
import ListCard from "@components/question/ListCard/ListCard";
import './AddTestQuestions.less'
import {Button } from 'antd'
import {Link} from "react-router-dom";
const AddTestQuestions: React.FC<any> = () => {
    const questions = useSelector((state: any) => state.questions.questions);
    const errors = useSelector((state: any) => state.questions.error)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("addd rerendereed")
        dispatch(getQuestions());
        console.log(questions)

    }, []);
    return  errors ? (
            <h1>{errors}</h1>
        ) : (
            <div >
                <div className={"add-questions__add-btn-container"}><Link to={"/question"}><Button className="add-questions__create-button">Create Question</Button></Link></div>
                {questions && questions.map((question: any) => {

                    return (
                        // return question in card
                            <ListCard question={question} key={question.id} />
                        );
                    }
                )}
            </div>
        )

};

export default AddTestQuestions;