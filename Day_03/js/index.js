const { input, parse } = require("./input");

const range = (s, e) => Array.from({ length: e - s }, (_, i) => s + i);
const compose = (f, g) => x => f(g(x));
const coords = ({ id, x, y, xDim, yDim }) => ({
  id,
  x1: x,
  y1: y,
  x2: x + xDim,
  y2: y + yDim
});
const parseLine = compose(
  coords,
  parse
);

const inc = (map, key) =>
  map.has(key) ? map.set(key, map.get(key) + 1) : map.set(key, 1);

const solOne = input => {
  let overlaps = new Set();
  let map = new Map();
  input.split("\n").forEach(patch => {
    const { x1, x2, y1, y2 } = parseLine(patch);
    range(x1, x2).forEach(x => {
      range(y1, y2).forEach(y => {
        const key = `${x},${y}`;
        inc(map, key);
        if (map.get(key) > 1) overlaps.add(key);
      });
    });
  });
  return overlaps.size;
};

const solTwo = input => {
  let overlapIds = new Set();
  let ids = new Set();
  let map = new Map();
  input.split("\n").forEach(patch => {
    const { id, x1, x2, y1, y2 } = parseLine(patch);
    ids.add(id);
    range(x1, x2).forEach(x => {
      range(y1, y2).forEach(y => {
        const key = `${x},${y}`;
        map.has(key)
          ? map.set(key, map.get(key).concat(id))
          : map.set(key, [id]);
        if (map.get(key).length > 1) {
          map.get(key).forEach(overId => overlapIds.add(overId));
        }
      });
    });
  });
  return [...ids].filter(id => !overlapIds.has(id))[0];
};

console.log(solOne(input));
console.log(solTwo(input));
