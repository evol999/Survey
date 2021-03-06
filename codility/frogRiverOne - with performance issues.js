// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(X, A) {
    // write your code in JavaScript (Node.js 8.9.4)
    const firstIndexOfX = A.findIndex(e => e === X);//firstIndexOfElement(0, X, A);
    if (firstIndexOfX === -1) {
        return -1;
    }

    const perfectArithSeq = arithSeqArray(1, X);
//    const firstPart = A.slice(0, firstIndexOfX + 1);
    let arrayIndexOfMissings = perfectArithSeq.filter(el => A.slice(0, firstIndexOfX + 1).indexOf(el) < 0)
                                .map(el => A.findIndex((v, i) => v === el && i >= firstIndexOfX + 1));

    if (arrayIndexOfMissings.length === 0) {
        return firstIndexOfX;
    } else {
        arrayIndexOfMissings = arrayIndexOfMissings.sort((a, b) => a-b);
        return arrayIndexOfMissings[arrayIndexOfMissings.length-1];
    }

}
const arithSeqArray = (min, max) => (new Array(max-min+1)).join(',').split(',').map((v, i) => min + i);    

const firstIndexOfElement = (startPos, element, array) => {
/* findind the first inde   x of an element starting from a start position */
    return array.findIndex((e, i) => e === element && i >= startPos);
}
console.log(solution(2, [2, 2, 2, 2, 2])); // return -1
console.log(solution(9, [2,3,4,1,5,4,6,7,9,3,2,8,4,9,6])); // return 11
console.log(solution(9, [2,3,4,1,1,4,6,7,9,3,2,8,4,9,6,7,8,5,3,9,7,2])); // return 17
console.log(solution(5, [1,3,1,4,2,3,5,4])); // return: 6 
console.log(solution(5, [1,3,5,4,2,5,5,4])); // return: 4
console.log(solution(1, [1])); // return: 0
console.log(solution(6, [1,3,5,4,2,3,5,4,6])); // return: 8
console.log(solution(7, [1,3,5,7,2,6,4,4,3])); // return: 6
console.log(solution(3, [1,2,2,2,2,2,2,3,2])); // return: 7
console.log(solution(3, [1, 3, 1, 3, 2, 1, 3])); // return: 4
console.log(solution(5, [1, 3, 1, 3, 5, 1, 2, 4, 5])); // return: 7
console.log(solution(60,
   [1,2,3,4,5,6,7,8,9,9,11,12,13,14,14,16,17,18,18,20,21,22,23,24,25,26,27,28,29,30,31,
    32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,
    1,1,2,3,4,5,6,7,7,9,9,11,12,13,14,14,16,17,18,18,20,21,22,23,24,25,26,27,28,29,30,31,
    32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,
    59,60,2,3,4,5,6,7,7,9,9,60,12,13,10,7,16,17,17,19,20,19,22,23,15,25,26,27,28,
    29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,
    59,60])); //143
console.log(solution(59, [8, 50, 28, 13, 15, 47, 23, 40, 48, 11, 26, 41, 17, 22, 24, 27, 37, 56, 
    32, 10, 3, 57, 53, 2, 58, 43, 42, 19, 14, 14, 29, 34, 54, 49, 59, 33, 45, 4, 5, 55, 16, 38, 
    36, 35, 20, 39, 18, 12, 30, 52, 9, 31, 44, 46, 7, 51, 1, 21, 6,55, 19, 48, 18, 50, 20, 54, 
    14, 14, 11, 22, 10, 29, 49, 35, 39, 4, 8, 13, 52, 1, 34, 59, 31, 36, 42, 2, 30, 32, 45, 57, 
    41, 12, 47, 33, 37, 44, 17, 7, 40, 28, 15, 51, 27, 3, 56, 5, 6, 9, 43, 23, 21, 38, 58, 16, 
    53, 46, 24, 26,18, 33, 14, 45, 10, 32, 59, 26, 54, 3, 4, 46, 6, 52, 38, 37, 12, 34, 44, 35, 
    24, 27, 15, 2, 30, 41, 13, 19, 17, 58, 42, 36, 5, 56, 49, 50, 31, 23, 48, 21, 40, 51, 9, 8, 
    43, 57, 55, 7, 16, 28, 20, 53, 47, 11, 1, 22, 29, 14, 39, 38, 57, 51, 46, 5, 54, 53, 2, 34, 
    21, 28, 3, 39, 32, 49, 41, 33, 36, 14, 48, 16, 40, 59, 24, 10, 12, 23, 11, 42, 44, 4, 58, 15, 
    9, 7, 6, 43, 22, 45, 31, 27, 37, 26, 1, 13, 25, 55, 19, 29, 8, 47, 17, 18, 20, 50, 35, 30, 52, 
    56, 49, 45, 20, 50, 47, 30, 56, 4, 6, 23, 38, 58, 18, 42, 12, 36, 46, 39, 2, 17, 35, 44, 3, 11, 
    25, 48, 52, 15, 24, 9, 34, 28, 57, 13, 10, 26, 37, 1, 40, 32, 8, 27, 43, 5, 16, 7, 55, 51, 14, 
    41, 29, 31, 54, 22, 21, 59, 19, 33, 53])); //222    
