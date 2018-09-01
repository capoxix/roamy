import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Tony extends React.Component {
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
      <div className="socialLink3">
        <Button
          aria-owns={anchorEl ? 'simple-menu3' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          >
          Tony Zhang
        </Button>
        <Menu
          id="simple-menu3"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          >
          <MenuItem onClick={this.handleClose}><a className="socials" href="mailto:tonywzhang@gmail.com">
                <i className="fab fa-google"></i> Gmail
              </a></MenuItem>
          <MenuItem onClick={this.handleClose}><a className="socials" href="https://www.linkedin.com/in/tony-wzhang/">
                <i className="fab fa-linkedin"></i>LinkedIn
              </a></MenuItem>
          <MenuItem onClick={this.handleClose}><a className="socials" href="https://github.com/tonywzhang/">
                  <i className="fab fa-github"></i>GitHub
                </a></MenuItem>
        </Menu>
    </div>
    );
  }
}

export default Tony;
