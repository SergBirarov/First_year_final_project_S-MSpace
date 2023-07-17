export class User {

    username = "";
    password = "";
    image = "";
    firstName = "";
    lastName = "";
    email = "";
    birthDate = "";
    city = "";
    street = "";
    number = "";

    constructor(_username, _password, _image, _firstName, _lastName, _email, _birthDate, _city, _street, _number) {
        this.username = _username;
        this.password = _password;
        this.image = _image;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.email = _email;
        this.birthDate = _birthDate;
        this.city = _city;
        this.street = _street;
        this.number = _number;
    }


    GetBirthDate() {
        return String(this.birthDate);
    }
    GetFullName() {
        return this.firstName + " " + this.lastName;
    }
}
