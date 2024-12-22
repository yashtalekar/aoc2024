#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
/**
 * Simple CLI to run Advent of Code solutions.
 * Usage:
 *   ./bin/aoc --day 1 --part 1
 */
function parseArgs() {
    const args = process.argv.slice(2);
    let day = '';
    let part = '';
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--day' && args[i + 1]) {
            day = args[i + 1];
        }
        if (args[i] === '--part' && args[i + 1]) {
            part = args[i + 1];
        }
    }
    return { day, part };
}
(async function run() {
    const { day, part } = parseArgs();
    if (!day) {
        console.error('Please specify a day, e.g., --day 1');
        process.exit(1);
    }
    if (!part) {
        console.error('Please specify a part, e.g., --part 1');
        process.exit(1);
    }
    // Dynamically load the solution for the specified day
    // e.g., src/day01/index.ts for --day 1
    try {
        const solutionModule = require(path_1.default.join(__dirname, `../src/day${day}/index.js`));
        if (part === '1') {
            console.log(`Day ${day} Part 1 =>`, solutionModule.part1());
        }
        else if (part === '2') {
            console.log(`Day ${day} Part 2 =>`, solutionModule.part2());
        }
        else {
            console.error('Invalid part. Please specify 1 or 2.');
        }
    }
    catch (error) {
        console.error(`Error loading day ${day} solution:`, error.message);
    }
})();
