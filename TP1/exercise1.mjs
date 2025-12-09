"use strict";

export function fiboIt(n) {
    if (n < 0) return undefined;
    if (n === 0) return 0;
    if (n === 1) return 1;

    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        let next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

export function fiboRec(n) {
    if (n < 0) return undefined;
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fiboRec(n - 1) + fiboRec(n - 2);
}

export function fibonaArr(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(fiboRec(arr[i]));
    }
    return result;
}

export function fibonaMap(arr) {
    return arr.map(n => fiboRec(n));
}
