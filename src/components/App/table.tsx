import { capitalize } from "lodash";
import * as React from "react";
import { TCityData } from "../../redux/aqiReducer";
import { formatTime } from "../../util/common";
export interface AQITableProps {
  data: TCityData;
  onChange?: (city?: string) => void;
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

const AQITable: React.FC<AQITableProps> = React.memo((props) => {
  const [selectedCity, setCity] = React.useState<string>();

  const onCitySelection = (city: string) => {
    const newCity = selectedCity === city ? undefined : city;
    setCity(newCity);
    props.onChange && props.onChange(newCity);
  };

  const { data } = props;
  const tdata = Object.entries(data);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>City</th>
          <th>Current AQI</th>
          <th>Last Updated</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tdata.length ? (
          tdata.map(([city, meta], index) => {
            const category = getCategory(meta.aqi);
            return (
              <tr key={index} className={city === selectedCity ? "active" : ""}>
                <td>{index}</td>
                <td>{capitalize(city)}</td>
                <td className={`aqi ${category}`}>{meta.aqi.toFixed(2)}</td>
                <td>{formatTime(meta.lastUpdated)}</td>
                <td>
                  <button onClick={() => onCitySelection(city)}>
                    {selectedCity === city ? "Clear selection" : "Live Chart"}
                  </button>
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
