// Print "Hello World"
let counter = 0;

setInterval(() => {
    console.log('Hello World');
    counter = counter + 1;

    if (counter === 5) {
        console.log('Done');
        clearInterval();
    }
}, 1000

);

// Every second
// And stop after 5 times

// After 5 times. Print "Done" and let Node exit.
