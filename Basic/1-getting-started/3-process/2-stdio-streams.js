process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(chunk);
  }
});
//OR
// process.stdin.pipe(process.stdout);


//run it and the function will read everything you type and give it back 

