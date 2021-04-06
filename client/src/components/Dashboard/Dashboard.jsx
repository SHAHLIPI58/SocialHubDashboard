import React, { Component, useEffect, useState }  from 'react';
import axios from 'axios';
import CardView from '../Cardview/CardView'
import classes from'./Dashboard.css'
import Header from '../Header/Header'
import SideNav from '../SideNav/SideNav'
import MoonLoader from "react-spinners/MoonLoader";



const Dashboard =(props)=>{

    const [username, setusername] = useState(undefined);
    const [location, setlocation] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined)
    const [latitude, setLatitude] = useState(undefined)
    const [locationBasedResults, setLocationBasedResults] = useState([]);
    const [userPreference, setUserPreference] = useState({
        price: "1",
        category: "bars",
        radius: "40000"
    });

    const [noResult, setNoResult] = useState(false);
    // async function locationBasedSearch(location) {
    //     console.log("calling search api with location: ", location);
    //     return fetch('http://localhost:3001/search', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({location: location})
    //       //body:JSON.stringify({username:'lipishah'})
    //     })
    //       .then(data => {
    //           console.log(data.json());
    //         })
    //       .catch(function(error) {
    //         console.log(error);
    //     });
    //    }

    const locationBasedSearch =(location)=>{
        axios.post(
            'http://localhost:3001/search',
            {
                location: location,
                price: parseInt(userPreference.price),
                categories:`${userPreference.category}`,
                radius: parseInt(userPreference.radius)
            },
          ).then(response => {
              console.log("api call returned: ", response.data);
              filterLocationBasedSearch(response.data);
          })
          .catch(console.log);
        
    }

    const filterLocationBasedSearch = (locationResults) => {
        const businesses = locationResults.businesses;
        setLocationBasedResults(businesses);
        if(businesses.length === 0){
            setNoResult(true);
        }
        // console.log("businesses: ", businesses);
        // businesses.map(business =>{
        //     console.log(business.name);
        //     console.log(business.location.address1);
        // });
    }
    

    useEffect(()=> {
        if(username === undefined){
            setusername(sessionStorage.getItem('username'));
        }
        if(location === undefined){
            setlocation(sessionStorage.getItem('location'));
        
        }
        if(longitude === undefined){
            setLongitude(sessionStorage.getItem('longitude'));
            
        }
        if(latitude === undefined){
            setLatitude(sessionStorage.getItem('latitude'));

        }
        

        if(location !== undefined){
            locationBasedSearch(location);
        }
            

    }, [username, location,longitude,latitude, userPreference, noResult]);



    // useEffect(() => {
    //     console.log("Updated pref: ", userPreference);
    // }, [userPreference]);


    // console.log("length of locationBasedResults = ",locationBasedResults.length)
    console.log("locationBasedResults =",locationBasedResults.length)
    
    const CardViews = locationBasedResults.map(CardViewRes=>{
        return <CardView  key = {CardViewRes.id}
                          resName = {CardViewRes.name}
                          resImg ={CardViewRes.image_url}
                          price = {CardViewRes.price}
                          rating={CardViewRes.rating}/>
    });

    console.log("cardviews: ", CardViews);
    
    return(
    
    <div>
        <SideNav userPreference={userPreference} setUserPreference={setUserPreference}/>
        <Header deleteToken={props.deleteToken} username={username}/>
        <section className={classes.Posts}>
            {
                CardViews.length > 0? CardViews:
                (noResult? 
                        <div>No result</div> : <MoonLoader color='blue' loading={true} size={60} />
                )
            
            
            }
        </section>
        

    </div>)
}
export default Dashboard;