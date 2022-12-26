import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SigninForm.css'
import slackLogo from '../.././utils/images/slack-logo-thumb.png'


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/client/workareas" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const signAsDemo = (e) => {
        e.preventDefault();
        const demoData = {
            email: 'demo@user.io',
            password: 'password'
        }
        dispatch(sessionActions.login(demoData))
    }

    return (
        <>
            <header className='signin-form-header'>
                <div className='leftcol'></div>
                <div className='centercol'>
                    <a target="_self" href="/" id='form-logo-font'>
                        <div className="form-logo">
                                <img src={slackLogo} alt="" id='logo-img' />
                            <p >BINS</p>
                        </div>
                    </a>
                </div>
                <div className='rightcol'>
                    <div className='signin-form-header_sidelink'>
                        New to BINS?
                        <br />
                        <a target="_self" className="create-link" href="/createnew">Create an account</a>
                    </div>
                </div>
            </header>
            <div className='signin-form'>
                <div className='signin-form-h1'>
                    <h1>Sign in to BINS</h1>
                </div>
                <div className='signin-form-subheader'>
                    We recommend using your 
                    <strong> work email address</strong>
                </div>
                <form onSubmit={handleSubmit} className="signin-form-elements">
                    
                        <input
                            className='form-ele'
                            type="email"
                            placeholder='name@work-email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className='form-ele'
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    <button className='form-ele' id='form-only' type="submit">Welcome Back</button>
                    <div>
                        {errors.map(error => <li className="error-li error-specific" key={error}>{error}</li>)}
                    </div>
                    <div className="or-break">
                        <hr className="general-hr left-hr" />
                        <div className="or-text">OR</div>
                        <hr className="general-hr right-hr" />
                    </div>
                    <button id='demo-user-signin' onClick={signAsDemo}>Sign In As Guest</button>
                </form>
            </div>
        </>
    );
}

export default LoginFormPage;