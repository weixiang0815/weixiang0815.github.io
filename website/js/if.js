{
    let x = 9;
    let y = 10;
    let z = 100;
    let a = z + ((x > y) ? x * y : x + y);
    console.log(a);
}

{
    let x = 3
    let y = 9
    let z = 7
        // 若 (x > y) 成立則整行變成   let max = (x > z) ? x : z
        // 若 (x > y) 不成立則整行變成 let max = (y > z) ? y : z
    let max = (x > y) ? (x > z) ? x : z : (y > z) ? y : z
    console.log(max)
    max = (x > y) ? ((x > z) ? x : z) : ((y > z) ? y : z)
    console.log(max)
}