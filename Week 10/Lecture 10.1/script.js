// for(let i=1;i<=3;i++){
//     for(let j=0;j<=3;j++){
//         console.log(`(${i},${j})`)
//     }
// }



// let arr3 = [1,2,3,4,5];
// console.log(arr3.map((y)=> y * 3));


// let arr4 = [1,2,2,3,3,4,5]
// let uniqeArr = arr4.filter((y,i) => arr4.indexOf(y)===i);
// console.log(uniqeArr);


let arr = [
{ name : "hussam" , age :30 },
{ name : "Ali" , age :40 },
{ name : "Ahmad" , age :22 },

];
console.log(arr.sort((x,y) =>x.age-y.age));

