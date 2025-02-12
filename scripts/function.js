import { User } from "./models/User.js";
var cartTable = document.getElementById("cartTable");
//Arrays for Users:
//admin
var storedUsers = [
  new User(
    `admin`,
    `admin1234admin`,
    `/Media/Assets/team-3.jpg`,
    `Regina`,
    `Phalange`,
    `Regina@Phalange.com`,
    `1996-11-25`,
    `Hell`,
    `Hell st`,
    `25`
  ), new User(
    `username`,
    `a123456789`,
    `/Media/Assets/team-3.jpg`,
    `שמואל`,
    `שמואלי`,
    `3Regina@Phalange.com`,
    `1996-11-25`,
    `עיר`,
    `רחוב`,
    `25`
  )]
var cart = new Array();
// arrays for hardcoded products
var storedFlights = [
  {
    category: "flight",
    id: `1254`,
    name: `165-56A`,
    departureDate: `26/07/2023`,
    arrivalDate: `26/08/2025`,
    classType: `3 Heavy`,
    image: `/Media/Assets/Ecom/products/prod1.jpg`,
    price: `12500`,
  },
  {
    category: "flight",
    id: `1258`,
    name: `187-96A`,
    departureDate: `26/09/2023`,
    arrivalDate: `26/09/2024`,
    classType: `2 Medium`,
    image: `/Media/Assets/Ecom/products/prod2.jpg`,
    price: `11500`,
  },
  {
    category: "flight",
    id: `1248`,
    name: `787-96B`,
    departureDate: `26/10/2023`,
    arrivalDate: `26/09/2024`,
    classType: `1 Light`,
    image: `/Media/Assets/Ecom/products/prod3.jpg`,
    price: `64500`,
  },
  {
    category: "flight",
    id: `1206`,
    name: `T77-96B`,
    departureDate: `26/10/2029`,
    arrivalDate: `26/09/2032`,
    classType: `3 Heavy`,
    image: `/Media/Assets/Ecom/products/prod4.jpg`,
    price: `164500`,
  },
];
var storedFoods = [
  {
    category: "food",
    id: `2346`,
    name: `Minced Brains`,
    foodType: `meat`,
    kosherStatus: `no`,
    hypoallergenicStatus: `yes`,
    price: `32.50`,
    image: `/Media/Assets/Ecom/products/food1.png`,
    price: `32.50`,
  },
  {
    category: "food",
    id: `2467`,
    name: `Ass Bits`,
    foodType: `meat`,
    kosherStatus: `Yes`,
    hypoallergenicStatus: `No`,
    image: `/Media/Assets/Ecom/products/food2.png`,
    price: `19.90`,
  },
  {
    category: "food",
    id: `2345`,
    name: `Breast Milk`,
    foodType: `Dairy`,
    kosherStatus: `Yes`,
    hypoallergenicStatus: `No`,
    image: `/Media/Assets/Ecom/products/food3.png`,
    price: `312.30`,
  },
  {
    category: "food",
    id: `2867`,
    name: `Shepareds Pie`,
    foodType: `meat`,
    kosherStatus: `No`,
    hypoallergenicStatus: `Yes`,
    image: `/Media/Assets/Ecom/products/food4.png`,
    price: `99.90`,
  },
];
var storedSuits = [
  {
    category: "suit",
    id: `3546`,
    name: `Wolf$Gangs`,
    size: `36`,
    color: `White`,
    image: `/Media/Assets/Ecom/products/suit1.jpg`,
    price: `360.90`,
  },
  {
    category: "suit",
    id: `3568`,
    name: `Wolf$Gangs`,
    size: `42`,
    color: `Orange`,
    image: `/Media/Assets/Ecom/products/suit2.jpg`,
    price: `422.90`,
  },
  {
    category: "suit",
    id: `3965`,
    name: `Suits-BaAm`,
    size: `46`,
    color: `White`,
    image: `/Media/Assets/Ecom/products/suit3.jpg`,
    price: `180.90`,
  },
  {
    category: "suit",
    id: `3967`,
    name: `AlaIster`,
    size: `56`,
    color: `White`,
    image: `/Media/Assets/Ecom/products/suit4.jpg`,
    price: `1360.90`,
  },
];
if (!sessionStorage.getItem("cart")) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(storedUsers));
}
if (!localStorage.getItem("flights")) {
  localStorage.setItem("flights", JSON.stringify(storedFlights));
}
if (!localStorage.getItem("foods")) {
  localStorage.setItem("foods", JSON.stringify(storedFoods));
}
if (!localStorage.getItem("suits")) {
  localStorage.setItem("suits", JSON.stringify(storedSuits));
}

//html elements for prod and users
var productGridF = document.getElementById("flightsSec");
var productGridFood = document.getElementById("foodSec");
var productGridSuit = document.getElementById("suitSec");

//startup building page with hardcoded elements
export function BuildStore() {
  AddFlightToStore();
  AddFoodsToStore();
  AddSuitsToStore();
}

