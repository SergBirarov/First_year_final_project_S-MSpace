function CheckPassword(password) {
  let inCorrect = true;
  let isSpecial = false;
  let isCapLatters = false;
  let isLatters = false;
  let isNumber = false;

  if (Number(password.length) < 7 || Number(password.length) > 12) {
    inCorrect = true;
  }

  for (let element of password) {
    let specialCharacters = ["@", "!", "#", "$", "&"];
    if (specialCharacters.includes(element)) {
      isSpecial = true;
    }
    if (element >= "a" && element <= "z") {
      isLatters = true;
    }
    if (element >= "A" && element <= "Z") {
      isCapLatters = true;
    }
    if (element >= "0" && element <= "9") {
      isNumber = true;
    }
  }

  if (isLatters && isSpecial && isNumber && isCapLatters) {
    inCorrect = false;
  }

  // if (inCorrect) {
  //   document.getElementById("passwordHelp").classList.remove("none");
  //   password.style.border = "2px solid red";
  // } else {
  //   document.getElementById("passwordHelp").classList.add("none");
  //   password.style.border = "2px solid green";
  // }
  return inCorrect;
}

function UserNameValidity(username) {
  if (username || username.length > 60) {
    for (let element of username) {
      if (element >= "א" && element <= "ת") {
        // username.style.border = "2px solid red";
        // return;
        return false;
      }
      // else {
      //   username.style.border = "2px solid green";
      // }
    }
  } else {
    // username.style.border = "2px solid red";
    return false;
  }
  return true;
}

function NameValidity(name) {
  for (let element of name) {
    if (
      !(
        (element >= "א" && element <= "ת") ||
        (element >= "a" && element <= "z") ||
        (element >= "A" && element <= "Z") ||
        (element >= "а" && element <= "я") ||
        (element >= "А" && element <= "Я")
      )
    ) {
      // firstName.style.border = "2px solid red";
      // return;
      return false;
    }
    // else {
    //   firstName.style.border = "2px solid green";
    // }
  }
  return true;
}

function BirthDateValidity(birthDate) {
  let birthDateValue = new Date(birthDate.value);
  let currentDate = new Date();
  if (
    !(
      birthDate.value &&
      (currentDate.getFullYear() - birthDateValue.getFullYear() < 120 ||
        birthDateValue > currentDate)
    )
  ) {
    // birthDate.style.border = "2px solid green";
    return false;
  }
  // else {
  //   // birthDate.style.border = "2px solid red";
  //   return false;
  // }
  return true;
}

function AddressValidity(address) {
  for (let element of address) {
    if (element < "א" && element > "ת") {
      // city.style.border = "2px solid red";
      // return;
      return false;
    }
    // else {
    //   city.style.border = "2px solid green";
    // }
  }
  return true;
}

function ImgValidity(img) {
  if (!(img.includes(".jpeg") || img.includes(".jpg"))) {
    // imageInput.style.border = "2px solid red";
    // document.getElementById('imageHelp').classList.remove('none')
    return false;
  }
  // else {
  //   imageInput.style.border = "2px solid green";
  //   document.getElementById('imageHelp').classList.add('none')
  // }
  return true;
}

function EmailDup(email) {
  let storedUsersJSON = localStorage.getItem("users");
  if (storedUsersJSON) {
    storedUsers = JSON.parse(storedUsersJSON);

    for (let i = 0; i < storedUsers.length; i++) {
      if (storedUsers[i].email === email.value) {
        // document.getElementById('emailHelp').classList.remove('none');
        // email.style.border = "2px solid red"
        return false;
      }
      // else {
      //   email.style.border = "2px solid green"
      //   document.getElementById('emailHelp').classList.add('none');
      // }
    }
  } else {
    storedUsers = [];
  }
  return true;
}

function PassSecond(pass1, pass2){

  if(!(pass1 === pass2)){
    return false;
  }
  return true;
}
export function SubmitRegistrationForm(event) {
  const registrationForm = document.getElementById("registrationForm");
  const usernameInput = document.getElementById("regUsername");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const birthDate = document.getElementById("birthDate");
  const city = document.getElementById("city");
  const street = document.getElementById("street");
  const img = document.getElementById("image");
  const email = document.getElementById("email");
  const pass1 = document.getElementById("regPassword");
  const pass2 = document.getElementById("regPasswordSecond");



  if (
    !registrationForm.checkValidity() ||
    !UserNameValidity(usernameInput.value) ||
    !NameValidity(firstNameInput.value) ||
    !NameValidity(lastNameInput.value) ||
    !BirthDateValidity(birthDate.value) ||
    !AddressValidity(city.value) ||
    !AddressValidity(street.value) ||
    !ImgValidity(img.value) ||
    !EmailDup(email.value)||
    !CheckPassword(pass1.value)||
    !PassSecond(pass1.value, pass2.value)
  ) {
    event.preventDefault();
    event.stopPropagation();
  }

  let file = img.files[0];

  let reader = new FileReader();

  reader.onload = function (event) {
    if (file) {
      reader.readAsDataURL(file);
    }


    let imageContent = event.target.result;

    let newUser = {
      username: username.value,
      password: password.value,
      image: imageContent,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      birthDate: birthDate.value,
      city: city.value,
      street: street.value,
      number: number.value,
    };
    console.log(newUser);

    storedUsers.push(newUser);

    let storedUsersJSON = JSON.stringify(storedUsers);

    localStorage.setItem("users", storedUsersJSON);

    let user = storedUsers.find(
      (u) => u.email === email.value && u.password === password.value
    );
    console.log(user);
    let userJSON = JSON.stringify(user);
    sessionStorage.setItem("connectedUser", userJSON);
    window.location.assign("./managerProfile.html");
  };

  
  registrationForm.classList.add("was-validated");