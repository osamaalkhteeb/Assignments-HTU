// function findMax(arr13) {
//     return arr13.reduce((max, num) => (num > max ? num : max));
//   }
  
//   let arr13 = [1, 5, 9, 6, 3, 87, 72, 23];
  
//   console.log(findMax(arr13)); 





//   function reverseArr(arr) {
//     let reversed = [];
//     for (let i = arr.length - 1; i >= 0; i--) {
//       reversed.push(arr[i]);
//     }
//     return reversed;
//   }
  
//   let arr = [1, 2, 3, 4, 5];
  
//   console.log(reverseArr(arr));




//   function reverseArr(arr14) {
//     let reversed = [];
//     for (let i = arr14.length - 1; i >= 0; i--) {
//       reversed.push(arr14[i]);
//     }
//     return reversed;
//   }
  
//   let arr14 = [1, 2, 3, 4, 5];
  
//   console.log(reverseArr(arr14)); 


  //////////////////////////////////////////////////////////

  function pairSum(arr, trg) {
    for (let x = 0; x < arr.length; x++) {
      for (let y = x + 1; y < arr.length; y++) {
        if (arr[x] + arr[y] === trg) {
          return [arr[x], arr[y]];
        }
      }
    }
    return null; 
  }
  
  console.log(pairSum([15, 1, 27, 80, 9], 24)); 