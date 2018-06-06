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

import Login from './Login.js';
import Feed from './Feed.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // add method to update the subscriptions a user has. on click
   // call the API subscription and update list 
   // react bootstrap on click listener function

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/feed" component={Feed} />
        </div>
      </Router>
    )
  }
}

//replace component with render and contain props to pass down
// pass method into feed
ReactDOM.render(<App />, document.getElementById('contents'));
