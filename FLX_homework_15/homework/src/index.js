let zero = 0;
let digits = 2;
const ms = 1000;

/* -------- Company ---------*/
function Company(companyObj) {

    if (!companyObj.name ||
        typeof companyObj.name !== 'string' ||
        !companyObj.owner ||
        typeof companyObj.owner !== 'string' ||
        !companyObj.hasOwnProperty('maxCount') ||
        typeof companyObj.maxCount !== 'number') {
        console.log('ERROR: failed to create an instance of Company!');

        return {};
    }

    this.name = companyObj.name;
    this.owner = companyObj.owner;
    this.maxCount = companyObj.maxCount;
    let employees = [];
    let _logs = [`${this.name} was created in ${new Date()}`];

    this.addNewEmployee = function(newEmployee) {
        if (newEmployee instanceof Employee) {
            if (this.maxCount === employees.length) {
                let minSalaryWorker = employees.reduce(function(prev, curr) {
                    return prev.getSalary() < curr.getSalary() ? prev : curr;
                });
                let minWorkes = [];
                for (let i in employees) {
                    if (minSalaryWorker.getSalary() === employees[i].getSalary()) {
                        minWorkes.push(employees[i]);
                    }
                }
                let maxTimeWorker = minWorkes.reduce(function(prev, curr) {
                    return prev.getWorkTimeInSeconds() > curr.getWorkTimeInSeconds() ? prev : curr;
                });
                this.removeEmployee(employees.indexOf(maxTimeWorker));
            }
            employees.push(newEmployee);
            newEmployee.hire(this.name);
            _logs.push(`${newEmployee.name} starts working at ${newEmployee.employeeCompany} in ${new Date()}`);
        } else {
            console.log('ERROR: newEmployee is not an instance of Employee!');
        }
    }

    this.removeEmployee = function(id) {
        if (id >= zero && id < employees.length) {
            let employeeRemoveAmount = 1;
            employees[id].fire();
            _logs.push(`${employees[id].name} ends working at ${employees[id].employeeCompany} in ${new Date()}`);
            employees.splice(id, employeeRemoveAmount);
        } else {
            console.log('ERROR: incorrect ID value!');
        }
    }

    this.getAvarageSalary = function() {
        if (employees.length === zero) {
            console.log('INFO: employees list is empty. Avarage salary is 0!');
            return zero;
        }
        let allSalary = 0;
        for (let i in employees) {
            allSalary += employees[i].getSalary();
        }
        return +(allSalary / this.maxCount).toFixed(digits);

    }

    this.getEmployees = function() {
        return employees;
    }

    this.getFormattedListOfEmployees = function() {
        employees.forEach(item => {
            console.log(`${item.name} - works in ${item.employeeCompany} ${item.getWorkTimeInSeconds()} seconds.`);
        });
    }

    this.getAvarageAge = function() {
        if (employees.length === zero) {
            console.log('INFO: employees list is empty. Avarage employees age is 0!');
            return zero;
        }
        let allAge = 0;
        for (let i in employees) {
            allAge += employees[i].age;
        }
        return +(allAge / this.maxCount).toFixed(digits);

    }

    this.getHistory = function() {
        if (_logs.length === zero) {
            console.log('INFO: log list is empty!');
        } else {
            for (let i in _logs) {
                console.log(_logs[i]);
            }
        }
    }
}

/* -------- Employee ---------*/
function Employee(employeeObj) {
    if (!employeeObj.name ||
        typeof employeeObj.name !== 'string' ||
        !employeeObj.primarySkill ||
        typeof employeeObj.primarySkill !== 'string' ||
        !employeeObj.hasOwnProperty('age') ||
        typeof employeeObj.age !== 'number' ||
        !employeeObj.hasOwnProperty('salary') ||
        typeof employeeObj.salary !== 'number') {
        console.log('ERROR: failed to create an instance of Employee!');

        return {};
    }

    this.name = employeeObj.name;
    this.primarySkill = employeeObj.primarySkill;
    this.age = employeeObj.age;
    let _salary = employeeObj.salary;
    let startWorkTime;
    let workedTime;
    this.employeeCompany = '';
    let isWorking = false;
    let _historyLog = [];

    this.getSalary = function() {

        return _salary;
    }

    this.setSalary = function(newSalary) {
        if (newSalary < _salary) {
            _historyLog.push(`try to change salary from ${_salary} to ${newSalary}`);
            console.log('ERROR: you cannot set smaller salary!');
        } else if (isNaN(newSalary)) {
            console.log('ERROR: newSalary is NaN!');
        } else {
            _historyLog.push(`change salary from ${_salary} to ${newSalary}`);
            _salary = newSalary;
        }
    }

    this.getWorkTimeInSeconds = function() {
        if (isWorking) {
            let endWorkTime = Date.now();
            return (endWorkTime - startWorkTime) / ms; /* /1000 */
        }
        return workedTime;
    }

    this.hire = function(newEmpComp) {
        if (this.employeeCompany === '') {
            this.employeeCompany = newEmpComp;
            startWorkTime = Date.now();
            isWorking = true;
            _historyLog.push(`${this.name} is hired on ${this.employeeCompany} in ${new Date()}`);
        } else {
            console.log('ERROR: employee should be fired from current company before hiring!');
        }
    }

    this.fire = function() {
        if (this.employeeCompany !== '') {
            let endWorkTime = Date.now();
            workedTime = (endWorkTime - startWorkTime) / ms; /* /1000 */
            _historyLog.push(`${this.name} is fired from ${this.employeeCompany} in ${new Date()}`);
            this.employeeCompany = '';
            isWorking = false;
        } else {
            console.log('ERROR: employee should be hired before firing!');
        }
    }
    this.getHistory = function() {
        if (_historyLog.length === zero) {
            console.log('INFO: log list is empty!');
        } else {
            for (let i in _historyLog) {
                console.log(_historyLog[i]);
            }
        }
    }
}


