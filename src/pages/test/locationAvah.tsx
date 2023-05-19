import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { getDistance } from 'geolib';
import axios from 'axios';
import { InfoWindowF } from '@react-google-maps/api';
import Script from 'next/script';
const center = {
  lat: 47.92123,
  lng: 106.918556,
};
export default function LocationAvah() {
  <Script src="http://maps.googleapis.com/maps/api/js?sensor=false"></Script>;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBtqzOp_Nbaz-txtDb4ijwHpz3MRxVXj7c',
  });

  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const [bairshil, setBairshil] = useState<any>({});

  const containerStyle = {
    width: '800px',
    height: '800px',
  };

  if (!isLoaded) return <div>Loading...</div>;
  function getUserLoc() {
    console.log('bairshil avahjiin');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((positions) => {
        console.log(positions.coords);
        setBairshil({
          lat: positions.coords.latitude,
          lng: positions.coords.longitude,
        });
      });
    } else {
      alert('ajilkubna');
    }
  }
  function save() {
    if (bairshil.lat !== undefined) {
      alert(
        ` : lat: ${bairshil.lat}, lng: ${bairshil.lng} bairshliig hadgallaa`
      );
    } else {
      alert('Haygaa oruulna uu');
    }
  }
  return (
    <>
      {' '}
      <button onClick={() => getUserLoc()}>
        {/* //Odoo baigaa bairshil ashiglah// */}
      </button>
      <button onClick={() => setMapVisible(true)}>
        {/* //Gazriin zurag deer bairshil zaah// */}
      </button>
      {mapVisible === true ? (
        <>
          {' '}
          <GoogleMap
            zoom={12}
            center={center}
            mapContainerStyle={containerStyle}
          >
            <MarkerF
              position={center}
              icon={{
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 7,
              }}
              draggable={true}
              onDrag={(center: any) =>
                setBairshil({
                  lat: center.latLng?.lat(),
                  lng: center.latLng?.lng(),
                })
              }
            ></MarkerF>{' '}
          </GoogleMap>
        </>
      ) : null}
      {bairshil && (
        <div>
          lat: {bairshil.lat}, lng: {bairshil.lng}
        </div>
      )}
      <button onClick={() => save()}>Enehuu bairshliig hadgalah</button>
    </>
  );
}
