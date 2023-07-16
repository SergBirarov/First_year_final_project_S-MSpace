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
    let user1 = new User(
      `Regi`,
      `admin1234`,
      `/Media/Assets/team-3.jpg`,
      `Regina`,
      `Phalange`,
      `Regina@Phalange.com`,
      `1996-11-25`,
      `Hell`,
      `Hell st`,
      `25`
    );
  
    let manager = `<tr>
                  <td><img src="${user1.image}" alt="User Image" class="img-fluid"></td>
                  <td>${user1.username}</td>
                  <td>${user1.lastName} ${user1.firstName}</td>
                  <td>${user1.birthDate}</td>
                  <td>${user1.street} ${user1.number}, ${user1.city}</td>
                  <td>${user1.email}</td>
                </tr>`;
  
    let userTable = document.getElementById("userTable");
    
    userTable.innerHTML += manager;
    let users =``;
    if(storedUsers){
        storedUsers.forEach(element => {
            users += `<tr>
            <td><img src="${element.image}" alt="User Image" class="img-fluid"></td>
            <td>${element.username}</td>
            <td>${element.lastName} ${element.firstName}</td>
            <td>${element.birthDate}</td>
            <td>${element.street} ${element.number}, ${element.city}</td>
            <td>${element.email}</td>
          </tr>`;
        });
    }
   

    userTable.innerHTML += users;
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

    if (username === "" || password === "" || firstName === "" || lastName === "" || email === "" || birthDate === "" || city === "" || street === "" || number === "") {
        alert("Please fill in all the required fields.");
        return;
    }

    // Get the selected file from the input
    let file = imageInput.files[0];

    // Create a new FileReader instance
    let reader = new FileReader();

    // Set up an event listener for when the file is loaded
    reader.onload = function(event) {
        // The file content will be available in event.target.result
        let imageContent = event.target.result;

        // Retrieve the stored user data from localStorage
        let storedUsersJSON = localStorage.getItem("users");

        // Check if the email already exists in localStorage
        if (storedUsersJSON) {
            let storedUsers = JSON.parse(storedUsersJSON);
            for (let i = 0; i < storedUsers.length; i++) {
                if (storedUsers[i].email === email) {
                    alert("Email already exists. Please choose a different email.");
                    return;
                }
            }
        } else {
            var storedUsers = [];
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
            number: number
        };

        // Add the newUser object to the storedUsers array
        storedUsers.push(newUser);

        // Convert the storedUsers array to a JSON string
        let updatedUsersJSON = JSON.stringify(storedUsers);

        // Store the JSON string in localStorage
        localStorage.setItem("users", updatedUsersJSON);
    };

    // Read the file as a data URL (base64 encoded)
    reader.readAsDataURL(file);
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

        // Create a new FileReader instance
        let reader = new FileReader();

        // Set up an event listener for when the file is loaded
        reader.onload = function (event) {
            // The file content will be available in event.target.result
            let imageContent = event.target.result;

            // Create a suit object with the image content
            let suit = {
                brandName: brandName,
                size: size,
                color: color,
                image: imageContent,
                price: price,
            };

            // Retrieve the existing suits array from localStorage or create a new one
            let storedSuitsJSON = localStorage.getItem("suits");
            let storedSuits = storedSuitsJSON ? JSON.parse(storedSuitsJSON) : [];

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
        };

    });
}
export function AddFood() {
    document.querySelector("#addFood").addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        // Retrieve input values
        let foodName = document.getElementById("addFoodName").value;
        let foodType = document.querySelector('input[name="meat_dairy"]:checked').value;
        let kosherStatus = document.querySelector('input[name="kosher_noKosher"]:checked').value;
        let hypoallergenicStatus = document.querySelector('input[name="hypoallergenic_no"]:checked').value;
        let foodImageInput = document.getElementById("addFoodImage");
        let foodPrice = document.getElementById("addFoodPrice").value;

        // Validate the input values (optional)
        if (foodName === "" || foodPrice === "") {
            alert("Please fill in all the fields.");
            return;
        }

        // Create a FileReader instance
        let reader = new FileReader();

        // Set up an event listener for when the file is loaded
        reader.onload = function (event) {
            // The file content will be available in event.target.result
            let foodImage = event.target.result;

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
        };
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
            alert("Illegal date");
            return;
        }

        // Get the selected file from the image input
        let file = imageInput.files[0];

        // Create a new FileReader instance
        let reader = new FileReader();

        // Set up an event listener for when the file is loaded
        reader.onload = function (event) {
            // The file content will be available in event.target.result
            let image = event.target.result;

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
        };

        // Read the file as a data URL (base64 encoded)
        reader.readAsDataURL(file);
    });
}

//sergey will finish this- so fuck off
function AddFlightToStore() {
    let str = ``;
    if(storedFlights){
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
    }
    

    productGridF.innerHTML += str;
}


