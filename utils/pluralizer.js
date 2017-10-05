export default function pluralizeNoun (count, nounFormOne, nounFormTwo, nounFormThree) {
  count = Math.abs(count)
  count %= 100
  if (count >= 5 && count <= 20) {
    return nounFormThree
  }
  count %= 10
  if (count === 1) {
    return nounFormOne
  }
  if (count >= 2 && count <= 4) {
    return nounFormTwo
  }
  return nounFormThree
}
