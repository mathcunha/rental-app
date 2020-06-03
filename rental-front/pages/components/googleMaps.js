import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const GoogleMaps = ({ google, data, marker }) => {
  const containerStyle = {
    width: "350px",
    height: "500px",
  };

  return (
    <Map
      google={google}
      zoom={8}
      containerStyle={containerStyle}
      center={{
        lat: marker && marker.lat ? marker.lat : 47.444,
        lng: marker && marker.lng ? marker.lng : -122.176,
      }}
    >
      {data &&
        data._embedded &&
        data._embedded.apartments.map((apt) => (
          <Marker
            draggable={true}
            title={`${apt.name} - ${apt.room} rooms`}
            position={{ lat: apt.lat, lng: apt.lng }}
            key={apt.name}
          ></Marker>
        ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${process.env.GOOGLE_API_KEY}`,
})(GoogleMaps);
