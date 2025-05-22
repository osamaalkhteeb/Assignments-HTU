




class User {
  constructor(name, address, email, phonenum, gender) {
    this.name = name;
    this.address = address;
    this.email = email;
    this.phonenum = phonenum;
    this.gender = gender;
  }
}


function addUser() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const phonenum = document.getElementById("phonenum").value;
  const gender = document.getElementById("gender").value;

  const user = new User(name, address, email, phonenum, gender);
  userList.push(user);

  // عشان اعمل كلير للانبوت بعد ما اكبس اضافة مستخدم

  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phonenum").value = "";
  document.getElementById("gender").value = "";
}

function viewUserTable() {
  const table = document
    .getElementById("table")
    .getElementsByTagName("tbody")[0];

  table.innerHTML = "";

  userList.forEach((ele) => {
    const row = document.createElement("tr");

    const name = document.createElement("td");
    name.textContent = ele.name;

    const address = document.createElement("td");
    address.textContent = ele.address;

    const email = document.createElement("td");
    email.textContent = ele.email;

    const phonenum = document.createElement("td");
    phonenum.textContent = ele.phonenum;

    const gender = document.createElement("td");
    gender.textContent = ele.gender;

    row.appendChild(name);
    row.appendChild(address);
    row.appendChild(email);
    row.appendChild(phonenum);
    row.appendChild(gender);

    table.appendChild(row);
  });

  document.getElementById("table").style.display = "block";
  document.getElementById("card").style.display = "none";
}

function viewUserCard() {
  const rowCard = document.getElementById("rowCard");
  rowCard.innerHTML = "";

  userList.forEach((ele) => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card h-100 shadow">
        <div class="card-body">
          <h5 class="card-title"><strong>Name: </strong>${ele.name}</h5>
          <h5 class="card-text"><strong>Address: </strong> ${ele.address}</h5>
          <h5 class="card-text"><strong>Email: </strong> ${ele.email}</h5>
          <h5 class="card-text"><strong>Phone: </strong> ${ele.phonenum}</h5>
          <h5 class="card-text"><strong>Gender: </strong> ${ele.gender}</h5>
        </div>
      </div>
    `;
    rowCard.appendChild(col);
  });

  document.getElementById("card").style.display = "block";
  document.getElementById("table").style.display = "none";
}

//--------------------------- validation code ---------------

function validate() {
  let valid = true;

  let fullName = document.getElementById("name").value.trim();
  let address = document.getElementById("address").value.trim();
  let email = document.getElementById("email").value.trim();
  let phonenum = document.getElementById("phonenum").value.trim();
  let gender = document.getElementById("gender").value;

  let errorName = document.getElementById("massegeError1");
  let errorAddress = document.getElementById("massegeError2");
  let errorEmail = document.getElementById("massegeError3");
  let errorphonenum = document.getElementById("massegeError4");
  let errorGender = document.getElementById("massegeError5");

  if (
    fullName === "" ||
    !/^[A-Za-z\s]+$/.test(fullName) ||
    fullName.length < 5 ||
    fullName.length > 25
  ) {
    errorName.textContent = "*Name shouldn't contain numbers or be empty!";
    valid = false;
  } else {
    errorName.textContent = "";
  }

  if (address === "" || address.length < 5) {
    errorAddress.textContent = "*Valid Address is required!";
    valid = false;
  } else {
    errorAddress.textContent = "";
  }

  if (email === "") {
    errorEmail.textContent = "*Email is required!";
    valid = false;
  } else {
    errorEmail.textContent = "";
  }

  if (
    phonenum === "" ||
    !/^[0-9]+$/.test(phonenum) ||
    phonenum.length !== 10 ||
    !phonenum.startsWith("07")
  ) {
    errorphonenum.textContent =
      "*Phone number should contain only 10 digits & start with 07!";
    valid = false;
  } else {
    errorphonenum.textContent = "";
  }

  if (!gender) {
    errorGender.textContent = "*Please select a gender!";
    valid = false;
  } else {
    errorGender.textContent = "";
  }

  if (valid) {
    alert("Saved successfully!");
    addUser();
  }

  return false;
}

let currentView = "table";

document.getElementById("toggleViewBtn").addEventListener("click",  ()=> {
  if (currentView === "table") {
    viewUserCard();
    currentView = "card";
    document.getElementById("toggleViewBtn").textContent = "View Table";
  } else {
    viewUserTable();
    currentView = "table";
    document.getElementById("toggleViewBtn").textContent = "View Cards";
  }
});



