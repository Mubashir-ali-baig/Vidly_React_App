import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/navbar";
import Movies from './components/movies';
import {Route,Redirect,Switch} from "react-router-dom";
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';


class App extends Component {
  render() {
    return (
    <div className="back">
    <React.Fragment className="content">
    <ToastContainer />
    <Navbar />
    <main className="container">
    <Switch>
    <Route path="/login" component={LoginForm}/>
    <Route path="/register" component={RegisterForm}/>
    <Route path="/movies/:id" component={MovieForm}/>
    <Route path="/movies" component={Movies}> </Route>
    <Route path="/customers" component={Customers}> </Route>
    <Route path="/rentals" component={Rentals}> </Route>
    <Route path="/not-found" component={NotFound}> </Route>
    <Redirect from="/" exact to="movies" />      
    <Redirect to="/not-found" />
    </Switch>
   </main>
   </React.Fragment>   
   </div>   
   );
  }
}

export default App;
