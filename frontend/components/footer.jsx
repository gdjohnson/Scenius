import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    alphIndex() {
        const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alph.split("").map((char, idx) => {
            return (
                <li key={`${idx}`}>
                    <Link to={`/artists/${char}`}>
                        {char}
                    </Link>
                </li>
            )
        })

    }

    render() {
        const alphIndex = this.alphIndex();

        return (
            <div className="footer">
                <ul className="footer-alph-index">
                    <li>ARTISTS:</li>
                    {alphIndex}
                </ul>

                <li className="copyright">© 2019 Graham Johnson.</li>

                <ul className="footer-links-1">
                    <li><a href="https://gdjohnson.github.io">About Scenius</a></li>     
                    <li><a href="https://gdjohnson.github.io">Contributor Guidelines</a></li>
                    <li><a href="https://gdjohnson.github.io">Press</a></li>
                    <li><a href="https://gdjohnson.github.io">Advertise</a></li>
                    <li><a href="https://gdjohnson.github.io">Event Space</a></li>
                </ul> 
                
            </div>
            
        );
    }
};

export default Footer;