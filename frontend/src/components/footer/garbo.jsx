import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../../styling/header/header.css';
import '../../index.css';

class Garbo extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render(){
    const { anchorEl } = this.state;
    return (
      <div className="socialLink2">
      <Button
        aria-owns={anchorEl ? 'simple-menu2' : null}
        aria-haspopup="true"
        onClick={this.handleClick}
        >
        Garbo Cheng Ye
      </Button>
      <Menu
        id="simple-menu2"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
        >
        <MenuItem onClick={this.handleClose}><a className="socials" href="mailto:garbocheng93@gmail.com">
              <i className="fab fa-google"></i> Gmail
            </a></MenuItem>
        <MenuItem onClick={this.handleClose}><a className="socials" href="https://www.linkedin.com/in/garbo-cheng-ye/">
              <i className="fab fa-linkedin"></i>LinkedIn
            </a></MenuItem>
        <MenuItem onClick={this.handleClose}><a className="socials" href="https://github.com/capoxix">
                <i className="fab fa-github"></i>GitHub
              </a></MenuItem>
      </Menu>
    </div>
    );
  }
}

export default Garbo;
