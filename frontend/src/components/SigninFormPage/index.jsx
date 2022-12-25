import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SigninForm.css'

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

    return (
        <>
            <header className='signin-form-header'>
                <div className='leftcol'></div>
                <div className='centercol'>
                    <a target="_self" href="#">"logo" BINS ~ take to main pg </a>
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
                    <button className='form-ele' type="submit">Welcome Back</button>
                    <ul>
                        {errors.map(error => <li className="error-li" key={error}>{error}</li>)}
                    </ul>
                </form>
            </div>
        </>
    );
}

export default LoginFormPage;