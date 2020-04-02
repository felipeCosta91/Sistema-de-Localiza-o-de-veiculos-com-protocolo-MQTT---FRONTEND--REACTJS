import React, { useEffect, useState } from "react";
import * as mqtt from "react-paho-mqtt";
import Timer from "./timer";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline
} from "@react-google-maps/api";
import rotaOne from "./rotas";
import paradas from "./paradas";
import IconBus from "../icons/00.png";

// dados do Polyline
const options = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1
};

export default function Maps(props) {
  // mqtt
  const [client, setClient] = useState(null);
  const [latlng, setLatlng] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const _topic = ["ufpel"];
  const _options = {};

  useEffect(() => {
    _init();
  }, []);
  useEffect(() => {
    const stringLatLng = latlng.split("*");
    setLat(stringLatLng[0]);
    setLng(stringLatLng[1]);
  }, [latlng]);
  const _init = () => {
    const c = mqtt.connect(
      "broker.mqttdashboard.com",
      Number(8000),
      "mqtt",
      _onConnectionLost,
      _onMessageArrived
    );

    setClient(c);
  };
  // em caso de perca de conexão
  const _onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  };

  // recebe a mensagem
  const _onMessageArrived = message => {
    setLatlng(message.payloadString);
  };

  // se inscreve no tópico
  const Ons = () => {
    client.connect({
      onSuccess: () => {
        client.subscribe(_topic, _options);
      }
    });
  };

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="GOOGLE API KEY"
    >
      <GoogleMap
        mapContainerStyle={{ height: "90vh", width: "100vw" }}
        center={{ lat: -31.780528, lng: -52.323864 }}
        zoom={15}
        onLoad={Ons}
      >
        <Marker
          position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          icon={IconBus}
        />

        {/* paradas */}
        {paradas.map(item => (
          <Marker
            key={item.id}
            position={{ lat: item.lat, lng: item.lng }}
            icon={item.icon}
            onClick={() => {
              Timer(item.id);
            }}
          />
        ))}
        {/* marker bus */}

        <Polyline path={rotaOne} options={options} />
      </GoogleMap>
    </LoadScript>
  );
}
