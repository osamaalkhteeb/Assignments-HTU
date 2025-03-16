let st1 = "osama";

console.log(st1.length);

function validateDescription(description) {
  if (description.length > 100) {
    return "Description is too long";
  }
  return "Description is valid";
}

console.log(
  validateDescription("ajndsjanjasd ajdnjasdn ajs sndjan asdjnsjdn jsandsjd nj")
);


let st2 = "Javascript";
console.log(st2.slice(4,10))
console.log(st2.slice(-6)) //dont use

function readMore(str){
    return str.slice(0,50) +"... Read more"
}
console.log(readMore("daksjnldjaksjdna asdkjbakj askjdbajsdb asdbasjdb asdbkjabsd"));

let st3 = "Javascript";
console.log(st3.charAt(1));

function checkUsername(username){
    return username.charAt(0).toUpperCase() +username.slice(1,username.length);
}
console.log(checkUsername("osama"));


let st4 = "Javascript";
console.log(st4.toUpperCase());

let st5 = "Hello Javascript";
console.log(st5.trim());

function cleanEmail(email){
    return email.trim().toLowerCase();
}
console.log(cleanEmail(" user@example.com   "));

let st6 = "Hello Javascript";
console.log(st6.substring(0,7));

function maskPhone(str){
    return "*".repeat(str.length -3) + str.substring(str.length -3);
}
console.log(maskPhone("0779720834"));

console.log("Osama".repeat(3));

let st7 = "world Javascript";
console.log(st7.replace(/world/g,"Hello")); //RegExp
console.log(st7.replaceAll("world","Hello"));

let st8 = "Javascript world world";
console.log(st8.split(" "));

let st9 = "Javascript world world";
console.log(st8.includes("w"))

function checkBadWords(str){
    if(str.includes("badWords")){
        return "this is a bad word" // or str.replaceAll("badWords","****")
    }
    return "approved words"
}
console.log(checkBadWords("badWords"));

let st10 = "Javascript world world";
console.log(st8.endsWith("world"));

let fileName="test.jpg";

if(fileName.endsWith(".jpg") || fileName.endsWith(".png") ){};

let st11 = "Javascript world world";
console.log(st11.indexOf("w"));

let st12 = "Javascript world world";
console.log(st12.lastIndexOf("w"));

let st13 = "Javascript world world";
console.log(st13.concat("   id"))

// const text = "  JavaScript is amazing. Learning JavaScript is fun and powerful. JavaScript helps build interactive web applications.  ";

// console.log(text.length > 280 ? "Text exceeds 280 characters" : "Text is within limit"); // 1 length
// console.log(text.charAt(0).toUpperCase()); // 2 charAt()
// console.log(text.toUpperCase()); // 3 toUpperCase()
// console.log(text.toLowerCase()); // 3 toLowerCase()
// console.log(text.trim()); // 4 trim()
// console.log(text.slice(0, 20) + "..."); // 5 slice()
// console.log(text.substring(text.length - 4).padStart(text.length, "*")); // 6 substring()
// console.log(text.replace("JavaScript", "JS")); // 7 replace()
// console.log(text.replaceAll("JavaScript", "JS")); // 7 replaceAll()
// console.log(text.split(" ")); // 8 split()
// console.log(text.includes("interactive")); // 9 includes()
// console.log(text.startsWith("JavaScript")); // 10 startsWith()
// console.log(text.endsWith("applications.  ")); // 10 endsWith()
// console.log("-".repeat(10)); // 11 repeat()
// console.log(text.concat(" It is widely used.")); // 12 concat()
// console.log(text.indexOf("JavaScript")); // 13 indexOf()
// console.log(text.lastIndexOf("JavaScript")); // 13 lastIndexOf()


let tweet = "This is a sample tweet that might exceed 280 characters...";
let username = "johnDoe";
let title = "hello world";
let email = "   example@email.com   ";
let article = "This is a long article preview that needs trimming.";
let phoneNumber = "1234567890";
let comment = "This is a badword comment.";
let paragraph = "JavaScript is amazing. I love JavaScript!";
let fileName1 = "image.png";

// 1. length 
console.log(tweet.length > 280 ? "Tweet too long" : "Tweet is fine");

// 2. charAt() 
console.log(username.charAt(0) === username.charAt(0).toUpperCase() ? "Valid Username" : "Username should start with a capital letter");

// 3. toUpperCase() & toLowerCase() 
console.log(title.toUpperCase());
console.log(title.toLowerCase());

// 4. trim() 
console.log(email.trim());

// 5. slice() 
console.log(article.slice(0, 20) + "...");

// 6. substring()
console.log("*".repeat(phoneNumber.length -4) + phoneNumber.substring(phoneNumber.length -4));

// 7. replace() & replaceAll() 
console.log(comment.replace("badword", "****"));

// 8. split() 
console.log(comment.split(" "));

// 9. includes() 
console.log(comment.includes("badword") ? "Inappropriate comment" : "Clean comment");

// 10. startsWith() & endsWith() 
console.log(fileName1.endsWith(".png") || fileName1.endsWith(".jpg") ? "Valid image file" : "Invalid file type");

// 11. repeat() 
console.log("-".repeat(30));

// 12. concat() 
console.log("JavaScript".concat(" is awesome!"));

// 13. indexOf() & lastIndexOf() 
console.log("First occurrence: ", paragraph.indexOf("JavaScript"));
console.log("Last occurrence: ", paragraph.lastIndexOf("JavaScript"));
