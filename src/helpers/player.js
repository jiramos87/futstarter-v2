export const parsePlayerPosition = (playerPosition) => {
  if (!playerPosition) return null

  if (['LST', 'RST', 'ST'].includes(playerPosition)) return 'ST'
  if (['LF', 'RF', 'CF'].includes(playerPosition)) return 'CF'
  if (['LCAM', 'RCAM', 'CAM'].includes(playerPosition)) return 'CAM'
  if (['LCM', 'RCM', 'CCM', 'CM'].includes(playerPosition)) return 'CM'
  if (['LDM', 'RDM', 'CCDM', 'CDM'].includes(playerPosition)) return 'CDM'
  if (['LCB', 'RCB', 'CCB', 'CB'].includes(playerPosition)) return 'CB'
  
  return playerPosition
}
