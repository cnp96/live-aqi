import React, { useEffect, useReducer } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { aqiReducer, IAQIData } from "../../redux/aqiReducer";
import "./App.scss";
import AQITable from "./table";

export default function App() {
  const [data, dispatch] = useReducer(aqiReducer, {});

  const msgHandler = (msg: IAQIData[]) => {
    dispatch({ type: "update", payload: msg });
  };

  let client: W3CWebSocket;
  const connect = (onMessage: (msg: IAQIData[]) => void) => {
    client = new W3CWebSocket("wss://city-ws.herokuapp.com");
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const parsedData: IAQIData[] = JSON.parse(message.data as string);
      onMessage && onMessage(parsedData);
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
            client = connect(msgHandler);
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
    client = connect(msgHandler);
    return () => {
      client.close(3000);
      console.log("Client disconnected");
    };
  }, []);

  return (
    <main>
      <h1>Air Quality Index</h1>
      <div className="overview">
        <AQITable data={data} />

        {/* <div className="chart">
          <LineChart labels={Object.keys(compareCities)} data={aqiHistory} />
        </div> */}
      </div>
    </main>
  );
}
