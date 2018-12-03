const addToDict = dict => k =>
  dict.has(k) ? dict.set(k, dict.get(k) + 1) : dict.set(k, 1);

const convert = dict => {
  let res = new Map();
  for (let v of dict.values()) {
    if (v === 2) {
      if (!res.has(2)) res.set(2, true);
    }
    if (v === 3) {
      if (!res.has(3)) res.set(3, true);
    }
  }
  return res;
};

const indexInput = str => {
  let dict = new Map();
  str.split("").map(addToDict(dict));
  return convert(dict);
};

const solutionOne = input => {
  const list = input.map(indexInput);
  const twos = list.reduce((res, dict) => (dict.has(2) ? res + 1 : res), 0);
  const threes = list.reduce((res, dict) => (dict.has(3) ? res + 1 : res), 0);
  return twos * threes;
};

const eqStr = s1 => s2 => {
  let ans = [];
  for (let i = 0, l = s1.length; i < l; i++) {
    if (s1[i] !== s2[i]) {
      ans.push(i);
    }
  }
  return ans.length === 1 ? ans[0] : false;
};

const trampoline = fn => arg => {
  let result = fn(arg);
  while (typeof result === "function") {
    result = result();
  }
  return result;
};

const solTwo = input => {
  const solTwoRec = arr => {
    const [x, ...xs] = arr;
    const matches = xs.map(eqStr(x)).filter(z => z);
    return matches.length === 1
      ? x.slice(0, matches[0]).concat(x.slice(matches[0] + 1))
      : () => solTwoRec(xs);
  };
  return trampoline(solTwoRec)(input);
};

const input = require("./input").input;
console.log(solutionOne(input));
console.log(solTwo(input));
