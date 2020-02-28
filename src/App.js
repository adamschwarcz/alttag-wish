import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import Navigation from './components/Navigation/Navigation';
import Add from './components/Add/Add';



// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

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
        <h1>yoyo</h1>
        )}
        {isAuthenticated && (
        <Add 
        name={user.name}
        givenName={user.given_name}/>
        )}

      </div>
    </Router>
  );
};

export default App;
