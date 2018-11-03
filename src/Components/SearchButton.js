import React from "react";
import { Link } from "react-router-dom";
/* This is the button the switches over to the search page */
const SearchButton = props => {
  return (
    <div className="open-search">
      <Link to="./Search">Search</Link>
    </div>
  );
};

export default SearchButton;
