import React, { Component } from 'react';
import firebase from "firebase";
import ScoreBoardRow from '../ScoreBoardRow/ScoreBoardRow'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
} from 'material-ui/Table';

class ScoreBoard extends Component {

  constructor(props) {
    super(props);
    var database = firebase.database();
    this.state = {
      database: database,
      teams: {},
      events: [],
      teamsAndEvents: {}
    }

    var firebaseRef = firebase.database().ref('2019');
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        var teamsAndEvents = dataSnapshot.val();
        this.setState({teams: teamsAndEvents.hasOwnProperty("Teams") ? teamsAndEvents["Teams"] : {} });
        this.setState({events: teamsAndEvents.hasOwnProperty("Events") ? teamsAndEvents["Events"] : [] });
       });
  }

  render() {
    console.log(this.state.teams);
    console.log(this.state.events);
    return (
      <MuiThemeProvider>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              {
                this.state.events.map((event) => {
                  return <TableHeaderColumn key={event}>{event}</TableHeaderColumn>
                })
              }
              <TableHeaderColumn>Total Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              Object.keys(this.state.teams).map(team =>
                <ScoreBoardRow key={team} teamName={team} teamData={this.state.teams[team]}/>
              )
            }

          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

export default ScoreBoard;
