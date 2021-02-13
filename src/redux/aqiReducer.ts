export interface IAQIData {
  city: string;
  aqi: number;
}

export type Action = { type: "update"; payload: IAQIData[] };
export type TCityData = Record<string, number>;

export const aqiReducer = (state: TCityData, action: Action) => {
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
