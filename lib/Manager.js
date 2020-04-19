const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // Employee class properties
        super(name, id, email);
        // Manager subclass property
        this.officeNumber = officeNumber;
    }

    // simple methods used to get information 
    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;