import React from "react";

/* This is the Main Title. I kept this as separate because this was my first successful attempt at a compoennt :) */
const MainTitle = props => {
  return (
    <div className="list-books-title">
      <h1>{props.title}</h1>
    </div>
  );
};

export default MainTitle;
