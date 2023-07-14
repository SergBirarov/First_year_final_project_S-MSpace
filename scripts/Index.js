import { SendregistrationForm } from "./function.js";
import { SendLoginForm } from "./function.js";
import { User } from "./models/User.js";

function Main() {

    SendregistrationForm();
    SendLoginForm();







    // //Function test
    // var storedUser = localStorage.getItem('asd');
    // // Parse the JSON string back into a User object
    // let user = JSON.parse(storedUser);
    // user.__proto__ = new User()  //https://stackoverflow.com/questions/47530248/how-add-methods-from-a-class-to-a-json-object
    // alert(user.GetBirthDate())
}
Main();
