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
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Tweet} from 'react-twitter-widgets';
import ThirdSpeechFrom from './ThirdSpeech';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 20,
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

type Props = {
  onSubmit: any;
};

const VoteCard = (props: Props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    incitement: false,
    insult: false,
    gossip: false,
    defamation: false,
  });
  const [value, setValue] = React.useState('Yes');

  const [block, setBlock] = React.useState('Block');

  const handleChange = (name: any) => (event: any) => {
    setState({...state, [name]: event.target.checked});
  };

  const handleLegal = (event: any) => {
    setValue(event.target.value);
  };
  const handleBlocked = (event: any) => {
    setBlock(event.target.value);
  };

  const {incitement, insult, gossip, defamation} = state;
  const error =
    [incitement, insult, gossip, defamation].filter(v => v).length === 0;
  return (
    <Card className={classes.card}>
      <CardHeader title="Please investigate this case" />
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
            {/* <ThirdSpeechFrom /> */}
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                Do you think this is illegal?
              </FormLabel>
              <RadioGroup
                aria-label="isLegal"
                name="isLegal1"
                value={value}
                onChange={handleLegal}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {value === 'Yes' ? (
              <FormControl
                required
                error={error}
                component="fieldset"
                className={classes.formControl}
              >
                <FormLabel component="legend">
                  Which laws are violated?
                </FormLabel>
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
                {error ? (
                  <FormHelperText>Nothing illegal?</FormHelperText>
                ) : null}
              </FormControl>
            ) : (
              <div>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Do you think this should be blocked?
                  </FormLabel>
                  <RadioGroup
                    aria-label="shouldBlock"
                    name="shouldBlock1"
                    value={block}
                    onChange={handleBlocked}
                  >
                    <FormControlLabel
                      value="Block"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="Keep"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Tell us why</InputLabel>
                  <OutlinedInput />
                </FormControl>
              </div>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.onSubmit();
          }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default VoteCard;
