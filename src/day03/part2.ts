export function part2(input: string): number {
  // We don't need to process the input!

  const regexPattern = /mul\((\d{1,3}),(\d{1,3})\)|(do\(\))|(don't\(\))/g;

  const mulMatches = input.matchAll(regexPattern);
  if (mulMatches === undefined) {
    return 0;
  }
  // mulMatches cannot be undefined, since we've caught that error above.
  let total = 0;
  // console.log("mulMatches is: ", mulMatches);
  let enabled = 1;
  for (const match of mulMatches) {
    const fullMatch = match[0];
    // console.log("fullMatch is ", fullMatch);
    if (fullMatch.startsWith("do(")) {
      // console.log("do case fullMatch is: ", fullMatch);
      enabled = 1;
    } else if (fullMatch.startsWith("don't(")) {
      enabled = 0;
    } else {
      const firstNum = parseInt(match[1]);
      // console.log("firstNum is: ", firstNum);
      const secondNum = parseInt(match[2]);
      // console.log("secondNum is: ", secondNum);
      total = total + firstNum * secondNum * enabled;
    }
  }

  return total;
}
