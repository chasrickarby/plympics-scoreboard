import React, { Component } from 'react';
import firebase from "firebase";
import posed, { PoseGroup } from "react-pose";
import { Card, CardBody, Container, Col, Row } from 'reactstrap';

import './ScoreBoardRow.css'

class ScoreBoard extends Component {

  constructor(props) {
    super(props);
    var database = firebase.database();
    this.state = {
      event_ids: props.event_ids,
      team_id: props.team_id,
      teamScores: props.teamScores,
      teamName: props.teamName,
      database: database
    }
  }

  componentDidMount() {
    var teamRef = firebase.database().ref('2019/Teams/' + this.state.team_id + "/scores");
    teamRef.on("value", (snapshot) => {
      var scores = snapshot.val();
      this.setState({
        teamScores: scores
      });
    });
  }

  

  render() {
    var totalScore = 0;
    return (
      <Card>
        <CardBody>
          <Row>
            <Col>{this.state.teamName}</Col>
            {
              Object.keys(this.state.event_ids).map((id) => {
                return this.state.teamScores[this.state.event_ids[id]] ? <Col key={this.state.teamName + "-" + this.state.event_ids[id]}>{this.state.teamScores[this.state.event_ids[id]]}</Col> : <Col key={this.state.teamName + "-" + this.state.event_ids[id]}></Col>
              })
            }
            <Col>Total Score</Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default ScoreBoard;
