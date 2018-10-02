import React, { Component } from 'react';
import { AutoComplete }     from 'material-ui';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import JSONP                from 'jsonp';
import injectTapEventPlugin from 'react-tap-event-plugin';
import YoutubeFinder        from 'youtube-finder';
import                           './css/YoutubeSearchBar.css'



// Get the input value with click
injectTapEventPlugin();


// Google's autocomplete search API <3
const googleAutoSuggestURL = `
  //suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;


// Search bar
class YoutubeSearchBar extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput  = this.onUpdateInput.bind(this);
    this.onNewRequest   = this.onNewRequest.bind(this);
    this.YoutubeClient  = YoutubeFinder.createClient({ key: this.props.apiKey });
    this.state = {
      dataSource : [],
      inputValue : ''
    }
  }


  // When update Input
  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      self.performSearch();
    });
  }


  // Bringing autocomplete google list
  performSearch() {
    const
      self = this,
      url  = googleAutoSuggestURL + this.state.inputValue;

    if(this.state.inputValue !== '') {
      JSONP(url, function(error, data) {
        let searchResults, retrievedSearchTerms;

        if (error) {
          return error;
        }

        searchResults = data[1];

        retrievedSearchTerms = searchResults.map(function(result) {
          return result[0];
        });

        self.setState({
          dataSource: retrievedSearchTerms
        });
      });
    }
  }


  // When select item
  onNewRequest(searchTerm) {
    const
      self   = this,
      params = {
        part        : 'id,snippet',
        type        : 'video',
        q           : this.state.inputValue,
        maxResults  : '10'
      }

    this.YoutubeClient.search(params, function(error,results) {
      if(error) return console.log(error);

      self.props.callback(results.items,searchTerm);

      self.setState({
        dataSource : [],
        inputValue : ''
      });
    });
  }


  render() {
    return(
      <section className="top__container">
        <div className="title__container">
          <h1 className="title__primary">
            Youtube search videos - ReactJS
          </h1>
        </div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <AutoComplete
            hintText="Type what you want to watch"
            dataSource={this.state.dataSource}
            onUpdateInput={this.onUpdateInput}
            onNewRequest={this.onNewRequest} />
        </MuiThemeProvider>
      </section>
    );
  }
}


export default YoutubeSearchBar;


