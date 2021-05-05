import React, { Component, useEffect, useState }  from 'react';
import axios from 'axios';
import Header from '../Header/Header'
import classes from './Profile.css'






const Profile =(props)=>{
    const [username, setusername] = useState("");
    const[userLocation, setUserLocation] = useState("");
    const[password,setPassword] = useState("");
    const[error, setError]= useState(false);
    const[success, setSuccess]= useState(false);

    useEffect(()=> {
        if(username === ""){
            setusername(sessionStorage.getItem('username'));
        }
        if(username !== ""){
            getUsersProfile(username)
        }
    })
    

    const getUsersProfile =(username) =>{
      axios.post(
            'http://localhost:3001/userprofile',
            {  
                 username:username
            }).then(response => {
              console.log("api call returned userprofile: ", response.data);
              setUserLocation(response.data.location);
          })
          .catch(console.log);

    }


    const changePassword =(passwordCredential)=>{

        return fetch('http://localhost:3001/setUserPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(passwordCredential)
         
        })
        .then(data => {
              console.log(data.status)
             
              if(data.status === 200){
                setSuccess(true);
                setError(false);
                return
              }
              if(data.status === 401 || data.status === 404){
                setError(true);
              }
              data.json()
              
        })
        .catch(function(error) {
            // console.error('There was an error!', error.status);
        });

    }


    const handleSubmitPassword = async e => {
        e.preventDefault();
        const token = await changePassword({
          username:username,
          password: password
        });
       
    }

    const validateForm =()=> {
      
        return username.length > 0 && password.length > 0 && userLocation.length > 0
      }



    return(<div className={classes.signupwrapper}>
           {/* sideNav Start........... */}
           <div className={classes.sidenav}>
                <div><button onClick={(e) => {
                e.preventDefault();
                window.location.href='/dashboard';
                }} className={classes.btnvisulization}>Back to Dashboard</button> <br/><br/><br></br>
                </div>
            </div>
            {/* sideNav end........... */}

            <Header deleteToken={props.deleteToken} username={username}/>

            <form onSubmit={handleSubmitPassword}>
                      <div className={classes.box}>
                        <h1 className={classes.h1}>User Profile</h1>

                        <input type="text"  placeholder="Username"  className={classes.email} 
                                            value={username} disabled/>
                        
                        <input id="locationInput" type="text"  className={classes.email} value={userLocation} disabled  />

                        <input type="password"  placeholder="Password"  className={classes.email} 
                                                onChange={e => {setPassword(e.target.value)
                                                    setSuccess(false)}}/>

                        {error ?<div className={classes.invalidcredential}>Something went wrong!</div>:null}
                        {success ?<div className={classes.invalidcredential}>Password Modified Successfuly</div>:null}
                        <button type="submit" className={classes.btn} disabled={!validateForm()}>Modify</button>
                      </div> 
            </form>
    </div>)
}

export default Profile;