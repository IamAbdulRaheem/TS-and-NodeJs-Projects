#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Person{
    private personality:string;
    constructor(){
        this.personality= 'Mystery';
    }
userInput(input:string){
    if (input.includes('Talk to other about yourself openly')) {
        this.personality="Happly"
    }
    else if (input.includes('Keep your words to yourself')) {
        this.personality='talk rude'
    }
}
get _personality(){
    return this.personality;
}
}

class Main{
    public async main(){
        const answers= await inquirer.prompt(
            {
                name:"choice",
                type:"list",
                message:"Tell about your behaviour",
                choices:[""]
            }
        )
    }
}