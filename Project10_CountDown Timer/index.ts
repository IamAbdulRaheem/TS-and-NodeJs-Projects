#! /usr/bin/env node
import { differenceInSeconds, DifferenceInSecondsOptions } from "date-fns";

function* countDownTimer(second:number) {
    while (second>0) {
        yield second;
        second--;
    }
}

// Counter Initilization

let timerIterator= countDownTimer(10);

// function to create a countdown timer
function displayCountDown() {
    // value below 10
    let result= timerIterator.next();

    if (!result.done) {
        // current date and time call
        const now= new Date();
        const resultValueInSeconds= Number(result.value)
        // Calculate minutes in time
        const countDownTimer= new Date(now.getTime() + resultValueInSeconds*1000)
        // calculate remaining seconds in time
        const remainingSeconds= differenceInSeconds(countDownTimer,now);
        console.log(`Remaining Seconds: ${remainingSeconds}`);
        setTimeout(displayCountDown,1000)
    }
    else{
        console.log("CountDown Complete!!!")
    }
}

displayCountDown();

