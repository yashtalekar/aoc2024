import { part1, part2 } from "../src/day01";

const testInput = `
  3   4
  4   3
  2   5
  1   3
  3   9
  3   3
`.trim();

test("Day 1 Part 1 Example", () => {
  const result = part1(testInput);
  expect(result).toBe(11); // or any expected sum
});

test("Day 1 Part 2 Example", () => {
  const result = part2(testInput);
  expect(result).toBe(31); // or any expected product
});
