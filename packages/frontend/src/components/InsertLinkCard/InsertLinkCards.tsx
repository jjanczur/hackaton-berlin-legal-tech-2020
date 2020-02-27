import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  InputLabel,
  FormControl,
  OutlinedInput,
  CardActions,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 20,
    padding: 10,
  },
}));

type Props = {
  onSubmit: any;
};

const InsertLinkCard = (props: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Is this hate speech?" />
      <CardContent>
        <Typography>Let the justice league check that for you !!!</Typography>
        <FormControl fullWidth>
          <InputLabel>Link</InputLabel>
          <OutlinedInput />
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.onSubmit('realDonalTrump');
          }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default InsertLinkCard;
