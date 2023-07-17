import { User } from "./models/User.js";

//Arrays for Users:
//admin
var storedUsers = [new User(
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
)];
var cart = []
// arrays for hardcoded products
var storedFlights = [
  {
    name: `165-56A`,
    departureDate: `26/07/2023`,
    arrivalDate: `26/08/2025`,
    classType: `Heavy`,
    image: `/Media/Assets/Ecom/products/prod1.jpg`,
    price: `12,500`,
  },
  {
    name: `187-96A`,
    departureDate: `26/09/2023`,
    arrivalDate: `26/09/2024`,
    classType: `Medium`,
    image: `/Media/Assets/Ecom/products/prod2.jpg`,
    price: `11,500`,
  },
  {
    name: `787-96B`,
    departureDate: `26/10/2023`,
    arrivalDate: `26/09/2024`,
    classType: `Light`,
    image: `/Media/Assets/Ecom/products/prod3.jpg`,
    price: `64,500`,
  },
  {
    name: `T77-96B`,
    departureDate: `26/10/2029`,
    arrivalDate: `26/09/2032`,
    classType: `Heavy`,
    image: `/Media/Assets/Ecom/products/prod4.jpg`,
    price: `164,500`,
  },
];
var storedFoods = [
  {
    name: `Minced Brains`,
    foodType: `meat`,
    kosherStatus: `no`,
    hypoallergenicStatus: `yes`,
    foodImage: `/Media/Assets/Ecom/products/food1.png`,
    price: `32.50`,
  },
  {
    name: `Ass Bits`,
    foodType: `meat`,
    kosherStatus: `Yes`,
    hypoallergenicStatus: `No`,
    foodImage: `/Media/Assets/Ecom/products/food2.png`,
    price: `19.90`,
  },
  {
    name: `Breast Milk`,
    foodType: `Dairy`,
    kosherStatus: `Yes`,
    hypoallergenicStatus: `No`,
    foodImage: `/Media/Assets/Ecom/products/food3.png`,
    price: `312.30`,
  },
  {
    name: `Shepareds Pie`,
    foodType: `meat`,
    kosherStatus: `No`,
    hypoallergenicStatus: `Yes`,
    foodImage: `/Media/Assets/Ecom/products/food4.png`,
    price: `99.90`,
  },
];
var storedSuits = [
  {
    brandName: `Wolf$Gangs`,
    size: `S/36`,
    color: `White/Silver`,
    image: `/Media/Assets/Ecom/products/suit1.jpg`,
    price: `360.90`,
  },
  {
    brandName: `Wolf$Gangs`,
    size: `M/42`,
    color: `Orange`,
    image: `/Media/Assets/Ecom/products/suit2.jpg`,
    price: `422.90`,
  },
  {
    brandName: `Suits-BaAm`,
    size: `L/46`,
    color: `White/Silver`,
    image: `/Media/Assets/Ecom/products/suit3.jpg`,
    price: `180.90`,
  },
  {
    brandName: `AlaIster`,
    size: `XL/56`,
    color: `White/Silver`,
    image: `/Media/Assets/Ecom/products/suit4.jpg`,
    price: `1360.90`,
  },
];

if (!(localStorage.getItem('users'))) {
  localStorage.setItem('users', JSON.stringify(storedUsers))
}
if (!(localStorage.getItem('flights'))) {
  localStorage.setItem('flights', JSON.stringify(storedFlights))
}
if (!(localStorage.getItem('foods'))) {
  localStorage.setItem('foods', JSON.stringify(storedFoods))
}
if (!(localStorage.getItem('suits'))) {
  localStorage.setItem('suits', JSON.stringify(storedSuits))
}

//html elements for prod and users
var productGridF = document.getElementById("flightsSec");
var productGridFood = document.getElementById("foodSec");
var productGridSuit = document.getElementById("suitSec");

// localStorage.setItem(`users`, JSON.stringify(storedUsers));
// storedUsers.push(JSON.parse(localStorage.getItem(`users`)));

//startup building page with hardcoded elements
export function BuildStore() {
  AddFlightToStore();
  AddFoodsToStore();
  AddSuitsToStore();
}
//user info table
export function UserTable() {
  let userTable = document.getElementById("userTable");
  let users = ``;
  if (storedUsers) {
    storedUsers.forEach((element) => {
      users = `<tr>
            <td><img src="${element.image}" id="profilePicProfile" alt="User Image" class="img-fluid align-content-center"></td>
            <td>${element.username}</td>
            <td>${element.lastName} ${element.firstName}</td>
            <td>${element.birthDate}</td>
            <td>${element.street} ${element.number}, ${element.city}</td>
            <td>${element.email}</td>
          </tr>`;
      userTable.innerHTML += users;
    });
  }
}

export function SendregistrationForm() {
  let form = document.querySelector("#registrationForm");
  form.addEventListener("submit", SubmitRegistrationForm);

  //כפתור שמראה את הסיסמא
  document.querySelector("#showPass").addEventListener("click", () => {
    let pass = document.querySelector("#regPassword");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  });
}

