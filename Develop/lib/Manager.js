//This class takes in the new Manager object information...
class Manager{
//...And processes it into this constructor function.
    constructor(name, id, email, officeNumber) {

        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber;
    }
    //These functions are referenced in our htmlRenderer Javascript and return what the object's properties are.
    getName(){

    return this.name;

    }

    getId(){

    return this.id;

    }

    getEmail(){

    return this.email;

    }

    getOfficeNumber() {

    return this.officeNumber;
    
    }

    getRole(){

    return "Manager";

    }
}
//This Javascript file exports the Manager Class 
module.exports = Manager