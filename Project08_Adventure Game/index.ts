#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Hero{
    name:string;
    health:100;
    constructor(name:string){
        this.name=name;
        this.health=100;
    }
    decreaseHealth(){
        this.health-=20;
    }
    increaseHealth(){
        this.health=100
    }
}

class Enemy{
    name:string;
    health:100;
    constructor(name:string){
        this.name=name;
        this.health=100;
    }
    decreaseHealth(){
        this.health-=20;
    }
    increaseHealth(){
        this.health=100
    }
}

async function main() {
    const {heroName}= await inquirer.prompt([
        {
            type:"input",
            name:"heroName",
            message:"Enter the Name of Hero:"
        }
    ]);

    const {enemyName}= await inquirer.prompt([
        {
            name:"enemyName",
            type:"list",
            choices:["Alien","Witch","Zombie"],
            message:"Select the Enemy:",
        }
    ]);

    const hero= new Hero(heroName);
    const enemy= new Enemy(enemyName);
    console.log(`${enemy.name} v/s ${hero.name}`);


    do{
        const{action}= await inquirer.prompt([
            {
                name:"action",
                type:"list",
                choices:["Attack","Defend","Range Target","Run"],
                message:"Choose one of given option to perform action:",
            },
        ]);
        switch (action) {
            case "Attack":
                const randomNumber= Math.random();
                if (randomNumber>0.5) {
                    hero.decreaseHealth();
                    console.log(`${hero.name} Health: ${hero.health}`);
                    console.log(`${enemy.name} Health: ${enemy.health}`);
                    if (hero.health<=0) {
                        console.log("You lost! Try Again");
                        return;
                    }
                }else{
                    enemy.decreaseHealth();
                    hero.decreaseHealth();
                    console.log(`${hero.name} Health: ${hero.health}`);
                    console.log(`${enemy.name} Health: ${enemy.health}`);
                    if (hero.health<=0) {
                        console.log("Congratulation! You Won");
                        return;
                    }
                }
                break;
        
            default:
                break;
        }
    }while (true);
    
}
main();