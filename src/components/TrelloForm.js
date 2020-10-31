import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React from "react";
import Textarea from "react-textarea-autosize";
const useStyles = makeStyles((theme) => ({
  Container: {
    width: 284,
    marginBottom: 8
  },
  StyledCard: {
    minHeight: 85,
    padding: " 6px 8px 2px"
  },
  StyledTextArea: {
    resize: "none",
    width: "100%",
    overflow: "hidden",
    outline: "none",
    border: "none",
  },
  StyledIcon: {
    marginLeft: 8,
    cursor: "pointer"
  },
  ButtonContainer: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    marginLeft: 8
  }

}));



const TrelloForm = React.memo(
  ({ list, text = "", onChange, closeForm, children }) => {
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const classes = useStyles();

    return (
      <div className={classes.Container}>
        <Card className={classes.StyledCard}>
          <Textarea
            className={classes.StyledTextArea}
            placeholder={placeholder}
            autoFocus
            value={text}
            onChange={e => onChange(e)}
            onBlur={closeForm}
          />
        </Card>
        <div className={classes.ButtonContainer}>
          {children}
          <CloseIcon className={classes.StyledIcon} onMouseDown={closeForm} />
        </div>
      </div>
    );
  }
);

export default TrelloForm;
