//This class takes in the new Manager object information...
class Engineer{
//...And processes it into this constructor function.
    constructor(name, id, email, github) {

        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
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

    getRole(){

    return "Engineer";

    }

    getGithub(){ 

    return this.github; 
    
    }
    
}
//This Javascript file exports the Engineer class 
module.exports = Engineer