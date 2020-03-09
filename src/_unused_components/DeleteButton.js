import React, { useState, useEffect, Component } from 'react';
import firebase from '../../firebase.js';
import Loading from "../../components/Loading";
import { useAuth0 } from "../../react-auth0-spa";

import FadeIn from "react-fade-in";
import Placeholder from '../Placeholder/Placeholder.js';
import ClapButton from '../ClapButton/ClapButton.js'

// MUI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';


function useWishes() {
    const [wish, setWish] = useState([])

    useEffect(() => {
        firebase
            .firestore()
            .collection('wishes')
            .onSnapshot((snapshot) => {
                const newWish = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setWish(newWish)
            })
    }, [])

    return wish;
}

function onDelete(id) {
    const db = firebase.firestore()
    db.collection('wishes').doc(id).delete()
}


const useStyles = makeStyles(theme => ({
    root: {
        width: 500,
    },
    typography: {
        padding: theme.spacing(2),
    },
}));



const DeleteButton = () => {
    const wish = useWishes()
    const { user } = useAuth0();
    const { loading } = useAuth0();

    // Menu Button Hooks & Handlers 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();

    const handleClick = newPlacement => event => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <div style={{display: 'inline'}}>
            <Popper open={open} anchorEl={anchorEl} v placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={150}>
                        <Paper style={{ padding: '8px 0px 8px 0px' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuItem onClick={() => onDelete(wish.id)}>
                                    <ListItemIcon style={{minWidth: '32px', color: 'red'}}>
                                        <DeleteIcon fontSize="small" />
                                    </ListItemIcon >
                                    <Typography variant="inherit" noWrap>
                                        Odstrániť
                        </Typography>
                                </MenuItem>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>

                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick('bottom-end')}
                    style={{
                        float: 'right',
                        width: '30px',
                        height: '30px',
                        position: 'relative',
                        top: '-5px',
                        right: '-5px'
                    }}>
                    <MoreVertIcon fontSize="small" style={{ position: 'relative', top: '-7px' }} />
                </IconButton>


        </div>
    )
}

export default DeleteButton