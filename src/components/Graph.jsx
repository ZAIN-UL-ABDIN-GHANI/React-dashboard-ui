import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Graph = ({ data }) => {
  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#00D9E9",
    "#3B82F6",
  ];

  const [chartData, setChartData] = useState({
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        data: [0, 1, 2, 3, 4, 5, 6],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        barThickness: 45,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            return `Result: ${context.parsed.y}`;
          },
        },
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: colors,
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
          color: "#666",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
  };

  useEffect(() => {
    if (data && data.weekly_registrations) {
      setChartData({
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            data: [
              data.weekly_registrations.Sunday || 0,
              data.weekly_registrations.Monday || 0,
              data.weekly_registrations.Tuesday || 0,
              data.weekly_registrations.Wednesday || 0,
              data.weekly_registrations.Thursday || 0,
              data.weekly_registrations.Friday || 0,
              data.weekly_registrations.Saturday || 0,
            ],
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
            barThickness: 45,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div style={{ height: "250px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Graph;
