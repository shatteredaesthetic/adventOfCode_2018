function solutionOne(input) {
  return input.reduce((a, b) => a + Number(b), 0);
}

function solutionTwo(input) {
  let freq = 0;
  let seen = {};

  while (true) {
    for (let delta of input) {
      freq += Number(delta);
      if (seen[freq]) {
        return freq;
      }
      seen[freq] = true;
    }
  }
}

const input = require("../input.js").input;
console.log(solutionOne(input));
console.log(solutionTwo(input));
