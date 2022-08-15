import './index.css'

function Footer() {

    return (
        <footer className='footer'>
            <ul>
                <i className="fa-solid fa-copyright">wearbnb, Inc.</i>
                <a className='footer-list' href='https://github.com/erikphinguyen/wearbnb'>
                    <i className="fab fa-github-alt"></i>
                </a>
                <a className='footer-list' href='https://www.linkedin.com/in/erikphinguyen/'>
                    <i className="fab fa-linkedin"></i>
                </a>
            </ul>
        </footer>
    )
}

export default Footer;
