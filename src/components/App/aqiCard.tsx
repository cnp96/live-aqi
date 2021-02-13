import * as React from "react";
import { capitalize } from "lodash";

export interface AQICardProps {
  name: string;
  aqi: number;
}

const category = {
  50: "bg-good",
  100: "bg-satisfactory",
  200: "bg-moderate",
  300: "bg-poor",
  400: "bg-very-poor",
  500: "bg-severe",
};

const getCategory = (val: number) => {
  return val <= 50
    ? "good"
    : val <= 100
    ? "satisfactory"
    : val <= 200
    ? "moderate"
    : val <= 300
    ? "poor"
    : val <= 400
    ? "very-poor"
    : "severe";
};

const AQICard: React.FC<AQICardProps> = React.memo((props) => {
  return (
    <div className={`card bg-${getCategory(props.aqi)}`}>
      <div className="card-body">
        <div>
          <div className="text-lg">{props.aqi.toFixed(2)}</div>
          <div>{capitalize(props.name)}</div>
        </div>
      </div>
    </div>
  );
});

export default AQICard;
