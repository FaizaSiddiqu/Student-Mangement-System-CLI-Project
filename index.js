#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.magenta("\n\t ~~~~~~ Welcome To My New Project ~~~~~~~ \t\n"));
console.log(chalk.magenta("\n\t ~~~~~~~ STUDENT MANAGEMENT SYSTEM ~~~~~~~ \t\n"));
class STUDENT {
    static counter = 20000;
    name;
    id;
    course;
    balance;
    constructor(name) {
        this.name = name;
        this.id = STUDENT.counter++;
        this.course = [];
        this.balance = 50;
    }
    // make a method to enroll  students in a course
    enrollCourse(course) {
        this.course.push(course);
    }
    // make a method to view balance of student
    viewBalance() {
        console.log(`Balance for ${this.name} : ${this.balance}.`);
    }
    //make a method for pay tution fee 
    tutionFee(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees Paid Successfully for ${this.name} .`);
        console.log(`Remaining balance is : $${this.balance}`);
    }
    //make a method to show student's status
    showStatus() {
        console.log(`Name : ${chalk.greenBright(this.name)}`);
        console.log(`ID : ${chalk.greenBright(this.id)}`);
        console.log(`Courses : ${chalk.greenBright(this.course)}`);
        console.log(`Balance : ${chalk.greenBright(this.balance)}`);
    }
}
;
//Defining a student manager class to manage students
class manage_students {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a New Student
    new_student(name) {
        let student = new STUDENT(name);
        this.students.push(student);
        console.log(chalk.magentaBright(`Name : ${name} added successfully . Student ID ${chalk.greenBright(student.id)}`));
        console.log("\n");
    }
    // Method to enroll a student in a course
    enroll_students(student_id, course) {
        let student_found = this.find_student(student_id);
        if (student_found) {
            student_found.enrollCourse(course);
            console.log(chalk.magentaBright(`${student_found.name} enrolled in ${chalk.greenBright(course)} course successfully.`));
        }
        console.log("\n");
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student Not Found.Please Enter a Correct Student ID");
        }
        console.log("\n");
    }
    //Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.tutionFee(amount);
        }
        else {
            console.log("Student Not Found.Please Enter a Correct Student ID");
        }
        console.log("\n");
    }
    // Method to show student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.showStatus();
        }
        console.log("\n");
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
;
// Main Function to Run Program
async function main() {
    let student_manage = new manage_students();
    // While loop to keep program runnning
    while (true) {
        let select = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "choose an option",
                choices: [
                    "Add student",
                    "Enroll student",
                    "View student balance",
                    "Pay Fees",
                    "Show status",
                    "Exit"
                ]
            }
        ]);
        // using switch case to handle user input
        switch (select.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name ."
                    }
                ]);
                student_manage.new_student(chalk.greenBright(name_input.name));
                break;
            case "Enroll student":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID."
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name."
                    }
                ]);
                chalk.greenBright(student_manage.enroll_students(enroll_input.student_id, enroll_input.course));
                break;
            case "View student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "view_balance",
                        type: "number",
                        message: "Enter a Student ID :"
                    }
                ]);
                chalk.greenBright(student_manage.view_student_balance(balance_input.view_balance));
                break;
            case "Pay Fees":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID."
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Pay the Fee"
                    }
                ]);
                chalk.greenBright(student_manage.pay_student_fees(fee_input.student_id, fee_input.amount));
                break;
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "show_status",
                        type: "number",
                        message: "Enter a Student ID."
                    }
                ]);
                chalk.greenBright(student_manage.show_student_status(status_input.show_status));
                break;
            case "Exit":
                console.log("Exit...");
                process.exit();
        }
        ;
    }
    ;
}
;
//Calling a Function
main();
