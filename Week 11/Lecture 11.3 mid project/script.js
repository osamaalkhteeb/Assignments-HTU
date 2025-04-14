
function validateForm(){
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const address = document.getElementById("address").value.trim();
    
    let isValid = true;

    // validate email
    if (!email.includes("@") || !email.includes(".")) {
        emailError.textContent = "Enter a valid email (must include @ and .)";
        isValid = false;
      }else {
        emailError.textContent = "";  
    }
    //   validate name
    if(!/^[A-Za-z\s]+$/.test(name)){
        nameError.textContent = "Name must only contain alphabatic charachters";
        isValid = false;
    }else if (name.length < 1){
        nameError.textContent = "Name cannot be empty.";
        isValid = false;
    }else {
        nameError.textContent = "";  
    }

    // validatte phone
    if(!/^\d{10,}$/.test(phone)){
        phoneError.textContent = "Phone number must be at least 10 digists.";
        isValid = false;
    }else {
        phoneError.textContent = "";  
    }

    // validate gender
    if (gender === "--Select--"){
        genderError.textContent = "Please select a gender.";
        isValid = false;
    }else {
        genderError.textContent = "";  
    }
    // validate address
    if(address.length === 0){
        addressError.textContent = "Address cannot be empty."
        isValid = false;
    }else {
        addressError.textContent = "";  
    }
    return isValid;
}


    // For the diff sections
function showSection(sectionId){
    document.getElementById('signup').style.display = sectionId === 'signup' ? 'block' : 'none';
    document.getElementById('preview').style.display = sectionId === 'preview' ? 'block' : 'none';

    const tabLinks = document.querySelectorAll('.nav-link');
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (sectionId === 'signup') {
        document.querySelector('a[href="#"]').classList.add('active');
    } else if (sectionId === 'preview') {
        document.querySelectorAll('a[href="#"]')[1].classList.add('active');
        viewUsers();
    }
}
    // View swapping 
    
function toggleView(viewType) {
    document.getElementById('tableSection').style.display = viewType === 'table' ? 'block' : 'none';
    document.getElementById('cards-container').style.display = viewType === 'card' ? 'flex' : 'none';
}

toggleView('table'); // to prevent the two vieew from apearing when pressing preview 

        // Dto
    let userList=[]

    class User{
        constructor(email,name,phone,gender,address){
            this.email=email;
            this.name=name;
            this.phone=phone;
            this.gender=gender;
            this.address=address;
            
        }
    }

    function addUser(event){

        if(!validateForm()){
            event.preventDefault();
            return;
        }

        const email=document.getElementById('email').value;
        const name=document.getElementById('name').value;
        const phone=document.getElementById('phone').value;
        const gender=document.getElementById('gender').value;
        const address=document.getElementById('address').value;

        const user = new User(email,name,phone,gender,address);
        userList.push(user);

        document.getElementById('email').value="";
        document.getElementById('name').value="";
        document.getElementById('phone').value="";
        document.getElementById('gender').value="--Select--";
        document.getElementById('address').value="";

        alert("User added successfully");
    }

    
    function viewUsers(){
        const table=document.getElementById('table').getElementsByTagName('tbody')[0];
        const cardsContainer = document.getElementById('cards-container');
    
         // Clear previous entries
    table.innerHTML = '';
    cardsContainer.innerHTML = '';

        userList.forEach(elements=>
    {
        const row=document.createElement('tr');

        const emailTd = document.createElement('td');
        emailTd.textContent =elements.email;

        const nameTd = document.createElement('td');
        nameTd.textContent =elements.name;
        
        const phoneTd = document.createElement('td');
        phoneTd.textContent =elements.phone;
        
        const genderTd = document.createElement('td');
        genderTd.textContent =elements.gender;
        
        const addressTd = document.createElement('td');
        addressTd.textContent =elements.address;
        
        row.appendChild(emailTd);
        row.appendChild(nameTd);
        row.appendChild(phoneTd);
        row.appendChild(genderTd);
        row.appendChild(addressTd);

        
        table.appendChild(row);
    
    renderUserCard(elements);

    });
    

    }

    function renderUserCard(user) {
        const container = document.getElementById("cards-container");
    
        const card = document.createElement("div");
        card.className = "card";
    
        card.innerHTML = `
            <h5>${user.name}</h5>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Gender:</strong> ${user.gender}</p>
            <p><strong>Address:</strong> ${user.address}</p>
        `;
    
        container.appendChild(card);
    }
    