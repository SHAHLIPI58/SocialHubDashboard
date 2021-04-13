import React, { useEffect, useState }  from 'react';
import classes from './SideNav.css'
const SideNav = (props) => {
    const [preferences, setPreferences] = useState(props.userPreference);

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


    const onSubmit = (e) => {
        e.preventDefault();
        console.log(preferences);
        props.setUserPreference(preferences);
      }

return (
    <div>


        <div className={classes.sidenav}>
            

             
  

            <form onSubmit={onSubmit}>
                {/* Radio options for price */}
                <strong style={{color:'white'}}>Price:</strong>
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
                                <span style={{color :'white'}}>1</span>
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
                                <span style={{color :'white'}}>2</span>
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
                                <span style={{color :'white'}}>3</span>
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
                                <span style={{color :'white'}}>4</span>
                            </label>
                            </span></div>
                </fieldset>
                </div>

                {/* Radio options for categories */}
                <br/>
                <strong style={{color:'white'}}>Categories:</strong>
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
                                <span style={{color :'white'}}>bars</span>
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
                                <span style={{color :'white'}}>restaurants</span>
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
                                <span style={{color :'white'}}>parks</span>
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
                                <span style={{color :'white'}}>Cinema</span>
                            </label>
                            </span></div>
                          </fieldset>
                            </div>

                {/* Textbox for radius */}
                <br/>
                <strong style={{color:'white'}}>Radius:</strong>
                            <label>
                                <input
                                    type="text"
                                    value={preferences.radius}
                                    onChange={onRadiusTextChange}
                                />
                            </label>
                    
                <button type="submit">Filter</button>

        </form>
        </div>
        

    </div>
 );
};
export default SideNav;