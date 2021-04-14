import React, { useState }  from 'react';
import classes from './Rating.css';
import PropTypes from 'prop-types';


const Rating =(props)=>{

    const saveRating = () => {
        /**
         * 1. Make an axios call and save the data i.e props.modalData i.e {url: .., name: ..}
         * 2. After the api call returns, then close modal.
         */

        // We will do (2) for now
        props.handleCloseModal();
    };

    return <div>
        <p>{props.modalData}</p>
        <button onClick={saveRating}>Submit</button>
        <button onClick={props.handleCloseModal}>Close Modal</button>
    </div>
}

export default Rating;