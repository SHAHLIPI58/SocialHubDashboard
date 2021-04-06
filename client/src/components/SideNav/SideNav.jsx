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
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
            <form onSubmit={onSubmit}>
                {/* Radio options for price */}
                <strong>Price:</strong>

                    <ul>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    value="1"
                                    checked={preferences.price === "1"}
                                    onChange={onPriceRadioChange}
                                />
                                <span>1</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="2"
                                    checked={preferences.price === "2"}
                                    onChange={onPriceRadioChange}
                                />
                                <span>2</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="3"
                                    checked={preferences.price === "3"}
                                    onChange={onPriceRadioChange}
                                />
                                <span>3</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="4"
                                    checked={preferences.price === "4"}
                                    onChange={onPriceRadioChange}
                                />
                                <span>4</span>
                            </label>
                        </li>
                    </ul>

                {/* Radio options for categories */}
                <strong>Categories:</strong>

                    <ul>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    value="bars"
                                    checked={preferences.category === "bars"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span>bars</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="restaurants"
                                    checked={preferences.category === "restaurants"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span>restaurants</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="parks"
                                    checked={preferences.category === "parks"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span>parks</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="bowling"
                                    checked={preferences.category === "bowling"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span>Bowling</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="movietheaters"
                                    checked={preferences.category === "movietheaters"}
                                    onChange={onCategoryRadioChange}
                                />
                                <span>Cinema</span>
                            </label>
                        </li>
                    </ul>

                {/* Textbox for radius */}
                <strong>Radius:</strong>
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