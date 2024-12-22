"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.part1 = part1;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function part1() {
    // Instead of relative to the compiled file, build it relative to the project root
    const inputPath = path_1.default.resolve(process.cwd(), 'src/day01/input.txt');
    const input = (0, fs_1.readFileSync)(inputPath, 'utf-8');
    // Process input
    const lines = input.trim().split('\n');
    const list1 = [];
    const list2 = [];
    const pairs = lines.map((line) => line.split("   "));
    console.log("pairs is: ", pairs);
    for (let i = 0; i < pairs.length; i++) {
        // list1.push[]
    }
    return lines.reduce((sum, line) => sum + Number(line), 0);
}
