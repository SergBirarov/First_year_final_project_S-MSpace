import { User } from "./models/User.js";
// export function submitForm() {

//     let username = document.getElementById("regUsername").value;
//     let password = document.getElementById("regPassword").value;
//     let image = document.getElementById("image").value;
//     let firstName = document.getElementById("firstName").value;
//     let lastName = document.getElementById("lastName").value;
//     let email = document.getElementById("email").value;
//     let birthDate = document.getElementById("birthDate").value;
//     let city = document.getElementById("city").value;
//     let street = document.getElementById("street").value;
//     let number = document.getElementById("houseNumber").value;

//     if (username === "" || password === "" || image === "" || firstName === "" || lastName === "" || email === "" || birthDate === "" || city === "" || street === "" || number === "") {
//         alert("Please fill in all the required fields.");
//         submitForm();
//     }

//     emailArray.forEach(element => {
//         if (element == email) {
//             alert("Email is almoust taken");
//             submitForm();
//         }
//     });

//     let newUser = new User(username, password, image, firstName, lastName, email, birthDate, city, street, number);

//     // Convert the User object to a JSON string
//     let userJSON = JSON.stringify(newUser);

//     // Store the JSON string in localStorage
//     localStorage.setItem(username, userJSON);



//     // Retrieve the JSON string from localStorage
//     var storedUser = localStorage.getItem(username);
//     // Parse the JSON string back into a User object
//     storedUser = JSON.parse(storedUser);

// }
var storedUsers;
export function submitForm() {

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
        submitForm();
    }


    // Retrieve the stored user data from localStorage
    var storedUsersJSON = localStorage.getItem("users");

    // Check if the email already exists in localStorage
    if (storedUsersJSON) {
        storedUsers = JSON.parse(storedUsersJSON);
        for (var i = 0; i < storedUsers.length; i++) {
            if (storedUsers[i].email === email) {
                alert("Email already exists. Please choose a different email.");
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
    var updatedUsersJSON = JSON.stringify(storedUsers);

    // Store the JSON string in localStorage
    localStorage.setItem("users", updatedUsersJSON);








    // // Convert the User object to a JSON string
    // let userJSON = JSON.stringify(newUser);

    // // Store the JSON string in localStorage
    // localStorage.setItem(username, userJSON);



    // // Retrieve the JSON string from localStorage
    // var storedUser = localStorage.getItem(username);
    // // Parse the JSON string back into a User object
    // storedUser = JSON.parse(storedUser);

}
