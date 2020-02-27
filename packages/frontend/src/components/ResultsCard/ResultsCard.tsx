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
import {Tweet, Timeline} from 'react-twitter-widgets';
import {PieChart, Pie, Legend} from 'recharts';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 20,
    padding: 10,
  },
}));

type Props = {
  username?: string;
};

const ResultsCard = (props: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="The justice league engine is infilitrating the profile..." />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            {/* <Tweet tweetId="1232657663701536768" /> */}
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: props.username,
              }}
              options={{username: props.username, height: 600}}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Did the algorithm find any hate speech on this account?
            </Typography>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={
                props.username === 'realDonaldTrump'
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIxlVT0tDSuhmtCX9MR5eAoFjAVKQQzG5wSSZZOrXa1FrGIOdN'
                  : 'https://i.pinimg.com/474x/6d/89/56/6d8956db30a984d9b964020f26315c5e--computers-funny-stuff.jpg'
              }
              title="Contemplative Reptile"
            />
            {/* 
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
              <Legend /> */}
            {/* </PieChart> */}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Go Back
        </Button>
      </CardActions>
    </Card>
  );
};

ResultsCard.defaultProps = {
  username: 'realDonaldTrump',
};

export default ResultsCard;
