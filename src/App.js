import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import './App.css';
import SearchButton from './Components/SearchButton';

const NavBar = () => (
  <div className="navbar">
    <Link to="/">Home</Link>
    <Link to="/Search">Search</Link>
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
const Home = (props) => (
 <div>
  <Template title="Home"/>
  <p> Hello World </p>
  <SearchButton/>
</div>
);

const Search = (props) => (
  <Template title="Search"/>
);


class App extends Component {
  render() {
    return (
      <div>
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/Search" component={Search}/>
        <Route path="/Search" component={SearchButton}/>
      </Router>

      </div>
    );
  }
}
export default App;
