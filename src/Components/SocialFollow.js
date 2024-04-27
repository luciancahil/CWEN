import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin
  } from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
  return (
    <div className="social-container">
        <a href="https://www.youtube.com/channel/UCaUd-FqPjiLYLuNS4LDkPmQ" className="youtube social">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a href="https://www.facebook.com/cwenug/" className="facebook social">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://twitter.com/CwenInfo" className="twitter social">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.instagram.com/cwen_ug/" className="instagram social">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.linkedin.com/company/cwen/" className="linkedin social">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        
        <a 
  className="dbox-donation-page-button" 
  href="https://donorbox.org/seeds-of-empowerment-cultivating-change-through-shared-innovation?default_interval=o" 
  style={{ 
    background: 'rgb(245, 118, 0)', 
    color: 'rgb(255, 255, 255)', 
    textDecoration: 'none', 
    fontFamily: 'Verdana, sans-serif', 
    display: 'flex', 
    fontSize: '16px', 
    margin: '20px 10px',
    padding: '8px 24px', 
    borderRadius: '5px', 
    gap: '8px', 
    width: 'fit-content', 
    lineHeight: '24px'
  }}
>
  <img src="https://donorbox.org/images/white_logo.svg" alt="Donate" />
  Donate
</a>
</div>
  );
}