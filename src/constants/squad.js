export const getInitialSquadAttributes = () => ({
  clubs: {},
  leagues: {},
  nations: {},
  generalAttWorkRate: [],
  generalDefWorkRate: [],
  generalSkillMoves: 0,
  generalWeakFoot: 0,
  generalHeight: 0,
  positional: {
    ATT: {
      attWorkRate: [],
      defWorkRate: [],
      skillMoves: 0,
      weakFoot: 0
    },
    MID: {
      attWorkRate: [],
      defWorkRate: [],
      skillMoves: 0,
      weakFoot: 0
    },
    DEF: {
      attWorkRate: [],
      defWorkRate: [],
      skillMoves: 0,
      weakFoot: 0
    },
    GK: {
      attWorkRate: [],
      defWorkRate: [],
      skillMoves: 0,
      weakFoot: 0
    }
  }
})

export const getInitialSquadRatings = () => ({
  average: 0,
  PAC: 0,
  SHO: 0,
  PAS: 0,
  DRI: 0,
  DEF: 0,
  PHY: 0
})
