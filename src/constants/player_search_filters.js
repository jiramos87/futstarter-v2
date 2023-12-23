export const PREMIER_LEAGUE_CLUBS = [
  'Arsenal',
  'Aston Villa',
  'Bournemouth',
  'Brighton',
  'Burnley',
  'Chelsea',
  'Crystal Palace',
  'Everton',
  'Leicester',
  'Liverpool',
  'Manchester City',
  'Manchester United',
  'Newcastle',
  'Norwich',
  'Sheffield United',
  'Southampton',
  'Tottenham',
  'Watford',
  'West Ham',
  'Wolves'
]

export const LA_LIGA_CLUBS = [
  'Athletic Club',
  'Atlético de Madrid',
  'CA Osasuna',
  'Cádiz CF',
  'D. Alavés',
  'FC Barcelona',
  'Getafe CF',
  'Girona FC',
  'Granada CF',
  'Rayo Vallecano',
  'RC Celta',
  'RCD Mallorca',
  'Real Betis',
  'Real Madrid',
  'Real Sociedad',
  'Sevilla FC',
  'UD Almería',
  'UD Las Palmas',
  'Valencia CF',
  'Villarreal CF'
]

export const SERIE_A_CLUBS = [
  'Bergamo Calcio',
  'Bologna',
  'Cagliari',
  'Empoli',
  'Fiorentina',
  'Genoa',
  'Hellas Verona',
  'Inter',
  'Juventus',
  'Latium',
  'Lecce',
  'Milan',
  'Monza',
  'Napoli FC',
  'Roma FC',
  'Salernitana',
  'Sassuolo',
  'Torino',
  'Udinese'
]

export const BUNDESLIGA_CLUBS = []

export const LIGUE_1_CLUBS = []

export const EREDIVISIE_CLUBS = []

export const LIGA_NOS_CLUBS = []

export const CSL_CLUBS = []

export const MLS_CLUBS = []

export const SAUDI_PRO_LEAGUE_CLUBS = []

export const LEAGUES = [
  'Premier League',
  'LaLiga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Eredivisie',
  'Liga NOS',
  'CSL',
  'MLS',
  'Saudi Pro League'
]

export const LEAGUE_CLUBS = {
  'Premier League': PREMIER_LEAGUE_CLUBS,
  'LaLiga': LA_LIGA_CLUBS,
  'Serie A': SERIE_A_CLUBS,
  'Bundesliga': BUNDESLIGA_CLUBS,
  'Ligue 1': LIGUE_1_CLUBS,
  'Eredivisie': EREDIVISIE_CLUBS,
  'Liga NOS': LIGA_NOS_CLUBS,
  'CSL': CSL_CLUBS,
  'MLS': MLS_CLUBS,
  'Saudi Pro League': SAUDI_PRO_LEAGUE_CLUBS
}

export const COMMON_NATIONS = [
  'Argentina',
  'Brazil',
  'England',
  'France',
  'Germany',
  'Italy',
  'Netherlands',
  'Portugal',
  'Spain'
]

export const POSITIONS = [
  'GK',
  'Defenders',
  'Midfielders',
  'Attackers',
  'CB',
  'LB',
  'LWB',
  'RB',
  'RWB',
  'CDM',
  'CM',
  'CAM',
  'CF',
  'LF',
  'RF',
  'ST',
  'LW',
  'RW',
  'LM',
  'RM'
]

export const getInitialPlayerSearchFilters = () => ({
  league: '',
  club: '',
  nation: '',
  position: '',
  minRating: 0,
  maxRating: 99,
  minPrice: 0,
  maxPrice: 15000000,
  minPAC: 0,
  maxPAC: 99,
  minSHO: 0,
  maxSHO: 99,
  minPAS: 0,
  maxPAS: 99,
  minDRI: 0,
  maxDRI: 99,
  minDEF: 0,
  maxDEF: 99,
  minPHY: 0,
  maxPHY: 99,
  minSkillMoves: 1,
  maxSkillMoves: 5,
  minWeakFoot: 1,
  maxWeakFoot: 5,
  minHeight: 0,
  maxHeight: 99
})

export const SKILL_MOVES = [
  1,
  2,
  3,
  4,
  5
]

export const WEAK_FOOT = [
  1,
  2,
  3,
  4,
  5
]
