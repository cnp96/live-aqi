export interface IAQIData {
  city: string;
  aqi: number;
}

export type Action = { type: "update"; payload: IAQIData[] };
export type TCityData = Record<string, { aqi: number; lastUpdated: Date }>;

export const aqiReducer = (state: TCityData, action: Action) => {
  switch (action.type) {
    case "update":
      const now = new Date();
      const { payload } = action;
      for (let data of payload) {
        state[data.city] = {
          aqi: data.aqi,
          lastUpdated: now,
        };
      }
      return { ...state };
    default:
      return state;
  }
};
