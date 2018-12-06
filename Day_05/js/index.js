const { input } = require("./input");

const willReact = (a, b) => Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32;

const solOne = str => {
  let i = 0;
  while (true) {
    if (str[i + 1] === undefined) {
      break;
    }
    if (willReact(str[i], str[i + 1])) {
      str = str.slice(0, i).concat(str.slice(i + 2));
      i = i > 0 ? i - 1 : 0;
    } else {
      i++;
    }
  }
  return str.length;
};

const solTwo = str => {
  const dict = [];
  [...Array(26).keys()].map(n => String.fromCharCode(n + 97)).forEach(low => {
    let len = solOne(str.replace(new RegExp(`${low}`, "gi"), ""));
    dict.push(len);
  });
  return dict.reduce((x, y) => (y >= x ? x : y));
};

console.log(`Puzzle 1 Answer: ${solOne(input)}`);
console.log(`Puzzle 2 Answer: ${solTwo(input)}`);
