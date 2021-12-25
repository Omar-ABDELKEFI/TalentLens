import React from 'react';
import { Button, Card, Col, Modal, Row } from 'antd';
import './ModelQuestionTypes.less';
import { Link } from 'react-router-dom';
import mca from '../../../../assets/img/mca.png';
import mcq from '../../../../assets/img/mcq.png'
function ModelQuestionTypes({ isModalVisible, setIsModalVisible }: any) {


  // const [valuesCandidate, setValuesCandidate] = useState<any>([])


  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Grid } = Card;
  return (
    <>
      <Modal title="add candidate" visible={isModalVisible} onCancel={handleCancel} width={1200} okButtonProps={{style:{display:"none"}}}>
        <Row gutter={[16, 16]}>
          <Col sm={24} md={12} lg={12}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice DisplayQuestion (MCA)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">For questions with multiple answer options where more
                than one answer is correct.
              </p>
              <Link to={'/questions/edit?type=mca'}><Button block size='middle' className="ModelQuestionTypes__button"
                                                            type="primary"> Create Multiple Choice
                DisplayQuestion </Button></Link>
            </Card>
          </Col>
          <Col sm={24} md={12} lg={12}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice DisplayQuestion (MCQ)"
                  bordered={false}>
              <img src={mcq} alt="mcq" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">For questions with multiple answer options but there is only one
                correct answer.
              </p>
              <Link to={'/questions/edit?type=mcq'}><Button block size='middle' className="ModelQuestionTypes__button"
                                                            type="primary"> Create Multiple Choice
                DisplayQuestion </Button></Link>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  )
    ;
}

export default ModelQuestionTypes;
