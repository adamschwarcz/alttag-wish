import React, { Component } from 'react'
import firebase from '../../firebase.js';
import firebaseConfig from '../../firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './ClapButton.css';

class ClapButton extends Component {

  incrementLike = () => {
    const wishRef = firebase.database().ref(`/items/${this.props.wish.id}`);

    // get the current value of the item in the database
    wishRef.once('value')
        .then(snapshot => {
            // get the value of the item. NOTE: this is unsafe if the item 
            // does not exist
            let updatedWish = snapshot.val();
            // update the item's desired property to the desired value
            updatedWish.clapCount = updatedWish.clapCount + 1;
            // replace the item with `wish.id` with the `updatedWish`
            wishRef.set(updatedWish);
        });
      }
  
      render() {
        return(
          <div class="counter">
            <Button 
              type="submit" 
              variant="outlined" 
              onClick={this.incrementLike}> 
              <span className="emoji">😍</span>&nbsp;
              <span>{this.props.wish.clapCount}</span>
              </Button>
          </div>
        )
      }
}

export default ClapButton
