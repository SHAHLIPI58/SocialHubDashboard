import React, { useState }  from 'react';
import classes from './Rating.css';
import PropTypes from 'prop-types';
import axios from 'axios';


const Rating =(props)=>{

    const [rating, setRating] = useState("5");

    const saveRating = () => {
        /**
         * 1. Make an axios call and save the data i.e props.modalData i.e {url: .., name: ..}
         * 
         * 2. After the api call returns, then close modal.
         */

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

        // We will do (2) for now
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

                <div key ={URViewRes.id}>
                
                    <p>{URViewRes.rating}</p>
                    <p>{URViewRes.text}</p>
                </div>
                      
                )
    });
    // const address = props.modalData.display_address.forEach((entry)=>{
    //    console.log(entry)
    //    return <p>entry</p>
    // })

    return <div style={{backgroundColor:'orange'}}>
        <p>{props.modalData.resName}</p>
        {/* <p>{props.modalData.resImg}</p> */}
        <p>{props.modalData.price}</p>
        <p>{props.modalData.rating}</p>
        <p>{props.modalData.review_count}</p>
        <p>{props.modalData.phone}</p>
        <p>{props.modalData.display_address.toString()}</p>
        {/* <p>{props.modalData.dummyId}</p> */}
        {UsersRatingsViews}
        {/* <p>{address}</p> */}
        {/* <input type = "text" placeholder="provide rating here" ></input> */}
        <select name="stars" id="stars" onChange={e => setRating(e.target.value)}>
            <option value="1" >1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5" selected>5 Star</option>
        </select>
        <br></br>
        
        <button onClick={saveRating}>Submit</button>
        <button onClick={props.handleCloseModal}>Close Modal</button>
    </div>
}

export default Rating;