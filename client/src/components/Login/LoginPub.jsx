import React, { useState }  from 'react';
import classes from './LoginPub.css';
import PropTypes from 'prop-types';
import SideNavPub from '../SideNav/SideNavPub'
import HeaderPub from '../Header/HeaderPub'




const LoginPub =(props)=> {
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
          //body:JSON.stringify({username:'lipishah'})
        })
          .then(data => data.json())
          .catch(function(error) {
            //console.log(error);
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
        // window.location.replace("http://localhost:3000/dashboard");
    }
    
    const validateForm =()=> {
      
      return username.length > 0 && password.length > 0
    }

    return(
        <div>
             <HeaderPub/>
            <SideNavPub/>
           
            <div className={classes.loginpubwrapper}>
            {/* <h1>Please Log In</h1>
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
                <div>
                    <button type="submit" disabled={!validateForm()}>Submit</button>
                    <button type="button" onClick={event =>  window.location.href='/Signup'}>signup</button>
                </div>
                {error ? <div>Invalid credentials</div> : null}
                </form> */}

                <form onSubmit={handleSubmit}>
                    <div className={classes.box}>
                    <h1 className={classes.h1}>Please Login</h1>

                    <input type="text"  placeholder="Username"  className={classes.email} 
                                        onChange={e => setUserName(e.target.value)}/>
                    
                    <input type="password"  placeholder="Password"  className={classes.email}
                                            onChange={e => setPassword(e.target.value)}/>
                    {error ?<div className={classes.invalidcredential}>Invalid credentials</div>:null}
                    <button type="submit" className={classes.btn} disabled={!validateForm()}>LogIn</button>

                    <button type="button" className={classes.btn2} onClick={event => {   window.location.href='/Signup'}}>SignUp</button> 
                    
                    </div> 
                
                </form>
            </div>
        </div>
            
    )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }

export default LoginPub;