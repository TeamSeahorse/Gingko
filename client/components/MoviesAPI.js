import React from 'react';

const MoviesAPI = (props) => {
  // console.log('AP1 props are', props);
  return (
  <div className="apiDiv">
  	<h1>Films</h1>
    <p>{'Title: ' + props.info.title}</p>
    <p>{'Episode ID: ' + props.info.episode_id}</p>
    <p>{'Release Date: ' + props.info.release_date}</p>
    <p>{'Opening Crawl: ' + props.info.opening_crawl}</p>
  </div>
  );   
};

export default MoviesAPI;