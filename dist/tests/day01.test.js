"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const day01_1 = require("../src/day01");
test('Day 1 Part 1 Example', () => {
    const result = (0, day01_1.part1)();
    expect(result).toBe(42); // or any expected sum
});
test('Day 1 Part 2 Example', () => {
    const result = (0, day01_1.part2)('src/day01/input.txt');
    expect(result).toBe(1234); // or any expected product
});
