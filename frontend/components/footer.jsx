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
                <ul className="alph-index">
                    <li>ALL ARTISTS:</li>
                    <li><Link to="artists/A">A</Link></li>
                    <li><Link to="artists/B">B</Link></li>
                    <li><Link to="artists/C">C</Link></li>
                    <li><Link to="artists/D">D</Link></li>
                    <li><Link to="artists/E">E</Link></li>
                    <li><Link to="artists/F">F</Link></li>
                    <li><Link to="artists/G">G</Link></li>
                    <li><Link to="artists/H">H</Link></li>
                    <li><Link to="artists/I">I</Link></li>
                    <li><Link to="artists/J">J</Link></li>
                    <li><Link to="artists/K">K</Link></li>
                    <li><Link to="artists/L">L</Link></li>
                    <li><Link to="artists/M">M</Link></li>
                    <li><Link to="artists/N">N</Link></li>
                    <li><Link to="artists/O">O</Link></li>
                    <li><Link to="artists/P">P</Link></li>
                    <li><Link to="artists/Q">Q</Link></li>
                    <li><Link to="artists/R">R</Link></li>
                    <li><Link to="artists/S">S</Link></li>
                    <li><Link to="artists/T">T</Link></li>
                    <li><Link to="artists/U">U</Link></li>
                    <li><Link to="artists/V">V</Link></li>
                    <li><Link to="artists/W">W</Link></li>
                    <li><Link to="artists/X">X</Link></li>
                    <li><Link to="artists/Y">Y</Link></li>
                    <li><Link to="artists/Z">Z</Link></li>  
                </ul>
            </div>
            
        );
    }
};

export default Footer;