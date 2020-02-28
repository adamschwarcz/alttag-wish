import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import './Navigation.css';

import { useAuth0 } from "../../react-auth0-spa";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

const Navigation = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen(prevOpen => !prevOpen);
    };
  
    const handleClose = event => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const toggle = () => setIsOpen(!isOpen);
  
    const logoutWithRedirect = () =>
      logout({
        returnTo: window.location.origin
      });
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
       setAnchorEl(event.currentTarget);
    };
    
    return (
        <nav>
            <div className="wrapper">

                <img 
                    className="nav-logo"
                    src="https://i.imgur.com/1Z3Wlzb.png" 
                    alt="AltTag Wish Logo" 
                    />
                <div className="nav-items">
                  {!isAuthenticated && (
                      <Button
                          variant="outlined"
                          color="white"
                          onClick={() => loginWithRedirect({})}
                          >
                          Prihlásiť sa
                      </Button>
                  )}

                  {isAuthenticated && (
                    <div className="user-dropdown">
                      <IconButton
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-fade' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        >
                      <Avatar alt="Cindy Baker" src={user.picture} />
                      </IconButton>
                      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                      </Backdrop>

                      <Popper 
                        style={{zIndex: '2', width: '200px'}} 
                        open={open} 
                        anchorEl={anchorRef.current} 
                        placement={'bottom-end'}
                        role={undefined} 
                        transition disablePortal>
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                  <ListItem button onClick={() => logoutWithRedirect()}>
                                  <ListItemIcon>
                                      <ExitToAppIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Odhlásiť sa" />
                                  </ListItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  )}
                </div>
            </div>
        </nav>
    )
}

export default Navigation

/*
<UncontrolledDropdown nav inNavbar>
<DropdownToggle nav caret id="profileDropDown">
    <img
    src={user.picture}
    alt="Profile"
    className="nav-user-profile rounded-circle"
    width="50"
    />
</DropdownToggle>
<DropdownMenu>
    <DropdownItem header>{user.name}</DropdownItem>
    <DropdownItem
    tag={RouterNavLink}
    to="/profile"
    className="dropdown-profile"
    activeClassName="router-link-exact-active"
    >
    <FontAwesomeIcon icon="user" className="mr-3" /> Profile
    </DropdownItem>
    <DropdownItem
    id="qsLogoutBtn"
    onClick={() => logoutWithRedirect()}
    >
    <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
    out
    </DropdownItem>
</DropdownMenu>
</UncontrolledDropdown>
*/