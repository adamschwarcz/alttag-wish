// INITAL
import React, { useState, useEffect, Component } from 'react';

// DATABASE
import firebase from '../../firebase.js';
import { useAuth0 } from "../../react-auth0-spa";

// ANIMATION
import FadeIn from "react-fade-in";

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Avatar from '@material-ui/core/Avatar';
import Placeholder from './Placeholder.js';

// STYLES
import './Wish.css';


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


function onUpdate(id) {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    db.collection('wishes').doc(id).update({ clapCount: increment });

}

function onDelete(id) {
    const db = firebase.firestore()
    db.collection('wishes').doc(id).delete()
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
        },
    },
    typography: {
        padding: theme.spacing(2),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

}));

const WishList = () => {
    const wish = useWishes()
    const { user } = useAuth0();
    const [loading, setLoading] = useState(true);

    // Menu Button Hooks & Handlers 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

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

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => {
                setTimeout(() => setLoading(false), 1000);
            });
    });

    // Clap Button Hooks
    const [clapCount, setClapCount] = useState('')


    return (
        <div style={{ float: 'right', width: '400px' }}>
            <div className="list">
                {wish.map((wish) =>
                    <div>
                        {loading ? (
                            <>
                                <FadeIn>
                                    <Placeholder />
                                </FadeIn>
                            </>
                        ) : (
                                <Paper className="wish" variant="outlined" key={wish.id} style={{ width: '400px' }}>
                                    <FadeIn>
                                        <div style={{ padding: '24px 24px 0px 24px' }}>
                                            <h2 style={{ display: 'inline-block', maxWidth: '300px', }}>{wish.wish}</h2>
                                            {wish.username === user.name || wish.email === user.email ?
                                                // <DeleteButton />
                                                <IconButton
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"
                                                    onClick={() => onDelete(wish.id)}
                                                    color="secondary"
                                                    style={{
                                                        float: 'right',
                                                        width: '40px',
                                                        height: '40px',
                                                        position: 'relative',
                                                        transform: 'translate(10px, -10px)',
                                                    }}>
                                                    <DeleteTwoToneIcon fontSize="small" style={{ position: 'relative', top: '-2px' }} />
                                                </IconButton>
                                                : null}

                                        </div>
                                        <div className="name" style={{ padding: '12px 24px 12px 24px' }}>
                                            <div className={classes.root}>
                                                <Avatar alt="Cindy Baker" src={wish.picture} className={classes.small} />
                                                <p>od <span className="currentName">{wish.username}</span> – {new Date(wish.created.toDate()).toDateString()}</p>
                                            </div>
                                            <div>
                                                <div class="counter">
                                                    <Button
                                                        type="submit"
                                                        variant="outlined"
                                                        onClick={() => onUpdate(wish.id)}>
                                                        <span className="emoji">👏</span>&nbsp;
                                                        <span>{wish.clapCount}</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </FadeIn>
                                </Paper>
                            )}
                    </div>
                )}
            </div>

        </div>

    )
}

export default WishList
