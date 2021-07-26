import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Login from "./screens/login/Login";
import Header from "@layout/header/header";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    {/*<Login />*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals