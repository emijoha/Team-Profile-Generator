const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Define starting path for team.html
const OUTPUT_DIR = path.resolve(__dirname, "output");
// final path of team.html
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array to hold all employee objects
const employees = [];

// main function that starts app
const startTeam = () => {
    // Starts with prompting for Manager info, since all teams have a lead
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is their ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is their email?"
        },
        {
            type: "number",
            name: "officeNumber",
            message: "What is their office number?"
        }
    ]).then(answers => {
        // answers are used to create an employee object with the Manager subclass
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        // employee object pushed to employees array
        employees.push(newManager);
        // function to add more team members is called
        addTeam();
    });
};

// When addTeam is call, if Engineer is selected, this createEngineer function will be called
const createEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is their ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is their email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is their github username?"
        }
    ]).then(answers => {
        // answers are used to create an employee object with the Engineer subclass
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // employee object pushed to employees array
        employees.push(newEngineer);
        // addTeam is called to prompt user about additional team members or if done
        addTeam();
    });
};

// When addTeam is call, if Intern is selected, this createIntern function will be called
const createIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the interns's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is their ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is their email?"
        },
        {
            type: "input",
            name: "school",
            message: "What school do they attend?"
        }
    ]).then(answers => {
        // answers are used to create an employee object with the Intern subclass
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        // employee object pushed to employees array
        employees.push(newIntern);
        // addTeam is called to prompt user about additional team members or if done
        addTeam();
    });
};

// the addTeam function, first called at the end of the prompt in startTeam
const addTeam = () => {
    // one simple team-building prompt
    inquirer.prompt([
        {
            type: "list",
            name: "addTeam",
            message: "Are there more team members to add?",
            choices: ["Yes, add an Engineer", "Yes, add an Intern", "No, I'm done!"]
        }
    ]).then(answers => {
        // different functions called depending on the answer selected above
        if (answers.addTeam === "Yes, add an Engineer") {
            createEngineer();
        }
        if (answers.addTeam === "Yes, add an Intern") {
            createIntern();
        }
        if (answers.addTeam === "No, I'm done!") {
            // if user is done adding engineers and interns, team.html file will be written
            // final employees array is passed into the render() function from htmlRenderer.js, which define the content of the team.html file
            fs.writeFile(outputPath, render(employees), err => {
                if (err) throw err;
                console.log("File team.html saved!");
            })
        }
    });
};

// Initiates the app
startTeam();