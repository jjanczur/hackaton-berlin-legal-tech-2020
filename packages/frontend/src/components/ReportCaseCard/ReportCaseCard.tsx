import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography,
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

const ReportCaseCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Opinion by the justice league" />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Tweet tweetId="1232657663701536768" />
          </Grid>
          <Grid item xs={6}>
            <Typography>Community results:</Typography>
            <PieChart height={300} width={400}>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={150}
                cy={150}
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
        <Button variant="contained" color="primary">
          contact a lawyer
        </Button>
      </CardActions>
    </Card>
  );
};

export default ReportCaseCard;
