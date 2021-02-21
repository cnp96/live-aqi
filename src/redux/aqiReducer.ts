export interface IAQIData {
  city: string;
  aqi: number;
}

export type TAQIAction = { type: "update"; payload: IAQIData[] };
export type TCityData = Record<string, { aqi: number; lastUpdated: Date }>;

export const aqiReducer = (state: TCityData, action: TAQIAction) => {
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

export type TAQIHistoryAction =
  | { type: "add"; payload: number }
  | { type: "clear" };
export type TAQIHistory = { x: Date; y: number }[];
export const aqiHistoryReducer = (
  state: TAQIHistory,
  action: TAQIHistoryAction
) => {
  switch (action.type) {
    case "add":
      const newState = [
        ...state,
        { x: new Date(), y: parseFloat(action.payload.toFixed(2)) },
      ];
      if (newState.length > 20) {
        newState.shift();
      }
      return newState;
    case "clear":
      return [];
    default:
      return state;
  }
};
