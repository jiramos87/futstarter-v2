import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import Image from 'next/image';

const CollapsibleSection = ({ title, content }) => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div>
      <div
        className="collapsible-squad-attributes"
        style={{
          width: '100%',
          cursor: 'pointer',
          position: 'relative',
          alignItems: 'center',
        }}
        onClick={toggleContent}
      >
        <div
          style={{
            position: 'absolute',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
            color: 'white',
            fontSize: '16px',
          }}
        >
          {showContent ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </div>
        <h1 className="squad-attributes-category-text">{title}</h1>
      </div>
      {showContent && (
        <div className="px-5 py-0" style={{ width: '100%' }}>
          {content}
        </div>
        )}
    </div>
  );
};

export const SquadAttributes = ({ stateSetters }) => {
  const { state } = stateSetters;

  return (
    <div>
      <div className="flex flex-row squad-div-title-text justify-start mb-4 p-2">
        SQUAD ATTRIBUTES
      </div>

      {/* Ratings */}
      <CollapsibleSection
        title="RATINGS"
        content={
          <div className="flex flex-col px-4" style={{ width: '100%', marginTop: '10px' }}>
            <div className="flex flex-row px-4">
              <div className="squad-attributes-stats-text">OVR</div>
              <p className="squad-attributes-stats">{state.squadRatings.average}</p>
            </div>
            <div className="flex flex-row px-4">
              <div className="squad-attributes-stats-text">PAC</div>
              <p className="squad-attributes-stats">{state.squadRatings.PAC}</p>
            </div>
            <div className="flex flex-row px-4">
              <div className="squad-attributes-stats-text">SHO</div>
              <p className="squad-attributes-stats">{state.squadRatings.SHO}</p>
            </div>
            <div className="flex flex-row px-4">
              <div className="squad-attributes-stats-text">PAS</div>
              <p className="squad-attributes-stats">{state.squadRatings.PAS}</p>
            </div>
            <div className="flex flex-row px-4">
              <div className="squad-attributes-stats-text">DRI</div>
              <p className="squad-attributes-stats">{state.squadRatings.DRI}</p>
            </div>
            <div className="flex flex-row px-4">
              <div className="squad-attributes-stats-text">DEF</div>
              <p className="squad-attributes-stats">{state.squadRatings.DEF}</p>
            </div>
            <div className="flex flex-row px-4">
              <div className="squad-attributes-stats-text">PHY</div>
              <p className="squad-attributes-stats">{state.squadRatings.PHY}</p>
            </div>    
            {/* Content to be displayed when the rating is clicked (open) */}
          </div>
        }
      />

      <CollapsibleSection
      title="GENERAL ATTRIBUTES"
      content={
        <table className="w-full">
        <tbody>
          {/* General */}
          <tr>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">SM</div>
                <div className="squad-attributes-stats">{state.squadAttributes.generalSkillMoves}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">WF</div>
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
        </tbody>
      </table>
      }
      />

      <CollapsibleSection
       title="CHEMISTRY"
        content={
          <div>
              {/* Clubs, Leagues, Nations */}
            <CollapsibleSection
              title="CLUBS"
              content={
                <div className="flex flex-col items-start squad-attributes-chem-stats-text">
                {Object.keys(state.squadAttributes.clubs).map((club) => (
                  <div className="flex flex-row w-full align-start" key={club}>
                    <div className="flex flex-row items-center">
                      <Image src={`/clubs/${state.squadAttributes.clubs[club].id}.png`} width={20} height={20} alt='club image' />
                      {club}:
                    </div>
                    <div className="ml-2 squad-attributes-chem-stats-values-text">
                      {state.squadAttributes.clubs[club].count}
                    </div>
                  </div>
                ))}
              </div>
              }
            />

            <CollapsibleSection
              title="LEAGUES"
              content={
                <div className="flex flex-col items-start squad-attributes-chem-stats-text">
                {Object.keys(state.squadAttributes.leagues).map((league) => (
                  <div className="flex flex-row w-full align-start" key={league}>
                    <div className="flex flex-row items-center">
                      <Image src={`/leagues/${state.squadAttributes.leagues[league].id}.png`} width={20} height={20} alt='league image' />
                      {league}:
                    </div>
                    <div className="ml-2 squad-attributes-chem-stats-values-text">
                      {state.squadAttributes.leagues[league].count}
                    </div>
                  </div>
                ))}
              </div>
              }
            />

              <CollapsibleSection
                title="NATIONS"
                content={
                  <div className="flex flex-col items-start squad-attributes-chem-stats-text">
                    {Object.keys(state.squadAttributes.nations).map((nation) => (
                      <div className="flex flex-row w-full align-start" key={nation}>
                        <div className="flex flex-row items-center">
                          <Image src={`/nations/${state.squadAttributes.nations[nation].id}.png`} width={20} height={20} alt='nation image' />
                          {nation}:
                        </div>
                        <div className="ml-2 squad-attributes-chem-stats-values-text">
                          {state.squadAttributes.nations[nation].count}
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
          </div>
        }
      />

      <CollapsibleSection
        title="POSITIONAL ATTRIBUTES"
        content={
          <table className="w-full">
            <tbody>
              {/* Positional */}
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
        }
      />
    </div>
  )
}