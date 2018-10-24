import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import './App.css';
import SearchButton from './Components/SearchButton';

const NavBar = () => (
  <div className="navbar">
    <Link to="/">Feed</Link>
    <Link to="/profile">Profile</Link>
  </div>
);
const Template = ({ title }) => (
  <div>
    <NavBar />
    <p className="page-info">
      This is the {title} page.
    </p>
  </div>
);
const Feed = (props) => (
  <Template title="Feed"/>
);
const Profile = (props) => (
  <Template title="Profile"/>
);
class App extends Component {
  render() {
    return (
      <div>
      <Router history={browserHistory}>
        <Route path="/" component={Feed}/>
        <Route path="/profile" component={Profile}/>
      </Router>
      <SearchButton/>
      </div>
    );
  }
}
export default App;
