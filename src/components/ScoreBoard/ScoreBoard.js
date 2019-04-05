import React, { Component } from 'react';
import firebase from "firebase";
import posed, { PoseGroup } from "react-pose";
import ScoreBoardRow from '../ScoreBoardRow/ScoreBoardRow'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
} from 'material-ui/Table';

import './ScoreBoard.css'

const Item = posed.li({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

class ScoreBoard extends Component {

  constructor(props) {
    super(props);
    var database = firebase.database();
    this.state = {
      database: database,
      teams: {},
      events: [],
    }

    var firebaseRef = firebase.database().ref('2019');
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        var teamsAndEvents = dataSnapshot.val();
        if(teamsAndEvents.hasOwnProperty("Teams")){
          this.setState({teams: this.sortByTopScore(teamsAndEvents["Teams"])});
        }
        this.setState({events: teamsAndEvents.hasOwnProperty("Events") ? teamsAndEvents["Events"] : [] });
       });
  }

  componentDidMount() {
    var teamsRef = firebase.database().ref('2019/Teams');
    teamsRef.on("value", (snapshot) => {
      var teams = snapshot.val();
      this.setState({teams: this.sortByTopScore(teams)});
    });
  }

  sortByTopScore(teams) {
    var keys = Object.keys(teams);
    var values = Object.values(teams);
    var ordered = keys.map((e, i) => [e, values[i]]).sort((a,b) => {return b[1]["Total"] - a[1]["Total"]})
    var sortedObject = ordered.reduce(function(p, c) {
         p[c[0]] = c[1];
         return p;
    }, {});
    return sortedObject;
  }

  render() {
    console.log(this.state.teams);
    console.log(this.state.events);
    return (
      <MuiThemeProvider>
        <TableRow>
          <TableHeaderColumn>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableHeaderColumn>
          {
            this.state.events.map((event) => {
              return <TableHeaderColumn key={event}>{event}</TableHeaderColumn>
            })
          }
          <TableHeaderColumn>Total Score</TableHeaderColumn>
        </TableRow>
        <ul className="scoreBoardBody">
        <PoseGroup>
          {
            this.state.teams !== {} ?
              Object.keys(this.state.teams).map((team) =>
                <Item key={"item-" + team}>
                  <TableRow style={{visibility: "hidden", height: 0}}>
                    <TableHeaderColumn style={{ height: 'auto !important' }}>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableHeaderColumn>
                    {
                      this.state.events.map((event) => {
                        return <TableHeaderColumn style={{ height: 'auto !important' }} key={event}>{event}</TableHeaderColumn>
                      })
                    }
                    <TableHeaderColumn style={{ height: 'auto !important' }}>Total Score</TableHeaderColumn>
                  </TableRow>
                  <ScoreBoardRow key={"row-" + team} teamName={team} teamData={this.state.teams[team]}/>
                </Item>
              )
              : ""
          }
        </PoseGroup>
        </ul>
      </MuiThemeProvider>
    );
  }
}

export default ScoreBoard;
