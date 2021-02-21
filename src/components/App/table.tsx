import * as React from "react";
import { capitalize } from "lodash";

export interface AQICardProps {
  data: [string, number][];
  onChange?: (cities: string[]) => void;
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

type Action = { type: "add"; city: string } | { type: "remove"; city: string };
type State = Record<string, boolean>;
function compareReducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return { ...state, [action.city]: true };
    case "remove":
      return { ...state, [action.city]: false };
    default:
      return state;
  }
}

const AQITable: React.FC<AQICardProps> = React.memo((props) => {
  const { data } = props;
  const [compare, setCompare] = React.useReducer(compareReducer, {});

  React.useEffect(() => {
    props.onChange &&
      props.onChange(
        Object.entries(compare)
          .filter(([city, checked]) => checked)
          .map(([city]) => city)
      );
  }, [compare]);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>City</th>
          <th>Current AQI</th>
          <th>Level</th>
          <th>Add to Compare</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map(([city, aqi], index) => {
            const category = getCategory(aqi);
            return (
              <tr
                key={index}
                onClick={() =>
                  setCompare({
                    type: compare[city] ? "remove" : "add",
                    city,
                  })
                }
              >
                <td>{index}</td>
                <td>{capitalize(city)}</td>
                <td className="aqi">{aqi.toFixed(2)}</td>
                <td className={`aqi ${category}`}>{capitalize(category)}</td>
                <td>
                  <input type="checkbox" checked={compare[city]} />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>
              <div className="w-100 d-flex justify-center">Please wait...</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
});

export default AQITable;
