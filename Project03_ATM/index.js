#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myPinCode = 8560;
let myBalance = 10000; // In Dollar
let pinEntered = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.bold.whiteBright("Please enter your 4 digit PIN to proceed!"),
    }
]);
if (pinEntered.pin === myPinCode) {
    let accountType = await inquirer.prompt([
        {
            name: "selectAccount",
            type: "list",
            message: "Select your account Type:",
            choices: ["Current Account", "Saving Account"]
        }
    ]);
    if (accountType.selectAccount === "Current Account" || accountType.selectAccount === "Saving Account") {
        let moreOptions = await inquirer.prompt([
            {
                name: "selectOptions",
                type: "list",
                message: "Select One of the Option to proceed further",
                choices: ["Cash Withdrawl", "Fast Cash", "Check Balance", "Transfer Funds"]
            }
        ]);
        if (moreOptions.selectOptions === "Cash Withdrawl") {
            let withdraw = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.bold.yellowBright("Enter the amount you want to withdraw:")
                }
            ]);
            if (withdraw.amount > myBalance) {
                console.log("Insufficient Balance!!!");
            }
            else if (withdraw.amount % 500 === 0) {
                myBalance -= withdraw.amount;
                setTimeout(() => {
                    console.log(chalk.bold.greenBright(`WithDrawl Amount: ${withdraw.amount}`));
                    console.log(chalk.bold.redBright(`Remaining Balance: ${myBalance}`));
                }, 2000);
            }
            else {
                console.log(chalk.bold.redBright("Please enter the amount like 500, 1000, 1500, 2000 etc"));
            }
        }
        else if (moreOptions.selectOptions === "Fast Cash") {
            let fastCash = await inquirer.prompt([
                {
                    name: "fastCashAmount",
                    type: "list",
                    message: chalk.bold.cyanBright("Select One of the amount given below:"),
                    choices: ["3000", "5000", "7000", "10000", "12000", "15000", "20000"],
                }
            ]);
            if (fastCash.fastCashAmount > myBalance) {
                console.log(chalk.bold.redBright("Insufficient Balance!!! Please select the fastcash amount according to your balance."));
            }
            else {
                myBalance -= fastCash.fastCashAmount;
                setTimeout(() => {
                    console.log(chalk.bold.greenBright(`FastCash Amount: ${fastCash.fastCashAmount}`));
                    console.log(chalk.bold.redBright(`Remaining Balance: ${myBalance}`));
                }, 2000);
            }
        }
        else if (moreOptions.selectOptions === "Check Balance") {
            console.log(chalk.bold.cyanBright(`Current Balance: ${myBalance}`));
        }
        else if (moreOptions.selectOptions === "Transfer Funds") {
            let fundsTransfer = await inquirer.prompt([
                {
                    name: "transferAmount",
                    type: "list",
                    message: "Select Bank:",
                    choices: ["HBL", "Habib Metro Bank", "Mezaan Bank", "MCB", "Alflah Bank", "Allied Bank"]
                }
            ]);
            if (fundsTransfer.transferAmount === "HBL" || "Habib Metro Bank" || "Mezaan Bank" || "MCB" || "Alflah Bank" || "Allied Bank") {
                let bankAccount = await inquirer.prompt([
                    {
                        name: "accountNumber",
                        type: "input",
                        message: "Please Enter receiver's account Number(14 Digit):",
                    }
                ]);
                const accountNumber = bankAccount.accountNumber.toString();
                if (accountNumber.length === 14 && /^\d+$/.test(accountNumber)) {
                    let amountToTransfer = await inquirer.prompt([
                        {
                            name: "enterAmount",
                            type: "number",
                            message: "Enter Amount:"
                        }
                    ]);
                    let number = await inquirer.prompt([
                        {
                            name: "enterNumber",
                            type: "input",
                            message: "Enter receiver's Mobile Number:",
                        }
                    ]);
                    const enterNumber = number.enterNumber.toString();
                    if (enterNumber.length === 11 && /^\d+$/.test(enterNumber)) {
                        let purpose = await inquirer.prompt([
                            {
                                name: "purposeOfPayment",
                                type: "list",
                                message: "Select purpose of payment:",
                                choices: ["Educational Payment", "Family Support", "Investment", "Online Purchase", "Miscellaneous Payment"]
                            }
                        ]);
                        if (amountToTransfer.enterAmount > myBalance) {
                            console.log("Insufficient Balance!!!");
                        }
                        else {
                            myBalance -= amountToTransfer.enterAmount;
                            console.log(chalk.bold.cyanBright(`Bank: ${fundsTransfer.transferAmount}`));
                            console.log(chalk.bold.cyanBright(`Account Number: ${bankAccount.accountNumber}`));
                            console.log(chalk.bold.cyanBright(`Amount: ${amountToTransfer.enterAmount}`));
                            console.log(chalk.bold.cyanBright(`Mobile Number: ${number.enterNumber}`));
                            console.log(chalk.bold.cyanBright(`Purpose of Payment: ${purpose.purposeOfPayment}`));
                            const { confirmSend } = await inquirer.prompt([
                                {
                                    name: "confirmSend",
                                    type: "confirm",
                                    message: chalk.bold.whiteBright("Do you want to Transfer Funds?")
                                }
                            ]);
                            if (confirmSend) {
                                setTimeout(() => {
                                    console.log(chalk.bold.greenBright("Your funds are transferred successfully."));
                                    console.log(chalk.red.bold(`Remaining Balance: ${myBalance}`));
                                }, 4000);
                            }
                            else {
                                console.log(chalk.red.bold("Request Cancelled!"));
                            }
                        }
                    }
                    else {
                        console.log("Enter 11-digit Mobile Number!");
                    }
                }
                else {
                    console.log('Please enter a valid 14-Digit account number.');
                }
            }
        }
    }
}
else {
    console.log("Please Enter correct PIN!!!");
}
