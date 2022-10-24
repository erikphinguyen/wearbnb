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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadro } from '@fortawesome/free-solid-svg-icons';
import ProfilePic from '../../assets/images/ProfilePic.svg';
import SearchBar from '../SearchBar/SearchBar';

function Navigation({ isLoaded, brands, setBrands }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='session-container'>
                <div className='session-button1 profile'>
                    <ProfileButton user={sessionUser} />
                </div>
                <div className='session-button2'>
                    <PostBrandHomeModal brands={brands} setBrands={setBrands} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className='button-container'>
                <div className='dropdown' data-dropdown>
                    <button className='link' data-dropdown-button>
                        {/* <img className='profile' data-dropdown-button src={ProfilePic}></img> */}
                        Log In/Sign Up
                    </button>
                    <div className='dropdown-menu' data-dropdown-button>
                        <div>
                            <Demo />
                        </div>
                        <div className='hidden'>.</div>
                        <div>
                            <LoginFormModal />
                        </div>
                        <div className='hidden'>.</div>
                        <div>
                            <SignUpFormModal />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <nav>
            <div className='break-line'>
                <div className='navigation'>
                    <div>
                        <NavLink exact to="/">
                            <img src={Logo} width="200" alt="logo" />
                        </NavLink>
                    </div>
                    <div>
                    <SearchBar placeholder="Find a Brand..." />
                    </div>
                    <div>
                        {isLoaded && sessionLinks}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
