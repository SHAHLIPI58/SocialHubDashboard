import React, { Component } from 'react';
import  { useEffect } from 'react';
import  { useState } from 'react';
import axios from 'axios';
import classes from './RatingHistory.css'


const RatingHistory = (props)=>{

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(
            'http://localhost:3001/ratingHistory',
            {
                username: props.username,
            },
          ).then(response => {
              console.log("api call returned ratingHistory: ", response.data);
              setData(response.data)
          })
          .catch(console.log);
    }, []);
     console.log("RatingHistory react function...",data)



     const TableViews = data.map(TableViewRes=>{
        return (


                <tr key = {TableViewRes._id} className={classes.userratingtr}>
                    <td className={classes.userratingtd}>{TableViewRes.itemname}</td>
                    <td className={classes.userratingtd}>{TableViewRes.category}</td>
                    <td className={classes.userratingtd}>{TableViewRes.pricelevel}</td>
                    <td className={classes.userratingtd}>{TableViewRes.rating}</td>
                    <td className={classes.userratingtd}>{TableViewRes.Date.split("T")[0]}</td>
                </tr>
                      
                )
    });

    return(
        <div>
        <table className={classes.userratingTable}>
                 
                <tr className={classes.userratingtr} >
                    <th className={classes.userratingth}>PlaceName</th>
                    <th className={classes.userratingth}>Category</th>
                    <th className={classes.userratingth}>PriceLevel</th>
                    <th className={classes.userratingth}>Rating</th>
                    <th className={classes.userratingth}>Date</th>
                </tr>
                {TableViews}
            </table>
            <br/><br/>
            </div>
    )

}

export default RatingHistory;