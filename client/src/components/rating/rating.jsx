import React, { useState }  from 'react';
import classes from './Rating.css';
import PropTypes from 'prop-types';
import axios from 'axios';


const Rating =(props)=>{

    const [rating, setRating] = useState("5");

    const saveRating = () => {
         axios.post(
            'http://localhost:3001/ratings',
            {
                userid: props.username, 
                itemid:props.modalData.id, 
                itemname: props.modalData.resName, 
                rating:rating, 
                category:props.userPreferenceCategory,
                pricelevel:props.modalData.price
                
            },
          ).then(response => {
              console.log("api call returned in modal: ", response.data);
              props.handleCloseModal();
           
              
          })
          .catch(console.log);
        props.handleCloseModal();
    };
    console.log(props.modalData)
    console.log(props.modalData.display_address.toString())
    console.log(props.userPreferenceCategory)
    console.log(props.username)
    console.log(rating)
    console.log("rating modal...",props.modalData.usersReviews)

    const UsersRatingsViews = props.modalData.usersReviews.map(URViewRes=>{
        return (

                
                <div key ={URViewRes.id} className={classes.ratingModalDetail} style={{backgroundColor:"#C7CDE5"}}>
                    <p>{URViewRes.rating} Star : {URViewRes.text}</p>
                    {/* <p></p> */}
                </div>
                      
                )
    });

    return <div className={classes.boxRatingModal} style={{backgroundColor:'white'}} >
        <div className={classes.ratingModalDetail}>
            <p >{props.modalData.resName}</p>
            <p >Price Level : {props.modalData.price} 
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;Review Counts : {props.modalData.review_count}
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Avg. Rating :{props.modalData.rating} </p>
            <p >{props.modalData.phone}</p>
            <p >{props.modalData.display_address.toString()}</p>
        </div>
        {UsersRatingsViews}
        <div className={classes.ratingModalDetail}>
        Provide Rating : &nbsp;
        <select name="stars" id="stars" onChange={e => setRating(e.target.value)}>
            <option value="1" >1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5" selected>5 Star</option>
        </select>
        <br></br>
        <br></br>
        <button onClick={saveRating} className={classes.btnRating}>Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={props.handleCloseModal} className={classes.btnClose}>Close</button>
        </div>
    </div>
}

export default Rating;