import React, { Component } from 'react';
import { Link } from 'react-router';

function SearchButton(props) {

return (
  <div className="open-search">
              <Link to="/Search">Search</Link>
            </div>
 )
};

export default SearchButton;
