//Here we are establish Manager, Engineer, and Intern as objects.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//These are our required npm packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//Establish directory path to the Output folder
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//This const is the html creator. When it is called it will format the team array into html elements
const render = require("./lib/htmlRenderer");

//This array will hold our user inputted objects (Manager, Intern, Engineer)
const team = [];

//When this is called, it starts the application.
function start(){
    console.log("Please provide your inputs to the following prompts to create your team page.");
    console.log("First, please provide the manager's information for this project.")
    //This inquirer prompt initiates the necessary manager template questions
    inquirer.prompt([
        {type: "input",
         message: "Manager's Name:",
         name: "name"}, 
         {type: "input",
         message: "Manager's ID:",
         name: "id"}, 
        {type: "input",
         message: "Manager's Email:",
         name: "email"}, 
        {type: "input",
         message: "Manager's Office Number:",
         name: "officeNumber"}
                    ])
    .then(answers => {
        //When the user finishes the questions, it is formatted into a new Manager object with their inputs as constructor values.
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        //This finalized object is then pushed to the team array.
        team.push(manager);
        console.log("Manager successfully added!");
        //We then call the createTeam function to have the user format the rest of their team.
        createTeam();
    })    
    .catch(err => console.log(err));
}

function createTeam(){
    //This inquirer prompt asks the user to either add an intern, add an engineer, or finish their team.
    inquirer.prompt([{
        type: "list",
        message: "Select an option to continue",
        name: "menu",
        choices: ["Add an intern to your team", "Add an engineer to your team", "Finish team"]
    }])
    //Adding an intern prompts them the appropriate questions for an inern...
    .then(answers => {
        if (answers.menu === "Add an intern to your team"){
            
           console.log("Enter the following prompts to add an intern!")
            inquirer.prompt([
                {type: "input",
                message: "Intern's Name:",
                name: "name"}, 
                {type: "input",
                message: "Intern ID:",
                name: "id"}, 
                {type: "input",
                message: "Intern Email:",
                name: "email"}, 
                {type: "input",
                message: "Intern's School:",
                name: "school"}
                            ])
            .then(answers => {
                //...Then formats it into a new Intern object, using the constructor inside the intern.js file.
                let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                //This then pushes it to the team array.
                team.push(intern);
                console.log("Intern successfully added!");
                //Afterwards, we call the createTeam function to restart the menu selection.
                createTeam();

            });
            //Selecting the add engineer option initiates the appropriate inquirer prompt for the engineer...
        } else if (answers.menu === "Add an engineer to your team"){

           console.log("Enter the following prompts to add an engineer!")
            inquirer.prompt([
                {type: "input",
                 message: "Engineer's Name:",
                 name: "name"}, 
                 {type: "input",
                 message: "Engineer's ID:",
                 name: "id"}, 
                {type: "input",
                 message: "Engineer's Email:",
                 name: "email"}, 
                {type: "input",
                 message: "Engineer's GitHub Username:",
                 name: "github"}
                            ])
            .then(answers => {
                //Then constructors the engineer object specific to their inputs using the engineer.js constructor.
                let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                //And then pushing it to the team array.
                team.push(engineer);
                console.log("Engineer successfully added!");
                //We then reinitiate the createTeam function to call the main menu up
                createTeam();
                
            });
            
        } else if (answers.menu === "Finish team"){
            //Omce they select the Finish team option, we call the htmlRenderer.js function
            const html = render(team);
            //After our objects have been formatted into HTML, we use the fs.writeFile function to create a new HTML file with the const html content. 
            fs.writeFile(outputPath, html, (err) => {
                if (err) throw err;
                console.log("Team page created!");   
             });
            }
    });
}

start();
