class Employee {
    // pass in properties of all employees
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    // simple methods used to get information 
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
}

module.exports = Employee;