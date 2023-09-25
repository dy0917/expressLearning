const calculator = require('./calculator');
const user = require('./user');

class Controllers {
  constructor(libA) {
    this.libA = libA;
  }

  initControllers() {
    const allC = { calculator, user };
    return Object.keys(allC).map((key) => {
      console.log(key);
      const a = Object.fromEntries(
        Object.entries(allC[key]).map((entry) => {
          return [entry[0], loggingTimingDecorator(entry[1])];
        })
      );
      return { [key]: a };
    });

    //   return { calculator, user }.map((controller) => {
    //     return Object.fromEntries(
    //       Object.entries(controller).map((entry) => {
    //         return [entry[0], loggingTimingDecorator(entry[1])];
    //       })
    //     );
    //   });
  }
}
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

const controllersLib = new Controllers();
const libs = controllersLib.initControllers();
console.log('libs', ...libs);
module.exports = { calculator: nCal, user };
