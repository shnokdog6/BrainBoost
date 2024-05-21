export const formatTime = (() => {
    const formatter = Intl.NumberFormat(navigator.language, {
        minimumIntegerDigits: 2
    })

    return function (minutes: number, seconds: number) {
        return `${formatter.format(minutes)}:${formatter.format(seconds)}`
    }
})();