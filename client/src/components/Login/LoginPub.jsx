import React, { useState }  from 'react';
import classes from './LoginPub.css';
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
        
    }
    
    const validateForm =()=> {
      
      return username.length > 0 && password.length > 0
    }

    return(
        <div>
             <HeaderPub/>
            <SideNavPub/>
           
            <div className={classes.loginpubwrapper}>
           

                <form onSubmit={handleSubmit}>
                    <div className={classes.box}>
                    <h1 className={classes.h1}>Please Login</h1>

                    <input type="text"  placeholder="Username"  className={classes.email} 
                                        onChange={e => setUserName(e.target.value)}/>
                    
                    <input type="password"  placeholder="Password"  className={classes.email}
                                            onChange={e => setPassword(e.target.value)}/>
                    {error ?<div className={classes.invalidcredential}>Invalid credentials ........</div>:null}
                    <button type="submit" className={classes.btn} disabled={!validateForm()}>LogIn</button>

                    <button type="button" className={classes.btn2} onClick={event => {   window.location.href='/Signup'}}>SignUp</button> 
                    
                    </div> 
                
                </form>
            </div>
        </div>
            
    )
}



export default LoginPub;