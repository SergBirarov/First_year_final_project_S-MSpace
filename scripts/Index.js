import { submitForm } from "./function.js";
import { User } from "./models/User.js";

function Main() {

    let form = document.querySelector('#registrationForm');
    form.addEventListener("submit", submitForm);

    //כפתור שמראה את הסיסמא
    document.querySelector('#showPass').addEventListener('click', () => {
        let pass = document.querySelector('#regPassword');
        if (pass.type === "password") {
            pass.type = "text";
        } else {
            pass.type = "password";
        }

    });
    
    // //Function test
    // var storedUser = localStorage.getItem('asd');
    // // Parse the JSON string back into a User object
    // let user = JSON.parse(storedUser);
    // user.__proto__ = new User()  //https://stackoverflow.com/questions/47530248/how-add-methods-from-a-class-to-a-json-object
    // alert(user.GetBirthDate())
}
Main();
