const EventEmitter = require('events');

// Streams are Event Emitters
// process.stdin, process.stdout

const myEmitter = new EventEmitter();

myEmitter.emit('TEST_EMIT');


myEmitter.on('TEST_EMIT',()=>{
    console.log('TEST_EMIT was fire');
});
myEmitter.on('TEST_EMIT',()=>{
    console.log('TEST_EMIT was fire');
});
myEmitter.on('TEST_EMIT',()=>{
    console.log('TEST_EMIT was fire');
});

// if we run the code right this way, no se mostrara ninguna respuesta, 
// se tiene que copiar myEmitter.emit('TEST_EMIT') al final para que lo escuche.


//another trick
setImmediate(()=> {
    myEmitter.emit('TEST_EMIT');
});

myEmitter.on('TEST_EMIT',()=>{
    console.log('TEST_EMIT was fire');
});
myEmitter.on('TEST_EMIT',()=>{
    console.log('TEST_EMIT was fire');
});
myEmitter.on('TEST_EMIT',()=>{
    console.log('TEST_EMIT was fire');
});

//ahora si lo mostrara