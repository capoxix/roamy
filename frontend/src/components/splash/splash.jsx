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
      <div className="splash_header_1">How to use Roamy</div>
      <div className="top_photos">
        <div className="1-1">
          <h3 className="gif_header">Click and Discover</h3>
          <img src="https://s3-us-west-1.amazonaws.com/720hd-prod/click-discover.gif"></img>
        </div>
        <div className="2-1">
          <h3 className="gif_header">Search and Discover</h3>
          <img src="https://s3-us-west-1.amazonaws.com/720hd-prod/search-discover.gif"></img>
        </div>
      </div>

      <div className="footer">
        <div className="links">
          <div className="ft-headers">© 2018 ROAMY</div>
          <div className="ft-headers">FOLLOW</div>
          <div className="ft2-1">
            <p>
              Roamy is a single page application that integrates Google Maps Distance Matrix API to render a visual representation of places a user can travel from a given time.

            </p>
          </div>
          <div className="ft2-2">

            <div className="dev-info">
              <a href="https://kevinou.netlify.com/">Kevin Ou</a>
              <a className="socials" href="https://github.com/VietnameseCoffee">
                <i className="fab fa-github"></i>
              </a>
              <a className="socials" href="https://www.linkedin.com/in/kevin-ou-b56a768b/">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            <div className="dev-info">
              <a href="https://garbocheng.netlify.com/">Garbo Cheng Ye</a>
              <a className="socials" href="https://github.com/capoxix">
                <i className="fab fa-github"></i>
              </a>
              <a className="socials" href="https://www.linkedin.com/in/garbo-cheng-ye/">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            <div className="dev-info">
              <a href="https://tonyzhang.netlify.com/">Tony Zhang</a>
              <a className="socials" href="https://github.com/tonywzhang/720HD">
                <i className="fab fa-github"></i>
              </a>
              <a className="socials" href="https://www.linkedin.com/in/tony-wzhang/">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            <div className="dev-info">
              <a href="https://github.com/capoxix/roamy">Project Repo</a>
              <a className="socials tooltip" href="https://github.com/capoxix/roamy">
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
