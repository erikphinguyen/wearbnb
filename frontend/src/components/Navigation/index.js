// WITHOUT MODAL
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//     const sessionUser = useSelector(state => state.session.user);

//     let sessionLinks;
//     if (sessionUser) {
//         sessionLinks = (
//             <ProfileButton user={sessionUser} />
//         );
//     } else {
//         sessionLinks = (
//             <>
//                 <NavLink to="/login">Log In</NavLink>
//                 <NavLink to="/signup">Sign Up</NavLink>
//             </>
//         );
//     }

//     return (
//         <ul>
//             <li>
//                 <NavLink exact to="/">Home</NavLink>
//                 {isLoaded && sessionLinks}
//             </li>
//         </ul>
//     );
// }

// export default Navigation;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Brands from '../Brands/Brands.js';
import './Navigation.css';
import Demo from '../Demo/Demo.js'
import SignUpFormModal from '../SignupFormModal';
import Logo from './wearbnb-logo.PNG'
import PostBrandHomeModal from '../PostBrandHomeModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
            <PostBrandHomeModal />
    } else {
        sessionLinks = (
            <>
                <div>
                    <Demo />
                </div>
                <div>
                    <LoginFormModal />
                </div>
                <div>
                    <SignUpFormModal />
                </div>
            </>
        );
    }

    return (
        <ul>
            <div>
                <NavLink exact to="/">
                    <img src={Logo} width="200" alt="logo" />
                </NavLink>
            </div>
            <div>
                {isLoaded && sessionLinks}
            </div>
        </ul>
    );
}

export default Navigation;
