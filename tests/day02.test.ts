import { part1, part2 } from "../src/day02";

const testInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`.trim();

test("Day 2 Part 1", () => {
  const result = part1(testInput);
  expect(result).toBe(2); // or any expected sum
});

test("Day 2 Part 2", () => {
  const result = part2(testInput);
  expect(result).toBe(4); // or any expected product
});
