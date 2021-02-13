import React, { useEffect, useReducer } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./App.scss";
export interface IAQIData {
  city: string;
  aqi: number;
}

type Action = { type: "update"; payload: IAQIData[] };
type TCityData = Record<string, number>;

const initialState: TCityData = {};
const reducer = (state: TCityData, action: Action) => {
  switch (action.type) {
    case "update":
      return { ...state, ..._toObject(action.payload) };
    default:
      return state;
  }
};

const _toObject = (data: IAQIData[]) => {
  return data.reduce<Record<string, number>>((prev, curr) => {
    prev[curr.city] = curr.aqi;
    return prev;
  }, {});
};

export default function App() {
  const [data, dispatch] = useReducer(reducer, initialState);

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
    <div className="App">
      <h1>Live Air Quality Monitoring</h1>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>City</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([city, aqi], index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{city}</td>
                <td>{aqi.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
