import { SendregistrationForm } from "./function.js";
import { SendLoginForm } from "./function.js";
import { AddSuit } from "./function.js";
import { AddFood } from "./function.js";
import { AddShip } from "./function.js";
import { User } from "./models/User.js";
import { BuildStore } from "./function.js";
import { UserTable } from "./function.js";
import { UpdateInformation } from "./function.js";
import { LogIn_LogOut } from "./function.js";
import { LogOut } from "./function.js";
import { SortStore } from "./function.js";
import { SecondSortStore } from "./function.js";




function Main() {
    
    if (window.location.href.includes("/store")) {
        BuildStore();
        AddSuit();
        AddFood();
        AddShip();
        document.getElementById('price-filter').addEventListener('click',SortStore);
        document.getElementById('second-filter').addEventListener('click',SecondSortStore);
    };
    if (window.location.href.includes("/managerProfile")) {

        // UserTable();
        UpdateInformation();
    };

    SendregistrationForm();
    SendLoginForm();
    document.getElementById('logout').addEventListener('click', LogOut)

    LogIn_LogOut();


}
Main();
