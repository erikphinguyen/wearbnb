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
    console.log('WHAT IS USER SIGNUP FORM PAGE INDEX.JS', user)
    // for multuple file upload
    //   const [images, setImages] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = [];
        dispatch(sessionActions.signup({ username, email, password, confirmPassword, image }))
            .then(() => {
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setImage(null);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    newErrors = data.errors;
                    setErrors(newErrors);
                }
            });
        /* ORIGINAL CODE
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
        */
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
                        // <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                        <>
                            <li style={{ color: "red" }}>{error}</li>
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
                <label>
                    <input type="file" onChange={updateFile} />
                </label>
                <button className='button' type="submit">Sign Up</button>
            </form>
            <div>
                {user && (
                    <div>
                        <h1>{user.username}</h1>
                        <img
                            style={{ width: "150px" }}
                            src={user.profileImageUrl}
                            alt="profile"
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default SignupFormPage;
