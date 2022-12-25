import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './CreateNew.css'


const CreateNewPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/client/workareas" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, name, password }))
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
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <header className='signin-form-header'>
                <div className='leftcol'></div>
                <div className='centercol'>
                    <a target="_self" href="#">"logo" BINS ~ take to main pg </a>
                </div>
                <div className='rightcol'>
                </div>
            </header>
            <div className='signin-form'>
                <div className='signin-form-h1'>
                    <h1>Lets Get Started, New Member</h1>
                </div>
                <div className='signin-form-subheader'>
                    We recommend using your
                    <strong> work email address</strong>
                </div>
                <form onSubmit={handleSubmit} className="signin-form-elements">
                    <input
                        className='form-ele'
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength='27'
                        required
                    />

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
                    <input
                        className='form-ele'
                        type="password"
                        value={confirmPassword}
                        placeholder="confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className='form-ele' id='form-only' type="submit">Welcome in, {name}</button>
                    <ul className='form-ele'>
                        {errors.map(error => <li className="error-li" key={error}>{error}</li>)}
                    </ul>
                    <div>
                        <div className='signin-form-header_sidelink' id="createnew-toggle">
                            Already using BINS?
                            <br />
                            <a target="_self" className="create-link" href="/signin">Sign in to an existing work area</a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateNewPage