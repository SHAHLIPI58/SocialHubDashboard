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
        // console.log("useEffect called in SideNav")
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
            
            {props.showVisualization? <div><button onClick={hideVisualizationView}>Back to Search Places</button> <br/><br/>
            <button onClick={{}}>User Rating History</button></div>: <div><form onSubmit={onSubmit} style={{marginLeft:'20px'}}>
            {/* Drop Down options for price Level*/}
            <strong style={{color:'white'}}>Price Levels:</strong>
            <br/><br/>
            <select name="pricelevel" id="pricelevel" onChange={onPriceRadioChange} >
                    <option value="1" selected ={preferences.price === "1"}>$</option>
                    <option value="2" selected ={preferences.price === "2"}>$$</option>
                    <option value="3" selected ={preferences.price === "3"}>$$$</option>
                    <option value="4" selected ={preferences.price === "4"}>$$$$</option>
                   
            </select>
            <br/><br/>


             {/* Drop Down options for Categories*/}
             <strong style={{color:'white'}}>Categories:</strong>
            <br/><br/>
            <select name="categories" id="categories" onChange={onCategoryRadioChange} >
                    <option value="bars" selected={preferences.category === "bars"}>Bars</option>
                    <option value="restaurants" selected={preferences.category === "restaurants"}>Restaurants</option>
                    <option value="parks" selected={preferences.category === "parks"}>Parks</option>
                    <option value="bowling" selected={preferences.category === "bowling"}>Bowling</option>
                    <option value="movietheaters" selected={preferences.category === "movietheaters"}>MovieTheaters</option>
                   
            </select>
            <br/><br/>


            

                {/* Radio options for price */}
                {/* <strong style={{color:'white'}}>Price Level:</strong>
                <div className={classes.verticalradiobuttons}>
                <fieldset className ={classes.fieldsetProperties}>
                       <div><span>
                            <label>
                                <input
                                    type="radio"
                                    value="1"
                                    checked={preferences.price === "1"}
                                    onChange={onPriceRadioChange}
                                />
                                <span style={{color :'white'}}>$</span>
                            </label>
                            </span></div>

                            <div><span>
                            <label>
                            
                                <input
                                    type="radio"
                                    value="2"
                                    checked={preferences.price === "2"}
                                    onChange={onPriceRadioChange}
                                />
                                <span style={{color :'white'}}>$$</span>
                            </label>
                            </span></div>

                            <div><span>
                            <label>
                                <input
                                    type="radio"
                                    value="3"
                                    checked={preferences.price === "3"}
                                    onChange={onPriceRadioChange}
                                />
                                <span style={{color :'white'}}>$$$</span>
                            </label>
                            </span></div>

                            <div><span>
                            <label>
                                <input
                                    type="radio"
                                    value="4"
                                    checked={preferences.price === "4"}
                                    onChange={onPriceRadioChange}
                                />
                                <span style={{color :'white'}}>$$$$</span>
                            </label>
                            </span></div>
                </fieldset>
                </div> */}

                {/* Radio options for categories */}
             
                {/* <strong style={{color:'white'}}>Categories:</strong>
                <div className={classes.verticalradiobuttons}>
                <fieldset className ={classes.fieldsetProperties}>
                           <div><span>
                            <label>
                                <input
                                    type="radio"
                                    value="bars"
                                    checked={preferences.category === "bars"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span style={{color :'white'}}>Bars</span>
                            </label>
                            </span></div>
                            <div><span>
                            <label>
                                <input
                                    type="radio"
                                    value="restaurants"
                                    checked={preferences.category === "restaurants"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span style={{color :'white'}}>Restaurants</span>
                            </label>
                            </span></div>
                            <div><span>
                            <label>
                                <input
                                    type="radio"
                                    value="parks"
                                    checked={preferences.category === "parks"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span style={{color :'white'}}>Parks</span>
                            </label>
                            </span></div>
                            <div><span>
                            <label>
                                <input
                                    type="radio"
                                    value="bowling"
                                    checked={preferences.category === "bowling"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span style={{color :'white'}}>Bowling</span>
                            </label>
                            </span></div>
                            <div><span>
                            <label>
                                <input
                                    type="radio"
                                    value="movietheaters"
                                    checked={preferences.category === "movietheaters"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span style={{color :'white'}}>Movietheaters</span>
                            </label>
                            </span></div>
                          </fieldset>
                            </div> */}

                {/* Textbox for radius */}
            
                <strong style={{color:'white'}}>Radius:</strong>
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
                <button type="submit">Filter</button>
                

            </form>
            <br/>
            <button onClick={showVisualizationView}  style={{marginLeft:'20px'}}>Visualization</button>
            <br/><br/>
            <button onClick={props.scrollToSection}  style={{marginLeft:'20px'}}>Recommendation</button>
            </div>}
            
        </div>
    
    </div>
 );
};
export default SideNav;