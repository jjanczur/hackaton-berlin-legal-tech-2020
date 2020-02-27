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
    incitement: true,
    insult: false,
    gossip: false,
    defamation: false,
  });

  const handleChange = (name: any) => (event: any) => {
    setState({...state, [name]: event.target.checked});
  };

  const {incitement, insult, gossip, defamation} = state;
  const error =
    [incitement, insult, gossip, defamation].filter(v => v).length === 0;
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
              <FormLabel component="legend">Pick the </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={incitement}
                      onChange={handleChange('incitement')}
                      value="incitement"
                    />
                  }
                  label="Incitemenet of Masses(§ 130 StGB)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={insult}
                      onChange={handleChange('insult')}
                      value="insult"
                    />
                  }
                  label="Insult (§ 185 StGB)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gossip}
                      onChange={handleChange('gossip')}
                      value="gossip"
                    />
                  }
                  label="Malicious Gossip(§ 186 StGB)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={defamation}
                      onChange={handleChange('defamation')}
                      value="defamation"
                    />
                  }
                  label="Defamation (§ 187 StGB)"
                />
              </FormGroup>
              <FormHelperText>Nothing illegal?</FormHelperText>
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
