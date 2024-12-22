import { readFileSync } from 'fs';
import path from 'path';

export function part1(): number {
  // Instead of relative to the compiled file, build it relative to the project root
  const inputPath = path.resolve(process.cwd(), 'src/day01/input.txt');
  const input = readFileSync(inputPath, 'utf-8');

  // Process input
  const lines = input.trim().split('\n');

  const pairs = lines.map((line) => line.split(" "))
  console.log("pairs is: ", pairs)

  return lines.reduce((sum, line) => sum + Number(line), 0);
}