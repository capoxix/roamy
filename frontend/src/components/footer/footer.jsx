import React from 'react';

const footer = () => {
  return (
    <div className="footer">
          <div className="links">
            <div className="ft-headers">© 2018 Roamy</div>
            <div className="ft-headers">FOLLOW</div>
            <div className="ft2-1">
              <p>
                Roamy is a map based web application that allows users to see areas they can access given free time.
              </p>
            </div>
            <div className="ft2-2">
              <a className="socials" href="mailto:tonywzhang@gmail.com">
                <i className="fab fa-google"></i>
              </a>
              <br/>
              <a className="socials" href="tel:+16508883357">
                <i className="fas fa-mobile"></i>
              </a>
              <br/>
              <a className="socials" href='https://www.facebook.com/tonywzhang'>
                <i className="fab fa-facebook"></i>
              </a>
              <br/>
              <a className="socials" href="https://www.linkedin.com/in/kevin-ou-b56a768b/">
                <i className="fab fa-linkedin"></i>
              </a>
              <br/>
                <a className="socials" href="https://github.com/capoxix/intro-mongo">
                  <i className="fab fa-github"></i>
                </a>
            </div>
          </div>
        </div>
  )
}

export default footer;
