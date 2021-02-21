import Chart from "chart.js";
import React, { useEffect, useRef } from "react";
import moment from "moment";
export interface LineChartProps {
  label: string;
  data: { x: Date; y: number }[];
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const getChartData = (): Chart.ChartData => {
    return {
      labels: props.data.map((d) => moment(d.x).format("HH:mm:ss")),
      datasets: [
        {
          label: props.label,
          data: props.data.map((d) => d.y),
          fill: false,
          borderColor: "#a20a0a60",
          borderWidth: 1.5,
        },
      ],
    };
  };

  let chart = useRef<Chart>();
  useEffect(() => {
    if (chartRef.current) {
      chart.current = new Chart(chartRef.current, {
        type: "line",
        data: getChartData(),
        options: {
          animation: undefined,
          scales: {
            xAxes: [
              // {
              //   type: "time",
              //   time: {
              //     displayFormats: { second: "hh:mm:ss" },
              //   },
              // },
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMin: 200,
                },
              },
            ],
          },
        },
      });
    }

    return () => {
      chart.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (chart.current) {
      chart.current.data = getChartData();
      chart.current.update();
    }
  }, [props.data]);

  useEffect(() => {
    if (chart.current) {
      chart.current.data.datasets = [];
    }
  }, [props.label]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
