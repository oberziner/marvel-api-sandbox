import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    character: null
  };

  componentDidMount() {
    this.callApi()
      .then((res) => {
        let character = res.data.results[0];
        const { thumbnail } = character;
        character.image = `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;
        this.setState({ character });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/__/characters/1009610');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    if (this.state.character) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">{this.state.character.name}</h1>
          </header>
          <div className="photo-desc-container">
            <img src={this.state.character.image}/>
            <p> 
              {this.state.character.description} 
              <a href={this.state.character.urls[0].url}> Marvel link </a>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App"> Loading </div>
      );
    }
  }
}

export default App;
