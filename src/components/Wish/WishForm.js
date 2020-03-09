// INITIAL
import React, { useState } from 'react';

// DATABASE
import firebase from '../../firebase.js';
import { useAuth0 } from "../../react-auth0-spa";

// LOADING
import Loading from "../Loading.js";

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

// STYLES
import './Wish.css';

const WishForm = () => {
    const { user } = useAuth0();
    const { loading } = useAuth0();
    const [wish, setWish] = useState('')
    const [clapCount, setClapCount] = useState(0)
    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [picture, setPicture] = useState(user.picture)

    if (loading) {
      return <Loading />;
    }

    function onSubmit(e) {
        e.preventDefault();
        setUsername(user.name);
        setPicture(user.picture)

        firebase
            .firestore()
            .collection('wishes')
            .add({
                wish,
                username,
                email,
                clapCount,
                picture,
                created: firebase.firestore.Timestamp.fromDate(new Date())
            })
            .then(() => {
                setWish('')
                setUsername(user.name)
                setEmail(user.email)
                setPicture(user.picture)
            })
    }

    return (
        <div style={{float: 'left', position: '-webkit-sticky', position: 'sticky', top: '120px'}}>
            <Paper elevation={1} className="add-item">
                <h1>Čauko <span style={{color: '#00A0DD'}}>{user.given_name}</span> 👋</h1> 
                <h3>Začni svoj deň s malým prianím.</h3>
                    <form onSubmit={onSubmit}>
                        <TextField
                            required
                            value={wish}
                            onChange={e => setWish(e.currentTarget.value)}
                            id="standard-multiline-flexible"
                            label="Tvoje prianie"
                            name="currentItem"
                            variant="filled"
                            multiline
                            rows="6"
                            rowsMax="8"
                        />
                        
                        <Button 
                            type="submit"
                            variant="contained" 
                            color="primary"
                            disableElevation>
                            Poslať wish
                        </Button>
                        
                    </form>  
            </Paper>
        </div>     
    )
}

export default WishForm