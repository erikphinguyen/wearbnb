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

    const [image, setImage] = useState(null);
    const user = useSelector((state) => state.session.user);
    // for multuple file upload
    //   const [images, setImages] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = [];
        const successfulUser = await dispatch(sessionActions.signup({ username, email, password, confirmPassword, image }))
        if (successfulUser && successfulUser.error) {
            newErrors = successfulUser.error;
            setErrors(newErrors);
        }
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    // for multiple file upload
    //   const updateFiles = (e) => {
    //     const files = e.target.files;
    //     setImages(files);
    //   };


    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <>
                            {console.log('ERRORS', errors)}
                            <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                            {/* <li style={{ color: "red" }}>{error}</li> */}
                        </>

                    ))}
                </ul>
                <label>
                    Email
                    <input
                        className="input"
                        style={errors.length && email == "" ? { border: "1px solid red" } : null}
                        type="email"
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
                <br></br>
                <label>
                    Profile Picture
                    <br></br>
                    <input
                        className="input"
                        style={errors.length && image == null ? { border: "1px solid red" } : null}
                        type="file"
                        onChange={updateFile}
                    />
                </label>
                <button className='button' type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormPage;
