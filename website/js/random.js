{
    let i = 1
    while (i++ <= 20) {
        let r = Math.random()
        r *= 6
        r = Math.floor(r)
        r++
        console.log(r)
    }
}

function RandomInt(start, end) {
    if (typeof(start * 1) === NaN) return null
    if (typeof(end * 1) === NaN) return null
    let min = (start > end) ? start : end
    let max = (start < end) ? start : end
    let n = max - min + 1
    let r = Math.random()
    r = Math.floor(r)
    r += min
    return r
}

do {
    r = RandomInt(1, 6)
    console.log(r)
} while (r != 6)