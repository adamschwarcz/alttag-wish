import React, { useState, useEffect } from 'react'
import firebase from '../../firebase.js';
import firebaseConfig from '../../firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './ClapButton.css';

const ClapButton = () => {

  const [clapCount, setClapCount] = useState(0)
  const [updateCount, setUpdateCount] = useState('')

  const onUpdate = (id) => {
    const db = firebase.firestore()
    db.collection('wishes').doc(id).set({username: setUpdateCount})
  }
  
        return(
          <div>
          <div class="counter">
            <Button 
              type="submit" 
              variant="outlined" 
              onClick={e => setUpdateCount('ahoj')}> 
              <span className="emoji">😍</span>&nbsp;
              <span>{clapCount}</span>
              </Button>
          </div>
          </div>
        )
    }


  export default ClapButton