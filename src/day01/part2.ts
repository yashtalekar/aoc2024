import { readFileSync } from 'fs';
import path from 'path';

/**
 * Part 2 solution function
 * @param filePath - Full path to the day's input file
 */
export function part2(filePath: string): number {
  // Instead of relative to the compiled file, build it relative to the project root
  const inputPath = path.resolve(process.cwd(), 'src/day01/input.txt');
  const input = readFileSync(inputPath, 'utf-8');
  
  const lines = input.trim().split('\n');
  // Example logic: multiply all lines interpreted as numbers

  const pairs = lines.map((line) => line.split(" "))
  return lines.reduce((product, line) => product * parseInt(line, 10), 1);
}