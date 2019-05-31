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

    var firebaseRef = firebase.database().ref('2019');
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        var teamsAndEvents = dataSnapshot.val();
        this.setState({ events: teamsAndEvents["Events"]})
        this.setState({ teams: teamsAndEvents["Teams"]})
       });
  }

  // When updates happen to firebase, this updates state
  componentDidMount() {
    var teamsRef = firebase.database().ref('2019/Teams');
    teamsRef.on("value", (snapshot) => {
      var teams = snapshot.val();
      // this.setState({teams: this.sortByTopScore(teams)});
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
    console.log("this.state.teams", this.state.teams);
    console.log("this.state", this.state);

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
              Object.keys(this.state.teams).map((team_id) =>
                <Item key={"item-" + team_id}>
                  <ScoreBoardRow key={"row-" + this.state.teams[team_id]["name"]} teamName={this.state.teams[team_id]["name"]} teamScores={this.state.teams[team_id]["scores"]} event_ids= {Object.keys(this.state.events)} team_id={team_id} />
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
