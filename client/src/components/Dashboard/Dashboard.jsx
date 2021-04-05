import React, { Component, useEffect, useState }  from 'react';
import axios from 'axios';


const Dashboard =(props)=>{

    const [username, setusername] = useState(undefined);
    const [location, setlocation] = useState(undefined);
    const [locationBasedResults, setLocationBasedResults] = useState([]);

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
            {location: location},
          ).then(response => {
              console.log("api call returned: ", response.data);
              filterLocationBasedSearch(response.data);
          })
          .catch(console.log);
        
    }

    const filterLocationBasedSearch = (locationResults) => {
        const businesses = locationResults.businesses;
        setLocationBasedResults(businesses);
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
            //
        }

        if(location !== undefined){
            locationBasedSearch(location);
        }
            

    }, [username, location]);
    
    return(
    <div>
        <h1>Dashboard page </h1>
        <h2> Welcome {username},{location}</h2>
        <button type="submit" onClick={props.deleteToken} > Logout </button>

    </div>)
}
export default Dashboard;