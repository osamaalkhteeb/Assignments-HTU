// var person={
//     name:'',
//     print: function(){
//         console.log();
//     },
// };

// function Person(name,age){
//     this.name = name;
//     this.age= age;
// }

// Person.prototype.print = function(){
//     console.log(this.name)
// }

// var personObj = new Person('hussam');



// console.log(personObj);


// function Employee(name,age,job){
//     this.job=job;
// }

// Employee.prototype = Object.create(Person.prototype);
// Employee.prototype.constractor = Employee;

// Employee.prototype.work = function(){
//     console.log(this.job)
// }

// function Student(name,age,job){
//     this.job = job;
//     name;
//     age;
// }

// var emp = new Employee('osama' , 23 , 'Development')


// class Person{
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
// print(){


//     }
// }

// const p1 = new Person('osama',23);

// class Employee extends Person{
//     constructor(name,age,job){
//         super(name,age)
//         this.job = job;
//     }

//     work(){
//         console.log(this.job);
//     }
// }

// const emp2 = new Employee("osama",23,"Development");

// console.log(emp2);

// class BankAccount{
//     #balance;

//     constructor(owner,balance){
//         this.owner = ownser;
//         this.#balance = balance;
//     }

//     deposite(amount){
//         this.#balance +=amount;
//     }
//     getBalance(){
//         return this.#balance;
//     }
// }

// class acc extends BankAccount{

// }

// const account = new BankAccount("osama",10)
// account.deposite(1000);
// console.log(account)

// class User{
//     constructor(userName,password){
//         this.userName = userName;
//         this.password = password;
//     }
//     login(password){
// return this.password === password ? "Welcome" : "Invalid Password";
//     }
// }


// class Admin extends User{
//     constructor(userNme,password,role){

//         super(this.userName,password);
//         this.role = role
//     }
//     manageUseres(){}
// }



// class Vehicle {
//     constructor(type){
//         this.type = type;
//     }

//     move(){
//         console.log(`The ${this.type} is moving`)

//     }
// }


// class Car extends Vehicle{
// constructor(type,model,year){
//     super('Car')
//     this.brand = this.brand;
//     this.model = model;
//     this.year = year;
// }
// start(){
//     console.log(`${this.brand} ${this.model} is starting ...`)
// }


// }

// class Track extends Vehicle{
//     constructor(type,model,year){
//         super('Track')
//         this.brand = this.brand;
//         this.model = model;
//         this.year = year;
//     }
//     start(){
//         console.log(`${this.brand} ${this.model} is starting ...`)
//     }
    
    
//     }

// const carObj = new Car();
// const track = new Track();

// carObj.move()
// track.move()


// function changeText(){
// let p = document.getElementById("par");
// p.textContent = "Hello World"
// p.innerHTML="<strong> Hello World </strong>"
// }

// function changeText2(){
// let p = document.getElementsByClassName("title");

//     for(let i = 0;i<p.length;i++){
//         p[i].textContent = "Hello"
        
//     }

// }

// function changeText3(){
//     let p = document.getElementsByTagName("p");
    
//         for(let i = 0;i<p.length;i++){
//             p[i].textContent = "Hello"
            
//         }
    
//     }

//     function changeText4(){
//         let p = document.querySelector("title");
//         }

//         function changeText5(){
//             let p = document.querySelectorAll("title");
//             }
            
//             function changeColor(){

//                 document.getElementById("txt").style.color = 'red'
//             }

//             function resetColor(){

//                 document.getElementById("txt").style.color = 'red'
//             }



function validateForm() {
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;


  const fullnameError = document.getElementById("fullnameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");



  if (fullname.length < 5) {
    fullnameError.textContent = "Full name must be at least 5 characters long.";
    isValid = false;
  }


  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Enter a valid email (must include @ and .)";
    isValid = false;
  }


  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    isValid = false;
  }


  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match.";
    isValid = false;
  }

  return isValid;
}
