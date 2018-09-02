import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../../styling/header/header.css';
import '../../index.css';

class Kevin extends React.Component {
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
        <div className="socialLink1">
        <Button
          aria-owns={anchorEl ? 'simple-menu1' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          >
          Kevin Ou
        </Button>
        <Menu
          id="simple-menu1"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          >
          <MenuItem onClick={this.handleClose}><a className="socials" href="mailto:kevin.ou705@gmail.com">
                <i className="fab fa-google"></i> Gmail
              </a></MenuItem>
          <MenuItem onClick={this.handleClose}><a className="socials" href="https://www.linkedin.com/in/kevin-ou-b56a768b/">
                <i className="fab fa-linkedin"></i>LinkedIn
              </a></MenuItem>
          <MenuItem onClick={this.handleClose}><a className="socials" href="https://github.com/VietnameseCoffee">
                  <i className="fab fa-github"></i>GitHub
                </a></MenuItem>
        </Menu>
      </div>
    );
  }
}

export default Kevin;
