import React, {useState} from 'react';
import service from '../../service/test-api';
import './Login.less';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions  from '../../redux/actions/index';
function Login() {
    const [login, setLogin] = useState({email: "", password: ""})
    const [submitted, setSubmitted] = useState(false);
    const loggingIn = useSelector((state:any) => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const {from}={from:{pathname:"/"}}
         dispatch(userActions.login(login,from))
    }
    return (
        <div className="login" onSubmit={handleSubmit}>
            <form className="login__containerForm">
                <h1 className="login__titre">Sign In</h1>

                <div className="login__form-group">
                    <label className="login__label">Email address</label>
                    <input type="email" className="login__form-control" placeholder="Enter email" value={login.email}
                           onChange={event => setLogin({...login, email: event.target.value })}/>
                </div>

                <div className="login__form-group">
                    <label className="login__label">Password</label>
                    <input type="password" className="login__form-control" placeholder="Enter password" value={login.password}
                           onChange={event => setLogin({...login, password: event.target.value})}/>
                </div>

                <input type="submit" className="login__button" value="Sign In"/>
            </form>
        </div>
    );
}

export default Login;

