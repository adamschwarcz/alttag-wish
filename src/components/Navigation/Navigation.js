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
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';

import './Navigation.css';

import { useAuth0 } from "../../react-auth0-spa";
import { NONAME } from "dns";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    display: 'flex',
  },

  paper: {
    marginRight: theme.spacing(2),
  },
}));


/* ----  ---- ---- ---- ---- ---- ---- ---- ----  */

const Navigation = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    /* ––––––––– */
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    /* ––––––––– */
  
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
        <AppBar style={{backgroundColor: '#00A0DD', padding: '0 24px', boxShadow: 'none'}}>
                  {!isAuthenticated && (
                    <div className="nav-items">
                      <img 
                        className="nav-logo"
                        src="https://i.imgur.com/1Z3Wlzb.png" 
                        alt="AltTag Wish Logo" 
                      />
                      
                      <Button
                          variant="outlined"
                          color="white"
                          onClick={() => loginWithRedirect({})}
                          >
                          Prihlásiť sa
                      </Button>
                    </div>
                  )}

                  {isAuthenticated && (
                    <div className="nav-items">
                      <img 
                        className="nav-logo"
                        src="https://i.imgur.com/1Z3Wlzb.png" 
                        alt="AltTag Wish Logo" 
                      />

                      <div className="menu-sm">
                      <Tooltip title='Otvoriť menu' aria-label="add">
                      <IconButton
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-fade' : undefined}
                        aria-haspopup="true"
                        /* onClick={handleToggle} */
                        >
                      <MenuIcon style={{fill: 'white', fontSize: '32px'}}/>
                      </IconButton>
                      </Tooltip>
                      </div>
                      <img 
                        className="nav-logo-sm"
                        src="https://i.imgur.com/1Z3Wlzb.png" 
                        alt="AltTag Wish Logo" 
                      />
                      <div className="tabs">
                      <Tabs
                        variant="fullWidth"
                        inkBarStyle={{background: 'blue'}}
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                        style={{position: 'relative', right: '42px', height: '72px',}}
                      >
                        <LinkTab 
                          label="Domov" 
                          href="/drafts" 
                          {...a11yProps(0)} 

                          style={{
                            height: '72px',
                            color: 'white',
                            textDecoration: 'none',
                          }} />

                        <LinkTab 
                          label="Wish" 
                          href="/trash" 
                          {...a11yProps(1)} 
                          style={{
                            height: '72px',
                            color: 'white',
                            textDecoration: 'none',
                          }} />

                        <LinkTab 
                          label="Príspevky" 
                          href="/spam" 
                          {...a11yProps(2)}
                          style={{
                            height: '72px',
                            color: 'white',
                            textDecoration: 'none',
                          }}/>

                      </Tabs>
                      </div>
                      <Tooltip title={user.name} aria-label="add">
                      <IconButton
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-fade' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        >
                      <Avatar alt="Cindy Baker" src={user.picture} />
                      </IconButton>
                      </Tooltip>
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
        </AppBar>
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

/*

<div className="tabs">
<Tabs
  variant="fullWidth"
  value={value}
  onChange={handleChange}
  aria-label="nav tabs example"
  style={{height: '72px'}}
>
  <LinkTab 
    label="Page One" 
    href="/drafts" 
    {...a11yProps(0)} 

    style={{
      height: '72px',
      color: 'white',
      textDecoration: 'none',
    }} />

  <LinkTab 
    label="Page Two" 
    href="/trash" 
    {...a11yProps(1)} 
    style={{
      height: '72px',
      color: 'white',
      textDecoration: 'none',
    }} />

  <LinkTab 
    label="Page Three" 
    href="/spam" 
    {...a11yProps(2)}
    style={{
      height: '72px',
      color: 'white',
      textDecoration: 'none',
    }}/>

</Tabs>

*/