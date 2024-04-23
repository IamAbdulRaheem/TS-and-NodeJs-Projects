#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const answers = await inquirer.prompt([
    {
        name: "sentence",
        type: chalk.bold.blue("input"),
        message: chalk.bold.cyanBright("Enter a sentence to count the words:")
    }
]);
const words = answers.sentence.trim().split(" ");
console.log(words);
console.log(chalk.bold.greenBright(`Your sentence count is ${words.length}.`));
