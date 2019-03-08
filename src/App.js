import React, { Component } from 'react';
import ActionCable from 'actioncable'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { text: '' }

  handleReceiveNewText = ({ text }) => {
    if (text !== this.state.text) {
      this.setState({ text })
    }
  }

  componentDidMount() {
    window.fetch('http://localhost:3001/teams/1').then(data => {
      data.json().then(res => {
        this.setState({ text: res.total })
      })
    })

    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('TeamsChannel', {
      received: this.handleReceiveNewText
    })
    debugger;
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
    this.sub.send({ text: e.target.value, id: 1 })
  }

  render() {
    return (
      <textarea
        value={this.state.text}
        onChange={this.handleChange}
      />
    )
  }
}

export default App;
