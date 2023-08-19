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
                        <p>P.O. Box 8000660 Kampala, (U)</p>
                        <p>Phone: +256 393 255 595</p>
                        <p>E-mail: <a href = "mailto:info@cwen.or.ug">info@cwen.or.ug</a></p>
                    </div>

                    <div className = "footPart">
                        <h3>Our Services</h3>
                        <ul>
                            <li><a href = "/Services?type=Co-Production+and+Processing+Facility">Co-Production and Processing Facility</a></li>
                            <li><a href = "/Services?type=Contract+Packaging">Contract Packaging</a></li>
                            <li><a href = "/Services?type=Packaging+and+Branding">Packaging and Branding</a></li>
                            <li><a href = "/Services?type=Business+Consultations">Business Consultations</a></li>
                            <li><a href = "/Services?type=Sales+And+Marketing">Sales and Marketing</a></li>
                            <li><a href = "/Services?type=Networking+And+Events">Networking and Events</a></li>
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
