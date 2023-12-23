import {
  PACE_ATTRIBUTES,
  SHOOTING_ATTRIBUTES,
  PASSING_ATTRIBUTES,
  DRIBBLING_ATTRIBUTES,
  DEFENDING_ATTRIBUTES,
  PHYSICAL_ATTRIBUTES
} from '../../../src/constants/player_attributes'

const getProgressBarColor = (value) => {
  let color = 'red'
  if (value > 85) {
    color = 'green'
  } else if (value >= 80 && value <= 85) {
    color = 'lightgreen'
  } else if (value >= 50 && value <= 80) {
    color = 'yellow'
  }
  return color
}

export const PlayerDetailedStatistics = ({ stateSetters }) => {
  const { state } = stateSetters
  const { selectedPlayer } = state

  return (
    <div className="flex flex-col player-attributes-detailed-stats-text player-attributes-detailed-stats">
      <div className="flex flex-row justify-center squad-div-title-text">
        {selectedPlayer && (selectedPlayer.name)}
      </div>
      <div className="grid col-auto gap-4 grid-cols-2 mb-5">
        <div className="flex flex-col ">
          <div className="squad-attributes-stats-text">Pace</div>
          <hr className="border-gray-400 border-1" />
          {Object.keys(PACE_ATTRIBUTES).map((attribute) => (
            <div className="flex flex-col " key={attribute}>
              <div className="flex justify-between mb-2">
                <span>{PACE_ATTRIBUTES[attribute]}</span>
                <span>{selectedPlayer[attribute]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${selectedPlayer[attribute]}%`, backgroundColor: getProgressBarColor(selectedPlayer[attribute])}}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col ">
          <div className="squad-attributes-stats-text">Shooting</div>
          <hr className="border-gray-400 border-1" />
          {Object.keys(SHOOTING_ATTRIBUTES).map((attribute) => (
            <div className="flex flex-col " key={attribute}>
              <div className="flex justify-between mb-2">
                <span>{SHOOTING_ATTRIBUTES[attribute]}</span>
                <span>{selectedPlayer[attribute]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${selectedPlayer[attribute]}%`, backgroundColor: getProgressBarColor(selectedPlayer[attribute])}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid col-auto gap-4 grid-cols-2 mb-5">
        <div className="flex flex-col ">
          <div className="squad-attributes-stats-text">Passing</div>
          <hr className="border-gray-400 border-1" />
          {Object.keys(PASSING_ATTRIBUTES).map((attribute) => (
            <div className="flex flex-col " key={attribute}>
              <div className="flex justify-between mb-2">
                <span>{PASSING_ATTRIBUTES[attribute]}</span>
                <span>{selectedPlayer[attribute]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${selectedPlayer[attribute]}%`, backgroundColor: getProgressBarColor(selectedPlayer[attribute])}}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col ">
          <div className="squad-attributes-stats-text">Dribbling</div>
          <hr className="border-gray-400 border-1" />
          {Object.keys(DRIBBLING_ATTRIBUTES).map((attribute) => (
            <div className="flex flex-col " key={attribute}>
              <div className="flex justify-between mb-2">
                <span>{DRIBBLING_ATTRIBUTES[attribute]}</span>
                <span>{selectedPlayer[attribute]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${selectedPlayer[attribute]}%`, backgroundColor: getProgressBarColor(selectedPlayer[attribute])}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid col-auto gap-4 grid-cols-2 mb-5">
        <div className="flex flex-col ">
          <div className="squad-attributes-stats-text">Defending</div>
          <hr className="border-gray-400 border-1" />
          {Object.keys(DEFENDING_ATTRIBUTES).map((attribute) => (
            <div className="flex flex-col " key={attribute}>
              <div className="flex justify-between mb-2">
                <span>{DEFENDING_ATTRIBUTES[attribute]}</span>
                <span>{selectedPlayer[attribute]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${selectedPlayer[attribute]}%`, backgroundColor: getProgressBarColor(selectedPlayer[attribute])}}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col ">
          <div className="squad-attributes-stats-text">Physical</div>
          <hr className="border-gray-400 border-1" />
          {Object.keys(PHYSICAL_ATTRIBUTES).map((attribute) => (
            <div className="flex flex-col " key={attribute}>
              <div className="flex justify-between mb-2">
                <span>{PHYSICAL_ATTRIBUTES[attribute]}</span>
                <span>{selectedPlayer[attribute]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${selectedPlayer[attribute]}%`, backgroundColor: getProgressBarColor(selectedPlayer[attribute])}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
