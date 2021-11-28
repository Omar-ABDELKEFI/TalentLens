import React from 'react';
import { Button, Row } from 'antd';
import { useSelector } from 'react-redux';
import TestQuestions from '@components/test/TestQuestions/TestQuestions';
import TestQuestionsSkeleton from '../../../../skeleton/TestQuestionsSkeleton/TestQuestionsSkeleton';
import { useWindowDimensions } from '@utils/common';
import ListCard from '@components/question/ListCard/ListCard';
import TestQuestionsCard from '@components/test/TestQuestionCard/TestQuestionCard';

function AddQuestions({ handleAddClick, questions }: any) {
  const loading = useSelector((state: any) => (state.test.loading));
  const { height, width } = useWindowDimensions();
  const checkWidth = (width: number) =>{
    if (width > 959){
      return true
    }
  }
  const sum = (questions: any) => {
    return questions.reduce((accum: any, item: any) =>
      accum + item.expected_time
      , 0);

  };
  return (
    <>
      {
        loading ? (<TestQuestionsSkeleton/>) :
          <>
            <Row justify="space-between" style={{ marginBottom: '10px' }}>
              <div>{questions.length === 0 ? 'Add questions to see the expected solving time.' : `Expected solving time ${sum(questions)} min`}</div>
              <div>
                <div>
                  <Button type="primary" style={{ background: '#28a745', borderColor: '#28a745' }}
                          onClick={handleAddClick}>Add
                    Questions</Button>


                </div>
              </div>
            </Row>
            {questions.length === 0 ?
              <Row justify="center">
                <div>Add Question to your test</div>
              </Row> : checkWidth(width) ?<TestQuestions questions={questions} /> : questions.map((question: any) => {

                  return (
                    // return question in card
                    <TestQuestionsCard question={question} />
                  );
                }
              )}

          </>
      }
    </>
  );
}

export default AddQuestions;
