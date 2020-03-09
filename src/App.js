// INITIAL
import React from "react";

// ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

// LOADING
import Loading from "./components/Loading.js";

// DATABASE
import { useAuth0 } from "./react-auth0-spa";

// IMPORTED COMPONENTS
import Navigation from './components/Navigation/Navigation';

// PAGES
import Wish from './pages/Wish.js';
import Home from './pages/Home.js';

// STYLES
import "./App.css";


const App = () => {
  
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div className="App">
        <Navigation />
        {!isAuthenticated && (
        <div>

        </div>
        )}
        {isAuthenticated && (
                  <Switch>
                  <Route path="/domov" component={Home} />
                  <Route path="/wish" component={Wish} />
                  <Route path="/prispevky" />
                </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;





        //<Add 
        //name={user.name}
        //givenName={user.given_name}/>
        //)}