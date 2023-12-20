export const capitalizeString = (string) => (string.charAt(0).toUpperCase() + string.slice(1))

export const capitalizeSentence = (sentence, separationChar, joinChar) => {
  const words = sentence.trim().split(separationChar)

  const capitalizedWords = words.map(capitalizeString)

  const capitalizedSentence = capitalizedWords.join(joinChar)

  return capitalizedSentence
}

export const getStringWithLetterVariations = (string) => {
  const regexPattern = string
    .replace(/e/g, '[eèéêëēę]')
    .replace(/a/g, '[aàáâãäåā]')
    .replace(/o/g, '[oòóôõöøō]')
    .replace(/u/g, '[uùúûüū]')
    .replace(/i/g, '[iìíîïī]')
    .replace(/c/g, '[cçćč]')
    .replace(/s/g, '[sśš]')
    .replace(/n/g, '[nñń]')
    .replace(/l/g, '[lł]')
    .replace(/z/g, '[zžźż]')
    .replace(/y/g, '[yýÿ]')
    .replace(/d/g, '[dðď]')
    .replace(/r/g, '[rřŕ]')
    .replace(/t/g, '[tťţ]')
    .replace(/g/g, '[gğ]')
    .replace(/ss/g, '[ssß]')
    .replace(/ae/g, '[aeæ]')
    .replace(/oe/g, '[oeœ]')

  return regexPattern
}

export const parseHeight = (heightString) => {
  const regex = /(\d+)cm/
  const match = heightString.match(regex)
  if (match && match[1]) {
    return parseInt(match[1], 10)
  }
  return null
}
