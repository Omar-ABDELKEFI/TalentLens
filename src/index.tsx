import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from '@layout/header/header';
import Question from './screens/question/Question';
import Routes from './configs/routes';

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
