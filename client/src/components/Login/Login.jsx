import React, { useState }  from 'react';
import classes from './Login.css';
import PropTypes from 'prop-types';




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
        }
        // window.location.replace("http://localhost:3000/dashboard");
    }
    
    const validateForm =()=> {
      
      return username.length > 0 && password.length > 0
    }

    return(
        <div className={classes.loginwrapper}>
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}> 
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
                {/* <div className ={classes.divCheckbox} >Empty username</div> */}
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit" disabled={!validateForm()}>Submit</button>
                <button type="button" onClick={event =>  window.location.href='/Signup'}>signup</button>
            </div>
            {error ? <div>Invalid credentials</div> : null}
            </form>
        </div>
            
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default Login;