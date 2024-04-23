// #! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let currency = {
    USD: 1, // We have set USD as a base currency
    EUR: 0.91,
    GBP: 0.76,
    INR: 74.57,
    PKR: 280
};
let userAnswer = await inquirer.prompt([
    {
        name: "from",
        type: "list",
        message: chalk.bold.cyanBright("Enter From Currency:"),
        choices: ["USD", "EUR", "GBP", "INR", "PKR"]
    },
    {
        name: "to",
        type: "list",
        message: chalk.bold.cyanBright("Enter To Currency:"),
        choices: ["USD", "EUR", "GBP", "INR", "PKR"]
    },
    {
        name: "amount",
        message: chalk.cyanBright.bold("Enter Amount:")
    }
]);
let fromAmount = currency[userAnswer.from];
let toAmount = currency[userAnswer.to];
let amount = userAnswer.amount;
let baseAmount = amount / fromAmount; // First converting to base currency which is USD
let convertedAmount = baseAmount * toAmount;
if (convertedAmount % 1 !== 0) {
    // Round the convertedAmount to two decimal places using toFixed()
    convertedAmount = Number(convertedAmount.toFixed(2));
}
if (amount.length === 0) {
    console.log(chalk.red.bold("Amount not entered!"));
}
else {
    console.log(chalk.bold.greenBright(`The Exchange rate of ${userAnswer.amount} ${userAnswer.from} to ${userAnswer.to} is ${convertedAmount}.`));
}
