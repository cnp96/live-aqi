import React, { useEffect, useReducer, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  aqiHistoryReducer,
  aqiReducer,
  IAQIData,
} from "../../redux/aqiReducer";
import "./App.scss";
import AQITable from "./table";
const LineChart = React.lazy(() => import("../Charts/line"));

export default function App() {
  const [data, dispatchAqi] = useReducer(aqiReducer, {});
  const [selectedCity, setCity] = useState<string>();
  const cityRef = useRef<string>();
  const [aqiHistory, dispatchAqiHistory] = useReducer(aqiHistoryReducer, []);

  const onMessage = (msg: IAQIData[]) => {
    // Update redux store
    dispatchAqi({ type: "update", payload: msg });

    // Update chart
    const cityData = msg.find((m) => m.city === cityRef.current);
    if (cityData) {
      dispatchAqiHistory({ type: "add", payload: cityData.aqi });
    }
  };
  const onChangeCity = (city?: string) => {
    setCity(city);
    //! Using ref because setState op is taking a longer duration
    cityRef.current = city;
    dispatchAqiHistory({ type: "clear" });
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
            client = connect(onMessage);
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
    client = connect(onMessage);
    return () => {
      client.close(3000);
      console.log("Client disconnected");
    };
  }, []);

  return (
    <main>
      {/* <h2>Air Quality Index</h2> */}
      <div className="overview">
        <AQITable data={data} onChange={onChangeCity} />
        {selectedCity ? (
          <div className="chart">
            <React.Suspense fallback="Loading chart...">
              <LineChart label={selectedCity} data={aqiHistory} />
            </React.Suspense>
          </div>
        ) : null}
      </div>
    </main>
  );
}
