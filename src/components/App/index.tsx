import React, { useEffect, useReducer } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./App.scss";
import { aqiReducer, IAQIData } from "../../redux/aqiReducer";
import AQICard from "./aqiCard";

export default function App() {
  const [data, dispatch] = useReducer(aqiReducer, {});

  useEffect(() => {
    const client = new W3CWebSocket("wss://city-ws.herokuapp.com");
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const parsedData: IAQIData[] = JSON.parse(message.data as string);
      dispatch({ type: "update", payload: parsedData });
    };
    client.onerror = (err) => {
      console.error(err);
    };

    return () => {
      client.close();
      console.log("Client disconnected");
    };
  }, []);

  return (
    <div className="app">
      <h1>Air Quality Index</h1>
      <div className="overview">
        {Object.entries(data).map(([city, aqi], index) => {
          return <AQICard key={index} name={city} aqi={aqi} />;
        })}
      </div>
    </div>
  );
}
