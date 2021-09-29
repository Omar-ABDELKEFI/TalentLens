import { Button, Result } from 'antd';
import React from 'react';
import { history } from '@redux/store';

function NotAuthorized() {
  function redirect() {
    localStorage.removeItem('token');
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload();
  }

  return (
    <>
      {<Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={redirect}>Back Home</Button>}
      />}</>

  );
}

export default NotAuthorized;
