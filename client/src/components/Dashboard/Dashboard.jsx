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
import Rating from '../rating/Rating';
import Visualization from '../Visualization/Visualization'
import { scroller } from "react-scroll";


// Imported <ReactModal /> component
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';



const Dashboard =(props)=>{

    const [username, setusername] = useState(undefined);
    const [location, setlocation] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined)
    const [latitude, setLatitude] = useState(undefined)
    const [locationBasedResults, setLocationBasedResults] = useState([]);
    const [recommendationBasedResults, setRecommendationBasedResults] = useState([]);
    const [userPreference, setUserPreference] = useState({
        price: "",
        category: "",
        radius: "20",
        location:undefined,
        term:""
       
    });

    const [noResult, setNoResult] = useState(false);
    const [norecResult, setNoRecResult] = useState(false);
    const [latlogproperties,setLatlogproperties]= useState([]);
    const [reclatlogproperties,setRecLatlogproperties]= useState([]);


    // Trying to populate data into the modal from CardView component
    const [modalData, setModalData] = useState([]);
    const handleSetModalData = (data) => {
        setModalData(data)
        

    };

    // We are setting initial state for the Modal component i.e false
    // this means, the modal will not be visible until set to "true"
    const [showModal, setShowModal] = useState(false);

   
    const [showVisualization, setShowVisualization] = useState(false);


    // Sets state to true, meaning modal will appear
    const handleOpenModal = (data) => {
        handleSetModalData(data);
        setShowModal(true);
        
        axios.post(
            'http://localhost:3001/recombeeAddDetailView',
            {
                username:username,
                itemid:data.id
                
            },
          ).then(response => {
              //console.log("api call returned recombeeAddDetailView: ", response.data);
              
          })
          .catch(console.log);


      }
      
    // Sets state to false, meaning modal will disappear
    const handleCloseModal = () => {
        setShowModal(false);
       
      }

    
      const scrollToSection = () => {
        scroller.scrollTo("scrollHere", {
          duration: 1000,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      };

    
 
    

    const locationBasedSearch =(location)=>{
        axios.post(
            'http://localhost:3001/search',
            {
                location:userPreference.location,
                price: parseInt(userPreference.price),
                categories:`${userPreference.category}`,
                radius: parseInt(userPreference.radius),
                term:userPreference.term
            },
          ).then(response => {
             // console.log("api call returned locationBasedSearch: ", response.data);
              filterLocationBasedSearch(response.data);
              
          })
          .catch(console.log);
        
    }



    const filterLocationBasedSearch = (locationResults) => {
        const businesses = locationResults.businesses;
        setLocationBasedResults(businesses);
        if(businesses.length === 0){
            setNoResult(true);
            //added extra
            setLatlogproperties([])
        }else{
            
            
            let latlogproperties = businesses.map((business,index) =>{
                        let properties = {
                            "longitude":  business.coordinates.longitude,
                            "latitude": business.coordinates.latitude,
                            "b_name": business.name
                            };
                return properties
            }) 
            
            setLatlogproperties(latlogproperties)
        }
       
    }


    const recommendationSearch = (username) => {
        //Axios call here to get Recommendation result from Recombee via nodejs request
        
        axios.post(
            'http://localhost:3001/recombeeRecommendation',
            {  
                 username:username,
                 term: userPreference.term,
                 mainterm : userPreference.category,
                 price : userPreference.price,
                 lat : latitude,
                 longitude:longitude,
                 miles: userPreference.radius
            }).then(response => {
            
             mapRecommendation(response.data); 
              
          })
          .catch(console.log);

    }


    const mapRecommendation= (resrecommendationResults) => {
      
        setRecommendationBasedResults(resrecommendationResults);
        if(resrecommendationResults.length === 0){
         
            setNoRecResult(true);
            //added extra
            setRecLatlogproperties([])
        }else{
            
            let reclatlogproperties1 = resrecommendationResults.map((recommendation,index) =>{
                        let recproperties = {
                            "longitude":  recommendation.values.longitude,
                            "latitude": recommendation.values.latitude,
                            "b_name": recommendation.values.name
                            };
                return recproperties
            }) 
           
            setRecLatlogproperties(reclatlogproperties1)
           
        }
        
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
        
        if(userPreference.location === undefined){
            setUserPreference({
                ...userPreference,
                location: location
            });
        }

        if(username !== undefined){
            recommendationSearch(username);
        }

        if(location !== undefined){
            locationBasedSearch(location);
        }

       
            

    }, [username, location,longitude,latitude, userPreference, noResult,norecResult]);

    

    //sort alphabetically
    locationBasedResults.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });


    //sort alphabetically
    
    recommendationBasedResults.sort(function(a, b) {
        var textA = a.values.name.toUpperCase();
        var textB = b.values.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    

    //incard view send more data like longitude,latitude, distance,categories
 
    const CardViews = locationBasedResults.map(CardViewRes=>{
        return (
                        <CardView  key = {CardViewRes.id}
                          resName = {CardViewRes.name}
                          resImg ={CardViewRes.image_url}
                          price = {CardViewRes.price}
                          rating={CardViewRes.rating}
                          review_count = {CardViewRes.review_count}
                          display_address = {CardViewRes.location.display_address}
                          phone = {CardViewRes.phone}
                          resId = {CardViewRes.id}
                          openModal={handleOpenModal}
                          
                            />
                )
    });


    const ReccardViews = recommendationBasedResults.map(CardViewRes=>{
        return (
                        <CardView  key = {CardViewRes.id}
                          resName = {CardViewRes.values.name}
                          resImg ={CardViewRes.values.image_url}
                          price = {CardViewRes.values.price}
                          rating={CardViewRes.values.rating}
                          review_count = {CardViewRes.values.review_count}
                          display_address = {CardViewRes.values.address}
                          phone = {CardViewRes.values.phone}
                          resId = {CardViewRes.id}
                          openModal={handleOpenModal}
                          
                            />
                )
    });


    // Set some custom styling for ReactModal component
    const customStyles = {

        
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          backgroundColor       : 'white'
     

        }
      };

   
    return(<div>
                <ReactModal 
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
                style={{
                    overlay: {
                      zIndex:'10'
                    },
                    content: {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)',
                        backgroundColor       : 'white'
                   
                    }
                  }}
                > 
                    <Rating modalData={modalData}
                            userPreferenceCategory = {`${userPreference.category}`}
                            username = {username}
                            handleCloseModal={handleCloseModal}/>
                
                </ReactModal>
                
                <SideNav 
                    userPreference={userPreference} 
                    setUserPreference={setUserPreference}
                    setShowVisualization={setShowVisualization} 
                    showVisualization={showVisualization}
                    scrollToSection = {scrollToSection}/>
                <Header deleteToken={props.deleteToken} username={username}/>
                
                {showVisualization? <div className={classes.Graphs}><Visualization username={username} setShowVisualization={setShowVisualization} 
                    showVisualization={showVisualization}/></div> : 
                <div>
                    <div>
                        <section className={classes.Posts}>
                        
                         
                            {
                                CardViews.length > 0? <GoogleMap longlat={latlogproperties}
                                                                reclonglat={reclatlogproperties}
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
                    </div>
               
                   <div className={classes.fixedheader1}>
                       <div className="scrollHere">
                       <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            <strong style={{color:'white'}}>Recommendations</strong> 
                        </div>
                       </div>


                    <div >
                        
                        
                        <section className={classes.Posts} style={{marginTop:'120px'}}>
                            
                        {      
                                ReccardViews.length > 0? ReccardViews :
                                (norecResult? 
                                        <NoResultFound /> : <MoonLoader color='blue' loading={true} size={60} />
                                )
                            
                            }

                        </section>
                    </div>
                </div>}
            </div>
    )
}
export default Dashboard;