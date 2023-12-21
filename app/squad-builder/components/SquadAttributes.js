import { SQUAD_FORMATIONS_POSITIONS } from "../../../src/constants/formations"

export const SquadAttributes = ({ stateSetters }) => {
  const { state, setters } = stateSetters
  return (
    <>
    <div>
      <div className="flex flex-row squad-div-title-text justify-center">Squad Attributes</div>
    </div>
    <div className="mt-4">
        <h1 className="text-lg mb-2">Squad Name</h1>
        <input
          type="text"
          name="squadName"
          value={state.squadName}
          onChange={(e) => setters.setSquadName(e.target.value)}
          className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white"
        />
      </div>
      <div className="mt-4 flex">
        <div className="formation-div" style={{ width: '60%' }}>
          <h1 className="text-lg mb-2">Formation</h1>
          <select
            name="formation"
            value={state.formation}
            onChange={(e) => setters.setFormation(e.target.value)}
            className="border border-gray-700 rounded-md px-3 py-2 w-75 bg-gray-800 text-white"
          >
            {Object.keys(SQUAD_FORMATIONS_POSITIONS).map((formation) => (
              <option key={formation} value={formation}>
                {formation}
              </option>
            ))}
          </select>
        </div>
        <div className="rating-div " style={{ width: '40%' }}>
          <h1 className="text-lg mb-2">Squad Rating</h1>
          <p className='text-2xl flex flex-row justify-center items-center'>{state.squadRatings.average}</p>
        </div>
      </div>
      
      <table className="w-full">
        <tbody>
          {/* General */}
          <tr>
            <td colSpan="3" className="squad-attribute-type-text mt-2 mb-2">General</td>
          </tr>
          <tr>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">Skill Moves</div>
                <div className="squad-attributes-stats">{state.squadAttributes.generalSkillMoves}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">Weak Foot</div>
                <div className="squad-attributes-stats">{state.squadAttributes.generalWeakFoot}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">Height</div>
                <div className="squad-attributes-stats">{state.squadAttributes.generalHeight} cm</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">Att WR</div>
                <div className="squad-attributes-stats">{state.squadAttributes.generalAttWorkRate}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">Def WR</div>
                <div className="squad-attributes-stats">{state.squadAttributes.generalDefWorkRate}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="squad-attribute-type-text mt-2 mb-2">Clubs</td>
            <td className="squad-attribute-type-text mt-2 mb-2">Leagues</td>
            <td className="squad-attribute-type-text mt-2 mb-2">Nations</td>
          </tr>
          <tr className="text-sm">
            <td>
              <div className="flex flex-col items-center">
                {Object.keys(state.squadAttributes.clubs).map((club) => (
                  <div className="squad-attributes-stats-text" key={club}>{club}: {state.squadAttributes.clubs[club]}</div>
                ))}
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                {Object.keys(state.squadAttributes.leagues).map((league) => (
                  <div className="squad-attributes-stats-text" key={league}>{league}: {state.squadAttributes.leagues[league]}</div>
                ))}
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                {Object.keys(state.squadAttributes.nations).map((nation) => (
                  <div className="squad-attributes-stats-text" key={nation}>{nation}: {state.squadAttributes.nations[nation]}</div>
                ))}
              </div>
            </td>
          </tr>

          {/* Positional */}
          <tr>
            <td colSpan="3" className="squad-attribute-type-text mt-2 mb-2">Positional</td>
          </tr>
          <tr>
            <td>
              <div className="flex flex-col items-center">
                {/* ATT Data */}
                <div className="text-sm">ATT</div>
                <div className="squad-attributes-stats-text">Skill Moves</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.ATT.skillMoves}</div>
                <div className="squad-attributes-stats-text">Weak Foot</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.ATT.weakFoot}</div>
                <div className="squad-attributes-stats-text">Att WR</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.ATT.attWorkRate}</div>
                <div className="squad-attributes-stats-text">Def WR</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.ATT.defWorkRate}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                {/* MID Data */}
                <div className="text-sm">MID</div>
                <div className="squad-attributes-stats-text">Skill Moves</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.MID.skillMoves}</div>
                <div className="squad-attributes-stats-text">Weak Foot</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.MID.weakFoot}</div>
                <div className="squad-attributes-stats-text">Att WR</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.MID.attWorkRate}</div>
                <div className="squad-attributes-stats-text">Def WR</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.MID.defWorkRate}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                {/* DEF Data */}
                <div className="text-sm">DEF</div>
                <div className="squad-attributes-stats-text">Skill Moves</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.DEF.skillMoves}</div>
                <div className="squad-attributes-stats-text">Weak Foot</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.DEF.weakFoot}</div>
                <div className="squad-attributes-stats-text">Att WR</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.DEF.attWorkRate}</div>
                <div className="squad-attributes-stats-text">Def WR</div>
                <div className="squad-attributes-stats">{state.squadAttributes.positional.DEF.defWorkRate}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}