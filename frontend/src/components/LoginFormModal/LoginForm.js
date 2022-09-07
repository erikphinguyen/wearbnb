import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([]);
        dispatch(sessionActions.login({ credential, password })).then(
            async (res) => {
                // const data = await res.json();
                // if (data && data.errors) setErrors(data.errors);
                setErrors([res])
            }
        );
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Username or Email
                <input
                    className="input"
                    style={errors.length && credential == "" ? { border: "1px solid red" } : null}
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
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
            <button className='button' type="submit">Log In</button>
        </form>
    );
}

export default LoginForm;
