import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export interface LineChartProps {}

const LineChart: React.FC<LineChartProps> = (props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  let chart;
  useEffect(() => {
    if (chartRef.current) {
      chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: ["Mumbai"],
          datasets: [
            {
              label: "Test",
              data: [
                { x: new Date(), y: 20 },
                { x: new Date(), y: 21 },
                { x: new Date(), y: 10 },
                { x: new Date(), y: 15 },
                { x: new Date(), y: 27 },
                { x: new Date(), y: 29 },
                { x: new Date(), y: 30 },
                { x: new Date(), y: 40 },
                { x: new Date(), y: 290 },
              ],
            },
          ],
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

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
