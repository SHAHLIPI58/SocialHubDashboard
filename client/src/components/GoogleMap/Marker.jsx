
import React from 'react';
import classes from './Marker.css';

const Marker = (props) => {
    const { color, name, id } = props;
    const cssClasses = `${classes.pin} ${classes.bounce}`
    return (
      <div className={cssClasses}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;