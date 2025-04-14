let userList = [

]



class User{
    constructor(name,age,email){
        this.name=name;
        this.age=age;
        this.email=email;
    }
}


function addUser(){

    const name= document.getElementById('name').value;
    const age= document.getElementById('age').value;
    const email= document.getElementById('email').value;


    const user = new User(name,age,email);
    userList.push(user);

    document.getElementById('name').value= "";
    document.getElementById('age').value= "";
    document.getElementById('email').value= "";

}



function viewUsers(){
        const table=document.getElementById('table').getElementsByTagName('tbody')[0];
    
        userList.forEach(elements=>
    {
        const row=document.createElement('tr');
        
        const nameTd = document.createElement('td');
        nameTd.textContent =elements.name;
        
        const ageTd = document.createElement('td');
        ageTd.textContent =elements.age;
        
        const emailTd = document.createElement('td');
        emailTd.textContent =elements.email;
        
        row.appendChild(nameTd);
        row.appendChild(ageTd);
        row.appendChild(emailTd);
        
        table.appendChild(row);
    
    
    });
        
    }