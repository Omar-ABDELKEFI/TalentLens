import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './configs/routes'

import Login from "./screens/login/Login";
import CreateTest from "./screens/createTest/CreateTest";
import AddCandidates from "@components/cards_create_test/AddCandidates/AddCandidates";

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals