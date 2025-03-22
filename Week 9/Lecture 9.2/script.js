// let array = [1,2,3,4];
// let x=10;
// let y=30;

// result = 0;
// result = result + x + y;
// result+=x+y; 

// for (let x = 0; x<array.length;x++){ 
// array[x];

// }

// for (let x of array){     -----> mostly used

// }


// let i =2;
// while(i<=10){
// console.log(i);
//     i++;
// }

// do {
//     console.log(i);
//     i++;
// } while (i<=10);


// let obj={
//     name:'',
//     age: 10,
//     phoneNumber:79,
// }
// for(let key in obj){
//     console.log(key)
// }


// let array = [1,2,3,4];
// for (let x = 0; x<array.length;x++){ 
//     if (x===3){

//         break;
//     }

//     }


// let text= "HELLOt";
// let lowercase = '';
// for(let i = 0; i<text.length;i++){
// let charCode = text.charCodeAt(i);
// if (charCode >= 65 && charCode <= 90){
// lowercase += String.fromCharCode(charCode+32);
// }else{
//     lowercase += text[i];
// }

// }
// console.log(lowercase);

// let target = 'L';

// for ( let i=0; i<text.length;i++){
// if (text[i] === target){
//     console.log(i);
//     break;
// }
// }



function reverse(text){
    let reversed = "";
    for (let i = text.length -1;i>=0;i--){
        reversed = reversed + text[i];
    }
    return reversed.toLowerCase() === text.toLowerCase();
}

console.log(reverse("level"))

let result =1;
function fac(n) {

   for(let i = 2;i<=n;i++) {
    result*= i;
   }
   return result;
}

console.log(fac(6));