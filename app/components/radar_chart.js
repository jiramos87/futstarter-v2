import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { handleAddPlayerToCompareClick } from '../squad-builder/helper'
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

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
        max: 99,
        stepSize: 10,
        showLabelBackdrop: false,
        font: {
          size: 18
        }
      },
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

export const RadarChart = ({ radarData, stateSetters }) => {
  const { setters } = stateSetters

  return (
    <div>
      <button
        className="relative top-0 right-0 bg-blue-600 text-white px-2 py-1 hover:bg-blue-700"
        onClick={() => handleAddPlayerToCompareClick(stateSetters)}
      >
        Add Player
      </button>

      {radarData && (
        <Radar ref={React.createRef()} data={radarData} options={radarOptions} />
      )}
    </div>
  )
}