//user info table
export function UserTable() {
  let userTable = document.getElementById("userTable");
  let users = "";
  let storedUsers = JSON.parse(localStorage.getItem("users"));
  if (storedUsers) {
    let str = "";
    for (let i = 0; i < storedUsers.length; i++) {
      let element = storedUsers[i];
      let data = "<td></td>";
      if (i > 0) {
        data = `<td id="user${i}"> <button class="btn btn-sm btn-danger removeProfile" data-ind="${i}" ><i data-ind="${i}" data-feather="trash-2"> Remove</i></button>
         <button class="btn btn-sm btn-info editProfile" data-ind="${i}" ><span><i data-ind="${i}" data-feather="edit-3">Edit</i></span></button></td>`;
      }
      users = `<tr>
            <td><img src="${element.image}" id="profilePicProfile" alt="User Image" class="class="img-fluid rounded-circle me-2""> <span>${element.username}</span></td>
            <td>${element.lastName} ${element.firstName}</td>
            <td>${element.birthDate}</td>
            <td>${element.street} ${element.number}, ${element.city}</td>
            <td>${element.email}</td>
            ${data}
          </tr>`;
      str += users;
    }

    userTable.innerHTML = str;
    let editBtn = document.querySelectorAll(".editProfile");
    editBtn.forEach((element) => {
      element.addEventListener("click", AdminEdit);
    });
    let removeBtn = document.querySelectorAll(".removeProfile");
    removeBtn.forEach((element) => {
      element.addEventListener("click", RemoveProfile);
    });
  }
}

function RemoveProfile(event) {
  let index = event.target.dataset.ind;
  storedUsers = JSON.parse(localStorage.getItem("users"));
  storedUsers.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(storedUsers));
  UserTable();
}


export function UserProfile() {
  let user;
  let userJSON = sessionStorage.getItem("connectedUser");
  if (userJSON && userJSON != "null" && userJSON != "undefined") {
    user = JSON.parse(userJSON);
    document.getElementById(
      "userProfileTab"
    ).innerHTML = `<img src="${user.image}" alt="" class="rounded-circle img-fluid"></img>
  `;
    document.getElementById("uploadPic").innerHTML = `<img src="${user.image}" alt="" class="rounded-circle img-fluid "></img>
  `;
    document.getElementById("userBadge").innerHTML = user.password === `admin1234admin` ? `Admin` : `User`;
    document.getElementById("profileTabName").innerHTML = `${user.firstName} ${user.lastName}`;
    document.getElementById("profileTabMail").innerHTML = `${user.email}`;
    document.getElementById("profileTabUserName").innerHTML = `${user.username}`;
    document.getElementById("profileTabAddress").innerHTML = `${user.city}`;
    document.getElementById("profileName").innerHTML = `${user.firstName} ${user.lastName}`;
    document.getElementById("profilePhone").innerHTML = `${user.phone ? `'${user.phone}` : "Update your Info To view Number"}`;
    document.getElementById("profileMail").innerHTML = `${user.email}`;
    document.getElementById("profileAddress").innerHTML = `${user.city},${user.street} ${user.number}`;
  }
}

export function SendregistrationForm() {
  let form = document.querySelector("#registrationForm");
  form.addEventListener("submit", SubmitRegistrationForm);

  //כפתור שמראה את הסיסמא
  document.querySelector("#showPass1").addEventListener("click", () => {
    let pass = document.querySelector("#regPassword");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  });
}


