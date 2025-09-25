// employee-manager.js

// Import the built-in 'readline' module for interactive user input/output
const readline = require('readline');

// Initialize the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array to store employee objects (in-memory database)
const employees = [
    { name: 'Alice', id: 'E101' },
    { name: 'Bob', id: 'E102' }
];

/**
 * Displays the main menu options to the user.
 */
function showMenu() {
    console.log('\n==============================');
    console.log('Employee Management System');
    console.log('==============================');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Remove Employee');
    console.log('4. Exit');
    console.log('------------------------------');
    // Prompt the user for their choice after showing the menu
    promptUserForChoice();
}

/**
 * Prompts the user to enter their choice from the menu.
 */
function promptUserForChoice() {
    rl.question('Enter your choice: ', (choice) => {
        handleChoice(choice.trim());
    });
}

/**
 * Handles the user's menu choice by calling the appropriate function.
 * @param {string} choice - The user's input choice.
 */
function handleChoice(choice) {
    switch (choice) {
        case '1':
            addEmployee();
            break;
        case '2':
            listEmployees();
            break;
        case '3':
            removeEmployee();
            break;
        case '4':
            exitApp();
            break;
        default:
            console.log(`\nInvalid choice: ${choice}. Please enter a number from 1 to 4.`);
            showMenu(); // Show the menu again
            break;
    }
}

// --- Menu Option Handlers ---

/**
 * Prompts the user for employee name and ID and adds the new employee.
 */
function addEmployee() {
    rl.question('Enter employee name: ', (name) => {
        const employeeName = name.trim();
        rl.question('Enter employee ID: ', (id) => {
            const employeeID = id.trim().toUpperCase(); // Standardize ID format

            if (employeeName && employeeID) {
                // Check if an employee with the same ID already exists
                const existingEmployee = employees.find(emp => emp.id === employeeID);
                if (existingEmployee) {
                    console.log(`\nError: An employee with ID ${employeeID} already exists (${existingEmployee.name}).`);
                } else {
                    const newEmployee = { name: employeeName, id: employeeID };
                    employees.push(newEmployee);
                    console.log(`\nEmployee ${employeeName} (ID: ${employeeID}) added successfully.`);
                }
            } else {
                console.log('\nError: Employee name and ID cannot be empty.');
            }
            showMenu(); // Return to the main menu
        });
    });
}

/**
 * Lists all employees currently stored in the array.
 */
function listEmployees() {
    console.log('\n--- Employee List ---');
    if (employees.length === 0) {
        console.log('No employees found.');
    } else {
        employees.forEach((employee, index) => {
            console.log(`${index + 1}. Name: ${employee.name}, ID: ${employee.id}`);
        });
    }
    console.log('---------------------');
    showMenu(); // Return to the main menu
}

/**
 * Prompts the user for an employee ID and removes the corresponding employee.
 */
function removeEmployee() {
    rl.question('Enter employee ID to remove: ', (id) => {
        const employeeID = id.trim().toUpperCase();
        
        // Find the index of the employee with the given ID
        const indexToRemove = employees.findIndex(employee => employee.id === employeeID);

        if (indexToRemove !== -1) {
            // Employee found, remove it using splice and get the removed employee object
            const removedEmployee = employees.splice(indexToRemove, 1)[0];
            console.log(`\nEmployee ${removedEmployee.name} (ID: ${removedEmployee.id}) removed successfully.`);
        } else {
            console.log(`\nError: Employee with ID ${employeeID} not found.`);
        }
        showMenu(); // Return to the main menu
    });
}

/**
 * Closes the readline interface and exits the application.
 */
function exitApp() {
    console.log('\nExiting Employee Management System. Goodbye!');
    rl.close();
    // process.exit(0); // Optional: ensure the process exits cleanly
}

// --- Application Start ---

// Start the application by showing the menu
showMenu();
