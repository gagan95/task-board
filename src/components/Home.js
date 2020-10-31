import {

  Snackbar
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addBoard } from "../store/actions";
import BoardThumbnail from "./BoardThumbnail";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    top: 10,
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      top: 0,
    }
  },
  board: {
    flex: 1,
    height: "50%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }

}));

const Home = ({ boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const classes = useStyles();
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (newBoardTitle.trim().length) {
      dispatch(addBoard(newBoardTitle.trim()));
      setNewBoardTitle("")
    } else {
      console.log("object")
      setNotify(true)
    }
  };
  const [notify, setNotify] = React.useState(false);
  const handleNotifyClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotify(false);
  };
  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];

      return (
        <Link
          key={boardID}
          to={`/${board.id}`}
          style={{ textDecoration: "none", margin: 10 }}
        >
          <BoardThumbnail {...board} />
        </Link>
      );
    });
  };

  const renderCreateBoard = () => {
    const classes = useStyles();

    return (
      <>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>

          <Typography variant="h3" align="center" gutterBottom>
            Personal Task Board
      </Typography>


          <Grid
            container
            spacing={2}
            justify="center"
            alignContent="center"
          >
            <Grid item xs={10} sm={6} md={4} lg={4}>
              <TextField id="outlined-basic" margin="dense" label="Create board title" variant="outlined" onChange={handleChange}
                value={newBoardTitle}
                placeholder="Add board title"
                type="text" required
                fullWidth
                inputProps={{ maxLength: 20 }} />
            </Grid>
            <Grid item xs={6} sm={3} md={2} lg={2}>
              <Button variant="contained" type="submit" color="primary" className={classes.root}>
                Create new board
            </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={notify}
          autoHideDuration={6000}
          onClose={handleNotifyClose}
        >
          <Alert
            onClose={handleNotifyClose}
            severity="warning"
            style={{ background: "#	#ffcc00", color: "#ffffff" }}
          >
            Please fill the board name !
        </Alert>
        </Snackbar>
      </>
    );
  };

  return (
    <>
      {renderCreateBoard()}
      <div className={classes.board}>{renderBoards()}</div>
    </>
  );
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Home);
