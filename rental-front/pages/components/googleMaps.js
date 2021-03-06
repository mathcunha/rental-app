import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../src/theme";
import { useState, useEffect } from "react";
import withWidth from "@material-ui/core/withWidth";

const useStyles = makeStyles({
  media: {
    width: "30vw",
    [theme.breakpoints.only("sm")]: {
      width: "50vw",
    },
    [theme.breakpoints.only("xs")]: {
      width: "95vw",
    },
    height: "500px",
  },
  containerStyle: {
    width: "350px",
    height: "500px",
  },
});

const GoogleMaps = ({ google, data, marker, width }) => {
  const [mapWidth, setMapWidth] = useState("30vw");
  useEffect(() => {
    if ("sm" === width) {
      setMapWidth("45vw");
    } else if ("xs" === width) {
      setMapWidth("84vw");
    } else {
      setMapWidth("30vw");
    }
  }, width);

  const [activeMarker, setActiveMarker] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const classes = useStyles();
  return (
    <Map
      google={google}
      zoom={3}
      containerStyle={{ width: mapWidth, height: "75vh" }}
      center={{
        lat: marker && marker.lat ? marker.lat : 27.6648274,
        lng: marker && marker.lng ? marker.lng : -81.5157535,
      }}
    >
      {data &&
        data.content &&
        data.content.map((apt) => (
          <Marker
            draggable={false}
            name={apt.name}
            title={`${apt.name} - ${apt.room} rooms`}
            position={{ lat: apt.lat, lng: apt.lng }}
            key={apt.name}
            onClick={onMarkerClick}
          ></Marker>
        ))}

      <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
        <div>
          <h3>{activeMarker.name}</h3>
          <h4>{activeMarker.title}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default withWidth()(
  GoogleApiWrapper({
    apiKey: `${process.env.GOOGLE_API_KEY}`,
  })(GoogleMaps)
);