export function SubmitRegistrationForm(event) {
  event.preventDefault();
  let username = document.getElementById("regUsername").value;
  let password = document.getElementById("regPassword").value;
  let imageInput = document.getElementById("image");
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let birthDate = document.getElementById("birthDate").value;
  let city = document.getElementById("city").value;
  let street = document.getElementById("street").value;
  let number = document.getElementById("houseNumber").value;

  if (
    username === "" ||
    password === "" ||
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    birthDate === "" ||
    city === "" ||
    street === "" ||
    number === ""
  ) {
    alert("Please fill in all the required fields.");
    return;
  }

  let file = imageInput.files[0];

  let reader = new FileReader();

  reader.onload = function (event) {
    let imageContent = event.target.result;

    let storedUsersJSON = localStorage.getItem("users");

    if (storedUsersJSON) {
      let storedUsers = JSON.parse(storedUsersJSON);
      for (let i = 0; i < storedUsers.length; i++) {
        if (storedUsers[i].email === email) {
          alert("Email already exists. Please choose a different email.");
          return;
        }
      }
    } else {
      storedUsers = [];
    }

    let newUser = {
      username: username,
      password: password,
      image: imageContent,
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthDate: birthDate,
      city: city,
      street: street,
      number: number,
    };

    storedUsers.push(newUser);

    let updatedUsersJSON = JSON.stringify(storedUsers);

    localStorage.setItem("users", updatedUsersJSON);
  };

  reader.readAsDataURL(file);
}

export function SendLoginForm() {
  let form = document.querySelector("#submit_login");
  form.addEventListener("click", SubmitLoginForm);

  //fix this
  document.querySelector("#showPass").addEventListener("click", () => {
    let pass = document.querySelector("#floatingPassword");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  });
}

function SubmitLoginForm() {
  let email = document.getElementById("floatingEmail").value;
  let password = document.getElementById("floatingPassword").value;
  let storedUsersJSON = localStorage.getItem("users");

  if (storedUsersJSON) {
    let storedUsers = JSON.parse(storedUsersJSON);
    let user = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    let userJSON = JSON.stringify(user);

    localStorage.setItem("connectedUser", userJSON);

    if (user) {
      if (password === `admin1234admin`) {
        location.assign("./managerProfile.html");
        alert(`You are connected as an admin`);
      }
      let add = document.getElementById(`addItem`);

      return;
    } else {
      alert("Incorrect email or password.");
    }
  } else {
    alert("No registered users.");
  }
}



//adding products to localstorage through user input

export function AddSuit() {
  document.querySelector("#addSuit").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Retrieve the input values
    let brandName = document.getElementById("addSuitName").value;
    let size = document.getElementById("addSuitSize").value;
    let color = document.getElementById("addSuitColor").value;
    let imageInput = document.getElementById("addSuitImage");
    let price = document.getElementById("addSuitPrice").value;

    // Check if any of the fields are empty
    if (
      !brandName ||
      size === "Choose a size" ||
      color === "Choose a color" ||
      !imageInput.files[0] ||
      !price
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    let file = imageInput.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      let imageContent = event.target.result;

      let suit = {
        brandName: brandName,
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

    reader.readAsDataURL(file);
  });
}

export function AddFood() {
  document.querySelector("#addFood").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Retrieve input values
    let foodName = document.getElementById("addFoodName").value;
    let foodType = document.querySelector(
      'input[name="meat_dairy"]:checked'
    ).value;
    let kosherStatus = document.querySelector(
      'input[name="kosher_noKosher"]:checked'
    ).value;
    let hypoallergenicStatus = document.querySelector(
      'input[name="hypoallergenic_no"]:checked'
    ).value;
    let foodImageInput = document.getElementById("addFoodImage");
    let foodPrice = document.getElementById("addFoodPrice").value;

    if (foodName === "" || foodPrice === "") {
      alert("Please fill in all the fields.");
      return;
    }

    let file = foodImageInput.files[0];

    let reader = new FileReader();

    reader.onload = function (event) {
      let foodImage = event.target.result;

      let food = {
        name: foodName,
        foodType: foodType ? "meat" : "dairy",
        kosherStatus: kosherStatus ? "yes" : "no",
        hypoallergenicStatus: hypoallergenicStatus ? "yes" : "no",
        foodImage: foodImage,
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

    reader.readAsDataURL(file);
  });
}

export function AddShip() {
  document.querySelector("#addFlight").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Retrieve input values
    let flightNumber = document.getElementById("addFlightNumber").value;
    let departureDate = document.getElementById("addDepartureDate").value;
    let arrivalDate = document.getElementById("addArrivalDate").value;
    let classType = document.getElementById("addShipSize").value;
    let imageInput = document.getElementById("addShipImage");
    let price = document.getElementById("addShipPrice").value;

    if (
      flightNumber === "" ||
      departureDate === "" ||
      arrivalDate === "" ||
      classType === "Choose a class" ||
      price === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }
    if (departureDate > arrivalDate) {
      alert("Invalid date");
      return;
    }

    let file = imageInput.files[0];

    let reader = new FileReader();

    reader.onload = function (event) {
      let image = event.target.result;

      let flight = {
        name: flightNumber,
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

    reader.readAsDataURL(file);
  });
}



