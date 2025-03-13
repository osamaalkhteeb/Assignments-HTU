
function calc(x,y,z){

let result;
if(z==="+"){
result=  x + y;
}
else if(z==="-"){
    result = x - y;
}
else if(z==="/"){
    result = x / y;
}
else if(z==="*"){
    result = x * y;
}

return result;
}
console.log(calc( 4 ,5 ,"*"));



function calc1(x,y,z){
let result;
switch(z){
case "+":
    result=  x + y;
break;
case "-":
    result = x - y;

break;
case "/":
    result = x / y;

break;
case "*":
    result = x * y;

break;
};
return result;
}
console.log(calc1( 4 ,10 ,"*"));