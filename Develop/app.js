const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function start(){
    console.log("Please provide your inputs to the following prompts to create your team page.");
    console.log("First, please provide the manager's information for this project.")
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
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        team.push(manager);
        console.log("Manager successfully added!");
        
        createTeam();
    })    
    .catch(err => console.log(err));
}

function createTeam(){

    inquirer.prompt([{
        type: "list",
        message: "Select an option to continue",
        name: "menu",
        choices: ["Add an intern to your team", "Add an engineer to your team", "Finish team"]
    }])
    
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

                let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                team.push(intern);
                createTeam();

            });

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

                let engineer = new Engineer(answers.name, answers.id, answers.email, answers.school);
                team.push(engineer);
                createTeam();
                
            });

        } else if (answers.menu === "Finish team"){
            const html = render(team);
            
            fs.writeFile(outputPath, html, (err) => {
                if (err) throw err;
                console.log("Team page created!");   
             });
            }
    });
}

start();
