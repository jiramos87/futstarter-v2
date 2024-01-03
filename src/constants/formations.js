const TOP_GK_LINE_2 = '90%'
const TOP_FIRST_LINE = '86%'
const TOP_CB_LINE_2 = '72%'
const TOP_SECOND_LINE = '66%'
const TOP_THIRD_LINE = '46%'
const TOP_DM_LINE = '44%'
const TOP_FOURTH_LINE = '41%'
const TOP_CAM_LINE = '31%'
const TOP_FIFTH_LINE = '17%'
const TOP_ST_LINE_2 = '12%'
const TOP_CST_LINE = '10%'

const LEFT_FIRST_COLUMN = '26%'
const LEFT_SECOND_COLUMN = '28%'
const LEFT_THIRD_COLUMN = '33%'
const LEFT_FOURTH_COLUMN = '36%'
const LEFT_LCM_COLUMN = '40%'
const LEFT_FIFTH_COLUMN = '42%'
const LEFT_LDM_COLUMN = '44%'
const LEFT_SIXTH_COLUMN = '50%'
const LEFT_RDM_COLUMN = '56%'
const LEFT_SEVENTH_COLUMN = '58%'
const LEFT_RCM_COLUMN = '61%'
const LEFT_EIGHTH_COLUMN = '64%'
const LEFT_NINTH_COLUMN = '67%'
const LEFT_TENTH_COLUMN = '72%'
const LEFT_ELEVENTH_COLUMN = '73%'

