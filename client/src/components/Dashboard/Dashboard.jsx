import React, { Component, useEffect, useState }  from 'react';
const Dashboard =(props)=>{

    const [username, setusername] = useState(undefined);

    useEffect(()=> {
        if(username === undefined){
            setusername(sessionStorage.getItem('username'));
    }
    }, [username]);
    
    return(
    <div>
        <h1>Dashboard page </h1>
        <h2> Welcome {username}</h2>
        <button type="submit" onClick={props.deleteToken} > Logout </button>

    </div>)
}
export default Dashboard;