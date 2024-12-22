import { part1, part2 } from '../src/day01';

test('Day 1 Part 1 Example', () => {
  const result = part1();
  expect(result).toBe(42); // or any expected sum
});

test('Day 1 Part 2 Example', () => {
  const result = part2('src/day01/input.txt');
  expect(result).toBe(1234); // or any expected product
});