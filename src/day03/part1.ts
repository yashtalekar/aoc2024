export function part1(input: string): number {
  // We don't need to process the input!
  // This is easy with regex.

  // console.log("input is: ", input);

  const regexPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const mulMatches = input.matchAll(regexPattern);
  if (mulMatches === undefined) {
    return 0;
  }
  // mulMatches cannot be undefined, since we've caught that error above.
  let total = 0;
  // console.log("mulMatches is: ", mulMatches);
  for (const match of mulMatches) {
    const fullMatch = match[0];
    // console.log("fullMatch is ", fullMatch);
    const firstNum = parseInt(match[1]);
    // console.log("firstNum is: ", firstNum);
    const secondNum = parseInt(match[2]);
    // console.log("secondNum is: ", secondNum);
    total = total + firstNum * secondNum;
  }

  return total;
}
