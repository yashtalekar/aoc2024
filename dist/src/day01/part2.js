"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = part2;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
/**
 * Part 2 solution function
 * @param filePath - Full path to the day's input file
 */
function part2(filePath) {
    // Instead of relative to the compiled file, build it relative to the project root
    const inputPath = path_1.default.resolve(process.cwd(), 'src/day01/input.txt');
    const input = (0, fs_1.readFileSync)(inputPath, 'utf-8');
    const lines = input.trim().split('\n');
    // Example logic: multiply all lines interpreted as numbers
    const pairs = lines.map((line) => line.split(" "));
    return lines.reduce((product, line) => product * parseInt(line, 10), 1);
}