export const SQUAD_FORMATIONS_POSITIONS = {
  '4-4-2': [
    { name: 'GK', position: { top: TOP_FIRST_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'RB', position: { top: TOP_SECOND_LINE, left: LEFT_TENTH_COLUMN } },
    { name: 'RCB', position: { top: TOP_SECOND_LINE, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LCB', position: { top: TOP_SECOND_LINE, left: LEFT_FIFTH_COLUMN } },
    { name: 'LB', position: { top: TOP_SECOND_LINE, left: LEFT_SECOND_COLUMN } },
    { name: 'RM', position: { top: TOP_FOURTH_LINE, left: LEFT_TENTH_COLUMN } },
    { name: 'RCM', position: { top: TOP_FOURTH_LINE, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LCM', position: { top: TOP_FOURTH_LINE, left: LEFT_FIFTH_COLUMN } },
    { name: 'LM', position: { top: TOP_FOURTH_LINE, left: LEFT_SECOND_COLUMN } },
    { name: 'RST', position: { top: TOP_FIFTH_LINE, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LST', position: { top: TOP_FIFTH_LINE, left: LEFT_FIFTH_COLUMN } } 
  ],
  '4-2-2-2': [
    { name: 'GK', position: { top: TOP_GK_LINE_2, left: LEFT_SIXTH_COLUMN } },
    { name: 'RB', position: { top: TOP_SECOND_LINE, left: LEFT_TENTH_COLUMN } },
    { name: 'RCB', position: { top: TOP_SECOND_LINE, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LCB', position: { top: TOP_SECOND_LINE, left: LEFT_FIFTH_COLUMN } },
    { name: 'LB', position: { top: TOP_SECOND_LINE, left: LEFT_SECOND_COLUMN } },
    { name: 'RDM', position: { top: TOP_DM_LINE, left: LEFT_LDM_COLUMN } },
    { name: 'LDM', position: { top: TOP_DM_LINE, left: LEFT_RDM_COLUMN } },
    { name: 'RCAM', position: { top: TOP_CAM_LINE, left: LEFT_NINTH_COLUMN } },
    { name: 'LCAM', position: { top: TOP_CAM_LINE, left: LEFT_THIRD_COLUMN } },
    { name: 'RST', position: { top: TOP_ST_LINE_2, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LST', position: { top: TOP_ST_LINE_2, left: LEFT_FIFTH_COLUMN } }
  ],
  '4-2-3-1': [
    { name: 'GK', position: { top: TOP_FIRST_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'RB', position: { top: TOP_SECOND_LINE, left: LEFT_TENTH_COLUMN } },
    { name: 'RCB', position: { top: TOP_SECOND_LINE, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LCB', position: { top: TOP_SECOND_LINE, left: LEFT_FIFTH_COLUMN } },
    { name: 'LB', position: { top: TOP_SECOND_LINE, left: LEFT_SECOND_COLUMN } },
    { name: 'RDM', position: { top: TOP_DM_LINE, left: LEFT_LDM_COLUMN } },
    { name: 'LDM', position: { top: TOP_DM_LINE, left: LEFT_RDM_COLUMN } },
    { name: 'RCAM', position: { top: TOP_CAM_LINE, left: LEFT_NINTH_COLUMN } },
    { name: 'CAM', position: { top: TOP_CAM_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'LCAM', position: { top: TOP_CAM_LINE, left: LEFT_THIRD_COLUMN } },
    { name: 'ST', position: { top: TOP_CST_LINE, left: LEFT_SIXTH_COLUMN } }
  ],
  '4-3-3': [
    { name: 'GK', position: { top: TOP_FIRST_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'RB', position: { top: TOP_SECOND_LINE, left: LEFT_TENTH_COLUMN } },
    { name: 'RCB', position: { top: TOP_SECOND_LINE, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LCB', position: { top: TOP_SECOND_LINE, left: LEFT_FIFTH_COLUMN } },
    { name: 'LB', position: { top: TOP_SECOND_LINE, left: LEFT_SECOND_COLUMN } },
    { name: 'RCM', position: { top: TOP_FOURTH_LINE, left: LEFT_EIGHTH_COLUMN } },
    { name: 'CCM', position: { top: TOP_FOURTH_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'LCM', position: { top: TOP_FOURTH_LINE, left: LEFT_FOURTH_COLUMN } },
    { name: 'RW', position: { top: TOP_FIFTH_LINE, left: LEFT_NINTH_COLUMN } },
    { name: 'ST', position: { top: TOP_FIFTH_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'LW', position: { top: TOP_FIFTH_LINE, left: LEFT_THIRD_COLUMN } }
  ],
  '4-3-2-1': [
    { name: 'GK', position: { top: TOP_FIRST_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'RB', position: { top: TOP_SECOND_LINE, left: LEFT_TENTH_COLUMN } },
    { name: 'RCB', position: { top: TOP_SECOND_LINE, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LCB', position: { top: TOP_SECOND_LINE, left: LEFT_FIFTH_COLUMN } },
    { name: 'LB', position: { top: TOP_SECOND_LINE, left: LEFT_SECOND_COLUMN } },
    { name: 'RCM', position: { top: TOP_FOURTH_LINE, left: LEFT_EIGHTH_COLUMN } },
    { name: 'CCM', position: { top: TOP_FOURTH_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'LCM', position: { top: TOP_FOURTH_LINE, left: LEFT_FOURTH_COLUMN } },
    { name: 'RF', position: { top: TOP_FIFTH_LINE, left: LEFT_RCM_COLUMN } },
    { name: 'ST', position: { top: TOP_ST_LINE_2, left: LEFT_SIXTH_COLUMN } },
    { name: 'LF', position: { top: TOP_FIFTH_LINE, left: LEFT_LCM_COLUMN } }
  ],
  '3-4-3': [
    { name: 'GK', position: { top: TOP_FIRST_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'RCB', position: { top: TOP_SECOND_LINE, left: LEFT_NINTH_COLUMN } },
    { name: 'CCB', position: { top: TOP_SECOND_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'LCB', position: { top: TOP_SECOND_LINE, left: LEFT_THIRD_COLUMN } },
    { name: 'RM', position: { top: TOP_FOURTH_LINE, left: LEFT_TENTH_COLUMN } },
    { name: 'RCM', position: { top: TOP_FOURTH_LINE, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LCM', position: { top: TOP_FOURTH_LINE, left: LEFT_FIFTH_COLUMN } },
    { name: 'LM', position: { top: TOP_FOURTH_LINE, left: LEFT_SECOND_COLUMN } },
    { name: 'RW', position: { top: TOP_FIFTH_LINE, left: LEFT_EIGHTH_COLUMN } },
    { name: 'ST', position: { top: TOP_FIFTH_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'LW', position: { top: TOP_FIFTH_LINE, left: LEFT_FOURTH_COLUMN } }
  ],
  '3-4-1-2': [
    { name: 'GK', position: { top: TOP_GK_LINE_2, left: LEFT_SIXTH_COLUMN } },
    { name: 'RCB', position: { top: TOP_CB_LINE_2, left: LEFT_NINTH_COLUMN } },
    { name: 'CCB', position: { top: TOP_SECOND_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'LCB', position: { top: TOP_CB_LINE_2, left: LEFT_THIRD_COLUMN } },
    { name: 'RM', position: { top: TOP_FOURTH_LINE, left: LEFT_TENTH_COLUMN } },
    { name: 'RCM', position: { top: TOP_THIRD_LINE, left: LEFT_RCM_COLUMN } },
    { name: 'LCM', position: { top: TOP_THIRD_LINE, left: LEFT_LCM_COLUMN } },
    { name: 'LM', position: { top: TOP_FOURTH_LINE, left: LEFT_SECOND_COLUMN } },
    { name: 'CAM', position: { top: TOP_CAM_LINE, left: LEFT_SIXTH_COLUMN } },
    { name: 'RST', position: { top: TOP_ST_LINE_2, left: LEFT_SEVENTH_COLUMN } },
    { name: 'LST', position: { top: TOP_ST_LINE_2, left: LEFT_FIFTH_COLUMN } },
  ]
}