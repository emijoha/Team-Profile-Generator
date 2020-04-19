const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        // Employee class properties
        super(name, id, email);
        // Intern subclass property
        this.school = school;
    }

    // simple methods used to get information 
    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;