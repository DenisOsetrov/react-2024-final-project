import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-section company-info">
                <h4>Okten School Production</h4>
                <p>Subdivision: January-2024</p>
            </div>
            <div className="footer-section developer-info">
                <h4>Developer</h4>
                <p>Osetrov Denis Volodimirovich</p>
                <ul>
                    <li>Email: <a href="mailto:dvosetrov@gmail.com">dvosetrov@gmail.com</a></li>
                    <li>Phone: <a href="tel:+380982913157">0982913157</a></li>
                    <li>Nickname: <a href="https://t.me/denfree777" target="_blank" rel="noopener noreferrer">https://t.me/denfree777</a></li>
                </ul>
            </div>
        </div>
        <p className="footer-bottom">© 2024 Movie App. All rights reserved.</p>
    </footer>
);

export default Footer;