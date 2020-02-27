import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography,
  CardMedia,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Tweet} from 'react-twitter-widgets';
import {PieChart, Pie, Legend} from 'recharts';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 20,
    padding: 10,
  },
}));

const data = [
  {name: 'legal', value: 51, fill: '#00FF00'},
  {name: 'illegal', value: 331, fill: '#FF0000'},
];

const ResultsCard = () => {
  const classes = useStyles();
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

            <Typography>Machine Learning results:</Typography>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image="https://i.pinimg.com/474x/6d/89/56/6d8956db30a984d9b964020f26315c5e--computers-funny-stuff.jpg"
              title="Contemplative Reptile"
            />

            <Typography>Community results:</Typography>
            <PieChart height={400} width={400}>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Legend />
            </PieChart>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button>Submit</Button>
      </CardActions>
    </Card>
  );
};

export default ResultsCard;
