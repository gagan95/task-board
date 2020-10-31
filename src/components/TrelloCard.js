import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { deleteCard, editCard } from "../store/actions";
import TrelloButton from "./TrelloButton";
import TrelloForm from "./TrelloForm";
const useStyles = makeStyles((theme) => ({
  CardContainer: {
    margin: "0 0 8px 0",
    position: "relative",
    maxWidth: "100%",
    wordWrap: "break-word"
  },
}));




const TrelloCard = React.memo(({ text, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);
  const classes = useStyles();
  const closeForm = e => {
    setIsEditing(false);
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  const saveCard = e => {
    e.preventDefault();

    dispatch(editCard(id, listID, cardText));
    setIsEditing(false);
  };

  const handleDeleteCard = e => {
    console.log(listID);
    dispatch(deleteCard(id, listID));
  };

  const renderEditForm = () => {
    return (
      <TrelloForm text={cardText} onChange={handleChange} closeForm={closeForm}>
        <TrelloButton onClick={saveCard}>Save</TrelloButton>
      </TrelloForm>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <div
            className={classes.CardContainer}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
              <EditIcon
                onMouseDown={() => setIsEditing(true)}

              />

              <DeleteIcon onMouseDown={handleDeleteCard} />


              <CardContent>
                <Typography>{text}</Typography>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(TrelloCard);
