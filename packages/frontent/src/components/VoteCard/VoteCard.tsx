import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Tweet} from 'react-twitter-widgets';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 20,
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const VoteCard = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (name: any) => (event: any) => {
    setState({...state, [name]: event.target.checked});
  };

  const {gilad, jason, antoine} = state;
  const error = [gilad, jason, antoine].filter(v => v).length !== 2;
  return (
    <Card className={classes.card}>
      <CardHeader title="This case is being investigated by the justice warriors.. " />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Tweet tweetId="1232657663701536768" />
          </Grid>
          <Grid item xs={6}>
            <Typography>Offender: @realDonaldTrump</Typography>

            <Typography>Victim: native americans</Typography>
            <FormControl
              required
              error={error}
              component="fieldset"
              className={classes.formControl}
            >
              <FormLabel component="legend">Pick two</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={handleChange('gilad')}
                      value="gilad"
                    />
                  }
                  label="Incitemenet of Masses(§ 130 StGB)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jason}
                      onChange={handleChange('jason')}
                      value="jason"
                    />
                  }
                  label="Insult (§ 185 StGB)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange('antoine')}
                      value="antoine"
                    />
                  }
                  label="Malicious Gossip(§ 186 StGB)"
                />
              </FormGroup>
              <FormHelperText>You can display an error</FormHelperText>
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

export default VoteCard;
