import React, { useEffect, useState }  from 'react';
import classes from './SideNav.css'
const SideNav = (props) => {
    const [preferences, setPreferences] = useState(props.userPreference);
    

    useEffect(()=> {
        setPreferences({
            ...preferences,
            location: props.userPreference.location,
            term : props.userPreference.term
        })
        
    },[props.userPreference])

    const onPriceRadioChange = (e) => {
        setPreferences({
            ...preferences,
            price: e.target.value
        });
      }
    
    const onCategoryRadioChange = (e) => {
        setPreferences({
            ...preferences,
            category: e.target.value
        });
      }

    const onRadiusTextChange = (e) => {
        setPreferences({
            ...preferences,
            radius: e.target.value 
        });
    };
    
    const onCityTextChange = (e) => {
        setPreferences({
            ...preferences,
            location: e.target.value 
        });
       
    };


    const onTermTextChange = (e) => {
        setPreferences({
            ...preferences,
            term: e.target.value 
        });
       
    };


    const onSubmit = (e) => {
        e.preventDefault();
        console.log(preferences);
        props.setUserPreference(preferences);
      }

    const showVisualizationView = () => {
        props.setShowVisualization(true);
    }

    const hideVisualizationView = () => {
        props.setShowVisualization(false);
    }

return (
    <div>



        <div className={classes.sidenav}>
            
                {props.showVisualization? <div><button onClick={hideVisualizationView} className={classes.btnvisulization}>Back to Search Places</button> <br/><br/><br></br>
                {/* <button className={classes.btnvisulization} onClick={{}}>User Rating History</button> */}
                </div>: <div><form onSubmit={onSubmit} style={{marginLeft:'20px'}}>

                {/* Drop Down options for price Level*/}
                <strong style={{color:'white'}} >Price Levels:</strong>
        
                <select name="pricelevel" id="pricelevel" onChange={onPriceRadioChange} className={classes.wgtmsr}>
                        <option value="" selected ={preferences.price === ""}>Any</option>
                        <option value="1" selected ={preferences.price === "1"}>$</option>
                        <option value="2" selected ={preferences.price === "2"}>$$</option>
                        <option value="3" selected ={preferences.price === "3"}>$$$</option>
                        <option value="4" selected ={preferences.price === "4"}>$$$$</option>
                    
                </select>
                <br/><br/>


                {/* Drop Down options for Categories*/}
                <strong style={{color:'white'}}>Categories:</strong>
            
                <select name="categories" id="categories" onChange={onCategoryRadioChange} className={classes.wgtmsr} >
                        <option value="" selected={preferences.category === ""}>Any</option>
                        <option value="bars" selected={preferences.category === "bars"}>Bars</option>
                        <option value="restaurants" selected={preferences.category === "restaurants"}>Restaurants</option>
                        <option value="parks" selected={preferences.category === "parks"}>Parks</option>
                        <option value="bowling" selected={preferences.category === "bowling"}>Bowling</option>
                        <option value="movietheaters" selected={preferences.category === "movietheaters"}>MovieTheaters</option>
                    
                </select>
                <br/><br/>
            
                <strong style={{color:'white'}}>Radius(Miles):</strong>
                            <label>
                                <input
                                    type="text"
                                    value={preferences.radius}
                                    onChange={onRadiusTextChange}
                                />
                            </label>
                
                <br/><br/>
                <strong style={{color:'white'}}>City:&nbsp;  </strong>
                            <label>
                                <input
                                    type="text"
                                    value={preferences.location}
                                    onChange={onCityTextChange}
                                   
                                />
                            </label>

                 <br/><br/>

                 <strong style={{color:'white'}}>Term Finder:&nbsp;  </strong>
                            <label>
                                <input
                                    type="text"
                                    value={preferences.term}
                                    onChange={onTermTextChange}
                                   
                                />
                            </label>

                 <br/><br/>
                <button type="submit" className={classes.btnfilter}  style={{marginLeft:'0px'}} >Filter</button>
                

            </form>
            <br/>
            <button className={classes.btn} onClick={showVisualizationView}  style={{marginLeft:'20px',marginTop:'10px'}}>Visualization</button>
            <br/><br/>
            <button className={classes.btn} onClick={props.scrollToSection}  style={{marginLeft:'20px',marginTop:'10px'}}>Recommendation</button>
            </div>}
            
        </div>
    
    </div>
 );
};
export default SideNav;