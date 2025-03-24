function countVowels(str) {
  const vowels = "aeiou";
  let count = 0;

  str = str.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }
  return count;
}
console.log(countVowels("JavaScript"));

///////////////////////////

function evenOdd(num) {
  for (let i = 0; i < num.length; i++) {
    if (num[i] % 2 === 0) {
      console.log("even");
    } else {
      console.log("odd");
    }
  }
}

evenOdd([1, 4, 7, 10]);

//////////////////////////

function longestWord(sen) {
  let splited = sen.split(" ");
  let longest = "";
  for (let i = 0; i < splited.length; i++) {
    if (splited[i].length > longest.length) {
      longest = splited[i];
    }
  }

  return longest;
}

console.log(longestWord("I love JavaScript programming"));

////////////////////////////////////////////

function fizzBuzz(fizzed) {
  for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}
fizzBuzz;

///////////////////////////////////

function secondLargest(arr) {
  let first = -Infinity,
    second = -Infinity;

  for (let num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }

  return second;
}

console.log(secondLargest([-10, -5, -20, 8, -12, -1, -30]));

////////////////////////////////////////

function flattens(arr1) {
  let result = [];

  for (let i = 0; i < arr1.length; i++) {
    if (typeof arr1[i] === "object" && arr1[i] !== null) {
      let flattened = flattens(arr1[i]);
      for (let j = 0; j < flattened.length; j++) {
        result.push(flattened[j]);
      }
    } else {
      result.push(arr1[i]);
    }
  }

  return result;
}

console.log(flattens([1, [2, [3, 4], 5], 6]));