//adding the products to the store

function AddFlightToStore() {
  storedFlights = JSON.parse(localStorage.getItem(`flights`));

  let str = ``;
  for (let i = 0; i < storedFlights.length; i++) {
    str += `<div class="card col-lg-3 m-2 mx-auto" >
        <img src="${storedFlights[i].image}" class="prod" alt="Product 1">
        <h3 class="fs-4">${storedFlights[i].name}
        </h3>
        <p class="small p fw-bold">
        Price: <span>${storedFlights[i].price}</span>
        </p>
        <p class="small p fw-bold">
        Take off: <span>${storedFlights[i].departureDate}</span>
        </p>
        <button class="flightToCart btn btn-primary prodBut" data-ind="${i}" data-prod="flight">Add to Cart</button>
        </div>`;
  }
  productGridF.innerHTML = str;

  let flightToCart = document.querySelectorAll('.flightToCart');
  for (let i = 0; i < flightToCart.length; i++) {
    flightToCart[i].addEventListener('click', AddFlightToCart);
  }

}

function AddFoodsToStore() {
  let str = ``;
  storedFoods = JSON.parse(localStorage.getItem(`foods`));

  for (let i = 0; i < storedFoods.length; i++) {
    str += `
    <div class="card col-lg-3 m-2 mx-auto">
  <img src="${storedFoods[i].foodImage}" class="card-img-top" alt="Product ${i + 1}">
  <div class="card-body">
    <h5 class="card-title fw-bold">${storedFoods[i].name}</h5>
    <p class="card-text"><span class="fw-bold">Dairy/Meat: </span>${storedFoods[i].foodType}</p>
    <p class="card-text"><span class="fw-bold">Kosher Status: </span>${storedFoods[i].kosherStatus}</p>
    <p class="card-text"><span class="fw-bold">Hypoallergenic Ingredients: </span>${storedFoods[i].hypoallergenicStatus}</p>
    <p class="card-text">Price: $${storedFoods[i].price}</p>
    <button class="foodToCart btn btn-primary prodBut" data-ind="${i}" data-prod="food">Add to Cart</button>
  </div>
</div>

  `;

  }
  productGridFood.innerHTML = str;

  let foodToCart = document.querySelectorAll('.foodToCart');
  for (let i = 0; i < foodToCart.length; i++) {
    foodToCart[i].addEventListener('click', AddFoodToCart);
  }
}

function AddSuitsToStore() {
  let str = ``;
  storedSuits = JSON.parse(localStorage.getItem(`suits`));

  for (let i = 0; i < storedSuits.length; i++) {
    str += `
    <div class="card col-lg-3 m-2 mx-auto">
  <img src="${storedSuits[i].image}" class="card-img-top" alt="Product ${i + 1}">
  <div class="card-body">
    <h5 class="card-title fw-bold">${storedSuits[i].brandName}</h5>
    <p class="card-text">Size: ${storedSuits[i].size}</p>
    <p class="card-text">Color: ${storedSuits[i].color}</p>
    <p class="card-text">Price: $${storedSuits[i].price}</p>
    <button class="suitToCart btn btn-primary prodBut" data-ind="${i}" data-prod="suit">Add to Cart</button>
  </div>
</div>

        `;
  }

  productGridSuit.innerHTML = str;
  let suitToCart = document.querySelectorAll('.suitToCart');
  for (let i = 0; i < suitToCart.length; i++) {
    suitToCart[i].addEventListener('click', AddSuitToCart);
  }
}


function AddFlightToCart(event) {
  let flightIndex = Number(event.target.dataset.ind);
  let cart = JSON.parse(localStorage.getItem('cart'))
  cart.push(storedFlights[flightIndex])
  localStorage.setItem('cart', JSON.stringify(cart));
  UpDatecart();
}

function AddFoodToCart(event) {
  let foodIndex = Number(event.target.dataset.ind);
  let cart = JSON.parse(localStorage.getItem('cart'))
  cart.push(storedFoods[foodIndex])
  localStorage.setItem('cart', JSON.stringify(cart));
  UpDatecart();
}

function AddSuitToCart(event) {
  let suitIndex = Number(event.target.dataset.ind);
  let cart = JSON.parse(localStorage.getItem('cart'))
  cart.push(storedSuits[suitIndex])
  localStorage.setItem('cart', JSON.stringify(cart));
  UpDatecart();
}

function UpDatecart() {
  let str = "";
  let cart = JSON.parse(localStorage.getItem('cart'))

  for (let i = 0; i < cart.length; i++) {
    str += `${cart[i].name}, ${cart[i].image}, ${cart[i].price}`

  }

  // innerHTML = str;

  console.log(str);
}
