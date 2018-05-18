import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    character: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ character: res.data.results[0] }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/__/characters/1009610');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
          <h1 className="App-title">Don't Panic</h1>
        </header>
        <p className="App-intro">{this.state.character.name} </p>
      </div>
    );
  }
}

export default App;
