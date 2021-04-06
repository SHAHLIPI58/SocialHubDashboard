import React, { Component, useEffect, useState }  from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({text}) => <div>{text}</div>;

const GoogleMap = (props) => {
    const [center, setCenter] = useState({lat: 33.1976, lng: -96.6153 });
    const [zoom, setZoom] = useState(9);

    const getMapOptions = (maps) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };

    return (
        <div style={{ height: '70vh', width: '90%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBn8Nd-y2xT2QFtkh8INau53gcZbT64x_k' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
          <Marker
            lat={33.07652}
            lng={-96.82177}
            name="My Marker"
            color="blue"
          />
          <Marker
             lat={32.838272}
             lng={-96.775412}
            name="My Marker"
            color="red"
          />
        </GoogleMapReact>
      </div>
    );
}

export default GoogleMap;