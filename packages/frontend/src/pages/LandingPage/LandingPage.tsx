import React from 'react';
import styled from 'styled-components';
import {Grid} from '@material-ui/core';
import InsertLinkCard from '../../components/InsertLinkCard';
import ReportCaseCard from '../../components/ReportCaseCard';
import ResultsCard from '../../components/ResultsCard';
import VoteCard from '../../components/VoteCard';
import picture from '../../logo.png';

function LandingPage(props: any) {
  const [state, setState] = React.useState({
    screen: 1,
    profileName: '',
  });

  if (state.screen === 1) {
    return (
      <Background
        style={{
          backgroundImage: `url(${picture})`,
        }}
      >
        <Grid container alignContent="center">
          <Grid item xs={4} />
          <Grid item xs={4}>
            <InsertLinkCard
              onSubmit={(profile: any) => {
                setState({screen: 2, profileName: profile});
                console.log(profile);
              }}
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <ResultsCard />
          </Grid>
          <Grid item xs={6}>
            <VoteCard />
          </Grid>
          <Grid item xs={4}>
            <ReportCaseCard />
          </Grid>
        </Grid>
      </Background>
    );
  }

  if (state.screen === 2) {
    return (
      <Background
        style={{
          backgroundImage: `url(${picture})`,
        }}
      >
        <Grid container alignContent="center">
          <Grid item xs={5}>
            <ResultsCard />
          </Grid>
          <Grid item xs={7}>
            <VoteCard />
          </Grid>
        </Grid>
      </Background>
    );
  }

  return (
    <Background
      style={{
        backgroundImage: `url(${picture})`,
      }}
    >
      <Grid container alignContent="center">
        <Grid item xs={4} />
        <Grid item xs={4}>
          <InsertLinkCard
            onSubmit={(profile: any) => {
              setState({screen: 2, profileName: profile});
              console.log(profile);
            }}
          />
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <ResultsCard />
        </Grid>
        <Grid item xs={6}>
          <VoteCard />
        </Grid>
        <Grid item xs={4}>
          <ReportCaseCard />
        </Grid>
      </Grid>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  background-color: rgba(74, 74, 74, 1);
  flex-direction: column;
`;

export default LandingPage;
