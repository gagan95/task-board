import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { strLimit } from '../utils/helpers';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 100,
    fontSize: 16,
    fontWeight: 700
  },

});
const BoardThumbnail = ({ title }) => {

  const classes = useStyles();
  return (
    <Card className={classes.root}>

      <CardContent title={title}>
        {strLimit(title, 20)}
      </CardContent>

    </Card>
  );
};

export default BoardThumbnail;
