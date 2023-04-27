import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  InfoBox,
  Marker,
  MarkerF,
  InfoWindow,
  MarkerClustererF,
  GoogleMarkerClusterer,
  GoogleMapsMarkerClusterer,
} from '@react-google-maps/api';
import { getLocationOrigin } from 'next/dist/shared/lib/utils';

const containerStyle = {
  width: '400px',
  height: '400px',
};
const options = {
  clickableOptions: false,
};
const positions = [
  { lat: 47.1, lng: 106.1 },
  { lat: 47.2, lng: 106.1 },
  { lat: 47.3, lng: 106.1 },
  { lat: 47.4, lng: 106.1 },
];

const center = {
  lat: 47.92123,
  lng: 106.918556,
};
export default function Map() {
  <script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>;
  const [userLoc, setUserLoc] = useState<any>({});
  const [locShared, setLocShared] = useState<any>('');
  const [markerLoc, setMarkerLoc] = useState<any>({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBtqzOp_Nbaz-txtDb4ijwHpz3MRxVXj7c',
  });
  if (!isLoaded) return <div>Loading...</div>;
  function findCoordinate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((positions) => {
        console.log(positions.coords);
        setUserLoc({
          lat: positions.coords.latitude,
          lng: positions.coords.longitude,
        });
      });
    } else {
      alert('ajilkubna');
    }
  }
  // console.log(markerLoc);
  return (
    <>
      <GoogleMap zoom={12} center={center} mapContainerStyle={containerStyle}>
        {positions.map((position) => (
          <MarkerF
            onClick={() => console.log('clicked', position)}
            position={position}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
            }}
          />
        ))}

        <MarkerF
          position={userLoc}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          draggable={true}
          onDrag={(center: any) =>
            setMarkerLoc({
              lat: center.latLng?.lat(),
              lng: center.latLng?.lng(),
            })
          }
        />
      </GoogleMap>
      <button onClick={() => findCoordinate()}>share location</button>
      <div>
        lat: {markerLoc.lat} lng: {markerLoc.lng}
      </div>
    </>
  );
}
