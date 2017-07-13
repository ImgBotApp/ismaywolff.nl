export const truncate = (string, characterLimit) => {
  if (string.length < characterLimit) {
    return string
  }

  return `${string.substring(0, characterLimit)}…`
}
