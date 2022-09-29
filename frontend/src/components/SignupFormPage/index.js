import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (password === confirmPassword) {
        //     setErrors([]);
        //     return dispatch(sessionActions.signup({ email, username, password }))
        //         .catch(async (res) => {
        //             const data = await res.json();
        //             if (data && data.errors) setErrors(data.errors);
        //         });
        // }
        dispatch(sessionActions.signup({ email, username, password, confirmPassword })).then(
            async (res) => {
                setErrors(res)
            }
        )
        // .catch(err)
        // return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    console.log('WHAT IS ERRORS', errors)

    return (
        <form className="form" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    // <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                    <>
                        <li style={{color: "red"}}>{error}</li>
                    </>

                ))}
            </ul>
            <label>
                Email
                <input
                    className="input"
                    style={errors.length && email == "" ? { border: "1px solid red" } : null}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                // required
                />
            </label>
            <label>
                Username
                <input
                    className="input"
                    style={errors.length && username == "" ? { border: "1px solid red" } : null}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                // required
                />
            </label>
            <label>
                Password
                <input
                    className="input"
                    style={errors.length && password == "" ? { border: "1px solid red" } : null}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                // required
                />
            </label>
            <label>
                Confirm Password
                <input
                    className="input"
                    style={errors.length && confirmPassword == "" ? { border: "1px solid red" } : null}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                // required
                />
            </label>
            <button className='button' type="submit">Sign Up</button>
        </form>
    );
}

export default SignupFormPage;
