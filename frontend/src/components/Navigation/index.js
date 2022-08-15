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

function Navigation({ isLoaded, brands, setBrands }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <PostBrandHomeModal brands={brands} setBrands={setBrands} />
            </>
        );
    } else {
        sessionLinks = (
            <div className='button-container'>
                {
                    document.addEventListener("click", event => {
                        const isDropdownButton = event.target.matches("[data-dropdown-button]")
                        if (!isDropdownButton && event.target.closest("[data-dropdown]") != null) return

                        let currentDropdown;
                        if (isDropdownButton) {
                            currentDropdown = event.target.closest('[data-dropdown]')
                            currentDropdown.classList.toggle('active')
                        }

                        document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
                            if (dropdown === currentDropdown) return
                            dropdown.classList.remove("active")
                        })
                    })
                }
                <div className='dropdown'>
                    <button className='link' data-dropdown>Information</button>
                    <div className='dropdown-menu' data-dropdown-button>Dropdown content</div>
                    <div className='dropdown-menu' data-dropdown-button>
                        <Demo />
                    </div>
                    <div className='dropdown-menu' data-dropdown-button>
                        <LoginFormModal />
                    </div>
                    <div className='dropdown-menu' data-dropdown-button>
                        <SignUpFormModal />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <nav>
            {
                document.addEventListener("click", event => {
                    const isDropdownButton = event.target.matches("[data-dropdown-button]")
                    if (!isDropdownButton && event.target.closest("[data-dropdown]") != null) return

                    let currentDropdown;
                    if (isDropdownButton) {
                        currentDropdown = event.target.closest('[data-dropdown]')
                        currentDropdown.classList.toggle('active')
                    }

                    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
                        if (dropdown === currentDropdown) return
                        dropdown.classList.remove("active")
                    })
                })
            }
            <div className='navigation'>
                <div>
                    <NavLink exact to="/">
                        <img src={Logo} width="200" alt="logo" />
                    </NavLink>
                </div>
                <div>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
