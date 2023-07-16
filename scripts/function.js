import { User } from "./models/User.js";
var storedUsers = JSON.parse(localStorage.getItem(`users`));
var storedSuits;
var storedFoods;
var storedFlights = JSON.parse(localStorage.getItem(`flights`));
var stackedFlights = new Array();
var productGridF = document.getElementById("flightsSec");
var userTable = document.getElementById("userTable");

export function BuildStore() {
  stackedFlights = [
    {
      flightNumber: `165-56A`,
      departureDate: `26/07/2023`,
      arrivalDate: `26/08/2025`,
      classType: `Heavy`,
      image: `/Media/Assets/Ecom/products/prod1.jpg`,
      price: `12,500`,
    },
    {
      flightNumber: `187-96A`,
      departureDate: `26/09/2023`,
      arrivalDate: `26/09/2024`,
      classType: `Medium`,
      image: `/Media/Assets/Ecom/products/prod2.jpg`,
      price: `11,500`,
    },
    {
      flightNumber: `787-96B`,
      departureDate: `26/10/2023`,
      arrivalDate: `26/09/2024`,
      classType: `Light`,
      image: `/Media/Assets/Ecom/products/prod3.jpg`,
      price: `64,500`,
    },
    {
      flightNumber: `T77-96B`,
      departureDate: `26/10/2029`,
      arrivalDate: `26/09/2032`,
      classType: `Heavy`,
      image: `/Media/Assets/Ecom/products/prod4.jpg`,
      price: `164,500`,
    },
  ];

  let str = ``;

  stackedFlights.forEach((element) => {
    str += `
        <div class="card col-lg-3 m-2 mx-auto" >
        <img src="${element.image}" class="prod" alt="Product 1">
        <h3 class="fs-4">${element.flightNumber}
        </h3>
        <p class="small p fw-bold">
          Price: <span>${element.price}</span>
        </p>
        <p class="small p fw-bold">
          Take off: <span>${element.departureDate}</span>
        </p>
      </div>`;
  });

  productGridF.innerHTML += str;
  AddFlightToStore();
}
export function UserTable() {

    
    let manager =new User(
        `Regi`,
        `admin1234`,
        `/Media/Assets/team-3.jpg`,
        `Regina`,
        `Phalange`,
        `Regina@Phalange.com`,
        `1996-11-25`,
        `Hell`,
        `Hell st`,
        `25`);


  let users = `<tr>
            <td>${manager.image}</td>
             <td>${manager.username}</td>
             <td>${manager.lastName} ${manager.firstName}</td>
             <td>${manager.birthDate}</td>
             <td>${manager.street} ${manager.number}, ${manager.city}</td>
             <td>${manager.email}</td>
             </tr>`;


   userTable.innerText += users;          
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

    event.preventDefault()
    let username = document.getElementById("regUsername").value;
    let password = document.getElementById("regPassword").value;
    let image = document.getElementById("image").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let birthDate = document.getElementById("birthDate").value;
    let city = document.getElementById("city").value;
    let street = document.getElementById("street").value;
    let number = document.getElementById("houseNumber").value;

    if (username === "" || password === "" || image === "" || firstName === "" || lastName === "" || email === "" || birthDate === "" || city === "" || street === "" || number === "") {
        alert("Please fill in all the required fields.");
        return;
    }


    // Retrieve the stored user data from localStorage
    let storedUsersJSON = localStorage.getItem("users");

    // Check if the email already exists in localStorage
    if (storedUsersJSON) {
        storedUsers = JSON.parse(storedUsersJSON);
        for (let i = 0; i < storedUsers.length; i++) {
            if (storedUsers[i].email === email) {
                alert("Email already exists. Please choose a different email.");/*להכניס את ההודעה לתיבה ולא באלארט*/
                return;
            }
        }
    } else {
        storedUsers = [];
    }

    let newUser = new User(username, password, image, firstName, lastName, email, birthDate, city, street, number);

    // Add the User object to the storedUsers array
    storedUsers.push(newUser);

    // Convert the storedUsers array to a JSON string
    let updatedUsersJSON = JSON.stringify(storedUsers);

    // Store the JSON string in localStorage
    localStorage.setItem("users", updatedUsersJSON);








    // // Convert the User object to a JSON string
    // let userJSON = JSON.stringify(newUser);

    // // Store the JSON string in localStorage
    // localStorage.setItem(username, userJSON);



    // // Retrieve the JSON string from localStorage
    // let storedUser = localStorage.getItem(username);
    // // Parse the JSON string back into a User object
    // storedUser = JSON.parse(storedUser);

}
export function SendLoginForm() {
  let form = document.querySelector("#submit_login");
  form.addEventListener("click", SubmitLoginForm);

  //כפתור שמראה את הסיסמא
  // document.querySelector('#showPass').addEventListener('click', () => {
  //     let pass = document.querySelector('#floatingPassword');
  //     if (pass.type === "password") {
  //         pass.type = "text";
  //     } else {
  //         pass.type = "password";
  //     }

  // });
}
function SubmitLoginForm() {
  let email = document.getElementById("floatingEmail").value;
  let password = document.getElementById("floatingPassword").value;
  // Retrieve the stored user data from localStorage
  let storedUsersJSON = localStorage.getItem("users");

  // Check if the email already exists in localStorage
  if (storedUsersJSON) {
    storedUsers = JSON.parse(storedUsersJSON);
    for (let i = 0; i < storedUsers.length; i++) {
      if (
        storedUsers[i].email === email &&
        storedUsers[i].password === password
      ) {
        /*התחברות כלומר הפניית נתונים מהלוקל סטורג' לתגניות שיציגו אותו*/
        /*מעבר לדף פרופיל */
        alert("connect");
        document.querySelector("#incorrectPassword").style.visibility =
          "hidden";

        return;
      } else {
        document.querySelector("#incorrectPassword").style.visibility =
          "visible";
      }
    }
  } else {
    alert("No registred users");
  }
}
export function AddSuit() {
  document.querySelector("#addSuit").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Retrieve the input values
    let brandName = document.getElementById("addSuitName").value;
    let size = document.getElementById("addSuitSize").value;
    let color = document.getElementById("addSuitColor").value;
    let image = document.getElementById("addSuitImage").value;
    let price = document.getElementById("addSuitPrice").value;

    // Check if any of the fields are empty
    if (
      !brandName ||
      size === "Choose a size" ||
      color === "Choose a color" ||
      !image ||
      !price
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Create a suit object
    let suit = {
      brandName: brandName,
      size: size,
      color: color,
      image: image,
      price: price,
    };

    // Retrieve the existing suits array from localStorage or create a new one
    let storedSuitsJSON = localStorage.getItem("suits");
    storedSuits = storedSuitsJSON ? JSON.parse(storedSuitsJSON) : [];

    // Add the new suit object to the stored suits array
    storedSuits.push(suit);

    // Convert the updated suits array to a JSON string
    let updatedSuitsJSON = JSON.stringify(storedSuits);

    // Store the JSON string in localStorage
    localStorage.setItem("suits", updatedSuitsJSON);

    // Clear the form fields
    document.getElementById("addSuit").reset();

    // Optionally, display a success message
    alert("Suit added successfully!");
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
    let foodImage = document.getElementById("addFoodImage").value;
    let foodPrice = document.getElementById("addFoodPrice").value;

    // Validate the input values (optional)
    if (foodName === "" || foodPrice === "") {
      alert("Please fill in all the fields.");
      return;
    }

    // Create a food object
    let food = {
      foodName: foodName,
      foodType: foodType ? "meat" : "dairy",
      kosherStatus: kosherStatus ? "yes" : "no",
      hypoallergenicStatus: hypoallergenicStatus ? "yes" : "no",
      foodImage: foodImage,
      foodPrice: foodPrice,
    };

    // Retrieve the stored food array from localStorage
    let storedFoodsJSON = localStorage.getItem("foods");
    storedFoods = storedFoodsJSON ? JSON.parse(storedFoodsJSON) : [];

    // Add the new food object to the stored foods array
    storedFoods.push(food);

    // Convert the updated foods array to a JSON string
    let updatedFoodsJSON = JSON.stringify(storedFoods);

    // Store the JSON string in localStorage
    localStorage.setItem("foods", updatedFoodsJSON);

    // Clear the form fields
    document.getElementById("addFood").reset();

    // Optionally, display a success message
    alert("Food item added successfully!");
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
    let image = document.getElementById("addShipImage").value;
    let price = document.getElementById("addShipPrice").value;

    // Validate the input values (optional)
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
      alert("Ilegal date");
      return;
    }
    // Create a flight object
    let flight = {
      flightNumber: flightNumber,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
      classType: classType,
      image: image,
      price: price,
    };

    // Retrieve the stored flights array from localStorage
    let storedFlightsJSON = localStorage.getItem("flights");
    storedFlights = storedFlightsJSON ? JSON.parse(storedFlightsJSON) : [];

    // Add the new flight object to the stored flights array
    storedFlights.push(flight);

    // Convert the updated flights array to a JSON string
    let updatedFlightsJSON = JSON.stringify(storedFlights);

    // Store the JSON string in localStorage
    localStorage.setItem("flights", updatedFlightsJSON);

    // Clear the form fields
    document.getElementById("addFlight").reset();

    // Optionally, display a success message
    alert("Flight added successfully!");

    AddFlightToStore();
  });
}

//sergey will finish this- so fuck off
function AddFlightToStore() {
  let str = ``;
  storedFlights.forEach((element) => {
    str += `
        <div class="card col-lg-3 m-2 mx-auto" >
        <img src="${element.image}" class="prod" alt="Product 1">
        <h3 class="fs-4">${element.flightNumber}
        </h3>
        <p class="small p fw-bold">
          Price: <span>${element.price}</span>
        </p>
        <p class="small p fw-bold">
          Take off: <span>${element.departureDate}</span>
        </p>
      </div>`;
  });

  productGridF.innerHTML += str;
}


