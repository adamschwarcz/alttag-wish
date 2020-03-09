import React, { Component } from 'react';
import firebase from '../../firebase.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FadeIn from "react-fade-in";
import Placeholder from '../Placeholder/Placeholder.js';
import ClapButton from '../ClapButton/ClapButton.js'
import Paper from '@material-ui/core/Paper';

import { useAuth0 } from "../../react-auth0-spa";

import './Add.css';


class Add extends Component {

    constructor() {
        super();
        this.state = {
          loading: true,
          currentItem: '',
          username: '',
          clapCount: 0,
          items: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
          title: this.state.currentItem,
          user: this.props.name,
          clapCount: this.state.clapCount
        }
        itemsRef.push(item);
        this.setState({
          currentItem: '',
          username: '',
          clapCount: 0
        });
      }

      componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => {
          setTimeout(() => this.setState({ loading: false }), 1500);
        });

        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              clapCount: items[item].clapCount,
              title: items[item].title,
              user: items[item].user
            });
          }
          this.setState({
            items: newState
          });
        });
      }
      
      removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
      }


    render() {
      return (
        <div className="container">
        <div className="wrap">
            <Paper variant="outlined" className="add-item">
                
                <h1>Čauko <span style={{color: '#00A0DD'}}>{this.props.givenName}</span> 👋</h1> 
                <h3>Začni svoj deň s malým prianím.</h3>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        id="standard-multiline-flexible"
                        label="Tvoje prianie"
                        name="currentItem"
                        variant="filled"
                        multiline
                        rows="6"
                        rowsMax="8"
                        value={this.state.currentItem}
                        onChange={this.handleChange}
                    />

                    <Button 
                      type="submit"
                      variant="contained" 
                      color="primary">
                      Poslať wish
                    </Button>
                </form>

            </Paper>

            <section className='items-list'>
                <div className="item">
                    <div>
                        {this.state.items.map((item) => {
                            return (
                            <div>
                            {this.state.loading ? (
                              <>
                                <FadeIn>
                                <Placeholder />
                                </FadeIn>
                              </>
                            ) : (
                            <Paper className="wish" key={item.id}>
                                <FadeIn>
                                  <h2>{item.title}</h2>
                                  <div className="name">
                                      <p>poslal <span className="currentName">{item.user}</span></p>
                                      <ClapButton 
                                      wish={item}
                                      clapCount={item.clapCount} />
                                  </div>
                                </FadeIn>
                            </Paper>
                            )}
                            </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
        </div>
      );
    }
  }

export default Add
