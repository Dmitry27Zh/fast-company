const cancelCamelCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, (_, g1, g2) => `${g1} ${g2.toLowerCase()}`)
}

const capitalize = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
}

export { cancelCamelCase, capitalize }
