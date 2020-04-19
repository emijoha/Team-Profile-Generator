const path = require("path");
const fs = require("fs");

// Defines starting path for html builder files
const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  // Will hold the final html content
  const html = [];

  // Will add Manager card to the html body FIRST
  html.push(employees
    // Select employee(s) of desired role
    .filter(employee => employee.getRole() === "Manager")
    // use employee(s) to render HTML with renderManager/renderEngineer/renderIntern function
    .map(manager => renderManager(manager))
  );
  // Will add all Employee cards after Manager
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  // Will add all Intern cards after Engineers
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  // Returns html array as string, passes it into the renderMain function
  return renderMain(html.join(""));

};

const renderManager = manager => {
  // Use html markup from manager.html and assign to "template" variable
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  // Below, handlebar placeholders {{ in the html template }} are replaced with associated property values of Manager employee object
  // It uses only the methods within the employee object
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  // Use html markup from engineer.html and assign to "template" variable
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  // Below, handlebar placeholders {{ in the html template }} are replaced with associated property values of Engineer employee object
  // It uses only the methods within the employee object
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  // Use html markup from engineer.html and assign to "template" variable
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  // Below, handlebar placeholders {{ in the html template }} are replaced with associated property values of Intern employee object
  // It uses only the methods within the employee object
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  // Use html markup from main.html (head and jumbotron) and assign to "template" variable
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  // Insert html (that already contains manager, engineer, and intern cards) into the {{ team }} placeholder of main.html
  return replacePlaceholders(template, "team", html);
};

// Defines replacePlaceholders function.
const replacePlaceholders = (template, placeholder, value) => {
  // {{ this expression }} is defined as a pattern, with its inner text defined as the placeholder
  // not sure was "gm" does yet
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  // where the pattern is found in the template, the specified placeholder will be replaced with the new passed in value
  return template.replace(pattern, value);
};

module.exports = render;
