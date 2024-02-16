export const isLoadingNeed = (lastFetch) => {
    const isOutdated = () => {
        return (Date.now() - lastFetch) > 10000
    }

    return !lastFetch || isOutdated(lastFetch)
}
