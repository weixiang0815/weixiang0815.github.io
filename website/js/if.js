{
    let x = 9;
    let y = 10;
    let z = 100;
    let a = z + ((x > y) ? x * y : x + y);
    console.log(a);
}

{
    let x = 3;
    let y = 9;
    let z = 7;
    // 若 (x > y) 成立則整行變成   let max = (x > z) ? x : z
    // 若 (x > y) 不成立則整行變成 let max = (y > z) ? y : z
    let max = (x > y) ? (x > z) ? x : z : (y > z) ? y : z;
    console.log(max);
    max = (x > y) ? ((x > z) ? x : z) : ((y > z) ? y : z);
    console.log(max);
}

{
    let opt = 'a'
    let str = ''
    switch (opt) {
        case 'a':
            str = '可樂'
            break
        case 'd':
            str = '鮮'
        case 'b':
            str += '奶茶'
            break
        case 'c':
            str = '檸檬紅茶'
            break
        default:
            str = '白開水'
            break
    }
    console.log(str)
}

{
    let i = 1
    while (i <= 10)
        console.log(i++)
}

{
    let i = 1
    do {
        console.log(i++)
    } while (i <= 10)
}