import React from 'react';
import SocialFollow from "./SocialFollow";
import Miscellaneous from '../miscellaneous.component';

class Footer extends React.Component { 
    render() {
        return (
            <div id = "foot-wrapper">
                <div id = "footer">
                    <div className = "footPart">
                        <h3>Contact Information</h3>
                        <p>Community Women</p>
                        <p>Enterprise Network</p>
                        <p>Plot 4805 Kigobe Road Ntinda</p>
                        <p>P.O. Box 21 418 Kampala, (U)</p>
                        <p>Phone: +256 771 866 768</p>
                        <p>Phone: +256 704 266 095</p>
                        <p>E-mail: <a href = "mailto:info@cwen.or.ug">info@cwen.or.ug</a></p>
                    </div>

                    <div className = "footPart">
                        <h3>Our Services</h3>
                        <ul>
                            <li><a href = "/">Networking</a></li>
                            <li><a href = "/">Sales and Marketing</a></li>
                            <li><a href = "/">Business Consultations</a></li>
                            <li><a href = "/">Packaging and Branding</a></li>
                            <li><a href = "/">Technical Services</a></li>
                        </ul>
                    </div>

                    <div className = "footPart">
                        <h3>Sign up for Newsletter</h3>
                        <p>Put your e-mail address in the box below and click the envelope button to start receiving your newsletter.</p>
                        <div id = "emails">
                            <input name = "MAIL" id = "news_email" placeholder = "Your e-mail"></input>
                            <button onClick = {() => console.log("button")}>Sign Up!</button>
                        </div>
                    </div>
                    <SocialFollow />
                    <Miscellaneous/>
                </div>
            </div>
        );
    }
}

export default Footer;