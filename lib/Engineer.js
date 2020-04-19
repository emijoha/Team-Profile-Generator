const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, id, email, github) {
        // Employee class properties
        super(name, id, email);
        // Engineer subclass property
        this.github = github;
    }

    //// simple methods used to get information 
    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;