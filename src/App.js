import React, { Component } from 'react';
import Situation from "./view/SituationComponent"
import Robot from "./model/Robot"
import Welcome from './view/welcome';
import Question from './view/question';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Question/>
      </div>
    );
  }
}

export default App;