function CheckPassword(password) {
  let inCorrect = true;
  let isSpecial = false;
  let isCapLatters = false;
  let isLatters = false;
  let isNumber = false;
  let passwordValue = password.value;

  if (Number(passwordValue.length) < 7 || Number(passwordValue.length) > 12) {
    inCorrect = true;
  }

  for (let element of passwordValue) {
    let specialCharacters = ["@", "!", "#", "$", "&", "%", "^", "*"];
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

  if (inCorrect) {
    document.getElementById("passwordHelp").classList.remove("none");
    password.style.border = "2px solid red";
  } else {
    document.getElementById("passwordHelp").classList.add("none");
    password.style.border = "2px solid green";
  }
  return inCorrect;
}
export function SubmitRegistrationForm(event) {
  event.preventDefault();

  // username
  let username = document.getElementById("regUsername");
  if (username.value || username.value.length > 60) {
    let usernameValue = username.value;
    for (let element of usernameValue) {
      if (element >= "א" && element <= "ת") {
        username.style.border = "2px solid red";
        return;
      } else {
        username.style.border = "2px solid green";
      }
    }
  } else {
    username.style.border = "2px solid red";
  }

  // password
  let password = document.getElementById("regPassword");
  if (!password.value) {
    password.style.border = "2px solid red";
  } else {
    if (CheckPassword(password)) {
      return;
    }
    password.style.border = "2px solid green";
  }

  // password2
  let password2 = document.getElementById("regPasswordSecond");
  if (password2.value && password.value == password2.value) {
    password2.style.border = "2px solid green";
    document.getElementById("PasswordSecond").classList.add("none");
  } else {
    password2.style.border = "2px solid red";
    document.getElementById("PasswordSecond").classList.remove("none");
    //return
  }

  // imageInput
  let imageInput = document.getElementById("image");
  if (imageInput.value) {
    if (
      imageInput.value.includes(".jpeg") ||
      imageInput.value.includes(".jpg")
    ) {
      imageInput.style.border = "2px solid green";
      document.getElementById("imageHelp").classList.add("none");
    } else {
      imageInput.style.border = "2px solid red";
      document.getElementById("imageHelp").classList.remove("none");
      return;
    }
  } else {
    imageInput.style.border = "2px solid red";
  }

  // firstName
  let firstName = document.getElementById("firstName");
  if (firstName.value) {
    let firstNameValue = firstName.value;
    for (let element of firstNameValue) {
      if (
        !(
          (element >= "א" && element <= "ת") ||
          (element >= "a" && element <= "z") ||
          (element >= "A" && element <= "Z") ||
          (element >= "а" && element <= "я") ||
          (element >= "А" && element <= "Я")
        )
      ) {
        firstName.style.border = "2px solid red";
        return;
      } else {
        firstName.style.border = "2px solid green";
      }
    }
  } else {
    firstName.style.border = "2px solid red";
  }
  // lastName
  let lastName = document.getElementById("lastName");
  if (lastName.value) {
    let lastNameValue = lastName.value;
    for (let element of lastNameValue) {
      if (
        !(
          (element >= "א" && element <= "ת") ||
          (element >= "a" && element <= "z") ||
          (element >= "A" && element <= "Z") ||
          (element >= "а" && element <= "я") ||
          (element >= "А" && element <= "Я")
        )
      ) {
        lastName.style.border = "2px solid red";
        return;
      } else {
        lastName.style.border = "2px solid green";
      }
    }
  } else {
    lastName.style.border = "2px solid red";
  }
  // email
  let email = document.getElementById("email");
  if (email.value && email.value.endsWith(".com")) {
    let emailValue = email.value;
    let count = 0;
    for (let element of emailValue) {
      if (element == "@") {
        count++;
      }
      if (
        (element >= "a" && element <= "z") ||
        (element >= "A" && element <= "Z") ||
        element == "@" ||
        element == "." ||
        (element >= "0" && element <= "9")
      ) {
        email.style.border = "2px solid green";
      } else {
        email.style.border = "2px solid red";
        return;
      }
    }
    if (count != 1) {
      email.style.border = "2px solid red";
      return;
    }
  } else {
    email.style.border = "2px solid red";
    return;
  }

  // birthDate
  let birthDate = document.getElementById("birthDate");
  let birthDateValue = new Date(birthDate.value);
  let currentDate = new Date();
  if (birthDate.value) {
    if (
      currentDate.getFullYear() - birthDateValue.getFullYear() < 120 &&
      birthDateValue < currentDate
    ) {
      birthDate.style.border = "2px solid green";
    } else {
      birthDate.style.border = "2px solid red";
      return;
    }
  } else {
    birthDate.style.border = "2px solid red";
  }

  // city
  let city = document.getElementById("city");
  if (city.value) {
    let cityValue = city.value;
    for (let element of cityValue) {
      if (!((element >= "א" && element <= "ת") || element == " ")) {
        city.style.border = "2px solid red";
        return;
      } else {
        city.style.border = "2px solid green";
      }
    }
  } else {
    city.style.border = "2px solid red";
  }
  // street
  let street = document.getElementById("street");
  if (street.value) {
    let streetValue = street.value;
    for (let element of streetValue) {
      if (!((element >= "א" && element <= "ת") || element == " ")) {
        street.style.border = "2px solid red";
        return;
      } else {
        street.style.border = "2px solid green";
      }
    }
  } else {
    street.style.border = "2px solid red";
  }
  //number
  let number = document.getElementById("houseNumber");
  number.style.border = !number.value ? "2px solid red" : "2px solid green";

  if (
    username.value === "" ||
    password.value === "" ||
    imageInput.value === "" ||
    firstName.value === "" ||
    lastName.value === "" ||
    email.value === "" ||
    birthDate.value === "" ||
    city.value === "" ||
    street.value === "" ||
    number.value === ""
  ) {
    return;
  }

  let file = imageInput.files[0];

  let reader = new FileReader();

  reader.onload = function (event) {
    let imageContent = event.target.result;

    let storedUsersJSON = localStorage.getItem("users");

    if (storedUsersJSON) {
      storedUsers = JSON.parse(storedUsersJSON);

      for (let i = 0; i < storedUsers.length; i++) {
        if (storedUsers[i].email === email.value) {
          document.getElementById("emailHelp").classList.remove("none");
          email.style.border = "2px solid red";
          return;
        } else {
          email.style.border = "2px solid green";
          document.getElementById("emailHelp").classList.add("none");
        }
      }
    } else {
      storedUsers = [];
    }

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

    storedUsers.push(newUser);

    storedUsersJSON = JSON.stringify(storedUsers);

    localStorage.setItem("users", storedUsersJSON);

    let user = storedUsers.find(
      (u) => u.email === email.value && u.password === password.value
    );
    let userJSON = JSON.stringify(user);
    sessionStorage.setItem("connectedUser", userJSON);
    window.location.assign("./managerProfile.html");
  };
  if (file) {
    reader.readAsDataURL(file);
  }
}

export function SendLoginForm() {
  let form = document.querySelector("#submit_login");
  form.addEventListener("click", SubmitLoginForm);

  document.querySelector("#showPassLogIn").addEventListener("click", () => {
    let pass = document.querySelector("#floatingPassword");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  });
}

function SubmitLoginForm(event) {
  event.preventDefault();
  let email = document.getElementById("floatingEmail");
  let password = document.getElementById("floatingPassword");
  let storedUsersJSON = localStorage.getItem("users");

  if (storedUsersJSON) {
    let storedUsers = JSON.parse(storedUsersJSON);
    let user = storedUsers.find(
      (u) => u.email === email.value && u.password === password.value
    );
    if (user) {
      let userJSON = JSON.stringify(user);
      sessionStorage.setItem("connectedUser", userJSON);
      window.location.assign("./managerProfile.html");
    } else {
      email.style.border = "2px solid red";
      password.style.border = "2px solid red";
    }
  } else {
    alert("No registered users.");
  }
}

//adding products to localstorage through user input
export function AddSuit() {
  document.querySelector("#addSuit").addEventListener("submit", (event) => {
    event.preventDefault();

    let brandName = document.getElementById("addSuitName");
    let size = document.getElementById("addSuitSize").value;
    let color = document.getElementById("addSuitColor").value;
    let imageInput = document.getElementById("addSuitImage");
    let price = document.getElementById("addSuitPrice").value;
    let id = document.getElementById("addSuitId").value;
    let category = document.getElementById("addSuitCategory").value;

    if (
      !brandName.value ||
      color === "Choose a color" ||
      !imageInput.files[0] ||
      !price ||
      !id ||
      !category
    ) {
      alert("Please fill in all the required fields.");
      return;
    }
    let specialCharacters = ["@", "!", "#", "$", "&", "%", "^", "*"];
    let brandNameValue = brandName.value
    for (let element of brandNameValue) {
      if (specialCharacters.includes(element)) {
        brandName.style.border = "2px solid red";
        return;
      }
      else {
        brandName.style.border = "2px solid green";
      }
    }

    let file = imageInput.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      let imageContent = event.target.result;

      let suit = {
        category: category,
        id: id,
        name: brandName.value,
        size: size,
        color: color,
        image: imageContent,
        price: price,
      };

      let storedSuitsJSON = localStorage.getItem("suits");
      let storedSuits = storedSuitsJSON ? JSON.parse(storedSuitsJSON) : [];

      storedSuits.push(suit);

      let updatedSuitsJSON = JSON.stringify(storedSuits);

      localStorage.setItem("suits", updatedSuitsJSON);

      document.getElementById("addSuit").reset();

      alert("Suit added successfully!");
      AddSuitsToStore();
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

export function AddFood() {
  document.querySelector("#addFood").addEventListener("submit", (event) => {
    event.preventDefault();

    let foodName = document.getElementById("addFoodName");
    let foodType = document.querySelector('input[name="meat_dairy"]:checked').value;
    let kosherStatus = document.querySelector('input[name="kosher_noKosher"]:checked').value;
    let hypoallergenicStatus = document.querySelector('input[name="hypoallergenic_no"]:checked').value;
    let foodImage = document.getElementById("addFoodImage");
    let foodPrice = document.getElementById("addFoodPrice").value;
    let foodId = document.getElementById("addFoodId").value;
    let foodCategory = document.getElementById("addFoodCategory").value;

    if (!foodName.value || !foodPrice || !foodId || !foodCategory || !foodImage.value) {
      alert("Please fill in all the fields.");
      return;
    }
    let specialCharacters = ["@", "!", "#", "$", "&", "%", "^", "*"];
    let foodNameValue = foodName.value
    for (let element of foodNameValue) {
      if (specialCharacters.includes(element)) {
        foodName.style.border = "2px solid red";
        return;
      }
      else {
        foodName.style.border = "2px solid green";
      }
    }

    let file = foodImage.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      let Image = event.target.result;

      let food = {
        id: foodId,
        category: foodCategory,
        name: foodName.value,
        foodType: foodType ? "meat" : "dairy",
        kosherStatus: kosherStatus ? "yes" : "no",
        hypoallergenicStatus: hypoallergenicStatus ? "yes" : "no",
        foodImage: Image,
        price: foodPrice,
      };

      let storedFoodsJSON = localStorage.getItem("foods");
      let storedFoods = storedFoodsJSON ? JSON.parse(storedFoodsJSON) : [];

      storedFoods.push(food);

      let updatedFoodsJSON = JSON.stringify(storedFoods);

      localStorage.setItem("foods", updatedFoodsJSON);

      document.getElementById("addFood").reset();

      alert("Food item added successfully!");

      AddFoodsToStore();
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

export function AddShip() {
  document.querySelector("#addFlight").addEventListener("submit", (event) => {
    event.preventDefault();

    let flightNumber = document.getElementById("addFlightNumber");
    let classType = document.getElementById("addShipSize").value;
    let imageInput = document.getElementById("addShipImage");
    let price = document.getElementById("addShipPrice").value;
    let shipId = document.getElementById("addShipId").value;
    let shipCategory = document.getElementById("addShipCategory").value;
    let departureDate = document.getElementById("addDepartureDate");
    let arrivalDate = document.getElementById("addArrivalDate");

    if (
      flightNumber.value === "" ||
      departureDate.value === "" ||
      arrivalDate.value === "" ||
      classType === "Choose a class" ||
      price === "" ||
      !shipId ||
      !shipCategory
    ) {
      alert("Please fill in all the fields.");
      return;
    }
    let flightNumberValue = flightNumber.value
    let specialCharacters = ["@", "!", "#", "$", "&", "%", "^", "*"];
    for (let element of flightNumberValue) {
      if (specialCharacters.includes(element)) {
        flightNumber.style.border = "2px solid red";
        return;
      }
      else {
        flightNumber.style.border = "2px solid green";
      }
    }
    let departureDateValue = new Date(departureDate.value);
    let arrivalDateValue = new Date(arrivalDate.value);
    let currentDate = new Date();

    if (departureDateValue >= currentDate) {
      departureDate.style.border = "2px solid green";
    } else {
      departureDate.style.border = "2px solid red";
      return;
    }
    if (arrivalDateValue > departureDateValue) {
      arrivalDate.style.border = "2px solid green";
    } else {
      arrivalDate.style.border = "2px solid red";
      return;
    }

    let file = imageInput.files[0];

    let reader = new FileReader();

    reader.onload = function (event) {
      let image = event.target.result;

      let flight = {
        id: shipId,
        category: shipCategory,
        name: flightNumber.value,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
        classType: classType,
        image: image,
        price: price,
      };

      let storedFlightsJSON = localStorage.getItem("flights");
      storedFlights = storedFlightsJSON ? JSON.parse(storedFlightsJSON) : [];

      storedFlights.push(flight);

      let updatedFlightsJSON = JSON.stringify(storedFlights);

      localStorage.setItem("flights", updatedFlightsJSON);

      document.getElementById("addFlight").reset();

      alert("Flight added successfully!");

      AddFlightToStore();
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

function sortByPrice(a, b) {
  const priceA = parseInt(a.price);
  const priceB = parseInt(b.price);
  let filter = document.getElementById("price-filter").value;
  switch (filter) {
    case "low-to-high":
      return priceA - priceB;
    case "high-to-low":
      return priceB - priceA;
    default:
      return;
  }
}
//adding the products to the store
export function SortStore() {
  SortFlights();
  SortFoods();
  SortSuits();
}
function SortFlights() {
  storedFlights;
  storedFlights.sort(sortByPrice);
  const parentElement = storedFlights[0].parentNode;
  localStorage.setItem("flights", JSON.stringify(storedFlights));
  AddFlightToStore();
}
function SortSuits() {
  storedSuits;
  storedSuits.sort(sortByPrice);
  const parentElement = storedSuits[0].parentNode;
  localStorage.setItem("suits", JSON.stringify(storedSuits));
  AddSuitsToStore();
}
function SortFoods() {
  storedFoods;
  storedFoods.sort(sortByPrice);
  const parentElement = storedFoods[0].parentNode;
  localStorage.setItem("foods", JSON.stringify(storedFoods));
  AddFoodsToStore();
}
export function SecondSortStore() {
  SecondSortFlights();
  SecondSortSuits();
  SecondSortFoods();
}
function sortSuitsBySize(a, b) {
  const sizeA = parseInt(a.size);
  const sizeB = parseInt(b.size);
  let filter = document.getElementById("second-filter").value;
  switch (filter) {
    case "low-to-high":
      return sizeA - sizeB;
    case "high-to-low":
      return sizeB - sizeA;
    default:
      return;
  }
}
function SortFlightsByClass(a, b) {
  let flightSizeA = parseInt(a.classType[0]);
  let flightSizeB = parseInt(b.classType[0]);
  let filter = document.getElementById("second-filter").value;
  switch (filter) {
    case "low-to-high":
      return flightSizeA - flightSizeB;
    case "high-to-low":
      return flightSizeB - flightSizeA;
    default:
      return;
  }
}
function SortFoodsByMeat(a, b) {
  const foodTypeA = parseInt(a.foodType.length);
  const foodTypeB = parseInt(b.foodType.length);
  let filter = document.getElementById("second-filter").value;
  switch (filter) {
    case "low-to-high":
      return foodTypeA - foodTypeB;
    case "high-to-low":
      return foodTypeB - foodTypeA;
    default:
      return;
  }
}
function SecondSortFlights() {
  storedFlights.sort(SortFlightsByClass);
  const parentElement = storedFlights[0].parentNode;
  localStorage.setItem("flights", JSON.stringify(storedFlights));
  AddFlightToStore();
}
function SecondSortSuits() {
  storedSuits.sort(sortSuitsBySize);
  const parentElement = storedSuits[0].parentNode;
  localStorage.setItem("suits", JSON.stringify(storedSuits));
  AddSuitsToStore();
}
function SecondSortFoods() {
  storedFoods.sort(SortFoodsByMeat);
  const parentElement = storedFoods[0].parentNode;
  localStorage.setItem("foods", JSON.stringify(storedFoods));
  AddFoodsToStore();
}

function AddFlightToStore() {
  storedFlights = JSON.parse(localStorage.getItem(`flights`));

  let str = ``;
  for (let i = 0; i < storedFlights.length; i++) {
    str += `
    <div class="col-md-3">
        <div class="card h-100 d-flex flex-column" data-id-number="1-12345" data-category="Electronics">
          <img src="${storedFlights[i].image
      }" class="card-img-top product-image" alt="Product Image 1">
          <div class="card-body">
            <h5 class="card-title">${storedFlights[i].name}</h5>
            <p class="card-text">
              <span>ID Number: ${storedFlights[i].id}</span><br>
              <span>Category: ${storedFlights[i].category}</span><br>
              <span class="">Price: $${(Number(storedFlights[i].price) * 0.7).toFixed(2)}</span><br>
              <span class="text-decoration-line-through">Original Price: $${storedFlights[i].price}</span><br>
              <span class="text-danger">Discount: -30%</span><br>
              <span class="text-muted">Discount until: 2023-07-31</span>
            </p>
            <button class="flightToCart btn btn-primary prodBut" data-ind="${i}" data-discount="${(Number(storedFlights[i].price) * 0.7).toFixed(2)}" data-prod="flight">Add to Cart</button>
          </div>
        </div>
      </div>`;
  }
  productGridF.innerHTML = str;

  let flightToCart = document.querySelectorAll(".flightToCart");
  for (let i = 0; i < flightToCart.length; i++) {
    flightToCart[i].addEventListener("click", AddFlightToCart);
  }
}

function AddFoodsToStore() {
  let str = ``;
  storedFoods = JSON.parse(localStorage.getItem(`foods`));

  for (let i = 0; i < storedFoods.length; i++) {
    str += `

    <div class="col-md-3">
        <div class="card h-100 d-flex flex-column">
          <img src="${storedFoods[i].image
      }" class="card-img-top product-image" alt="Product Image 1">
          <div class="card-body">
            <h5 class="card-title">${storedFoods[i].name}</h5>
            <p class="card-text">
            <span>ID: ${storedFoods[i].id}</span><br>
              <span>Dairy/Meat: ${storedFoods[i].foodType}</span><br>
              <span>Kosher Status: ${storedFoods[i].kosherStatus}</span><br>
              <span>Hypoallergenic: ${storedFoods[i].hypoallergenicStatus}</span><br>
              <span class="">Price: ${(Number(storedFoods[i].price) * 0.8).toFixed(2)}</span><br>
              <span class="text-decoration-line-through">Original Price: $${storedFoods[i].price}</span><br>
              <span class="text-danger">Discount: -20%</span><br>
              <span class="text-muted">Discount until: 2023-07-31</span>
            </p>
            <button class="foodToCart btn btn-primary prodBut" data-ind="${i}" data-discount="${(Number(storedFoods[i].price) * 0.8).toFixed(2)} data-prod="food">Add to Cart</button>
          </div>
        </div>
      </div>`;
  }
  productGridFood.innerHTML = str;

  let foodToCart = document.querySelectorAll(".foodToCart");
  for (let i = 0; i < foodToCart.length; i++) {
    foodToCart[i].addEventListener("click", AddFoodToCart);
  }
}

function AddSuitsToStore() {
  let str = ``;
  storedSuits = JSON.parse(localStorage.getItem(`suits`));

  for (let i = 0; i < storedSuits.length; i++) {
    str += `
    <div class="col-md-3">
        <div class="card h-100 d-flex flex-column">
          <img src="${storedSuits[i].image
      }" class="card-img-top product-image" alt="Space Suit Image">
          <div class="card-body">
            <h5 class="card-title">${storedSuits[i].name}</h5>
            <p class="card-text">
              <span>Size:${storedSuits[i].size}</span><br>
              <span>Color: ${storedSuits[i].color}</span><br>
              <span class="">Price: $${(Number(storedSuits[i].price) * 0.7).toFixed(2)}</span><br>
              <span class="text-decoration-line-through">Original Price: $${storedSuits[i].price}</span><br>
              <span class="text-danger">Discount: -30%</span><br>
              <span class="text-muted">Discount until: 2023-07-31</span>
            </p>
            <button class="suitToCart btn btn-primary prodBut" data-ind="${i}" data-discount="${(Number(storedSuits[i].price) * 0.7).toFixed(2)}"  data-prod="suit">Add to Cart</button>
          </div>
        </div>
      </div>`;
  }

  productGridSuit.innerHTML = str;
  let suitToCart = document.querySelectorAll(".suitToCart");
  for (let i = 0; i < suitToCart.length; i++) {
    suitToCart[i].addEventListener("click", AddSuitToCart);
  }
}

function AddFlightToCart(event) {
  let flightIndex = Number(event.target.dataset.ind);
  let discount = Number(event.target.dataset.discount);
  if (discount) {
    storedFlights[flightIndex].price = Number(discount);
  }
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.push(storedFlights[flightIndex]);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  UpDatecart();
}

function AddFoodToCart(event) {
  let foodIndex = Number(event.target.dataset.ind);
  let discount = Number(event.target.dataset.discount);
  if (discount) {
    storedFoods[foodIndex].price = Number(discount);
  }
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.push(storedFoods[foodIndex]);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  UpDatecart();
}

function AddSuitToCart(event) {
  let suitIndex = Number(event.target.dataset.ind);
  let discount = Number(event.target.dataset.discount);
  if (discount) {
    storedSuits[suitIndex].price = Number(discount);
  }
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.push(storedSuits[suitIndex]);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  UpDatecart();
}

export function UpDatecart() {
  let str = "";
  let cart = JSON.parse(sessionStorage.getItem("cart"));

  for (let i = 0; i < cart.length; i++) {
    str += `
        <tr>
        <td>${cart[i].id}</td>
        <td><img src="${cart[i].image}" class="card-img-top" alt=""></td>
        <td>${cart[i].category}</td>
        <td>${cart[i].price}</td>
        <td><button class="btn-sm btn-danger removeItem" data-ind="${i}">Remove</button></td>
    `;
  }

  cartTable.innerHTML = str;
  let removeItem = document.querySelectorAll(".removeItem");
  removeItem.forEach((element) => {
    element.addEventListener("click", RemoveItem);
  });
  CartPrice();
}

function CartPrice() {
  let total = 0;
  cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.forEach((element) => {
    total += Number(element.price);
  });

  document.getElementById("total").innerHTML = "Total: $" + total;
}

function RemoveItem(event) {
  let index = Number(event.target.dataset.ind);
  cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  UpDatecart();
}

function AdminEdit(event) {
  let index = Number(event.target.dataset.ind);
  const td = document.getElementById(`user${index}`);
  let storedUsers = JSON.parse(localStorage.getItem("users"));

  td.innerHTML += `
    <div class="container text-center p-2">
      <h2 class="heading-5" >Edit User Details</h2>
      <label for="firstName">First Name:</label>
      <input type="text" id="EditFirstName" value="${storedUsers[index].firstName}"><br>

      <label for="lastName">Last Name:</label>
      <input type="text" id="EditLastName" value="${storedUsers[index].lastName}"><br>

      <label for="email">Email:</label>
      <input type="email" id="EditEmail" value="${storedUsers[index].email}"><br>

      <label for="password">Password:</label>
      <input type="password" id="EditPassword" value="${storedUsers[index].password}"><br>

      <label for="username">Username:</label>
      <input type="text" id="EditUsername" value="${storedUsers[index].username}"><br>

      <button id="saveBtn" class="btn btn-info btn-md">Save</button>
    </div>`;

  document.getElementById("saveBtn").addEventListener("click", function () {

    let firstName = document.getElementById("EditFirstName");
    if (firstName.value) {
      let firstNameValue = firstName.value;
      for (let element of firstNameValue) {
        if (
          !(
            (element >= "א" && element <= "ת") ||
            (element >= "a" && element <= "z") ||
            (element >= "A" && element <= "Z") ||
            (element >= "а" && element <= "я") ||
            (element >= "А" && element <= "Я")
          )
        ) {
          firstName.style.border = "2px solid red";
          return;
        } else {
          firstName.style.border = "2px solid green";
        }
      }
    } else {
      firstName.style.border = "2px solid red";
    }

    let lastName = document.getElementById("EditLastName");
    if (lastName.value) {
      let lastNameValue = lastName.value;
      for (let element of lastNameValue) {
        if (
          !(
            (element >= "א" && element <= "ת") ||
            (element >= "a" && element <= "z") ||
            (element >= "A" && element <= "Z") ||
            (element >= "а" && element <= "я") ||
            (element >= "А" && element <= "Я")
          )
        ) {
          lastName.style.border = "2px solid red";
          return;
        } else {
          lastName.style.border = "2px solid green";
        }
      }
    } else {
      lastName.style.border = "2px solid red";
    }

    let email = document.getElementById("EditEmail");
    if (email.value && email.value.endsWith(".com")) {
      let emailValue = email.value;
      let count = 0;
      for (let element of emailValue) {
        if (element == "@") {
          count++;
        }
        if (
          (element >= "a" && element <= "z") ||
          (element >= "A" && element <= "Z") ||
          element == "@" ||
          element == "." ||
          (element >= "0" && element <= "9")
        ) {
          email.style.border = "2px solid green";
        } else {
          email.style.border = "2px solid red";
          return;
        }
      }
      if (count != 1) {
        email.style.border = "2px solid red";
        return;
      }
    } else {
      email.style.border = "2px solid red";
      return;
    }

    let password = document.getElementById("EditPassword");
    if (!password.value) {
      password.style.border = "2px solid red";
    } else {
      if (CheckPassword(password)) {
        password.style.border = "2px solid red";
        return;
      }
      password.style.border = "2px solid green";
    }

    let username = document.getElementById("EditUsername");
    if (username.value || username.value.length > 60) {
      let usernameValue = username.value;
      for (let element of usernameValue) {
        if (element >= "א" && element <= "ת") {
          username.style.border = "2px solid red";
          return;
        } else {
          username.style.border = "2px solid green";
        }
      }
    } else {
      username.style.border = "2px solid red";
    }

    storedUsers[index].firstName = firstName.value;
    storedUsers[index].lastName = lastName.value;
    storedUsers[index].email = email.value;
    storedUsers[index].password = password.value;
    storedUsers[index].username = username.value;

    localStorage.setItem("users", JSON.stringify(storedUsers));

    UserTable();
  });
}

export function UpdateInformation() {
  //כפתור שמראה את הסיסמא
  document.querySelector("#showPassUpdate").addEventListener("click", () => {
    let pass = document.querySelector("#passwordUpdate");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  });
  document.querySelector("#UpdateInformationForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let firstName = document.getElementById("firstNameUpdate");
    if (firstName.value) {
      let firstNameValue = firstName.value;
      for (let element of firstNameValue) {
        if (
          !(
            (element >= "א" && element <= "ת") ||
            (element >= "a" && element <= "z") ||
            (element >= "A" && element <= "Z") ||
            (element >= "а" && element <= "я") ||
            (element >= "А" && element <= "Я")
          )
        ) {
          firstName.style.border = "2px solid red";
          return;
        } else {
          firstName.style.border = "2px solid green";
        }
      }
    }

    let lastName = document.getElementById("lastNameUpdate");
    if (lastName.value) {
      let lastNameValue = lastName.value;
      for (let element of lastNameValue) {
        if (
          !(
            (element >= "א" && element <= "ת") ||
            (element >= "a" && element <= "z") ||
            (element >= "A" && element <= "Z") ||
            (element >= "а" && element <= "я") ||
            (element >= "А" && element <= "Я")
          )
        ) {
          lastName.style.border = "2px solid red";
          return;
        } else {
          lastName.style.border = "2px solid green";
        }
      }
    }

    let birthDate = document.getElementById("BirthDateUpdate");
    let birthDateValue = new Date(birthDate.value);
    let currentDate = new Date();
    if (birthDate.value) {
      if (
        currentDate.getFullYear() - birthDateValue.getFullYear() < 120 &&
        birthDateValue < currentDate
      ) {
        birthDate.style.border = "2px solid green";
      } else {
        birthDate.style.border = "2px solid red";
        return;
      }
    }

    let email = document.getElementById("emailUpdate");
    if (email.value) {
      let emailValue = email.value;
      for (let element of emailValue) {
        if (
          (element >= "a" && element <= "z") ||
          (element >= "A" && element <= "Z") ||
          element == "@" ||
          element == "." ||
          (element >= "0" && element <= "9")
        ) {
          email.style.border = "2px solid green";
        } else {
          email.style.border = "2px solid red";
          return;
        }
      }
    }

    let password = document.getElementById("passwordUpdate");
    if (password.value) {
      if (CheckPassword(password)) {
        password.style.border = "2px solid red";
        return;
      }
    }

    let city = document.getElementById("cityUpdate");
    if (city.value) {
      let cityValue = city.value;
      for (let element of cityValue) {
        if (!((element >= "א" && element <= "ת") || element == " ")) {
          city.style.border = "2px solid red";
          return;
        } else {
          city.style.border = "2px solid green";
        }
      }
    }

    let street = document.getElementById("streetUpdate");
    if (street.value) {
      let streetValue = street.value;
      for (let element of streetValue) {
        if (!((element >= "א" && element <= "ת") || element == " ")) {
          street.style.border = "2px solid red";
          return;
        } else {
          street.style.border = "2px solid green";
        }
      }
    }

    let number = document.getElementById("numberUpdate");
    number.style.border = !number.value ? "2px solid red" : "2px solid green";

    let connectedUser = JSON.parse(sessionStorage.getItem("connectedUser"));

    if (firstName.value) {
      connectedUser.firstName = firstName.value;
    }
    if (lastName.value) {
      connectedUser.lastName = lastName.value;
    }
    if (birthDate.value) {
      connectedUser.birthDate = birthDate.value;
    }
    if (email.value) {
      connectedUser.email = email.value;
    }
    if (password.value) {
      connectedUser.password = password.value;
    }
    if (city.value) {
      connectedUser.city = city.value;
    }
    if (street.value) {
      connectedUser.street = street.value;
    }
    if (number.value) {
      connectedUser.number = number.value;
    }

    sessionStorage.setItem("connectedUser", JSON.stringify(connectedUser));

    let users = JSON.parse(localStorage.getItem("users"));
    let updatedUsers = users.map((user) =>
      user.username === connectedUser.username ? connectedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.location.assign("./managerProfile.html");
  });
}

export function LogIn_LogOut() {
  let user;
  let userJSON = sessionStorage.getItem("connectedUser");

  if (userJSON && userJSON != "null" && userJSON != "undefined") {
    user = JSON.parse(userJSON);
  }
  if (user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("logout").style.display = "inline-block";
    document.getElementById("profileRed").style.display = "inline-block";
    AddFeatured();
    if (window.location.href.includes("/store")) {
      if (user.password === `admin1234admin`) {
        document.getElementById("addItem").classList.remove('none');
      }
      else {
        document.getElementById("addItem").classList.add('none');

      }
    }
  } else {
    document.getElementById("login").style.display = "inline-block";
    document.getElementById("signup").style.display = "inline-block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("profileRed").style.display = "none";
  }
}

export function LogOut() {
  console.log("logout");
  document.getElementById("login").style.display = "inline-block";
  document.getElementById("signup").style.display = "inline-block";
  document.getElementById("logout").style.display = "none";
  // document.getElementById('addItem').classList.add('none');

  if (window.location.href.includes("/managerProfile")) {
    document.getElementById("update-tab").classList.add("disabled");
    document.getElementById("manage-tab").classList.add("disabled");
  }
  sessionStorage.setItem("connectedUser", JSON.stringify(null));
  window.location.reload();
}


function AddFeatured(){
  let sec = document.getElementById("addFeat");
  sec.innerHTML+=
  `
  <div class="container">
  <div class="section-header">
    <h2 class="display-4">Featured Sales</h2>
    <p>Check out these amazing products on sale!</p>
  </div>

  <div class="row">
    <!-- Product 1 -->
    <div class="col-lg-4">
    <div class="card h-100 d-flex flex-column">
      <img src="${storedSuits[0].image
  }" class="card-img-top product-image" alt="Space Suit Image">
      <div class="card-body">
        <h5 class="card-title">${storedSuits[0].name}</h5>
        <p class="card-text">
          <span>Size:${storedSuits[0].size}</span><br>
          <span>Color: ${storedSuits[0].color}</span><br>
          <span class="">Price: $${(Number(storedSuits[0].price) * 0.7).toFixed(2)}</span><br>
          <span class="text-decoration-line-through">Original Price: $${storedSuits[0].price}</span><br>
          <span class="text-danger">Discount: -30%</span><br>
          <span class="text-muted">Discount until: 2023-07-31</span>
        </p>
        <button class="suitToCart btn btn-primary prodBut" data-ind="${0}" data-discount="${(Number(storedSuits[0].price) * 0.7).toFixed(2)}"  data-prod="suit">Add to Cart</button>
      </div>
    </div>
    </div>

    <!-- Product 2 -->
    <div class="col-lg-4">
    <div class="card h-100 d-flex flex-column" data-id-number="1-12345" data-category="Electronics">
      <img src="${storedFlights[0].image
  }" class="card-img-top product-image" alt="Product Image 1">
      <div class="card-body">
        <h5 class="card-title">${storedFlights[0].name}</h5>
        <p class="card-text">
          <span>ID Number: ${storedFlights[0].id}</span><br>
          <span>Category: ${storedFlights[0].category}</span><br>
          <span class="">Price: $${(Number(storedFlights[0].price) * 0.7).toFixed(2)}</span><br>
          <span class="text-decoration-line-through">Original Price: $${storedFlights[0].price}</span><br>
          <span class="text-danger">Discount: -30%</span><br>
          <span class="text-muted">Discount until: 2023-07-31</span>
        </p>
        <button class="flightToCart btn btn-primary prodBut" data-ind="${0}" data-discount="${(Number(storedFlights[0].price) * 0.7).toFixed(2)}" data-prod="flight">Add to Cart</button>
      </div>
    </div>
    </div>

    <!-- Product 3 -->
    <div class="col-lg-4">
    <div class="card h-100 d-flex flex-column">
      <img src="${storedFoods[0].image
  }" class="card-img-top product-image" alt="Product Image 1">
      <div class="card-body">
        <h5 class="card-title">${storedFoods[0].name}</h5>
        <p class="card-text">
        <span>ID: ${storedFoods[0].id}</span><br>
          <span>Dairy/Meat: ${storedFoods[0].foodType}</span><br>
          <span>Kosher Status: ${storedFoods[0].kosherStatus}</span><br>
          <span>Hypoallergenic: ${storedFoods[0].hypoallergenicStatus}</span><br>
          <span class="">Price: ${(Number(storedFoods[0].price) * 0.8).toFixed(2)}</span><br>
          <span class="text-decoration-line-through">Original Price: $${storedFoods[0].price}</span><br>
          <span class="text-danger">Discount: -20%</span><br>
          <span class="text-muted">Discount until: 2023-07-31</span>
        </p>
        <button class="foodToCart btn btn-primary prodBut" data-ind="${0}" data-discount="${(Number(storedFoods[0].price) * 0.8).toFixed(2)} data-prod="food">Add to Cart</button>
      </div>
    </div>
    </div>
  </div>
</div>
  `
}