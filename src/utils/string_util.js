export const capitalizeString = (string) => (string.charAt(0).toUpperCase() + string.slice(1))

export const capitalizeSentence = (sentence, separationChar, joinChar) => {
  const words = sentence.trim().split(separationChar)

  const capitalizedWords = words.map(capitalizeString)

  const capitalizedSentence = capitalizedWords.join(joinChar)

  return capitalizedSentence
}
