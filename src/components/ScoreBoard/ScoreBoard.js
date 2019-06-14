import React, { Component } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import firebase from "firebase";
import posed, { PoseGroup } from "react-pose";
import ScoreBoardRow from '../ScoreBoardRow/ScoreBoardRow'

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
      events: {},
    }
    var currentYear = new Date().getFullYear().toString();
    var firebaseRef = firebase.database().ref(currentYear);
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        var teamsAndEvents = dataSnapshot.val();
        this.setState({ events: teamsAndEvents["Events"]})
        this.setState({ teams: teamsAndEvents["Teams"]})
       });
  }

  // When updates happen to firebase, this updates state
  componentDidMount() {
    var currentYear = new Date().getFullYear().toString();
    var teamsRef = firebase.database().ref(currentYear + '/Teams');
    teamsRef.on("value", (snapshot) => {
      var teams = snapshot.val();
      this.setState({teams: teams});
    });

    var eventsRef = firebase.database().ref(currentYear + '/Events');
    eventsRef.on("value", (snapshot) => {
      var events = snapshot.val();
      this.setState({events: events});
    });
  }

  calculateTopScore(teams){
    for (var id in teams){
      if (teams[id]["scores"]) {
        teams[id]["scores"]["total_score"] = Object.values(teams[id]["scores"]).reduce((a,b) => a + b, 0);
      } else {
        teams[id]["scores"] = {};
        teams[id]["scores"]["total_score"] = 0;
      }
    }
    return teams;
  }

  sortByTopScore(teams) {
    teams = this.calculateTopScore(teams);
    var team_ids = Object.keys(teams);
    var teamData = Object.values(teams);
    var ordered = team_ids.map((e, i) => [e, teamData[i]]).sort((a,b) => {return b[1]["scores"]["total_score"] - a[1]["scores"]["total_score"]})
    // var sortedObject = ordered.reduce(function(p, c) {
    //      p[c[0]] = c[1];
    //      return p;
    // }, {});

    // ["3", {name: x, score: {1: 2}}]
    // ["1", {name: x, score: {1: 2}}]

    return ordered;
  }

  render() {
    console.log("this.state.teams", this.state.teams);
    console.log("this.state.events", this.state.events);
    var events = [];
    for (var event in this.state.events)
    {
      events.push(<Col key={this.state.events[event]["name"]}><strong>{this.state.events[event]["name"]}</strong></Col>);
    }
    return (
        <ul className="scoreBoardBody">
        <Card>
          <CardBody>
            <Row>
              <Col><strong>Teams</strong></Col>
              {
                events
              }
              <Col><strong>Total Score</strong></Col>
            </Row>
          </CardBody>
        </Card>
        <PoseGroup>
          {
            this.state.teams !== {} ?
              this.sortByTopScore(this.state.teams).map((team_obj) =>
                <Item key={"item-" + team_obj[0]}>
                  <ScoreBoardRow key={"row-" + team_obj[1]["name"]} teamName={team_obj[1]["name"]} teamScores={team_obj[1]["scores"]} eventIds={Object.keys(this.state.events)} teamId={team_obj[0]} />
                </Item>
              )
              : ""
          }
        </PoseGroup>
        </ul>
    );
  }
}

export default ScoreBoard;
