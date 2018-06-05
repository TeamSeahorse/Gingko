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
import ApiZeroDisplay from './api0Display';
import ApiOneDisplay from './API1';
import ApiTwoDisplay from './API-Display';
import Dropdown from './Dropdown';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    console.log('Feed props are', props);
  }

  render() {
    let username = this.props.location.state.referrer.username;
    let interests = this.props.location.state.referrer.interests;
    console.log('this.props.location: ', this.props.location);
    // let interests = [0];
    let apiData = this.props.location.state.referrer.apiData;
    let displayArr = []; 
    for (let i = 0; i < interests.length; i++) { 
      console.log('displaying api comp for',interests[i], apiData[i])
      if (interests[i] === 0) displayArr.push(<ApiZeroDisplay info={apiData[i]}/>);
      else if (interests[i] === 1) displayArr.push(<ApiOneDisplay info={apiData[i]}/>);
      else if (interests[i] === 2) displayArr.push(<ApiTwoDisplay info={apiData[i]}/>);
    }

    displayArr.push(<Dropdown title={'Option'} i={'drop'}/>);

    console.log(displayArr.length);
    return (
      <div>
        <h1>{'Feed Page for ' + username}</h1>
        {displayArr}
      </div>
    )
  }
}

export default Feed;