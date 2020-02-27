import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
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
  const [value, setValue] = React.useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Is this hate speech?" />
      <CardContent>
        <Typography>Let the justice league check that for you !!!</Typography>
        <TextField
          id="outlined-multiline-static"
          label="Twitter Id"
          placeholder="Enter Twitter Id"
          variant="outlined"
          value={value}
          onChange={handleChange}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.onSubmit(value);
          }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default InsertLinkCard;
