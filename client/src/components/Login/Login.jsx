import React, { useState }  from 'react';
import classes from './Login.css';
import PropTypes from 'prop-types';
import SideNavPub from '../SideNav/SideNavPub'
import HeaderPub from '../Header/HeaderPub'




const Login =(props)=> {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    async function loginUser(credentials) {
        console.log(credentials);
        return fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
          
        })
          .then(data => data.json())
          .catch(function(error) {
            setError(true);
        });
       }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        if(token){
            props.saveToken(token);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('location', token.location);
            sessionStorage.setItem('longitude', token.longitude);
            sessionStorage.setItem('latitude', token.latitude);
        }
       
    }
    
    const validateForm =()=> {
      
      return username.length > 0 && password.length > 0
    }

    return(
      
        <div className={classes.loginwrapper}>
             <HeaderPub/>
            <SideNavPub/>
            <form onSubmit={handleSubmit}>
                    <div className={classes.box}>
                    <h1 className={classes.h1}>Please Login</h1>

                    <input type="text"  placeholder="Username"  className={classes.email} 
                                        onChange={e => setUserName(e.target.value)}/>
                    
                    
                    <input type="password"  placeholder="Password"  className={classes.email}
                                            onChange={e => setPassword(e.target.value)}/>
                    
                    

                    {error ?<div className={classes.invalidcredential}>Invalid credentials</div>:null}
                    <button type="submit" className={classes.btn} disabled={!validateForm()}>LogIn</button>

                    <button type="button" className={classes.btn2} onClick={event => {setError(false); window.location.href='/Signup'}}>SignUp</button> 
                    
                    </div> 
                
                </form>
        </div>
            
    )
}



export default Login;