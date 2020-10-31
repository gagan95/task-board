import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { deleteList, editTitle } from "../store/actions";
import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";

const useStyles = makeStyles((theme) => ({
  ListContainer: {
    backgroundColor: "#dfe3e6",
    borderRadius: 3,
    width: 300,
    padding: 8,
    height: "100%",
    margin: "0 8px 0 0"
  },
  TitleContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    "& .ListTitle": {
      transition: "background 0.3s ease-in",
    },
    "& .ListTitle:hover": {
      background: "#ccc"
    }
  }

}));


const TrelloList = ({ title, cards, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const classes = useStyles();

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <TextField
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = e => {
    e.target.select();
  };

  const handleChange = e => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editTitle(listID, listTitle));
  };

  const handleDeleteList = () => {
    dispatch(deleteList(listID));
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <div
          className={classes.ListContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {provided => (
              <div>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                      <div className={classes.TitleContainer} onClick={() => setIsEditing(true)}>
                        <h4 className="ListTitle">{listTitle}</h4>
                        <DeleteIcon onClick={handleDeleteList}>
                          delete
                      </DeleteIcon>
                      </div>
                    )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                    <TrelloCard
                      key={card.id}
                      text={card.text}
                      id={card.id}
                      index={index}
                      listID={listID}
                    />
                  ))}
                  {provided.placeholder}
                  <TrelloCreate listID={listID} />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default connect()(TrelloList);
