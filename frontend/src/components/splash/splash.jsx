import React from 'react';
import { Link } from 'react-router-dom';

const splash = () => {
  return (
    <div className="splash_container">
      <div className="header">
        <div id="large_header_text" className="animated fadeIn delay-2s">How Far Are You From Everywhere You Want To Go?</div>
        <div id="medium_header_text" className="animated fadeIn delay-2s">Discover great places in your immediate vicinity!</div>
        <Link to="/map" id="second_sign_up">Let's Go!</Link>
      </div>
      <div className="splash_header_1">Favorite locations, chosen by you</div>
      <div className="splash_caption_1">Discover your next adventure!</div>
      <div className="top_photos">
        <div className="1-1">
          <img src="https://s3-us-west-1.amazonaws.com/720hd-prod/banff2.jpg"></img>
        </div>
        <div className="1-2">
          <img src="https://s3-us-west-1.amazonaws.com/720hd-prod/patagonia.jpg"></img>
        </div>
        <div className="2-1">
          <img src="https://s3-us-west-1.amazonaws.com/720hd-prod/yosemite.jpg"></img>
        </div>
        <div className="2-2">
          <img src="https://s3-us-west-1.amazonaws.com/720hd-prod/patagonia2.jpg"></img>
        </div>
      </div>

      <div className="footer">
        <div className="links">
          <div className="ft-headers">© 2018 ROAMY</div>
          <div className="ft-headers">FOLLOW</div>
          <div className="ft2-1">
            <p>
              Roamy is a single page application that integrates several Google Map APIs to render a visual representation of the places a user can travel to given a reasonable amount of time.
            </p>
          </div>
          <div className="ft2-2">
            <div>
              <a className="socials" href="https://www.linkedin.com/in/kevin-ou-b56a768b/">
                <i className="fab fa-linkedin"></i>
              </a>
              <a className="socials" href="https://github.com/VietnameseCoffee">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <div>
              <a className="socials" href="https://www.linkedin.com/in/garbo-cheng-ye/">
                <i className="fab fa-linkedin"></i>
              </a>
              <a className="socials" href="https://github.com/capoxix">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <div>
              <a className="socials" href="https://www.linkedin.com/in/tony-wzhang/">
                <i className="fab fa-linkedin"></i>
              </a>
              <a className="socials" href="https://github.com/tonywzhang/720HD">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <div>
              <a className="socials tooltip" href="https://github.com/capoxix/intro-mongo">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default splash;
