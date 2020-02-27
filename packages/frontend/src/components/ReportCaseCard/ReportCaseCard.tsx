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
  Grid,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Tweet} from 'react-twitter-widgets';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 20,
    padding: 10,
  },
}));

const ReportCaseCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Reporting a new case..." />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Tweet tweetId="1232657663701536768" />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Offender</InputLabel>
              <OutlinedInput />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Victim</InputLabel>
              <OutlinedInput />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button>Submit</Button>
      </CardActions>
    </Card>
  );
};

export default ReportCaseCard;
