import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      userInput: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

      handleChange(event) {
        this.setState({userInput: event.target.value});
      }

      handleSubmit(event) {
        //const url = 'https://api.themoviedb.org/3/search/movie?query=' + this.state.userInput + '&api_key=2301535fa250c0bcc1f89c74b2a2a9b4'
        fetch('https://api.themoviedb.org/3/search/movie?query=' + this.state.userInput + '&api_key=2301535fa250c0bcc1f89c74b2a2a9b4')
          .then(response => response.json())
          .then(movies => {
            var input = movies.results[0].title
            console.log('input for movies with a space ', input);
            if (input.includes(' ')) {
              //var removeDigits = /[0-9]/g
              //var highRegString = input.toUpperCase().replace(removeDigits, '');
              var splitString = input.split(' ');
              var lastWord = splitString[splitString.length -1];
              var firstLetterOfLastWord = lastWord[0];
              this.setState({
                movies: movies,
                movieTitle: movies.results[0].title,
                overview: movies.results[0].overview,
                backdrop: 'https://image.tmdb.org/t/p/w500' + movies.results[0].backdrop_path,
                poster: 'https://image.tmdb.org/t/p/w500' + movies.results[0].poster_path,
                userInput: firstLetterOfLastWord
              })
            } else {
              var input = movies.results[0].title
              console.log('input ', input)
              var lastLetterOfWord = input[input.length -1];
              this.setState({
                movies: movies,
                movieTitle: movies.results[0].title,
                overview: movies.results[0].overview,
                backdrop: 'https://image.tmdb.org/t/p/w500' + movies.results[0].backdrop_path,
                poster: 'https://image.tmdb.org/t/p/w500' + movies.results[0].poster_path,
                userInput: lastLetterOfWord
              })
            }
            })
            .catch(err => console.log(err))
          // }
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

        <form onSubmit={this.handleSubmit}>
           <label>
             Movie:
             <input type="text" value={this.state.userInput} onChange={this.handleChange} />
           </label>
           <input type="submit" value="Submit" />
         </form>

         <ul>
           <li>{this.state.movieTitle}</li>
           <li>{this.state.overview}</li>
           <img className="img-responsive" src={this.state.poster}/>
           <img className="img-responsive" src={this.state.backdrop}/>
           {/* {this.state.map((movie, index) => (
             <li key={index}>{movie.movies.results[0].title}</li>
           ))} */}
         </ul>

      </div>
    );
  }
}

export default App;
