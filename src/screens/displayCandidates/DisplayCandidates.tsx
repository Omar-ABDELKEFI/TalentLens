import React, { useEffect, useState } from 'react';
import { Table, Input, Select } from 'antd';
import './DisplayCandidates.less';
import service from '@service/test-api';
import Header from '@layout/header/header';
import { Redirect } from 'react-router-dom';
import ScoreCol from '@components/display_candidates/ScoreCol/ScoreCol';
import CandidateCol from '@components/display_candidates/CandidateCol/CandidateCol';
import { history } from '@redux/store';
import { useSelector } from 'react-redux';

const DisplayCandidates = () => {

  const [dataSource, setDataSource] = useState<any>([]);
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [errorToken,setErrorToken]=useState(undefined)
  const columns = [
    {
      title: 'Score',
      dataIndex: 'score',
      width: '5%',
      render: (score: any, record: any) => <ScoreCol score={score} status={record.test_status}/>
    },
    {
      title: 'Candidate',
      dataIndex: 'candidate_email',
      width: '50%',
      render: (email: any, record: any) => <CandidateCol email={email} name={record.candidate_name}/>

    },
    {
      title: 'Test',
      dataIndex: 'test_name',
      width: '20%',
      render: (test: any, record: any) => <span className={"display-candidates__test-name"}
                                                onClick={() => history.push(`/my-tests/${record.test_candidate_id.slice(0, record.test_candidate_id.indexOf('-'))}`)}>{test}</span>
    },
    {
      title: 'Status',
      dataIndex: 'test_status',
      width: '20%'
    }

  ];
  useEffect(() => {
    service.baseApiParams.headers={'Authorization': 'Bearer ' +localStorage.getItem("token")}
    service.testscandidates.testscandidatesList().then(
      (res: any) => {
        setData(res.data.data);
        setDataSource(res.data.data);
      },
      (e) => {
        if(e.error.error==="token invalid"){
          history.push("/403")
        }
        setErrorToken(e.error.error)
      }
    );
  }, []);
  const token = localStorage.getItem('token');
  const handleSelectChange = (value: any) => {
    switch (value) {
      case 'email' :
        const sortByEmail = dataSource.slice();
        sortByEmail.sort((a: any, b: any) => (a.candidate_email > b.candidate_email && 1) || -1);
        setDataSource(sortByEmail);
        break;
      case 'name' :
        const sortByName = dataSource.slice();
        sortByName.sort((a: any, b: any) => (a.candidate_name > b.candidate_name && 1) || -1);
        setDataSource(sortByName);
        break;
      case 'score' :
        const sortByScore = dataSource.slice();
        sortByScore.sort((a: any, b: any) => (a.score < b.score && 1) || -1);
        setDataSource(sortByScore);
        break;
      default :
        setDataSource(data);
    }
  };
  return (<>{errorToken ? <></>:
      <>
        <Header/>
        <div className={'display-candidates__main-container'}>
          <div className={'display-candidates__container'}>
            <div className={'display-candidates__title'}>My Candidates</div>
            <div className={'display-candidates__filters'}>
              <Input
                className={'display-candidates__search'}
                placeholder="Search Candidate"
                value={value}
                onChange={e => {
                  const currValue = e.target.value;
                  setValue(currValue);
                  if (currValue.length === 0) {
                    setDataSource(data);
                  } else {
                    const filteredData = dataSource.filter((entry: any) => entry.candidate_name.toLowerCase().includes(currValue.toLowerCase()) || entry.candidate_email.toLowerCase().includes(currValue.toLowerCase())
                    );
                    setDataSource(filteredData);
                  }
                }}
              />
              <Select onChange={handleSelectChange} defaultValue={'date'}>
                <Select.Option value={'date'}>Sort by Date</Select.Option>
                <Select.Option value={'email'}>Sort by Email</Select.Option>
                <Select.Option value={'name'}>Sort by Name</Select.Option>
                <Select.Option value={'score'}>Sort by Score</Select.Option>
              </Select>
            </div>
            <Table columns={columns} dataSource={dataSource} rowKey={record => record.test_candidate_id} bordered
                   rowClassName={(record, index) => index % 2 === 0 ? 'display-candidates__table-even-row' : ''}
            />
          </div>
        </div>
      </>}</>
  );
};
export default DisplayCandidates;


