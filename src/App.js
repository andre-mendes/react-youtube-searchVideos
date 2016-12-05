import React            from 'react';
import YoutubeSearchBar from './YoutubeSearchBar';
import                       './css/App.css'

let App = React.createClass({
  getInitialState() {
    return {
      searchResults : []
    }
  },

  getFormattedResults(searchResults) {
    return searchResults.map(function(result) {
      return <li key={result.id.videoId} className="search__result">
        <a href={`http://youtube.com/watch?v=${result.id.videoId}`}
          title={result.snippet.title} className="search__link">
          <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title}
            className="search__photo" />
          <p className="search__title">{result.snippet.title}</p>
        </a>
      </li>
    });
  },


  showResults(searchResults) {
    this.setState({
      searchResults : searchResults
    })
  },

  render() {
    var searchResults = this.state.searchResults;
    var formattedResults;

    if(searchResults) {
      formattedResults = this.getFormattedResults(searchResults);
    }

    return(
      <div>
        <YoutubeSearchBar
          apiKey='AIzaSyDyVr4IvmdKTdeaO0rlZsOW32ghehcn6mo'
          maxResults='20'
          placeHolder='Search Youtube'
          callback={this.showResults} />

        <ul className="search-result-list">
          {formattedResults}
        </ul>
      </div>
    )
  }
})

export default App;
