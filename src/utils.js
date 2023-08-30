const cancelCamelCase = (str = '') => {
    return str.replace(
        /([a-z])([A-Z])/g,
        (_, g1, g2) => `${g1} ${g2.toLowerCase()}`
    )
}

const capitalize = (str) => {
    if (!str) {
        return ''
    }

    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
}

const paginate = (items, size, page) => {
    return items
        .slice()
        .splice((page - 1) * size, size)
}

export { cancelCamelCase, capitalize, paginate }
