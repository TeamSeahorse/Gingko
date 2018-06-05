/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
// import Display from './Display';
import MoviesAPI from './MoviesAPI';
import WeatherAPI from './WeatherAPI';
import Dropdown from './Dropdown';
import PokemonAPI from './PokemonAPI';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      buttonTitle: 'Add',
      interests: [],
      //this.props.location.state.referrer.interests
      apiData: this.props.location.state.referrer.apiData
    };
    this.updateSubscriptions = this.updateSubscriptions.bind(this);
    // add initial state for feed component
    // bind function
  }

  updateSubscriptions(addedInterest) {
    // if they select what they already have 
    // select which number to add to the displayArr

    // do a fetch request containing the array we want it to be updated to in the db
    // get back the API data 
    // set state with the updated interest array
    let apiRequest = this.state.interests;
    console.log('this.state.interests array: ', apiRequest);
    if(!this.state.interests.includes('0') && addedInterest === 'Pokemon') {
      apiRequest.push("0");
    } else if (!this.state.interests.includes('1') && addedInterest === 'Movies') {
      apiRequest.push("1");
    } else if (!this.state.interests.includes('2') && addedInterest === 'Weather') {
      apiRequest.push("2");
    }

    this.setState({interests: apiRequest});
  }

  render() {
    let username = this.props.location.state.referrer.username;
    // let interests = this.props.location.state.referrer.interests;
    // let interests = [0];
    // let apiData = this.props.location.state.referrer.apiData;
    let displayArr = []; 
    for (let i = 0; i < this.state.interests.length; i++) { 
      //console.log('displaying api comp for',this.state.interests[i], this.state.apiData[i])
      if (this.state.interests[i] === '0') displayArr.push(<PokemonAPI info={this.state.apiData[0]}/>);
      else if (this.state.interests[i] === '1') displayArr.push(<MoviesAPI info={this.state.apiData[1]}/>);
      else if (this.state.interests[i] === '2') displayArr.push(<WeatherAPI info={this.state.apiData[2]}/>);
    }

    displayArr.push(<Dropdown onClick={this.updateSubscriptions} buttonTitle={this.state.buttonTitle} i={'drop'}/>);

    return (
      <div>
        <h1>{'Feed Page for ' + username}</h1>
        {displayArr}
      </div>
    )
  }
}

export default Feed;