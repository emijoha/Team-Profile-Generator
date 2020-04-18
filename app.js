const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const startTeam = () => {
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
    const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(newManager);
    addTeam();
    });
};

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
            type: "number",
            name: "github",
            message: "What is their github username?"
        }
    ]).then(answers => {
    const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    employees.push(newEngineer);
    addTeam();
    });
};

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
            type: "number",
            name: "school",
            message: "What school do they attend?"
        }
    ]).then(answers => {
    const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
    employees.push(newIntern);
    addTeam();
    });
};

const addTeam = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "addTeam",
            message: "Are there more team members to add?",
            choices: ["Yes, add an Engineer", "Yes, add an Intern", "No, I'm done!"]
        }
    ]).then(answers => {
        if (answers.addTeam === "Yes, add an Engineer") {
            createEngineer();
        }
        if (answers.addTeam === "Yes, add an Intern") {
            createIntern();
        }
        if (answers.addTeam === "No, I'm done!") {
            fs.writeFile(outputPath, render(employees), err => {
                if (err) throw err;
                console.log("File team.html saved!");
            })
        }
    });
};

startTeam();