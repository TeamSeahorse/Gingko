import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

const BUTTONS = 'Options';


function Dropdown(props) {
    return (
        <DropdownButton 
        bsStyle={props.buttonTitle.toLowerCase()}
        title = {props.buttonTitle}
        key = {props.i}
        >
        <MenuItem eventKey="1" id="pokemon" multi={true} onClick={ () => props.onClick('Pokemon') } >Pokemon</MenuItem>
        <MenuItem eventKey="2" id="movies" multi={true} onClick={ () => props.onClick('Movies') } >Movies</MenuItem>
        <MenuItem eventKey="3" id="weather" multi={true} onClick={ () => props.onClick('Weather') } >Weather</MenuItem>

        </DropdownButton>
    );
}


export default Dropdown; 