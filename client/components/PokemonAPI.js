/* eslint-disable */
import React from 'react';

const PokemonAPI = (props) => {
  console.log('PokemonAPI props are', props);
  return (
  	<div className='apiDiv'>
  	  <h3>Pokemon</h3>
  	  <p>{'Name: '+ props.info.name}</p>
  	  <p>{'ID: '+ props.info.id}</p>
  	  <p>{'Weight: '+ props.info.weight}</p>
  	</div>
  );  
};

export default PokemonAPI;