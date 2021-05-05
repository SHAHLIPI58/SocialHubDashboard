import React, { useEffect, useState }  from 'react';
import classes from './Signup.css';
import axios from 'axios';
import SideNavPub from '../SideNav/SideNavPub'
import HeaderPub from '../Header/HeaderPub'



const Signup =(props)=> {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const[longitude,setLongitude] = useState("");
    const[latitude,setLatitude] = useState("");
    const [error, setError] = useState(false);
    const[message,setMessage] = useState("");

    
    function getCurrentLocation() {
        return fetch('https://geolocation-db.com/jsonp/', {
          method: 'GET'
        })
        .then(data => {
              console.log("user's current location is: ", data);
              
        })
        .catch(function(error) {
            console.log("Error occured while fetching the current location: ", error);
        });
      }
  
  
    async function signupUser(credentials) {
        console.log(credentials);
        return fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(credentials)
         
        })
        .then(data => {
              if(data.status === 200){
                setError(true);
                return
              }
              if(data.status === 201){
                setMessage("Profile Created Successfully. Please Login!")
                window.location.replace("http://localhost:3000/login");
              }
              data.json()
              
        })
        .catch(function(error) {
            // console.error('There was an error!', error.status);
        });
       }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await signupUser({
          username,
          password,
          location,
          longitude,
          latitude
        });
        
    }
    
    const validateForm =()=> {
      
      return username.length > 0 && password.length > 0 && location.length > 0
    }

    useEffect(() => {
        
        axios.get(`https://geolocation-db.com/json/`)
      .then(res => {

        setLocation(`${res.data.city},${res.data.postal}`)
        setLongitude(res.data.longitude)
        setLatitude(res.data.latitude)
        document.getElementById('locationInput').value = `${res.data.city},${res.data.postal}`;
      })
    }, []);

    return(
        <div className={classes.signupwrapper}>

            <HeaderPub/>
            <SideNavPub/>
            <form onSubmit={handleSubmit}>
                    <div className={classes.box}>
                    <h1 className={classes.h1}>Please SignUp</h1>

                    <input type="text"  placeholder="Username"  className={classes.email} 
                                        onChange={e => setUserName(e.target.value)}/>
                    
                    {/* <input type="text"  placeholder="Email-Id"  className={classes.email} 
                                        /> */}
                    
                    <input type="password"  placeholder="Password"  className={classes.email} 
                                            onChange={e => setPassword(e.target.value)}/>

                    <input type="password"  placeholder="ReEnter Password"  className={classes.email}
                                           />

                    <input id="locationInput" type="text"  className={classes.email} readOnly />

                    {error ?<div className={classes.invalidcredential}>User Already Exist!</div>:null}
                    <button type="submit" className={classes.btn} disabled={!validateForm()}>SignUp</button>

                    <button type="button" className={classes.btn2} 
                                           onClick={event => {setError(false); window.location.href='/Login'}}>LogIn</button> 
                    
                    </div> 
                
              </form>


        </div>
            
    )
}

export default Signup;