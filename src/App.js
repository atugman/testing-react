import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //
  //   fetch('https://api.themoviedb.org/3/search/movie?query=%' + this.state.value + '%&api_key=2301535fa250c0bcc1f89c74b2a2a9b4')
  //     .then(response => response.json())
  //     .then(movies => {
  //         this.setState({
  //           movies
  //         })
  //       })
  //       .catch(err => console.log(err))
  //     }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        // componentDidMount() {
        fetch('https://api.themoviedb.org/3/search/movie?query=%' + this.state.value + '%&api_key=2301535fa250c0bcc1f89c74b2a2a9b4')
          .then(response => response.json())
          .then(movies => {
            console.log('movies ', movies);
              this.setState({
                movies: movies,
                movieTitle: movies.results[0].title,
                overview: movies.results[0].overview,
                backdrop: movies.results[0].backdrop_path,
                poster: 'https://image.tmdb.org/t/p/w500' + movies.results[0].poster_path,
                //value: movies.results[0].title.slice(-1)
              })
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
             <input type="text" value={this.state.value} onChange={this.handleChange} />
           </label>
           <input type="submit" value="Submit" />
         </form>

         <ul>
           <li>{this.state.movieTitle}</li>
           <li>{this.state.overview}</li>
           <li>{this.state.backdrop}</li>
           <img className="img-responsive" src={this.state.poster}/>
           {/* {this.state.map((movie, index) => (
             <li key={index}>{movie.movies.results[0].title}</li>
           ))} */}
         </ul>

      </div>
    );
  }
}

export default App;
