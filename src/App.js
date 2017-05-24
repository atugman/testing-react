import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      baseMovie: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/550?api_key=2301535fa250c0bcc1f89c74b2a2a9b4')
      .then(response => response.json())
      .then(apiData => {
        const movies = []
          this.setState({
            movies,
            baseMovie: apiData.original_title
          })
        })
        .catch(err => console.log(err))
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

  render() {
return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello World</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          <li>{this.state.baseMovie}</li>
          {console.log(this.state.baseMovie)}
          {//use this prop syntax when importing
            //<li movie={this.state.baseMovie}>{this.state.baseMovie}</li>
          }
        </ul>
        <form onSubmit={this.handleSubmit}>
           <label>
             Movie:
             <input type="text" value={this.state.value} onChange={this.handleChange} />
           </label>
           <input type="submit" value="Submit" />
         </form>
      </div>
    );
  }
}

export default App;
