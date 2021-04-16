import React, { Component, useEffect, useState }  from 'react';

import classes from './CardView.css';

const CardView = (props) => {


     return (<article className={classes.CardView} onClick={() => props.openModal({resImg : props.resImg,
      resName: props.resName, price: props.price, rating : props.rating,review_count: props.review_count,
      display_address: props.display_address, phone: props.phone , id : props.resId})}>
        <h1 >{props.resName}</h1>
        <div className="Info">
            <img  className ={classes.cardviewimg} src={props.resImg} alt="Default image"/>
            <div className={classes.Author} >{props.price}</div>
            <div className={classes.Author}>{props.rating}</div>
        </div>
    </article>);
}

export default CardView;