import React, { useEffect, useReducer, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { aqiReducer, IAQIData } from "../../redux/aqiReducer";
import LineChart from "../Charts/line";
import "./App.scss";
import AQITable from "./table";

export default function App() {
  const [data, dispatch] = useReducer(aqiReducer, {});
  const [compare, setCompare] = useState<string[]>([]);

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

  // Connect to socket on mount
  useEffect(() => {
    client = connect();
    return () => {
      client.close(3000);
      console.log("Client disconnected");
    };
  }, []);

  return (
    <main>
      <h1>Air Quality Index</h1>
      <div className="overview">
        <AQITable data={Object.entries(data)} onChange={setCompare} />
        {compare.length ? (
          <div className="chart">
            <LineChart />
          </div>
        ) : null}
      </div>
    </main>
  );
}
