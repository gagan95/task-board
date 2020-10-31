import Button from "@material-ui/core/Button";
import React from "react";


const TrelloButton = ({ children, onClick }) => {
  return (
    <Button variant="contained" color="primary" onMouseDown={onClick}>
      {children}
    </Button>
  );
};

export default TrelloButton;