/* -------- Main ---------*/

console.log('- Creating a company with wrong data -');
let wrongCompany = new Company({ name: 123, owner: 'Helen', maxCount: '333' });
let wrongCompany2 = new Company({ qwerty: 'Helen', maxCount: 22 });

console.log('- Creating Epam company -');
let epam = new Company({ name: 'Epam', owner: 'Arkadii', maxCount: 5 });
console.log('- Getting average salary/age of empty list of Epam company employees -');
console.log(epam.getAvarageSalary());
console.log(epam.getAvarageAge());
console.log('- Getting logs from just created Epam company logs list -');
epam.getHistory();

console.log('- Creating an employee with wrong data -');
let wrongEmployee = new Employee({ name: 222, age: 29, salary: 1000, primarySkill: 'UI' });

console.log('- Adding an employee with wrong data to Epam company -');
epam.addNewEmployee(wrongEmployee);

console.log('- Creating some employees -');
let artem = new Employee({ name: 'Artem', age: 15, salary: 1000, primarySkill: 'UX' });
let vova = new Employee({ name: 'Vova', age: 16, salary: 2000, primarySkill: 'BE' });
let vasyl = new Employee({ name: 'Vasyl', age: 25, salary: 1000, primarySkill: 'FE' });
let ivan = new Employee({ name: 'Ivan', age: 35, salary: 5000, primarySkill: 'FE' });
let orest = new Employee({ name: 'Orest', age: 29, salary: 300, primarySkill: 'AT' });
let anton = new Employee({ name: 'Anton', age: 19, salary: 500, primarySkill: 'Manager' });

console.log('- Getting logs from just created employee Vova logs list -');
vova.getHistory();

console.log('- Adding  employees to Epam company -');
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);

console.log('- Adding an employee when list of employees is full -');
console.log('Before:');
epam.getFormattedListOfEmployees();
epam.addNewEmployee(anton);
console.log('After:');
epam.getFormattedListOfEmployees();

console.log('- Getting average salary/age of Epam company employees -');
console.log(epam.getAvarageSalary());
console.log(epam.getAvarageAge());

console.log('- Removing employee using incorrect ID -');
epam.removeEmployee(-10);
console.log('- Removing employee using correct ID -');
console.log('Before:');
epam.getFormattedListOfEmployees();
epam.removeEmployee(3);
console.log('After:');
epam.getFormattedListOfEmployees();

let andri = new Employee({ name: 'Andri', age: 19, salary: 1000, primarySkill: 'FE' });

console.log('- Trying to fire unhired employee -');
andri.fire();
epam.addNewEmployee(andri);
console.log('- Trying to hire unfired employee -');
andri.hire();

console.log('- Trying to set wrong/lower salary -');
andri.setSalary('33%');
andri.setSalary(500);
console.log('- Displaying salary -');
console.log(andri.getSalary());
andri.setSalary(2000);
console.log('- Changing salary -');
console.log(andri.getSalary());

console.log('- Getting logs from  Epam company logs list -');
epam.getHistory();
console.log('- Getting logs from employee Ivan logs list -');
ivan.getHistory();
console.log('- Getting logs from employee Andri logs list -');
andri.getHistory();

console.log('- Getting  employee Artem worked seconds -');
setTimeout(() => {
    epam.removeEmployee(0);
    console.log(artem.getWorkTimeInSeconds());
    console.log('- Getting logs from employee Artem logs list -');
    artem.getHistory();
}, 5000);
