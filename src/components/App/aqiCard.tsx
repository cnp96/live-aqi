import * as React from "react";
import { capitalize } from "lodash";

export interface AQICardProps {
  name: string;
  aqi: number;
}

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
    <div className="card">
      <div className="card-body">
        <div>
          <div className={`text-lg bg-${getCategory(props.aqi)}`}>
            {props.aqi.toFixed(2)}
          </div>
          <div>{capitalize(props.name)}</div>
        </div>
      </div>
    </div>
  );
});

export default AQICard;
