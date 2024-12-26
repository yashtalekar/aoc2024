export function part1(input: string): number {
  // Process input
  const lines = input.trim().split("\n");

  const list1: number[] = [];
  const list2: number[] = [];
  const pairs = lines.map((line) => line.split("   "));
  // console.log("pairs is: ", pairs);
  for (let i = 0; i < pairs.length; i++) {
    list1.push(Number(pairs[i][0]));
    list2.push(Number(pairs[i][1]));
  }

  list1.sort();
  list2.sort();

  // console.log("list1 and list2 are; ", list1, list2);

  if (list1.length !== list2.length) {
    throw new Error("Input lists lenght not equal!");
  }
  const inputListLength = list1.length;

  let total = 0;
  for (let i = 0; i < inputListLength; i++) {
    total = total + Math.abs(list1[i] - list2[i]);
  }

  // console.log("total is: ", total);

  return total;
}
