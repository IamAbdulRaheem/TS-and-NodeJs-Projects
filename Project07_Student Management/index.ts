#! /usr/bin/env node

import inquirer from "inquirer";
import chalk, { Chalk } from "chalk";

let myBalance=20000;

// Defined Different properties for the student using class and constructor
class Student {
    public id:number;
    public feePaid:boolean=false;
    constructor(
        public name: string,
        public course: string,
    ) {
        this.id= this.generateStudentId();
    }
    generateStudentId():number{
        return Math.floor(10000+Math.random()*90000);
    }
}

// All the properties of student will be pushed here
const students:Student[]=[];


console.log(chalk.greenBright.bold(
`*******************************************
    
* WELCOME TO AR STUDENT MANAGEMENT SYSTEM *
    
******************************************* `
    ));


// Used a funtion for Start point of Application with Main Menu
async function main() {
    while (true) {
        const {mainMenu}= await inquirer.prompt([
            {
                name: "mainMenu",
                message: chalk.bold.yellowBright("Please select one of Given Option:"),
                type: "list",
                choices:["Addmissions","About this App", "Exit"]
            }
        ]);

        switch (mainMenu) {
            case "Addmissions":
               await addStudents();
                return;
            case "About this App":
               await showAbout();
                break;
            case "Exit":
                console.log(chalk.bold.redBright(`Exiting Application!!! We would like to see you again.`));
                return;
        }
    }
}

main();

// Used a function addstudents() for taking input from the student about his name and course and many other
async function addStudents() {
        const answers= await inquirer.prompt([
            {
                name: "enterName",
                message: "Enter Name:",
                type: "input",
            },
            {
                name:"selectCourse",
                message: chalk.bold.yellowBright("Select one of Given Course"),
                type: "list",
                choices:["Python Programming", "TypeScript Programming", "Web Development", "Android Development", "Game Development", "Artificial Intelligence", "Machine Learning", "Data Science"]
            }
        ]);
        const student = new Student(answers.enterName, answers.selectCourse);
        students.push(student);

        console.log(chalk.bold.greenBright(`Welcome ${student.name}! Your Unique 5 digit ID is: ${student.id}`));
        
        await moreOptions();
    
}



// Used a function checkStatus() to show the status of student whenever he will enter the check status option
async function checkStatus() {
    const {enterId}= await inquirer.prompt([
        {
            name: "enterId",
            message: "Enter your Unique 5 digit ID:",
            type: "number",
        }
    ]);

    const student= students.find(student=> student.id===enterId);
    if (student) {
        console.log(chalk.bold.cyanBright(`Name: ${student.name}`));
        console.log(chalk.bold.cyanBright(`ID: ${student.id}`));
        console.log(chalk.bold.cyanBright(`Course: ${student.course}`));
        console.log(chalk.bold.cyanBright(`Current Balance: ${myBalance}`));
        console.log(chalk.bold.cyanBright(`Fee Status: ${student.feePaid ? 'Paid' : 'Unpaid'}`));
    }
    else{
        console.log(chalk.bold.redBright(`ID not found!`));
    }
}


// Used a function payFee() for paying tution fee of students
async function payFee() {
    const {enterId,enterAmount}= await inquirer.prompt([
        {
            name: "enterId",
            message: chalk.bold("Enter your Unique 5 digit ID:"),
            type: "number",
        },
        {
            name: "enterAmount",
            message: chalk.bold("Enter Amount:"),
            type: "number",
        }
    ]);

    const student= students.find(student=> student.id===enterId);

    // Defined different condition for the students according to the situation
    if (student) {
        if (student.feePaid) {
            console.log(chalk.bold.cyanBright(`Dear Student ${student.name}, Your fee is already paid.`));
        }
        else if (enterAmount>myBalance) {
            console.log(chalk.bold.redBright(`InSufficient Balance!!! You can check your balance in Check Status option.`));
        }
        else{
            myBalance -= enterAmount;
            student.feePaid = true;
            console.log(chalk.bold.greenBright(`The tution fee for Student ${student.name} with ID ${student.id} is paid successfully.`));
        }
    }
    else{
        console.log(chalk.bold.redBright(`Incorrect ID!!! You can check your ID in Check Status Option.`));
    }
}

// Used a function moreOptions() to show the options for different tasks and functions for these options have been defined above
async function moreOptions() {
    while (true) {
        const{options}= await inquirer.prompt([
            {
                name: "options",
                message: chalk.bold.yellowBright("Please Select One of Given Options:"),
                type: "list",
                choices: ["Add Student", "Check Status", "Pay Fee", "Exit"]
            }
        ]);

        const student= students.find(student=>student.name)

        // Defined the different conditions for the options that whenever we will select the option than a specific fuction will run for that option and after that operation is completed than it will show again all the options until we exit the application
        switch (options) {
            case "Add Student":
               await addStudents();
               return;
            case "Check Status":
               await checkStatus();
                break;
            case "Pay Fee":
               await payFee();
                break;
            case "Exit":
                console.log(chalk.bold.redBright(`Exiting Application!!! We would like to see you again.`));
            return;
        }
    }
}

// Used a funtion showAbout() to show a description of student management app
async function showAbout() {
    console.log(chalk.bold.cyanBright(
`******************
    
* ABOUT THIS APP *
    
****************** `
    ));

    console.log("This application helps you to manage your courses and fee payments efficiently.");
    console.log(chalk.bold.greenBright("**Key Features:**"));
    console.log("1. Admissions: Register for new courses and get a unique student ID.");
    console.log("2. Check Status: View your registered courses and payment status.");
    console.log("3. Pay Fee: Pay your course fees and update your payment status.");
    console.log("4. Announcements: Stay updated with the latest news and notifications.");
    console.log("We hope this application makes your academic journey smoother.");
}