import React, { Component } from 'react';
import threeEntryPoint from './three/threeEntryPoint';

class App extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }
  render() {
    return (
      <div id="scene" ref={element => this.threeRootElement = element} />
    );
  }
}

export default App;
