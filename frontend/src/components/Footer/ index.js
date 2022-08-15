import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {

    return (
        <footer className='footer'>
            <ul>
                <a className='footer-list'>
                    <FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon>
                    wearbnb, Inc.
                </a>
                <a className='footer-list' href='https://github.com/erikphinguyen/wearbnb'>
                    <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                </a>
                <a className='footer-list' href='https://www.linkedin.com/in/erikphinguyen/'>
                    <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
                </a>
            </ul>
        </footer>
    )
}

export default Footer;
