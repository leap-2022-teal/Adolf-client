import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { getDistance } from 'geolib';
import axios from 'axios';
import { InfoWindowF } from '@react-google-maps/api';
import { isVisible } from 'ckeditor5/src/utils';
import { BiCurrentLocation } from 'react-icons/bi';
import Script from 'next/script';
import mapIcon from '../image/map-marker-area-line.svg';
import { SPlist } from './SPlist';
import Example from './stepper';
const containerStyle = {
  height: '300px',
  width: '90%',
  margin: 'auto',
};
const center = {
  lat: 47.92123,
  lng: 106.918556,
};
interface Coordinates {
  lat: number;
  lng: number;
}
export default function Map() {
  <Script src="http://maps.googleapis.com/maps/api/js?sensor=false"></Script>;
  const [userLoc, setUserLoc] = useState<any>(null);
  const [markerLoc, setMarkerLoc] = useState<any>({});
  const [lists, setLists] = useState<any>([]);
  const [positions, setPositions] = useState<any>({});
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [activeMarker, setActiveMarker] = useState<any>(null);
  const [visible, setVisible] = useState<string>();
  const [sortedLists, setSortedLists] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<Coordinates>({
    lat: 47.92307127568066,
    lng: 106.96024750913087,
  });
  const [mapZoom, setMapZoom] = useState<number>(12);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBtqzOp_Nbaz-txtDb4ijwHpz3MRxVXj7c',
  });

  useEffect(() => {
    findCoordinate();
  }, []);
  useEffect(() => {
    if (userLoc) {
      loadDatas();
      setMapCenter(userLoc);
      setMapZoom(16);
    }
  }, [userLoc]);
  if (!isLoaded) return <div>Уншиж байна...</div>;
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
  }
  // function loadData() {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/org`)
  //     .then((res) => {
  //       const { data, status } = res;
  //       if (status === 200) {
  //         setLists(data);
  //       } else {
  //         alert({ status });
  //       }
  //     });
  // }
  function loadDatas() {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/org`)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const sortedData = data.map((list: any) => {
            let distance = null;
            if (
              userLoc &&
              list.address &&
              list.address.location &&
              list.address.location.coordinates
            ) {
              const { lat, lng } = userLoc;
              const { coordinates } = list.address.location;
              distance = getDistance(
                { latitude: lat, longitude: lng },
                {
                  latitude: parseFloat(coordinates[0]),
                  longitude: parseFloat(coordinates[1]),
                }
              );
            }

            return { ...list, distance };
          });
          sortedData.sort((a: any, b: any) => a.distance - b.distance); // Fixed property name here
          setLists(sortedData);
          setSortedLists(sortedData);
        } else {
          alert(status);
        }
      })
      .catch((error) => {
        console.log(error); // Handle or log any errors that occur during the API request
      });
  }
  console.log({ sortedLists });

  console.log({ userLoc });
  // const distance = geolib.orderByDistance(
  //   { latitude: 51.515, longitude: 7.453619 },
  //   [
  //     { latitude: 52.516272, longitude: 13.377722 },
  //     { latitude: 51.518, longitude: 7.45425 },
  //     { latitude: 51.503333, longitude: -0.119722 },
  //   ]
  // );

  return (
    <div>
      {/* <GoogleMap zoom={12} center={center} mapContainerStyle={containerStyle}> */}
      <GoogleMap
        zoom={mapZoom}
        center={mapCenter}
        mapContainerStyle={containerStyle}
      >
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
                path: mapIcon,
                scale: 4,
                // path: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                // scale: 7,
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
                    <h1>Та өөрийн байршлаа тогтооно уу !!</h1>
                  )}
                </div>
              </InfoWindowF>
            ) : null}
          </>
        ))}{' '}
        <MarkerF
          position={userLoc}
          icon={{
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 5,
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
      <button onClick={() => findCoordinate()}>
        {' '}
        Байршил тогтоох! <BiCurrentLocation className="text-4xl" />
      </button>
      <SPlist spList={lists} />
    </div>
  );
}
