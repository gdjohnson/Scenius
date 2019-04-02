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
                    <li><Link to={{pathname: '/tracks/', start_char: "A"}}>A</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'B'}}>B</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'C'}}>C</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'D'}}>D</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'E'}}>E</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'F'}}>F</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'G'}}>G</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'H'}}>H</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'I'}}>I</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'J'}}>J</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'K'}}>K</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'L'}}>L</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'M'}}>M</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'N'}}>N</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'O'}}>O</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'P'}}>P</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'Q'}}>Q</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'R'}}>R</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'S'}}>S</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'T'}}>T</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'U'}}>U</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'V'}}>V</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'W'}}>W</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'X'}}>X</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'Y'}}>Y</Link></li>
                    <li><Link to={{pathname: '/tracks/', start_char: 'Z'}}>Z</Link></li>  
                </ul>
            </div>
            
        );
    }
};

export default Footer;