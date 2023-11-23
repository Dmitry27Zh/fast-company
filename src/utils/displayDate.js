export function displayDate(data) {
    const date = new Date(parseInt(data))
    const dateNow = new Date()
    const yearDiff = dateNow.getFullYear() - data.getFullYear()

    if (yearDiff === 0) {
        const dayDiff = dateNow.getDate() - date.getDate()

        if (dayDiff === 0) {
            const hourDiff = dateNow.getHours() - date.getHours()

            if (hourDiff) {
                const minutesDiff = dateNow.getMinutes() - date.getMinutes()

                if (minutesDiff >= 0 && minutesDiff < 5) {
                    return '1 минуту назад'
                } else if (minutesDiff < 10) {
                    return '5 минут назад'
                } else if (minutesDiff < 30) {
                    return '10 минут назад'
                } else {
                    return '30 минут назад'
                }
            } else {
                return `${date.getHours()}:${date.getMinutes()}`
            }
        } else {
            return `${date.getDate()} ${date.toLocaleString('default', {
                month: 'long'
            })}`
        }
    } else {
        return `${date.getFullYear()}.${date.getMonth() + 1}_${date.getDate()}`
    }
}
