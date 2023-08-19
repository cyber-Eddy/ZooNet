import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';

const GoogleMapComponent = () => {
  const [draggable, setDraggable] = useState(true);
  const [markerPosition, setMarkerPosition] = useState({ lat: 19.4517, lng: -70.69703 });
  console.log('Marker position to:', markerPosition);
  const handleMarkerDrag = (event) => {
    setMarkerPosition({
      lat: event.lat,
      lng: event.lng,
    });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyA9LSEGV21uEBTLcdN9IROhWoPUH_eXfL0',
        }}
        defaultCenter={markerPosition}
        defaultZoom={15}
        draggable={draggable}
        draggableCursor="default"
        onChildMouseUp={({ draggable }) => {
          setDraggable(true);
        }}

        onChange={(map) => {
          setMarkerPosition({
            lat: map.center.lat,
            lng: map.center.lng,
          });
        }}
      >
        <Marker lat={markerPosition.lat} lng={markerPosition.lng} draggable={draggable} onDragEnd={handleMarkerDrag} />
        <Marker1 lat={markerPosition.lat} lng={markerPosition.lng} draggable={draggable} onDragEnd={handleMarkerDrag} />
      </GoogleMapReact>
    </div>
  );
};
const Marker = ({ draggable, onDragEnd }) => (
  <div
    style={{ cursor: draggable ? 'pointer' : 'default' }}
    draggable={draggable}
    onDragEnd={(map) => {
      onDragEnd(map);
     
    }}
  >
    <Icon icon="ic:twotone-location-on" color="red" width="50" />
  </div>
);
const Marker1 = ({ draggable, onDragEnd }) => (
  <div
    style={{ cursor: draggable ? 'pointer' : 'default' }}
    draggable={draggable}
    onDragEnd={(map) => {
      onDragEnd(map);
     
    }}
  >
    <Icon icon="ic:twotone-location-on" color="red" width="50" />
  </div>
);


export default GoogleMapComponent;
