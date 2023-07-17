import { SendregistrationForm } from "./function.js";
import { SendLoginForm } from "./function.js";
import { AddSuit } from "./function.js";
import { AddFood } from "./function.js";
import { AddShip } from "./function.js";
import { User } from "./models/User.js";
import { BuildStore } from "./function.js";
// import { UserTable } from "./function.js";




function Main() {



    if (window.location.href.includes("/store")) {
        BuildStore();
        AddSuit();
        AddFood();
        AddShip();
    };
    if (window.location.href.includes("/managerProfile")) {
        // UserTable();
    };

    SendregistrationForm();
    SendLoginForm();

    let user = JSON.parse(localStorage.getItem('connectedUser'));
    if (user.password) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('signup').style.display = 'none';
        document.getElementById('logout').style.display = 'inline-block';
    }
    else {
        document.getElementById('logout').style.display = 'none';
    }

    let logout = document.getElementById('logout');
    if (logout) {
        logout.querySelector('click', () => {
            console.log(logout);
            document.getElementById('login').style.display = 'inline-block';
            document.getElementById('signup').style.display = 'inline-block';
            document.getElementById('logout').style.display = 'none';
            let user = new User(``, ``, ``, ``, ``, ``, ``, ``, ``, ``);
            localStorage.setItem("connectedUser", JSON.stringify(user));
            location.assign("./managerProfile.html");

        })
    }
    // //Function test
    // var storedUser = localStorage.getItem('asd');
    // // Parse the JSON string back into a User object
    // let user = JSON.parse(storedUser);
    // user.__proto__ = new User()  //https://stackoverflow.com/questions/47530248/how-add-methods-from-a-class-to-a-json-object
    // alert(user.GetBirthDate())

}
Main();
