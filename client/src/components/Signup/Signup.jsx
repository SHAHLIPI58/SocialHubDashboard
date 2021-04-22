import React, { useEffect, useState }  from 'react';
import classes from './Signup.css';
import PropTypes from 'prop-types';
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
  
    // https://geolocation-db.com/jsonp/

    // useEffect(()=> {
    //     if(location === undefined){
    //         setusername(sessionStorage.getItem('username'));
    // }
    // }, [username]);
    

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
              console.log(data.status)
             
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
            // //console.log(error.response.status);
            // setError(true);
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
        // if(token){
        //     props.saveToken(token);
        // }
        // window.location.replace("http://localhost:3000/dashboard");
    }
    
    const validateForm =()=> {
      
      return username.length > 0 && password.length > 0 && location.length > 0
    }

    useEffect(() => {
        // getCurrentLocation();
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
        {/* <h1>Please SignUp</h1>
        <form onSubmit={handleSubmit}> 
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/> */}
                {/* <div className ={classes.divCheckbox} >Empty username</div> */}
            {/* </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>

            <label>
                <p>Location</p>
                <input id="locationInput" type="text" />
            </label>
            <div>
                <button type="submit" disabled={!validateForm()}>Signup</button>
                <button type="button" onClick={event =>  window.location.href='/Login'}>Login</button>
            </div>
            {error ? <div>User Already Exist!</div> : null}
            {message !==""? <div>Profile Created Successfully. Please Login!</div>:null}
            </form> */}

            <form onSubmit={handleSubmit}>
                    <div className={classes.box}>
                    <h1 className={classes.h1}>Please SignUp</h1>

                    <input type="text"  placeholder="Username"  className={classes.email} 
                                        onChange={e => setUserName(e.target.value)}/>
                    
                    <input type="text"  placeholder="Email-Id"  className={classes.email} 
                                        />
                    
                    <input type="password"  placeholder="Password"  className={classes.email} 
                                            onChange={e => setPassword(e.target.value)}/>

                    <input type="password"  placeholder="ReEnter Password"  className={classes.email}
                                           />

                    <input id="locationInput" type="text"  className={classes.email} />

                    {error ?<div className={classes.invalidcredential}>User Already Exist!</div>:null}
                    <button type="submit" className={classes.btn} disabled={!validateForm()}>SignUp</button>

                    <button type="submit" className={classes.btn2} 
                                           onClick={event => {setError(false); window.location.href='/Login'}}>LogIn</button> 
                    
                    </div> 
                
              </form>


        </div>
            
    )
}

// Signup.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }

export default Signup;