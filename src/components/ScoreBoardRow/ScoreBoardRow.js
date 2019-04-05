import React, { Component } from 'react';
import firebase from "firebase";
import posed, { PoseGroup } from "react-pose";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './ScoreBoardRow.css'

class ScoreBoard extends Component {

  constructor(props) {
    super(props);
    var database = firebase.database();
    this.state = {
      teamData: props.teamData,
      teamName: props.teamName,
      database: database
    }
  }

  componentDidMount() {
    var teamRef = firebase.database().ref('2019/Teams/' + this.state.teamName);
    teamRef.on("value", (snapshot) => {
      var team = snapshot.val();
      this.setState({
        teamData: team
      });
    });
  }

  render() {
    var totalScore = 0;
    return (
      <TableRow>
        <TableRowColumn>{this.state.teamName}</TableRowColumn>
        {
          Object.keys(this.state.teamData).map((score, i) => {
            totalScore += this.state.teamData[score];
            return <TableRowColumn key={this.state.teamName + "-" + i}>{this.state.teamData[score]}</TableRowColumn>
          })
        }
      </TableRow>
    );
  }
}

export default ScoreBoard;
