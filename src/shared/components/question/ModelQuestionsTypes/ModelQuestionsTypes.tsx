import React from 'react';
import { Button, Card, Col, Modal, Row } from 'antd';
import './ModelQuestionTypes.less';
import { Link } from 'react-router-dom';
import mca from '../../../../assets/img/mca.png';

function ModelQuestionTypes({ isModalVisible, setIsModalVisible }: any) {


  // const [valuesCandidate, setValuesCandidate] = useState<any>([])




  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Grid } = Card;
  return (
    <>
      <Modal title="add candidate" visible={isModalVisible}  onCancel={handleCancel} width={1200} footer={[]}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages
                and add different test cases to validate candidate solutions</p>
              <Link to={'/questions/edit'}><Button block size='middle' className="ModelQuestionTypes__button"
                                                   type="primary"> Create Multiple Choice Question </Button></Link>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages
                and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice
                Question </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages
                and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice
                Question </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages
                and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice
                Question </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages
                and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice
                Question </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f8f9fa', textAlign: 'center' }} title="Multiple Choice Question (MCQ)"
                  bordered={false}>
              <img src={mca} alt="mca" className="ModelQuestionTypes__img-container"/>
              <p className="ModelQuestionTypes__desc-container">Create a coding task in various programming languages
                and add different test cases to validate candidate solutions</p>
              <Button block size='middle' className="ModelQuestionTypes__button" type="primary"> Create Multiple Choice
                Question </Button>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  )
    ;
}

export default ModelQuestionTypes;
