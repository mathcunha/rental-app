import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const GoogleMaps = ({ google, data }) => {
  const containerStyle = {
    width: "350px",
    height: "500px",
  };
  const [marker, setMarker] = useState(null);
  const [infoShow, setInfoShow] = useState(false);
  const handleClick = (apt) => (e) => {
    setInfoShow(true);
    setMarker(apt);
  };
  const handleClose = (e) => {
    setMarker(null);
    setInfoShow(false);
  };

  return (
    <Map
      google={google}
      zoom={8}
      containerStyle={containerStyle}
      initialCenter={{ lat: 47.444, lng: -122.176 }}
    >
      {data._embedded &&
        data._embedded.apartments.map((apt) => (
          <Marker
            draggable={true}
            title={`${apt.name} - ${apt.room} rooms`}
            position={{ lat: apt.lat, lng: apt.lng }}
          ></Marker>
        ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${process.env.GOOGLE_API_KEY}`,
})(GoogleMaps);
