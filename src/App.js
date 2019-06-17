import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";
import ScoreBoard from './components/ScoreBoard/ScoreBoard'

class App extends Component {

  constructor(props) {
    super(props);
    var database = firebase.database();
    this.state = {
      database: database
    }

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header-rainbow">3Plympics Score Board</h1>
        </header>
        <div className="score-board">
          <ScoreBoard className="score-board" />
        </div>
      </div>
    );
  }
}

export default App;
