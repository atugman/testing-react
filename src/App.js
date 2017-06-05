import React, { Component } from 'react';
//import logo from './logo.svg';
import vhs from './vhs.png'
import './App.css';
import '../node_modules/animate.css/animate.min.css'

class App extends Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      userInput: 'T',
      score: 0,
      usedMovies: '',
      // firstLetterOfLastWord: '',
      // lastLetterOfWord: ''
      relevantLetter: 'T'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

      handleChange(event) {
        this.setState({
          userInput: event.target.value
        });
        if (event.target.value[0] !== this.state.relevantLetter) {
          alert("Hey! You can't change that first letter! Put that " + this.state.relevantLetter + " back in there! Nice try pal!"),
          this.setState({
            userInput: this.state.relevantLetter
          })
        }
      }

      handleSubmit(event) {
        //const url = 'https://api.themoviedb.org/3/search/movie?query=' + this.state.userInput + '&api_key=2301535fa250c0bcc1f89c74b2a2a9b4'
        fetch('https://api.themoviedb.org/3/search/movie?query=' + this.state.userInput + '&api_key=2301535fa250c0bcc1f89c74b2a2a9b4')
          .then(response => response.json())
          .then(movies => {
            var input = movies.results[0].title
            //document.getElementById("hi").className = "animated slideInRight"
            //prevents using the same movie twice
            if (this.state.usedMovies.includes(input)) {
              console.log('a');
              alert('Hey! You already used that one! Game over pal!'),
              this.setState({
                movies: '',
                movieTitle: '',
                overview: '',
                backdrop: '',
                poster: '',
                userInput: 'A',
                score: 0,
                usedMovies: '',
                // firstLetterOfLastWord: '',
                // lastLetterOfWord: '',
                relevantLetter: 'A'
              })
            }
            else if (this.state.userInput.includes("The")) {
              console.log('b');
              var userInput = this.state.userInput
              var splitString = userInput.toUpperCase().split(' ');
              for (var i = 0; i < splitString.length; i++) {
                if (splitString[0] = "THE") {
                  alert('Nice try...you know what you did... :)'),
                  this.setState ({
                    movies: '',
                    movieTitle: '',
                    overview: '',
                    backdrop: '',
                    poster: '',
                    userInput: 'A',
                    score: 0,
                    usedMovies: '',
                    // firstLetterOfLastWord: '',
                    // lastLetterOfWord: '',
                    relevantLetter: 'A'
                  })
                }
              }
            }
          //   else if (input.includes('The')) {
          //     console.log('c');
          //     var removeDigits = /[0-9]/g
          //     var highRegString = input.replace(removeDigits, '');
          //     var highRegString2 = highRegString.replace("The", "");
          //     var splitString = highRegString2.toUpperCase().split(' ');
          //     if (splitString.length === 2) {
          //       for (var i = 0; i < splitString.length; i++) {
          //         if (splitString[i].length <= 1) {
          //           splitString.splice(i, 1);
          //         }
          //       }
          //       var splitString2 = splitString[0];
          //       var lastLetterOfWord = splitString2.slice(-1);
          //     } this.setState ({
          //       movies: movies,
          //       movieTitle: movies.results[0].title,
          //       overview: movies.results[0].overview,
          //       backdrop: 'https://image.tmdb.org/t/p/w500' + movies.results[0].backdrop_path,
          //       poster: 'https://image.tmdb.org/t/p/w500' + movies.results[0].poster_path,
          //       userInput: lastLetterOfWord,
          //       score: this.state.score+1,
          //       usedMovies: this.state.usedMovies + ' ' + input,
          //       // firstLetterOfLastWord: '',
          //       // lastLetterOfWord: lastLetterOfWord,
          //       relevantLetter: lastLetterOfWord
          //     })
          // }
            //if movie title is multiple words, the next movie must
            //use the first letter of the last word of original movie
            else if (input.includes(' ')) {
              console.log('d');
              var removeDigits = /[0-9]/g
              var highRegString = input.toUpperCase().replace(removeDigits, '');
              var splitString = highRegString.split(' ');
              console.log(splitString);
              if (splitString.includes('')) {
                splitString.splice(-1, 1);
              }
              console.log(splitString);
              var lastWord = splitString[splitString.length -1];
              console.log(lastWord);
              var firstLetterOfLastWord = lastWord[0];
              console.log(firstLetterOfLastWord);
              this.setState({
                movies: movies,
                movieTitle: movies.results[0].title,
                overview: movies.results[0].overview,
                backdrop: 'https://image.tmdb.org/t/p/w500' + movies.results[0].backdrop_path,
                poster: 'https://image.tmdb.org/t/p/w500' + movies.results[0].poster_path,
                userInput: firstLetterOfLastWord,
                score: this.state.score+1,
                usedMovies: this.state.usedMovies + ' ' + input,
                // firstLetterOfLastWord: firstLetterOfLastWord,
                // lastLetterOfWord: '',
                relevantLetter: firstLetterOfLastWord
              })// for edge cases - ex, the aristocats
            } else { //if movie is one word, use last letter for next turn
              console.log('e');
              var input = movies.results[0].title
              console.log('input ', input)
              var removeDigits = /[0-9]/g
              var highRegString = input.toUpperCase().replace(removeDigits, '');
              var lastLetterOfWord = highRegString[highRegString.length -1];
              this.setState({
                movies: movies,
                movieTitle: movies.results[0].title,
                overview: movies.results[0].overview,
                backdrop: 'https://image.tmdb.org/t/p/w500' + movies.results[0].backdrop_path,
                poster: 'https://image.tmdb.org/t/p/w500' + movies.results[0].poster_path,
                userInput: lastLetterOfWord,
                score: this.state.score+1,
                usedMovies: this.state.usedMovies + ' ' + input,
                // firstLetterOfLastWord: '',
                // lastLetterOfWord: lastLetterOfWord,
                relevantLetter: lastLetterOfWord
              })
            }
            })
            .catch(err => {
              alert('You lose!')
              this.setState({
                movies: '',
                movieTitle: '',
                overview: '',
                backdrop: '',
                poster: '',
                userInput: 'A',
                score: 0,
                usedMovies: '',
                // firstLetterOfLastWord: '',
                // lastLetterOfWord: '',
                relevantLetter: 'A'
              })
            })
          event.preventDefault();
      }

  render() {
return (
      <div className="App">
        <div className="App-header animated slideInRight">
          <img src={vhs} className="App-logo" alt="logo" />
          <h2 className='animated bounce'>The Movie Game!</h2>
        </div>
        <p className="App-intro">
          Type the name of a movie into the box that starts with the specified letter!
        </p>

        <form onSubmit={this.handleSubmit}>
           <label>
             Movie:
             <input type="text" value={this.state.userInput} onChange={this.handleChange} />
           </label>
           <input type="submit" value="Submit" />
         </form>

         <div className="App-intro">
           <div className="score">Score: {this.state.score}</div>
           <div className="row" id="hello">
             <div id="hey" className="col-8">
               <div className="movie-title">{this.state.movieTitle}</div>
               <div className="overview">{this.state.overview}</div>
             </div>
             <div id="hi" className="col-4">
               <img className="Poster img-responsive" src={this.state.poster}/>
            </div>
          </div>
           <img className="Backdrop img-responsive" src={this.state.backdrop}/>
           {/* {this.state.map((movie, index) => (
             <li key={index}>{movie.movies.results[0].title}</li>
           ))} */}
         </div>

      </div>
    );
  }
}

export default App;
