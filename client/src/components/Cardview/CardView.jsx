import React, { Component, useEffect, useState }  from 'react';
import axios from 'axios';
import classes from './CardView.css';

const CardView = (props) => {

    const [usersReviews, setUsersReviews] = useState([]);

    useEffect(()=> {

        axios.post(
            'http://localhost:3001/otherUsersReviews',
            {
                resId:props.resId,
               
            },
          ).then(response => {
              console.log("api call returned CardView for OtherUsersReviews: ", response.data);
              setUsersReviews(response.data)
              
          })
          .catch(console.log);


    },[props.resId])

    console.log("CardView usersReviews set variable..",usersReviews)


     return (<article className={classes.CardView} onClick={() => props.openModal({resImg : props.resImg,
      resName: props.resName, price: props.price, rating : props.rating,review_count: props.review_count,
      display_address: props.display_address, phone: props.phone , id : props.resId, dummyId:"dumy678",usersReviews:usersReviews})}>
        <h1 >{props.resName}</h1>
        <div className="Info">
            <img  className ={classes.cardviewimg} src={props.resImg} alt="Default image"/>
            <div className={classes.Author} >{props.price}</div>
            <div className={classes.Author}>{props.rating}</div>
        </div>
    </article>);
}

export default CardView;