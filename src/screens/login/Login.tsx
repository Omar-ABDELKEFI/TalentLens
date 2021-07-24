import React, {useState} from 'react';
import service from '../../service/test-api'
import './Login.less'

function Login() {
    const [login, setLogin] = useState({email: "", password: ""})
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        service.login.loginCreate(login).then(
            (res:any)=> {
                console.log(res.data.token)
                // localStorage.setItem('token',res.data)
            }
        )
            .catch(
                (err:any) => {
                    console.log(err)
                }
            )

    }
    return (
        <div className="login" onSubmit={handleSubmit}>
            <form className="login__containerForm">
                <h1 className="login__titre">Sign In</h1>

                <div className="login__form-group">
                    <label className="login__label">Email address</label>
                    <input type="email" className="login__form-control" placeholder="Enter email"
                           onChange={event => setLogin({...login, email: event.target.value})}/>
                </div>

                <div className="login__form-group">
                    <label className="login__label">Password</label>
                    <input type="password" className="login__form-control" placeholder="Enter password"
                           onChange={event => setLogin({...login, password: event.target.value})}/>
                </div>

                <input type="submit" className="login__button" value="Sign In"/>
            </form>
        </div>
    );
}

export default Login;

