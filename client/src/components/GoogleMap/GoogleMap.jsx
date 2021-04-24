import React, { Component, useEffect, useState }  from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({text}) => <div>{text}</div>;

const GoogleMap = (props) => {
    const userlong = Number(sessionStorage.getItem('longitude'))
    const userlat = Number(sessionStorage.getItem('latitude'))
    const [center, setCenter] = useState({lat: userlat, lng: userlong });
    
    const [zoom, setZoom] = useState(9);
//    const longlat = props.longlat
//     console.log("from google map", longlat)
//     longlat.map(ll=>{
//         console.log(parseFloat(ll.longitude))
//         console.log(parseFloat(ll.latitude))
//     })
    //setCenter({lat: 33.1976, lng: -96.6153})
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
                name ={ll.b_name}
                color="green"/>
                
        
    })


    
  //   const recmarkers = props.longlat.map((ll,index) =>{
  //     return <Marker 
  //             key ={index}
  //             lat = {Number(ll.latitude)}
  //             lng={Number(ll.longitude)} 
  //             name ={ll.b_name}
  //             color="pink"/>
              
      
  // })


    return (
        <div style={{ height: '78vh', width: '97%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBn8Nd-y2xT2QFtkh8INau53gcZbT64x_k' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >

        
          
          {markers}

          <Marker 
          lat = {center.lat}
          lng={center.lng} 
          name ="You are here!"
          color="red"/> 

          
          {/* {recmarkers} */}
         

        </GoogleMapReact>
      </div>
    );
}

export default GoogleMap;