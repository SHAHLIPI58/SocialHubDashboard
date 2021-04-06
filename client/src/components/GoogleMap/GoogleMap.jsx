import React, { Component, useEffect, useState }  from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({text}) => <div>{text}</div>;

const GoogleMap = (props) => {
    
    const [center, setCenter] = useState({lat: 33.1976, lng: -96.6153 });
    const [zoom, setZoom] = useState(9);
//    const longlat = props.longlat
//     console.log("from google map", longlat)
//     longlat.map(ll=>{
//         console.log(parseFloat(ll.longitude))
//         console.log(parseFloat(ll.latitude))
//     })
    const getMapOptions = (maps) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };

    const markers = props.longlat.map((ll,index) =>{
        return <Marker 
                key ={index}
                lat = {Number(ll.latitude)}
                lng={Number(ll.longitude)} 
                name ="My lipi marker"
                color="green"/>
        
    })


    return (
        <div style={{ height: '70vh', width: '90%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBn8Nd-y2xT2QFtkh8INau53gcZbT64x_k' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >

             <Marker 
               
                lat = {33.1976}
                lng={-96.6153} 
                name ="My lipi marker"
                color="red"/>
          
          {markers}
         

        </GoogleMapReact>
      </div>
    );
}

export default GoogleMap;