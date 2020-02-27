import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  InputLabel,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 20,
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const ThirdSpeechForm = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    third: true,
    reuse: false,
    sachbezug: false,
    defamation: false,
    gossip: false,
  });

  const handleChange = (name: any) => (event: any) => {
    setState({...state, [name]: event.target.checked});
  };

  const {third, reuse, sachbezug, defamation, gossip} = state;
  const error =
    [third, reuse, sachbezug, defamation, gossip].filter(v => v).length === 0;
  return (
    <FormControl
      required
      error={error}
      component="fieldset"
      className={classes.formControl}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={third}
              onChange={handleChange('third')}
              value="third"
            />
          }
          label="Handelt es sich um die Wiedergabe der Aussage eines Dritten?"
        />
        {third ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={reuse}
                onChange={handleChange('reuse')}
                value="reuse"
              />
            }
            label="Hat sich der Offender die Aussage zu eigen gemacht?"
          />
        ) : null}
        <FormControlLabel
          control={
            <Checkbox
              checked={sachbezug}
              onChange={handleChange('sachbezug')}
              value="sachbezug"
            />
          }
          label="Ist noch ein Sachbezug zu erkennen?"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={gossip}
              onChange={handleChange('gossip')}
              value="gossip"
            />
          }
          label="Ist noch ein Sachbezug zu erkennen?"
        />
      </FormGroup>
      {/* {error ? <FormHelperText>Nothing illegal?</FormHelperText> : null} */}
    </FormControl>
  );
};

export default ThirdSpeechForm;
