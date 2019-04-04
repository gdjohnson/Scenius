import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render (){
        return (
            <div className="footer">
                <ul className="footer-links-1">
                    <li>About Scenius</li>     
                    <li>Contributor Guidelines</li>
                    <li>Press</li>
                    <li>Advertise</li>
                    <li>Event Space</li>
                </ul>
                <ul className="footer-links-2">
                    <li>Privacy Policy</li>     
                    <li>Licensing</li>
                    <li>Jobs</li>
                    <li>Developers</li>
                    <li>Terms of Use</li>
                    <li>Copyright Policy</li>
                    <li>Contact us</li>
                    <li>Sign In</li>
                </ul>   
                <li className="copyright">© 2019 Graham Johnson.</li>
                <ul className="footer-alph-index">
                    <li>ARTISTS:</li>
                    <li key="1"><Link to="artists/A">A</Link></li>
                    <li key="2"><Link to="artists/B">B</Link></li>
                    <li key="3"><Link to="artists/C">C</Link></li>
                    <li key="4"><Link to="artists/D">D</Link></li>
                    <li key="5"><Link to="artists/E">E</Link></li>
                    <li key="6"><Link to="artists/F">F</Link></li>
                    <li key="7"><Link to="artists/G">G</Link></li>
                    <li key="8"><Link to="artists/H">H</Link></li>
                    <li key="9"><Link to="artists/I">I</Link></li>
                    <li key="10"><Link to="artists/J">J</Link></li>
                    <li key="11"><Link to="artists/K">K</Link></li>
                    <li key="12"><Link to="artists/L">L</Link></li>
                    <li key="13"><Link to="artists/M">M</Link></li>
                    <li key="14"><Link to="artists/N">N</Link></li>
                    <li key="15"><Link to="artists/O">O</Link></li>
                    <li key="16"><Link to="artists/P">P</Link></li>
                    <li key="17"><Link to="artists/Q">Q</Link></li>
                    <li key="18"><Link to="artists/R">R</Link></li>
                    <li key="19"><Link to="artists/S">S</Link></li>
                    <li key="20"><Link to="artists/T">T</Link></li>
                    <li key="21"><Link to="artists/U">U</Link></li>
                    <li key="22"><Link to="artists/V">V</Link></li>
                    <li key="23"><Link to="artists/W">W</Link></li>
                    <li key="24"><Link to="artists/X">X</Link></li>
                    <li key="25"><Link to="artists/Y">Y</Link></li>
                    <li key="26"><Link to="artists/Z">Z</Link></li>  
                </ul>
            </div>
            
        );
    }
};

export default Footer;