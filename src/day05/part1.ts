export function part1(input: string): number {
  // This is entirely generated using an LLM, found it interesting that a working (but inefficient)
  // solution was generated in 1 try.

  // Split the input into lines, trimming whitespace
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.trim());

  // Find the blank line that separates rules from updates
  const blankLineIndex = lines.indexOf("");

  // Everything before the blank line is a rule of the form "X|Y"
  const ruleLines = lines.slice(0, blankLineIndex);

  // Everything after the blank line is an update of the form "A,B,C,..."
  const updateLines = lines.slice(blankLineIndex + 1);

  // Parse the rules into a list of [X, Y] pairs
  const rules: Array<[number, number]> = [];
  for (const line of ruleLines) {
    const [left, right] = line.split("|").map(Number);
    rules.push([left, right]);
  }

  // Sum of all middle page numbers from correctly-ordered updates
  let sumOfMiddles = 0;

  // Check each update
  for (const line of updateLines) {
    // Parse the update into an array of page numbers
    const pages = line.split(",").map(Number);

    // Assume this update is correctly-ordered; try to disprove
    let isCorrect = true;

    // For each ordering rule, check if both pages appear in the update
    // If they do, verify the order is correct
    for (const [x, y] of rules) {
      if (pages.includes(x) && pages.includes(y)) {
        if (pages.indexOf(x) > pages.indexOf(y)) {
          // Found a violation of the rule X|Y
          isCorrect = false;
          break;
        }
      }
    }

    // If the update is correctly-ordered, add its middle page to sumOfMiddles
    if (isCorrect) {
      const middleIndex = Math.floor(pages.length / 2);
      sumOfMiddles += pages[middleIndex];
    }
  }

  return sumOfMiddles;
}
