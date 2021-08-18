import React from 'react';
import "./ScoreCol.less" ;
const ScoreCol = ({ score, status }: any) => {
  return (
    <div className="score-col__container">
      <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)', marginBottom: '1px' }}>{score}%</div>
      <div style={{
        backgroundColor: '#e9ecef',
        width: '100%',
        height: '3px',
        boxShadow: 'inset 0 0.1rem 0.1rem rgb(0 0 0 / 10%)',
        borderRadius: '20px'
      }}>
        <div style={{ width: `${score}%`, height: '3px', backgroundColor: '#778088' }}/>
      </div>
      <div className={'score-col__status'} style={status === 'failed' ? {
        color: 'red',
        backgroundColor: 'rgba(255,0,0,0.1)'
      } : status === 'passed' ? { color: 'rgb(40, 167, 69)', backgroundColor: 'rgba(40, 167, 69, 0.1)' } : {}}>
        {status === 'failed' ? 'Fail' : status === 'passed' ? 'Pass' : ''}
      </div>

    </div>
  );
};

export default ScoreCol;