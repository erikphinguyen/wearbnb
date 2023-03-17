import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    console.log('WHAT IS USER', user)

    return (
        <>
            <button className="button" onClick={openMenu}>
                Profile
                {/* <i className="fas fa-user-circle" /> */}
            </button>
            {showMenu && (
                <div className="profile-dropdown">
                    <div><b>Username: </b> {user.username}</div>
                    <div><b>Email: </b>{user.email}</div>
                    {user && (
                    <div>
                        <img
                            style={{ width: "100px" }}
                            {...(console.log("What is user.profileImageUrl", user.profileImageUrl))}
                            {...(console.log("What is user", user))}
                            src={user.profileImageUrl}
                            alt="profile"
                            onError={(e) => console.log("Error loading image:", e)}
                        />
                    </div>
                )}
                    <div>
                        <NavLink exact to={`/users/${user.id}/bookings`}>
                            <button className="button">Bookings</button>
                        </NavLink>
                    </div>
                    <div className="hidden hidden-button">
                        .
                    </div>
                    <div>
                        <button className='button' onClick={logout}>Log Out</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
