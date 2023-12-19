import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2'
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


export const RadarChart = ({ radarData }) => {
  const radarOptions = {
    maintainAspectRation: true,
    elements: {
      line: {
        borderWidth: 4
      }
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 10,
          showLabelBackdrop: false,
          // backdropColor: "rgba(203, 197, 11, 1)",
          font: {
            size: 18
          }
        },
        // pointLabels: {
        //     fontSize: 20
        // },
        angleLines: {
          color: "rgba(230, 244, 208, 0.19)",
          lineWidth: 2
        },
        gridLines: {
          color: "rgba(166, 245, 39, 0.8)",
          circular: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 15
          },
          color: "rgba(230, 244, 208, 1)"
        }
      }
    }
  }

  return (
    <div>
      <h2>Comparing</h2>
      {radarData && (
        <Radar ref={React.createRef()} data={radarData} options={radarOptions} />
      )}
    </div>
  )
}
