import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const GoogleMaps = (props) => {
  const containerStyle = {
    width: "350px",
    height: "500px",
  };
  return (
    <Map
      google={props.google}
      zoom={8}
      containerStyle={containerStyle}
      initialCenter={{ lat: 47.444, lng: -122.176 }}
    >
      <Marker position={{ lat: 48.0, lng: -122.0 }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${process.env.GOOGLE_API_KEY}`,
})(GoogleMaps);
