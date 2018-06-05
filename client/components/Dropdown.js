import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

const BUTTONS = 'Options';



function renderDropDownButton(props) {
    return (
        <DropdownButton 
        bsStyle={props.title.toLowerCase()}
        title = {props.title}
        key = {props.i}
        >
        <MenuItem eventKey="1" multi={true}>Dogs</MenuItem>
        <MenuItem eventKey="2" multi={true}>Firemen</MenuItem>
        <MenuItem eventKey="3" multi={true}>Restaurants</MenuItem>

        </DropdownButton>
    );
}


export default renderDropDownButton; 