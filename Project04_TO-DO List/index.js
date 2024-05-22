#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
const { menu } = await inquirer.prompt([
    {
        name: "menu",
        type: "list",
        message: chalk.green.bold("Select One of given Options:"),
        choices: ["Add Task", "Exit Application"]
    }
]);
async function addTask() {
    while (true) {
        if (menu === "Add Task") {
            const { task } = await inquirer.prompt([
                {
                    name: "task",
                    type: "input",
                    message: chalk.whiteBright.bold("What do you want to add in your todos?")
                }
            ]);
            if (task.length !== 0) {
                const newTodo = { id: todos.length + 1, task };
                todos.push(newTodo);
                const { addMore } = await inquirer.prompt([
                    {
                        name: "addMore",
                        type: "confirm",
                        message: chalk.grey.bold("Do you want to add more in your todos?")
                    }
                ]);
                if (addMore) {
                    addTask();
                }
                else {
                    const { remainingTask } = await inquirer.prompt([
                        {
                            name: "remainingTask",
                            type: "list",
                            message: chalk.greenBright.bold("Please Select Given Options:"),
                            choices: ["Add More Tasks", "Read Task", "Update Task", "Delete Task", "Exit Application"]
                        }
                    ]);
                    if (remainingTask === "Read Task") {
                        readTask();
                    }
                    else if (remainingTask === "Add More Tasks") {
                        addTask();
                    }
                    else if (remainingTask === "Update Task") {
                        updateTask();
                    }
                    else if (remainingTask === "Delete Task") {
                        deleteTask();
                    }
                    else if (remainingTask === "Exit Application") {
                        console.log(chalk.redBright.bold("Exiting the Application!"));
                    }
                }
                break;
            }
        }
        else if (menu === "Exit Application") {
            console.log(chalk.redBright.bold("Exiting the Application!"));
        }
        break;
    }
}
addTask();
async function readTask() {
    console.log(chalk.cyanBright.bold("There are following Tasks in you Todos:"));
    for (let todo of todos) {
        console.log(chalk.cyanBright.bold(`${todo.id}: ${todo.task}`));
    }
    const { remainingTask } = await inquirer.prompt([
        {
            name: "remainingTask",
            type: "list",
            message: chalk.greenBright.bold("Please Select One of given Option:"),
            choices: ["Add More Tasks", "Update Task", "Delete Task", "Exit Application"]
        }
    ]);
    if (remainingTask === "Add More Tasks") {
        addTask();
    }
    else if (remainingTask === "Update Task") {
        updateTask();
    }
    else if (remainingTask === "Delete Task") {
        deleteTask();
    }
    else if (remainingTask === "Exit Application") {
        console.log(chalk.redBright.bold("Exiting Application!!!"));
    }
}
async function updateTask() {
    const { taskId } = await inquirer.prompt([
        {
            name: "taskId",
            type: "number",
            message: chalk.yellowBright.bold("Enter the ID of task you want to update:")
        }
    ]);
    const todoUpdate = todos.find(todo => todo.id === taskId);
    if (todoUpdate) {
        const { updatedTask } = await inquirer.prompt([
            {
                name: "updatedTask",
                type: "input",
                message: chalk.yellowBright.bold("Enter Updated Task:")
            }
        ]);
        todoUpdate.task = updatedTask;
        console.log(chalk.cyanBright.bold("Your Task is Updated successfully!"));
        const { remainingTask } = await inquirer.prompt([
            {
                name: "remainingTask",
                type: "list",
                message: chalk.greenBright.bold("Please Select One of given option:"),
                choices: ["Add More Tasks", "Read Task", "Delete Task", "Exit Application"]
            }
        ]);
        if (remainingTask === "Add More Tasks") {
            addTask();
        }
        else if (remainingTask === "Read Task") {
            readTask();
        }
        else if (remainingTask === "Delete Task") {
            deleteTask();
        }
        else if (remainingTask === "Exit Application") {
            console.log(chalk.redBright.bold("Exiting the Application!"));
        }
    }
    else {
        console.log("Task not found! Please Enter correct ID.");
        const { remainingTask } = await inquirer.prompt([
            {
                name: "remainingTask",
                type: "list",
                message: chalk.greenBright.bold("Please Select One of given option:"),
                choices: ["Add More Tasks", "Read Task", "Delete Task", "Exit Application"]
            }
        ]);
        if (remainingTask === "Add More Tasks") {
            addTask();
        }
        else if (remainingTask === "Read Task") {
            readTask();
        }
        else if (remainingTask === "Delete Task") {
            deleteTask();
        }
        else if (remainingTask === "Exit Application") {
            console.log(chalk.redBright.bold("Exiting the Application!"));
        }
    }
}
async function deleteTask() {
    const { taskId } = await inquirer.prompt([
        {
            name: "taskId",
            type: "number",
            message: chalk.yellowBright.bold("Enter ID of task you want to delete:")
        }
    ]);
    const deletedIndex = todos.findIndex(todo => todo.id === taskId);
    if (deletedIndex !== -1) {
        todos.splice(deletedIndex, 1);
        console.log(chalk.cyanBright.bold("Task is deleted successfully from your todo list!"));
        const { remainingTask } = await inquirer.prompt([
            {
                name: "remainingTask",
                message: chalk.greenBright.bold("Please Select given Options:"),
                type: "list",
                choices: ["Add More Tasks", "Read Task", "Update Task", "Exit Application"]
            }
        ]);
        if (remainingTask === "Add More Tasks") {
            addTask();
        }
        else if (remainingTask === "Update Task") {
            updateTask();
        }
        else if (remainingTask === "Read Task") {
            readTask();
        }
        else if (remainingTask === "Exit Application") {
            console.log(chalk.redBright.bold("Exiting the Application!"));
        }
    }
    else {
        console.log(chalk.redBright.bold("Task not found! Please Enter correct ID."));
        const { remainingTask } = await inquirer.prompt([
            {
                name: "remainingTask",
                message: chalk.greenBright.bold("Please Select given Options:"),
                type: "list",
                choices: ["Add More Tasks", "Read Task", "Update Task", "Exit Application"]
            }
        ]);
        if (remainingTask === "Add More Tasks") {
            addTask();
        }
        else if (remainingTask === "Update Task") {
            updateTask();
        }
        else if (remainingTask === "Read Task") {
            readTask();
        }
        else if (remainingTask === "Exit Application") {
            console.log(chalk.redBright.bold("Exiting the Application!"));
        }
    }
}
