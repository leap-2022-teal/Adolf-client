import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { getDistance } from 'geolib';
import axios from 'axios';
import { InfoWindowF } from '@react-google-maps/api';
import { isVisible } from 'ckeditor5/src/utils';

// import {img} from './people.png'
const containerStyle = {
  width: '800px',
  height: '800px',
};
const center = {
  lat: 47.92123,
  lng: 106.918556,
};

export default function Map() {
  <script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>;
  const [userLoc, setUserLoc] = useState<any>(null);
  const [markerLoc, setMarkerLoc] = useState<any>({});
  const [lists, setLists] = useState<any>([]);
  const [positions, setPositions] = useState<any>({});
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [activeMarker, setActiveMarker] = useState<any>(null);
  const [visible, setVisible] = useState<string>();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBtqzOp_Nbaz-txtDb4ijwHpz3MRxVXj7c',
  });

  useEffect(() => {
    loadData();
  }, []);
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
  function handleClick(list: any) {
    setSelectedElement(list);
    setVisible(list._id);
    console.log(visible);
  }
  console.log(selectedElement);
  function loadData() {
    axios.get(`http://localhost:8000/registration/spavah`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setLists(data);
      } else {
        alert({ status });
      }
    });
  }
  console.log(lists);

  return (
    <>
      <GoogleMap zoom={12} center={center} mapContainerStyle={containerStyle}>
        {lists.map((list: any) => (
          <>
            <MarkerF
              key={list.name}
              onClick={() => handleClick(list)}
              position={
                new google.maps.LatLng(
                  list.address.location.coordinates[0],
                  list.address.location.coordinates[1]
                )
              }
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
              }}
            />
            {visible === list._id ? (
              <InfoWindowF
                position={
                  new google.maps.LatLng(
                    list.address.location.coordinates[0],
                    list.address.location.coordinates[1]
                  )
                }
                onCloseClick={() => {
                  setSelectedElement(null);
                }}
              >
                <div>
                  <h1>{list.name}</h1>
                  {userLoc !== null ? (
                    getDistance(
                      { latitude: userLoc.lat, longitude: userLoc.lng },
                      {
                        latitude: list.address.location.coordinates[0],
                        longitude: list.address.location.coordinates[1],
                      }
                    )
                  ) : (
                    <h1>Share your location! </h1>
                  )}
                </div>
              </InfoWindowF>
            ) : null}
          </>
        ))}{' '}
        <MarkerF
          position={userLoc}
          icon={{
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            scale: 7,
          }}
          draggable={true}
          onDrag={(center: any) =>
            setUserLoc({
              lat: center.latLng?.lat(),
              lng: center.latLng?.lng(),
            })
          }
        ></MarkerF>
      </GoogleMap>
      <button onClick={() => findCoordinate()}>share location</button>
    </>
  );
}
