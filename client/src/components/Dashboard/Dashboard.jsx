import React, { Component, useEffect, useState }  from 'react';
import axios from 'axios';
import CardView from '../Cardview/CardView'
import classes from'./Dashboard.css'
import Header from '../Header/Header'
import SideNav from '../SideNav/SideNav'
import MoonLoader from "react-spinners/MoonLoader";
import NoResultFound from '../NoResultFound/NoResultFound';
import GoogleMap from '../GoogleMap/GoogleMap';
import { BrowserRouter, Route, Switch, Redirect,Link } from 'react-router-dom';
import Rating from '../Rating/Rating';

// Imported <ReactModal /> component
import ReactModal from 'react-modal';

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
    // const longlat = [{latitude:33.168936, longitude:-96.663925 },
    //                  {latitude:33.04213,longitude:-96.75218}]
    const [latlogproperties,setLatlogproperties]= useState([]);


    // Trying to populate data into the modal from CardView component
    const [modalData, setModalData] = useState(null);
    const handleSetModalData = (data) => {
        setModalData(data)
    };

    // We are setting initial state for the Modal component i.e false
    // this means, the modal will not be visible until set to "true"
    const [showModal, setShowModal] = useState(false);


    // Sets state to true, meaning modal will appear
    const handleOpenModal = (data) => {
        handleSetModalData(data);
        setShowModal(true);
      }
      
    // Sets state to false, meaning modal will disappear
    const handleCloseModal = () => {
        setShowModal(false);
      }

    
    
    




    
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

    // let carsProperties = cars.map(car => {
    //     let properties = {
    //       "capacity": car.capacity,
    //       "size": "large"
    //     };
    //     if (car.capacity <= 5){
    //       properties['size'] = "medium";
    //     }
    //     if (car.capacity <= 3){
    //       properties['size'] = "small";
    //     }
    //     return properties;
    //    });
    //    console.log(carsProperties);

    const filterLocationBasedSearch = (locationResults) => {
        const businesses = locationResults.businesses;
        setLocationBasedResults(businesses);
        if(businesses.length === 0){
            setNoResult(true);
        }else{
            console.log("businesses: ", businesses);
            
            let latlogproperties = businesses.map((business,index) =>{
                        let properties = {
                            "longitude":  business.coordinates.longitude,
                            "latitude": business.coordinates.latitude,
                            "b_name": business.name
                            };
                return properties
            }) 
            console.log(latlogproperties)
            setLatlogproperties(latlogproperties)
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

    // }, [showRatings]);


    // useEffect(() => {
    //     console.log("Updated pref: ", userPreference);
    // }, [userPreference]);


    // console.log("length of locationBasedResults = ",locationBasedResults.length)
    console.log("locationBasedResults =",locationBasedResults)
    
    const CardViews = locationBasedResults.map(CardViewRes=>{
        return (
                        <CardView  key = {CardViewRes.id}
                          resName = {CardViewRes.name}
                          resImg ={CardViewRes.image_url}
                          price = {CardViewRes.price}
                          rating={CardViewRes.rating}
                          openModal={handleOpenModal}
                          
                            />
                )
    });

    console.log("cardviews: ", CardViews);


    // Set some custom styling for ReactModal component
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    
    return(
    <div>
        <ReactModal 
           isOpen={showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
        > 
            <Rating modalData={modalData} handleCloseModal={handleCloseModal}/>
        
        </ReactModal>
        
        <SideNav userPreference={userPreference} setUserPreference={setUserPreference}/>
        <Header deleteToken={props.deleteToken} username={username}/>
        <section className={classes.Posts}>
            {
                CardViews.length > 0? <GoogleMap longlat={latlogproperties}
                                                userlongitude = {longitude}
                                                userlatitude = {latitude} />: null
            
            }
            {
                CardViews.length > 0? CardViews :
                (noResult? 
                        <NoResultFound /> : <MoonLoader color='blue' loading={true} size={60} />
                )
            
            }

        </section>





        <section className={classes.Posts}>
        {
                CardViews.length > 0? CardViews :
                (noResult? 
                        <NoResultFound /> : <MoonLoader color='blue' loading={true} size={60} />
                )
            
            }

        </section>
    </div>)
}
export default Dashboard;