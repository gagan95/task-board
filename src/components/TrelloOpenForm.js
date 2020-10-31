import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    marginLeft: 8,

    paddingLeft: 10,
    paddingRight: 10,
    opacity: 1,
    color: "white",
    backgroundColor: "rgba(0,0,0,.15)"
  }

}));
const TrelloOpenForm = ({ list, children, onClick }) => {

  const classes = useStyles();

  return (
    <Button className={classes.root} onClick={onClick}>
      <AddIcon />
      <p style={{ flexShrink: 0 }}>{children}</p>
    </Button>
  );
};

export default TrelloOpenForm;
