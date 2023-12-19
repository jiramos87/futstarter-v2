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
        borderWidth: 1
      }
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 10,
          showLabelBackdrop: true,
          backdropColor: "rgba(203, 197, 11, 1)",
          font: {
            size: 6
          }
        },
        pointLabels: {
            fontSize: 20
        },
        angleLines: {
          color: "rgba(255, 255, 255, .3)",
          lineWidth: 7
        },
        gridLines: {
          color: "rgba(166, 245, 39, 0.8)",
          circular: false
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
