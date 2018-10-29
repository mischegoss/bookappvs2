import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function SearchButton(props) {

return (
  <div className="open-search">
              <Link to="./Search">Search</Link>
            </div>
 )
};

export default SearchButton;
