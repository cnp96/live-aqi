import React, { useEffect, useReducer } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { aqiReducer, IAQIData } from "../../redux/aqiReducer";
import "./App.scss";
import AQICard from "./aqiCard";

export default function App() {
  const [data, dispatch] = useReducer(aqiReducer, {});
  let client: W3CWebSocket;
  const connect = () => {
    client = new W3CWebSocket("wss://city-ws.herokuapp.com");
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const parsedData: IAQIData[] = JSON.parse(message.data as string);
      dispatch({ type: "update", payload: parsedData });
    };
    client.onerror = (err) => {
      client.close(3001);
      console.error(err);
    };
    client.onclose = (e) => {
      // Retry logic, if connection is not closed gracefully
      if (e.code < 3000) {
        const retry = setInterval(() => {
          if (client.readyState === 3) {
            console.log("Reconnecting to server");
            client = connect();
          } else {
            clearInterval(retry);
          }
        }, 500);
      }
    };
    return client;
  };

  useEffect(() => {
    client = connect();
    return () => {
      client.close(3000);
      console.log("Client disconnected");
    };
  }, []);

  return (
    <div className="app">
      <h1>Air Quality Index</h1>
      <div className="overview">
        {Object.entries(data)
          .sort((s, f) => (s[1] < f[1] ? -1 : 1))
          .map(([city, aqi], index) => {
            return <AQICard key={index} name={city} aqi={aqi} />;
          })}
      </div>
    </div>
  );
}
