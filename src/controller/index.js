const calculator = require('./calculator');
const user = require('./user');

function loggingTimingDecorator(originalFunction) {
  // same decorator function as before
  return function () {
    // BUT now the returned function doesn't name its arguments from here
    console.time('Function timer');
    console.log(`\nExecuting function ...`);
    //const result = originalFunction(name); // WON'T work as name is now undefined
    //const result = originalFunction.call(this, ...arguments) // WILL work, no matter how many args
    const result = originalFunction.apply(this, arguments); // and so does this - try out both
    console.log(arguments); // [Arguments] { '0': 8 }
    console.timeEnd('Function timer'); // stop the timer
    return result; //return the result of running the original function
  };
}

const nCal = Object.fromEntries(
  Object.entries(calculator).map((entry) => {
    return [entry[0], loggingTimingDecorator(entry[1])];
  })
);
console.log(nCal.add(1, 3));

module.exports = { calculator, user };
