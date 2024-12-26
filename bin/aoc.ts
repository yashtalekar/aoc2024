#!/usr/bin/env node

import path from "path";
import { readFileSync } from "fs";

/**
 * Simple CLI to run Advent of Code solutions.
 * Usage:
 *   ./bin/aoc --day 1 --part 1
 */
function parseArgs() {
  const args = process.argv.slice(2);
  let day = "";
  let part = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--day" && args[i + 1]) {
      day = args[i + 1];
    }
    if (args[i] === "--part" && args[i + 1]) {
      part = args[i + 1];
    }
  }

  return { day, part };
}

function readInputFile(day: string): string {
  const paddedDay = day.length === 1 ? `0${day}` : day;
  const inputPath = path.resolve(process.cwd(), `src/day${paddedDay}/input.txt`);

  try {
    return readFileSync(inputPath, "utf-8").trim();
  } catch (err) {
    console.error(`Error reading input file for Day ${day}:`, (err as Error).message);
    process.exit(1);
  }
}

(async function run() {
  const { day, part } = parseArgs();

  if (!day) {
    console.error("Please specify a day, e.g., --day 1");
    process.exit(1);
  }

  if (!part) {
    console.error("Please specify a part, e.g., --part 1");
    process.exit(1);
  }

  // Read input file dynamically
  const input = readInputFile(day);

  // Dynamically load the solution for the specified day
  // e.g., src/day01/index.ts for --day 1
  try {
    const solutionModule = require(path.join(__dirname, `../src/day${day}/index.js`));

    if (part === "1") {
      console.log(`Day ${day} Part 1 =>`, solutionModule.part1(input));
    } else if (part === "2") {
      console.log(`Day ${day} Part 2 =>`, solutionModule.part2(input));
    } else {
      console.error("Invalid part. Please specify 1 or 2.");
    }
  } catch (error) {
    console.error(`Error loading day ${day} solution:`, (error as Error).message);
    process.exit(1);
  }
})();
