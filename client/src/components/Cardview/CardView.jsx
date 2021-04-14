import React from 'react';

import classes from './CardView.css';

const CardView = (props) => (
    <article className={classes.CardView} onClick={() => props.openModal(props.resImg)}>
        <h1 >{props.resName}</h1>
        <div className="Info">
            <img  className ={classes.cardviewimg} src={props.resImg} alt="Default image"/>
            <div className={classes.Author} >{props.price}</div>
            <div className={classes.Author}>{props.rating}</div>
        </div>
    </article>
);

export default CardView;