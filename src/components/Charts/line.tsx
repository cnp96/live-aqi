import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export interface LineChartProps {
  labels: string[];
  data: Record<string, { x: Date; y: number }[]>;
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  let chart: Chart;
  const getDataSets = (data: LineChartProps["data"]) => {
    return Object.entries(data).map(([city, data]) => {
      return {
        label: city,
        data,
      };
    });
  };

  useEffect(() => {
    if (chartRef.current) {
      chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          datasets: getDataSets(props.data),
        },
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: "rgb(255, 99, 132)",
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    console.log("data received", props.data);

    if (chart) {
      chart.data.datasets = getDataSets(props.data);
      console.log("chart updated");

      chart.update();
    }
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
