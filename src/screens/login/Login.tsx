import React, { useEffect, useState } from 'react';
import './Login.less';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogin } from '../../redux/actions/index';
import errorsTypes from '@utils/errorsTypes.json';
import { constTypes } from '@utils/constTypesError';
import { Alert, Button, Form, Input, notification } from 'antd';
import { IErrortypes } from '@schemes/errorTypes';
import { NotificationApi } from 'antd/lib/notification/index';
import { ArgsProps, ConfigProps } from 'antd/lib/notification';
import { ModelsLoginInput } from '../../myApi';
import service from '@service/test-api';
import { Redirect } from 'react-router-dom';

const Login = () => {
  console.log(localStorage.getItem('token'), 'localStorage.getItem(\'token\')localStorage.getItem(\'token\')');
  const [login, setLogin] = useState<ModelsLoginInput>({ email: '', password: '' });
  const error = useSelector((state: any) => state.login.error);
  const token = localStorage.getItem('token');
  const loginin = useSelector((state: any) => state.login.loggingIn);
  console.log(loginin, 'loginin loginin');
  console.log(service, 'service service ');
  const dispatch = useDispatch();
  const handleSubmit = (e: React.SyntheticEvent) => {
    dispatch(actionLogin.login(login));

  };
  // show notification only when update error
  useEffect(() => {
      if (error && error !== errorsTypes.invalid_login && constTypes.hasOwnProperty(error)) {
        openNotificationWithIcon('error', constTypes[error as keyof IErrortypes]);
      }
    }
    , [error]);
  const openNotificationWithIcon = (type: string, description: string) => {
    notification[type as keyof NotificationApi]({
      message: 'error',
      description
    } as ArgsProps & string & ConfigProps);
  };

  return token ? (<Redirect to={'/my-tests'}/>) : (
    <div className="login">

      <Form className="login__containerForm"
            labelCol={{
              span: 10
            }}
            colon={false}
            labelAlign="left"
            onFinish={handleSubmit}
      >
        <h1 className="login__titre">Sign In</h1>
        {error === errorsTypes.invalid_login && <div style={{ width: '33%', marginBottom: 5 }}><Alert
          message="Error Text"
          description="incorrect username or password"
          type="error"
          closable={true}
          showIcon={true}

        /></div>
        }
        <Form.Item className="login__form-group"
                   rules={[
                     {
                       type: 'email',
                       message: 'The input is not valid E-mail!'
                     },
                     {
                       required: true,
                       message: 'Please input your E-mail!'
                     }
                   ]}
                   name="email"
                   hasFeedback={true}
                   label={<label className="login__label">Email address</label>}>
          <Input type="email" size={'large'} placeholder="Email" name="email" value={login.email}
                 onChange={(event: any) => {
                   setLogin({ ...login, email: event.target.value });
                 }}/>
        </Form.Item>

        <Form.Item className="login__form-group" name="password"
                   rules={[
                     {
                       required: true,
                       message: 'Please input your password!'
                     }
                   ]}
                   hasFeedback={true}
                   label={<label className="login__label">Password</label>}>
          <Input.Password size={'large'} placeholder="Enter password" value={login.password}
                          onChange={(event: any) => setLogin({ ...login, password: event.target.value })}/>
        </Form.Item>


        <Button type="primary" style={{ marginTop: 10 }} size={'large'} htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;

